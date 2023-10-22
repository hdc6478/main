namespace game {

    //////////////////////////////////////活跃度//////////////////////////////////////
    export const enum LivenessEvent {
        MEDAL_INFO_UPDATE = "medal_info_update",
        MEDAL_PLAY_TWEEN = "medal_play_tween",
        MEDAL_AWARD_UPDATE = "medal_award_update",
    }

    //////////////////////////////////////日常玩法//////////////////////////////////////
    export const enum WanfaStatus {
        None = 0,//闲置
        Challenge,//可挑战
        Gongfeng,//可供奉
    }
    export const enum WanfaEvent {
        UPDATE_WANFAN_LIST = "update_wanfa_list",//刷新玩法列表
    }

    //////////////////////////////////////日常限时//////////////////////////////////////
    export const enum DailyLimitTimeEvent {
        UPDATE_LIMIT_ACT_INFO = "update_limit_act_info",//会携带开启的类型数组
    }

    export const enum DailyLimitTimeState {
        End = 0,//1：进行中，2：未开启，0：已结束
        Opening = 1,
        NotOpen = 2
    }

    export const enum DailyLimitTimeType {
        // 跨服boss。
        // 论道（仙界-论道）。
        YonghengYijie = 3,// 大妖魔界（妖界-大妖妖界）。异界-永恒异界
        // 坠魔深渊
        XianjieLuandou = 5,//仙界乱斗
    }
}