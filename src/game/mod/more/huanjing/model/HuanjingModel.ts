namespace game.mod.more {

    export class HuanjingModel {

        public infoMap: { [systemId: number]: msg.s2c_update_huanjin_info } = {};
        public attrMap: { [systemId: number]: msg.s2c_huanjin_attr_update } = {};


        //最大进阶等级
        public stageLvMap: { [systemId: number]: number } = {};
        //槽位配置最大星级
        public starPosMap: { [systemId: number]: { [pos: number]: number } } = {};
        //幻灵配置的最大阶数
        public huanlingMaxStageMap: { [systemId: number]: { [type: number]: number } } = {};
        //幻灵被动技能条件
        public huanlingSkillMap: { [systemId: number]: { [type: number]: { [pos: number]: number[] } } } = {};
        //驻神技能配置的最大等级
        public zhushenSkillLvMap: { [systemId: number]: { [pos: number]: number } } = {};
        //外显表头
        public headTypes: number[] = [];
        //神灵id
        public shenlingIds: number[] = [];
        //消耗道具id
        public costIndexs: number[] = [];
        //神灵升星和觉醒消耗
        public shenlingStarCost: number[] = [];


        public mainHintPath: string[] = [ModName.More, MoreViewType.HuanjingMain, HuanjingMainBtnType.Btn1];
        //养成红点路径，此路径不可直接使用，需要拼接不同的systemId
        public growHintPath: string[] = [ModName.More, MoreViewType.HuanjingMain, HuanjingMainBtnType.Btn1, MoreViewType.HuanjingCollectMain, HuanjingCollectMainBtnType.Btn1, MoreViewType.HuanjingGrowMain, HuanjingGrowMainBtnType.Btn1];
        //收集红点路径，此路径不可直接使用，需要拼接不同的systemId
        public collectHintPath: string[] = [ModName.More, MoreViewType.HuanjingMain, HuanjingMainBtnType.Btn1, MoreViewType.HuanjingCollectMain, HuanjingCollectMainBtnType.Btn1];
    }

}