namespace game.mod {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import teammate = msg.teammate;
    import draw_luck_gift_data = msg.draw_luck_gift_data;
    import GameOrderConfig = game.config.GameOrderConfig;
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import demon_reward_info = msg.demon_reward_info;
    import Handler = base.Handler;
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import Texture = egret.Texture;

    /**红点数据结构接口*/
    export interface IHintData {
        /**节点唯一key*/
        node: string,
        /**红点值*/
        value: boolean,
    }

    /**新的界面数据结构接口*/
    export interface WndBaseViewData {
        /**分页类型 */
        btnType: string,
        /**分页图标，命名规则"xiuxian_tab" */
        icon: string,
        /**对应界面mdr*/
        mdr: new (parent: DisplayObjectContainer) => MdrBase,
        /**分页名称图标 */
        nameIcon?: string,
        /**标题*/
        title?: string,
        /**背景，统一让美术输出jpg格式*/
        bg?: string,
        /**功能开启id*/
        openIdx?: number,
        /** 红点类型 */
        hintTypes?: string[],
        /** 红点 */
        showHint?: boolean,
        /** 顶部显示的货币道具index */
        coinIndex1?: number,
        /** 顶部显示的货币道具index */
        coinIndex2?: number,
        /** 顶部显示的特殊展示道具index */
        coinIndex0?: number,
        param?: any,//备用参数，用any类型兼容不同数据
        /**tag */
        tag?: string,
    }

    /**新的分页结构接口*/
    export interface TabBaseItemData {
        /**分页图标 */
        icon?: string,
        /** 红点 */
        showHint?: boolean,
        /**分页名称图标 */
        nameIcon?: string,
        /** 灰色遮罩 */
        gray?: boolean,
        /**分页名称位文本 */
        nameGrpStr?: string,
        /**分页名称位文本 */
        nameGrpFont?: string,
        /**功能开启id*/
        openIdx?: number,
        param?: any,//备用参数，用any类型兼容不同数据
        /**指引ID*/
        guideKey?: number,
        /**tag */
        tag?: string,
        /**榜单id */
        rankType?: number,
        /**数量显示 */
        strCount?: string,
        /**名字文本*/
        nameStr?: string;
    }

    export interface BtnTabItemData {
        name: string,
        /** 红点 */
        showHint?: boolean,
        param?: any,//备用参数，用any类型兼容不同数据
    }

    /**装备IconEquip结构接口*/
    export interface IconEquipData {
        /**装备数据或者部位 */
        prop?: PropData | number,
        /** 红点 */
        showHint?: boolean,
        /**是否选中*/
        sel?: boolean,
        /**强化进阶等级*/
        lv?: number,
    }

    /**装备IconEquip结构选中时候接口*/
    export interface IconEquipSelData {
        /**部位index，0~9 */
        pos?: number,
        /**是否选中*/
        sel?: boolean,
    }

    /**IconSelMany结构接口*/
    export interface IconSelManyData {
        /**道具数据 */
        prop?: PropData,
        /** 红点 */
        showHint?: boolean,
        /**是否选中*/
        sel?: boolean,
        /**选中钩子 */
        selTrue?: boolean
    }

    /**奖励icon结构 有选中和领取效果 */
    export interface IconRewardData {
        /**道具数据 */
        prop?: PropData | number[],
        /** 红点 */
        showHint?: boolean,
        /**是否选中*/
        sel?: boolean,
        /**是否已领取 */
        isGot?: boolean,
        /**是否大奖 */
        isReward?: boolean,
        /**点击tips*/
        showTips?: boolean;
        /**是否上锁 */
        isLock?: boolean,
    }

    /**SkillItemRender结构接口*/
    export interface SkillItemRenderData {
        /**技能index */
        skillId?: number,
        /** 红点 */
        showHint?: boolean,
        /**是否激活*/
        isAct?: boolean,
        /**上锁图片*/
        lockStr?: string;
        /**背景图片*/
        bgStr?: string;
        /**技能等级 */
        level?: number;
        /**解锁条件 */
        limitStr?: string,
    }

