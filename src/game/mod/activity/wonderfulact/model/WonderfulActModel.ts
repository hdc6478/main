namespace game.mod.activity {

    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;

    export class WonderfulActModel {
        /** 领取状态  0未领取   1已领取 */
        public status: number;
        /** 开启时间戳 */
        public open_time: number = 0;

        /**藏珍阁*/
        public box_list: { [index: number]: msg.cangzhenge_struct } = {};
        /** 大奖状态 0未开启   1已开启 */
        public big_box_status: number = 0;
        public act_id_czg = 0;

        /**连续充值*/
        public list_keepcharge: { [type: number]: msg.keepcharge_data } = {};
        public act_id_keepcharge = 0;

        /**累计充值*/
        public list_addcharge: { [index: number]: msg.keepcharge_struct } = {};
        /** 充值累计金额 */
        public num_addcharge: number = 0;
        public act_id_addcharge = 0;

        /**登录活动*/
        public list_login: { [index: number]: msg.keepcharge_struct } = {};
        public act_id_login = 0;
        public num_login = 0;

        public count:number = 0;

        public hintPath: { [type: number]: string[] } = {
            [1]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn1],
            [2]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn2],
            // [3]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn3],
            [4]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn4],
            [5]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn5],
            [6]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn6]
        };

        //连续充值
        public hintPath1 = {
            [1]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn3, MdrTabBtnType.TabBtnType01],
            [2]: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn3, MdrTabBtnType.TabBtnType02]
        };

        /********************************天女赐福&&VIP5福利****************************************/
        public infos: { [type: number]: msg.s2c_tired_charge_info } = {};//type是TiannvWelfareOpType
        public tiannvCfgs: { [valueType: number]: TiannvchargeWealConfig[] } = null;//valueType是累充档位
        public tiannvValueTypes: number[] = [];//type是累充档位
        public tiannvHint: string[] = [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn7];
        public vipHint: string[] = [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn8];
    }

}