namespace game {

    export const enum StoreEvent {
        ON_UPDATE_TYPE_INFO_1 = "on_update_type_info_1",//藏宝阁
        ON_UPDATE_CHARGE_INFO = "on_update_charge_info",//直购
        ON_UPDATE_DAILY_WEEKLY_INFO = "on_update_daily_weekly_info",//每日、每周商城
    }

    /** 商店类型 */
    export const enum StoreType {
        Cangbaoge = 1,//藏宝阁
        Yaojibaoku = 101,//瑶姬宝库
        Xiandi = 105,//仙帝宝库
    }

    /**商品id分类，映射direct_shop.json【商品id汇总表】*/
    export const enum DirectShopType {
        /**仙玉商城*/
        Xianyu = 1,
        /**直购礼包*/
        Directbuy,
        /**每日*/
        Daily,
        /**每周*/
        Weekly,
        /**战令*/
        GameOrder,
        /**特权令*/
        PrerogativeWrit,
        /**每日特惠*/
        MeiriTehui = 9,
        /**通天阁*/
        Tongtiange = 10,
        /**神灵天赋礼包*/
        ShenlingGift = 14,
        /**飞升礼包*/
        FeishengLibao = 15,
    }

    /**限购类型*/
    export const enum StoreLimitBuy {
        None = 0,//不限购
        Daily = 1,//每日限购
        Lifetime = 2,//终生限购
        Weekly = 3,//每周限购
        Limit = 4//限购
    }

    /**每日每周商城的类型对应pb类型*/
    export const DirectType2PbType = {
        [DirectShopType.Daily]: 1,
        [DirectShopType.Weekly]: 2
    };

    /**商城商品解锁类型*/
    export const enum StoreUnlockType {
        Rebirth = 1,//转生等级
        Vip = 2,//vip等级
    }
}
