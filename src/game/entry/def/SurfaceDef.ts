namespace game {

    export const enum SurfaceEvent {
        LIANSHENDAN_INFO_UPDATE = "lianshendan_info_update",/**炼神丹信息更新，会携带ConfigHead列表*/
        SURFACE_INFO_UPDATE = "surface_info_update",/**外显信息更新，会携带ConfigHead*/
        SURFACE_RIDE_INFO_UPDATE = "surface_ride_info_update",/**单个外显星级属性变化*/
        SURFACE_GIFT_INFO_UPDATE = "surface_gift_info_update",/**外显礼包信息*/
        SURFACE_SPECIAL_ATTR_UPDATE = "surface_special_attr_update",/**特殊的属性信息*/
        SURFACE_JIBAN_INFO_UPDATE = "surface_jiban_info_update",/**单个外显羁绊变化*/
        SURFACE_SKILL_UPDATE = "surface_skill_update",/**技能激活状态变更， 携带激活状态*/
        YUANLIN_EQUIP_INFO_UPDATE = "yuanlin_equip_info_update",/**元灵装备信息更新*/
        YUANLIN_SUIT_INFO_UPDATE = "yuanlin_suit_info_update",/**元灵套装信息更新*/
        LING_CHONG_INFO_UPDATE = "ling_chong_info_update",/**灵宠信息*/
        ON_UPDATE_SHANGZHEN_INFO = "on_update_shangzhen_info",
        ON_UPDATE_XIANJIAN_INFO = "on_update_xianjian_info",
        SURFACE_ACT_UPDATE = "surface_act_update",/**外显激活成功，会携带外显index*/
        ON_SURFACE_TIPS_HIDE = "on_surface_tips_hide",//外显激活成功界面关闭抛出
    }

    export const enum SurfaceUpOpType {
        /** 1:单次升级，2:一键升级 */
        Per = 1,
        Onekey = 2,
    }

    export const enum SurfaceStarOpType {
        /** 1:幻形激活/升星 2:幻化 */
        Act = 1,
        Battle = 2,
    }

    export const SurfacePerExp: number = 10;//外显单次升级10经验
    export const SurfacePerLv: number = 10;//外显小等级为10

    /**
     * 系统的进阶奖励用表头，副本类的另外定义
     * 与后端商量，枚举如下
     * jinjiejiangli.json
     */
    export const enum FubenAdvRewardIdx {
        YuanlingShilian = 10001, //元灵试炼
    }

    //外显配置type
    export const enum SurfaceCfgType {
        Type2 = 2,//化神中，2类型四魔神
    }
}