    /**BattleSkillItemRender结构接口*/
    export interface BattleSkillItemRenderData {
        /**技能index */
        skillId?: number,
        /** 红点 */
        showHint?: boolean,
        /**技能等级*/
        lv?: number,
        /**是否隐藏技能激活提示*/
        hideTips?: boolean,
        /**技能标签*/
        imgTag?: string,
        /**是否显示技能等级，默认显示*/
        showLv?: boolean,
        /**是否显示0级技能，默认不显示*/
        showZero?: boolean,
        /**展示技能类型（减益） */
        skillType?: string,
        /**直接取技能等级描述*/
        lvDesc?: boolean,
    }

    /**AvatarItem结构接口*/
    export interface AvatarItemData {
        /**外显配置 */
        cfg?: any,
        /** 红点 */
        showHint?: boolean,
        /**外显星级*/
        star?: number,
        /**是否上阵或者出战*/
        isBattle?: boolean,
        /**是否选中*/
        isSel?: boolean,
        //排序字段
        sort?: number,
        /**进化神灵的进化次数*/
        evolution?: any;
    }

    /**上阵数据, AvatarIcon上阵结构接口*/
    export interface AvatarItemBattleData {
        index: number;
        isBattle: boolean;//是否出战
    }

    /**神灵技能icon的数据接口*/
    export interface ISLSkillIconData {
        /**技能index*/
        skill_index: number;
        /**激活否*/
        is_act: boolean;
        /**等级*/
        lv?: number;
        /**红点*/
        hint?: boolean;
        /**技能类型，SLSkillType*/
        skill_type?: number;
    }

    /**神灵技能tips数据类*/
    export interface ISLSkillTipsData {
        /**神灵index*/
        index: number;
        /**技能index*/
        skill_index: number;
        /**技能类型，SLSkillType*/
        skill_type: number;
    }

    /**MainRightActivityRender结构接口*/
    export interface MainRightActivityRenderData {
        /**分页图标*/
        icon?: string,
        /**功能开启id*/
        openIdx?: number,
        /** 界面数据，ModName和ViewType */
        viewDatas?: string[],
        /** 红点 */
        showHint?: boolean,
        /**指引ID*/
        guideKey?: number,
    }

    /**RankGodRender结构接口*/
    export interface RankGodRenderData {
        /**排行榜类型*/
        rankType?: number,
        /**大神奖励配置，chapteraward*/
        cfg?: any,
        /**上榜数据*/
        rankInfo?: teammate,
        /** 奖励领取状态 */
        status?: RankRewardStatus,
    }

    /**暂用召唤系统风云录 */
    export interface ISummonFengYunData {
        /**配置信息*/
        cfg?: any,
        /**上榜玩家信息*/
        rankInfo?: teammate,
        /**奖励状态*/
        status?: number
    }

    /**召唤系统礼券购买数据 */
    export interface ISummonShopData {
        /**配置信息 */
        cfg?: any,
        /**剩余可买次数 */
        count: number,
    }

    /**召唤系统命运豪礼数据 */
    export interface ISummonGiftData {
        /**命运豪礼类型 */
        type: number;
        /**配置信息 */
        cfg?: any;
        /**奖励状态 */
        status: draw_luck_gift_data;
    }

    /**送召唤卷列表数据 */
    export interface IGivingItemData {
        type: GameOrderType;
        /**配置信息 */
        cfg: GameOrderConfig;
        /**战令是否购买了*/
        isBought?: boolean;
        /**状态，免费奖励*/
        freeStatus?: RewardStatus;
        /**状态，付费奖励*/
        payStatus?: RewardStatus;
        /**当前战令的值，不传则默认规则获取*/
        val?: number;
        /**上个配置的值 */
        before?: number;
        /**下一个目标值 */
        next?: number;
    }

