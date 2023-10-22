namespace game.mod.xianlu {

    import attributes = msg.attributes;
    import xian_dan_data = msg.xian_dan_data;
    import ElixirInitConfig = game.config.ElixirInitConfig;
    import lingpool_type_data = msg.lingpool_type_data;
    import lingmai_data = msg.lingmai_data;
    import linggen_data = msg.linggen_data;
    import LinggenLeixingConfig = game.config.LinggenLeixingConfig;
    import LinggenConfig = game.config.LinggenConfig;

    export class XianluModel {
        public index: number;// 当前转生索引
        public xianpo_attr: attributes;// 仙魄属性
        public xianpo_nextattr: attributes;//下级仙魄属性
        public xianpolevel: number = 0;//当前仙魄等级
        public rewardindex: number = 143001001;//当前领取的仙魄奖励索引
        public rewardstatus: number = TaskStatus.NotFinish;//当前领取的仙魄奖励状态 0不可领取  1可以领取   2已领取
        public rewardHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiuxian, HintType.XiuxianReward];//奖励红点

        public pill_list: xian_dan_data[];//仙丹信息
        public pillCfgList: { [type: number]: ElixirInitConfig[] } = {};/**客户端分类好的仙丹index*/
        public pillHints: string[][] = [
            [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiandan, HintType.XiandanType1],
            [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiandan, HintType.XiandanType2],
            [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiandan, HintType.XiandanType3],
        ];//仙丹红点

        public pool_list: lingpool_type_data[];//灵池信息
        public poolType: number;
        public battleView: boolean;
        public poolRewardHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingchi, HintType.LingchiReward];//奖励红点
        public poolUpHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingchi, HintType.LingchiUp];//升级红点
        public poolBattleHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingchi, HintType.LingchiBattle];//派遣红点

        public lingmai_list: lingmai_data[];//灵脉信息
        public lingmaiMaxLv: number;//灵脉最大重数
        public lingmaiUpHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingmai, HintType.LingmaiUp];//升级红点

        public linggen_list: linggen_data[];//灵根信息
        public linggenCfgList: { [type: number]: LinggenConfig[] } = {};/**客户端分类好的灵根index*/
        public linggenUpHint: string[] = [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Linggen, HintType.LinggenUp];//升级红点
    }
}