declare namespace game.mod.role {
    import ArrayCollection = eui.ArrayCollection;
    class DressUpInfoMdr extends MdrBase {
        protected _view: DressUpInfoView;
        private _proxy;
        protected _dressCol: ArrayCollection;
        private _typeList;
        private curIndex;
        private _data;
        /**当前选中的外显类型*/
        private _selType;
        protected _type: DressUpType;
        protected onInit(): void;
        protected onInitDressList(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private initTypeList;
        private updateView;
        private updateDressInfo;
        private getDressUpCfg;
        private updateStateView;
        private setListData;
        private isHint;
        private computerNumber;
        private showTheIndex;
        private updateShowRes;
        private showResByIndex;
        private updateAttr;
        private onTap;
        private onDress;
        private updateItemSel;
        private updateItemType;
        private updateTypeListHint;
        protected onHide(): void;
    }
}
declare namespace game.mod.role {
    /**苍天进阶*/
    class SuitType1Mdr extends EffectMdrBase {
        private _view;
        protected _proxy: SuitProxy;
        /**苍天，炎天*/
        protected _type: SuitType;
        /**1进阶，2强化*/
        protected _skinType: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected getPower(): number;
        protected updateView(): void;
        private updateComposeBtnHint;
        protected updateAdvanceView(): void;
        private updateBtnDress;
        private onClickBtnOneKeyDress;
        protected updateStrengthenView(): void;
        private switchView;
        private onClickFanli;
        private onClickCompose;
        private onClickSuitTips;
        private onClickOneKey;
        private onClickMaster;
        protected onClickAttr(): void;
        private onUpdateHint;
    }
    /**苍天强化*/
    class SuitType1StrengthenMdr extends SuitType1Mdr {
        /**苍天，炎天*/
        protected _type: SuitType;
        /**1进阶，2强化*/
        protected _skinType: number;
        protected onClickAttr(): void;
    }
}
declare namespace game.mod.role {
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    class SuitType3ForgeMdr extends MdrBase {
        protected _view: SuitForgeView;
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _type: SuitType;
        protected _curIcon: ISuitIconData;
        private _notActAttrId;
        private attrIds;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected updateView(): void;
        protected updatePower(): void;
        protected onClickForge(): void;
        protected onUpdateMiddleView(n: GameNT): void;
        protected updateMiddleView(): void;
        protected updateSpecialView(): void;
        private updateAttr;
        protected updateNormalView(): void;
        /**未锻造时候，读取等级表1级属性展示*/
        protected onUpdateAttrView(): void;
        protected updateAttrView(attr: attributes, next_attr: attributes): void;
        protected updateNotDressView(): void;
        protected onClickMaster(): void;
        protected onHide(): void;
        protected onClickAttr(): void;
        protected onClickTargetIcon(): void;
    }
}
declare namespace game.mod.role {
    class SuitType3Mdr extends EffectMdrBase {
        protected _view: SuitView2;
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
        protected updatePower(): void;
        protected onClickReward(): void;
        protected onClickOneKey(): void;
        protected onClickAttr(): void;
    }
    class SuitType3CastMdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
    }
}
declare namespace game.mod.role {
    class SuitType3SecondMdr extends WndSecondMdr {
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _suitType: SuitType;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.role {
    /**
     * 套装类型3,4,5的tips
     */
    class SuitEquipTipsMdr2 extends MdrBase {
        private _view;
        private _proxy;
        private _posEquip;
        _showArgs: {
            data: ISuitIconData;
            operType: SuitOperType;
        };
        private _actAttrId;
        private _attrItem3;
        private _suitItem;
        private _nextStageItem;
        private _buffItem;
        private _isDressed;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateTopView;
        private updateView;
        private updateBtnHint;
        private updateSuitItem;
        private _nextStageAttrIds;
        private _nextStageLv;
        private updateNextStageItem;
        private getEquipName;
        private onUpdateAttr;
        private updateBaseAttrView;
        private updatePower;
        private onClickAct;
        private onClickUp;
        protected onHide(): void;
        private doRemove;
        private doAdd;
    }
}
declare namespace game.mod.role {
    class DressUpInfo2Mdr extends DressUpInfoMdr {
        protected _type: DressUpType;
        protected onInit(): void;
    }
}
declare namespace game.mod.role {
    class DressUpInfo3Mdr extends DressUpInfoMdr {
        protected _type: DressUpType;
        protected onInit(): void;
        protected onInitDressList(): void;
    }
}
declare namespace game.mod.role {
    class RoleMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.role {
    import privilege_info = msg.privilege_info;
    class RoleModel {
        serverDay: number;
        loginDay: number;
        openServerTime: number;
        privilegeList: privilege_info[];
        /**根据功能开启id 获取红点路径 */
        openIdxToHintType: {
            [openIdx: number]: string[];
        };
    }
}
declare namespace game.mod.role {
    import property = msg.property;
    import attributes = msg.attributes;
    class RoleProxy extends ProxyBase implements IRoleProxy {
        private _model;
        private _roleVo;
        onStartReconnect(): void;
        initialize(): void;
        private s2c_on_new_day;
        updateDay(serverDay: number, loginDay: number): void;
        readonly serverDay: number;
        readonly loginDay: number;
        private s2c_sync_role_attr;
        updateRole(prop: property, attr: attributes): string[];
        getLeftTime(endDay: number): number;
        /**根据功能开启id 获取红点路径 */
        getOpenIdxToHintType(openIdx: number): string[];
        private s2c_privilege_info;
        hasPrivilege(key: string): boolean;
        getPrivilegeValue(key: string): number;
    }
}
declare namespace game.mod.role {
    class BaseRoleEquipTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        lb_type: eui.Label;
        power: game.mod.Power;
        icon: game.mod.Icon;
        baseGain: game.mod.BaseGainItem;
        lb_desc_bottom: eui.Label;
        exchangeTips: game.mod.ExchangeTips;
        constructor();
        updateTopInfo(data: PropData): void;
        updatePower(power: number): void;
        updateBottomInfo(data: PropData): void;
    }
}
declare namespace game.mod.role {
    class RoleAttrTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_attr: eui.List;
        attr: game.mod.AttrListView;
        gr_power: eui.Group;
        gr_power1: eui.Group;
        xianliPower: game.mod.XianLiPower;
        constructor();
    }
}
declare namespace game.mod.role {
    class RoleEquipTipsView extends eui.Component {
        baseRoleEquipTips: game.mod.role.BaseRoleEquipTipsView;
        scroller: eui.Scroller;
        gr_attr: eui.Group;
        constructor();
    }
}
declare namespace game.mod.role {
    class RoleGemItem extends eui.Component {
        nameItem: game.mod.BaseNameItem;
        gemItem0: game.mod.BaseZhuangShiDescItem;
        gemItem3: game.mod.BaseZhuangShiDescItem;
        gemItem1: game.mod.BaseZhuangShiDescItem;
        gemItem4: game.mod.BaseZhuangShiDescItem;
        private _propData;
        private _isSelf;
        constructor();
        /**
         * 更新宝石属性
         */
        updateView(propData: PropData, isSelf?: boolean): void;
        /**宝石列表 */
        private getGems;
    }
}
declare namespace game.mod.role {
    class RoleGodDescItem extends eui.ItemRenderer {
        baseNameItem: BaseNameItem;
        lab_attr: eui.Label;
        data: any;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.role {
    class RoleGodDescView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.role {
    class RoleGodView extends eui.Component {
        grp_god: eui.Group;
        btn_desc: game.mod.Btn;
        power: game.mod.Power;
        lab_desc: eui.Label;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.role {
    class RoleInfoView extends eui.Component {
        equip_list: game.mod.EquipListView;
        gr_role: eui.Group;
        btn_oneKey: game.mod.Btn;
        btn_collect: game.mod.Btn;
        btn_huanHua: game.mod.Btn;
        btn_suit: game.mod.Btn;
        power2: game.mod.Power2;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        icon2: game.mod.Icon;
        icon3: game.mod.Icon;
        lb_name: eui.Label;
        list_btn: eui.List;
        btn_god: game.mod.AttrGodItem;
        btn_xiuxiannupu: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    /**
     * 角色属性
     */
    class RoleAttrTipsMdr extends EffectMdrBase {
        private _view;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateXianLiAttr;
        private updateNormalAttr;
    }
}
declare namespace game.mod.role {
    class RoleEquipTipsMdr extends MdrBase {
        private _view;
        protected _showArgs: {
            data: PropData | number;
            isSelf?: boolean;
            isBag?: boolean;
        };
        private _propData;
        private _isSelf;
        private _isBag;
        private _enhanceProxy;
        private baseAttr;
        private jipinAttr;
        private baseStrengthen;
        private roleGemItem;
        private baseSuit;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateCommonAttr;
        private updateView;
        private updateScroller;
        private addToGroup;
        private updateBaseAttr;
        private updateJipinAttr;
        private updateStrengthenAttr;
        private updateGemAttr;
        private updateSuitAttr;
        private getPower;
        /**增幅属性描述*/
        private getZengFuAttrDesc;
        /**强化等级*/
        private getStrength;
        /**强化属性*/
        private getStrengthAttrs;
        /**宝石列表 */
        private getGems;
        /**套装属性*/
        private getSuitAttr;
    }
}
declare namespace game.mod.role {
    class RoleGodDescMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getGodStr;
    }
}
declare namespace game.mod.role {
    class RoleGodMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDesc;
        private updateShow;
    }
}
declare namespace game.mod.role {
    class RoleInfoMdr extends EffectMdrBase {
        private _view;
        private _equipProxy;
        private _proxy;
        private _listBtn;
        private _enhanceProxy;
        private _btnData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateViewByPost;
        private updatePower;
        private updateRole;
        private updateGod;
        protected onHide(): void;
        private onClickSuit;
        private onClickCollect;
        private onClickHuanHua;
        private onClickBtnList;
        private onClickBtn;
        private onClickAttr;
        private onClickOneKey;
        private onClickList;
        private onHintUpdate;
        /**冲榜标签 */
        private onUpdateBtn;
        private updateIconHint;
        private onClick;
        private updateIcon;
        private updateBtnHint;
        private showGuide;
        private showCollectGuide;
        private showListGuide;
        private onListChange;
        private onRoleUpdate;
        private updateXiuxianNvpuBtn;
        private onClickXiuxianNvpu;
    }
}
declare namespace game.mod.role {
    class RoleMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class SuitModel {
        /** 苍天 炎天信息 */
        infos: {
            [type: number]: msg.suit_item;
        };
        /** 颢天、玄天、钧天信息 */
        infos2: {
            [type: number]: msg.suit_two_item;
        };
        /**二级页签红点路径*/
        hintPath: {
            [SuitType.CangTian]: {
                [1]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [2]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
            };
            [SuitType.YanTian]: {
                [1]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [2]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
            };
            [SuitType.HaoTian]: {
                [SuitOperType.JinJie]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.DuanZao]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.JingZhu]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
            };
            [SuitType.XuanTian]: {
                [SuitOperType.JinJie]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.DuanZao]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.JingZhu]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
            };
            [SuitType.JunTian]: {
                [SuitOperType.JinJie]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.DuanZao]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
                [SuitOperType.JingZhu]: (ModName | NewRoleViewType | SuitMainBtnType | SuitSecondBtnType)[];
            };
        };
        /**合成红点*/
        composeHintPath: {
            [SuitType.CangTian]: string[];
            [SuitType.YanTian]: string[];
        };
    }
}
declare namespace game.mod.role {
    import GameNT = base.GameNT;
    import suit_item = msg.suit_item;
    import suit_equip = msg.suit_equip;
    import EquipmentConfig = game.config.EquipmentConfig;
    import attributes = msg.attributes;
    import SuitStageConfig = game.config.SuitStageConfig;
    import SuitStrengthConfig = game.config.SuitStrengthConfig;
    import suit_two_item = msg.suit_two_item;
    import suit_two_equip = msg.suit_two_equip;
    import LevelConfig = game.config.LevelConfig;
    import attr_and_next = msg.attr_and_next;
    import SuitTypeConfig = game.config.SuitTypeConfig;
    import SuitPartConfig = game.config.SuitPartConfig;
    /**
     * @description 套装系统
     */
    class SuitProxy extends ProxyBase {
        private _model;
        /**合成界面，点击选择list下的list*/
        composeSelSub: boolean;
        composeSelPos: boolean;
        composeSelPos2: boolean;
        /**当前选择合成的数据【套装类型，阶数，部位】*/
        _composeSelAry: number[];
        composeSelAry: number[];
        readonly model: SuitModel;
        initialize(): void;
        private s2c_suit_equip_info;
        c2s_suit_equip_onekey(type: SuitType, list: number[]): void;
        c2s_suit_equip_takeon(id: number, type: SuitType, pos: EquipPos): void;
        c2s_suit_equip_lvup(ope: number, type: SuitType, pos: EquipPos): void;
        /** 套装装备合成 */
        c2s_suit_equip_synthesis(id: number, type: number, pos: number, cnt?: number): void;
        s2c_suit_equip_synthesis(): void;
        c2s_suit_equip_master_lvup(type: SuitType): void;
        /** 颢天、玄天、钧天信息 */
        private s2c_suit_two_equip_info;
        /** 穿戴颢天、玄天、钧天装备 */
        c2s_suit_two_equip_takeon(type: SuitType, pos: EquipPos, equipment_id: number): void;
        /**
         * 颢天、玄天、钧天装备强化
         * @param ope 0单件 1:一键
         * @param ope_type 1 进阶 2 锻造 3 精铸
         * @param type 3颢天 4玄天 5钧天
         * @param pos 0-9部位
         */
        c2s_suit_two_equip_lvup(ope: number, ope_type: number, type: SuitType, pos: EquipPos): void;
        /**================================= 配置 =================================*/
        /**进阶配置*/
        getSuitStageCfg(type: SuitType, lv: number): SuitStageConfig;
        /**强化配置*/
        getSuitStrengthenCfg(type: SuitType, lv: number): SuitStrengthConfig;
        /**套装类型配置*/
        getSuitTypeCfg(type: SuitType): SuitTypeConfig;
        /**套装类型组成配置*/
        getSuitPartCfg(index: number): SuitPartConfig;
        /**
         * 158000000 + (套装类型 + 操作类型 ) * 100000 + 部位 * 1000 + 等级
         * 套装类型（3颢天 4玄天 5钧天） 操作类型（1 进阶 2 锻造 3 精铸）
         * @param type 3颢天 4玄天 5钧天
         * @param operType 1 进阶 2 锻造 3 精铸
         * @param lv
         */
        getLevelCfg(type: SuitType, operType: number, lv: number): LevelConfig;
        /**获取消耗*/
        getCost(type: SuitType, operType: number, lv?: number): number[];
        getEquipCfg(type: SuitType, stage?: number, pos?: EquipPos): EquipmentConfig;
        /**==================================================================*/
        /**套装类型1，2数据*/
        getSuitTypeInfo(type: SuitType): suit_item;
        /**套装类型3，4，5数据*/
        getSuitTypeInfo2(type: SuitType): suit_two_item;
        /**套装类型1，2部位数据*/
        getPosEquipInfo(type: SuitType, pos: EquipPos): suit_equip;
        /**套装类型3，4，5操作数据*/
        getSuitOperInfo(type: SuitType, operType: SuitOperType): suit_two_equip;
        /**套装类型3,4,5部位数据*/
        getPosEquipInfo2(type: SuitType, pos: number, operType: SuitOperType): attr_and_next;
        /**
         * 获取套装类型1,2的装备index
         * @param type 套装类型 SuitType
         * @param stage 阶数
         * @param pos 部位 EquipPos
         */
        getIndex(type: SuitType, stage?: number, pos?: EquipPos): number;
        /**背包中可穿戴的*/
        getIndexForBag(type: SuitType, pos?: EquipPos): number;
        /**获取套装类型1,2的可穿戴index*/
        getIndexForDress(type: SuitType, pos?: EquipPos): number;
        /**
         * 获取套装类型3,4,5的装备index
         * @param type 套装类型
         * @param pos 部位
         * @param operType 只有 1进阶，3精铸
         * @param stage 阶数 默认都是1阶
         */
        getIndex2(type: SuitType, pos: EquipPos, operType: SuitOperType, stage?: number): number;
        /**获取套装类型*/
        getIndexType(index: number): number;
        /**获取套装阶数*/
        getIndexLv(index: number): number;
        /**SuitType对应的最大进阶数*/
        typeStage: {
            [type: number]: number;
        };
        getMaxStageByType(type: SuitType): number;
        /**套装属性*/
        getSuitAttr(type: SuitType): attributes;
        /**强化属性*/
        getStrengthenAttr(type: SuitType): attributes;
        /**套装类型3,4,5的操作类型属性总和*/
        getAttrByTypeAndOperType(type: SuitType, operType: SuitOperType): attributes;
        /**套装阶数*/
        getSuitLv(type: SuitType): number;
        /**套装达到最大阶数，类型1,2*/
        isMaxSuitLv(type: SuitType): boolean;
        getSuitLvNotLess(type: SuitType, curLv: number): number;
        getMasterLvNotLess(type: SuitType, curLv: number): number;
        getChineseNum(num: number): string;
        /**强化大师能否强化，类型1,2才有*/
        canMasterUp(type: SuitType, isTips?: boolean): boolean;
        /**======================================合成======================================*/
        getSuitEquipListByBagType(): PropData[];
        getSuitEquipListByType(type: SuitType): PropData[];
        getSuitEquipListByTypeAndPos(type: SuitType, pos: EquipPos): PropData[];
        getCurDress(type: SuitType, pos: EquipPos): suit_equip;
        checkCurDressForCompose(type: SuitType, lv: number, pos: EquipPos): boolean;
        getCanComposeList(type: SuitType, lv: number, pos: EquipPos): PropData[];
        /**
         * 合成红点
         * @param type
         * @param stageLv
         * @param pos
         */
        getComposeHint(type: SuitType, stageLv: number, pos: EquipPos): boolean;
        getTotalComposeHint(): boolean;
        /**合成红点*/
        updateComposeHintByType(type: SuitType): boolean;
        /**
         * 获取可以合成的数据【套装,阶数,部位】
         * 如果没有可以合成的，就选择当前选中的
         * 如果都没有当前选中的，那就默认 [1, 2, 0]
         */
        getCanComposeData(): number[];
        getCanComposeDataByType(type: SuitType): number[];
        /**======================================合成 end======================================*/
        /**已达强化最大等级*/
        isStrengthenMax(type: SuitType, pos: number): boolean;
        /**能否一键强化，套装类型1,2*/
        canStrengthenOneKey(type: SuitType, isTips?: boolean): boolean;
        /**能否强化，类型1,2*/
        canStrengthen(type: SuitType, pos: number, isTips?: boolean): boolean;
        /**能否进阶，类型3,4,5*/
        canAdvance(type: SuitType, pos: number, isTips?: boolean): boolean;
        /**能否一键进阶，类型3,4,5*/
        canAdvanceOneKey(type: SuitType, isTips?: boolean): boolean;
        /**进阶，锻造，精铸最大等级*/
        isMaxOperLv(type: SuitType, operType: SuitOperType, pos: EquipPos): boolean;
        /**能否精铸，类型3,4,5*/
        canCast(type: SuitType, pos: number, isTips?: boolean): boolean;
        /**能否一键精铸，类型3,4,5*/
        canCastOneKey(type: SuitType, isTips?: boolean): boolean;
        /**能否锻造，类型3,4,5*/
        canForge(type: SuitType, pos: EquipPos, isTips?: boolean): boolean;
        /**判断能否打开锻造界面，只有进阶界面穿戴上了才可以*/
        checkOpenForge(type: SuitType): boolean;
        /**
         * 装备表的穿戴条件。类型1,2消耗是自身，其他是等级表消耗
         * @param index 装备index
         * @param isTips
         * @param operType 默认SuitOperType.JinJie。只有3,4,5类型才需要传参，而且只可为1,3
         */
        canDress(index: number, isTips?: boolean, operType?: SuitOperType): boolean;
        private checkWearCondition;
        getDressAdvancedEquipId(type: SuitType, pos: EquipPos): number;
        getDressAdvancedEquipIdList(type: SuitType): number[];
        canDressAdvanced(type: SuitType, pos: EquipPos): boolean;
        canDressOneKey(type: SuitType): boolean;
        /**================================= power =================================*/
        /**
         * 套装1，2的进阶展示战力
         * @param type
         */
        getPowerForAdvance(type: SuitType): number;
        /**
         * 套装1，2的强化展示战力
         * @param type
         */
        getPowerForStrengthen(type: SuitType): number;
        /**套装类型3,4,5的各种操作战力*/
        getPower2(type: SuitType, operType: SuitOperType): number;
        /**类型3的锻造大师等级*/
        getMasterLv(): number;
        getShenZhuangVal(): number;
        getBuffDesc(buff_id: number): string;
        private getFilterAttrKey;
        getFilterAttr(type: SuitType, pos: EquipPos, attr: attributes): attributes;
        /**================================= hint =================================*/
        getSuitIconHint(type: SuitType, operType: SuitOperType, pos: EquipPos): boolean;
        /**二级页签红点*/
        getSuitHint(type: SuitType, operType: SuitOperType): boolean;
        /**类型1,2的红点*/
        updateHint1(): void;
        /**类型3,4,5的红点*/
        updateHint2(): void;
        /**背包类型更新*/
        protected onBagUpdateByBagType(n: GameNT): void;
        /**等级表消耗数组*/
        private _costIndexAry;
        getCostIndexAry(): number[];
        /**道具indexs更新*/
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onOpenFuncInit(n: GameNT): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        protected onForbiddenInfoUpdate(): void;
    }
}
declare namespace game.mod.role {
    class SuitComposeTypeTab extends BaseListenerRenderer {
        lab_type: eui.Label;
        scr: eui.Scroller;
        list_item: eui.List;
        redPoint: eui.Image;
        private _listData;
        private _proxy;
        private _curSelIdx;
        data: ISuitComposeTypeTabData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private updateList;
        private onClickList;
    }
    interface ISuitComposeTypeTabData {
        type: SuitType;
        hint: boolean;
        sel: boolean;
    }
}
declare namespace game.mod.role {
    class SuitComposeTypeTabItem extends BaseListenerRenderer {
        redPoint: eui.Image;
        lab_name: eui.Label;
        list_item: eui.List;
        private _listData;
        private _proxy;
        private _curSelIdx;
        data: ISuitComposeTypeTabItem;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickList;
    }
    interface ISuitComposeTypeTabItem {
        type: SuitType;
        lv: number;
        hint: boolean;
        sel: boolean;
    }
}
declare namespace game.mod.role {
    class SuitComposeTypeTabItemPos extends BaseListenerRenderer {
        redPoint: eui.Image;
        lab_name: eui.Label;
        protected dataChanged(): void;
    }
    interface ISuitComposeBtnData {
        hint: boolean;
        pos: EquipPos;
    }
}
declare namespace game.mod.role {
    class SuitComposeView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_name: eui.Label;
        scroller: eui.Scroller;
        list_type: eui.List;
        icon_target: game.mod.Icon;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        icon2: game.mod.Icon;
        btn_compose: game.mod.Btn;
        btn_sub: game.mod.Btn;
        btn_add: game.mod.Btn;
        lb_num: eui.Label;
        list_btn: eui.List;
        list_resolve: eui.List;
        lb_resolve: eui.Label;
        img_resolve: eui.Image;
        lb_resolveNum: eui.Label;
        btn_resolve: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitEquipBagTipsView extends eui.Component {
        power: game.mod.Power;
        scroller: eui.Scroller;
        gr_attr: eui.Group;
        baseAttr: game.mod.BaseDescItem;
        baseSuit: game.mod.BaseDescItem;
        baseGain: game.mod.BaseGainItem;
        lb_desc_bottom: eui.Label;
        basePropTips: game.mod.BasePropTips;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitEquipTipsView extends eui.Component {
        tips: game.mod.BasePropTips;
        power: game.mod.Power;
        scroller: eui.Scroller;
        gr_attr: eui.Group;
        img_line: eui.Image;
        gr_act: eui.Group;
        icon_act: game.mod.Icon;
        btn_act: game.mod.Btn;
        gr_up: eui.Group;
        costItem: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitForgeBtn extends Btn {
        lb_lv: eui.Label;
        constructor();
        /**
         * 更新等级
         * @param lv
         */
        updateLv(lv: number): void;
    }
}
declare namespace game.mod.role {
    class SuitForgeMasterView extends eui.Component {
        power: game.mod.Power;
        btn_up: game.mod.Btn;
        descItem0: game.mod.BaseDescItem;
        descItem1: game.mod.BaseDescItem;
        lb_name: eui.Label;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitForgeView extends eui.Component {
        power: game.mod.Power2;
        cost: game.mod.CostIcon;
        btn_forge: game.mod.Btn;
        icon_target: game.mod.Icon;
        lb_name: eui.Label;
        attrComp0: game.mod.AttrListView;
        attrComp1: game.mod.AttrListView;
        iconList: game.mod.role.SuitIconList;
        lb_attr: eui.Label;
        btn_master: game.mod.role.SuitForgeBtn;
        lb_attr0: eui.Label;
        img_max: eui.Image;
        constructor();
    }
}
declare namespace game.mod.role {
    import DabiaojiangliConfig = game.config.DabiaojiangliConfig;
    import common_reward_status = msg.common_reward_status;
    class SuitGiftItemRender extends BaseGiftItemRender {
        data: ISuitGiftItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface ISuitGiftItemData {
        type: SuitType;
        cfg: DabiaojiangliConfig;
        status: common_reward_status;
    }
}
declare namespace game.mod.role {
    class SuitIcon extends BaseListenerRenderer {
        icon: game.mod.Icon;
        redPoint: eui.Image;
        img_add: eui.Image;
        lb_cond: eui.Label;
        img_lock: eui.Image;
        img_sel: eui.Image;
        data: ISuitIconData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private actedView;
        private defaultView;
        private updateIcon;
        private onClickCond;
        private onClickLock;
        /**是否选中*/
        setSel(isSel?: boolean): void;
    }
    interface ISuitIconData {
        type: SuitType;
        operType: SuitOperType;
        pos: number;
        index: number;
        isAct: boolean;
        showHint: boolean;
        cond?: string;
        isSel?: boolean;
        stage?: number;
        level?: number;
    }
}
declare namespace game.mod.role {
    class SuitIconList extends eui.Component {
        list: eui.List;
        private _listData;
        private _proxy;
        private _type;
        private _operType;
        private _selIconIdx;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * @param type SuitType 1,2
         * @param operType SuitOperType
         */
        updateView(type: SuitType, operType?: SuitOperType): void;
        /**
         * @param type SuitType 3,4,5
         * @param operType SuitOperType
         */
        updateView2(type: SuitType, operType: SuitOperType): void;
        /**
         * 激活条件
         * 类型1,2，读取跳转路径
         * 类型3,4,5，读取装备穿戴条件
         * @param index
         * @param operType
         * @private
         */
        private getOpenCond;
        /**更新红点*/
        updateListHint(): void;
        private onClick;
        /**设置选中*/
        private updateIconSel;
        updateMinForgeLv(): void;
    }
}
declare namespace game.mod.role {
    class SuitStageTipsView extends eui.Component {
        icon: game.mod.SkillItemRender;
        lb_name: eui.Label;
        power: game.mod.Power;
        baseDesc0: game.mod.BaseDescItem;
        baseDesc1: game.mod.BaseDescItem;
        img_line: eui.Image;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitStrengthenMasterBtn extends eui.Component {
        lb_lv: eui.Label;
        redPoint: eui.Image;
        constructor();
        updateLv(lv: number): void;
        setHint(hint?: boolean): void;
    }
}
declare namespace game.mod.role {
    class SuitUpLvBtn extends Btn {
        iconDisplay: eui.Image;
        redPoint: eui.Image;
        gr_lock: eui.Group;
        group_eft: eui.Group;
        constructor();
        setLock(isLock?: boolean): void;
    }
}
declare namespace game.mod.role {
    class SuitView extends eui.Component {
        power: game.mod.Power2;
        gr_eff: eui.Group;
        iconComp: game.mod.role.SuitIconList;
        gr_advance: eui.Group;
        img_suittype: eui.Image;
        btn_fanli: game.mod.Btn;
        btn_compose: game.mod.Btn;
        btn_up: game.mod.role.SuitUpLvBtn;
        gr_font0: eui.Group;
        lb_next: eui.Label;
        gr_strengthen: eui.Group;
        btn_oneKey: game.mod.Btn;
        btn_stengthen: game.mod.role.SuitStrengthenMasterBtn;
        lb_strengthen: eui.Label;
        gr_font: eui.Group;
        img_desc: eui.Image;
        btn_onekeydress: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    class SuitView2 extends eui.Component {
        iconList: game.mod.role.SuitIconList;
        power: game.mod.Power2;
        btn_do: game.mod.Btn;
        btn_reward: game.mod.Btn;
        gr_eff: eui.Group;
        constructor();
    }
}
declare namespace game.mod.role {
    import attributes = msg.attributes;
    class SuitAttrTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        /**
         * attr 直接展示
         * attr_id 如果没有attr的，请求attr_id，监听回调刷新界面
         */
        _showArgs: {
            title: string;
            attrTitle: string;
            attr?: attributes;
            attr_id?: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateAttrView;
        private updateAttrView;
    }
}
declare namespace game.mod.role {
    class SuitComposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listType;
        private _listBtn;
        private _curSelIdx;
        private _listResolve;
        private _selResolve;
        private _skinType;
        private _resolveCnt;
        private _suitTypeAry;
        private _composeCnt;
        private _btnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**合成回调*/
        private onComposeUpdate;
        private updateTypeList;
        private onClickList;
        private onUpdateRightSide;
        private updateRightSide;
        private onClickCompose;
        private onClickAdd;
        private onClickSub;
        private getNum;
        private setNum;
        private onClickBtnList;
        private updateViewBySkinType;
        private updateComposeView;
        private doMoveScroller;
        private moveScroller;
        /**================================== 分解 ==================================*/
        private onUpdateByBagType;
        private updateResolveView;
        private onClickResolve;
        private onClickResolveList;
        private updateSel;
        private _resolveMap;
        private updateSelDesc;
        /**更新页签红点*/
        private updateBtnHint;
    }
}
declare namespace game.mod.role {
    class SuitEquipBagTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _propData;
        _showArgs: PropData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateBaseAttr;
        private updateSuitAttr;
    }
}
declare namespace game.mod.role {
    class SuitEquipStrengthenTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: ISuitIconData;
        private _descItem0;
        private _attrItem3;
        private _descItem1;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateSuitAttr;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.role {
    class SuitEquipTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _suitEquip;
        private _descItem;
        private _suitItem;
        private _descItem2;
        _showArgs: ISuitIconData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateSuitAttr;
        private updateStageDescItem;
        private updateDressView;
        private switchState;
        protected onHide(): void;
        private onClick;
    }
}
declare namespace game.mod.role {
    class BodyMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
    }
}
declare namespace game.mod.role {
    class SuitForgeMasterMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: SuitType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.role {
    class SuitGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected onClickBack(): void;
    }
}
declare namespace game.mod.role {
    class SuitGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _giftProxy;
        private _listData;
        private _type;
        private _cfgList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.role {
    class SuitMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class SuitStageStrengthenTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: SuitType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.role {
    class SuitStageTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        protected _showArgs: SuitType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private getStageStr;
        private getShowStr;
        protected onHide(): void;
    }
}
declare namespace game.mod.role {
    class DressUpModel {
        curIdxList: number[];
        /** 当前穿戴头像idx */
        head: Long;
        /** 当前穿戴头像框idx */
        head_frame: Long;
        /** 当前穿戴汽泡idx */
        chat_frame: Long;
        /** 装扮列表 */
        surface_map: {
            [index: number]: msg.base_surface_item;
        };
        /** 套装列表 */
        surface_suit_list: msg.base_surface_suit[];
        roots: {
            [key: number]: string[];
        };
    }
}
declare namespace game.mod.role {
    class SuitType1SecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    /**炎天进阶*/
    class SuitType2Mdr extends SuitType1Mdr {
        /**苍天，炎天*/
        protected _type: SuitType;
        /**1进阶，2强化*/
        protected _skinType: number;
    }
    /**炎天强化*/
    class SuitType2StrengthenMdr extends SuitType1StrengthenMdr {
        /**苍天，炎天*/
        protected _type: SuitType;
        /**1进阶，2强化*/
        protected _skinType: number;
    }
}
declare namespace game.mod.role {
    class SuitType2SecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    import base_surface_suit = msg.base_surface_suit;
    import base_surface_item = msg.base_surface_item;
    import DressConfig = game.config.DressConfig;
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    /**
     * 装扮proxy
     */
    class DressUpProxy extends ProxyBase {
        private _model;
        /**根据数据计算选中的*/
        selectedIndex: number;
        initialize(): void;
        /**
         * 发送装扮信息
         */
        c2s_base_surface_open_ui(): void;
        /**
         * 发送装扮穿戴/卸下
         * @param index
         */
        c2s_base_surface_change(index: Long): void;
        /**
         * 发送装扮升星/激活
         * @param index
         * @param cost_idx
         */
        c2s_base_surface_lvup(index: Long, cost_idx: Long): void;
        /**装扮信息*/
        private s2c_base_surface_open_ui;
        private dressCfgList;
        /**
         * 获取装扮配置
         */
        getDressList(type1: DressUpType, type2: number): DressConfig[];
        private defaultSort;
        getDressLen(type1: DressUpType, type2: number): number;
        getDressActLen(type1: DressUpType, type2: number): number;
        getDressListByType(type1: DressUpType): DressConfig[];
        getTypes(type1: DressUpType): number[];
        /**获取分类，DE两位  1:头像 2:相框 3:气泡*/
        getDressTypeByIdx(idx: number): DressUpType;
        /**
         * 根据index获取装扮信息
         * @param idx 时装index
         */
        getDressByIdx(idx: number): base_surface_item;
        /**
         * 根据index获装扮套装信息
         * @param idx 时装index
         */
        getDressSuitByIdx(idx: number): base_surface_suit;
        /** 获取装扮总属性*/
        getDressAttrs(index: number): attributes;
        readonly curIdxList: number[];
        readonly head: number;
        readonly head_frame: number;
        readonly chat_frame: number;
        protected onBagUpdateByHeadType(n: GameNT): void;
        getTypeHint(type1: number, type2: number): boolean;
        updateHint(): void;
        /**能否激活或升星*/
        canActOrUpStar(idx: number): boolean;
    }
}
declare namespace game.mod.role {
    class DressUpInfoView extends eui.Component {
        power: game.mod.Power;
        img_head: eui.Image;
        img_frame: eui.Image;
        img_bubble: eui.Image;
        lbl_bubbleName: eui.Label;
        costItem: game.mod.Icon;
        btn_act: game.mod.Btn;
        btn_dress: game.mod.Btn;
        img_state: eui.Image;
        dressList: eui.List;
        lb_attr: eui.Label;
        dressScroller: eui.Scroller;
        list_menu: eui.List;
        grp_head: eui.Group;
        grp_bubble: eui.Group;
        lab_name: eui.Label;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.role {
    class DressUpItemIcon extends BaseListenerRenderer {
        icon: eui.Image;
        lb_starLv: eui.Label;
        img_star: eui.Image;
        img_use: eui.Image;
        img_mask: eui.Image;
        img_yuan: eui.Image;
        redPoint: eui.Image;
        private _proxy;
        constructor();
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.role {
    class SuitType4ForgeMdr extends SuitType3ForgeMdr {
        /**套装类型*/
        protected _type: SuitType;
    }
}
declare namespace game.mod.role {
    class SuitType4Mdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
    }
    class SuitType4CastMdr extends SuitType3CastMdr {
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
    }
}
declare namespace game.mod.role {
    class SuitType4SecondMdr extends SuitType3SecondMdr {
        protected _suitType: SuitType;
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class SuitType5ForgeMdr extends SuitType3ForgeMdr {
        /**套装类型*/
        protected _type: SuitType;
    }
}
declare namespace game.mod.role {
    class SuitType5Mdr extends SuitType3Mdr {
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
    }
    class SuitType5CastMdr extends SuitType3CastMdr {
        /**套装类型*/
        protected _type: SuitType;
        /**操作类型*/
        protected _operType: SuitOperType;
    }
}
declare namespace game.mod.role {
    class SuitType5SecondMdr extends SuitType3SecondMdr {
        protected _suitType: SuitType;
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    import title_info = msg.title_info;
    class TitleModel {
        /** 当前幻化index   0表示未幻化称号*/
        using: Long;
        /** 称号列表Map*/
        title_list: {
            [index: number]: title_info;
        };
    }
}
declare namespace game.mod.role {
    import GameNT = base.GameNT;
    import title_info = msg.title_info;
    import TitleConfig = game.config.TitleConfig;
    class TitleProxy extends ProxyBase {
        private _model;
        readonly model: TitleModel;
        readonly using: number;
        onStartReconnect(): void;
        initialize(): void;
        /** 称号信息请求*/
        c2s_title_info(): void;
        /**
         * 称号操作
         * @param index  称号index
         * @param operate 操作  1:升星，2:幻化，3:卸下，4：佩戴，5：取消幻化，6：激活
         */
        c2s_title_operate(index: number, operate: number): void;
        /** 称号信息返回*/
        private s2c_title_info;
        /** 称号信息更新*/
        private s2c_title_update;
        /**
         * 根据index获取称号信息
         * @param idx 称号index
         */
        getTitleInfoByIdx(idx: number): title_info;
        getTitleCfgByIdx(idx: number): TitleConfig;
        canActivateOrUpStar(index: number): boolean;
        protected onBagUpdateByHeadType(n: GameNT): void;
        /**三种称号类型*/
        updateHint(type?: number): void;
        private _cfgMap;
        /**根据类型获取对应的称号列表，未排序*/
        private getTitleCfgListByType;
        /**
         * 根据类型获取排序的称号列表
         */
        getSortedTitleListByType(type: number): TitleConfig[];
        getNotActedList(type: number): TitleConfig[];
        private _reqType;
        haveNotReqAttr(type: number): boolean;
        private _typeAtteList;
        getAttrIdList(type: number): number[];
        haveDelTime(type: number): boolean;
    }
}
declare namespace game.mod.role {
    import TitleConfig = game.config.TitleConfig;
    class TitleItem extends BaseRenderer {
        gr_eft: eui.Group;
        lb_time: eui.Label;
        btn_huanHua: game.mod.Btn;
        lb_desc: eui.Label;
        btn_act: game.mod.Btn;
        gr_star: eui.Group;
        lb_starCount: eui.Label;
        costItem: game.mod.CostIcon2;
        img_notAct: eui.Image;
        img_bg: eui.Image;
        attr: game.mod.AttrListView;
        gr_lb: eui.Group;
        img_using: eui.Image;
        data: TitleConfig;
        info: msg.title_info;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        updateTime(): void;
        private updateStar;
        private updateAttr;
        private onClickHuanHua;
        private onClickAct;
    }
}
declare namespace game.mod.role {
    class TitleView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.role {
    import UpdateItem = base.UpdateItem;
    class TitleMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        /**类型，1成就，2排行，3特殊*/
        protected _type: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateList;
        private updateView;
        update(time: base.Time): void;
    }
    class TitleMdr2 extends TitleMdr {
        protected _type: number;
    }
    class TitleMdr3 extends TitleMdr {
        protected _type: number;
    }
}
declare namespace game.mod.role {
    class TitleSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class WeaponMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
    }
}
declare namespace game.mod.role {
    class WingMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
    }
}
declare namespace game.mod.role {
    import Handler = base.Handler;
    class XiuxianNvpuModel {
        /** s2c_update_ayah_info time. */
        time: number;
        /** s2c_update_ayah_info level. */
        level: number;
        /** s2c_update_ayah_info exp. */
        exp: number;
        /** s2c_update_ayah_info show_index. */
        show_index: number;
        /** s2c_update_ayah_info buy_list. */
        buy_list: number[];
        /** s2c_update_ayah_info finish_list. */
        finish_list: msg.ayah_fuben_data[];
        /** s2c_update_ayah_info offline_list. */
        offline_list: number[];
        /** s2c_update_ayah_info online_list. */
        online_list: number[];
        /** s2c_ayah_offline_reward_show list. */
        reward_list: msg.ayah_fuben_data[];
        /** s2c_ayah_offline_reward_show items. */
        reward_items: msg.prop_tips_data[];
        giftHintPath: string[];
        /**离线收益一次登陆弹窗界面处理*/
        offlineRewardShow: boolean;
        tiandiList: number[];
        tiandiMap: {
            [index: number]: number[];
        };
        /**当前正在处理的事件类型*/
        autoChallengeEventType: XiuxianNvpuEventType;
        /**可处理的事件类型集合*/
        autoChallengeEventMap: Map<XiuxianNvpuEventType, Handler>;
    }
}
declare namespace game.mod.role {
    import GameNT = base.GameNT;
    import ShenlingConfig = game.config.ShenlingConfig;
    import Handler = base.Handler;
    /**
     * @description 修仙女仆系统 Fairy maid
     */
    class XiuxianNvpuProxy extends ProxyBase implements IXiuxianNvpuProxy {
        private _model;
        onStartReconnect(): void;
        initialize(): void;
        private s2c_update_ayah_info;
        private s2c_ayah_offline_reward_show;
        c2s_ayah_buy_gift(index: number): void;
        c2s_ayah_edit_show(oper: number, list: number[]): void;
        c2s_ayah_apparent(lv: number): void;
        c2s_ayah_get_reward(oper: number): void;
        /**====================== 协议end ======================*/
        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        isActed(isTips?: boolean, showConfirm?: boolean): boolean;
        isBought(): boolean;
        readonly day: number;
        readonly show_index: number;
        readonly level: number;
        readonly exp: number;
        readonly online_list: number[];
        readonly offline_list: number[];
        readonly buy_list: number[];
        readonly reward_list: msg.ayah_fuben_data[];
        readonly finish_list: msg.ayah_fuben_data[];
        isGiftBought(index: number): boolean;
        isMaxLevel(): boolean;
        readonly shenlingId: number;
        readonly shenlingCfg: ShenlingConfig;
        isTiandiActed(type: number): boolean;
        getTiandiList(): number[];
        getTiandiEventList(id: number): number[];
        private buildTiandi;
        getEventName(event: number): string;
        getEventCnt(event: number): number;
        /**====================== hint start ======================*/
        getGiftHint(): boolean;
        private updateHint;
        /**====================== hint end ======================*/
        /**====================== 在线挂机 start ======================*/
        protected onOpenFuncUpdate(n: GameNT): void;
        /**
         * 需要做重置，然后重新处理
         *      （比如扫荡界面关闭时候）
         *      （比如个人副本发送重置协议后，需要重新处理才可以挑战或扫荡）
         *      （比如仙塔不会出现扫荡结算界面，监听协议扫荡完成）
         *      （比如异界boss手动退出，有30秒的限制进入时间）
         */
        private onSpecialChallengeNext;
        /**
         * 从副本退出或者扫荡结束等等，继续处理下一个自动挑战或扫荡
         */
        protected onUpdateSceneEnter(): void;
        private onUpdateMainPassInfo;
        /**当前正在处理的事件类型*/
        autoChallengeEventType: XiuxianNvpuEventType;
        /**可处理的事件类型集合*/
        readonly autoChallengeEventMap: Map<XiuxianNvpuEventType, Handler>;
        readonly sort_online_list: number[];
        private getWaitTime;
        private getPriority;
        private isLimitType;
        private _firstTime30;
        private _delayCall30;
        private _delayCall5;
        private clearAllCall;
        /**处理自动挂机事件*/
        private dealAutoEventFunc;
        private delayCall30Func;
        private delayCall5Func;
        /**执行副本事件*/
        private execAutoEvent;
        private checkNotExistEventType;
        private checkFunOpen;
        _autoChallengeMap: Map<number, Handler>;
        /**
         * 添加可挑战的副本事件
         */
        addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void;
        /**
         * 移除副本事件
         * @param type 事件类型
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         *          比如：正在处理仙侣试炼或仙侣斗法匹配，但是被离婚了，那就马上移除当前事件，开始处理下一轮
         *               正在处理仙宗封魔，但是被移除仙宗，也是同上处理
         */
        removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset?: boolean): void;
        /**判断挂机类型勾选状态*/
        isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean;
        /**修改勾选状态 selected表示勾选状态*/
        setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuBuyView extends eui.Component {
        btn_close: game.mod.Btn;
        list_reward: eui.List;
        list_desc: eui.List;
        power: game.mod.Power;
        gr_font: eui.Group;
        img_gotoact: eui.Image;
        btn_buy: game.mod.Btn;
        gr_font0: eui.Group;
        btn_renewal0: game.mod.Btn;
        btn_renewal1: game.mod.Btn;
        gr_fontday: eui.Group;
        img_goto: eui.Image;
        gr_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.role {
    import AyahTargetConfig = game.config.AyahTargetConfig;
    class XiuxianNvpuGiftItem extends BaseGiftItemRender {
        data: AyahTargetConfig;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuGrowView extends eui.Component {
        nameItem: game.mod.AvatarNameItem;
        lb_desc: eui.Label;
        btn_renewal: game.mod.Btn;
        btn_offline: game.mod.Btn;
        btn_gift: game.mod.Btn;
        list: eui.List;
        btn_guaji: game.mod.Btn;
        bar: game.mod.ProgressBarComp;
        btn_like: game.mod.role.XiuxianNvpuLikeBtn;
        gr_model: eui.Group;
        gr_day: eui.Group;
        constructor();
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuIcon extends BaseListenerRenderer {
        img_di: eui.Image;
        img_icon: eui.Image;
        likeBtn: game.mod.role.XiuxianNvpuLikeBtn;
        img_huanhua: eui.Image;
        img_lock: eui.Image;
        data: number;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuLikeBtn extends BaseListenerRenderer {
        redPoint: eui.Image;
        iconDisplay: eui.Image;
        labelDisplay: eui.Label;
        data: {
            showHint?: boolean;
            level: number;
        };
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuLikeView extends eui.Component {
        secondPop: game.mod.SecondPop;
        nameItem: game.mod.AvatarNameItem;
        likeBtn: game.mod.role.XiuxianNvpuLikeBtn;
        btn_huanhua: game.mod.Btn;
        gr_eft: eui.Group;
        list_arrow: eui.List;
        list_btn: eui.List;
        scroller: eui.Scroller;
        list_tequan: eui.List;
        constructor();
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuOfflineSettingItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        list: eui.List;
        checkBox0: eui.CheckBox;
        checkBox1: eui.CheckBox;
        checkBox2: eui.CheckBox;
        data: number;
        private _proxy;
        private _checkBoxSize;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickCkeckbox;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuOfflineSettingView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn_rule: game.mod.Btn;
        lb_acted: eui.Label;
        btn_goto: game.mod.Btn;
        list: eui.List;
        btn_close: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuOnlineSettingItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        data: any;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuOnlineSettingView extends eui.Component {
        img_bg: eui.Image;
        checkBoxAll: eui.CheckBox;
        lb_checkBoxAll: eui.Label;
        scroller: eui.Scroller;
        gr_checkbox: eui.Group;
        list0: eui.List;
        list1: eui.List;
        list2: eui.List;
        img_acted0: eui.Image;
        btn_act0: game.mod.Btn;
        img_acted1: eui.Image;
        btn_act1: game.mod.Btn;
        btn_receive: game.mod.Btn;
        lb_time: eui.Label;
        btn_back: game.mod.Btn;
        lb_title: eui.Label;
        constructor();
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuResultView extends eui.Component {
        nameItem: game.mod.AvatarNameItem;
        btn_do: game.mod.Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuBuyMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _boughtCache;
        private _listDesc;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onUpdateInfo;
        private buyView;
        private getRenewalDay;
        private renewalView;
        private onClickGotoAct;
        private onClickGoto;
        private onClickBtnBuy;
        private onClickBtnRenewal0;
        private onClickBtnRenewal1;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuGrowMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuGrowMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _effId;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateListData;
        private updateModel;
        private onClickGift;
        private onClickGuaji;
        private onClickLike;
        private onClickOffline;
        private onClickRenewal;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuLikeMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listBtn;
        private _listArrow;
        private _listTequan;
        private _selIdx;
        private _effId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updateModel;
        private updateListBtn;
        private updateListTequan;
        private onClickBtnHuanhua;
        private onClickListBtn;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuOfflineSettingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _eventTypes;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickRule;
        private onClickGoto;
        private confirmEditCheckbox;
        private onUpdateCheckboxSelected;
        private onUpdateCheckboxSelectedDel;
    }
}
declare namespace game.mod.role {
    import UpdateItem = base.UpdateItem;
    class XiuxianNvpuOnlineSettingMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _mainProxy;
        private _passProxy;
        private _listData0;
        private _listData1;
        private _listData2;
        private _checkBoxList;
        private _eventTypes;
        private _initEventTypes;
        private _confirmEditTime;
        private _isClickCheckBox;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        private onClickBack;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updateCheckBoxList;
        private map;
        private updateList0;
        private updateList1;
        private updateList2;
        private onClickCheckboxAll;
        private onClickCheckboxAllLab;
        private onClickCheckBox;
        private onClickBtnAct0;
        private onClickBtnAct1;
        private onClickBtnReceive;
        private onUpdateReceive;
        private confirmEdit;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.role {
    class XiuxianNvpuResultMdr extends MdrBase {
        private _view;
        private _proxy;
        /**1.在线领取2.离线领取*/
        private _operType;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
