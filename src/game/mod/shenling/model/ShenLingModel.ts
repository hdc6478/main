namespace game.mod.shenling {

    import god_brother_group_data = msg.god_brother_group_data;

    export class ShenLingModel {
        /**神灵类型信息*/
        public list: { [type: number]: GodBrotherTypeData } = {};
        /**羁绊列表*/
        public jiBanList: { [index: number]: god_brother_group_data } = {};
        /**单个神灵奖励状态*/
        public rewardList: { [index: number]: number[] } = {};

        /**神灵主界面红点路径*/
        public mainHintPath: string[] = [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Main];
        /**神灵升星红点路径*/
        public upStarHintPath: string[] = [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.UpStar]
        /**羁绊红点路径*/
        public jibanHintPath: string[] = [ModName.Jiban, JibanViewType.JibanMain + JibanMainBtnType.ShenLing]
    }

    /**
     *  对应 god_brother_type_data 进行结构调整，将 list 改成 k-v 模式
     */
    export class GodBrotherTypeData {
        public postype: number;// 神灵类型 水 火 风 雷
        public level: number;// 神灵类型等级
        public exp: number; // 当前升级次数
        public upindex: number;// 已上阵的神灵index，此字段不能修改，ResultWinRender有用到
        public skilllevel: number;// 合击技能阶数(突破一次加一阶)
        public skill_list: number[] = [];//灵宝技能{技能id,技能id,...}未激活则为0
        public splevel_list: number[] = []; // 已突破的等级 列表
        public list: { [index: number]: msg.god_brother_data } = {};//已激活的神灵列表
        public now_attrs: msg.attributes;
    }

}