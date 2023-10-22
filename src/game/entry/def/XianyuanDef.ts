namespace game {
    export const enum XianyuanEvent {
        ON_UPDATE_BANLV_INFO = "on_update_banlv_info",
        ON_UPDATE_INVITE_RECORDS = "on_update_invite_records",
        //子女
        ON_UPDATE_CHILD_INFO = "on_update_child_info",
        ON_UPDATE_CHILD_JIBAN_INFO = "on_update_child_jiban_info",
        ON_UPDATE_CHILD_SHENBING_INFO = "on_update_child_shenbing_info",
        ON_UPDATE_CHILD_SHARE_INFO = "on_update_child_share_info",
        ON_UPDATE_RING_INFO = "on_update_ring_info",
        //试炼
        ON_UPDATE_SHILIAN_INFO = "on_update_shilian_info",
        ON_UPDATE_SHILIAN_DAMAGE = "on_update_shilian_damage",
        ON_UPDATE_SHILIAN_RANK_INFO = "on_update_shilian_rank_info",
        ON_UPDATE_SHILIAN_JIFEN_INFO = "ON_UPDATE_SHILIAN_JIFEN_INFO",

        //仙侣斗法
        ON_UPDATE_XIANLV_DOUFA_INFO = "on_update_xianlv_doufa_info",
        ON_UPDATE_XIANLV_DOUFA_RANK = "on_update_xianlv_doufa_rank",
        ON_UPDATE_XIANLV_DOUFA_AUTO = "on_update_xianlv_doufa_auto",
    }

    /**子女界面二级页签，升星|神兵|灵翼*/
    export const enum XianlvSecondTabType {
        Type1 = 1,   //紫薇斗数   灵刃   魔翼
        Type2,  //天煞孤星   灵杖   霜翼
        Type3,  //吉星高照
        Type4,  //六煞凶星
    }

    /**子女神兵灵翼类型*/
    export const enum XianlvSurfaceType {
        Shenbing = 1,
        Lingyi = 2,
    }

    /**子女神兵灵翼名称*/
    export const XianlvSurfaceName = ['', '神兵', '灵翼'];
}