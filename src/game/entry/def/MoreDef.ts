namespace game {
    export const enum MoreEvent {
        ON_ACHIEVE_INFO_UPDATE = "on_achieve_info_update",//成就信息

        ON_UPDATE_ARTIFACT_INFO = "on_update_artifact_info",//荒古神器
        ON_UPDATE_ARTIFACT_ATTR_INFO = "on_update_artifact_attr_info",//荒古神器
        ON_UPDATE_ARTIFACT_AUTO_INFO = "on_update_artifact_auto_info",//荒古神器

        //战队
        ON_UPDATE_ZHANDUI_BASE_INFO = "on_update_zhandui_base_info",
        ON_UPDATE_ZHANDUI_APPLY_LIST_INFO = "on_update_zhandui_apply_list_info",
        ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO = "on_update_zhandui_team_role_apply_list_info",
        ON_UPDATE_ZHANDUI_CHECK_VIEW_HIDE = "on_update_zhandui_check_view_hide",
        ON_UPDATE_ZHANDUI_RECORDS = "on_update_zhandui_records",
        ON_EXIT_ZHANDUI_TEAM = "on_exit_zhandui_team",//退出战队
        ON_SEND_SUCCESS = "on_send_success",//发送信息成功
        //战队祭坛
        ON_UPDATE_ZHANDUI_JITAN_BASE_INFO = "on_update_zhandui_jitan_base_info",
        ON_UPDATE_ZHANDUI_JITAN_GONGFENG_INFO = "on_update_zhandui_jitan_gongfeng_info",
        ON_CLOSE_ZHANDUI_JITAN_SHELF = "on_close_zhandui_jitan_shelf",
        //墟界探索
        ON_UPDATE_XUJIETANSUO_BASE_INFO = "on_update_xujietansuo_base_info",
        ON_GOTO_XUJIETANSUO_NEXT_LAYER = "on_goto_xujietansuo_next_layer",
        ON_UPDATE_ZHENRONG_INFO = "on_update_zhenrong_info",
        ON_UPDATE_TBS_INFO = "on_update_tbs_info",//回合制协议处理
        ON_UPDATE_TBS_RESULT_INFO = "on_update_tbs_result_info",//回合制结算处理
        ON_TBS_FIGHT_HIDE = "on_tbs_fight_hide",//关闭回合制战斗界面
        ON_UPDATE_XUJIETANSUO_RECORDS_INFO = "on_update_xujietansuo_records_info",
        ON_UPDATE_XUJIETANSUO_RANK_INFO = "on_update_xujietansuo_rank_info",
        ON_UPDATE_XUJIETANSUO_SINGLE_GRID_INFO = "on_update_xujietansuo_single_grid_info",

        //虚界矿脉
        ON_UPDATE_MINING_LOGS_INFO = "on_update_mining_logs_info",
        ON_UPDATE_MINING_MASTER_INFO = "on_update_mining_master_info",
        ON_UPDATE_MINING_FIGHT_INFO = "on_update_mining_fight_info",
        ON_UPDATE_MINING_CNT_INFO = "on_update_mining_cnt_info",
        ON_UPDATE_MINING_LINGBAO_CNT_INFO = "on_update_mining_lingbao_cnt_info",
        ON_UPDATE_MINING_GIFT_INFO = "on_update_mining_gift_info",

        //仙脉
        ON_UPDATE_XIANMAI_STAGE_SHOW = "on_update_xianmai_stage_show",
        ON_UPDATE_XIANMAI_MY_SHOW = "on_update_xianmai_my_show",
        ON_UPDATE_XIANMAI_CHECK_OTHER = "on_update_xianmai_check_other",
        ON_UPDATE_XIANMAI_SEARCH = "on_update_xianmai_search",
        ON_UPDATE_XIANMAI_REWARD_SHOW = "on_update_xianmai_reward_show",
        ON_UPDATE_XIANMAI_LIST_SHOW = "on_update_xianmai_list_show",
        ON_UPDATE_XIANMAI_ZHANBAO = "on_update_xianmai_zhaobao",
        ON_UPDATE_XIANMAI_RANK_SHOW = "on_update_xianmai_rank_show",
        ON_XIANMAI_LIST_VIEW_CLOSE = "on_xianmai_list_view_close",
        ON_XIANMAI_VIEW_CLOSE = "on_xianmai_view_close",

        //幻境
        ON_UPDATE_HUANJING_INFO = "on_update_huanjing_info",
        ON_UPDATE_HUANJING_ATTR = "on_update_huanjing_attr",

        //跨服仙宗
        ON_UPDATE_CROSS_UNION_INFO = "on_update_cross_union_info",
        ON_UPDATE_CROSS_UNION_LIST_INFO = "on_update_cross_union_list_info",
        ON_UPDATE_CROSS_UNION_LIST_RESET_INFO = "on_update_cross_union_list_reset_info",
        ON_UPDATE_CROSS_UNION_READY_INFO = "on_update_cross_union_ready_info",
        ON_UPDATE_CROSS_UNION_SELECT_INFO = "on_update_cross_union_select_info",
        ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO = "on_update_cross_union_team_list_info",
        ON_UPDATE_CROSS_UNION_ZHANBAO_INFO = "on_update_cross_union_zhanbao_info",
        ON_UPDATE_CROSS_UNION_FIGHT_INFO = "on_update_cross_union_fight_info",
        ON_UPDATE_CROSS_UNION_OVER_VIEW = "on_update_cross_union_over_view",

        //仙界乱斗
        ON_XIANJIE_PVP_BASE_INFO_UPDATE = "on_xianjie_pvp_base_info_update",
        ON_XIANJIE_PVP_RANK_INFO_UPDATE = "on_xianjie_pvp_rank_info_update",
        ON_XIANJIE_PVP_SCENE_RANK_INFO_UPDATE = "on_xianjie_pvp_scene_rank_info_update",
        ON_XIANJIE_PVP_SCORE_REWARD_UPDATE = "on_xianjie_pvp_score_reward_update",
        ON_XIANJIE_PVP_BOSS_INFO_UPDATE = "on_xianjie_pvp_boss_info_update",
        ON_XIANJIE_PVP_BATTLE_REPORT_UPDATE = "on_xianjie_pvp_battle_report_update",
        ON_XIANJIE_PVP_KILL_BOSS_INFO_UPDATE = "on_xianjie_pvp_kill_boss_info_update",
        ON_XIANJIE_PVP_SCENE_INFO_UPDATE = "on_xianjie_pvp_scene_info_update",
        ON_XIANJIE_SCENE_SKILL_CD_UPDATE = "on_xianjie_scene_skill_cd_update",

        /**仙位争霸 */
        ON_UPDATE_XIANWEI_INFO = "on_update_xianwei_info",
        ON_UPDATE_XIANWEI_LIST_INFO = "on_update_xianwei_list_info",
        ON_UPDATE_XIANWEI_ZHANBAO_INFO = "on_update_xianwei_zhanbao_info",
        ON_UPDATE_XIANWEI_RANK_INFO = "on_update_xianwei_rank_info",
        ON_UPDATE_XIANWEI_CD_INFO = "on_update_xianwei_cd_info",

        //荣耀
        ON_UPDATE_HONOUR_INFO = "on_update_honour_info"
    }

    export const enum HuashenEvent {
        ON_UPDATE_HUASHEN_ROAD_INFO = "on_update_huashen_road_info",//化神之路
        ON_UPDATE_HUASHEN_ZHANSHENDIAN_INFO = "on_update_huashen_road_info",//化神战神殿
        ON_UPDATE_HUASHEN_TIANFU_INFO = "on_update_huashen_road_info",//化神天赋
        ON_UPDATE_HUASHEN_TIANFU_OPEN = "on_update_huashen_road_open",//化神天赋开启
        ON_SCENE_HUASHEN_TIME = "on_scene_huashen_time",//场景化神变身时间变更
        ON_SCENE_HUASHEN_ID = "on_scene_huashen_id",//场景化神变身数据变更
    }

    export const HuashenZhiluCnt: number = 10;//化神之路10个节点

    /**战队操作类型*/
    export const enum ZhanduiOperType {
        /**1为创建战队*/
        Oper1 = 1,
        /**2为购买战队旗帜*/
        Oper2 = 2,
        /**3请求战队列表*/
        Oper3 = 3,
        /**4申请加入*/
        Oper4 = 4,
        /**5刷新战队列表*/
        Oper5 = 5,
        /**6搜索战队*/
        Oper6 = 6,
        /**7战队改名（仅队长）*/
        Oper7 = 7,
        /**8战队使用旗帜（仅队长）*/
        Oper8 = 8,
        /**9请求申请列表（仅队长）*/
        Oper9 = 9,
        /**10操作申请人员（仅队长）*/
        Oper10 = 10,
        /**11发送招募聊天*/
        Oper11 = 11,
        /**12转移队长（仅队长）*/
        Oper12 = 12,
        /**13踢出战队（仅队长）*/
        Oper13 = 13,
        /**14玩家自己退出战队*/
        Oper14 = 14,
        /**15设置进入要求的最低战力*/
        Oper15 = 15,
        /**16设置申请审核（仅队长)*/
        Oper16 = 16,
        /**17请求仙纪功绩*/
        Oper17 = 17,
        /**18请求仙纪事件*/
        Oper18 = 18,
        /**100 请求战队数据*/
        Oper100 = 100,
        /**200 供奉道具和一键放入*/
        Oper200 = 200,
        /**201 回收道具*/
        Oper201 = 201,
        /**202 道具加速*/
        Oper202 = 202,
        /**204 领取道具供奉奖励*/
        Oper203 = 203,
        /**205 幻化激活升级*/
        Oper204 = 204,
        /**205 使用幻化*/
        Oper205 = 205,
        /**206 领取等级礼包*/
        Oper206 = 206,
        /**207 请求战队祭坛供奉信息*/
        Oper207 = 207,
    }

    /**墟界祭坛献祭个数*/
    export const XujieJitanSacrificeCnt = 7;

    export const enum HuangguEvent {
        ON_UPDATE_GODDESS_CONSECRATE_INFO = "on_update_goddess_consecrate_info",//荒古女神供奉
        ON_UPDATE_GODDESS_CHAT_INFO = "on_update_goddess_chat_info",//荒古女神对话
        ON_UPDATE_GODDESS_TARGET_INFO = "on_update_goddess_target_info",//荒古女神目标返利
        ON_UPDATE_GODDESS_EVENT_INFO = "on_update_goddess_event_info",//荒古女神事件
        ON_GODDESS_CHAT_SEL = "on_goddess_chat_sel",//荒古女神对话选择

        //仙宗封魔
        ON_UPDATE_FENGMO_RANK = "on_update_fengmo_rank",
        ON_UPDATE_FENGMO_INFO = "on_update_fengmo_info",

        //仙帝争霸
        ON_UPDATE_XIANDI_RANK = "on_update_xiandi_rank",
        ON_UPDATE_XIANDI_INFO = "on_update_xiandi_info",
        ON_UPDATE_XIANDI_TREASURE = "on_update_xiandi_treasure",
        ON_CLOSE_XIANDI_POPUP = "on_close_xiandi_popup",
    }

    /**荒古女神操作类型*/
    export const enum GoddessOpType {
        Act = 1,// 1：女神契约激活 2：水晶抽奖 3：供奉 4：互动完成保存 5：获取互动奖励 6：触发事件 7：领取礼包奖励
        Summon,
        Consecrate,
        Chat,
        ChatReward,
        Event,
        Target
    }

    export const enum GoddessTargetType {
        Free = 1,// 1：免费奖励 2：付费奖励
        Buy
    }

    export const enum GoddessChatType {
        Goddess = 1,// 1：女神 2：自己
        Self
    }

    export const enum CommonChatType {
        Goddess = 1,//1荒古女神，2女神录-创世女神
        TimeGoddess
    }

    export const enum GoddessRecordEvent {
        ON_UPDATE_TIME_GODDESS_CHAT_INFO = "on_update_time_goddess_chat_info",//创世女神对话
        ON_UPDATE_TIME_GODDESS_EVENT_INFO = "on_update_time_goddess_event_info",//创世女神事件
        ON_UPDATE_TIME_GODDESS_LV_INFO = "on_update_time_goddess_lv_info",//创世女神等级
        ON_UPDATE_TIME_GODDESS_GONGFENG_INFO = "on_update_time_goddess_gongfeng_info",//创世女神供奉
        ON_UPDATE_HUNKA_INFO = "on_update_hunka_info",//创世女神魂卡
        ON_UPDATE_HUNKA_SELECT = "on_update_hunka_select",//创世女神魂卡选中
        ON_UPDATE_HUNKA_PREVIEW = "on_update_hunka_preview",//创世女神魂卡合成预览
        ON_UPDATE_HUNKA_COMPOSE = "on_update_hunka_compose",//创世女神魂卡合成成功
    }

    export const enum GoddessIndex {
        TimeGoddess = 1,//1女神录-创世女神
    }

    /**女神录创世女神，操作类型*/
    export const enum TimeGoddessOpType {
        Chat = 1,// 1对话完成   2对话领取互动奖励  3挑战事件
        ChatReward,
        Event,
        /// 10供奉  11供奉道具回收  12供奉单个加速 13供奉全部加速 14请求供奉数据 15领取供奉奖励
        Gongfeng = 10,
        GongfengDel,
        GongfengSpeedup,
        GongfengSpeedupAll,
        GongfengInfo,
        GongfengReward,
        // 20 创世能量抽奖（女神馈赠）
        Summon = 20,
    }

    export const TimeGoddessGongfengCnt = 4;//创世女神供奉数量


    export const HunkaPosCnt = 7;//创世女神魂卡数量
    /**女神录创世女神，魂卡操作类型*/
    export const enum HunkaOpType {
        Open = 1,// //1解锁魂卡阵位   2上阵、替换魂卡 3卸下魂卡   4激活评分 5魂卡预览   6魂卡合成  7魂卡一键合成
        Wear,
        Remove,
        Act,
        Preview,
        Compose,
        OneKeyCompose
    }

    export const enum HunkaBagOpenType {
        Wear = 1,// //1穿戴，2合成
        Compose,
    }

    export const enum HunkaScoreType {
        Score = 1,//1评分，2总评分
        Total,
    }

    /**墟界探索格子状态*/
    export const enum XujieTansuoGridStatus {
        /**0空格子*/
        Null = 0,
        /**1怪物格*/
        Monster = 1,
        /**2奖励格*/
        Reward = 2,
        /**3商人格*/
        Business = 3,
        /**4远征格*/
        Expedition = 4,
        /**5传送格*/
        Transfer = 5,
    }

    /**墟界探索每层排数（行数）固定12*/
    export const XujieTansuoRowCnt = 12;

    /**墟界探索操作类型*/
    export const enum XujieTansuoOperType {
        /**1为领取战利品*/
        Oper1 = 1,
        /**2商店格子购买*/
        Oper2 = 2,
        /**3上阵神灵*/
        Oper3 = 3,
        /**4领取远征奖励*/
        Oper4 = 4,
        /**5挑战怪物*/
        Oper5 = 5,
        /**6扫荡怪物*/
        Oper6 = 6,
        /**7请求排行榜*/
        Oper7 = 7,
    }

    /**军团阵容类型*/
    export const enum LegionType {
        Shenling = 1,//神灵
        Huashen = 2,//化神
        Nvshen = 3//女神
    }

    /**回合制中模型类型 0玩家 1神灵 2化神 3女神 4怪物*/
    export const enum LegionEntityType {
        Player = 0,//玩家
        Shenling,//神灵
        Huahshen,//化神
        Nvshen,//女神
        Monster,//怪物
    }

    export const LegionTypeAry = [LegionType.Shenling, LegionType.Huashen, LegionType.Nvshen];

    /**军团阵容上阵个数*/
    export const LegionTypeCnt = {
        [LegionType.Shenling]: 12,
        [LegionType.Huashen]: 3,
        [LegionType.Nvshen]: 1
    };

    /**军团阵容类型名称*/
    export const LegionTypeName = {
        [LegionType.Shenling]: '神灵',
        [LegionType.Huashen]: '化神',
        [LegionType.Nvshen]: '女神'
    };

    /**回合制攻击类型 todo*/
    export const enum TbsHintType {
        /**普通攻击*/
        Attack = 0,
        /**回血*/
        Blood = 1,
        /**反弹伤害*/
        ReboundInjury = 2,
        /**直接伤害*/
        DirectInjury = 3,
    }

    // /**回合制攻击优先级，越低越高*/
    // export const TbsHintTypePriority = {
    //     [TbsHintType.Blood]: 1,
    //     [TbsHintType.DirectInjury]: 2,
    //     [TbsHintType.Attack]: 3,
    //     [TbsHintType.ReboundInjury]: 4
    // };

    /**墟界类型*/
    export const enum XujieType {
        Tansuo = 1, //墟界探索
        Kuangmai = 2,//墟界矿脉
        Jitan = 3,   //墟界祭坛
    }

    export const enum XiandiRankType {
        Person = 1,
        Guild = 2,
    }

    export const enum XiandiType {
        Xiandi = 1,
        XianHou = 2,
        Hongyan = 3,
    }

    /**仙脉战斗操作：1撤离，2驱逐，3攻占，4占领*/
    export const enum XianmaiOperType {
        Oper1 = 1,
        Oper2 = 2,
        Oper3 = 3,
        Oper4 = 4,
    }

    /**虚空矿脉操作 1.压榨2.激励3.驱逐4.续约5.流放 */
    export const enum MiningOper {
        Ot = 1,
        Check = 2,
        Out = 3,
        GoOn = 4,
        Free = 5
    }

    export const enum CrossUnionOpenState {
        /**报名阶段未报名 */
        Ready = 1,
        /**匹配阶段未报名 开启前一天0点到开启前 */
        Match = 2,
        /**开启阶段 开启当天20点-24点 */
        Open = 3,
    }

    export const enum CrossUnionType {
        Own = 1,
        Target = 2
    }

    /**跨服仙宗战 */
    export const enum CUFigthEvent {
        /**战斗进场 */
        ON_UPDATE_FIGHT_ENTER = "on_update_fight_enter",
        /**战斗对线伤害更新 */
        ON_UPDATE_FIGHT_INFO = "on_update_fight_info",
        /**战斗技能使用 */
        // ON_UPDATE_FIGHT_SKILL_INFO = "on_update_fight_skill_info",
        /**更新单个位置 */
        ON_UPDATE_FIGHT_POS_INFO = "on_update_fight_pos_info",
        /**更新仙宗仙兽数据 */
        ON_UPDATE_BEAST_INFO = "on_update_beast_info",
        /**更新观看奖励 */
        ON_UPDATE_CUF_REWARD_INFO = "on_update_cuf_reward_info",
        /**退出场景 */
        ON_UPDATE_CUF_EXIT = "on_update_cuf_exit",
    }

    /**
     * 1进入副本(s2c_xianjie_pvp_base_info)
     * 2查看活动排名(s2c_xianjie_pvp_rank_info)
     * 3获取战场积分排名(s2c_xianjie_pvp_scene_rank_info)
     * 4领取战场积分奖励(s2c_xianjie_pvp_score_reward)
     * 5发送宗门邀请
     * 6请求战报
     * */
    export const enum XianjieLuandouOperType {
        Oper1 = 1,
        Oper2,
        Oper3,
        Oper4,
        Oper5,
        Oper6,
    }

    /**荣耀类型，对应 honour.json 的大类*/
    export const enum HonourType {
        Honour = 1, //荣耀
    }

}