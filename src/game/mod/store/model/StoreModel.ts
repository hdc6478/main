namespace game.mod.store {

    import treasure_house_info = msg.treasure_house_info;
    import daily_mall_info = msg.daily_mall_info;

    export class StoreModel {
        /**=========== 藏宝阁 ===========*/
        public treasureInfos: { [index: number]: treasure_house_info } = {};

        /**=========== 仙玉商城 ===========*/
        /** 存在代表没有倍数 */
        public no_multi_product_ids: number[] = [];
        /** 1 代表没有 */
        public no_first_charge: number = 0;
        /** 每日礼包领取状态 1:已领取 0:未领取 */
        public daily_reward_state: number = 0;

        /**=========== 1每日商城，2每周商城 ===========*/
        public infos: { [type: number]: daily_mall_info } = {};

        /**红点路径*/
        public storeHint = {
            [StoreMainBtnType.Btn1]: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn1],//藏宝阁红点路径
            [StoreMainBtnType.Btn3]: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn3],//藏宝阁红点路径
            [StoreMainBtnType.Btn4]: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn4]//藏宝阁红点路径
        };
    }

}