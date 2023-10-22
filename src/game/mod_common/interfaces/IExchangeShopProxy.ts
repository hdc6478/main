namespace game.mod {
    import IProxy = base.IProxy;
    import treasure_house_info = msg.treasure_house_info;
    import daolv_house_info = msg.daolv_house_info;

    export interface IExchangeShopProxy extends IProxy {
        //兑换红点
        getHintByExchangeType(type: ExchangeShopType): boolean;

        c2s_exchange_shop_info(shop_type: number): void;

        c2s_exchange_shop_buy_prop(index: number, buy_cnt: number, shop_type?: number): void;

        getInfoByTypeIndex(index: number, type?: number): treasure_house_info | daolv_house_info;
    }

}