declare namespace game.mod.xianlu {
    class XiuxianBreakItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        lab_desc: eui.Label;
        data: {
            icon: string;
            desc: string;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class XianluMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.xianlu {
    import RebirthConfig = game.config.RebirthConfig;
    import ElixirInitConfig = game.config.ElixirInitConfig;
    import attributes = msg.attributes;
    import GridConfig = game.config.GridConfig;
    import lingpool_type_data = msg.lingpool_type_data;
    import PoolConfig = game.config.PoolConfig;
    import lingpool_unit_data = msg.lingpool_unit_data;
    import lingmai_data = msg.lingmai_data;
    import LingmaiConfig = game.config.LingmaiConfig;
    import LinggenLeixingConfig = game.config.LinggenLeixingConfig;
    import LinggenConfig = game.config.LinggenConfig;
    import linggen_data = msg.linggen_data;
    class XianluProxy extends ProxyBase implements IXianluProxy {
        private _model;
        /**获取模块数据，对模块内开放*/
        readonly model: XianluModel;
        initialize(): void;
        onStartReconnect(): void;
        private s2c_xianlu_reinc_info;
        c2s_xianlu_reinc_levelup(): void;
        c2s_xianlu_reinc_getreward(): void;
        getEndTime(): number;
        /**修仙是否可以飞升*/
        canBreak(): boolean;
        /**修仙是否还有下一转*/
        getNextCfg(): RebirthConfig;
        /**修仙当前最大重数*/
        getMaxChongLv(): number;
        c2s_xian_dan_use_pill(index: number): void;
        private s2c_xian_dan_all_info;
        private getPillPos;
        /**仙丹使用数量*/
        getPillUseCnt(index: number): number;
        /**仙丹最大使用数量*/
        getPillMaxUseCnt(cfg: ElixirInitConfig, nextIndex?: number): number;
        private getLimitLv;
        private calcMaxCnt;
        private getLimitNum;
        getPillCfgList(type: number): ElixirInitConfig[];
        isPillOpen(cfg: ElixirInitConfig): boolean;
        canPillUse(cfg: ElixirInitConfig): boolean;
        getPillAttrByType(type: number): attributes;
        getPillAgeByType(type: number): number;
        /**isMin：取不到buff时是否显示最小buff*/
        getBuffIndex(type: number, age: number): number;
        /**取下一阶修为和buff的index*/
        getNextAgeIndex(type: number): number;
        /**更新红点*/
        updatePillHint(): void;
        c2s_lingpool_time_reward(): void;
        c2s_lingpool_levelup(type: number): void;
        c2s_lingpool_add_unit(type: number, index: number): void;
        c2s_lingpool_onekey_unit(type: number): void;
        private s2c_lingpool_data_info;
        private getPoolPos;
        isPoolOpen(cfg: GridConfig): boolean;
        /**灵池格子是否开启*/
        isPoolGridOpen(index: number): boolean;
        getPoolInfo(type: number): lingpool_type_data;
        getPoolGridInfos(type: number): lingpool_unit_data[];
        getPoolGridIndex(type: number, pos: number): number;
        /**收益加成，出战神灵品质计算）,万分比，index神灵index*/
        getShenlingAdd(index: number): number;
        /**单个灵池总的收益加成，根据出战神灵品质计算）,万分比*/
        calcPoolAdd(info: lingpool_type_data): number;
        /**计算神灵加成*/
        calcShenlingAdd(info: lingpool_type_data): number;
        /**单次收获*/
        /**实际神灵精华获取数量 = 产出材料基础数据_output * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch + buff提升）*/
        calcPoolPerGain(info: lingpool_type_data): number;
        /**计算单个灵池总收获*/
        calcPoolAllGain(info: lingpool_type_data): number;
        getPoolCfg(type: number, lv: number): PoolConfig;
        poolType: number;
        battleView: boolean;
        /**获取当前可以出战的神灵列表，withoutType：去掉当前已经派遣的神灵*/
        getShenlingList(type: number, withoutType?: boolean): number[];
        isBattle(type: number, index: number): boolean;
        private updatePoolHint;
        private updatePoolRewardHint;
        /**获取灵池下次最小收益时间*/
        private getPoolMinNextTime;
        /**道具变更时需要刷新*/
        updatePoolUpHint(): void;
        canPoolUp(info: lingpool_type_data): boolean;
        /**神灵变更时需要刷新*/
        updatePoolBattleHint(): void;
        canPoolBattle(info: lingpool_type_data): boolean;
        canPoolGridBattle(type: number, pos: number): boolean;
        private checkBestShenling;
        checkBestShenlingByIndex(type: number, gridIndex: number): boolean;
        getPoolHint(info: lingpool_type_data): boolean;
        c2s_lingmai_levelup(type: number): void;
        private s2c_lingmai_data_info;
        private getLingmaiPos;
        getLingmaiInfo(type: number): lingmai_data;
        /**总战力*/
        getLingmaiPower(): Long;
        /**单个灵脉战力，需要计算突破属性*/
        getLingmaiPerPower(info: lingmai_data): Long;
        /**灵脉达到最大重数*/
        isLingmaiMax(info: lingmai_data): boolean;
        updateLingmaiHint(): void;
        canLingmaiUp(cfg: LingmaiConfig): boolean;
        c2s_linggen_levelup(index: number): void;
        private s2c_linggen_data_info;
        private getLinggenPos;
        getLinggenInfo(index: number): linggen_data;
        isLinggenTypeOpen(cfg: LinggenLeixingConfig, showTips?: boolean): boolean;
        isLinggenOpen(cfg: LinggenConfig): boolean;
        getLinggenCfgList(type: number): LinggenConfig[];
        getLinggenHint(cfg: LinggenConfig): boolean;
        getLinggenTypeHint(cfg: LinggenLeixingConfig): boolean;
        private updateLinggenHint;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        protected onBagUpdateByPropType(n: base.GameNT): void;
        protected onTaskHint(n: base.GameNT): void;
        protected onTaskUpdate(n: base.GameNT): void;
        protected onRoleUpdate(n: base.GameNT): void;
        readonly xianpolevel: number;
        readonly xianpoattr: attributes;
    }
}
declare namespace game.mod.xianlu {
    class LingchiBattleView extends eui.Component {
        grp_add: eui.Group;
        lab_desc1: eui.Label;
        list_item1: eui.List;
        lab_desc2: eui.Label;
        list_item2: eui.List;
        btn_battle: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class LingchiDetailView extends eui.Component {
        img_type: eui.Image;
        lab_lv: eui.Label;
        lab_desc1: eui.Label;
        img_icon1: eui.Image;
        lab_add1: eui.Label;
        img_icon2: eui.Image;
        lab_add2: eui.Label;
        cost1: game.mod.CostIcon;
        cost2: game.mod.CostIcon;
        lab_desc2: eui.Label;
        list_item: eui.List;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    import GridConfig = game.config.GridConfig;
    class LingchiItemRender extends BaseListenerRenderer {
        private img_bg;
        private img_type;
        timeItem: game.mod.TimeItem;
        grp_icon: eui.Group;
        img_icon: eui.Image;
        private img_icon2;
        private lab_lv;
        private lab_cnt;
        private lab_desc;
        private grp_item;
        private list_item;
        private redPoint;
        data: GridConfig;
        private _proxy;
        private _itemList;
        private _isOpen;
        private _info;
        private _openStr;
        private _posY;
        private _iconY1;
        private _iconY2;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        updateTime(): void;
        private getPoolNextTime;
        private onClick;
        private playTween;
        removeTween(): void;
    }
}
declare namespace game.mod.xianlu {
    import lingpool_unit_data = msg.lingpool_unit_data;
    class LingchiShenlingHeadRender extends eui.ItemRenderer {
        icon: game.mod.Icon;
        data: lingpool_unit_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LingchiShenlingItemRender extends eui.ItemRenderer {
        private grp_item2;
        item: AvatarBaseItem;
        private lab_add;
        private img_add;
        private redPoint;
        private lab_lock;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LingchiShenlingSelItemRender extends eui.ItemRenderer {
        private grp_item2;
        item: AvatarBaseItem;
        private lab_add;
        private img_add;
        private redPoint;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LingchiView extends eui.Component {
        item1: LingchiItemRender;
        item2: LingchiItemRender;
        item3: LingchiItemRender;
        item4: LingchiItemRender;
        btn_draw: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    import LinggenConfig = game.config.LinggenConfig;
    class LinggenItemRender extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_sel: eui.Image;
        lab_lv: eui.Label;
        img_lock: eui.Image;
        private redPoint;
        data: LinggenConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    import LinggenLeixingConfig = game.config.LinggenLeixingConfig;
    class LinggenTabItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        redPoint: eui.Image;
        data: LinggenLeixingConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LinggenView extends eui.Component {
        lab_lv: eui.Label;
        lab_desc: eui.Label;
        lab_nextLv: eui.Label;
        lab_nextDesc: eui.Label;
        lab_limit: eui.Label;
        img_max: eui.Image;
        img_max2: eui.Image;
        m_left: eui.Image;
        m_right: eui.Image;
        item1: game.mod.xianlu.LinggenItemRender;
        itemGroup: eui.Group;
        cost: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class LingmaiBreakItemRender extends eui.ItemRenderer {
        img_tag: eui.Image;
        lab_desc: eui.Label;
        data: {
            desc: string;
            isAct: boolean;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LingmaiDetailView extends eui.Component {
        img_name: eui.Image;
        power: game.mod.Power;
        lab_desc: eui.Label;
        list_item: eui.List;
        list_limit: eui.List;
        cost: game.mod.CostIcon;
        lab_lv: eui.Label;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class LingmaiItemRender extends eui.ItemRenderer {
        img_icon: eui.Image;
        img_lock: eui.Image;
        data: {
            lv: number;
            isAct: boolean;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class LingmaiUpView extends eui.Component {
        img_name: eui.Image;
        grp_lv: eui.Group;
        power: game.mod.Power;
        img_line1: eui.Image;
        img_line2: eui.Image;
        img_line3: eui.Image;
        img_line4: eui.Image;
        img_line5: eui.Image;
        img_line6: eui.Image;
        img_line71: eui.Image;
        img_line72: eui.Image;
        img_line8: eui.Image;
        img_line9: eui.Image;
        item1: LingmaiItemRender;
        item2: LingmaiItemRender;
        item3: LingmaiItemRender;
        item4: LingmaiItemRender;
        item5: LingmaiItemRender;
        item6: LingmaiItemRender;
        item7: LingmaiItemRender;
        item8: LingmaiItemRender;
        item9: LingmaiItemRender;
        item10: LingmaiItemRender;
        lab_buff: eui.Label;
        list_attr: game.mod.AttrListView;
        cost: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class LingmaiView extends eui.Component {
        power: game.mod.Power;
        btn_icon1: game.mod.Btn;
        btn_icon2: game.mod.Btn;
        btn_icon3: game.mod.Btn;
        btn_icon4: game.mod.Btn;
        btn_icon5: game.mod.Btn;
        btn_icon6: game.mod.Btn;
        btn_icon7: game.mod.Btn;
        btn_icon8: game.mod.Btn;
        btn_icon9: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    import ElixirInitConfig = game.config.ElixirInitConfig;
    class XiandanPillRender extends IconSel {
        data: ElixirInitConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class XiandanRender extends eui.ItemRenderer {
        img_bg1: eui.Image;
        img_bg2: eui.Image;
        lab_desc: eui.Label;
        data: string;
        private _isUp;
        protected dataChanged(): void;
        isUp: boolean;
    }
}
declare namespace game.mod.xianlu {
    class XiandanTipsView extends eui.Component {
        lab_title: eui.Label;
        baseDescItem: BaseDescItem;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class XiandanView extends eui.Component {
        item1: XiandanRender;
        item2: XiandanRender;
        img_type: eui.Image;
        grp_lv: eui.Group;
        btn_change: game.mod.Btn;
        btn_desc: game.mod.Btn;
        lab_name: eui.Label;
        icon: game.mod.Icon;
        lab_tips: eui.Label;
        lab_desc: eui.Label;
        lab_attr: eui.Label;
        scr_item: eui.Scroller;
        list_item: eui.List;
        btn_last: game.mod.Btn;
        btn_next: game.mod.Btn;
        btn_use: game.mod.Btn;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    import attributes = msg.attributes;
    import xian_dan_data = msg.xian_dan_data;
    import ElixirInitConfig = game.config.ElixirInitConfig;
    import lingpool_type_data = msg.lingpool_type_data;
    import lingmai_data = msg.lingmai_data;
    import linggen_data = msg.linggen_data;
    import LinggenConfig = game.config.LinggenConfig;
    class XianluModel {
        index: number;
        xianpo_attr: attributes;
        xianpo_nextattr: attributes;
        xianpolevel: number;
        rewardindex: number;
        rewardstatus: number;
        rewardHint: string[];
        pill_list: xian_dan_data[];
        pillCfgList: {
            [type: number]: ElixirInitConfig[];
        }; /**客户端分类好的仙丹index*/
        pillHints: string[][];
        pool_list: lingpool_type_data[];
        poolType: number;
        battleView: boolean;
        poolRewardHint: string[];
        poolUpHint: string[];
        poolBattleHint: string[];
        lingmai_list: lingmai_data[];
        lingmaiMaxLv: number;
        lingmaiUpHint: string[];
        linggen_list: linggen_data[];
        linggenCfgList: {
            [type: number]: LinggenConfig[];
        }; /**客户端分类好的灵根index*/
        linggenUpHint: string[];
    }
}
declare namespace game.mod.xianlu {
    class XiuxianBreakTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        lab_desc1: eui.Label;
        lab_desc2: eui.Label;
        item1: XiuxianXianpoRender;
        item2: XiuxianXianpoRender;
        grp_open: eui.Group;
        list_item: eui.List;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class XiuxianFireRender extends BaseRenderer {
        group_eft: eui.Group;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class XiuxianItemRender extends eui.ItemRenderer {
        lab_desc: eui.Label;
        data: string;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.xianlu {
    class XiuxianPreviewView extends eui.Component {
        secondPop: game.mod.SecondPop;
        grp_lv: eui.Group;
        grp_nextLv: eui.Group;
        list_item1: eui.List;
        list_item2: eui.List;
        item1: XiuxianXianpoRender;
        item2: XiuxianXianpoRender;
        lab_reward: eui.Label;
        list_reward: eui.List;
        img_draw: eui.Image;
        btn_draw: game.mod.Btn;
        btn_vip: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class XiuxianTipsView extends eui.Component {
        lab_name: eui.Label;
        baseDescItem1: BaseDescItem;
        baseDescItem2: BaseDescItem;
        lab_act: eui.Label;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class XiuxianView extends eui.Component {
        group_eft1: eui.Group;
        group_eft2: eui.Group;
        lab_name: eui.Label;
        list_item: eui.List;
        grp_lv: eui.Group;
        list_task: eui.List;
        btn_preview: game.mod.Btn;
        btn_gift: game.mod.Btn;
        btn_gift1: game.mod.Btn;
        btn_gift2: game.mod.BtnIconBase;
        btn_war: game.mod.Btn;
        btn_xianpo: game.mod.Btn;
        btn_break: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.xianlu {
    class XiuxianXianpoRender extends BaseListenerRenderer {
        btn_xianpo: game.mod.Btn;
        lab_lv: eui.Label;
        data: number;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        setData(lv: number): void;
    }
}
declare namespace game.mod.xianlu {
    class XianluMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.xianlu {
    class LingchiBattleMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList1;
        private _itemList2;
        _showArgs: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBattle;
        private onInfoUpdate;
        private updateView;
        private updateItemList1;
        private updateItemList2;
        private onClickItem;
    }
}
declare namespace game.mod.xianlu {
    class LingchiDetailMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        _showArgs: number;
        private _info;
        private _cost1;
        private _cost2;
        private _imgIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onClickItem;
        private onClickImg;
        private onInfoUpdate;
        private updateView;
        private updateItemList;
    }
}
declare namespace game.mod.xianlu {
    import UpdateItem = base.UpdateItem;
    class LingchiMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _posInfos;
        private _rewardList;
        private _iconList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDraw;
        private onInfoUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updatePoolList;
        update(time: base.Time): void;
        private updateTime;
        /** 更新红点 */
        private updateHint;
        private updateRewardHint;
        private playTween;
        private removeTween;
        private playRewardTween;
        private clearPerIcon;
        private clearIcon;
    }
}
declare namespace game.mod.xianlu {
    class LinggenMdr extends MdrBase {
        private _view;
        private _proxy;
        private _btnList;
        private _itemList;
        private _selType; /**当前选中的灵根类型*/
        private _selIndex; /**当前选中的灵根下标*/
        private _selCfg; /**当前选中的灵根配置*/
        private _cfgList;
        private _cost;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onClickIcon;
        private onInfoUpdate;
        private onClickType;
        private initTypeList;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateItemList;
        private indexUpdateInfo;
        private updateItemSel;
        private updateDesc;
    }
}
declare namespace game.mod.xianlu {
    import LingmaiConfig = game.config.LingmaiConfig;
    class LingmaiDetailMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _limitList;
        _showArgs: LingmaiConfig;
        private _info;
        private _isAct;
        private _isActLast;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onInfoUpdate;
        private updateInfo;
        private updateView;
        private updatePower;
        private updateItemList;
        private updateLimitList;
    }
}
declare namespace game.mod.xianlu {
    class LingmaiMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cfgList;
        private _btnList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickIcon;
        private onInfoUpdate;
        private initCfgList;
        private updateIconList;
        private updatePower;
    }
}
declare namespace game.mod.xianlu {
    import LingmaiConfig = game.config.LingmaiConfig;
    class LingmaiUpMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        _showArgs: LingmaiConfig;
        private _info;
        private _isBreak;
        private _cost;
        private _itemList;
        private _lineList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onInfoUpdate;
        private updateView;
        private updatePower;
        private updateUp;
        private updateItemList;
    }
}
declare namespace game.mod.xianlu {
    class XiandanMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _selType; /**当前选中的丹药类型*/
        private _selIndex; /**当前选中的丹药下标*/
        private _selCfg; /**当前选中的丹药配置*/
        private _posInfo1;
        private _posInfo2;
        private _isChanging;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDesc;
        private onClickUse;
        private onClickType;
        private onClickItem;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private initTypeList;
        private typeUpdateInfo;
        private updateItemList;
        private updateDesc;
        updateBuff(): void;
        private indexUpdateInfo;
        private updateCnt;
        private updateAttr;
        /** 滚动 */
        private onScrollMove;
        /** 滚动 */
        private move;
        /** 显示左右按钮 */
        private refreshPos;
        private initPosInfo;
        private resetItemPos;
        private onClickChange;
    }
}
declare namespace game.mod.xianlu {
    class XiandanTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: number; /**仙丹类型*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.xianlu {
    import attributes = msg.attributes;
    class XiuxianBreakTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _cfg1;
        private _cfg2;
        private _xianpoAttr1;
        protected _showArgs: {
            lastIndex: number;
            lastLv: number;
            lastXianpoAttr: attributes;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private updateAttr;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showOpenTween;
        private removeOpenTween;
        private showItemTween;
        private removeItemTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod.xianlu {
    import UpdateItem = base.UpdateItem;
    class XiuxianMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _proxy2;
        private _itemList;
        private _taskList;
        private _effId_break;
        private _effId_xianpo;
        protected _endTime: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected isShowIcon(): void;
        protected onUpdateTime(): void;
        update(time: base.Time): void;
        protected onHide(): void;
        private initShow;
        private onClickPreview;
        private onClickGift1;
        private onClickGift2;
        private onClickWar;
        private onClickXianpo;
        private onClickBreak;
        private onClickJinji;
        private onClickLibao;
        private onTaskUpdate;
        private onInfoUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateTaskList;
        private updateInfo;
        private updateBreak;
        /** 更新红点 */
        private updateHint;
        private updateRewardHint;
    }
}
declare namespace game.mod.xianlu {
    class XiuxianPreviewMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList1;
        private _itemList2;
        private _rewardList;
        private _nextIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickVip;
        private onClickDraw;
        private updateView;
        private updateReward;
    }
}
declare namespace game.mod.xianlu {
    class XiuxianTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: number; /**仙魄等级*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