    /**通用战令item数据结构*/
    export interface IGameOrderItemData {
        /**战令类型*/
        type: GameOrderType;
        /**配置信息 */
        cfg?: GameOrderConfig;
        /**战令是否购买了*/
        isBought?: boolean;
        /**状态，免费奖励*/
        freeStatus?: RewardStatus;
        /**状态，付费奖励*/
        payStatus?: RewardStatus;
        /**当前战令的值，不传则默认规则获取*/
        val?: number;
        /**上个配置的值 */
        before?: number;
        /**下一个目标值 */
        next?: number;
    }

    export interface VProgressData {
        /**当前值 */
        val: number;
        /**上个配置的值 */
        start?: number;
        /**下一个目标值 */
        target?: number;
        /**进度条结束值(下个目标值的一半） */
        next?: number;
    }

    /**场景排行榜数据接口*/
    export interface SceneRankData {
        /**伤害列表*/
        hurtList: teammate[],
        /**我的信息*/
        myInfo: teammate,
    }

    export interface IRankSectionData {
        /**排名 */
        rank: number,
        /**名字 */
        name: string,
        /**数值 */
        value: number | string,
    }

    /**奖励排行榜数据接口*/
    export interface RankRewardRenderData {
        /**排名*/
        rank: number | string,
        /**名字*/
        name: string,
        /**伤害文本*/
        hurtStr?: string,
        /**排名奖励*/
        reward: number[][],
        /**排名文本，传这个的话，优先显示*/
        rankStr?: string,
        /**参数 */
        param?: any;
        /**查看排名回调*/
        lookHandler?: Handler;
    }

    /**奖励排行榜数据接口*/
    export interface RankCommonRenderData {
        /**排名*/
        rank: number,
        /**名字*/
        name: string,
        /**战力文本*/
        powerStr: string,
        /**伤害文本*/
        hurtStr: string,
    }

    /**首充豪礼每日奖励 */
    export interface IFirstItemData {
        /**奖励列表 */
        rewards: number[][];
        /**天数 */
        day: number;
    }

    /**根据类型和id获取配置和状态 */
    export interface IKillBossData {
        /**配置 */
        cfg: DemonRewardConfig;
        /**状态和数据 */
        status?: demon_reward_info;
    }

    /**聊天信息结构 */
    export interface ChatInfoListData {
        type?: ChatType;//1表情 2超链接 3文字
        content?: string;//聊天文本
        imgSource?: string;
        senderInfo?: teammate;
        chatChannel?: number;//频道类型
        eventData?: { [event: string]: [string[], ChatType] };
        contentSystem?: string;//系统公共文本，不做超链接处理
    }

    /**私聊信息结构 */
    export interface ChatPrivateData {
        roleId: Long;//角色ID
        serverId: number;//服务器ID
        name: string;//名字
        head?: Long;//头像
        headFrame?: Long;//头像框
        sex?: number;//性别
        isOnline?: number;//是否在线，1表示在线
        vipIndex?: number;//VIP index
    }

    /**批量购买结构 */
    export interface ShopBuyBulkData {
        /**物品id和数量 */
        prop?: number[];
        /**消耗道具和数量 */
        cost?: number[];
        /**限购类型 */
        lmt_type?: number;
        /**限购数量 */
        lmt_cnt?: number;
        /**限购左边数字 */
        left_cnt?: number;
        /**购买回调 */
        handler?: Handler;
    }

    export interface IDailyLimitActData {
        cfg: DailyLimitTimeConfig;
        startTime: number;  //开始时间，如果前一个活动时间段已过，则是下一个活动时间段的开始时间点。只有在活动时间段内才会有数据，否则都是0。这里暂时只用于排序
        endTime: number;    //结束时间，同上
        showHint: boolean;  //点击过一次，不再有红点
        state: number;//1：进行中，2：未开启，0：已结束
    }

