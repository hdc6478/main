declare namespace game.mod.xianyuan {
    class ChildShenbingMdr extends EffectMdrBase {
        protected _view: ChildShenbingView;
        protected _proxy: ChildProxy;
        /**大类*/
        protected _surfaceType: XianlvSurfaceType;
        /**二级页签类型*/
        protected _tabType: XianlvSecondTabType;
        private _eftIdx;
        private _selIdx;
        private _selCfg;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private removeModelEft;
        private onUpdateView;
        private updateView;
        private updateListData;
        private updateModel;
        private updatePower;
        private updateCost;
        private onClickUp;
        private onClickAttr;
        private onClickList;
        private onBagUpdateByBagType;
    }
    class ChildShenbingMdr2 extends ChildShenbingMdr {
        protected _surfaceType: XianlvSurfaceType;
        protected _tabType: XianlvSecondTabType;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaWinMdr extends MdrBase {
        protected _view: XianlvDoufaWinView;
        private _proxy;
        protected _type: ResultType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onCheckParams;
        private onSetHeadDead;
        private onRewardTweenEnd;
        protected onHide(): void;
    }
    const enum ResultType {
        Win = 1,
        Fail = 2
    }
}
declare namespace game.mod.xianyuan {
    import teammate = msg.teammate;
    class XianlvInviteRecordView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
    class XianlvInviteRecordItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        powerLabel: game.mod.PowerLabel;
        headVip: game.mod.HeadVip;
        btn_cancel: game.mod.Btn;
        btn_confirm: game.mod.Btn;
        private _proxy;
        data: teammate;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickCancel;
        private onClickConfirm;
    }
}
declare namespace game.mod.xianyuan {
    import GameNT = base.GameNT;
    import xianlv_child_infos = msg.xianlv_child_infos;
    import child_jiban_infos = msg.child_jiban_infos;
    import ChildConfig = game.config.ChildConfig;
    import ChildJibanConfig = game.config.ChildJibanConfig;
    import ChildShengxingConfig = game.config.ChildShengxingConfig;
    import ChildShenbingConfig = game.config.ChildShenbingConfig;
    import ChildLingyiConfig = game.config.ChildLingyiConfig;
    import child_shenbin_info = msg.child_shenbin_info;
    import attributes = msg.attributes;
    /**
     * @description 仙侣-子女系统
     */
    class ChildProxy extends ProxyBase implements IChildProxy {
        private _model;
        private _actJibanMap;
        onStartReconnect(): void;
        initialize(): void;
        c2s_xianlv_child_starup(index: number): void;
        private s2c_xianlv_child_info;
        c2s_child_oper_jiban(jiban_index: number, child_index: number): void;
        private s2c_child_oper_jiban;
        c2s_child_oper_shenbin(type: XianlvSurfaceType, index: number): void;
        private s2c_child_shenbin_info;
        c2s_child_share_skill_act(skill_index: number): void;
        /**
         * 子女装备神兵灵翼
         * 一键装备，1就是一键，null就传下面两个数据
         */
        c2s_child_equip(child_index: number, is_onekey: number, type?: XianlvSurfaceType, index?: number): void;
        c2s_child_into_battle(child_index: number, pos: number): void;
        private s2c_child_share_info;
        /**=============================== 协议 end ===============================*/
        getChildInfos(): {
            [index: number]: xianlv_child_infos;
        };
        getChildInfo(index: number): xianlv_child_infos;
        getJibanInfo(jiban_index: number): child_jiban_infos;
        getChildCfg(index: number): ChildConfig;
        private _childCfgsMap;
        getChildCfgsByType(type: XianlvSecondTabType): ChildConfig[];
        getJibanCfg(jiban_index: number): ChildJibanConfig;
        private _errorMap;
        getChildStarCfgObj(index: number): {
            [star: number]: ChildShengxingConfig;
        };
        getChildStarCfg(index: number, star: number): ChildShengxingConfig;
        private _maxStarMap;
        private getMaxStar;
        isMaxStar(index: number): boolean;
        getStar(index: number): number;
        /**
         * @param index
         * @param star 可不传，则获取下一星级
         */
        getCost(index: number, star?: number): number[];
        canActOrUp(index: number, isTips?: boolean): boolean;
        isActed(index: number): boolean;
        isActedJiban(jiban_index: number): boolean;
        isJibanChildActed(jiban_index: number, child_index: number): boolean;
        canActJiban(jiban_index: number, isTips?: boolean): boolean;
        canActJibanChild(jiban_index: number, child_index: number): boolean;
        isSkillActed(index: number, idx: number): boolean;
        getVipList(): number[];
        getActedSkillList(): number[];
        getBattleChildList(): number[];
        getChildList(): xianlv_child_infos[];
        haveChildForShangzhen(): boolean;
        getChildPower(): number;
        isBattle(child_index: number): boolean;
        getEquipList(child_index: number): number[];
        getShareSkillList(): number[];
        /**=============================== 神兵，灵翼 ===============================*/
        private _surfaceMap;
        getSurfaceCfgList(type: XianlvSurfaceType, tabType: XianlvSecondTabType): ChildShenbingConfig[] | ChildLingyiConfig[];
        getSurfaceCfg(type: XianlvSurfaceType, index: number): ChildShenbingConfig | ChildLingyiConfig;
        getSurfaceTypeInfo(type: XianlvSurfaceType): {
            [index: number]: child_shenbin_info;
        };
        getSurfaceInfo(type: XianlvSurfaceType, index: number): child_shenbin_info;
        isActedSurface(type: XianlvSurfaceType, index: number): boolean;
        getBattleSurfaceList(): number[];
        private _surfaceStarMap;
        getMaxStarSurface(type: XianlvSurfaceType, index: number): number;
        getStarSurface(type: XianlvSurfaceType, index: number): number;
        isMaxStarSurface(type: XianlvSurfaceType, index: number): boolean;
        getCostSurface(type: XianlvSurfaceType, index: number): number[];
        canActOrUpSurface(type: XianlvSurfaceType, index: number, isTips?: boolean): boolean;
        getChildSkill(type: number): number[];
        checkOneKeyPower(equipId: number): boolean;
        canOneKey(child_index: number, isTips?: boolean): boolean;
        getPower(): number;
        getAttr(): attributes;
        getSharePower(): number;
        /**=============================== hint ===============================*/
        getSkillHint(skillId: number): boolean;
        private updateShareSkillHint;
        private _skillCost;
        getSkillActCost(): number[];
        getHintByChildIndex(index: number): boolean;
        getHintByJibanIndex(jiban_index: number): boolean;
        getJibanHint(): boolean;
        private updateJibanHint;
        private getUpstarHintBytype;
        private updateUpstarHint;
        private getSurfaceHint;
        private updateSurfaceHint;
        protected onBagUpdateByBagType(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: GameNT): void;
    }
}
declare namespace game.mod.xianyuan {
    import ChildConfig = game.config.ChildConfig;
    class ChildHuanzhuangIconSel extends IconSel {
        data: ChildConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class ChildHuanzhuangView extends eui.Component {
        secondPop: game.mod.SecondPop;
        gr_eft: eui.Group;
        nameItem: game.mod.AvatarNameSrItem;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        btn_onekey: game.mod.Btn;
        lb_select: eui.Label;
        scroller_avatar: eui.Scroller;
        list_avatar: eui.List;
        list_item: eui.List;
        list_btn: eui.List;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildItem extends BaseRenderer {
        img_sketch: eui.Image;
        img_add: eui.Image;
        lb_cond: eui.Label;
        gr_eft: eui.Group;
        data: IChildItemData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IChildItemData {
        childIndex: number;
        isActed: boolean;
        vip: number;
        pos?: number;
    }
}
declare namespace game.mod.xianyuan {
    class ChildShangzhenView extends eui.Component {
        secondPop: game.mod.SecondPop;
        power: game.mod.Power2;
        nameItem: game.mod.AvatarNameSrItem;
        icon0: game.mod.Icon;
        icon1: game.mod.Icon;
        scroller: eui.Scroller;
        list: eui.List;
        gr_eft: eui.Group;
        btn_shangzhen: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildShenbingView extends eui.Component {
        gr_eff: eui.Group;
        power: game.mod.Power2;
        nameItem: game.mod.AvatarNameSrItem;
        godItem: game.mod.AttrGodItem;
        starComp: game.mod.StarListView;
        btn_up: game.mod.UpStarBtn;
        scroller: eui.Scroller;
        list: eui.List;
        specialAttr: game.mod.SpecialAttrView;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildSkillTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        skillIcon: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_type: eui.Image;
        gp_attr: eui.Group;
        baseDescItem: game.mod.BaseDescItem;
        skillAttrList: game.mod.SkillAttrList;
        baseDescList: game.mod.BaseDescList;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildUpStarView extends eui.Component {
        gr_eff: eui.Group;
        power: game.mod.Power2;
        nameItem: game.mod.AvatarNameSrItem;
        godItem: game.mod.AttrGodItem;
        skillItem0: game.mod.SkillItemRender;
        skillItem1: game.mod.SkillItemRender;
        skillItem2: game.mod.SkillItemRender;
        skillItem3: game.mod.SkillItemRender;
        list_star: game.mod.StarListView;
        btn_up: game.mod.UpStarBtn;
        scroller: eui.Scroller;
        list: eui.List;
        specialAttr: game.mod.SpecialAttrView;
        btn_jiban: game.mod.Btn;
        btn_huanzhuang: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildView extends eui.Component {
        power: game.mod.Power2;
        btn_check: game.mod.Btn;
        skillItem: game.mod.SkillItemRender;
        list_skill: eui.List;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ChildHuanzhuangMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listAvatar;
        private _listItem;
        private _listBtn;
        private _selBtnIdx;
        private _selItemIdx;
        private _selAvatarIdx;
        private _selChildCfg;
        private _eftIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateListBtn;
        private updateListItem;
        private updateListAvatar;
        private updateInfo;
        private updateModel;
        private onClickOneKey;
        private onClickListAvatar;
        private onClickListItem;
        private onClickListBtn;
    }
}
declare namespace game.mod.xianyuan {
    class ChildLingyiMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class ChildLingyiMdr extends ChildShenbingMdr {
        protected _surfaceType: XianlvSurfaceType;
        protected _tabType: XianlvSecondTabType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
    class ChildLingyiMdr2 extends ChildLingyiMdr {
        protected _surfaceType: XianlvSurfaceType;
        protected _tabType: XianlvSecondTabType;
    }
}
declare namespace game.mod.xianyuan {
    class ChildMdr extends MdrBase {
        private _view;
        private _proxy;
        private _xianlvProxy;
        private _listSkill;
        private _listChild;
        private _skillTipsId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateChildView;
        private updateSkillView;
        private onClickAttr;
        private onClickCheck;
        private onClickSkill;
        private onClickListSkill;
        private confirmAct;
        private updateSkillListHint;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.xianyuan {
    class ChildShangzhenMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _eftIdx;
        private _selIdx;
        private _childIndex;
        protected _showArgs: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private removeModelEft;
        private updateView;
        private updateListData;
        private updateTopView;
        private onClickShangzhen;
        private onClickList;
        private onClickAttr;
    }
}
declare namespace game.mod.xianyuan {
    class ChildShenbingMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianyuanMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.xianyuan {
    class ChildSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _attrInfos;
        private _isShow;
        private _atrrList;
        private _openIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateAttr;
        private updateView;
    }
}
declare namespace game.mod.xianyuan {
    class ChildUpStarMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class ChildUpStarMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        /**二级页签类型*/
        childType: XianlvSecondTabType;
        private _listData;
        private _selIdx;
        private _selCfg;
        private _eftIdxx;
        private _skillList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private removeModelEft;
        private updateView;
        private updateList;
        private updateTop;
        private updatePower;
        private updateModel;
        private updateBtnUp;
        private updateSkill;
        private onClickUp;
        private onClickList;
        private onClickSkill;
        private onClickAttr;
        private onClickJiban;
        private onClickHuanzhuang;
        private onBagUpdateByBagType;
    }
    class ChildUpStarMdr2 extends ChildUpStarMdr {
        childType: XianlvSecondTabType;
    }
    class ChildUpStarMdr3 extends ChildUpStarMdr {
        childType: XianlvSecondTabType;
    }
    class ChildUpStarMdr4 extends ChildUpStarMdr {
        childType: XianlvSecondTabType;
    }
}
declare namespace game.mod.xianyuan {
    /**技能激活条件*/
    class SkillConditionTipsMdr extends MdrBase {
        private _view;
        /**技能index，是否激活，激活条件*/
        _showArgs: {
            skillId: number;
            isActed: boolean;
            actStr: string;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.xianyuan {
    class RingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianyuan {
    class RingModel {
        /** 婚戒 */
        ring_struct: msg.ring_struct;
        /** 已幻化列表 */
        ring_list: {
            [index: number]: msg.ring_item;
        };
        /** 已领取激活礼包列表 */
        ring_act_libao: number[];
        /** 是否领取2阶奖励 默认false */
        is_get_class_reward: boolean;
        hintPath: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.xianyuan {
    import ring_item = msg.ring_item;
    import GameNT = base.GameNT;
    import RingConfig = game.config.RingConfig;
    import ring_struct = msg.ring_struct;
    import RingDengjiConfig = game.config.RingDengjiConfig;
    /**
     * @description 仙侣-仙戒系统
     */
    class RingProxy extends ProxyBase implements IRingProxy {
        private _model;
        /**初始升级index*/
        defaultIndex: number;
        private _login;
        initialize(): void;
        c2s_ring_uplv(type: number): void;
        c2s_ring_upstar(index: number): void;
        c2s_ring_huanhua(index: number): void;
        private s2c_ring_info;
        c2s_ring_act_libao(index: number): void;
        c2s_ring_get_reward(): void;
        /**=========================协议end*/
        isGetReward(index: number): boolean;
        canGetReward(index: number): boolean;
        getInfo(index: number): ring_item;
        isActed(index: number): boolean;
        isHuanhua(index: number): boolean;
        canShowHuanhua(index: number): boolean;
        isMaxStar(index: number): boolean;
        private _cfgMap;
        getCfgListByType(type: number): RingConfig[];
        getConfig(index: number): RingConfig;
        getMaxStar(index: number): number;
        getStar(index: number): number;
        getUpstarCost(index: number): number[];
        getUplvInfo(): ring_struct;
        getStage(): number;
        getStagePerLv(): number;
        getHuanhuaIndex(): number;
        getUplvIndex(): number;
        private _maxLv;
        getMaxLv(): number;
        isMaxLv(): boolean;
        getLvConfig(lv: number): RingDengjiConfig;
        getLvCost(lv: number): number[];
        canUplv(isTips?: boolean): boolean;
        canOnekey(isTips?: boolean): boolean;
        canUpstar(index: number, isTips?: boolean): boolean;
        getPower(): number;
        getUpstarHintByIndex(index: number): boolean;
        getGiftHint(): boolean;
        getUplvHint(): boolean;
        private updateHint;
        protected onBagUpdateByBagType(n: GameNT): void;
        getGiftProp(): number[];
        getGiftStage(): number;
        readonly is_get_class_reward: boolean;
        canGetClassReward(): boolean;
        canOpenGift(): boolean;
    }
}
declare namespace game.mod.xianyuan {
    class RingGiftTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        power: game.mod.Power;
        icon: game.mod.Icon;
        lb_cond: eui.Label;
        btn_do: game.mod.Btn;
        baseSurfaceItem: game.mod.BaseSurfaceItem;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class RingHuanhuaView extends eui.Component {
        gr_eft: eui.Group;
        power: game.mod.Power2;
        nameItem: game.mod.AvatarNameSrItem;
        starComp: game.mod.StarListView;
        btn_up: game.mod.UpStarBtn;
        scroller: eui.Scroller;
        list: eui.List;
        specialAttr: game.mod.SpecialAttrView;
        btn_reward: game.mod.Btn;
        btn_huanhua: game.mod.Btn;
        img_icon: eui.Image;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class RingItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class RingView extends eui.Component {
        gr_eft: eui.Group;
        power: game.mod.Power2;
        gr_lv: eui.Group;
        nameItem: game.mod.AvatarNameItem;
        btn_gift: game.mod.Btn;
        list_item: eui.List;
        bar: game.mod.ProgressBarComp;
        costIcon: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        btn_onekey: game.mod.Btn;
        img_max: eui.Image;
        specialAttr: game.mod.SpecialAttrView;
        btn_huan: game.mod.TabSecondItem;
        img_icon: eui.Image;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class RingGiftTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        private onUpdateInfo;
    }
}
declare namespace game.mod.xianyuan {
    class RingHuanhuaMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    class RingHuanhuaMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        /**二级页签分类*/
        private _type;
        private _listAvatar;
        private _eftIdx;
        private _selIdx;
        private _selCfg;
        private _openReward;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateInfo;
        private updateModel;
        private updateCost;
        private updatePower;
        private updateListAvatar;
        private onClickUp;
        private onClickList;
        private onClickAttr;
        private onClickReward;
        private onGetReward;
        private onClickHuanhua;
    }
}
declare namespace game.mod.xianyuan {
    class RingMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listItem;
        private _eftIdx;
        private _index;
        private _cfg;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateModel;
        private updatePower;
        private updateCost;
        private switchCurrentState;
        private onClickUp;
        private onClickOnekey;
        private onClickGift;
        private onClickAttr;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.xianyuan {
    import teammate = msg.teammate;
    class XianlvDoufaModel {
        max_win_count: number;
        /**0没开启挑战 */
        count: number;
        buy_count: number;
        reward: number;
        total_score: number;
        total_count: number;
        show_tips: boolean;
        geren_rank: teammate[];
        first_info: teammate[];
        my_rank: teammate;
        player_info: teammate[];
        auto: boolean;
        xianlvdoufa_xiandeng: number;
        xianlvdoufa_cost: number[];
        xianlvdoufa_rank: number;
        xianlvdoufa_time: number;
        xianlvdoufa_buy: number;
        xianlvdoufa_buycost: number[];
    }
}
declare namespace game.mod.xianyuan {
    import teammate = msg.teammate;
    class XianlvDoufaProxy extends ProxyBase {
        private _model;
        initialize(): void;
        /**1 基础信息 3 入场 4 一键领取奖励(s2c_xianlv_pvp_base_info) 2 排行信息(s2c_xianlv_pvp_rank_info)  */
        c2s_xianlv_pvp_oper(type: number): void;
        /**1 开始匹配 2 开始战斗 3 自动战斗 */
        c2s_xianlv_pvp_challenge(type: number): void;
        private s2c_xianlv_pvp_base_info;
        private s2c_xianlv_pvp_rank_info;
        private s2c_xianlv_pvp_challenge_info;
        private s2c_xianlv_pvp_nianya_win;
        /**----------------------- 数据 --------------------------- */
        readonly count: number;
        auto: boolean;
        readonly my_rank: teammate;
        readonly ranks: teammate[];
        readonly first_info: teammate[];
        readonly player_info: teammate[];
        getRankList(): RankRewardRenderData[];
        private getRankItemName;
        getRankSection(rank: string): IRankSectionData[];
        getRankStr(): string;
        getRankCountStr(): string;
        show_tips: boolean;
        readonly total_score: number;
        readonly total_count: number;
        readonly reward: number;
        readonly max_win_count: number;
        getRewardState(cfg: game.config.XianlvdoufaRewardConfig): ComRewardState;
        readonly buy_count: number;
        /**----------------------- 数据 --------------------------- */
        /**----------------------- 参数表 --------------------------- */
        readonly xianlvdoufa_xiandeng: number;
        readonly xianlvdoufa_cost: number[];
        readonly xianlvdoufa_buycost: number[];
        readonly xianlvdoufa_rank: number;
        readonly xianlvdoufa_time: number;
        readonly xianlvdoufa_buy: number;
        /**----------------------- 参数表 --------------------------- */
        /**----------------------- 红点 --------------------------- */
        private onUpdateHint;
        /**----------------------- 红点 --------------------------- */
        /**============== 修仙女仆自动挂机 ==============*/
        private _sendAutoChallengeEnter;
        private canAutoChallengeDoufa;
        private sendChallengeDoufa;
        protected onBanlvInfoUpdate(): void;
        private checkAutoChallengeDoufa;
        private resetAutoChallengeDoufa;
    }
}
declare namespace game.mod.xianyuan {
    import teammate = msg.teammate;
    class XianlvModel {
        /** 伴侣信息 */
        banlv_infos: teammate;
        /** 同修天数 */
        days: number;
        /** 返回邀请记录 */
        invite_records: msg.teammate[];
        /**页签红点*/
        hintPath: {
            [type: number]: string[];
        };
        /**按钮功能开启id*/
        btnOpenIdxAry: number[];
        /**按钮红点路径*/
        btnHintPath: {
            [openIdx: number]: string[];
        };
    }
}
declare namespace game.mod.xianyuan {
    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    /**
     * @description 仙侣系统
     */
    class XianlvProxy extends ProxyBase implements IXianlvProxy {
        private _model;
        getBtnOpenIdxAry(): number[];
        getBtnHintPath(openIdx: OpenIdx): string[];
        initialize(): void;
        c2s_xianlv_propose(role_id: Long, oper: number, server_id: number): void;
        c2s_xianlv_seeking(role_id: Long, oper: number): void;
        private s2c_xianlv_banlv_info;
        c2s_xianlv_seeking_info(): void;
        private s2c_xianlv_seeking_info;
        c2s_xianlv_lihun(): void;
        c2s_xianlv_choujiang(oper: number): void;
        getForceMarryCost(): number[];
        getTogetherDay(): number;
        getPower(): number;
        isMarried(): boolean;
        getBanlvInfo(): teammate;
        getInviteRecords(): teammate[];
        getZhaohuanCosts(): number[][];
        canZhaohuan(): boolean;
        canZhaohuanByOper(oper: number, isTips?: boolean): boolean;
        private updateHint;
        private updateHint2;
        protected onOpenFuncUpdate(n: GameNT): void;
        protected onTaskHint(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        isOpenShilian(): boolean;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvShilianModel {
        list: {
            [type: number]: msg.shilian_info;
        };
        rank_info: msg.marry_rank_info[];
        my_score: number;
        my_rank_no: number;
        rank_one_info: msg.teammate[];
        jifen_info: number[];
        hintPath: string[];
        rankHintPath: string[];
    }
}
declare namespace game.mod.xianyuan {
    import GameNT = base.GameNT;
    import XianlvShilianSceneConfig = game.config.XianlvShilianSceneConfig;
    import shilian_info = msg.shilian_info;
    import XianlvJifenConfig = game.config.XianlvJifenConfig;
    /**
     * @description 仙侣试炼系统
     */
    class XianlvShilianProxy extends ProxyBase {
        private _model;
        /**当前挑战的副本类型*/
        curType: number;
        readonly model: XianlvShilianModel;
        initialize(): void;
        c2s_challenge_shilian(type: number): void;
        c2s_shilian_sweep(type: number, cnt: number): void;
        c2s_shilian_get_reward(type: number): void;
        s2c_shilian_info(n: GameNT): void;
        c2s_xianlv_shilian_openui(): void;
        private s2c_shilian_damage;
        c2s_shilian_rank_info(): void;
        private s2c_shilian_rank_info;
        c2s_shilian_jifen_info(): void;
        c2s_shilian_jifen_oper(index: number): void;
        s2c_shilian_jifen_info(n: GameNT): void;
        getSceneConfig(type: number, layer?: number): XianlvShilianSceneConfig;
        getInfo(type: number): shilian_info;
        private _maxLayer;
        getMaxLayer(type: number): number;
        isMaxLayer(type: number): boolean;
        canChallenge(type: number, isTips?: boolean): boolean;
        getChallengeCost(): number[];
        getRankShow(): number;
        getRankReward(rank_no: number): number[][];
        getJifenCfgList(): XianlvJifenConfig[];
        isJifenGotten(index: number): boolean;
        getRankRewardHint(): boolean;
        private updateHint;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        /**============== 修仙女仆自动挂机 ==============*/
        private canAutoChallengeShilian;
        private getAutoChallengeShilianType;
        private sendAutoChallengeShilian;
        private checkAutoChallengeShilian;
        protected onBanlvInfoUpdate(): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvAttrView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
    class XianlvAttrItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        lb_attr: eui.Label;
        data: IXianlvAttrItemData;
        constructor();
        protected dataChanged(): void;
    }
    interface IXianlvAttrItemData {
        title: number;
        attrStr: string;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvBreakupView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvChildIcon extends BaseListenerRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_add: eui.Image;
        img_lock: eui.Image;
        data: IXianlvChildIconData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IXianlvChildIconData {
        vip: number;
        isActed: boolean;
        childIndex: number;
    }
}
declare namespace game.mod.xianyuan {
    import friend_info = msg.friend_info;
    class XianlvInviteAddView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_desc: eui.Label;
        list: eui.List;
        constructor();
    }
    class XianlvInviteAddItem extends BaseListenerRenderer {
        headVip: game.mod.HeadVip;
        lb_name: eui.Label;
        powerLabel: game.mod.PowerLabel;
        lb_zongmen: eui.Label;
        lb_goodmanval: eui.Label;
        lb_online: eui.Label;
        btn_force: game.mod.Btn;
        btn_invite: game.mod.Btn;
        img_online: eui.Image;
        data: friend_info;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickForce;
        private onClickInvite;
    }
}
declare namespace game.mod.xianyuan {
    class ChildMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianyuan {
    import teammate = msg.teammate;
    class XianlvRoleComp extends eui.Component {
        gr_eft: eui.Group;
        img_sketch: eui.Image;
        btn_chat: game.mod.Btn;
        btn_add: game.mod.Btn;
        lb_name: eui.Label;
        private _proxy;
        private _hub;
        private _roleId;
        private _serverId;
        private teammate;
        constructor();
        private onAddToStage;
        protected onRemoveFromStage(): void;
        updateViewForMyself(): void;
        updateView(teammate: teammate, isMyself?: boolean): void;
        private defaultView;
        private onClickChat;
        private onClickAdd;
        private onClickRole;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvView extends eui.Component {
        power: game.mod.Power2;
        btn_do: game.mod.Btn;
        roleComp0: game.mod.xianyuan.XianlvRoleComp;
        roleComp1: game.mod.xianyuan.XianlvRoleComp;
        btn_zhaohuan: game.mod.xianyuan.XianlvZhaohuanBtn;
        list_child: eui.List;
        list_tap: eui.List;
        gr_day: eui.Group;
        lb_day: eui.Label;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvZhaohuanBtn extends eui.Component {
        lb_progress: eui.Label;
        redPoint: eui.Image;
        constructor();
        updateView(val: number, maxVal: number): void;
        setHint(hint?: boolean): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvZhaohuanView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
    class XianlvZhaohuanItem extends BaseRenderer {
        img_bg: eui.Image;
        btn: game.mod.Btn;
        data: IXianlvZhaohuanData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IXianlvZhaohuanData {
        cost: number[];
        hint: boolean;
        oper: number;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaFailView extends eui.Component {
        head1: HeadVip;
        head2: HeadVip;
        head3: HeadVip;
        head4: HeadVip;
        closeTips: CloseTips;
        resultReward: ResultReward;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaLightItem extends BaseRenderer {
        private img_light;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    import ArrayCollection = eui.ArrayCollection;
    class XianlvDoufaRewardItem extends BaseRenderer {
        img_tips: eui.Image;
        lab_count: eui.Label;
        list_reward: eui.List;
        list_progress: eui.List;
        scroller: eui.Scroller;
        private _proxy;
        protected _listData: ArrayCollection;
        protected _listReward: ArrayCollection;
        protected onAddToStage(): void;
        updateShow(): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaSceneView extends eui.Component {
        lab_time: eui.Label;
        lab_hurt1: eui.Label;
        lab_hurt2: eui.Label;
        head1: HeadHP;
        head2: HeadHP;
        head3: HeadHP;
        head4: HeadHP;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaTipsView extends eui.Component {
        lab_score: eui.Label;
        grp_font: eui.Group;
        closeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaView extends eui.Component {
        btn_rank: Btn;
        btn_fight: Btn;
        btn_rule: Btn;
        reward: any;
        timeItem: TimeItem;
        coinItem: TopCoinItem;
        checkbox: eui.CheckBox;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaWinView extends eui.Component {
        head1: HeadVip;
        head2: HeadVip;
        head3: HeadVip;
        head4: HeadVip;
        closeTips: CloseTips;
        resultReward: ResultReward;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    class ShilianItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_typebg: eui.Image;
        lb_lvname: eui.Label;
        gr_challenge: eui.Group;
        lb_bossname: eui.Label;
        img_type: eui.Image;
        bar: game.mod.ProgressBarComp;
        btn_reward: game.mod.Btn;
        btn_saodang: game.mod.Btn;
        btn_challenge: game.mod.Btn;
        scroller: eui.Scroller;
        list_reward: eui.List;
        data: XianlvShilianFubenConfig;
        private _proxy;
        private _listData;
        private _isReward;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickChallenge;
        private onClickSaodang;
        private onClickReward;
        private rewardView;
        private challengeView;
        private sweepView;
    }
}
declare namespace game.mod.xianyuan {
    import marry_rank_info = msg.marry_rank_info;
    class ShilianRankItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_num: eui.Label;
        list_reward: eui.List;
        data: marry_rank_info;
        private _proxy;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianyuan {
    import XianlvJifenConfig = game.config.XianlvJifenConfig;
    class ShilianRankRewardItem extends BaseGiftItemRender {
        data: IShilianRankRewardItemData;
        private _shilianProxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IShilianRankRewardItemData {
        cfg: XianlvJifenConfig;
        status: RewardStatus;
        score: number;
    }
}
declare namespace game.mod.xianyuan {
    class ShilianRankRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        icon_bigreward: game.mod.Icon;
        lb_num: eui.Label;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ShilianResultView extends eui.Component {
        resultReward: ResultReward;
        lb_damage: eui.Label;
        lb_hp: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ShilianSaodangView extends eui.Component {
        secondPop: game.mod.SecondPop;
        img_icon: eui.Image;
        lb_layer: eui.Label;
        bar: game.mod.ProgressBarComp;
        lb_record: eui.Label;
        list: eui.List;
        lb_hurt: eui.Label;
        btn_do: game.mod.Btn;
        btnListView: game.mod.BuyBtnListView;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ShilianSceneView extends eui.Component {
        lb_time: eui.Label;
        lb_damage0: eui.Label;
        lb_damage1: eui.Label;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class ShilianView extends eui.Component {
        propItem: game.mod.xianyuan.TaskPropItem;
        btn_rule: game.mod.Btn;
        btn_rank: game.mod.Btn;
        list: eui.List;
        timeItem: game.mod.TimeItem;
        btn_add: game.mod.Btn;
        img_banner: eui.Image;
        img_cost: eui.Image;
        lb_cost: eui.Label;
        scroller: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    import task_data = msg.task_data;
    class TaskItem extends BaseGiftItemRender {
        data: task_data;
        private _jump;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.xianyuan {
    class TaskPropItem extends eui.Component {
        img_cost: eui.Image;
        lb_cost: eui.Label;
        constructor();
        private onAddToStage;
        private onRemoveFromStage;
        updateCost(index: number): void;
        private onRoleUpdate;
        private onClick;
    }
}
declare namespace game.mod.xianyuan {
    class TaskView extends eui.Component {
        img_banner: eui.Image;
        list: eui.List;
        propItem: game.mod.xianyuan.TaskPropItem;
        constructor();
    }
}
declare namespace game.mod.xianyuan {
    class XianlvAttrMdr extends MdrBase {
        private _view;
        private _proxy;
        private _childProxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvBreakupMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClick;
        private confirm;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvInviteAddMdr extends MdrBase {
        private _view;
        private _proxy;
        private _friendProxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateFriendInfo;
        private onUpdateBanlvInfo;
        private onClickGo;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvInviteRecordMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvMdr extends MdrBase {
        private _view;
        private _proxy;
        private _childProxy;
        private _listChild;
        private _listBtn;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateListChild;
        private updateZhaohuanBtn;
        private onClickAttr;
        private onClickDo;
        private onClickZhaohuan;
        private onUpdateHint;
        private updateListTap;
        private updateListBtnHint;
        private onClickListTap;
        private onRoleUpdate;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvZhaohuanMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onRoleUpdate;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaFailMdr extends XianlvDoufaWinMdr {
        protected _view: XianlvDoufaFailView;
        protected _type: ResultType;
    }
}
declare namespace game.mod.xianyuan {
    import UpdateItem = base.UpdateItem;
    class XianlvDoufaMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _time;
        private _success;
        private readonly TIME_TICK;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateSuccess;
        private onUpdateView;
        private onUpdateAuto;
        private onUpdateAutoTime;
        private onClickFight;
        private onFight;
        private onClickCheckBox;
        private onClickRank;
        private onClickRule;
        protected onHide(): void;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianyuan {
    import UpdateItem = base.UpdateItem;
    class XianlvDoufaRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        update(time: base.Time): void;
        private updateTime;
        protected onHide(): void;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaSceneMdr extends EffectMdrBase implements base.UpdateItem {
        protected _view: XianlvDoufaSceneView;
        private _proxy;
        private _xianlv;
        private _enemy1;
        private _enemy2;
        private _endTIme;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateHurt;
        protected onHide(): void;
        update(time: base.Time): void;
        private onUpdateHP;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.xianyuan {
    class XianlvDoufaTipsMdr extends EffectMdrBase {
        protected _view: XianlvDoufaTipsView;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.xianyuan {
    import child_shenbin_info = msg.child_shenbin_info;
    class ChildModel {
        child_infos: {
            [child_index: number]: msg.xianlv_child_infos;
        };
        jiban_infos: {
            [jiban_index: number]: msg.child_jiban_infos;
        };
        /**神兵，灵翼数据*/
        infos: {
            [type: number]: {
                [index: number]: child_shenbin_info;
            };
        };
        /**上阵子女index*/
        child_list: number[];
        /**激活的技能index*/
        skill_list: number[];
        hintPath: {
            [type: number]: any;
        };
        jibanHintPath: string[];
    }
}
declare namespace game.mod.xianyuan {
    import UpdateItem = base.UpdateItem;
    class ShilianMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateProp;
        private onClickRule;
        private onClickRank;
        private onClickAdd;
        update(time: base.Time): void;
        private onBagUpdateByPropIndex;
        private updateBtnRankHint;
    }
}
declare namespace game.mod.xianyuan {
    class ShilianRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianyuan {
    import UpdateItem = base.UpdateItem;
    class ShilianRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        update(time: base.Time): void;
        private updateRankRewardHint;
    }
}
declare namespace game.mod.xianyuan {
    class ShilianRankRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.xianyuan {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ShilianResultMdr extends MdrBase {
        private _view;
        _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.xianyuan {
    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    class ShilianSaodangMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected _showArgs: XianlvShilianFubenConfig;
        private _cnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updateSweepView;
        private updateSweetCost;
        private onUpdateSweepCnt;
        private getMonsterHp;
        private getMonsterLeftHp;
        private getSingleSweepDamage;
        private getLeftSweepCnt;
        private getRealSweepCnt;
        private onClickDo;
    }
}
declare namespace game.mod.xianyuan {
    import UpdateItem = base.UpdateItem;
    class ShilianSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onUpdateDamage;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.xianyuan {
    class TaskMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onUpdateTask;
    }
}
