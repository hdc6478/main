declare namespace game.mod.xianfa {
    class XianfaStudyTipView extends eui.Component {
        img_quality_bg: eui.Image;
        skill: XianfaItem;
        lab_skill_name: eui.Label;
        star: game.mod.StarListView;
        lab_lv: eui.Label;
        star_big0: eui.Image;
        star_big1: eui.Image;
        star_big2: eui.Image;
        star_big3: eui.Image;
        star_big4: eui.Image;
        lab_attr1: eui.Label;
        lab_attr2: eui.Label;
        lab_desc: eui.Label;
        lab_condition: eui.Label;
        icon_cost: game.mod.Icon;
        btn_study: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianfa {
    class XianfaMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.xianfa {
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import skill_item = msg.skill_item;
    class XianfaProxy extends ProxyBase implements IXianfaProxy {
        private _model;
        skills: number[];
        getModel(): XianfaModel;
        initialize(): void;
        protected onRoleUpdate(n: base.GameNT): void;
        protected onBagUpdateByBagType(n: base.GameNT): void;
        /**
         * 仙法信息
         * @param {number} type 1-仙法
         */
        private s2c_normalskill_info;
        /**
         * 仙法升级等
         * @param type 1仙法
         * @param oper 1:单次 2:一键（一键不用传index）
         * @param operType 操作类型 1升级，2升星，3精研，4激活
         * @param index 技能编号
         * @return
         */
        c2s_skill_levelup(type: XianfaType, oper: number, operType: number, index?: number): void;
        /**
         * 仙法穿戴
         * @param type 1仙法
         * @param operType 操作类型 1:单次 2:一键（一键不用传index、pos）
         * @param pos 装配到的位置，从1开始
         * @param index 技能编号
         * @return
         */
        c2s_skill_takeon(type: XianfaType, operType: number, pos?: number, index?: number): void;
        /**
         * 仙法卸下
         * @param type 1仙法
         * @param pos 装配到的位置，从1开始
         * @return
         */
        c2s_skill_takeoff(type: XianfaType, pos: number): void;
        /**
         * 操作成功返回
         * @return
         */
        private s2c_normalskill_ok;
        /**
         * 仙法入口、标签页红点
         * @returns
         */
        updateXianfaHint(): void;
        private updateOneKeyWearHint;
        /**
         * 一键穿戴红点
         * @returns
         */
        getOneKeyWearHint(): boolean;
        /**
         * 一键升级红点
         * @returns
         */
        updateOneKeyUpgradeHint(): boolean;
        /**
         * 单个激活红点，仙法是自动激活，无需红点
         * @returns
         */
        /**
         * 仙法列表的单个仙法红点
         * @returns
         */
        updateListItemHint(id: number): boolean;
        /**
         * 单个升级红点
         * @returns
         */
        updateUpgradeHint(id: number): boolean;
        /**
         * 单个升星红点
         * @returns
         */
        updateUpStarHint(id: number): boolean;
        /**
         * 单个精研红点
         * @returns
         */
        updateStudyHint(id: number): boolean;
        readonly posSkills: number[];
    }
    interface IXianfaSkillData {
        cfg: XianfaSkillInitConfig;
        info: skill_item;
        star?: number;
        sort?: number;
    }
}
declare namespace game.mod.xianfa {
    class XianfaActiveTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_type: eui.Group;
        skill: XianfaItem;
        power: game.mod.Power;
        constructor();
    }
}
declare namespace game.mod.xianfa {
    import skill_item = msg.skill_item;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    class XianfaItem extends eui.Component {
        img_quality_bg: eui.Image;
        img_skill: eui.Image;
        img_is_wear: eui.Image;
        img_buff: eui.Image;
        grp_eff: eui.Group;
        img_add: eui.Image;
        redPoint: eui.Image;
        lab_lv: eui.Label;
        lab_name: eui.Label;
        private _proxy;
        private _model;
        pos: number;
        data: IXianfaSkillData;
        constructor();
        /**
         * @param value 0-add，1-normal，2-normal2，3-normal3，4-normal4
         */
        setData(cfg: XianfaSkillInitConfig, info: skill_item, state?: number): void;
        private state;
        readonly isWear: boolean;
    }
}
declare namespace game.mod.xianfa {
    class XianfaSkillItem extends BaseListenerRenderer {
        img_quality_bg: eui.Image;
        img_is_wear: eui.Image;
        img_buff: eui.Image;
        img_skill: eui.Image;
        lab_lv: eui.Label;
        lab_name: eui.Label;
        star: game.mod.StarListView;
        lab_jump: eui.Label;
        redPoint: eui.Image;
        data: IXianfaSkillData;
        private _proxy;
        private _model;
        constructor();
        protected onAddToStage(): void;
        setData(d: IXianfaSkillData): void;
        protected dataChanged(): void;
        readonly isActive: boolean;
        private onClick;
    }
}
declare namespace game.mod.xianfa {
    class XianfaSkillTipView extends eui.Component {
        lab_name: eui.Label;
        power: game.mod.Power;
        star: game.mod.StarListView;
        grp_role_eff: eui.Group;
        grp_role_skill_eff: eui.Group;
        btn_play: game.mod.Btn;
        btn_wear: game.mod.Btn;
        btn_study: game.mod.Btn;
        skill: XianfaItem;
        lab_desc: eui.Label;
        icon_cost: game.mod.Icon;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianfa {
    import skill_item = msg.skill_item;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import XianfaSkillLevelConfig = game.config.XianfaSkillLevelConfig;
    import XianfaSkillCultivateConfig = game.config.XianfaSkillCultivateConfig;
    import SkillShowConfig = game.config.SkillShowConfig;
    class XianfaModel {
        /**
         * 所有已激活的仙法信息
         */
        private _infos;
        private _posSkills;
        private _allXianfaCfg;
        private _showXianfaIds;
        private _showXianfaIdArrs;
        xianfaHint: string[];
        oneKeyUpgradeHint: string[];
        oneKeyWearHint: string[];
        isInUpStar: boolean;
        oper: number;
        updateInfos(value: skill_item[], flag?: boolean): void;
        posSkills: number[];
        /**
         * 所有已激活的仙法
         * @returns
         */
        getAllInfos(): {
            [id: string]: skill_item;
        };
        /**
         * 所有已穿戴的仙法
         * @returns
         */
        getAllWearInfos(): skill_item[];
        /**
         * 取指定仙法信息（只含已激活的）
         * @param id
         * @returns null-未激活
         */
        getInfo(id: number): skill_item;
        /**
         * 取指定仙法信息
         * @param type
         * @returns null-未激活
         */
        getInfoByType(type: number): skill_item;
        /**
         * 取槽位的仙法信息
         * @param pos 槽位，1~6
         * @returns
         */
        getPosInfo(pos: number): skill_item;
        isWear(id: number): boolean;
        getWearPos(id: number): number;
        readonly totalPower: number;
        /**
         * 取仙法的星级
         * @param id
         * @returns
         */
        getStarCnt(id: number): number;
        private setCfgs;
        readonly showXianfaIds: number[];
        getXianfaCfg(id: number): XianfaSkillInitConfig;
        getXianfaLevelCfg(xianfaLv: number): XianfaSkillLevelConfig;
        getXianfaCultivateCfg(studyLv: number): XianfaSkillCultivateConfig;
        getSkillShowCfg(id: number): SkillShowConfig;
        getXianfaShortName(cfg: XianfaSkillInitConfig): string;
        /**
         * 升级消耗
         * @param xianfaLv 待升级到的等级
         * @param quality 品质，1-4
         * @returns
         */
        getUpgradeCost(xianfaLv: number, quality: number): number[];
        /**
         * 升星消耗
         * @param id
         * @returns
         */
        getUpStarCost(id: number): number[];
        /**
         * 精研消耗
         * @param studyLv
         * @returns
         */
        getStudyCost(studyLv: number): number[];
        /**
         * 等级属性
         * @param xianfaLv
         * @param quality 品质，1-4
         * @returns
         */
        getLevelAttr(xianfaLv: number, quality: number): number;
        /**
         * 取最近的经验效果对应的精研配置
         * @param studyLv
         * @returns
         */
        getStudyEffCfg(studyLv: number): XianfaSkillCultivateConfig;
        isMaxLv(id: number, lv: number): boolean;
        isMaxStar(id: number): boolean;
        isMaxStudy(id: number): boolean;
    }
}
declare namespace game.mod.xianfa {
    class XianfaView extends eui.Component {
        power: game.mod.Power;
        btn_skill0: game.mod.xianfa.XianfaItem;
        btn_skill1: game.mod.xianfa.XianfaItem;
        btn_skill2: game.mod.xianfa.XianfaItem;
        btn_skill3: game.mod.xianfa.XianfaItem;
        btn_skill4: game.mod.xianfa.XianfaItem;
        btn_skill5: game.mod.xianfa.XianfaItem;
        btn_wear_one_key: game.mod.Btn;
        btn_upgrade_one_key: game.mod.Btn;
        cost: game.mod.CostIcon;
        list_skill: eui.List;
        constructor();
    }
}
declare namespace game.mod.xianfa {
    class XianfaMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianfa {
    class XianfaActiveTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _model;
        private _info;
        private _cfg;
        private _isPlayed;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClick;
        private updateShow;
        private showTypeTween;
        private removeTypeTween;
        private showBgTween;
        private removeBgTween;
        private playIconFly;
    }
}
declare namespace game.mod.xianfa {
    class XianfaMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _model;
        private _listData;
        private _propData;
        private _isCanWear;
        private _isCanUpgrade;
        private _cost;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private onRoleUpdate;
        private updateCost;
        private updateItem;
        private updateList;
        private onHintUpdate;
        private updateHint;
        private onClickItem;
        private onWearOneKey;
        private onUpgradeOneKey;
        private showGuide;
    }
}
declare namespace game.mod.xianfa {
    class XianfaSkillTipMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _model;
        private _id;
        private _cfg;
        private _info;
        private _cost;
        /**
         * 穿戴状态，0-可穿戴，1-可卸下
         */
        private _wearState;
        /**
         * 升级或升星状态，0-可激活，1-可升级，2-可升星
         */
        private _upState;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private onRoleUpdate;
        private updateRole;
        private updateHint;
        private onClickPlay;
        private onClickWear;
        private onClickStudy;
        private onClickUp;
    }
}
declare namespace game.mod.xianfa {
    class XianfaStudyTipMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _id;
        private _cfg;
        private _info;
        private _cost;
        private _lvReached;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private onRoleUpdate;
        private updateHint;
        private onClickStudy;
    }
}
