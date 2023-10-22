namespace game.mod.surface {

    import lianshendan_swal_data = msg.lianshendan_swal_data;
    import ride_info = msg.ride_info;
    import HorseConfig = game.config.HorseConfig;
    import buy_reward_item = msg.buy_reward_item;
    import module_event_add_attr_data = msg.module_event_add_attr_data;
    import yuanling_equip_data = msg.yuanling_equip_data;
    import yuanling_equip_suit = msg.yuanling_equip_suit;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import huashen_unit_data = msg.huashen_unit_data;

    export class SurfaceModel {
        public pillInfos: { [surfaceId: number]: lianshendan_swal_data[] } = {};//吞噬丹信息
        public surfaceInfos: { [headType: number]: ride_info } = {};//外显信息
        public headType: number;//当前打开的界面
        /**当前选中的外显信息*/
        public selData: AvatarItemData;
        public surfaceTypes: { [headType: number]: number[] } = {};//外显类型信息
        public surfaceCfgs: { [comType: string]: HorseConfig[] } = {};//外显类型配置信息，comType=headType+type
        public battleFlag: boolean = false;//请求幻化标志
        public rewardList: buy_reward_item[] = [];
        public skillProps: { [headType: number]: number[] } = {};//外显技能激活道具
        public specialAttrInfos: { [index: number]: module_event_add_attr_data } = {};//特殊的属性信息
        /**当前选中的羁绊配置*/
        public selJibanCfg: HorseJibanConfig;

        /**以下需要做类型映射*/
        public headTypes: number[] = [ConfigHead.Horse, ConfigHead.Tianshen, ConfigHead.Wing, ConfigHead.Body, ConfigHead.Weapon];//礼包可购买刷新用
        /**默认初始化外显id */
        public headTypeToDefaultId: { [headType: number]: number } = {
            // [ConfigHead.Horse]: 360240001,//类型映射默认显示外显index
            // [ConfigHead.Tianshen]: 640025002,//类型映射默认显示外显index
            // [ConfigHead.Wing]: 404011001,
            // [ConfigHead.Body]: 405011001,
            // [ConfigHead.Weapon]: 403011001,
            //通用的直接读配置
            [ConfigHead.Lingchong]: 3610000101,
            [ConfigHead.Xianjian]: 408011001,
        };
        /**功能开启id */
        public headTypeToOpenIdx: { [headType: number]: number } = {
            [ConfigHead.Horse]: OpenIdx.Horse,//类型映射功能开启id
            [ConfigHead.Tianshen]: OpenIdx.Tianshen,//类型映射功能开启id
            [ConfigHead.Lingchong]: OpenIdx.Yuanling,//类型映射功能开启id
            [ConfigHead.Body]:OpenIdx.Body,
            [ConfigHead.Wing]:OpenIdx.Wing,
            [ConfigHead.Weapon]:OpenIdx.Weapon,
            [ConfigHead.Huashen]:OpenIdx.Huashen,
        };
        /** 根据headType获取ModName.Surface下的SurfaceViewType 用于点击模型跳转界面 */
        public headTypeToViewType: { [headType: number]: string } = {
            [ConfigHead.Horse]: SurfaceViewType.HorseMain,
            [ConfigHead.Tianshen]: SurfaceViewType.TianshenMain,
            [ConfigHead.Lingchong]: SurfaceViewType.LingChongMain,
        };
        public headTypeToBtnType: { [headType: number]: string } = {
            [ConfigHead.Horse]: JibanMainBtnType.Horse,//类型映射羁绊按钮类型
            [ConfigHead.Tianshen]: JibanMainBtnType.Tianshen,//类型映射羁绊按钮类型
        };
        /**外显升级红点 */
        public upHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseUp],//升级红点
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.TianshenUp],//升级红点
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.Wing, HintType.WingUp],//升级红点
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.Weapon, HintType.WeaponUp],//升级红点
            // [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body, HintType.BodyUp],//升级红点
            [ConfigHead.Huashen]: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen, HintType.HuashenUp],//升级红点
        };
        public upPropToHeadType: { [index: number]: number } = {
            [PropIndex.Zuoqijinjiedan]: ConfigHead.Horse,//升级道具映射类型
            [PropIndex.Yuanlingjinjiedan]: ConfigHead.Tianshen,//升级道具映射类型
            [PropIndex.Shenbinjiedan]: ConfigHead.Weapon,//升级道具映射类型
            [PropIndex.Yuyijinjiedan]: ConfigHead.Wing,//升级道具映射类型
            [PropIndex.Huashenjinjiedan]: ConfigHead.Huashen,//升级道具映射类型
        };
        public subTypeToHeadType11: { [subType11: number]: number } = {
            [PropSubType11.Horse]: ConfigHead.Horse,//外显碎片子类型映射类型
            [PropSubType11.Tianshen]: ConfigHead.Tianshen,//外显碎片子类型映射类型
            [PropSubType11.Weapon]: ConfigHead.Weapon,//外显碎片子类型映射类型
            [PropSubType11.Wing]: ConfigHead.Wing,//外显碎片子类型映射类型
            [PropSubType11.Body]: ConfigHead.Body,//外显碎片子类型映射类型
            [PropSubType11.Huashen]: ConfigHead.Huashen,//外显碎片子类型映射类型
        };
        public subTypeToHeadType17: { [subType17: number]: number } = {
            [PropSubType17.Horse]: ConfigHead.Horse,//炼神丹子类型映射类型
            [PropSubType17.Tianshen]: ConfigHead.Tianshen,//炼神丹子类型映射类型
            [PropSubType17.Wing]: ConfigHead.Wing,//炼神丹子类型映射类型
            [PropSubType17.Weapon]: ConfigHead.Weapon,//炼神丹子类型映射类型
            [PropSubType17.Body]: ConfigHead.Body,//炼神丹子类型映射类型
            [PropSubType17.Huashen]: ConfigHead.Huashen,//炼神丹子类型映射类型
        };
        public subTypeToHeadType32: { [subType32: number]: number } = {
            [PropSubType32.Horse]: ConfigHead.Horse,//外显升星石子类型映射类型
            [PropSubType32.Tianshen]: ConfigHead.Tianshen,//外显升星石子类型映射类型
            [PropSubType32.Wing]: ConfigHead.Wing,//外显升星石子类型映射类型
            [PropSubType32.Weapon]: ConfigHead.Weapon,//外显升星石子类型映射类型
            [PropSubType32.Body]: ConfigHead.Body,//外显升星石子类型映射类型
            [PropSubType32.Huashen]: ConfigHead.Huashen,//外显升星石子类型映射类型
        };
        /**外显技能红点提示 */
        public skillHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseSkill],//技能红点
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.TianshenSkill],//技能红点
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.Wing, HintType.WingSkill],
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.Weapon, HintType.WeaponSkill],
            // [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body, HintType.BodySkill],
            [ConfigHead.Huashen]: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen, HintType.HuashenSkill],
        };
        public jibanHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseJiban],//羁绊红点
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.TianshenJiban],//羁绊红点
        };
        public giftHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseGift],//进阶豪礼红点
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.TianshenGift],//进阶豪礼红点
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.Wing, HintType.WingGift],//进阶豪礼红点
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.Weapon, HintType.WeaponGift],//进阶豪礼红点
            // [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body, HintType.BodyGift],//进阶豪礼红点
        };
        public actHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.HorseStar, HintType.HorseAct],//激活升星
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenStar, HintType.TianshenAct],//激活升星
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.WingStar, HintType.WingAct],
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.WeaponStar, HintType.WeaponAct],
            [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.BodyStar, HintType.BodyAct],
            [ConfigHead.Huashen]: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar, HintType.HuashenAct],
        };
        /**幻化界面 吞噬丹红点 */
        public pillHints: { [headType: number]: string[] } = {
            [ConfigHead.Horse]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.HorseStar, HintType.HorsePill],//炼神丹
            [ConfigHead.Tianshen]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenStar, HintType.TianshenPill],//炼神丹
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.WingStar, HintType.WingPill],
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.WeaponStar, HintType.WeaponPill],
            [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.BodyStar, HintType.BodyPill],
            [ConfigHead.Huashen]: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar, HintType.HuashenPill],
        };
        /**功能主界面跳转幻化界面红点 */
        public starHint: { [headType: number]: string[] } = {
            [ConfigHead.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.WingStar],
            [ConfigHead.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.WeaponStar],
        };
        /**幻化跳转页签*/
        public starJumpData: { [headType: number]: string } = {
            [ConfigHead.Wing]: WingMainBtnType.WingStar,
            [ConfigHead.Weapon]: WeaponMainBtnType.WeaponStar,
        };
        /**上阵红点 */
        public battleHints: { [headType: number]: string[] } = {
            [ConfigHead.Huashen]: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar, MoreViewType.HuashenBattleMain, MdrTabBtnType.TabBtnType01],
        };

        public huashenIds: number[];//当前场景上阵的化神，切换化神时会调换位置
        public huashenTime: number;//化神变身持续时间，20秒
        public lastHuashenId: number;//上一次的变身ID

        /************************** 元灵.装备 *************************/
        public yuanlinEqpInfo: { [type: number]: { [pos: number]: yuanling_equip_data } } = {};// 元灵装备信息
        public yuanlinSuitInfo: { [type: number]: yuanling_equip_suit } = {};// 元灵套装信息
        public yuanlinEquipPower: { [type: number]: Long } = {};// 元灵装备战力
        public yuanlinSuitPower: { [type: number]: Long } = {};// 元灵套装战力
        public yuanlinHint: string[] = [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenEquip];  //元灵红点
        public yuanlinEqpOpeHint: string[] = [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenEquip, HintType.TianshenEqpOpe];  //元灵装备激活、升阶红点
        public yuanlinSuitOpeHint: string[] = [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenEquip, HintType.TianshenSuitOpe];  //元灵套装激活、升阶红点

    }
}