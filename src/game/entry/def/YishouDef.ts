namespace game {


    export const enum YishouEvent {
        ON_UPDATE_YISHOU_BASE_INFO = "on_update_yishou_base_info",
        ON_UPDATE_YISHOU_EQUIP_INFO = "on_update_yishou_equip_info",
        ON_UPDATE_YISHOU_SHOULING_INFO = "on_update_yishou_shouling_info",
        ON_UPDATE_YISHOU_COMPOSE_SELECT = "on_update_yishou_compose_select",//抛出合成选中事件
        ON_UPDATE_YISHOU_SYNTHESE_SUCCESS = "on_update_yishou_synthese_success",
        ON_UPDATE_YISHOU_SHOUYIN_INFO = "on_update_yishou_shouyin_info",
        ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO = "on_update_yishou_shouyin_jiban_info"
    }

    /**兽骨分类，对应装备id的部位*/
    export const enum YishouShouguPos {
        Shouya = 0,      //兽牙
        Shouhe,     //兽颌
        Shouke,     //兽壳
        Shoulin,    //兽鳞
        Shouyi,     //兽翼
        ShouZhua,   //兽爪
        Shouci,     //兽刺
        Shouwei,    //兽尾
    }

    /**兽骨分类数组*/
    export const YishouShouguPosAry = [
        YishouShouguPos.Shouya, YishouShouguPos.Shouhe, YishouShouguPos.Shouke,
        YishouShouguPos.Shoulin, YishouShouguPos.Shouyi, YishouShouguPos.ShouZhua,
        YishouShouguPos.Shouci, YishouShouguPos.Shouwei
    ];

    /**异兽类型*/
    export const enum YishouType {
        Type1 = 1,//圣龙魂体
        Type2,//仙鳞魂体
        Type3,//魔龙魂体
        Type4,//神龙魂体
        Type5,//神龙魂体
    }

    /**异兽类型对应数组*/
    export const YishouTypeAry = [
        YishouType.Type1, YishouType.Type2, YishouType.Type3,
        YishouType.Type4, YishouType.Type5
    ];

    /**mdr分类*/
    export const enum YishouMdrType {
        Shougu = 1,
        Shouhun = 2
    }

    /**异兽背包icon数量*/
    export const YishouBagCnt = 100;

    /**合成材料icon数量*/
    export const YishouComposeIconCnt = 3;

    /**异兽兽印类型*/
    export const enum YishouShouyinType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
    }

}