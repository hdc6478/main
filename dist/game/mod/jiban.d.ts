declare namespace game.mod.jiban {
    import ArrayCollection = eui.ArrayCollection;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import GameNT = base.GameNT;
    import YuanlingJibanConfig = game.config.YuanlingJibanConfig;
    class JibanBaseMdr extends MdrBase {
        protected _view: JibanBaseView;
        protected _proxy: ISurfaceProxy;
        private _jProxy;
        protected _itemList: ArrayCollection;
        /**当前选中的羁绊下标*/
        protected _selIndex: number;
        /**当前选中的羁绊配置*/
        protected _selCfg: HorseJibanConfig | YuanlingJibanConfig;
        protected _maxCnt: number;
        protected _canAct: boolean;
        protected _headType: number;
        protected _maxStar: number;
        protected _curStar: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickItem;
        /**重载，激活整套羁绊*/
        protected onClickAct(): void;
        protected onInfoUpdate(n: GameNT): void;
        private initShow;
        private updateItemList;
        private updateItemListHint;
        private indexUpdateInfo;
        /**更新战力*/
        protected updatePower(): void;
        private updateShow;
        protected updateModel(): void;
        protected updateNameItem(): void;
        protected getStar(index: number): number;
        protected getAct(index: number): boolean;
        /**羁绊icon数据*/
        protected getJibanCfgList(): IJibanBaseRenderData[];
        /**更新激活条件和激活状态*/
        protected updateAct(): void;
    }
}
declare namespace game.mod.jiban {
    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    class ShenLingJiBanAwardItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list_reward: eui.List;
        btn_get: game.mod.Btn;
        img_statue: eui.Image;
        lb_cond: eui.Label;
        data: IShenLingJiBanAwardItemData;
        private _listData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    /**神灵羁绊奖励列表item类*/
    interface IShenLingJiBanAwardItemData {
        index: number;
        cfg: ShenlingJibanConfig;
        status: number;
        jiBanLv: number;
    }
}
declare namespace game.mod.jiban {
    class JibanProxy extends ProxyBase {
        private _model;
        initialize(): void;
        headType: number;
    }
}
declare namespace game.mod.jiban {
    import huanhua_datas = msg.huanhua_datas;
    import equip_gather_datas = msg.equip_gather_datas;
    class ShoujiHuanhuaModel {
        huanhua_map: {
            [index: number]: huanhua_datas;
        };
        equip_map: {
            [index: number]: equip_gather_datas;
        };
    }
}
declare namespace game.mod.jiban {
    import GameNT = base.GameNT;
    import BodyJibanConfig = game.config.BodyJibanConfig;
    import huanhua_datas = msg.huanhua_datas;
    import GatherConfig = game.config.GatherConfig;
    import equip_gather_datas = msg.equip_gather_datas;
    /**
     * @description 角色面板的收集和幻化系统
     */
    class ShoujiHuanhuaProxy extends ProxyBase implements IShoujiHuanhuaProxy {
        private _model;
        headTypes: number[];
        private _actJibanMap;
        private _actJibanEquipMap;
        readonly model: ShoujiHuanhuaModel;
        onStartReconnect(): void;
        initialize(): void;
        /**
         * 激活
         * @param oper 激活类型 0 激活单件 1 激活套装
         * @param index 套装index
         * @param waixian_id 外显id
         */
        c2s_huanhua_act(oper: number, index: number, waixian_id: number): void;
        private s2c_huanhua_get_list;
        /**
         * 激活
         * oper 1 激活 2 领取大奖
         */
        c2s_equip_gather_act(index: number, oper: number): void;
        private s2c_equip_gather_get_list;
        /**=============================== 协议end ===============================*/
        getBodyJiBanCfgList(): BodyJibanConfig[];
        getHuanHuaInfo(index: number): huanhua_datas;
        isActed(index: number): boolean;
        private _rebirthIdxMap;
        getIdxByRebirthLv(rebirthLv: number): number;
        getGatherCfgList(): GatherConfig[];
        getGatherInfo(index: number): equip_gather_datas;
        canGather(index: number): boolean;
        /**
         * 是否已收集
         * 领取大奖点了激活才有十件套属性
         * @param index
         */
        isActedGather(index: number): boolean;
        /**进度条收集阶段*/
        partMap: {
            [index: number]: number[];
        };
        getPartAry(index: number): number[];
        canTaskActGather(): boolean;
        /**
         * 套装的x件套属性能否激活
         * @param index
         * @param cnt
         */
        canActByCnt(index: number, cnt: number): boolean;
        getGatherCnt(index: number): number;
        /**
         * 能否激活收集的套装
         * @param index
         * @param isTips
         */
        canActGather(index: number, isTips?: boolean): boolean;
        /**能否领取大奖*/
        canGetBigReward(index: number): boolean;
        /**=============================== hint ===============================*/
        protected onSurfaceInfoUpdate(n: GameNT): void;
        canActHuanHuaIcon(index: number, waixianId: number): boolean;
        /**幻化套装红点*/
        getHuanHuaHint(index: number): boolean;
        /**幻化红点*/
        updateHuanHuaHint(): void;
        /**收集红点*/
        updateGatherHint(): void;
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.jiban {
    class JibanBaseItemRender extends BaseRenderer {
        icon: game.mod.Icon;
        lab_gain: eui.Label;
        data: IJibanBaseItemRenderData;
        private _proxy;
        private _canAct;
        _gainId: number;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickIcon;
        private onClick;
        private showPropTips;
        private onChildClick;
        private onClickYishouShouyin;
        private onClickXianjian;
    }
}
declare namespace game.mod.jiban {
    class JibanBaseRender extends IconSel {
        data: IJibanBaseRenderData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.jiban {
    class JibanBaseView extends eui.Component {
        list_item: eui.List;
        power: game.mod.Power;
        name_item: AvatarNameSrItem;
        god_item: game.mod.AttrGodItem;
        img_icon: eui.Image;
        item0: JibanBaseItemRender;
        item1: JibanBaseItemRender;
        item2: JibanBaseItemRender;
        item3: JibanBaseItemRender;
        item4: JibanBaseItemRender;
        item5: JibanBaseItemRender;
        img_name: eui.Image;
        img_eff: eui.Image;
        lab_tips: eui.Label;
        btn_act: game.mod.Btn;
        img_act: eui.Image;
        img_item: eui.Image;
        constructor();
    }
}
declare namespace game.mod.jiban {
    class RoleGatherBarItem extends BaseListenerRenderer {
        img_bg: eui.Image;
        lb_cnt: eui.Label;
        data: {
            cnt: number;
            isActed: boolean;
        };
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.jiban {
    import GatherConfig = game.config.GatherConfig;
    class RoleGatherBtnItem extends BaseListenerRenderer {
        img_sel: eui.Image;
        img_gray: eui.Image;
        img_collected: eui.Image;
        img_icon: eui.Image;
        redPoint: eui.Image;
        lb_desc: eui.Label;
        data: IRoleGatherBtnItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IRoleGatherBtnItemData {
        cfg: GatherConfig;
        hint: boolean;
        isActed: boolean;
        isOpen: boolean;
    }
}
declare namespace game.mod.jiban {
    class RoleGatherIconItem extends BaseListenerRenderer {
        icon: game.mod.Icon;
        img_gray: eui.Image;
        lb_cond: eui.Label;
        data: IRoleGatherIconItemData;
        private _gainId;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickGo;
        private onClickIcon;
    }
    interface IRoleGatherIconItemData {
        type: number;
        index: number;
        isActed: boolean;
    }
}
declare namespace game.mod.jiban {
    class RoleGatherView extends eui.Component {
        list_equip: eui.List;
        list_item: eui.List;
        gr_eff: eui.Group;
        lb_awardname: eui.Label;
        lb_suitcnt: eui.Label;
        bar: game.mod.ProgressBarComp;
        barItem0: game.mod.jiban.RoleGatherBarItem;
        barItem1: game.mod.jiban.RoleGatherBarItem;
        barItem2: game.mod.jiban.RoleGatherBarItem;
        barItem3: game.mod.jiban.RoleGatherBarItem;
        icon_reward: game.mod.Icon;
        btn_act: game.mod.Btn;
        lb_attr: eui.Label;
        img_got: eui.Image;
        img_name: eui.Image;
        constructor();
    }
}
declare namespace game.mod.jiban {
    class RoleHuanHuaIconItem extends BaseListenerRenderer {
        img_di: eui.Image;
        icon: game.mod.Icon;
        lab_gain: eui.Label;
        data: IRoleHuanHuaIconData;
        private _gainId;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickGain;
        private onClickIcon;
    }
    interface IRoleHuanHuaIconData {
        suitIndex: number;
        index: number;
        idx: number;
        isAct: boolean;
        hint: boolean;
    }
}
declare namespace game.mod.jiban {
    import BodyJibanConfig = game.config.BodyJibanConfig;
    class RoleHuanHuaItem extends IconSel {
        data: BodyJibanConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.jiban {
    class RoleHuanHuaView extends eui.Component {
        list_item: eui.List;
        nameItem: game.mod.AvatarNameSrItem;
        godItem: game.mod.AttrGodItem;
        img_acted: eui.Image;
        btn_act: game.mod.Btn;
        icon0: game.mod.jiban.RoleHuanHuaIconItem;
        icon1: game.mod.jiban.RoleHuanHuaIconItem;
        icon2: game.mod.jiban.RoleHuanHuaIconItem;
        power: game.mod.Power;
        gr_eff: eui.Group;
        lb_actCond: eui.Label;
        img_name: eui.Image;
        img_eff: eui.Image;
        constructor();
    }
}
declare namespace game.mod.jiban {
    class JibanModel {
        headType: number;
    }
}
declare namespace game.mod.jiban {
    class ShenLingJiBanAwardView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        btn_oneKey: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.jiban {
    import god_brother_group_data = msg.god_brother_group_data;
    class ShenLingJiBanItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        lb_num: eui.Label;
        power: game.mod.Power;
        btn_reward: game.mod.Btn;
        list: eui.List;
        lb_attr: eui.Label;
        btn_act: game.mod.Btn;
        img_max: eui.Image;
        data: IShenLingJiBanItemData;
        private _proxy;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickReward;
        private onClickAct;
        private onClickList;
        private updateAttr;
    }
    /**神灵羁绊列表item类*/
    interface IShenLingJiBanItemData {
        index: number;
        info: god_brother_group_data;
        maxLv: number;
    }
}
declare namespace game.mod.jiban {
    class ShenLingJiBanView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.jiban {
    class JibanMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.jiban {
    class JibanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.jiban {
    class ChildJibanMdr extends MdrBase {
        private _view;
        private _proxy;
        private _selIdx;
        private _listData;
        private _selCfg;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateList;
        private updateView;
        private updateIcon;
        private updatePower;
        private updateAct;
        private onClickItem;
        private onClickAct;
    }
}
declare namespace game.mod.jiban {
    class HorseJibanMdr extends JibanBaseMdr {
        protected _headType: number;
    }
}
declare namespace game.mod.jiban {
    class RoleGatherMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listItem;
        private _listEquip;
        private _curIdx;
        private _curDealIdx;
        private _curCfg;
        private _attrAry;
        private _effId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateAttr;
        private updateAttr;
        private onUpdateView;
        private updateRewardView;
        private updateView;
        private updateItemList;
        private onClickListItem;
        private switchView;
        private onClickAct;
        private onClickReward;
        private showGuide;
    }
}
declare namespace game.mod.jiban {
    class RoleHuanHuaMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _curIdx;
        private _curCfg;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateListData;
        private onUpdateView;
        private updateView;
        private onUpdateAttr;
        private updateIconView;
        protected onHide(): void;
        private onClickList;
        private onClickAct;
        private onUpdateSurfaceInfo;
    }
}
declare namespace game.mod.jiban {
    class ShenLingJiBanAwardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _jiBanIndex;
        private _rewardList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateInfo;
        protected onHide(): void;
        private onClick;
    }
}
declare namespace game.mod.jiban {
    class ShenLingJiBanMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _pos;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private getJibanAttrIds;
        private updateListData;
        private onUpdateInfo;
        protected onHide(): void;
        private gotoPos;
        private getNextPos;
    }
}
declare namespace game.mod.jiban {
    class TianshenJibanMdr extends JibanBaseMdr {
        protected _headType: number;
    }
}
declare namespace game.mod.jiban {
    import XianjianJibanConfig = game.config.XianjianJibanConfig;
    class XianjianJibanMdr extends JibanBaseMdr {
        protected _headType: number;
        private _xianjianProxy;
        protected onInit(): void;
        protected updateModel(): void;
        protected onClickAct(): void;
        /**羁绊icon数据*/
        protected getJibanCfgList(): IJibanBaseRenderData[];
        protected getStar(index: number): number;
        protected getAct(index: number): boolean;
        protected getCanAct(cfg?: XianjianJibanConfig): boolean;
        /**羁绊单个外显是否已激活*/
        protected isJibanItemAct(index: number, rideIndex: number): boolean;
        /**羁绊外显是否可以激活*/
        protected canJibanItemAct(cfg: XianjianJibanConfig, index: number): boolean;
        /**更新激活条件和激活状态*/
        protected updateAct(): void;
    }
}
declare namespace game.mod.jiban {
    class YishouShouyinJibanMdr extends JibanBaseMdr {
        protected _headType: number;
        private _yishouProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        protected getJibanCfgList(): IJibanBaseRenderData[];
        protected onClickAct(): void;
        protected updateAct(): void;
        protected updateModel(): void;
        protected updatePower(): void;
    }
}
