namespace game.mod.activity {

    export class YjjsModel {
        /**三生修练*/
        public sansheng_target_list: msg.yaoji_target[] = [];//目标奖励数据

        /**三世危机*/
        public sanshi_target_list: msg.yaoji_target[] = [];
        public sanshi_stage: number = 0;//阶段
        public sanshi_count: number = 0;//完成的数量

        /**神器修炼*/
        public shenqi_count: number = 0;

        /**瑶姬宝库*/
        public baoku_list: msg.yaoji_baoku[] = [];

        /**累充礼包*/
        public charge_list: msg.yaoji_target[] = [];

        /**目标豪礼*/
        public haoli_list: number[] = [];

        /**瑶姬令*/
        public ling_list: msg.yaoji_target[];
        public ling_list2: { [index: number]: msg.yaoji_target } = {};
        public ling_day: number = 0;
        public is_ling_buy = false;

        public hintPath: { [type: number]: string[] } = {
            [1]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn1],
            [2]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn2],
            [3]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn3],
            [4]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn4],
            [5]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn5],
            [6]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn6],
            [7]: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn7]
        };
    }

}