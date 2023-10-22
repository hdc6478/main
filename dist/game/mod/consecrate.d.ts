declare namespace game.mod.consecrate {
    class ConsecrateShelfItem extends BaseRenderer {
        private lab_name;
        private lab_score;
        private icon;
        private grp_time;
        private _proxy;
        data: PropData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        onClick(): void;
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.consecrate {
    import GameNT = base.GameNT;
    import consecrate_infos = msg.consecrate_infos;
    import AmassConfig = game.config.AmassConfig;
    class ConsecrateProxy extends ProxyBase implements IConsecrateProxy {
        private _model;
        readonly model: ConsecrateModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        /**
         * 放入封魂
         * @param prop_id
         * @param pos 0则一键放入
         * */
        c2s_consecrate_putin(prop_id: number[]): void;
        /**卸下 */
        c2s_consecrate_get_back(pos: number): void;
        /**
         * 加速封魂
         * @param oper 1为单个加速 2为全部加速
         * @param pos oper为1时需要传位置
         * */
        c2s_consecrate_speedup(oper: number, pos?: number): void;
        /**领取宝箱 */
        c2s_consecrate_get(oper: number, pos?: number): void;
        /**封魔珍宝(抽奖) */
        c2s_consecrate_draw(): void;
        /**打开界面请求 */
        c2s_consecrate_info(): void;
        /**抽奖返回 */
        private s2c_consecrate_draw;
        private s2c_consecrate_info;
        /**--------------------协议end-------------------- */
        /**是否有可领奖励 */
        getIsReward(): boolean;
        /**正在封印的道具 */
        getDoingInfo(): consecrate_infos;
        /**正在计算时间的道具 */
        getEndTime(): number;
        /**根据位置获取数据 */
        getInfoByPos(pos: number): consecrate_infos;
        /**上架魔魂的总时间 显示需要减去当前封印已经过去的时间 */
        getListSpeedUpTime(): number;
        /**获取空格数量 */
        getSpaceCount(): number;
        /**已经供奉的数量 */
        getConsecrateCount(): number;
        /**
         * 上架弹窗显示列表
         * type=1时间加速道具 param1 秒
         * type=2魔魂道具 param1 秒,积分,掉落id1_掉落id2
         * */
        getPropList(type?: number): PropData[];
        private sortByQuality;
        protected onRoleUpdate(n: GameNT): void;
        protected onBagUpdateByBagType(n: GameNT): void;
        /**是否有空格且背包有道具使用 */
        checkIsUse(): boolean;
        /**封魔红点 */
        private onUpdateHintSealDevil;
        /**--------------------异兽奇记start-------------------- */
        c2s_amass_advance(classId: number, type: number, index: number): void;
        private s2c_amass_info;
        private getInfoPos;
        private getAmassInfo;
        getAmassLv(index: number): number;
        private initAmassCfg;
        getAmassTypes(classId: number): number[];
        getAmassIndexList(classId: number, type: number): number[];
        getAmassCfg(index: number): AmassConfig;
        getAmassActNum(classId: number, type: number): number;
        canAmassItemUp(index: number): boolean;
        canAmassTypeUp(classId: number, type: number): boolean;
        canAmassClassIdUp(classId: number): boolean;
        /**更新红点*/
        private updateAmassHint;
        private setAmassHint;
        /**--------------------异兽奇记end-------------------- */
        protected onBagUpdateByPropType(n: base.GameNT): void;
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateLotteryView extends eui.Component {
        secondPop: SecondPop;
        icon_1: Icon;
        icon_2: Icon;
        icon_3: Icon;
        icon_4: Icon;
        icon_5: Icon;
        icon_6: Icon;
        icon_7: Icon;
        icon_8: Icon;
        icon_9: Icon;
        img: eui.Image;
        checkbox: eui.CheckBox;
        lab_tips: eui.Label;
        lab_count: eui.Label;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateShelfView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateSpeedUpView extends eui.Component {
        secondPop: SecondPop;
        btn_speedup: Btn;
        lab_name: eui.Label;
        lab_time: eui.Label;
        icon: Icon;
        lab_alltime: eui.Label;
        lab_havetime: eui.Label;
        btn_allspeedup: Btn;
        grp_tips: eui.Group;
        grp_all: eui.Group;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateView extends eui.Component {
        item_1: ConsecrateIconItem;
        item_2: ConsecrateIconItem;
        item_3: ConsecrateIconItem;
        item_4: ConsecrateIconItem;
        item_5: ConsecrateIconItem;
        item_6: ConsecrateIconItem;
        item_7: ConsecrateIconItem;
        icon: Icon;
        coin: CoinItem;
        grp_tips: eui.Group;
        lab_name: eui.Label;
        lab_time: eui.Label;
        lab_tips: eui.Label;
        btn_reward: Btn;
        btn_lottery: UpStarBtn;
        btn_speedup: Btn;
        btn_auto: Btn;
        btn_add: Btn;
        group_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    class AmassTipsView extends eui.Component {
        basePropTips: game.mod.BasePropTips;
        power: game.mod.Power;
        img_status: eui.Image;
        lab_cnt: eui.Label;
        img_bg: eui.Image;
        baseDescItem: game.mod.BaseDescItem;
        btn_goto: Btn;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    class AmassUpView extends eui.Component {
        img_bg: eui.Image;
        grp_lv: eui.Group;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        power: Power;
        bar: ProgressBarComp;
        icon: Icon;
        btn_up: Btn;
        constructor();
    }
}
declare namespace game.mod.consecrate {
    import consecrate_infos = msg.consecrate_infos;
    class ConsecrateIconItem extends BaseRenderer {
        private btn_add;
        private btn_reward;
        private grp_tips;
        private grp_name;
        private group_eft;
        private lab_name;
        private redPoint;
        private icon;
        data: consecrate_infos;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: consecrate_infos): void;
        private onClickReward;
        private onClickAdd;
        onClick(): void;
        private onClickIcon;
        private setStatus;
    }
}
declare namespace game.mod.consecrate {
    import GongfengShowConfig = game.config.GongfengShowConfig;
    class ConsecratePreviewRewardItem extends BaseRenderer {
        img_type: eui.Image;
        lab_desc: eui.Label;
        list_reward: eui.List;
        data: GongfengShowConfig;
        private _rewardList;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.consecrate {
    import consecrate_infos = msg.consecrate_infos;
    import amass_item = msg.amass_item;
    import AmassConfig = game.config.AmassConfig;
    class ConsecrateModel {
        /**封魔列表 */
        list: consecrate_infos[];
        /**封印存储时间 单位秒 */
        storage_time: number;
        readonly num: number;
        amassList: amass_item[];
        amassCfgList: {
            [classId: number]: {
                [type: number]: number[];
            };
        };
        amassCfg: {
            [index: number]: AmassConfig;
        };
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateLotteryMdr extends MdrBase {
        private _view;
        private _proxy;
        private indexs;
        private index;
        private readonly round;
        private readonly circle;
        private readonly angle;
        private readonly initAngle;
        private isTween;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCount;
        private onRoleUpdate;
        private onLottery;
        private onJumpRoleRing;
        private onCheckBox;
        private onOpenTween;
        private onTween;
        private onTweenOver;
        private onPopupReward;
        protected onHide(): void;
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.consecrate {
    import UpdateItem = base.UpdateItem;
    class ConsecrateMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _doing;
        private _prop;
        private _storage_time;
        private readonly num;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onRoleUpdate;
        private onUpdateCount;
        update(time: base.Time): void;
        private onUpdateTime;
        private onClickSpeedUp;
        private onClickPreview;
        private onClickLottery;
        private onClickAuto;
        private onClickAdd;
        protected onHide(): void;
    }
}
declare namespace game.mod.consecrate {
    class ConsecratePreviewRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        private updateItemList;
    }
}
declare namespace game.mod.consecrate {
    class ConsecrateShelfMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
        private showGuide;
        private onListChange;
    }
}
declare namespace game.mod.consecrate {
    import UpdateItem = base.UpdateItem;
    class ConsecrateSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _doing;
        private _prop;
        private _allTime;
        private _leftTime;
        private _leftTime2;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        update(time: base.Time): void;
        private onUpdateTime;
        private onClickSpeedUp;
        private onSpeedUp;
        private onClickAllSpeedUp;
        private onAllSpeedUp;
        protected onHide(): void;
        private showGuide;
    }
}
declare namespace game.mod.consecrate {
    class AmassMdr extends AmassBaseMdr {
        protected classId: number;
    }
}
declare namespace game.mod.consecrate {
    class AmassMdr2 extends AmassBaseMdr {
        protected classId: number;
    }
}
declare namespace game.mod.consecrate {
    class AmassTipsMdr extends EffectMdrBase {
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
        private updateGoto;
    }
}
declare namespace game.mod.consecrate {
    import AmassConfig = game.config.AmassConfig;
    class AmassUpMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: {
            classId: number;
            cfg: AmassConfig;
        };
        private _classId;
        private _cfg;
        private _lv;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdate;
        private initShow;
        private updateShow;
        private updatePower;
    }
}
