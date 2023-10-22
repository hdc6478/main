namespace game {
    export const enum MiscEvent {
        INIT_MISC = "init_misc",
        ON_ROLE_LOGIN = "on_role_login",
        START_GAME = "start_game",
        SERVER_ERR = "server_err",
        START_SYNC_TIME = "start_sync_time",
        STOP_SYNC_TIME = "stop_sync_time",
        ON_RECEIVE_SETTING = "on_receive_setting",
        ON_RECEIVE_NEW_HOUR = "on_receive_new_hour",

        PAY_SUCCESS = "pay_success",
        GET_ORDER_START = "get_order_start",
        GET_ORDER_END = "get_order_end",
        GET_ORDER_ERROR = "get_order_error",
    }

    /**设置本地存储ley*/
    export const enum SettingKey {
        Guide = "guide",
        SoundMute = "sound_mute",
        SoundEft = "sound_eft",
        MaskOthers = "mask_others",
        MaskPet = "mask_pet",
        MaskSkillEft = "mask_skill_eft",
        LuckTips = "lucktips",//幸运值功能开启弹窗
        SetInfo = "set_info",
        FPSSetLowTime = "fpssetlowtime",
        CycleTower = "cycle_tower",

        bgMusic = "bgMusic" ,//屏蔽背景音乐
        autoShenjiang = "autoShenjiang",//自动召唤光暗神将
        gameMusic = "gameMusic" , //屏蔽游戏音效
        autoHuashen = "autoHuashen",//自动释放化神
        gameShake = "gameShake",//屏蔽游戏震屏

        performance = "performance",//游戏性能
        gameModel = "3", // 3 全开 2 推荐 1 流畅

        fubenChallenge = "fubenChallenge",//已经挑战个人副本
    }
}
