namespace game {
    /**支付事件*/
    export const enum PayEvent {
        ON_DIRECT_BUY_UPDATE = "on_direct_buy_update",/**支付刷新事件，会携带productId数组*/
    }

    /**商品id*/
    export const enum ProductId {
        Id100010 = 100010,//试炼封魔圣殿礼包
        Id100011 = 100011,//试炼金龟宝穴礼包
        Id100012 = 100012,//试炼蓬莱仙境礼包
        Id100013 = 100013,//多人boss礼包
        Id100014 = 100014,//异界礼包
        Id100015 = 100015,//异界场景礼包
        Id200006 = 200006,//仙侣礼包
        Id200304 = 200304,//至尊礼包全部购买礼包ID
        Id201302 = 201302,//荒古女神礼包
        Id201401 = 201401,//女神录-创世女神礼包
        Id201501 = 201501,//修仙女仆购买id
        Id201502 = 201502,//修仙女仆续费
        Id201503 = 201503,//修仙女仆续费
        Id201801 = 201801,//幻境灵宠
        Id201901 = 201901,//福利基金
        Id201902 = 201902,//超级基金
        Id201903 = 201903,//修仙礼包
    }

}

