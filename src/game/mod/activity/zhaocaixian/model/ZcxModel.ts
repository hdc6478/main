namespace game.mod.activity {

    import ZcxFundConfig = game.config.ZcxFundConfig;

    export class ZcxModel {
        /** 幸运数字 */
        public luck_num: number = 0;
        /** 0不可领取   1可领取   2已领取 */
        public status: number = 0;
        /** 第x等奖   0表示未开奖 */
        public rank_num: number = 0;
        /** 字段value为幸运数字 */
        public list: msg.teammate[] = [];

        /** 存储的货币数 */
        public value: Long = Long.fromNumber(0);
        /** 收益重新开始的时间戳 */
        public save_time = 0;
        /** 收益道具 */
        public item_list: msg.prop_tips_data[] = [];

        /** 兑换列表 */
        public exchange_list: { [index: number]: msg.zcx_exchange_data } = {};

        /** 副本--获得奖励记录 */
        public records: msg.zcx_raid_record[] = [];
        /** 副本--剩余可挑战次数 */
        public count: number = 0;

        /**============基金============*/
        public fundMap: { [type: number]: msg.s2c_zcx_fund_update } = {};
        public fundBoxShowMap: { [type: number]: number } = {};
        public fundRewardShowMap: { [type: number]: number } = {};

        public fundCfgMap: { [type: number]: ZcxFundConfig[] } = {};

        public hintPath: { [btnType: string]: string[] } = {
            [ZcxMainBtnType.LuckNum]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.LuckNum],
            [ZcxMainBtnType.Bank]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Bank],
            [ZcxMainBtnType.Fuben]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Fuben],
            [ZcxMainBtnType.Exchange]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Exchange],
            [ZcxMainBtnType.Chaojilicai]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Chaojilicai],
            [ZcxMainBtnType.Zhizunlicai]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Zhizunlicai],
            [ZcxMainBtnType.Fulijijin]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Fulijijin],
            [ZcxMainBtnType.Chaojijijin]: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Chaojijijin]
        };
    }

}