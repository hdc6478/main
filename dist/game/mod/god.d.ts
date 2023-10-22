declare namespace game.mod.god {
    class GodHauntedView extends eui.Component {
        list: eui.List;
        list_attr: eui.List;
        bar: CommonProgressBar;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.god {
    class GodAvatarView extends eui.Component {
        img_bg: eui.Image;
        grp_eff: eui.Group;
        list: eui.List;
        list_skill: eui.List;
        grp_lv: eui.Group;
        name_item: AvatarNameItem;
        god_item: AttrGodItem;
        power: Power2;
        icon_suit: GodDragonoathSuitItem;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        lab_limit: eui.Label;
        lab_tips: eui.Label;
        grp_lab: eui.Group;
        list_item: eui.List;
        bar: ProgressBarComp;
        btn_activate: Btn;
        cost: CostIcon;
        btn_up: Btn;
        img_icon: eui.Image;
        constructor();
    }
}
declare namespace game.mod.god {
    import TiandiShifangConfig = game.config.TiandiShifangConfig;
    class GodTravelChooseItem extends BaseRenderer {
        private _proxy;
        private btn;
        private lab_name;
        private img_icon;
        data: TiandiShifangConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.god {
    class GodTravelChooseView extends eui.Component {
        list: eui.List;
        btn_travel: Btn;
        constructor();
    }
}
declare namespace game.mod.god {
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import UpdateItem = base.UpdateItem;
    class GodTravelItem extends BaseRenderer implements UpdateItem {
        private _proxy;
        btn_get: Btn;
        lab_time: eui.Label;
        btn_reward: Btn;
        btn_add: Btn;
        name_item: AvatarNameItem;
        img_icon: eui.Image;
        data: TiandiShifangYouliConfig;
        private end_time;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onUpdateTime;
        private onClickGet;
        private onClickAdd;
        private onClickReward;
    }
}
declare namespace game.mod.god {
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import UpdateItem = base.UpdateItem;
    class GodTravelTipItem extends BaseRenderer implements UpdateItem {
        private _proxy;
        private img_icon;
        btn_get: Btn;
        grp_time: eui.Group;
        lab_time: eui.Label;
        btn_add: Btn;
        name_item: AvatarNameItem;
        data: TiandiShifangYouliConfig;
        private end_time;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onUpdateTime;
        private onClickGet;
        private onClickAdd;
    }
}
declare namespace game.mod.god {
    class GodTravelTipView extends eui.Component {
        list: eui.List;
        btn_travel: Btn;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodTravelView extends eui.Component {
        list: eui.List;
        btn_get: Btn;
        btn_travel: Btn;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodAvatarMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.god {
    class GodAvatarMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listLevel;
        private _listSkill;
        private _cfg;
        private maxLevel;
        private _info;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitTab;
        private onUpdateTab;
        private onUpdateIndex;
        private onUpdateView;
        private onUpdateUp;
        private onUpdateSkill;
        private onUpdateLevel;
        private onClick;
        private onClickSelect;
        private onClickAttr;
        private onClickSkill;
        private onClickJump;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    import Handler = base.Handler;
    class GodBuffTipsMdr extends MdrBase {
        private _view;
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        _showArgs: {
            skillId: number;
            cur?: number;
            limit?: number;
            isAct: boolean;
            confirm?: Handler;
            condHandler?: Handler;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private onInfoUpdate;
        private updateView;
        private updateAct;
    }
}
declare namespace game.mod.god {
    class GodTravelChooseMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodTravelMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickGet;
        private onClickTravel;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodTravelTipMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    import TiandiTianlongJihuoConfig = game.config.TiandiTianlongJihuoConfig;
    class GodDragonoathItem extends BaseRenderer {
        private _proxy;
        img_icon: eui.Image;
        img_lock: eui.Image;
        lab_level: eui.Label;
        redPoint: eui.Image;
        name_item: AvatarNameItem;
        data: TiandiTianlongJihuoConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodDragonoathLvItemRender extends eui.ItemRenderer {
        img_icon: eui.Image;
        data: boolean;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodDragonoathSuitItem extends eui.Component {
        img_icon: eui.Image;
        redPoint: eui.Image;
        lab_cnt: eui.Label;
        data: number[];
        constructor();
        setData(info: number[]): void;
    }
}
declare namespace game.mod.god {
    class GodDragonoathView extends eui.Component {
        grp_eff: eui.Group;
        list: eui.List;
        grp_lv: eui.Group;
        name_item: AvatarNameItem;
        god_item: AttrGodItem;
        power: Power;
        icon_suit: GodDragonoathSuitItem;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        lab_limit: eui.Label;
        list_item: eui.List;
        bar: ProgressBarComp;
        btn_activate: Btn;
        cost: CostIcon;
        btn_up: Btn;
        img_icon: eui.Image;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodDragonoathBuffTipsMdr extends MdrBase {
        private _view;
        /**技能id，等级*/
        _showArgs: {
            index: number;
        };
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.god {
    class GodDragonoathMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.god {
    class GodDragonoathMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listLevel;
        private _cfg;
        private _info;
        private maxLevel;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitTab;
        private onUpdateTab;
        private onSelectIndex;
        private onUpdateIndex;
        private onUpdateView;
        private onUpdateUp;
        private onUpdateLevel;
        private onClick;
        private onClickSelect;
        private onClickTips;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodHauntedActivateView extends eui.Component {
        grp_desc: eui.Group;
        lab_desc: eui.Label;
        img_bg: eui.Image;
        power: Power;
        name_item: AvatarNameItem;
        constructor();
    }
}
declare namespace game.mod.god {
    import TiandiFengduTaozhuangConfig = game.config.TiandiFengduTaozhuangConfig;
    class GodHauntedAttrItem extends BaseRenderer {
        private _proxy;
        private lab;
        data: TiandiFengduTaozhuangConfig;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodHauntedDetailView extends eui.Component {
        lab_desc: eui.Label;
        list_reward: eui.List;
        cost: game.mod.CostIcon;
        lab_tip: eui.Label;
        btn_get: game.mod.Btn;
        grp_power: eui.Group;
        grp_desc: eui.Group;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodHauntedFightView extends eui.Component {
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        img_hp1: eui.Image;
        head1: game.mod.Head;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        img_hp2: eui.Image;
        head2: game.mod.Head;
        constructor();
    }
}
declare namespace game.mod.god {
    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;
    class GodHauntedItem extends BaseRenderer {
        private _proxy;
        private img_sr;
        private img_mark;
        private img_bg;
        private name_item;
        data: TiandiFengduBaiguiluConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    import TiandiShifangConfig = game.config.TiandiShifangConfig;
    class GodAvatarItem extends BaseRenderer {
        private _proxy;
        private img_icon;
        private img_gray;
        private redPoint;
        private img_name;
        data: TiandiShifangConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodHauntedActivateMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
    }
}
declare namespace game.mod.god {
    class GodHauntedDetailMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _rewardDatas;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private onClick;
    }
}
declare namespace game.mod.god {
    import UpdateItem = base.UpdateItem;
    class GodHauntedFightMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private readonly HP_WIDTH;
        private readonly ALL_HP;
        private self;
        private boss;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        update(time: base.Time): void;
        private onUpdateInfo;
        private onUpdateRandomHP;
        protected onOver(): void;
    }
}
declare namespace game.mod.god {
    class GodHauntedMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.god {
    class GodHauntedMdr extends MdrBase {
        private _view;
        private _listData;
        private _attrsData;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodBuffItem extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        redPoint: eui.Image;
        data: SkillItemRenderData;
        protected dataChanged(): void;
        /**单个技能外部调用*/
        setData(skillId: number): void;
    }
}
declare namespace game.mod.god {
    class GodCommonView extends eui.Component {
        grp_eff: eui.Group;
        power: Power2;
        list_item: eui.List;
        btn_up: Btn;
        btn_onekey: Btn;
        btn_right: Btn;
        btn_gift: Btn;
        img_max: eui.Image;
        name_item: AvatarNameItem;
        cost: CostIcon;
        bar: ProgressBarComp;
        god_item: AttrGodItem;
        grp_desc: eui.Group;
        lab_desc: eui.Label;
        img_text: eui.Image;
        constructor();
    }
}
declare namespace game.mod.god {
    import TiandiLevelrewardsConfig = game.config.TiandiLevelrewardsConfig;
    class GodGiftItemRender extends BaseRenderer {
        private lab_desc;
        private list_reward;
        private img_buy;
        private btn_buy;
        data: TiandiLevelrewardsConfig;
        private _proxy;
        private _rewardList;
        private _canBuy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.god {
    class GodItem extends BaseRenderer {
        private _proxy;
        private redPoint;
        private img_mask;
        private name_item;
        private img_bg;
        private group_eft;
        data: GodListData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodListView extends eui.Component {
        list: eui.List;
        lab: eui.Label;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodLvItemRender extends eui.ItemRenderer {
        img_icon: eui.Image;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    class GodRoadView extends eui.Component {
        name_item: AvatarNameItem;
        btn_once: Btn;
        btn_ten: Btn;
        bar: ProgressBarComp;
        grp_eff: eui.Group;
        btn_left: Btn;
        btn_reward: Btn;
        icon: Icon;
        cost_once: CostIcon;
        cost_ten: CostIcon;
        grp_desc: eui.Group;
        lab_desc: eui.Label;
        lab_tips: eui.Label;
        btn_prop: Btn;
        btn_tiandi: Btn;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodCommonMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected updateBtnList(): void;
    }
}
declare namespace game.mod.god {
    class GodCommonMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private maxLevel;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        updateModel(index: number, showName?: boolean): void;
        private updatePower;
        private onClick;
        private onClickGift;
        private onClickAct;
        private onClickAttr;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodGiftMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
    }
}
declare namespace game.mod.god {
    class GodGiftMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**初始化显示不同的ui*/
        private initView;
        private updateReward;
        private updateItemList;
    }
}
declare namespace game.mod.god {
    class GodListMdr extends MdrBase {
        private _view;
        private _listData;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.god {
    class GodMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.god {
    class GodRoadMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        updateModel(index: number, showName?: boolean): void;
        protected onHide(): void;
        private onClick;
        private onClickTiandi;
        private onClickAct;
        private onClickReward;
        private onClickProp;
    }
}
declare namespace game.mod.god {
    import tiandi_level_data = msg.tiandi_level_data;
    import common_reward_status = msg.common_reward_status;
    import tiandi_youli_paiqian_struct = msg.tiandi_youli_paiqian_struct;
    import tiandi_youli_data = msg.tiandi_youli_data;
    class GodModel {
        iType: number;
        now_itype: number;
        value: number;
        infos: {
            [type: number]: tiandi_level_data;
        };
        hintNodes: {
            [type: number]: string[];
        };
        is_sign: number;
        num: number;
        rewards: common_reward_status[];
        ids: number[];
        tianlong_list: {
            [type: number]: tiandi_level_data;
        };
        shifang_list: {
            [type: number]: tiandi_level_data;
        };
        travel_list: tiandi_youli_paiqian_struct[];
        actOfType: {
            [type: number]: string;
        };
        readonly common: string[];
        readonly actname: {
            [type: number]: string;
        };
        map_type: number;
        saveChoose: tiandi_youli_data[];
    }
}
declare namespace game.mod.god {
    import tiandi_level_data = msg.tiandi_level_data;
    import GameNT = base.GameNT;
    import TiandiLevelConfig = game.config.TiandiLevelConfig;
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;
    import common_reward_status = msg.common_reward_status;
    import UpdateItem = base.UpdateItem;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import tiandi_youli_paiqian_struct = msg.tiandi_youli_paiqian_struct;
    import tiandi_youli_data = msg.tiandi_youli_data;
    import TiandiShifangConfig = game.config.TiandiShifangConfig;
    import TiandiShifnagLevelConfig = game.config.TiandiShifnagLevelConfig;
    import TiandiTianlongConfig = game.config.TiandiTianlongConfig;
    import TiandiRandomConfig = game.config.TiandiRandomConfig;
    class GodProxy extends ProxyBase implements UpdateItem, IGodProxy {
        private _model;
        readonly model: GodModel;
        initialize(): void;
        update(time: base.Time): void;
        c2s_tiandi_gongfeng(type: number): void;
        c2s_tiandi_get_level_rewards(itype: number, index: number): void;
        c2s_tiandi_level_up(button_type: number, itype: number): void;
        c2s_tiandi_yuhuang_qiandao(index?: number): void;
        c2s_tiandi_fengdu_baiguilu(index: number): void;
        s2c_tiandi_yuhuang_qiandao(n: GameNT): void;
        private s2c_tiandi_list;
        private s2c_tiandi_fengdu_baiguilu;
        c2s_tiandi_tianlong_level_up(button_type: number, itype: number): void;
        c2s_tiandi_shifang_level_up(button_type: number, itype: number): void;
        c2s_tiandi_shifang_skill_active(itype: number, index: number): void;
        c2s_tiandi_youli_paiqian(request_list: tiandi_youli_data[]): void;
        c2s_tiandi_youli_get_rewards(map_type?: number): void;
        private s2c_tiandi_tianlong_list;
        private s2c_tiandi_shifang_list;
        private s2c_tiandi_youli_paiqian_list;
        readonly common: string[];
        iType: number;
        readonly nowType: number;
        getActivate(type: number): boolean;
        readonly activateCount: number;
        /**活动2激活卡片 */
        getActivateCount(): number;
        getActivateCard(index: number): boolean;
        getHint(type?: number): string[];
        getStage(type: number): number;
        getInfo(type: number): tiandi_level_data;
        getCost(type: number, level: number): TiandiLevelConfig;
        getPin(type?: number): number;
        getActname(type: number): string;
        /**已购买 */
        getBool(type: number, index: number): boolean;
        readonly value: number;
        readonly maxValue: number;
        readonly list: GodListData[];
        getMaxLevel(itype?: number): number;
        getMaxExp(itype?: number): number;
        getMaxLevelType4(itype: number): number;
        getMaxLevelType3(itype: number): number;
        getMaxExpType4(itype: number): number;
        getMaxExpType3(itype: number): number;
        getCostType4(type: number, level: number): TiandiShifnagLevelConfig;
        getCostType3(type: number, level: number): TiandiTianlongConfig;
        getVipSignCfgArr(): TiandiYuhuangQiandaoConfig[];
        readonly isSign: boolean;
        readonly signDay: number;
        getAct(type: number): string;
        getVipSignStatus(index: number): common_reward_status;
        getInitType3Index(): number;
        getType3Info(index: number): tiandi_level_data;
        getBuff(index: number): number[];
        getInitType4Index(): number;
        getType4Info(index: number): tiandi_level_data;
        getYouliArr(): TiandiShifangYouliConfig[];
        getYouli(map_type: number): tiandi_youli_paiqian_struct;
        getYouliChoose(): TiandiShifangConfig[];
        saveChoose(data: tiandi_youli_data): void;
        getSaveChoose(map_type: number): tiandi_youli_data;
        getPreviewReward(type: number): TiandiRandomConfig[];
        private onUpdateHintOfGift;
        private onUpdateHintOfUp;
        private onUpdateHintOfType1Act;
        private onUpdateHintOfType3Act;
        private onUpdateHintOfType4Act;
        private onUpdateHintOfMain;
        protected onBagUpdateByPropIndex(n: GameNT): void;
    }
}
declare namespace game.mod.god {
    class GodTreasureView extends eui.Component {
        list: eui.List;
        reward: GodProgressReward;
        constructor();
    }
}
declare namespace game.mod.god {
    class GodProgressItem extends BaseRenderer {
        bar: ProgressBarComp;
        data: VProgressData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.god {
    import ArrayCollection = eui.ArrayCollection;
    class GodProgressReward extends BaseRenderer {
        img_tips: eui.Image;
        lab_count: eui.Label;
        list_reward: eui.List;
        list_progress: eui.List;
        protected _listData: ArrayCollection;
        protected _listReward: ArrayCollection;
        constructor();
        protected onAddToStage(): void;
        setData(val: number): void;
    }
}
declare namespace game.mod.god {
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;
    class GodProgressRewardItem extends BaseRenderer {
        icon: Icon;
        barCnt: ProgressBarCntComp;
        redPoint: eui.Image;
        img_got: eui.Image;
        private _proxy;
        data: TiandiYuhuangQiandaoConfig;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
}
declare namespace game.mod.god {
    class GodTreasureMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.god {
    class GodTreasureMdr extends MdrBase {
        private _view;
        private _listData;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
