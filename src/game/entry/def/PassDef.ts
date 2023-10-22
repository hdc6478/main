namespace game {
    export const enum PassEvent {
        UPDATE_PASS_RANK_INFO = "update_pass_rank_info",
        UPDATE_PASS_GOD_RANK_INFO = "update_pass_god_rank_info",
        UPDATE_PASS_GOD_RANK_AWD_GOT_INFO = "update_pass_god_rank_awd_got_info",
        UPDATE_PASS_MAP_AWD_GOT_INFO = "update_pass_map_awd_got_info",
        UPDATE_PASS_WORLD_MAP_TOP_INFO = "update_pass_world_map_top_info",
        UPDATE_PASS_FB_QI_YUAN_INFO = "update_pass_fb_qi_yuan_info",

        UPDATE_MAIN_PASS_INFO = "update_main_pass_info",
        MAIN_PASS_GUANQIA_UPDATE = "main_pass_guanqia_update",//已通关关卡数变更时候会派发
        CHALLENGE_HANGUP_BOSS = "challenge_hangup_boss",//挑战挂机boss

        ON_UPDATE_PREVIEW_INFO = "on_update_preview_info",
        ON_UPDATE_PREVIEW_SELECT = "on_update_preview_select",
    }
}
