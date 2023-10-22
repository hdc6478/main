namespace game {
    export const enum GiftEvent {
        ON_UPDATE_GIFT_INFO = "on_update_gift_info",//更新奖励信息
        ON_UPDATE_GIFT_HINT = "on_update_gift_hint",//抛出GiftType数组
    }

    /**对应【J-进阶奖励表】的【dabiaojiangli.json】类型*/
    export const enum GiftType {
        Yuanling = 1,//元灵试炼
        SuitType1,//套装苍天
        SuitType2,//套装炎天
        SuitType3,//套装颢天
        SuitType4,//套装玄天
        SuitType5,//套装钧天
        /**仙戒*/
        Ring,
        /**仙侣进阶*/
        XianLvJinJie = 8,
    }
}