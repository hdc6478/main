namespace game.mod.activity {

    import super_first_charge_item = msg.super_first_charge_item;

    export class FirstModel {
        /**充值数额 */
        public charged: number;
        /**累充列表数据 */
        public infos: super_first_charge_item[];
        /**开服天数 */
        // public open_day: number;

        one_first: boolean;

        /**type */
        public type: number;

        /**可领取天数 */
        public readonly receive: number = 3;

        public hintType: { [type: number]: string[] } = {
            [FirstRechargeType.Type1]: [ModName.Activity, MainActivityViewType.FirstCharge, MdrTabBtnType.TabBtnType01],
            [FirstRechargeType.Type2]: [ModName.Activity, MainActivityViewType.FirstCharge, MdrTabBtnType.TabBtnType02],
            [FirstRechargeType.Type3]: [ModName.Activity, MainActivityViewType.FirstCharge, MdrTabBtnType.TabBtnType03],
            [FirstRechargeType.Type4]: [ModName.Activity, MainActivityViewType.FirstCharge, MdrTabBtnType.TabBtnType04],
        };

        public cache_times: boolean = false;
    }
}
