declare namespace game.mod.surface {
    import XianjianConfig = game.config.XianjianConfig;
    import fly_sword_info = msg.fly_sword_info;
    import fly_sword_battle_pos_info = msg.fly_sword_battle_pos_info;
    import JianfaConfig = game.config.JianfaConfig;
    import fly_sword_buwei_info = msg.fly_sword_buwei_info;
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import jiban_item = msg.jiban_item;
    /**
     * @description 仙剑系统
     */
    class XianjianProxy extends ProxyBase implements IXianjianProxy {
        private _model;
        skills: number[];
        readonly model: XianjianModel;
        onStartReconnect(): void;
        initialize(): void;
        c2s_fly_sword_operation(index: number, op: number, param?: number): void;
        c2s_fly_sword_into_battle(pos: number, index: number): void;
        private s2c_fly_sword_battle_pos;
        private s2c_fly_sword_info;
        protected onSurfaceTipsHide(): void;
        getInfo(index: number): fly_sword_info;
        /**仙剑总属性*/
        getAttr(): attributes;
        getCfgArr(): XianjianConfig[];
        readonly countOfActive: number;
        getShangzhen(pos: number): fly_sword_battle_pos_info;
        getXianjianCfgList(type: number, buwei?: boolean): XianjianConfig[];
        getMinStage(index: number): number;
        getNextStage(index: number): number;
        getCountByStage(index: number, stage: number): number;
        getBuwei(data: XianJianBuweiData): fly_sword_buwei_info;
        getXianjianBuwei(info: XianJianBuweiData): JianfaConfig;
        getBuweiNext(info: XianJianBuweiData): number[];
        getCfgSkill(index: number, pos: number, level?: number): number;
        /**被动技能等级 */
        getSkillLv(index: number, pos: number): number;
        getSkillCost(index: number, level: number): number[];
        readonly jibans: jiban_item[];
        private onUpdateHint;
        private onUpdateHintByBuwei;
        private onUpdateHintBySkill;
        getTypeHintBySkill(type: number): boolean;
        getItemHintBySkill(index: number): boolean;
        getSkillUp(index: number): boolean;
        getBuweiUp(index: number, cfg: JianfaConfig): boolean;
        onUpdateHintByType(type: number): void;
        getTypeHint(type: number): boolean;
        getItemHint(index: number): boolean;
        canUpJiban(index: number): boolean;
        canUpLevel(index: number): boolean;
        canJibanAct(cfg: HorseJibanConfig): boolean;
        canUpStar(index: number): boolean;
        getStarPropCnt(headType: number, quality: number, propIndex: number, star: number): number;
        getListData(type: number, buwei?: boolean): AvatarItemData[];
        private defaultSort;
        private onInitData;
        private setType;
        /**获取材料更新仙剑类型列表 */
        getTypes(): number[];
        readonly buwei_types: number[];
        setBuweiTypes(index: number, type: number): void;
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
        protected onBagUpdateByBagType(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
    }
}
declare namespace game.mod.surface {
    import Handler = base.Handler;
    class SkillTipsMdr extends MdrBase {
        protected _view: SkillTipsView;
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        _showArgs: SkillTipsData;
        protected _cost: number[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickAct(): void;
        private onInfoUpdate;
        protected updateView(): void;
        protected onUpdateItem(): void;
        protected onUpdateCost(): void;
        protected updateAct(isAct: boolean): void;
    }
    interface SkillTipsData {
        skillId: number;
        isAct: boolean;
        confirm?: Handler;
        condHandler?: Handler;
    }
}
declare namespace game.mod.surface {
    class SurfaceSkillTipsMdr extends MdrBase {
        protected _view: SurfaceSkillTipsView;
        private _proxy;
        /**技能数据*/
        _showArgs: BattleSkillItemRenderData;
        private _openIdx;
        protected _attrKeys: string[];
        protected _huashenAttrKeys: string[];
        private _attrs;
        private _cfg;
        protected _state: string;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private reqSurfaceAttr;
        private initView;
        private initAttr;
        private updateAttr;
        private updateSkill;
        private updateDesc2;
        private updateDesc3;
        protected onUpdateDesc2(): void;
    }
}
declare namespace game.mod.surface {
    class LingChongMdr extends EffectMdrBase {
        protected _view: LingChongView;
        protected _proxy: LingChongProxy;
        protected _listAvatar: eui.ArrayCollection;
        protected _curIndex: number;
        private _effIdx;
        private _curEftIndex;
        private _selIdx;
        /**灵宠类型*/
        protected _type: number;
        /**页签类型*/
        protected _littleType: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onUpdateInfo(): void;
        protected jumpSecondTab(): void;
        private getListData;
        protected updateListData(): void;
        private sortFunc;
        protected updatePowerView(): void;
        protected updateView(): void;
        protected updateAttrView(): void;
        protected updateTaskView(): void;
        protected onHide(): void;
        protected onClickAttr(): void;
        protected onClickAward(): void;
        protected onClickUp(): void;
        protected onGetReward(...args: any[]): void;
        protected onClickList(e: eui.ItemTapEvent): void;
        protected updateBtnHint(): void;
        private onUpdateByBagPropType;
        private onUpdateListHint;
    }
}
declare namespace game.mod.surface {
    class XianjianView extends eui.Component {
        grp_eff: eui.Group;
        power2: game.mod.Power2;
        name_item: AvatarNameItem;
        item_skill: XianjianBattleSkillItem;
        btn_up: game.mod.UpStarBtn;
        btn_jiban: game.mod.Btn;
        btn_duanlian: game.mod.Btn;
        grp_duanlian: eui.Group;
        list_item: eui.List;
        list_type: eui.List;
        god_item: AttrGodItem;
        lab_count: eui.Label;
        btn_flyRank: Btn;
        lab_flyRank: eui.Label;
        grp_flyRank: eui.Group;
        constructor();
    }
}
declare namespace game.mod.surface {
    import fly_sword_info = msg.fly_sword_info;
    import fly_sword_battle_pos_info = msg.fly_sword_battle_pos_info;
    import jiban_item = msg.jiban_item;
    class XianjianModel {
        infos: Map<number, fly_sword_info>;
        shangzhen: {
            [pos: number]: fly_sword_battle_pos_info;
        };
        types: number[];
        buwei_types: number[];
        jiban: jiban_item[];
        isAct: boolean;
        upStarIdx: number;
        upStarData: UpStarData;
        /**升星消耗道具 */
        starProps: number[];
        /**根据道具获取index */
        propToIndex: Map<number, number[]>;
        costIndex: number[];
    }
}
declare namespace game.mod.surface {
    class SurfaceMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.surface {
    class SurfaceBaseView extends eui.Component {
        grp_horse: eui.Group;
        grp_eff1: eui.Group;
        redPoint1: eui.Image;
        btn_horse: game.mod.Btn;
        img_tag1: eui.Image;
        grp_tianshen: eui.Group;
        grp_eff2: eui.Group;
        redPoint2: eui.Image;
        btn_tianshen: game.mod.Btn;
        grp_lingchong: eui.Group;
        grp_eff3: eui.Group;
        redPoint3: eui.Image;
        btn_lingchong: game.mod.Btn;
        img_tag3: eui.Image;
        grp_xianjian: eui.Group;
        grp_eff4: eui.Group;
        redPoint4: eui.Image;
        btn_xianjian: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.surface {
    import JinjiejiangliConfig = game.config.JinjiejiangliConfig;
    class SurfaceGiftItemRender extends BaseRenderer {
        private lab_desc;
        private list_reward;
        private img_buy;
        private btn_buy;
        data: JinjiejiangliConfig;
        private _proxy;
        private _cost;
        private _rewardList;
        private _canBuy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.surface {
    class SurfacePillTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        lab_cnt: eui.Label;
        power: game.mod.Power;
        grp_attr: eui.Group;
        baseAttrItem: BaseAttrItem;
        baseDescItem: BaseDescItem;
        list_attr: eui.List;
        constructor();
    }
}
declare namespace game.mod.surface {
    class SurfaceSkillTipsView extends eui.Component {
        private baseQualityTips;
        skill: SkillItemRender;
        lab_name: eui.Label;
        baseDescItem: BaseDescItem;
        baseDescItem2: BaseDescItem;
        skillAttrList: SkillAttrList;
        baseDescList: BaseDescList;
        baseDescList2: BaseDescList;
        baseDescList3: BaseDescList;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.surface {
    class SurfaceTipsView extends eui.Component {
        grp_type: eui.Group;
        img_type: eui.Image;
        grp_name: eui.Group;
        lab_name: eui.Label;
        img_quality: eui.Image;
        grp_eff: eui.Group;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.surface {
    class SurfaceUpTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill: game.mod.SkillItemRender;
        grp_desc: eui.Group;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.surface {
    class SurfaceUpTipsView2 extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill1: game.mod.SkillItemRender;
        grp_desc1: eui.Group;
        lab_lv1: eui.Label;
        lab_name1: eui.Label;
        lab_desc1: eui.Label;
        skill2: game.mod.SkillItemRender;
        grp_desc2: eui.Group;
        lab_lv2: eui.Label;
        lab_name2: eui.Label;
        lab_desc2: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.surface {
    class LingChongAwardBtn extends Btn {
        iconDisplay: eui.Image;
        redPoint: eui.Image;
        gr_tips: eui.Group;
        lb_num: eui.Label;
        setTip(cnt: number): void;
    }
}
declare namespace game.mod.surface {
    class LingChongTaskItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        lb_time: eui.Label;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.surface {
    class LingChongTaskView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.surface {
    class LingChongTreasureView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        lb_desc: eui.Label;
        lb_actDesc: eui.Label;
        btn_get: game.mod.Btn;
        img_state: eui.Image;
        constructor();
    }
}
declare namespace game.mod.surface {
    class LingChongView extends eui.Component {
        power: game.mod.Power2;
        nameItem: game.mod.AvatarNameSrItem;
        starCom: game.mod.StarListView;
        special_attr: game.mod.SpecialAttrView;
        btn_up: game.mod.UpStarBtn;
        scroller: eui.Scroller;
        list: eui.List;
        btn_award: game.mod.surface.LingChongAwardBtn;
        gr_eft: eui.Group;
        gr_treasure: eui.Group;
        btn_task: game.mod.Btn;
        lb_desc: eui.Label;
        btn_treasure: game.mod.surface.LingChongAwardBtn;
        constructor();
    }
}
declare namespace game.mod.surface {
    class TianshenEquipTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        icon_equip: TianshenIconEquip;
        lab_name: eui.Label;
        grp_attr: eui.Group;
        baseAttrItem: BaseAttrItem;
        baseDescItem: BaseDescItem;
        attrListZhuangshiView1: AttrListZhuangshiView;
        lab_condition: BaseLabelItem;
        attrListZhuangshiView2: AttrListZhuangshiView;
        icon_cost: game.mod.Icon;
        btn_operate: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.surface {
    class TianshenEquipView extends eui.Component {
        grp_eff: eui.Group;
        power: game.mod.Power2;
        list_equip: eui.List;
        icon_suit: TianshenSuitItem;
        lab_suit_name: eui.Label;
        lab_suit_desc: eui.Label;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.surface {
    class TianshenSuitItem extends eui.Component {
        img_icon: eui.Image;
        img_lock: eui.Image;
        redPoint: eui.Image;
        lab_cnt: eui.Label;
        data: ITianshenSuit;
        needHint: boolean;
        constructor();
        setData(info: ITianshenSuit): void;
    }
}
declare namespace game.mod.surface {
    class TianshenSuitTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        icon_suit: TianshenSuitItem;
        lab_name: eui.Label;
        grp_attr: eui.Group;
        baseDescItem1: BaseDescItem;
        attrListZhuangshiView1: AttrListZhuangshiView;
        baseDescItem2: BaseDescItem;
        attrListZhuangshiView2: AttrListZhuangshiView;
        btn_operate: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.surface {
    class TianshenTypeRender extends BaseRenderer {
        img_bg: eui.Image;
        img_frame: eui.Image;
        img_icon: eui.Image;
        img_qua: eui.Image;
        img_gray: eui.Image;
        lab_num: eui.Label;
        redPoint: eui.Image;
        grp_eft: eui.Group;
        data: {
            type: number;
            suitActive: boolean;
            reachCnt: number;
            hint: boolean;
            isSel?: boolean;
        };
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class XianjianBattleSkillItem extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        redPoint: eui.Image;
        grp: eui.Group;
        img_buff: eui.Image;
        data: BattleSkillItemRenderData;
        protected dataChanged(): void;
        /**单个技能外部调用*/
        setData(skillId: number, skillType: string): void;
        setBg(img: string): void;
    }
}
declare namespace game.mod.surface {
    class XianjianBuweiItem extends eui.ItemRenderer {
        private img_icon;
        private img_lock;
        private lab_level;
        private lab_act;
        redPoint: eui.Image;
        protected propData: PropData;
        data: {
            prop: number;
            lv: number;
        };
        protected dataChanged(): void;
        setData(prop: number, lv: number): void;
    }
}
declare namespace game.mod.surface {
    class XianjianBuweiTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        power: game.mod.Power;
        icon: Icon;
        cost: Icon;
        scroller: eui.Scroller;
        gr_middle: eui.Group;
        baseAttrItem: BaseAttrItem;
        taozhuangItem: game.mod.BaseDescItem;
        skillItem: game.mod.BaseDescItem;
        bar: game.mod.ProgressBarComp;
        btn_up: game.mod.Btn;
        img_max: eui.Image;
        grp_bar: eui.Group;
        constructor();
    }
}
declare namespace game.mod.surface {
    class XianjianChooseView extends eui.Component {
        list: eui.List;
        secondPop: SecondPop;
        grp_eff: eui.Group;
        btn_shangzhen: Btn;
        name_item: AvatarNameItem;
        suit_item: XianjianSkillSuitComp;
        power: Power;
        constructor();
    }
}
declare namespace game.mod.surface {
    import JianzhenConfig = game.config.JianzhenConfig;
    class XianjianGroupItem extends BaseRenderer {
        private _proxy;
        private btn_add;
        private btn_exchange;
        private lab_lock;
        private lab_tips;
        private lab_name;
        private lab_limit;
        private lab_jump;
        private grp_eff;
        data: JianzhenConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickAdd;
        private onClickVip;
    }
}
declare namespace game.mod.surface {
    class XianjianGroupView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.surface {
    class XianjianSkillItem extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        img_tag: eui.Image;
        redPoint: eui.Image;
        grp_lv: eui.Group;
        lab_lv: eui.Label;
        data: XianjianSkillData;
        protected dataChanged(): void;
        /**单个技能外部调用*/
        setData(skillId: number, limit: number, lv?: number): void;
    }
    interface XianjianSkillData extends BattleSkillItemRenderData {
        limit?: number;
        /**飞剑index */
        index?: number;
    }
}
declare namespace game.mod.surface {
    class XianjianSkillSuitComp extends eui.Component {
        lb_name: eui.Label;
        lb_desc: eui.Label;
        img_icon: eui.Image;
        img_icongray: eui.Image;
        updateView(index: number): void;
    }
}
declare namespace game.mod.surface {
    class XianjianSkillView extends eui.Component {
        grp_eff: eui.Group;
        power2: game.mod.Power2;
        list_item: eui.List;
        list_type: eui.List;
        item_skill: XianjianBattleSkillItem;
        lab: eui.Label;
        icon_1: XianjianBuweiItem;
        icon_2: XianjianBuweiItem;
        icon_3: XianjianBuweiItem;
        icon_4: XianjianBuweiItem;
        lab_name: eui.Label;
        img_sr: eui.Image;
        constructor();
    }
}
declare namespace game.mod.surface {
    class XianjianUpView extends eui.Component {
        secondPop: SecondPop;
        grp_eff: eui.Group;
        btn_shangzhen: Btn;
        suit_item: XianjianSkillSuitComp;
        power: Power;
        skill_1: XianjianSkillItem;
        skill_2: XianjianSkillItem;
        skill_3: XianjianSkillItem;
        skill_4: XianjianSkillItem;
        btn_up: Btn;
        lab_level: eui.Label;
        bar: ProgressBarComp;
        icon: Icon;
        constructor();
    }
}
declare namespace game.mod.surface {
    import lingchong_item = msg.lingchong_item;
    import lingchong_task_item = msg.lingchong_task_item;
    class LingChongModel {
        /**灵宠列表，以及是否领取*/
        list: {
            [index: number]: lingchong_item;
        };
        /**灵宠任务，{灵宠index: {任务index: lingchong_task_item}}*/
        task_list: {
            [index: number]: {
                [task_index: number]: lingchong_task_item;
            };
        };
        /**灵宠Tab -> 灵宠secondTab hint*/
        mainHintPath: string[];
        /**远古神兽Tab -> 四神兽secondTab hint*/
        ygshHintPath1: string[];
        /**远古神兽Tab -> 远古神兽secondTab hint*/
        ygshHintPath2: string[];
    }
}
declare namespace game.mod.surface {
    import XianfaSkillLevelConfig = game.config.XianfaSkillLevelConfig;
    class SkillNormalTipsMdr extends MdrBase {
        private _view;
        /**技能id，等级*/
        _showArgs: {
            skillId: number;
            lv?: number;
            isXianfaSkill?: boolean;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        /**
         * 等级属性
         * @param xianfaLv
         * @param quality 品质，1-4
         * @returns
         */
        getLevelAttr(xianfaLv: number, quality: number): number;
        getXianfaLevelCfg(xianfaLv: number): XianfaSkillLevelConfig;
    }
}
declare namespace game.mod.surface {
    import GameNT = base.GameNT;
    import XianchongConfig = game.config.XianchongConfig;
    import lingchong_item = msg.lingchong_item;
    import RepetitionTaskConfig = game.config.RepetitionTaskConfig;
    import lingchong_task_item = msg.lingchong_task_item;
    /**
     * @description 灵宠系统
     */
    class LingChongProxy extends ProxyBase implements ILingChongProxy {
        private _model;
        private _actList;
        readonly model: LingChongModel;
        initialize(): void;
        /**
         * 幻化激活/升星、领取激活礼包
         * @param index
         * @param oper 1为激活升星，2为领取激活礼包
         */
        c2s_lingchong_oper(index: number, oper: number): void;
        s2c_lingchong_item(n: GameNT): void;
        private _upStarData;
        protected onSurfaceTipsHide(): void;
        /**
         * 领取任务
         * @param index 灵宠index
         */
        c2s_lingchong_get_task_reward(index: number): void;
        s2c_lingchong_task_list(n: GameNT): void;
        /**==========================================================================*/
        getInfo(index: number): lingchong_item;
        isMaxStar(index: number): boolean;
        canUpStar(index: number, isTips?: boolean): boolean;
        private isActed;
        getTaskInfo(index: number): {
            [task_index: number]: lingchong_task_item;
        };
        /**灵宠对应的所有任务可领取次数叠加*/
        getTreasureReceiveCnt(index: number): number;
        /**================================= config =================================*/
        /**灵宠配置，根据类型分类*/
        private _cfgMap;
        getConfigListByType(type: number, littleType: number): XianchongConfig[];
        getConfig(index: number): XianchongConfig;
        getTaskConfig(index: number): RepetitionTaskConfig;
        private _maxStar;
        getMaxStar(index?: number): number;
        /**================================= hint =================================*/
        /**激活礼包*/
        getRewardHint(index: number): boolean;
        /**远古神兽的宝藏红点*/
        getTreasureHint(index: number): boolean;
        /**单个灵宠红点：激活和升星，激活礼包，宝藏*/
        getSingleHint(index: number): boolean;
        /**1:灵宠  2:远古神兽*/
        getHintByType(type: number, littleType: number): boolean;
        getActOrUpHintByType(type: number, littleType: number): boolean;
        private updateHint;
        /**碎片更新*/
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
    }
}
declare namespace game.mod.surface {
    class SurfaceBaseMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _headTypes;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateBtn;
        private onClickHorse;
        private onClickTianshen;
        private onClickLingChong;
        private onClickXianjian;
        private updateModel;
        private updateHint;
        private showGuide;
    }
}
declare namespace game.mod.surface {
    class SurfaceGiftMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected onShow(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
    }
}
declare namespace game.mod.surface {
    class SurfaceGiftMdr extends MdrBase {
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
declare namespace game.mod.surface {
    class SurfaceMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.surface {
    class SurfacePillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: {
            selData: AvatarItemData;
            data: number[];
        }; /**外显配置，炼神丹_max数量*/
        private _propData;
        private _attrList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateAttr;
    }
}
declare namespace game.mod.surface {
    import lianshendan_swal_data = msg.lianshendan_swal_data;
    import ride_info = msg.ride_info;
    import HorseConfig = game.config.HorseConfig;
    import buy_reward_item = msg.buy_reward_item;
    import module_event_add_attr_data = msg.module_event_add_attr_data;
    import yuanling_equip_data = msg.yuanling_equip_data;
    import yuanling_equip_suit = msg.yuanling_equip_suit;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    class SurfaceModel {
        pillInfos: {
            [surfaceId: number]: lianshendan_swal_data[];
        };
        surfaceInfos: {
            [headType: number]: ride_info;
        };
        headType: number;
        /**当前选中的外显信息*/
        selData: AvatarItemData;
        surfaceTypes: {
            [headType: number]: number[];
        };
        surfaceCfgs: {
            [comType: string]: HorseConfig[];
        };
        battleFlag: boolean;
        rewardList: buy_reward_item[];
        skillProps: {
            [headType: number]: number[];
        };
        specialAttrInfos: {
            [index: number]: module_event_add_attr_data;
        };
        /**当前选中的羁绊配置*/
        selJibanCfg: HorseJibanConfig;
        /**以下需要做类型映射*/
        headTypes: number[];
        /**默认初始化外显id */
        headTypeToDefaultId: {
            [headType: number]: number;
        };
        /**功能开启id */
        headTypeToOpenIdx: {
            [headType: number]: number;
        };
        /** 根据headType获取ModName.Surface下的SurfaceViewType 用于点击模型跳转界面 */
        headTypeToViewType: {
            [headType: number]: string;
        };
        headTypeToBtnType: {
            [headType: number]: string;
        };
        /**外显升级红点 */
        upHints: {
            [headType: number]: string[];
        };
        upPropToHeadType: {
            [index: number]: number;
        };
        subTypeToHeadType11: {
            [subType11: number]: number;
        };
        subTypeToHeadType17: {
            [subType17: number]: number;
        };
        subTypeToHeadType32: {
            [subType32: number]: number;
        };
        /**外显技能红点提示 */
        skillHints: {
            [headType: number]: string[];
        };
        jibanHints: {
            [headType: number]: string[];
        };
        giftHints: {
            [headType: number]: string[];
        };
        actHints: {
            [headType: number]: string[];
        };
        /**幻化界面 吞噬丹红点 */
        pillHints: {
            [headType: number]: string[];
        };
        /**功能主界面跳转幻化界面红点 */
        starHint: {
            [headType: number]: string[];
        };
        /**幻化跳转页签*/
        starJumpData: {
            [headType: number]: string;
        };
        /**上阵红点 */
        battleHints: {
            [headType: number]: string[];
        };
        huashenIds: number[];
        huashenTime: number;
        lastHuashenId: number;
        /************************** 元灵.装备 *************************/
        yuanlinEqpInfo: {
            [type: number]: {
                [pos: number]: yuanling_equip_data;
            };
        };
        yuanlinSuitInfo: {
            [type: number]: yuanling_equip_suit;
        };
        yuanlinEquipPower: {
            [type: number]: Long;
        };
        yuanlinSuitPower: {
            [type: number]: Long;
        };
        yuanlinHint: string[];
        yuanlinEqpOpeHint: string[];
        yuanlinSuitOpeHint: string[];
    }
}
declare namespace game.mod.surface {
    class SurfaceTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: {
            index: number;
            triggerGuide: boolean;
        }; /**外显index，是否触发指引*/
        private _triggerGuide;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTypeTween;
        private removeTypeTween;
        private showNameTween;
        private removeNameTween;
        private showSrTween;
        private removeSrTween;
        private showEffect;
    }
}
declare namespace game.mod.surface {
    class SurfaceUpTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: BattleSkillItemRenderData; /**技能数据*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod.surface {
    class SurfaceUpTipsMdr2 extends EffectMdrBase {
        private _view;
        _showArgs: BattleSkillItemRenderData; /**技能数据*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod.surface {
    class HorseMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
    }
}
declare namespace game.mod.surface {
    class LingChongMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.surface {
    import attributes = msg.attributes;
    import HorseConfig = game.config.HorseConfig;
    import ride_item = msg.ride_item;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import YuanlingZhuangbeiConfig = game.config.YuanlingZhuangbeiConfig;
    import YuanlingTaozhuangConfig = game.config.YuanlingTaozhuangConfig;
    import yuanling_equip_data = msg.yuanling_equip_data;
    import yuanling_equip_suit = msg.yuanling_equip_suit;
    import huashen_unit_data = msg.huashen_unit_data;
    import YuanlingJibanConfig = game.config.YuanlingJibanConfig;
    class SurfaceProxy extends ProxyBase implements ISurfaceProxy {
        private _model;
        readonly model: SurfaceModel;
        initialize(): void;
        /******************************炼神丹*********************************/
        private s2c_lianshendan_surface_info;
        /**使用炼神丹*/
        c2s_lianshendan_swal(surfaceId: number, index: number): void;
        /**外显炼神丹信息*/
        private getPillInfo;
        /**炼神丹信息*/
        private getPillInfoByIndex;
        /**炼神丹使用数量*/
        getPillUseCnt(surfaceId: number, index: number): number;
        /**炼神丹使用属性*/
        getPillAttr(surfaceId: number, index: number): attributes;
        /**外显是否可以使用炼神丹*/
        canPillUse(surfaceId: number): boolean;
        /******************************外显系统*********************************/
        /**升级突破*/
        c2s_ride_oper_up(oper: number, headType: number): void;
        /**激活被动技能*/
        c2s_ride_oper_skill_active(skillId: number, headType: number): void;
        /**幻化激活/升星*/
        c2s_ride_oper_up_star(oper: number, surfaceId: number, headType: number, pos?: number): void;
        private s2c_ride_info;
        private _upStarData;
        protected onSurfaceTipsHide(): void;
        /**外显信息*/
        private getSurfaceInfo;
        /**幻化的外显index*/
        getSurfaceId(headType: number): number;
        /**默认显示的外显index*/
        getDefaultId(headType: number): number;
        /**默认显示的外显是否激活*/
        isDefaultAct(headType: number): boolean;
        /**等级*/
        getSurfaceLv(headType: number): number;
        /**阶级*/
        getSurfaceStage(headType: number): number;
        /**小等级*/
        getSurfaceSmallLv(headType: number): number;
        /**突破一次所需等级*/
        getSurfacePerLv(headType: number): number;
        /**升级经验*/
        getSurfaceExp(headType: number): number;
        /**升级所需经验*/
        getSurfaceUpExp(headType: number, index: number): number;
        /**总属性*/
        getSurfaceAllAttr(headType: number): attributes;
        /**主动技能*/
        getSurfaceSkillId(headType: number): number;
        /**被动技能列表*/
        getSurfaceSkillList(headType: number): number[];
        /**被动技能是否激活*/
        isSurfaceSkillAct(headType: number, skillId: number): boolean;
        /**升级消耗*/
        getSurfaceUpCost(headType: number, index: number): number[][];
        headType: number;
        selData: AvatarItemData;
        getSurfaceTypes(headType: number): number[];
        getSurfaceCfgList(headType: number, type: number): HorseConfig[];
        /**外显列表*/
        private getSurfaceListInfo;
        private getSurfacePerInfoPos;
        /**单个外显信息*/
        getSurfacePerInfo(index: number): ride_item;
        /**单个外显属性*/
        getSurfacePerAttr(index: number): attributes;
        /**单个外显星级*/
        getSurfacePerStar(index: number): number;
        /**外显属性丹信息*/
        getSurfacePillCost(quality: number, star: number, headType: number): number[][];
        /**属性丹各个星级消耗信息*/
        getSurfacePillCostList(quality: number, headType: number, index: number): number[][];
        /**外显最大星级*/
        getSurfaceMaxStar(headType: number): number;
        canUpStar(index: number): boolean;
        getStarPropCnt(headType: number, quality: number, propIndex: number, star: number): number;
        getSurfacePerHint(cfg: HorseConfig): boolean;
        getSurfaceTypeHint(headType: number, type: number): boolean;
        /**升级配置*/
        private getSurfaceLvCfg;
        /**************************进阶礼包*************************/
        /**购买礼包*/
        c2s_buy_reward(headType: number, index: number): void;
        private s2c_buy_reward_lisrt;
        hasGiftBuy(headType: number, index: number): boolean;
        /**************************羁绊*************************/
        c2s_ride_oper_jiban(headType: number, index: number, rideIndex?: number): void;
        /**已激活羁绊列表*/
        private getJibanList;
        /**单个羁绊信息*/
        private getJibanInfo;
        private getJibanInfoPos;
        /**羁绊是否已激活*/
        isJibanAct(headType: number, index: number): boolean;
        /**羁绊单个外显是否已激活*/
        isJibanItemAct(headType: number, index: number, rideIndex: number): boolean;
        /**羁绊配置列表*/
        getJibanCfgList(headType: number): HorseJibanConfig[] | YuanlingJibanConfig[];
        /**羁绊系统是否可以激活*/
        canJibanSysAct(headType: number, cfg: HorseJibanConfig): boolean;
        /**羁绊是否可以激活*/
        canJibanAct(headType: number, cfg: HorseJibanConfig): boolean;
        /**羁绊外显是否可以激活*/
        canJibanItemAct(headType: number, cfg: HorseJibanConfig, index: number): boolean;
        selJibanCfg: HorseJibanConfig;
        getBtnType(headType: number): string;
        /**************************红点*************************/
        private checkOpen;
        getOpenIdx(headType: number): number;
        private updateHint;
        private updateUpHint;
        private updateSkillHint;
        /**被动技能激活消耗道具*/
        private initSkillProps;
        private updateJibanHint;
        getJibanHint(headType: number): string[];
        private updateGiftHint;
        getGiftHint(headType: number): string[];
        private updateActHint;
        getActHint(headType: number): boolean;
        private updatePillHint;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        protected onBagUpdateByBagType(n: base.GameNT): void;
        protected onRoleUpdate(n: base.GameNT): void;
        protected onBagUpdateByPropTypeAndSubType(n: base.GameNT): void;
        /************************** 元灵.装备 *************************/
        /**
         * 元灵装备信息
         */
        private s2c_yuanling_equip_info;
        /**
         * 元灵装备激活、进阶信息
         * @param {number} type 元灵类型
         * @param {number} pos 位置
         */
        c2s_yuanling_equip_levelup(type: number, pos: number): void;
        /**
         * 元灵套装信息
         */
        private s2c_yuanling_equip_suit_info;
        /**
         * 元灵套装激活、进阶信息
         * @param {number} type 元灵类型
         */
        c2s_yuanling_equip_suit_levelup(type: number): void;
        getYuanlinEqpInfo(type: number, pos: number): yuanling_equip_data;
        getYuanlinEqpInfo2(type: number): {
            [pos: number]: yuanling_equip_data;
        };
        getYuanlinSuitInfo(type: number): yuanling_equip_suit;
        getYuanlinPower(type: number): Long;
        getYuanlinEqpCfg(id: number): YuanlingZhuangbeiConfig;
        getYuanlinSuitCfg(type: number, lv: number): YuanlingTaozhuangConfig;
        /**
         * 取未激活时的默认装备
         * @param type
         * @returns
         */
        getDefaultEqpCfg(type: number, pos: number): YuanlingZhuangbeiConfig;
        /**
         * 取未激活时的默认套装
         * @param type
         * @returns
         */
        getDefaultSuitCfg(type: number): YuanlingTaozhuangConfig;
        /**
         * 装备阶级达标数量
         * @param type
         * @returns
         */
        getEqpReachCnt(type: number): number;
        /**
         * 取元灵装备类型（1~4）
         */
        getYuanlinEqpType(id: number): number;
        /**
         * 取元灵装备部位（1~8）
         */
        getYuanlinEqpPos(id: number): number;
        /**
         * 取元灵装备阶级
         */
        getYuanlinEqpStep(id: number): number;
        /**
         * 取元灵套装阶级
         */
        getYuanlinSuitStep(cfg: YuanlingTaozhuangConfig): number;
        changeInfos(desc: string, nameColor: number, valColor: number): string[];
        /**
         * 取元灵装备id
         * @param type 1~4
         * @param pos 1~8
         * @param step 阶级 1~
         * @returns
         */
        getYuanlinEqpId(type: number, pos: number, step: number): number;
        private _yuanlingSuitTypeAry;
        /**元灵套装id数组*/
        getYuanlingSuitTypeAry(): number[];
        private updateYuanlinHint;
        getYuanlinEqpTypeHint(type: number): boolean;
        getYuanlinEqpHint(type: number, pos: number): boolean;
        getYuanlinSuitHint(type: number): boolean;
        /**获取功能主界面幻化按钮红点路径 */
        getHeadTypeToStarHint(headType: number): string[];
        /**是否显示主界面幻化按钮 */
        isStar(headType?: number): boolean;
        /**根据headType获取幻化跳转路径 */
        getStarRoadByHeadType(headType?: number): string;
        /**是否有羁绊功能 */
        isJiban(headType?: number): boolean;
        /**************************通用的事件完成协议*************************/
        private s2c_module_event_add_attr_info;
        private getSpecialComposeIndex;
        /**通用的属性信息*/
        private getSpecialAttrInfo;
        /**通用的属性信息描述*/
        getSpecialAttrDesc(index: number, specialindex: number): string;
        /**是否出战*/
        isBattle(headType: number, index: number): boolean;
        /************************化神相关******************************/
        private s2c_bethegod_time;
        huashenTime: number;
        /**外显上阵相关，化神有用到*/
        private getPosList;
        /**已上阵的化神列表*/
        readonly huashenIds: number[];
        updateHuashenIds(posList: huashen_unit_data[]): void;
        resetHuashenIds(): void;
        setHuashenIds(curId: number): void;
        /**获取上阵的外显*/
        getPosIndex(headType: number, pos: number): number;
        /**获取可上阵的外显，不包含当前已上阵的外显*/
        getCanBattleInfos(headType: number): ride_item[];
        /**部位是否可上阵*/
        canPosBattle(headType: number): boolean;
        /**部位可上阵红点*/
        private getPosBattleHint;
        private updateBattleHint;
        getBattleHint(headType: number): string[];
        /**外显激活数量*/
        getSurfaceActCnt(headType: number): number;
    }
    interface ITianshenEquip {
        type: number;
        pos: number;
        step: number;
        cfg: YuanlingZhuangbeiConfig;
        eqp: yuanling_equip_data;
        hint?: boolean;
    }
    interface ITianshenSuit {
        type: number;
        step: number;
        cfg: YuanlingTaozhuangConfig;
        suit: yuanling_equip_suit;
        hint?: boolean;
    }
}
declare namespace game.mod.surface {
    class LingChongSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.surface {
    class LingChongTaskMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listTask;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.surface {
    class LingChongTreasureMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listReward;
        private _canReceiveCnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        protected onHide(): void;
        private onClick;
    }
}
declare namespace game.mod.surface {
    class YuanGuShenShouMdr extends LingChongMdr {
        protected _type: number;
        protected _littleType: number;
        protected addListeners(): void;
        protected updateAttrView(): void;
        protected updateTaskView(): void;
        protected onClickTreasure(): void;
        protected onClickTask(): void;
        protected jumpSecondTab(): void;
    }
    class YuanGuShenShou2Mdr extends YuanGuShenShouMdr {
        protected _type: number;
        protected _littleType: number;
        protected jumpSecondTab(): void;
    }
}
declare namespace game.mod.surface {
    class YuanGuShenShouSecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.surface {
    class TianshenEquipMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listEquipData;
        private _listTypeData;
        private _equipPos;
        private _curType;
        private _effId;
        private _suitData;
        private readonly _posCnt;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private updateCurrentInfo;
        private onHintUpdate;
        private updateTypeHint;
        private onClickEquipList;
        private onClickTypeList;
        private onClickSuitIcon;
    }
}
declare namespace game.mod.surface {
    class TianshenEquipTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _data;
        private _isOperating;
        private _suitInfo;
        private _suitCfg;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private updateAttr;
        private onHintUpdate;
        private updateHint;
        private onClickOperate;
    }
}
declare namespace game.mod.surface {
    class TianshenIconEquip extends eui.ItemRenderer {
        icon: Icon;
        redPoint: eui.Image;
        img_sel: eui.Image;
        img_tag: eui.Image;
        data: ITianshenEquip;
        needHint: boolean;
        constructor();
        protected dataChanged(): void;
        setData(data: ITianshenEquip): void;
    }
}
declare namespace game.mod.surface {
    class TianshenMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
    }
}
declare namespace game.mod.surface {
    class TianshenSuitTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _data;
        private _isOperating;
        private _conditionStr;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private onHintUpdate;
        private updateHint;
        private onClickOperate;
    }
}
declare namespace game.mod.surface {
    class XianjianBattleSkillTipsMdr extends SurfaceSkillTipsMdr {
        _showArgs: XianjianSkillData;
        protected _state: string;
        protected onShow(): void;
        protected addListeners(): void;
        protected onUpdateBtn(): void;
        protected onUpdateDesc2(): void;
        private onClick;
    }
}
declare namespace game.mod.surface {
    import XianjianProxy = game.mod.surface.XianjianProxy;
    class XianjianBuweiTipsMdr extends EffectMdrBase {
        protected _view: XianjianBuweiTipsView;
        protected _proxy: XianjianProxy;
        _showArgs: XianJianBuweiData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickBtn(): void;
        protected updateView(): void;
        protected updateTopView(): void;
        private onUpdateAttr;
        protected updateMiddleView(): void;
        protected updateBottomView(): void;
    }
    interface XianJianBuweiData {
        /**仙剑index */
        index: number;
        /**仙剑部位 */
        pos: number;
    }
}
declare namespace game.mod.surface {
    class XianjianChooseMdr extends EffectMdrBase {
        private _view;
        private _listData;
        private _proxy;
        private _selCfg;
        /**当前选中的外显下标*/
        private _selIndex;
        private _lastIndex;
        private _effIdx;
        private readonly _headType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBtn;
        private onClickItem;
        private indexUpdateInfo;
        private onUpdateSkill;
        private updateModel;
        private updatePower;
        private typeUpdateInfo;
        private updateItemList;
    }
}
declare namespace game.mod.surface {
    class XianjianGroupMdr extends EffectMdrBase {
        private _view;
        private _listData;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
    }
}
declare namespace game.mod.surface {
    class XianjianMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onShow(): void;
    }
}
declare namespace game.mod.surface {
    import UpdateItem = base.UpdateItem;
    class XianjianMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _typeList;
        private _typeDatas;
        private _headType;
        private _proxy;
        /**当前选中的外显类型*/
        private _selType;
        /**当前选中的外显下标*/
        private _selIndex;
        private _selCfg;
        private _lastIndex;
        private _effIdx;
        private _flyRankTime;
        private _flyRankActInfo;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateFlyRank;
        private getFlyRank;
        private updateFlyRankTime;
        private onClickFlyRank;
        private onClickDesc;
        private onClickJiban;
        private onClickDuanlian;
        private onClickStar;
        private onClickType;
        private onClickItemSkill;
        private onClickItem;
        private initTypeList;
        private typeUpdateInfo;
        private updateItemList;
        private indexUpdateInfo;
        private onUpdateLevel;
        private onUpdateSkill;
        private updatePower;
        private updateModel;
        private updateStar;
        private updateTypeListHint;
    }
}
declare namespace game.mod.surface {
    import GameNT = base.GameNT;
    class XianjianSkillMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _typeList;
        private _proxy;
        private readonly _headType;
        /**当前选中的外显类型*/
        private _selType;
        /**当前选中的外显下标*/
        private _selIndex;
        private _selCfg;
        private _effIdx;
        private readonly _buweis;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDesc;
        private onClickItemSkill;
        private onClickType;
        private onClickItem;
        private onClickTips;
        private initTypeList;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateItemList;
        private indexUpdateInfo;
        private updateSkill;
        private updatePower;
        private updateModel;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.surface {
    class XianjianSkillTipsMdr extends SkillTipsMdr {
        _showArgs: XianjianSkillTipsData;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onClickAct(): void;
        protected onUpdateItem(): void;
        protected onUpdateCost(): void;
    }
    interface XianjianSkillTipsData extends SkillTipsData {
        index: number;
        pos: number;
    }
}
declare namespace game.mod.surface {
    class XianjianUpMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _selCfg;
        private readonly _headType;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private onUpdateSkill;
        private onUpdateAttr;
        private onClickUp;
        private onClickSkill;
    }
}