    /**图标飞动效果结构接口*/
    export interface IconImageFlyData {
        /**起始X坐标，相对于当前View坐标*/
        startPosX: number,
        /**起始Y坐标，相对于当前View坐标*/
        startPosY: number,
        /**图标资源*/
        imgSource: string | Texture,
        /**图标宽度*/
        imgWidth: number,
        /**图标高度*/
        imgHeight: number,
        /*按钮类型，MainBtnType*/
        type: number,
        /**图标所属界面Layer，默认tip层*/
        layer?: Layer,
        /**飞动时间，默认1秒*/
        time?: number,
        /**结束后执行的回调*/
        handler?: Handler
    }

    /**奖励预览弹窗item数据接口*/
    export interface BasePreviewRewardData {
        /**奖池名称*/
        readonly nameStr?: string;
        /**权重(万分比)*/
        readonly weight?: number;
        /**奖励*/
        readonly award: number[][];
        /**描述文本，和nameStr，weight互斥*/
        readonly descStr?: string;
    }

    /**羁绊icon数据接口*/
    export interface IJibanBaseRenderData {
        /**羁绊配置*/
        cfg: any;
        isActed: boolean;
        showHint: boolean;
    }

    /**羁绊外显icon数据类*/
    export interface IJibanBaseItemRenderData {
        headType: number;
        /**羁绊配置*/
        jibanCfg: any;
        /**外显配置*/
        cfg: any;
        isActed: boolean;
        showHint: boolean;
        /**其他参数*/
        param?: any;
    }

    /**中控活动数据接口，修改时候需要注意下，搜下OperActivityData在哪里用到*/
    export interface OperActivityData {
        actInfo: msg.oper_act_item;//中控活动数据
        isSingleIcon: boolean;//是否独立图标
    }

    /**中控活动分页数据*/
    export interface ActMainBtnData {
        /**对应界面mdr*/
        mdr: new (parent: DisplayObjectContainer) => MdrBase,
        /**分页图标，命名规则"xiuxian_tab" */
        icon?: string,
        /**背景，统一让美术输出jpg格式*/
        bg?: string,
        /** 顶部显示的特殊展示道具index */
        coinIndex0?: number,
    }

    /**BOSS复活提示*/
    export interface BossReviveData {
        nameStr: string;//多人boss或者VIP boss
        index: number;//BOSS index
        jumpId: number;//界面跳转ID
    }

    /**清除场景数据*/
    export interface CleanSceneData {
        clearAll?: boolean;//清除所有，包括主角地图等等
    }

    /**星星结构数据*/
    export interface StarItemFuData {
        starStr: string;//星星资源
        width?: number;//宽度
    }

    /**神灵属性按钮数据*/
    export interface ShenlingTypeIconData {
        type: ShenLingType;
        showHint: boolean;
    }

    /**神灵模型数据，进化神灵或女仆神灵的模型名字品质等会有不同*/
    export interface ShenlingModelData {
        index: number;
        name: string;
        quality: QualityType;
        icon: string;
        specialQuality?: SpecialQualityType;
    }

    /**召唤特效界面数据*/
    export interface SummonEffectData {
        type: SummonEffectType;//类型
        list: msg.prop_tips_data[];//奖励
        luckNum: number;//欧气值
        cost?: PropData;//消耗
        handler?: Handler;//点击回调函数
    }

    /**突破成功数据*/
    export interface BreakthroughData {
        skillId: number;    //技能id
        lv: number;         //突破后的阶数
        attrDesc0?:string;  //突破前的文本或属性
        attrDesc1?:string;  //突破后的文本或属性
    }

    /**升星成功数据*/
    export interface UpStarData {
        star: number;       //升星后星级
        attrFont0?: string; //font字体
        attrFont1?: string; //font字体
        attrDesc0?: string; //升星前数据，文本
        attrDesc1?: string; //升星后数据，文本
        skillId?: number;   //技能
    }

}