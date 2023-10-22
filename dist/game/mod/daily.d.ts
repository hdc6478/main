declare namespace game.mod.daily {
    import ArrayCollection = eui.ArrayCollection;
    class LivenessProgressReward extends BaseRenderer {
        img_tips: eui.Image;
        lab_count: eui.Label;
        list_reward: eui.List;
        list_progress: eui.List;
        group_eft1: eui.Group;
        protected _listData: ArrayCollection;
        protected _listReward: ArrayCollection;
        constructor();
        protected onAddToStage(): void;
        setData(val: number): void;
    }
}
declare namespace game.mod.daily {
    class DailyMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.daily {
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import GameNT = base.GameNT;
    /**
     * @description 日常限时活动
     */
    class DailyLimitTimeActProxy extends ProxyBase implements IDailyLimitTimeActProxy {
        private _model;
        initialize(): void;
        s2c_limit_act_info(n: GameNT): void;
        getConfig(index: number): DailyLimitTimeConfig;
        /**当天的活动数据*/
        private _curDay;
        private _curList;
        private getConfigListByToday;
        /**从后端index获取前端index*/
        private getTypes;
        private changeIndexs;
        /**是否是今天的活动*/
        isTodayAct(cfg: DailyLimitTimeConfig): boolean;
        getConfigList(): IDailyLimitActData[];
        /**活动是否正在进行*/
        isOpen(type: number): boolean;
        /**活动下一次开启时间，返回的是秒*/
        getNextStartTime(type: number): number;
        getClickHint(index: number): boolean;
        setClickHint(index: number): void;
        updateHint(): void;
    }
}
declare namespace game.mod.daily {
    import attributes = msg.attributes;
    class DailyModel {
        curAttr: attributes;
        nextAttr: attributes;
        sumCup: number;
        nextCup: number;
        showPower: Long;
        curLv: number;
        curIndex: number;
        curExp: number;
        awdState: number;
        awdList: number[];
        livenessHint: string[];
    }
}
declare namespace game.mod.daily {
    import GameNT = base.GameNT;
    class DailyProxy extends ProxyBase implements IDailyProxy {
        private _model;
        initialize(): void;
        getModel(): DailyModel;
        c2s_medal_info(): void;
        /**
         * 新勋章信息协议
         * operate 1.全部 2.缺省
         * @param n
         */
        private s2c_medal_new_info;
        /**
         * 勋章操作
         * @param operate  1:升级勋章 2:特权领奖 3:激活勋章 4:幻化
         * @param index
         */
        c2s_medal_oper(operate: number, index: number): void;
        c2s_medal_daily_reward(index: number): void;
        private s2c_medal_daily_reward;
        /**
         * 获取总战力
         */
        readonly allPower: number;
        protected onTaskUpdate(n: GameNT): void;
        private updateLivenessHint;
        /**
         * 获取宝箱奖励红点
         */
        private getBoxHint;
        /**
         * 获取任务奖励红点
         */
        private getTaskHint;
        /**
         * 判断某档活跃度奖励是否已经领取
         * @param rewardId
         */
        checkActRewardIsGot(rewardId: number): boolean;
        /**
         * 获取玩法系统外部系统红点
         */
        getOtherHint(): boolean;
        /**
         * 是否是玩法系统外部系统红点
         */
        isOtherHint(node: string): boolean;
    }
}
declare namespace game.mod.daily {
    class DailyLimitTimeActItem extends BaseRenderer {
        img_bg: eui.Image;
        list_reward: eui.List;
        lb_time: eui.Label;
        lb_desc: eui.Label;
        btn_desc: game.mod.Btn;
        btn_go: game.mod.Btn;
        img_end: eui.Image;
        img_doing: eui.Image;
        data: IDailyLimitActData;
        private _listData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private getTimeStr;
        private onClickDesc;
        private onClickGo;
    }
}
declare namespace game.mod.daily {
    class DailyLimitTimeActView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.daily {
    import ActiveAwardConfig = game.config.ActiveAwardConfig;
    class LivenessBoxItem extends eui.Component {
        btn_box: game.mod.Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        private _awdCfg;
        private _isGot;
        private _isCanGet;
        constructor();
        setRewardBox(cfg: ActiveAwardConfig, curExp: number, isGot0: boolean): void;
        readonly isGot: boolean;
        readonly isCanGet: boolean;
        readonly cfg: ActiveAwardConfig;
    }
}
declare namespace game.mod.daily {
    class LivenessItem extends BaseRenderer {
        gr_model: eui.Group;
        gr_lock: eui.Group;
        lab_lock: eui.Label;
        redPoint: eui.Image;
        data: {
            medalId: number;
            curLv: number;
        };
        private _effId;
        private _effStr;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.daily {
    class LivenessProgressItem extends BaseRenderer {
        progress: ProgressBarComp;
        data: VProgressData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.daily {
    class DailyLimitTimeActModel {
        /**红点path*/
        hintPath: string[];
        /**红点记录，点击过一次消失*/
        clickHint: number[];
        /**开启的活动index*/
        indexs: number[];
        /**开启的活动类型*/
        types: number[];
    }
}
declare namespace game.mod.daily {
    import ActiveAwardConfig = game.config.ActiveAwardConfig;
    class LivenessProgressRewardItem extends BaseRenderer {
        btn_box: Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        data: ActiveAwardConfig;
        private _proxy;
        private is_got;
        private is_lingqu;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
}
declare namespace game.mod.daily {
    class LivenessTaskRender extends TaskRender {
        protected onClickDraw(): void;
    }
}
declare namespace game.mod.daily {
    class LivenessView extends eui.Component {
        model_item: game.mod.daily.LivenessItem;
        power: game.mod.Power;
        lab_name: eui.Label;
        btn_left: game.mod.Btn;
        btn_right: game.mod.Btn;
        lab_lv: eui.Label;
        progressComp: ProgressBarComp;
        lab_curAttr: eui.Label;
        img_arrow: eui.Image;
        lab_nextAttr: eui.Label;
        img_box_prog1: eui.Image;
        img_box_prog2: eui.Image;
        lab_my_liveness: eui.Label;
        box1: game.mod.daily.LivenessBoxItem;
        box2: game.mod.daily.LivenessBoxItem;
        box3: game.mod.daily.LivenessBoxItem;
        box4: game.mod.daily.LivenessBoxItem;
        box5: game.mod.daily.LivenessBoxItem;
        src_task: eui.Scroller;
        list_task: eui.List;
        grp_icon: eui.Group;
        reward: LivenessProgressReward;
        constructor();
    }
}
declare namespace game.mod.daily {
    import DailyWanfaConfig = game.config.DailyWanfaConfig;
    class WanfaRender extends BaseListenerRenderer {
        img_icon: eui.Image;
        lab_desc: eui.Label;
        lab_state: eui.Label;
        lab_open_tip: eui.Label;
        btn_go: game.mod.Btn;
        data: DailyWanfaConfig;
        private _proxy;
        private _bossProxy;
        private _competeProxy;
        private _consecrateProxy;
        private _target;
        private _curVal;
        protected onAddToStage(): void;
        private onClickGo;
        protected dataChanged(): void;
        /**获取状态文本*/
        private getStateStr;
        /**获取当前进度*/
        private getCurVal;
        /**获取冷却时间*/
        private getNextTime;
        /**刷新状态文本显示*/
        updateState(): void;
        private readonly isShowTime;
    }
}
declare namespace game.mod.daily {
    class WanfaView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.daily {
    class DailyMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        /** 刷新分页红点 ,重写*/
        protected updateTabHint(): void;
    }
}
declare namespace game.mod.daily {
    class DailyLimitTimeActMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.daily {
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    class LivenessMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        private _listTaskData;
        private _medalCfgs;
        private _oldCup;
        private _start;
        private _showIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected updateAddEft(n: GameNT): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private updateMedal;
        private updateAttr;
        private updateBoxAwd;
        private updateTask;
        /** 设置奖杯数增加动画*/
        update(time: base.Time): void;
        /** 升级动画*/
        private onPlayTween;
        /** 设置动画*/
        private setTween;
        private randomPos;
        private onTaskUpdate;
        private onLast;
        private onNext;
        private onBoxClick;
    }
}
declare namespace game.mod.daily {
    import UpdateItem = base.UpdateItem;
    class WanfaMdr extends MdrBase implements UpdateItem {
        private _view;
        private _listTaskData;
        private _wanfaCfgs;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        update(time: base.Time): void;
    }
}
