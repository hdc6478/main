declare namespace game.mod.bag {
    class BagBaseMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _selType; /**当前选中的背包类型*/
        protected typeList: {
            bagType: number;
            hintTypes?: string[];
        }[]; /**当前选中的背包类型*/
        protected btnType: string;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 通用背包事件监听 */
        private onBagUpdate;
        private onClickAdd;
        private onClickType;
        private initTypeList;
        private setSelType;
        private initScroller;
        private typeUpdateInfo;
        private updateItemList;
        /** 通用红点事件监听 */
        private onHintUpdate;
    }
}
declare namespace game.mod.bag {
    class PropPillTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        lab_cnt: eui.Label;
        power: Power;
        scr: eui.Scroller;
        baseAttrItem: game.mod.BaseAttrItem;
        baseDescItem: game.mod.BaseDescItem;
        basePropGainList: game.mod.BasePropGainList;
        btn_goto: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.bag {
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    import prop_tips_data = msg.prop_tips_data;
    class BagModel {
        bags: {
            [type: number]: PropData[];
        }; /**type：背包类型，根据背包类型划分数据*/
        items: {
            [key: string]: PropData;
        }; /**根据物品唯一id存放数据*/
        bagIndexs: {
            [index: number]: PropData[];
        }; /**物品index映射数据*/
        bagBaseCnt: {
            [type: number]: number;
        }; /**type：背包类型，背包基础格子数*/
        bagMaxCnt: {
            [type: number]: number;
        }; /**type：背包类型，背包最大格子数*/
        selTypeCfg: SynthesisTypeConfig;
        composeCfgs: {
            [type: number]: {
                [star: number]: number[];
            };
        };
        selIndex: number;
        selSub: boolean;
        lastSelIndex: number;
        composeHint: string[];
        propHint: string[];
        meltHint: string[];
        meltTip: boolean;
        meltVal: number;
        meltMaxVal: number;
        useProps: number[];
        props: prop_tips_data[];
        easyUse: PropData[];
    }
}
declare namespace game.mod.bag {
    import GameNT = base.GameNT;
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    import prop_tips_data = msg.prop_tips_data;
    import prop_use = msg.prop_use;
    class BagProxy extends ProxyBase implements IBagProxy {
        private _model;
        private _delayProp;
        /**恭喜获得掉落*/
        initialize(): void;
        onStartReconnect(): void;
        isHasItem(itemId: number | string): boolean;
        theItemNumber(itemId: number | string): number;
        /**前端请求背包信息*/
        c2s_bag_props(): void;
        private s2c_bag_props;
        /**更新物品协议*/
        private s2c_bag_update_prop_attr;
        private updateBag;
        /**更新背包时，检测是否是外显*/
        /**更新物品时，检测道具使用*/
        private checkPropUse;
        c2s_melt_equip(): void;
        private s2c_melt_equip;
        private s2c_melt_equip_coin;
        readonly meltVal: number;
        readonly meltMaxVal: number;
        private updateMeltTip;
        readonly meltHint: string[];
        private checkMeltTip;
        /**熔炼背包*/
        getMeltBag(): PropData[];
        /**熔炼提示*/
        readonly meltTip: boolean;
        /**点击熔炼*/
        clickMelt(items?: PropData[]): void;
        c2s_prop_one_key_resolve(props: prop_tips_data[]): void;
        c2s_prop_synthesis(index: Long, cnt: number): void;
        private s2c_prop_synthesis;
        selTypeCfg: SynthesisTypeConfig;
        selIndex: number;
        lastSelIndex: number;
        selSub: boolean;
        initComposeCfgs(): void;
        /**计算星级*/
        calcStar(cfg: SynthesisTypeConfig, pos: number): number;
        getStarList(type: number): number[];
        getItemList(type: number, star: number): number[];
        canComposeByTypeCfg(cfg: SynthesisTypeConfig): boolean;
        canComposeByStar(type: number, star: number): boolean;
        canComposeByIndex(index: number): boolean;
        /**刷新合成的红点*/
        private bagUpdateComposeHint;
        getShowComposeCfgs(): SynthesisTypeConfig[];
        /**刷新合成的红点*/
        private updateComposeHint;
        /**刷新道具红点，道具类型为3*/
        private bagUpdatePropHint;
        /**刷新道具红点，道具类型为3*/
        private updatePropHint;
        getPropHint(prop: PropData): boolean;
        getUseStr(condition: number[][], propData?: PropData): string;
        protected onRoleUpdate(n: GameNT): void;
        protected onServerDayUpdate(n: GameNT): void;
        /**返回统一走下面：s2c_prop_tips*/
        c2s_prop_list_use(props: prop_use[]): void;
        /**自动使用宝箱*/
        autoUseBox(): void;
        private equipUpdateBack;
        private onCheckEasyUseEquip;
        /** */
        checkProp(p: PropData): void;
        private checkUse;
        private checkEquip;
        readonly easyUse: PropData;
        private s2c_prop_tips;
        private showPropTips;
        /**
         * 通过背包类型获取基础背包格子数量
         * @param type：背包类型
         */
        getBagBaseCnt(type: number): number;
        /**
         * 通过背包类型获取背包最大格子数量
         * @param type：背包类型
         */
        getBagMaxCnt(type: number): number;
        private s2c_first_get_prop_check_use;
        /**
         * 通过背包类型获取背包数据
         * @param type：背包类型
         */
        getBagByType(type: number): PropData[];
        /**
         * 通过index获取背包道具
         * @param index：配置表index
         */
        getPropsByIndex(index: number): PropData[];
    }
}
declare namespace game.mod.bag {
    class BagComposeTabItemRender extends BaseRenderer {
        lab_name: eui.Label;
        redPoint: eui.Image;
        private _proxy;
        data: number;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.bag {
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    class BagComposeTabRender extends BaseRenderer {
        lab_type: eui.Label;
        scr: eui.Scroller;
        list_item: eui.List;
        redPoint: eui.Image;
        private _listPro;
        private _proxy;
        private _record;
        data: SynthesisTypeConfig;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onSelectProp;
    }
}
declare namespace game.mod.bag {
    class BagComposeView extends eui.Component {
        consume0: game.mod.Icon;
        consume1: game.mod.Icon;
        consume2: game.mod.Icon;
        btn_min: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        lab_cnt: eui.Label;
        btn_add: game.mod.Btn;
        btn_max: game.mod.Btn;
        cost: game.mod.CostIcon;
        btn_compose: game.mod.Btn;
        icon: game.mod.Icon;
        lab_name: eui.Label;
        scr: eui.Scroller;
        list_type: eui.List;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.bag {
    class BagDelView extends eui.Component {
        lab_desc1: eui.Label;
        list_item2: eui.List;
        lab_sel: eui.Label;
        item: game.mod.Icon;
        lab_cnt: eui.Label;
        btn_add: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        btn_subtractTen: game.mod.Btn;
        btn_min: game.mod.Btn;
        btn_addTen: game.mod.Btn;
        btn_max: game.mod.Btn;
        lab_desc2: eui.Label;
        list_item: eui.List;
        btn_del: game.mod.Btn;
        btn_gotoact: Btn;
        constructor();
    }
}
declare namespace game.mod.bag {
    class BagMeltView extends eui.Component {
        list_item: eui.List;
        lab_desc: eui.Label;
        img_icon: eui.Image;
        lab_cnt: eui.Label;
        lab_add: eui.Label;
        lab_tips: eui.Label;
        item: game.mod.CoinItem;
        btn_shop: game.mod.Btn;
        btn_melt: game.mod.Btn;
        grp_roleRing: eui.Group;
        btn_roleRing: Btn;
        constructor();
    }
}
declare namespace game.mod.bag {
    class BagView extends eui.Component {
        scroller: eui.Scroller;
        list_item: eui.List;
        lab_cnt: eui.Label;
        btn_add: game.mod.Btn;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.bag {
    class IconBag extends Icon {
        protected dataChanged(): void;
        private onClickThis;
    }
}
declare namespace game.mod.bag {
    class BestPropTipsView extends eui.Component {
        img_bg: eui.Image;
        scr_reward: eui.Scroller;
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod.bag {
    /**
     * 基础道具来源跳转组件
     */
    class GainWaysTipsItem extends BaseListenerRenderer {
        private lab_desc;
        private lab_desc_center;
        private btn_gain;
        data: number;
        protected onAddToStage(): void;
        protected onClick(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.bag {
    class GainWaysTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        icon: game.mod.Icon;
        list_item: eui.List;
        lab_name: eui.Label;
        constructor();
    }
}
declare namespace game.mod.bag {
    class MeltTipsView extends eui.Component {
        grp_eft2: eui.Group;
        img_type: eui.Image;
        grp_eft: eui.Group;
        icon: Icon;
        lab_cnt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.bag {
    class PropGainView extends eui.Component {
        img_type: eui.Image;
        grp_eft2: eui.Group;
        grp_eft: eui.Group;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.bag {
    class BagMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.bag {
    class PropSurfaceTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        power: game.mod.Power;
        img_status: eui.Image;
        baseSurfaceItem: game.mod.BaseSurfaceItem;
        baseDescItem: game.mod.BaseDescItem;
        basePropGainList: game.mod.BasePropGainList;
        /**神灵*/
        img_type: eui.Image;
        btn_skill: game.mod.ShenLingSkillIconTap;
        gr_power0: eui.Group;
        gr_power: eui.Group;
        name0: game.mod.BaseNameItem;
        list_skill: eui.List;
        constructor();
    }
}
declare namespace game.mod.bag {
    class PropTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        lab_cnt: eui.Label;
        scr: eui.Scroller;
        baseDescItem: game.mod.BaseDescItem;
        basePropGainList: game.mod.BasePropGainList;
        baseRewardList: BaseRewardList;
        grp_use: eui.Group;
        lab_useCnt: eui.Label;
        btn_add: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        btn_subtractTen: game.mod.Btn;
        btn_addTen: game.mod.Btn;
        lab_useTips: eui.Label;
        btn_use: game.mod.Btn;
        exchangeTips: game.mod.ExchangeTips;
        btn_goto: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.bag {
    class BagMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.bag {
    class BagComposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _typeList;
        private _selCnt;
        private _selCfg;
        private _itemList;
        private _lastItemIndex;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onSuccess;
        private onClickCompose;
        private onClickMin;
        private onClickSubtract;
        private onClickAdd;
        private onClickMax;
        private getMaxCnt;
        private subtractSelCnt;
        private checkCnt;
        private setSelCnt;
        private onClickType;
        private onClickItem;
        /**选中类型刷新*/
        private onSelectedChanged;
        private updateTypeList;
        private updateItemList;
        /**首次进入界面，自动选中可合成选项*/
        private updateTypeListSel;
        /**返回的是列表下标*/
        private genSelTypePos;
        /**返回的是道具index*/
        private genSelIndex;
        /**选中刷新*/
        private updateInfo;
        private updateTarIcon;
        private selCntUpdate;
        private updateCost;
    }
}
declare namespace game.mod.bag {
    class BagDelMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList2;
        private _itemList;
        private _itemCnt2;
        private _itemCnt;
        private _items;
        private _selItems;
        private _finalItems;
        private _selCnt;
        private _selItem;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 通用背包事件监听 */
        private onBagUpdate;
        private onClickGotoAct;
        private onClickItem;
        private onClickDel;
        private onClickMin;
        private onClickSubtractTen;
        private onClickSubtract;
        private onClickAdd;
        private onClickAddTen;
        private onClickMax;
        private subtractSelCnt;
        private addSelCnt;
        private checkCnt;
        private setSelCnt;
        private initViewShow;
        private onInfoUpdate;
        private updateItemList;
        /**【ID1015569】分解优化。不需要默认勾选第一个，满足品质全勾选即可*/
        private initSelItems;
        private updateItemSel;
        /**选中刷新时候更新*/
        private selItemUpdate;
        private updateSelItem;
        private selCntUpdate;
    }
}
declare namespace game.mod.bag {
    class BagEquipMdr extends BagBaseMdr {
        protected typeList: {
            bagType: number;
            hintTypes?: string[];
        }[]; /**背包类型*/
        protected btnType: string;
    }
}
declare namespace game.mod.bag {
    class BagMdr extends BagBaseMdr {
        protected typeList: {
            bagType: number;
            hintTypes?: string[];
        }[]; /**背包类型*/
        protected btnType: string;
    }
}
declare namespace game.mod.bag {
    class BagMeltMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _items;
        private _itemCnt;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 通用背包事件监听 */
        private onBagUpdate;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private onClickShop;
        private onClickVip;
        private onClickMelt;
        private initViewShow;
        private updateItemList;
        private updateCnt;
        private updateMeltCnt;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /** 更新红点 */
        private updateHint;
        private updateMeltHint;
        private updateRoleRing;
        private onClickRoleRing;
    }
}
declare namespace game.mod.bag {
    import prop_tips_data = msg.prop_tips_data;
    class BestPropTipsMdr extends MdrBase {
        private _view;
        _showArgs: prop_tips_data[]; /**奖励*/
        private _rewardList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initReward;
        private showImgBgTween;
        private removeImgBgTween;
    }
}
declare namespace game.mod.bag {
    class GainWaysTipsMdr extends MdrBase {
        private _view;
        _showArgs: number; /**道具index*/
        private _attrList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
    }
}
declare namespace game.mod.bag {
    import s2c_melt_equip = msg.s2c_melt_equip;
    import UpdateItem = base.UpdateItem;
    class MeltTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        _showArgs: s2c_melt_equip; /**奖励*/
        private _curCnt;
        private _addCnt;
        private _perAdd;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initReward;
        private showTween;
        private removeTween;
        private showEffect;
        update(time: base.Time): void;
        private showCntTween;
    }
}
declare namespace game.mod.bag {
    import prop_tips_data = msg.prop_tips_data;
    class PropGainMdr extends EffectMdrBase {
        private _view;
        _showArgs: prop_tips_data[];
        private readonly ROW_C;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private showEffect;
        private updateReward;
        private showTween;
        private removeTween;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.bag {
    class PropPillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: PropData;
        private _propData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoto;
        private updateShow;
        private updateAttr;
    }
}
declare namespace game.mod.bag {
    class PropSurfaceTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        _showArgs: PropData;
        /**道具*/
        private _propData;
        /**道具*/
        private _index;
        private _listSkill;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSkill;
        private onClickTalent;
        private updateShow;
        private updateShenling;
    }
}
declare namespace game.mod.bag {
    class PropTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: PropData;
        private _propData;
        private _selCnt;
        private _isSel;
        private readonly SCR_H_USE_AND_EXCHANGE;
        private readonly SCR_H_GOTO;
        private readonly SCR_H;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUse;
        private onClickSubtractTen;
        private onClickSubtract;
        private onClickAdd;
        private onClickAddTen;
        private subtractSelCnt;
        private addSelCnt;
        private setSelCnt;
        private onClickGoto;
        private updateShow;
        private updateReward;
        private updateUse;
        private updateUseCnt;
        private getLimitStr;
    }
}
