declare namespace game.mod.yishou {
    class YishouShouguEquipTipsMdr extends MdrBase {
        protected _view: YishouShouguEquipTipsView;
        protected _proxy: YishouProxy;
        _showArgs: number | PropData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateBaseAttr(): void;
        protected updateView(): void;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingEquipIcon extends BaseListenerRenderer {
        icon: game.mod.Icon;
        redPoint: eui.Image;
        gr_star: eui.Group;
        lb_starcnt: eui.Label;
        starView: game.mod.StarListView;
        data: IYishouShoulingEquipIconData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private updateStarView;
        private onClick;
    }
    interface IYishouShoulingEquipIconData {
        index: number;
        equipId: number;
        idx: number;
        hint: boolean;
        star: number;
    }
}
declare namespace game.mod.yishou {
    class YishouModel {
        info_list: {
            [type: number]: msg.yishou_base_data;
        };
        shouling_list: {
            [type: number]: msg.yishou_shouling_group_data;
        };
        equip_list: {
            [type: number]: YishouEquipData;
        };
        shouying_list: {
            [index: number]: msg.yishou_shouying_data;
        };
        jiban_list: {
            [index: number]: msg.yishou_jiban_data;
        };
        hintPath: {
            [index: number]: string[];
        };
        hintPath2: any;
        hintPath3: any;
        jibanHint: string[];
    }
    class YishouEquipData {
        type: YishouType;
        equips: {
            [pos: number]: msg.prop_attributes;
        };
    }
}
declare namespace game.mod.yishou {
    import attributes = msg.attributes;
    import GameNT = base.GameNT;
    import YishouConfig = game.config.YishouConfig;
    import prop_attributes = msg.prop_attributes;
    import yishou_base_data = msg.yishou_base_data;
    import YishouShouhunConfig = game.config.YishouShouhunConfig;
    import YishouSynthesisTypeConfig = game.config.YishouSynthesisTypeConfig;
    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    import YishouShoulingEquipConfig = game.config.YishouShoulingEquipConfig;
    import yishou_shouling_group_data = msg.yishou_shouling_group_data;
    import yishou_shouling_data = msg.yishou_shouling_data;
    import YishouShouyingConfig = game.config.YishouShouyingConfig;
    import yishou_shouying_data = msg.yishou_shouying_data;
    import yishou_jiban_data = msg.yishou_jiban_data;
    /**
     * @description 异兽系统（兽骨，兽魂，兽灵）
     */
    class YishouProxy extends ProxyBase implements IYishouProxy {
        private _model;
        /**选择星级*/
        selStar: boolean;
        /** [品质,星级,部位] */
        selComposeAry: number[];
        private _actJibanMap;
        onStartReconnect(): void;
        initialize(): void;
        private s2c_yishou_base_info;
        private s2c_yishou_base_update;
        /**
         * 装备操作
         * @param type
         * @param oper 1：穿  2：一键穿戴
         * @param propId 装备的唯一id（一键穿戴可缺省）
         */
        c2s_yishou_equip_operate(type: YishouType, oper: number, propId: Long): void;
        private s2c_yishou_equip_update;
        private updateEquipData;
        c2s_yishou_equip_up_level(type: YishouType): void;
        /**
         * 合成
         * @param type
         * @param index 合成后的道具索引
         * @param count 合成数量
         */
        c2s_yishou_equip_synthese(type: number, index: number, count: number): void;
        private s2c_yishou_equip_synthese;
        c2s_yishou_equip_resolve(type: YishouType, list: Long[]): void;
        c2s_yishou_shouhun_operate(type: YishouType, oper: number): void;
        c2s_yishou_skill_active(type: YishouType, skill_id: number): void;
        c2s_yishou_shouling_up_level(index: number, idx: number): void;
        private s2c_yishou_shouling_up_level;
        c2s_yishou_shouling_active(index: number): void;
        private s2c_yishou_shouling_active;
        c2s_yishou_shouying_up_star(index: number): void;
        private s2c_yishou_shouying_up_star;
        c2s_yishou_shouying_jiban(index: number, id?: number): void;
        private s2c_yishou_shouying_jiban;
        /**================================= 协议end =================================*/
        getEquipIndex(type: YishouType, quality: number, star: number, pos: YishouShouguPos): number;
        /**
         * 从装备id获取 [品质,星级,部位,类型]
         */
        getAryByParserIndex(index: number): number[];
        getBagDatas(type: YishouType): PropData[];
        getBagDatasByIndex(index: number, isCompose?: boolean): PropData[];
        getBagDatasByCond(type: YishouType, quality: number, star: number, pos: YishouShouguPos): PropData[];
        getBagDatasByTypeAndPos(type: YishouType, pos: YishouShouguPos): PropData[];
        getYishoucfg(type: YishouType): YishouConfig;
        checkTypeActed(type: YishouType, isTips?: boolean): boolean;
        canJinjie(type: YishouType): boolean;
        canOnekey(type: YishouType): boolean;
        canDressByTypeAndPos(type: YishouType, pos: YishouShouguPos, isReplace?: boolean): boolean;
        getPower(type: YishouType, mdrType?: YishouMdrType): number;
        getAttr(type: YishouType, mdrType?: YishouMdrType): attributes;
        getEquipInfos(type: YishouType): YishouEquipData;
        getEquipInfo(type: YishouType, pos: YishouShouguPos): prop_attributes;
        private _maxStageMap;
        getMaxStage(type: number): number;
        getStageSatisfyCnt(type: YishouType): number;
        getStageCondition(type: number, stage: number): number[];
        getCurStage(type: YishouType): number;
        isMaxStage(type: YishouType): boolean;
        getPosName(type: YishouType, pos: YishouShouguPos): string;
        getStagePosNameList(type: YishouType): string[];
        getCondStr(cond: number[]): string;
        checkSkillActed(type: YishouType, skillId: number): boolean;
        private _skillLevelMap;
        canActSkill(type: YishouType, skillId: number, isTips?: boolean): boolean;
        canShouHunUpLv(type: YishouType, isTips?: boolean): boolean;
        canShowhunOnekey(type: YishouType, isTips?: boolean): boolean;
        getInfo(type: YishouType): yishou_base_data;
        getLevel(type: YishouType): number;
        private _maxLevelMap;
        getMaxLevel(type: YishouType): number;
        isLevelMax(type: YishouType): boolean;
        getShouhunCfg(type: YishouType, level?: number): YishouShouhunConfig;
        getTypeName(type: YishouType): string;
        private _composeCfgMap;
        getComposeCfgs(type: YishouType): YishouSynthesisTypeConfig[];
        private _shoulingCfgMap;
        getShoulingCfgs(type: number): YishouShoulingConfig[];
        getShoulingCfg(index: number): YishouShoulingConfig;
        getShoulingEquipCfg(index: number, star: number): YishouShoulingEquipConfig;
        getShoulingInfo(index: number): yishou_shouling_group_data;
        isShoulingActed(index: number): boolean;
        canShoulingAct(index: number, isTips?: boolean): boolean;
        private _shoulingEquipIdxMap;
        getShoulingEquipIdx(index: number, equipId: number): number;
        getShoulingEquipHint(index: number, equipId: number): boolean;
        getShoulingHint(index: number): boolean;
        getShoulingEquipInfo(index: number, equipId: number): yishou_shouling_data;
        canShoulingEquipActOrUp(index: number, equipId: number, isTips?: boolean): boolean;
        getShoulingAttr(index: number): attributes;
        getShoulingPower(index: number): number;
        /**============================ hint ============================*/
        private updateHint;
        getHintByType(type: YishouType, mdrType: YishouMdrType): boolean;
        private updateHint1;
        private updateHint2;
        private updateTypeHint;
        getComposeCost(equipId: number): number[];
        getComposePosHint(type: YishouType, quality: number, star: number, pos: YishouShouguPos): boolean;
        getComposeStarHint(type: YishouType, quality: number, star: number): boolean;
        getComposeQualityStar(type: YishouType, quality: number): number;
        getComposeQualityHint(type: YishouType, quality: number): boolean;
        getComposeTypeHint(type: YishouType): boolean;
        private updateHint3;
        private _shouhunCostAry;
        getShouhunCost(): number[];
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onBagUpdateByBagType(n: GameNT): void;
        /**================================ 兽印 ================================*/
        private _shouyinCfgMap;
        getShouyinCfgList(type: YishouShouyinType): YishouShouyingConfig[];
        getShouyinCfg(index: number): YishouShouyingConfig;
        getShouyinInfo(index: number): yishou_shouying_data;
        private _shouyinMaxStarMap;
        getShouyinMaxStar(index: number): number;
        getShouyinStar(index: number): number;
        isShouyinMaxStar(index: number): boolean;
        canShouyinActOrUp(index: number, isTips?: boolean): boolean;
        getShouyinHintByType(type: YishouShouyinType): boolean;
        updateHint4(): void;
        getJibanInfo(jibanIndex: number): yishou_jiban_data;
        isJibanIconActed(jibanIndex: number, partnerIndex: number): boolean;
        isJibanActed(jibanIndex: number): boolean;
        canJibanIconAct(jibanIndex: number, partnerIndex: number): boolean;
        canJibanAct(jibanIndex: number): boolean;
        getJibanIconActedList(jibanIndex: number): number[];
        getJibanHint(jibanIndex: number): boolean;
        getJibanBtnHint(): boolean;
        getSpecialAttrDesc(shoulingIndex: number): string;
    }
}
declare namespace game.mod.yishou {
    class YishouEquipIcon extends BaseRenderer {
        gr_star: eui.Group;
        starListView: game.mod.StarListView;
        img_icon: eui.Image;
        redPoint: eui.Image;
        gr_eft: eui.Group;
        img_quality: eui.Image;
        data: IYishouEquipIconData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        private addIconEft;
    }
    interface IYishouEquipIconData {
        isActed: boolean;
        showHint: boolean;
        index: number;
    }
}
declare namespace game.mod.yishou {
    import YishouSynthesisTypeConfig = game.config.YishouSynthesisTypeConfig;
    class YishouShouguBagTabItem extends BaseListenerRenderer {
        lab_type: eui.Label;
        scr: eui.Scroller;
        list_item: eui.List;
        redPoint: eui.Image;
        data: IYishouShouguBagTabItemData;
        private _proxy;
        private _listData;
        private _selIdx;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private updateListData;
        private onClickList;
    }
    interface IYishouShouguBagTabItemData {
        type: YishouType;
        cfg: YishouSynthesisTypeConfig;
        showHint: boolean;
        isSel: boolean;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguBagTabStarItem extends BaseListenerRenderer {
        redPoint: eui.Image;
        lab_name: eui.Label;
        data: IYishouShouguBagTabStarItemData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IYishouShouguBagTabStarItemData {
        star: number;
        showHint: boolean;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguDecomposeIcon extends IconSelMany {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.yishou {
    class YishouTypeIcon extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_sel: eui.Image;
        redPoint: eui.Image;
        gr_lock: eui.Group;
        data: IYishouTypeIconData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IYishouTypeIconData {
        type: YishouType;
        isActed: boolean;
        showHint: boolean;
    }
}
declare namespace game.mod.yishou {
    class YishouTypeIconListComp extends eui.Component {
        list: eui.List;
        private _listData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**更新类型*/
        updateListView(mdrType?: YishouMdrType): void;
        private getHint;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguBagIconName extends IconName {
        private _yishouProxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguBagView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scroller: eui.Scroller;
        list: eui.List;
        lb_num: eui.Label;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguComposeView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scr: eui.Scroller;
        list_type: eui.List;
        list_item: eui.List;
        lab_cnt: eui.Label;
        btn_sub: game.mod.Btn;
        btn_add: game.mod.Btn;
        btn_compose: game.mod.Btn;
        icon0: game.mod.Icon;
        icon_center: game.mod.Icon;
        icon1: game.mod.Icon;
        icon2: game.mod.Icon;
        lb_name: eui.Label;
        list_name: eui.List;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguDecomposeView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scroller: eui.Scroller;
        list: eui.List;
        btn_decompose: game.mod.Btn;
        list_type: eui.List;
        checkBox0: eui.CheckBox;
        checkBox1: eui.CheckBox;
        checkBox2: eui.CheckBox;
        checkBox3: eui.CheckBox;
        checkBox4: eui.CheckBox;
        gr_lb: eui.Group;
        lb_decompose: eui.Label;
        img_decompose: eui.Image;
        lb_decomposeNum: eui.Label;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguEquipListComp extends eui.Component {
        icon0: game.mod.yishou.YishouEquipIcon;
        icon1: game.mod.yishou.YishouEquipIcon;
        icon2: game.mod.yishou.YishouEquipIcon;
        icon3: game.mod.yishou.YishouEquipIcon;
        icon4: game.mod.yishou.YishouEquipIcon;
        icon5: game.mod.yishou.YishouEquipIcon;
        icon6: game.mod.yishou.YishouEquipIcon;
        icon7: game.mod.yishou.YishouEquipIcon;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**更新部位*/
        updateEquipListView(type: YishouType): void;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguEquipTipsView extends eui.Component {
        propTips: game.mod.BasePropTips;
        power: game.mod.Power;
        descItem0: game.mod.BaseDescItem;
        descItem1: game.mod.BaseDescItem;
        btn_replace: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguSkillComp extends eui.Component {
        img_skill: eui.Image;
        lb_cond: eui.Label;
        img_type: eui.Image;
        gr_font: eui.Group;
        gr_eft: eui.Group;
        private _proxy;
        private _type;
        private _hub;
        private _skillEftId;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**更新技能进阶*/
        updateSkillView(type: YishouType): void;
        private onClickSkill;
        private addSkillEft;
        private removeSkillEft;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguSkillTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_skillType: eui.Image;
        descItem0: game.mod.BaseDescItem;
        attrList: game.mod.SkillAttrList;
        descList: game.mod.BaseDescList;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguView extends eui.Component {
        power2: game.mod.Power2;
        equipListComp: game.mod.yishou.YishouShouguEquipListComp;
        btn_jinjie: game.mod.Btn;
        btn_onekey: game.mod.Btn;
        btn_compose: game.mod.Btn;
        btn_bag: game.mod.Btn;
        btn_decompose: game.mod.Btn;
        iconListComp: game.mod.yishou.YishouTypeIconListComp;
        skillComp: game.mod.yishou.YishouShouguSkillComp;
        img_icon: eui.Image;
        gr_jinjie: eui.Group;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouhunSkillTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        power: game.mod.Power;
        img_skillType: eui.Image;
        lb_name: eui.Label;
        descItem: game.mod.BaseDescItem;
        btn_do: game.mod.Btn;
        lb_cond: eui.Label;
        img_act: eui.Image;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouhunView extends eui.Component {
        iconListComp: game.mod.yishou.YishouTypeIconListComp;
        power2: game.mod.Power2;
        list_skill: eui.List;
        btn_do: game.mod.Btn;
        btn_onekey: game.mod.Btn;
        costIcon: game.mod.CostIcon;
        bar: game.mod.ProgressBarComp;
        gr_lv: eui.Group;
        lb_level: eui.Label;
        img_icon: eui.Image;
        img_max: eui.Image;
        nameItem: game.mod.AvatarNameItem;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingAvatarItem extends AvatarItem {
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.yishou {
    class YishouMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingEquipTipsBagView extends eui.Component {
        propTips: game.mod.BasePropTips;
        lb_cnt: eui.Label;
        power: game.mod.Power;
        descItem: game.mod.BaseDescItem;
        descList: game.mod.BaseDescList;
        lb_specialattr: eui.Label;
        descItem1: game.mod.BaseDescItem;
        gainItem: game.mod.BaseGainItem;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingEquipTipsView extends eui.Component {
        propTips: game.mod.BasePropTips;
        power: game.mod.Power;
        descItem: game.mod.BaseDescItem;
        descList: game.mod.BaseDescList;
        lb_specialattr: eui.Label;
        btn_do: game.mod.Btn;
        icon_cost: game.mod.Icon;
        img_max: eui.Image;
        constructor();
    }
}
declare namespace game.mod.yishou {
    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    class YishouShoulingSkillComp extends eui.Component {
        skillItem: game.mod.SkillItemRender;
        lb_skillname: eui.Label;
        lb_skilldesc: eui.Label;
        private _proxy;
        private _index;
        private _specialindex;
        private _cfg;
        constructor();
        private onAddToStage;
        private onRemoveFromStage;
        private onClick;
        updateView(cfg: YishouShoulingConfig): void;
        private updateSpecialDesc;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingSkillTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_type: eui.Image;
        descItem: game.mod.BaseDescItem;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingView extends eui.Component {
        power2: game.mod.Power2;
        specialAttrView: game.mod.SpecialAttrView;
        icon0: game.mod.yishou.YishouShoulingEquipIcon;
        icon1: game.mod.yishou.YishouShoulingEquipIcon;
        icon2: game.mod.yishou.YishouShoulingEquipIcon;
        icon3: game.mod.yishou.YishouShoulingEquipIcon;
        scroller: eui.Scroller;
        list: eui.List;
        skillComp: game.mod.yishou.YishouShoulingSkillComp;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouyinView extends eui.Component {
        power: game.mod.Power;
        nameItem: game.mod.AvatarNameSrItem;
        btn_god: game.mod.AttrGodItem;
        btn_upstar: game.mod.UpStarBtn;
        btn_jiban: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        img_icon: eui.Image;
        constructor();
    }
}
declare namespace game.mod.yishou {
    class YishouShouguBagMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listIcon;
        private _listType;
        private _selIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initScroller;
        private onUpdateView;
        private updateListType;
        private updateView;
        private getIconList;
        private onClickListType;
        private getType;
        private onBagUpdateByBagType;
        private onClickIcon;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguComposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listBtn;
        private _listType;
        private _listItem;
        private _selQualityIdx;
        private _selPosIdx;
        private _costAry;
        private _selCnt;
        private _equipId;
        _showArgs: YishouType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateListBtn;
        private updateListType;
        private updateListItem;
        private updateSelAry;
        private updateView;
        private onClickSub;
        private onClickAdd;
        private onClickCompose;
        private updateCnt;
        private onClickType;
        private onClickItem;
        private updateStarUpdate;
        private onBagUpdateByBagType;
        private onSyntheseSuccess;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguDecomposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listIcon;
        private _listBtn;
        private _selIdx;
        private _qualityAry;
        private _checkBoxAry;
        private _selQualityAry;
        private _selProp;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initScroller;
        private initSel;
        private updateListBtn;
        private updateListIcon;
        private updateView;
        private updateLabel;
        private onClickDecompose;
        private decomposeFunc;
        private onClickCheckBox;
        private onClickListType;
        private onClickListIcon;
        private onBagUpdateByBagType;
    }
}
declare namespace game.mod.yishou {
    class YishouMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.yishou {
    class YishouShouguEquipTipsMdr2 extends YishouShouguEquipTipsMdr {
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateBaseAttr(): void;
        protected updateView(): void;
        private onClickReplace;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _selIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getType;
        private updateView;
        private onClickAttr;
        private onClickJinjie;
        private onClickOnekey;
        private onClickBag;
        private onClickCompose;
        private onClickDecompose;
        private onClickIconList;
        private updateBtnHint;
        private onBagUpdateByBagType;
    }
}
declare namespace game.mod.yishou {
    class YishouShouguSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: YishouType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.yishou {
    class YishouShouhunMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listSkill;
        private _selIdx;
        private _barTween;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getType;
        private updateView;
        private updateSkill;
        private updateCost;
        private updatePower;
        private onClickAttr;
        private onClickDo;
        private onClickOnekey;
        private onClickIconList;
        private onClickSkillList;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.yishou {
    class YishouShouhunSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        /** 类型,技能序号,激活等级,技能id */
        _showArgs: number[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onSwitchState;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingEquipTipsBagMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: PropData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private getAttr;
        private updateTopView;
        private updateBaseAttr;
        private updateSuitAttr;
        private onClick;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingEquipTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: IYishouShoulingEquipIconData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updateTopView;
        private updateBaseAttr;
        private updateSuitAttr;
        private updateCost;
        private onClick;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _selIdx;
        private _selCfg;
        private _listData;
        /**二级页签类型*/
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateListData;
        private onUpdateView;
        private updateView;
        private updatePower;
        private onClickList;
        private onClickAttr;
    }
}
declare namespace game.mod.yishou {
    class YishouShoulingSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.yishou {
    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    class YishouShoulingSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _surfaceProxy;
        _showArgs: YishouShoulingConfig;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateState;
        private onClick;
    }
}
declare namespace game.mod.yishou {
    class YishouShouyinMdr extends EffectMdrBase {
        protected _view: YishouShouyinView;
        protected _proxy: YishouProxy;
        /**二级页签类型*/
        protected _type: YishouShouyinType;
        private _listData;
        private _selIdx;
        private _selCfg;
        private _effId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateListData;
        private updateView;
        private updatePower;
        private updateCost;
        private onClickJiban;
        private onClickUpstar;
        private onClickList;
    }
    class YishouShouyinMdr2 extends YishouShouyinMdr {
        protected _type: YishouShouyinType;
    }
    class YishouShouyinMdr3 extends YishouShouyinMdr {
        protected _type: YishouShouyinType;
    }
}
declare namespace game.mod.yishou {
    class YishouShouyinSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
