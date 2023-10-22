namespace game.mod.bag {

    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    import prop_tips_data = msg.prop_tips_data;

    export class BagModel {

        public bags:{ [type: number]: PropData[] } = {};/**type：背包类型，根据背包类型划分数据*/

        //存放的是key value  value 就是道具 PropData
        public items: {[key: string]: PropData} = {};/**根据物品唯一id存放数据*/

        public bagIndexs: { [index: number]: PropData[] } = {};/**物品index映射数据*/

        public bagBaseCnt:{ [type: number]: number } = {};/**type：背包类型，背包基础格子数*/
        public bagMaxCnt: { [type: number]: number } = {};/**type：背包类型，背包最大格子数*/

        public selTypeCfg: SynthesisTypeConfig;//选中的合成道具类型
        public composeCfgs: { [type: number]: {[star: number] : number[]} };//根据类型星级划分配置
        public selIndex: number;//选中的合成道具index
        public selSub: boolean = false;//合成是否选中子分页
        public lastSelIndex: number = 0;//上一次选中的合成道具下标
        public composeHint: string[] = [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Compose, HintType.BagCompose];//合成红点
        public propHint: string[] = [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Bag, HintType.BagProp];//背包红点
        public meltHint: string[] = [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Melt];//熔炼红点
        public meltTip: boolean = false;//熔炼提示
        public meltVal: number = 0;//熔炼值
        public meltMaxVal: number = 0;//熔炼值上限
        public useProps: number[] = [];//自动熔炼和使用的道具，存的是配置表index

        public props: prop_tips_data[] = [];//恭喜获得奖励

        public easyUse:PropData[] = [];

    }

}