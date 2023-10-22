namespace game.mod.activity {

    export class FuchenlinghuModel {
        // 当前卡池类型, 1仙界之海 2神界之海 3圣界之海
        public type: number;
        // 当前up的index，参数表第几个
        public up: number;
        // 当前卡池召唤次数
        public count: number;
        // 累计召唤次数，不重置
        public forever_count: number;

        // 周期累计召唤次数
        public total_count: number;
        // 已领取的幻境赠礼index
        public zengli_data: number[];
        // 已领取的免费档宝藏index
        public free_baozang_data: number[];
        // 已领取的付费档宝藏index
        public buy_baozang_data: number[];
        // 已领取的累充index
        public leichong_data: number[];
        // 已领取的礼包index
        public gift_data: msg.buy_gift_data[];

        //稀有奖励池
        public extraProps: { [type: number]: number[][] } = {};
        //是否勾选百连召唤
        public isHundred = false;

        //浮沉灵壶，幻境赠礼，幻境宝藏
        public hintPath: { [btnType: string]: string[] } = {
            [SummonMainBtnType.Fuchenlinghu]: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu],
            [SummonMainBtnType.Huanjingzengli]: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Huanjingzengli],
            [SummonMainBtnType.Huanjingbaozang]: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Huanjingbaozang]
        };
        //幻境累充
        public leichongHintPath: string[] = [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn9];
        //幻境礼包
        public libaoHintPath: string[] = [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn10];
    }

}