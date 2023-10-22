namespace game.mod.activity {


    import exchange_shop_info = msg.exchange_shop_info;
    import ShopConfig = game.config.ShopConfig;
    import daolv_house_info = msg.daolv_house_info;
    import LanDef = game.localization.LanDef;

    export class ExchangeShopModel {
        // /**tab的index 调用getTypeByIndex拿到类型 */
        // public tabIdx: number = 0;
        /**选中的shoptype */
        public shopType: number = 0;

        /**页签类型列表 */
        public shopTypeList: number[] = [
            ExchangeShopType.Type1,
            ExchangeShopType.Type2,
            ExchangeShopType.Type3,
            ExchangeShopType.Type4,
            ExchangeShopType.Type5,
            ExchangeShopType.Type6,
            ExchangeShopType.Type7,
            ExchangeShopType.Type8,
            ExchangeShopType.Type9,
        ];
        /**缓存商品数据 */
        public shopMap: { [type: number]: exchange_shop_info } = {};
        /**缓存配置信息 */
        public cfgMap: { [type: number]: ShopConfig[] } = {};
        /**缓存道侣表数据 */
        public daolvShopMap: { [index: number]: daolv_house_info } = {};

        /**大奖配置id */
        public paramIdMap: { [type: number]: string } = {
            [ExchangeShopType.Type3]: "exchange_shop_big_award2",
            [ExchangeShopType.Type2]: "exchange_shop_big_award1",
            [ExchangeShopType.Type4]: "exchange_shop_big_award3",
            [ExchangeShopType.Type5]: "exchange_shop_big_award4",
            [ExchangeShopType.Type6]: "exchange_shop_big_award5",
        };

        /**根据类型获取道具id */
        public getCoinIdByType: { [type: number]: number } = {
            [ExchangeShopType.Type1]: PropIndex.Rlcoin,
            [ExchangeShopType.Type2]: PropIndex.Ticket,
            [ExchangeShopType.Type3]: PropIndex.Jingjibi,
            [ExchangeShopType.Type4]: PropIndex.Fscoin,
            [ExchangeShopType.Type5]: PropIndex.Ssscoin,
            [ExchangeShopType.Type6]: PropIndex.Lmcoin,
            [ExchangeShopType.Type7]: PropIndex.Xzcoin,
            [ExchangeShopType.Type8]: PropIndex.Pretige,
            [ExchangeShopType.Type9]: PropIndex.Sgcoin,
        };

        /**获取功能开启id */
        public getOpenIdxByType: { [type: number]: number } = {
            [ExchangeShopType.Type1]: OpenIdx.ExchangeType1,
            [ExchangeShopType.Type2]: OpenIdx.ExchangeType2,
            [ExchangeShopType.Type3]: OpenIdx.ExchangeType3,
            [ExchangeShopType.Type4]: OpenIdx.ExchangeType4,
            [ExchangeShopType.Type5]: OpenIdx.ExchangeType5,
            [ExchangeShopType.Type6]: OpenIdx.ExchangeType6,
            [ExchangeShopType.Type7]: OpenIdx.ExchangeType7,
            [ExchangeShopType.Type8]: OpenIdx.ExchangeType8,
            [ExchangeShopType.Type9]: OpenIdx.ExchangeType9,
        };

        /**通过道具id更新商店类型红点 */
        public typeByPropId: { [propid: number]: number } = {
            [PropIndex.Rlcoin]: ExchangeShopType.Type1,
            [PropIndex.Ticket]: ExchangeShopType.Type2,
        };

        /**通过货币更新商店类型红点 */
        public typeByPropCoin: { [coin: number]: number } = {
            [PropIndex.Fscoin]: ExchangeShopType.Type4,
            [PropIndex.Jingjibi]: ExchangeShopType.Type3,
            [PropIndex.Ssscoin]: ExchangeShopType.Type5,
            [PropIndex.Lmcoin]: ExchangeShopType.Type6,
            [PropIndex.Xzcoin]: ExchangeShopType.Type7,
            [PropIndex.Pretige]: ExchangeShopType.Type8,
            [PropIndex.Sgcoin]: ExchangeShopType.Type9,
        };

        /**标题 */
        public titleIdByType: { [type: number]: string } = {
            [ExchangeShopType.Type1]: LanDef.dhsc_tips1,
            [ExchangeShopType.Type2]: LanDef.dhsc_tips2,
            [ExchangeShopType.Type3]: LanDef.dhsc_tips3,
            [ExchangeShopType.Type4]: LanDef.dhsc_tips4,
            [ExchangeShopType.Type5]: LanDef.dhsc_tips5,
            [ExchangeShopType.Type6]: LanDef.dhsc_tips6,
            [ExchangeShopType.Type7]: LanDef.dhsc_tips7,
            [ExchangeShopType.Type8]: LanDef.dhsc_tips8,
            [ExchangeShopType.Type9]: LanDef.dhsc_tips9,
        }
    }
}
