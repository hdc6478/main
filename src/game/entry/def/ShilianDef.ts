namespace game {

    export const enum ShilianEvent {
        ON_FUBEN_INFO_UPDATE = "on_fuben_info_update",/**副本信息更新*/
        ON_FUBEN_SCENE_UPDATE = "on_fuben_scene_update",/**副本场景信息更新*/
        ON_FUBEN_SKIP_UPDATE = "on_fuben_skip_update",/**副本场景跳关更新*/
        ON_FORBIDDEN_INFO_UPDATE = "on_forbidden_info_update",/**禁地副本信息更新*/
        ON_FORBIDDEN_AWD_UPDATE = "on_forbidden_awd_update",/**禁地副本通关大奖更新*/
        ON_XIANTA_INFO_UPDATE = "on_xianta_info_update",/**仙塔副本信息更新*/

        /**元灵试炼*/
        ON_YUANLING_INFO_UPDATE = "on_yuanling_info_update",
        ON_YUANLING_TEAM_LIST_UPDATE = "on_yuanling_team_list_update",
        ON_YUANLING_TEAM_INFO_UPDATE = "on_yuanling_team_info_update",
        ON_YUANLING_BUFF_INFO_UPDATE = "on_yuanling_buff_info_update",
        ON_YUANLING_TEAM_INVITE = "on_yuanling_team_invite",
        ON_YUANLING_TEAM_INVITE_BTN = "on_yuanling_team_invite_btn",
        ON_YUANLING_ROLE_LIST_UPDATE = "on_yuanling_role_list_update",
        ON_YUANLING_JUMP_TO_VIEW = "on_yuanling_jump_to_view",
        ON_YUANLING_INVITE_LIST_ITEM_DELETE = "on_yuanling_invite_list_item_delete",
        ON_YUANLING_FUBEN_INFO_UPDATE = "on_yuanling_fuben_info_update",
        ON_YUANLING_DAMAGE_INFO_UPDATE = "on_yuanling_damage_info_update",
    }

    /**副本类型*/
    export const enum FubenType {
        Type1 = 1,           /**金龟宝穴*/
        Type2 = 2,           /**封魔圣殿*/
        Type3 = 3,           /**蓬莱仙境*/
    }

    /**禁地副本类型*/
    export const enum ForbiddenType {
        Type1 = 1,           /**类型1*/
        Type2 = 2,           /**类型2*/
        Type3 = 3,           /**类型3*/
        Type4 = 4,           /**类型4*/
        Type5 = 5,           /**类型5*/
    }

    export const ForbiddenTypeName = {
        [ForbiddenType.Type1]: '血色禁地',
        [ForbiddenType.Type2]: '荒古禁地',
        [ForbiddenType.Type3]: '仙灵禁地',
        [ForbiddenType.Type4]: '天之禁地',
        [ForbiddenType.Type5]: '神之禁地'
    }

    export const YuanLingDiffAry = ['', '普通', '困难', '传说', '炼狱']
}