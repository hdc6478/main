namespace game {

    export const enum CompeteEvent {
        UPDATE_YOULI_INFO = "update_youli_info",
        UPDATE_YOULI_AWARD = "update_youli_award",
        UPDATE_YOULI_SCORE = "update_youli_score",
        UPDATE_YOULI_WISH_BOX = "update_youli_wish_box",
        UPDATE_YOULI_KILLER_FIGHT = "update_youli_killer_fight",
        UPDATE_YOULI_DATI = "update_youli_dati",//游历答题返回
        UPDATE_DOUFA_INFO = "update_doufa_info",//更新斗法信息
        UPDATE_DOUFA_RECORD = "update_doufa_record",//更新斗法战报
        UPDATE_DOUFA_RANK = "update_doufa_rank",//更新斗法排行榜
        DOUFA_RESET_CHALLENGE = "doufa_reset_challenge",//斗法重置挑战
        UPDATE_DOUFA_GROUP_INFO = "update_doufa_group_info",//更新斗法小组信息
        UPDATE_DOUFA_GUESS_INFO = "update_doufa_guess_info",//更新斗法竞猜信息
        COMMON_CLICK_ADD = "common_click_add",//通用点击购买次数按钮
        KUAFU_DOUFA_COUNT_UPDATE = "kuafu_doufa_count_update",//跨服斗法次数
        KUAFU_DOUFA_STATE_UPDATE = "kuafu_doufa_state_update",//跨服斗法状态
        KUAFU_DOUFA_ENROLL_UPDATE = "kuafu_doufa_enroll_update",//跨服斗法报名
        KUAFU_DOUFA_RANK_UPDATE = "kuafu_doufa_rank_update",//跨服斗法排行刷新
        KUAFU_DOUFA_SCENE_RANK_UPDATE = "kuafu_doufa_scene_rank_update",//跨服斗法战场排行刷新
        KUAFU_DOUFA_SCORE_UPDATE = "kuafu_doufa_score_update",//跨服斗法积分刷新
        KUAFU_DOUFA_MY_SCORE_UPDATE = "kuafu_doufa_my_score_update",//跨服斗法我的积分刷新
        KUAFU_DOUFA_SCORE_REWARD_UPDATE = "kuafu_doufa_score_reward_update",//跨服斗法积分奖励刷新
        KUAFU_DOUFA_BOSS_UPDATE = "kuafu_doufa_boss_update",//跨服斗法boss血量刷新
        KUAFU_DOUFA_ATTACK_UPDATE = "kuafu_doufa_attack_update",//跨服斗法攻击状态刷新
        KUAFU_DOUFA_NOTICE_UPDATE = "kuafu_doufa_notice_update",//跨服斗法击杀公告刷新
        KUAFU_DOUFA_SKILL_CD_UPDATE = "kuafu_doufa_skill_cd_update",
    }

    /**
     * 游历玩法类型
     */
    export const enum YouliType {
        Normal = 0,             // 0 正常
        WishBox,                // 1 宝箱
        Treasure,               // 2 宝藏
        SpecialKiller,          // 3 异形
        ScoreKiller,            // 4 杀手
        Dati,                  //答题
    }

    /**
     * 许愿宝箱状态
     */
    export const enum WishBoxStatus {
        NOT_OPEN = "not_open",      // 未开启
        OPEN = "open",              // 已开启
        OPEN_GOT = "open_got",      // 已获得
    }

    /** 斗法系统小组赛类型*/
    export const enum DoufaGroupStatus {
        Score = 0,      //积分赛
        First = 1,      //小组赛
        Second = 2,     //决赛
    }
    /** 斗法小组类型*/
    export const enum DoufaGroupType {
        Type1 = 1,// 鸿蒙组
        Type2 = 2,// 太初组
        Type3 = 3,// 混沌组
        Type4 = 4,// 洪荒组
        Type5 = 5,// 虚无组
    }
    /** 斗法系统各小组赛战斗场次*/
    export const enum DoufaGroupMatch {
        Num1 = 1,      //1，2，3各场战斗
        Num2 = 2,
        Num3 = 3,
    }

    /** 跨服斗法状态*/
    export const enum KuafuDoufaState {
        Enroll = 1,     //报名阶段
        Wait = 2,       //等待开启阶段
        Open = 3,       //开启阶段
        End = 4,        //结束
    }
    export const KuafuDoufaWaitTime: number = 60;//战场开启等待时间：1分钟
    export const enum KuafuDoufaOpType {
        Enroll = 1,     //1表示报名或者参与玩法  2请求宗门排行数据  3请求个人排行  4请求战场排名  5领取战场积分奖励  6切换场景攻击驻守状态
        GuildRank = 2,
        PersonalRank = 3,
        SceneRank = 4,
        ScoreReward = 5,
        Attack = 6,
    }
    export const enum KuafuDoufaAttackStatus {
        Attack = 1,//1攻击，2驻守
        Defense = 2,
    }
}
