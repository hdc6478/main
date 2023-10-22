declare namespace game.mod.enhance {
    import attributes = msg.attributes;
    class StrengthMasterRender extends BaseRenderer {
        lab_title: eui.Label;
        lab_limit: eui.Label;
        lab_attr: eui.Label;
        data: {
            isCur: boolean;
            masterLv: number;
            attr: attributes;
            reachTitle: string;
            curReachCnt: number;
            needReachCnt: number;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.enhance {
    class EnhanceMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.enhance {
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    import gem_data = msg.gem_data;
    import equip_strength_data = msg.equip_strength_data;
    import equip_advanced_data = msg.equip_advanced_data;
    import advanced_master_data = msg.advanced_master_data;
    class EnhanceProxy extends ProxyBase implements IEnhanceProxy {
        private _model;
        /** 宝石属性*/
        private _gemAttrIdx;
        private _isInset;
        getModel(): EnhanceModel;
        initialize(): void;
        protected onBagUpdateByBagType(n: base.GameNT): void;
        /**更新强化和大师*/
        s2c_equip_online_strength_request(n: GameNT): void;
        /** 计算强化总等级、强化战力、大师战力*/
        private setStrengthOther;
        /** 强化更新*/
        private s2c_equip_update_strength;
        /**
         * 装备强化
         * @param type 1-强化，2-一键强化
         */
        c2s_equip_strength(type: 1 | 2, pos?: number): void;
        /** 大师升阶*/
        c2s_equip_strength_master(): void;
        /** 强化大师*/
        private s2c_equip_strength_master;
        private s2c_equip_online_gem_request;
        /**
         * 宝石升级、镶嵌
         * @param {number} type 1一键升级，2一键镶嵌
         * @param {number} _equip 装备部位
         */
        c2s_equip_operate_gem(type: number, eqType: number): void;
        private s2c_equip_update_gem;
        /** 是否为镶嵌操作 */
        private isInset1;
        /** 宝石镶嵌*/
        c2s_equip_gem_takeon(eqType: number, gemType: number, gemId: Long): void;
        /** 宝石拆除*/
        c2s_equip_gem_takeoff(eqPos: number, gemType: number): void;
        /**
         *  宝石合成
         * @param {number} 1:合成 2:单类型一键合成 3:所有一键合成
         */
        c2s_equip_gem_combine(eqPos: number, gemType: number, idx: number, type: number): void;
        private c2s_equip_gem_attrs;
        private s2c_equip_gem_attrs;
        getGemAttr(idx: number): attributes;
        /**宝石大师升阶*/
        c2s_equip_gem_master(): void;
        private s2c_equip_gem_master;
        /**宝石总战力和等级*/
        private updateGemPowerAndLv;
        /**判断是否满级宝石 */
        checkGemMax(index: number): boolean;
        /**更新进阶和大师*/
        s2c_equip_online_advanced_request(n: GameNT): void;
        /** 计算进阶总等级、进阶战力、大师战力*/
        private setAdvancedOther;
        /**
         * 装备进阶
         */
        c2s_equip_advanced(pos: number): void;
        /** 进阶更新*/
        private s2c_equip_update_advanced;
        /** 大师进阶*/
        c2s_equip_advanced_master(): void;
        /** 进阶大师*/
        private s2c_equip_advanced_master;
        /**
         * 强化入口、标签页红点
         * @returns
         */
        updateHint(): void;
        /**
         * 一键强化红点
         * @returns
         */
        updateStrengthOneKeyBtnHint(): boolean;
        /**
         * 强化大师红点
         * @returns
         */
        updateStrengthMasterBtnHint(): boolean;
        checkEquipGemHint(pos: number): boolean;
        checkGemPosHint(equipData: PropData, gem: gem_data, eqPos: number, gemPos: number): boolean;
        gemSettledHint(holeGem: gem_data, bagGem: PropData): boolean;
        checkGemAKeySynHint(props: PropData[], type?: number): boolean;
        /**
         * 一键镶嵌宝石红点
         */
        gemOneKeyInlayHint(): boolean;
        /**
         * 单个宝石合成红点
         * @param gem
         * @returns
         */
        checkGemSynHint(gem: PropData): boolean;
        checkGemMasterHint(): boolean;
        /**
         * 进阶按钮红点（判断全部格子）
         * @returns
         */
        updateAdvanceBtnHint(): boolean;
        /**
         * 指定格子的进阶按钮红点
         * @param pos 装备位置
         * @returns
         */
        updateAdvanceHintByPos(pos: number): boolean;
        /**
         * 进阶大师红点
         * @returns
         */
        updateAdvanceMasterBtnHint(): boolean;
        /**
         * 取强化的等级表id
         * @param strengthLv
         * @returns
         */
        getStrengthLvId(strengthLv: number): number;
        /**
         * 取进阶的等级表id
         * @param advancedLv
         * @returns
         */
        getAdvancedLvId(advancedLv: number): number;
        /**
         * 取强化大师的等级表id
         * @param strengthMasterLv
         * @returns
         */
        getStrengthMasterLvId(strengthMasterLv: number): number;
        /**
         * 取宝石大师的等级表id
         * @param gemMasterLv
         * @returns
         */
        getGemMasterLvId(gemMasterLv: number): number;
        /**
         * 取进阶大师的等级表id
         * @param advancedMasterLv
         * @returns
         */
        getAdvancedMasterLvId(advancedMasterLv: number): number;
        /**
         * 取宝石类型
         * @param id 宝石id
         * @returns
         */
        getGemType(id: number): number;
        /**
         * 取某类型的宝石
         * @param type
         * @returns
         */
        getGemsByType(type: PropSubType4): PropData[];
        /**
         * 装备位置转 list 索引
         * @param pos
         * @returns
         */
        getListIdxByPos(pos: number): number;
        /**
         * 装备 list 索引转位置
         * @param idx
         * @returns
         */
        getPosByListIdx(idx: number): number;
        /**
         * 根据部位获取强化信息
         * @param pos
         */
        getStrengthInfo(pos: number): equip_strength_data;
        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns
         */
        getGemInfo(pos: number): gem_data[];
        /**
         * 进阶大师属性（套装属性）
         */
        getAdvancedMaster(): advanced_master_data;
    }
    interface IStrengthGridData {
        pos: number;
        equip: PropData;
        info: equip_strength_data;
    }
    interface IGemGridData {
        pos: number;
        equip: PropData;
        info: gem_data[];
    }
    interface IAdvancedGridData {
        pos: number;
        equip: PropData;
        info: equip_advanced_data;
        hint: boolean;
    }
    interface IMasterData {
        isCur: boolean;
        masterLv: number;
        attr: attributes;
        reachTitle: string;
        curReachCnt: number;
        needReachCnt: number;
    }
}
declare namespace game.mod.enhance {
    class AdvancedView extends eui.Component {
        list_equip: eui.List;
        btn_master: game.mod.Btn;
        lab_suit_name: eui.Label;
        lab_attr: eui.Label;
        lab_pos_name: eui.Label;
        power: game.mod.Power;
        img_max: eui.Image;
        img_attrPreview: eui.Image;
        gr_max: eui.Group;
        gr_prop: eui.Group;
        eqp_cur: StrengthEquipIcon;
        eqp_next: StrengthEquipIcon;
        lab_eqp_cur: eui.Label;
        lab_eqp_next: eui.Label;
        cost: game.mod.CostIcon;
        btn_advanced: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.enhance {
    class GemAttrInfoView extends eui.Component {
        secondPop: game.mod.SecondPop;
        power: game.mod.Power;
        list_gemAttr: eui.List;
        constructor();
    }
}
declare namespace game.mod.enhance {
    class GemBtnItem extends BaseRenderer {
        img_add: eui.Image;
        icon_txt: eui.Image;
        iconDisplay: eui.Image;
        redPoint: eui.Image;
        gr_eff: eui.Group;
        private _pos;
        private effId;
        constructor();
        setEffect(effStr: string): void;
        removePosEff(): void;
        pos: number;
        txtIcon: string;
    }
}
declare namespace game.mod.enhance {
    class GemMasterView extends eui.Component {
        secondPop: game.mod.SecondPop;
        power: game.mod.Power;
        img_icon: eui.Image;
        img_icon2: eui.Image;
        lab_title: eui.Label;
        lab_tip: eui.Label;
        btn_use: game.mod.Btn;
        list_attr: eui.List;
        img_max: eui.Image;
        constructor();
        isAdvance: boolean;
    }
}
declare namespace game.mod.enhance {
    class GemSynRender extends IconSel {
        data: PropData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.enhance {
    class GemSynView extends eui.Component {
        secondPop: game.mod.SecondPop;
        icon_tar: game.mod.Icon;
        lab_des: eui.Label;
        btn_off: game.mod.Btn;
        btn_merge: game.mod.Btn;
        btn_one_key_merge: game.mod.Btn;
        lab_tip: eui.Label;
        list_bag: eui.List;
        lab_name: eui.Label;
        constructor();
    }
}
declare namespace game.mod.enhance {
    class GemView extends eui.Component {
        equip_list: game.mod.EquipListView;
        power: game.mod.Power;
        btn_gem2: game.mod.enhance.GemBtnItem;
        btn_gem3: game.mod.enhance.GemBtnItem;
        btn_gem0: game.mod.enhance.GemBtnItem;
        btn_gem1: game.mod.enhance.GemBtnItem;
        icon_gem: game.mod.Icon;
        btn_attr: game.mod.Btn;
        btn_master: game.mod.Btn;
        btn_merge: game.mod.Btn;
        btn_inlay: game.mod.Btn;
        btn_get: game.mod.Btn;
        pro_rate: ProgressBarComp;
        lab_pro: eui.Label;
        lab_step: eui.Label;
        constructor();
    }
}
declare namespace game.mod.enhance {
    class StrengthEquipIcon extends IconSel {
        private _proxy;
        private _model;
        private _pos;
        private _nameImg;
        private _grp;
        private _eft;
        private _isEqpListIcon;
        private _lv;
        readonly pos: number;
        protected dataChanged(): void;
        select(b: boolean): void;
        /**
         * 暂时用 nameUrl2 代替
         */
        nameUrl: string;
        nameUrl2: number;
        hint: boolean;
        isEqpListIcon: boolean;
        readonly lv: number;
    }
}
declare namespace game.mod.enhance {
    import gem_master_data = msg.gem_master_data;
    import attributes = msg.attributes;
    import gem_data = msg.gem_data;
    import equip_strength_data = msg.equip_strength_data;
    import equip_advanced_data = msg.equip_advanced_data;
    import strength_master_data = msg.strength_master_data;
    import advanced_master_data = msg.advanced_master_data;
    import LevelConfig = game.config.LevelConfig;
    class EnhanceModel {
        curEqpItem: StrengthEquipIcon;
        lastPos: number;
        private _curStrengthPos;
        strengthInfos: equip_strength_data[];
        strengthMaster: strength_master_data;
        strengthMinLv: number;
        strengthMasterReachCnt: number;
        strengthPower: Long;
        strengthMasterPower: Long;
        curGemPos: number;
        gemInfos: {
            [pos: string]: gem_data[];
        };
        gemMaster: gem_master_data;
        gemAttrs: {
            [_idx: number]: attributes;
        };
        gemMasterPower: Long;
        gemPower: Long;
        gemTotalLv: number;
        private _curAdvancedPos;
        advancedInfos: equip_advanced_data[];
        advancedMaster: advanced_master_data;
        advancedMinLv: number;
        advancedMasterReachCnt: number;
        advancedPower: Long;
        advancedMasterPower: Long;
        StrengthHint: string[];
        GemHint: string[];
        AdvancedHint: string[];
        AdvancedMasterBtnHint: string[];
        curStrengthPos: number;
        /**
         * 当前点击的宝石槽位的镶嵌的宝石id
         * @param eqpPos
         * @param gemPos
         * @returns
         */
        getCurGemId(eqpPos: number, gemPos: number): number;
        curAdvancedPos: number;
        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns
         */
        getGemInfo(pos: number): gem_data[];
        /**
         * 宝石孔位已镶嵌的宝石数据
         * @param pos 装备部位，0~9
         * @param gemPos 宝石孔位，0~3
         * @return 没有穿戴时为null
         */
        getGemHoleInfo(pos: number, gemPos: number): gem_data;
        /**
         * 取强化信息
         * @param pos 部位
         * @returns
         */
        getStrengthInfo(pos: number): equip_strength_data;
        /**
         * 取强化数据索引
         * @param equipType
         * @returns
         */
        getStrengthInfoIdx(equipType: number): number;
        /**
         * 取进阶信息
         * @param pos 部位
         * @returns
         */
        getAdvancedInfo(pos: number): equip_advanced_data;
        /**
         * 取进阶数据索引
         * @param equipType
         * @returns
         */
        getAdvancedInfoIdx(equipType: number): number;
        isStrengthMasterMaxLv(): boolean;
        isGemMasterMaxLv(): boolean;
        isAdvancedMasterMaxLv(): boolean;
        /**
         * 取等级表配置
         * @param lvId 等级表id
         * @returns
         */
        getLvCfg(lvId: number): LevelConfig;
    }
}
declare namespace game.mod.enhance {
    class StrengthView extends eui.Component {
        equip_list: game.mod.EquipListView;
        btn_master: game.mod.Btn;
        lab_rate: eui.Label;
        power: game.mod.Power;
        img_max: eui.Image;
        img_attrPreview: eui.Image;
        lab_attr1: eui.Label;
        lab_attr2: eui.Label;
        lab_tip: eui.Label;
        gr_prop: eui.Group;
        cost: game.mod.CostIcon;
        btn_strength: game.mod.Btn;
        btn_one_key: game.mod.Btn;
        group_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.enhance {
    class EnhanceMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.enhance {
    class AdvancedMasterMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 初始化数据*/
        private initMaster;
        /** 升阶*/
        private onClickAdvancedUse;
    }
}
declare namespace game.mod.enhance {
    import UpdateItem = base.UpdateItem;
    class AdvancedMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        private _equipProxy;
        private _costs;
        private _listData;
        private _oldItem;
        private _operating;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 更新强化*/
        private onUpdateInfo;
        update(time: base.Time): void;
        /** 更新大师*/
        private onUpdateMaster;
        /** 更新需要强化部位*/
        private updateCurrentInfo;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private onClickList;
        private onClickedAdvanced;
        private onClickMaster;
    }
}
declare namespace game.mod.enhance {
    class GemAttrInfoMdr extends MdrBase {
        private _view;
        private _listAttr;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.enhance {
    class GemMasterMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGemUse;
        private updateGemMstAttr;
    }
}
declare namespace game.mod.enhance {
    import UpdateItem = base.UpdateItem;
    class GemMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        private _equipProxy;
        private _tmpPos;
        private _allGemLv;
        private isInInlay;
        private _gemList;
        private _equipPos;
        private _showTips;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private updateGemInfo;
        update(time: base.Time): void;
        /**
         * 镶嵌操作
         * @param pos
         * @returns
         */
        private inlayGem;
        private updateGemPower;
        private updateCurrentInfo;
        private updateEquipGemHint;
        private inlaySuc;
        private mergeSuc;
        private onClickList;
        /**
         * 宝石属性
         */
        private onClickAttr;
        /**
         * 宝石大师
         */
        private onClickGemMaster;
        private onClickGem;
        private onClickGet;
        private onClickMerge;
        private onClickInlay;
    }
}
declare namespace game.mod.enhance {
    class GemSynMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _bagList;
        private _curBagPos;
        private _isCanMergeOneKey;
        protected _showArgs: {
            eqPos: number;
            gemPos: number;
        };
        private _settedGem;
        private _curWearGemId;
        private _selectIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateGemBag;
        private sortGemBagList;
        private updateCurSelect;
        private updateGemAttrShow;
        private updateCurAttr;
        private onUpdateBag;
        private onClickOff;
        private onClickMerge;
        private onClickOneKeyMerge;
        private onClickGem;
    }
}
declare namespace game.mod.enhance {
    class StrengthMasterMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 初始化数据*/
        private initMaster;
        /**
         * 升阶按钮红点
         * @returns
         */
        updateBtnHint(): void;
        /** 升阶*/
        private onClickStrengthUse;
    }
}
declare namespace game.mod.enhance {
    import LevelConfig = game.config.LevelConfig;
    class StrengthMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _model;
        private _equipProxy;
        private _costs;
        private _lvs;
        private _operating;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 更新强化*/
        private onUpdateInfo;
        /** 更新大师*/
        private onUpdateMaster;
        /** 更新需要强化部位*/
        private updateCurrentInfo;
        private getMinLvIdx;
        private getInitPos;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /**
         * 强化按钮红点
         * @returns
         */
        updateStrengthBtnHint(pos: number, cfg: LevelConfig, isMax: boolean): void;
        /**
         * 一键强化按钮红点
         * @returns
         */
        updateOneKeyBtnHint(): void;
        /**
         * 大师强化按钮红点
         * @returns
         */
        updateMasterBtnHint(): void;
        private onClickList;
        private onceStrength;
        private oneKeyStrength;
        private onClickMaster;
    }
}
