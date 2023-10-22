namespace game {
    export const enum YijieEvent {
        ON_YIJIE_INFO_UPDATE = "on_yijie_info_update",//异界界面信息
        ON_YIJIE_SEL_UPDATE = "on_yijie_sel_update",//异界勾选三倍刷新
        ON_YIJIE_SCENE_UPDATE = "on_yijie_scene_update",//异界场景数据刷新
        BOSS_LIST_INFO_UPDATE = "boss_list_info_update",//Boss列表信息刷新

        ON_YONGHENG_YIJIE_INFO_UPDATE = "on_yongheng_yijie_info_update",//永恒异界界面信息
        ON_YONGHENG_YIJIE_SCENE_UPDATE = "on_yongheng_yijie_scene_update",//永恒异界场景数据刷新
    }

    export const enum YijieFightType {
        Pvp = 1,// 1：PVP类型
        Team = 2,// 2：宗门类型
        All = 3// 3：两者类型
    }

    export const enum YijieBossType {
        Yijie = 1,// 异界boss
        YonghengYijie = 2,// 永恒异界boss
    }

    export const YijieBossNum = 5;//异界boss数量

    export const enum SeaEvent {
        ON_SEA_INFO_UPDATE = "on_sea_info_update",//信息更新
        ON_SEA_RANK_UPDATE = "on_sea_rank_update",//信息更新
    }

    export const enum SeaType {
        Sea1 = 1,//幻境之海，仙界之海
        Sea2,//幻境之海，神界之海
        Sea3,//幻境之海，圣界之海
    }

    /**幻境之海类型数组*/
    export const SeaTypeAry = [SeaType.Sea1, SeaType.Sea2, SeaType.Sea3];

    export const SeaTypeToTaskType: { [type: number]: number } = {
        [SeaType.Sea1]: TaskType.Sea1,
        [SeaType.Sea2]: TaskType.Sea2,
        [SeaType.Sea3]: TaskType.Sea3
    };

    export const SeaTypeToRoleKey: { [type: number]: string } = {
        [SeaType.Sea1]: RolePropertyKey.xjzh_nl,//仙界之海能量
        [SeaType.Sea2]: RolePropertyKey.sjzh_nl,//神界之海能量
        [SeaType.Sea3]: RolePropertyKey.sgjzh_nl//圣界之海能量
    };

    export const enum SeaOpType {
        Enter = 1,//1激活解锁区域  2领取挂机收益  3挑战区域关卡  4攻击幻境boss   5请求排行信息  6领取全民奖励
        Reward,
        Challenge,
        Attack,
        Rank,
        RankReward
    }

    export const SeaBossPosNum = 5;//位置数量
    export const SeaShenlingNum = 4;//神灵数量
    //神灵四个部位对应的攻击特效，todo
    export const SeaShenlingEft: { [pos: number]: string } = {
        [0]: "sn_11_2",
        [1]: "sn_11_2",
        [2]: "sn_11_2",
        [3]: "sn_11_2"
    };
    export const SeaShenlingEftRotation: { [pos: number]: number } = {
        [0]: -45,
        [1]: -60,
        [2]: -120,
        [3]: -135
    };
    export const SeaShenlingDir: { [pos: number]: number } = {
        [0]: Direction.RIGHT_UP,
        [1]: Direction.RIGHT_UP,
        [2]: Direction.LEFT_UP,
        [3]: Direction.LEFT_UP
    };
}