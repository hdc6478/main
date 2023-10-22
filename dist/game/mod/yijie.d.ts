declare namespace game.mod.yijie {
    class YijieView extends eui.Component {
        grp_eff: eui.Group;
        list_boss: eui.List;
        avatarNameItem: AvatarNameItem;
        btn_gift: Btn;
        btn_magic: Btn;
        btn_rule: Btn;
        btn_auction: Btn;
        btn_demon: Btn;
        timeItem: game.mod.TimeItem;
        grp_good: eui.Group;
        grp_goodCnt: eui.Group;
        grp_cnt: eui.Group;
        btn_reward: Btn;
        list_reward: eui.List;
        cost: CostIcon;
        btn_challenge: Btn;
        checkbox: eui.CheckBox;
        checkBoxNvpu: game.mod.XiuxianNvpuCheckBox;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YijieMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.yijie {
    import GameNT = base.GameNT;
    import HuanjingzhihaiGateConfig = game.config.HuanjingzhihaiGateConfig;
    import HuanjingzhihaiTypeConfig = game.config.HuanjingzhihaiTypeConfig;
    import HuanjingzhihaiBossConfig = game.config.HuanjingzhihaiBossConfig;
    import teammate = msg.teammate;
    class SeaProxy extends ProxyBase implements ISeaProxy {
        private _model;
        initialize(): void;
        c2s_huanjingzhihai_click(opType: number, index: number): void;
        private s2c_huanjingzhihai_info;
        private getInfo;
        type: number;
        rankType: number;
        bigGate: number;
        isEnter(type: number): boolean;
        getEnterCnt(type: number): number;
        getCurBigGate(type: number): number;
        getPassSmallGate(type: number): number;
        getSmallGate(type: number, bigGate: number): number;
        getMaxSmallGate(bigGate: number): number;
        isOpen(type: number, bigGate: number): boolean;
        isFinish(type: number, bigGate: number): boolean;
        getBigGateCfg(type: number, bigGate: number): HuanjingzhihaiTypeConfig;
        getSmallGateCfg(bigGate: number, smallGate: number): HuanjingzhihaiGateConfig;
        checkBigGateHint(type: number, bigGate: number): boolean;
        isRewardOpen(type: number): boolean;
        canRewardDraw(type: number): boolean;
        getNextTime(type: number): number;
        /** 本次挂机收益开始时间戳 */
        getStartTime(type: number): number;
        getHintType(type: number): string[];
        private updateHint;
        private updateEnterHint;
        private updateEnterHintByType;
        private getEnterHintType;
        private checkEnterHint;
        private updateRewardHint;
        private updateRewardHintByType;
        getRewardHintType(type: number): string[];
        private checkRewardHint;
        private updateFubenHint;
        private checkFubenHint;
        getFubenHintType(type: number): string[];
        protected onRoleUpdate(n: base.GameNT): void;
        protected onTaskHint(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        /********************************幻境boss**********************************/
        private s2c_huanjingzhihai_single_rank_info;
        isRankRewardDraw(type: number): boolean;
        getBossIndex(type: number): number;
        getBossHp(type: number): number;
        getBossStartIndex(type: number): number;
        getBossCfg(type: number, bossIndex: number): HuanjingzhihaiBossConfig;
        getMyRank(type: number): teammate;
        getRankList(type: number): teammate[];
        getTopRank(type: number): teammate;
        getMaxRank(type: number): number;
        getBossHintType(type: number): string[];
        private updateBossAttackHint;
        private checkBossAttackHint;
        getBossAttackHintType(type: number): string[];
        private updateRankHint;
        private checkRankHint;
        getRankHintType(type: number): string[];
        protected onUpdateGivingList(n: GameNT): void;
        private updateOrderHint;
        getOrderHintType(type: number): string[];
        /**能否开启排行榜，幻境系统有用到*/
        canOpenRank(): boolean;
    }
}
declare namespace game.mod.yijie {
    import YijieConfig = game.config.YijieConfig;
    import yijie_ui_info = msg.yijie_ui_info;
    import yijie_boss_data = msg.yijie_boss_data;
    import yongheng_ui_info = msg.yongheng_ui_info;
    import YonghengConfig = game.config.YonghengConfig;
    import yongheng_boss_data = msg.yongheng_boss_data;
    class YijieModel {
        bossCfgs: {
            [stage: number]: YijieConfig[];
        };
        bossInfos: yijie_ui_info[]; /**boss信息*/
        count: number;
        selState: boolean;
        memberNum: number;
        bossValue: number;
        bossList: yijie_boss_data[] | yongheng_boss_data[];
        bossHint: string[];
        curType: number;
        /************************************永恒异界****************************************/
        yonghengBossInfos: yongheng_ui_info[]; /**boss信息*/
        yonghengBossCfgs: {
            [stage: number]: YonghengConfig[];
        };
        yonghengCount: number;
        goodCount: number;
        selCfg: YonghengConfig;
        yonghengBossHint: string[];
    }
}
declare namespace game.mod.yijie {
    import YijieConfig = game.config.YijieConfig;
    import yijie_ui_info = msg.yijie_ui_info;
    import GameNT = base.GameNT;
    import yijie_boss_data = msg.yijie_boss_data;
    import YonghengConfig = game.config.YonghengConfig;
    import yongheng_ui_info = msg.yongheng_ui_info;
    import yongheng_boss_data = msg.yongheng_boss_data;
    class YijieProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_yijie_open_ui(): void;
        c2s_yijie_boss_challenge(stage: number): void;
        c2s_yijie_sanbei(): void;
        c2s_yijie_show_reward(): void;
        c2s_yijie_boss_info(): void;
        private s2c_yijie_open_ui_ret;
        private s2c_yijie_sanbei_ret;
        private s2c_yijie_update_date;
        private s2c_yijie_show_reward_ret;
        private s2c_yijie_boss_info_ret;
        private s2c_yijie_rate_boss_update;
        private s2c_yijie_boss_roll_point;
        /**boss信息*/
        getBossInfo(stage: number, type?: number): yijie_ui_info | yongheng_ui_info;
        private getBossCfgs;
        getBossList(type?: number): YijieConfig[] | YonghengConfig[];
        getBossCfg(stage: number, index: number, type?: number): YijieConfig | YonghengConfig;
        isBossOpen(cfg: YijieConfig | YonghengConfig, showTips?: boolean): boolean;
        readonly count: number;
        readonly selState: boolean;
        getCost(): number[];
        getCostInfo(): number[];
        readonly memberNum: number;
        readonly bossValue: number;
        getBossMaxValue(): number;
        readonly bossList: yijie_boss_data[] | yongheng_boss_data[];
        /**更新红点*/
        private updateBossHint;
        private checkBossHint;
        /** 通用背包事件监听 */
        protected onBagUpdateByPropIndex(n: GameNT): void;
        curType: number;
        /************************************永恒异界****************************************/
        c2s_yongheng_open_ui(): void;
        c2s_yongheng_boss_challenge(cfg: YonghengConfig): void;
        c2s_yongheng_show_reward(): void;
        c2s_yongheng_boss_info(): void;
        private s2c_yongheng_open_ui_ret;
        private s2c_yongheng_update_date;
        private s2c_yongheng_show_reward_ret;
        private s2c_yongheng_boss_info_ret;
        readonly yonghengCount: number;
        readonly goodCount: number;
        selCfg: YonghengConfig;
        /**更新红点*/
        private updateYonghengBossHint;
        private checkYonghengBossHint;
        /**============== 修仙女仆自动挂机 ==============*/
        private getCanAutoChallengeYijieCfg;
        private canAutoChallengeYijie;
        private sendAutoChallengeYijie;
        private checkAutoChallengeYijie;
        protected onOpenFuncInit(n: GameNT): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        private checkFuncOpen;
    }
}
declare namespace game.mod.yijie {
    class SeaBaseView extends eui.Component {
        grp_default: eui.Group;
        lab_tips1: eui.Label;
        lab_tips2: eui.Label;
        grp_task: eui.Group;
        group_eft: eui.Group;
        lab_task: eui.Label;
        redPoint: eui.Image;
        lab_desc: eui.Label;
        img_icon1: eui.Image;
        img_icon2: eui.Image;
        img_icon3: eui.Image;
        btn_enter: Btn;
        grp_enter: eui.Group;
        btn_reward: Btn;
        item1: SeaFubenItem;
        item2: SeaFubenItem;
        item3: SeaFubenItem;
        item4: SeaFubenItem;
        item5: SeaFubenItem;
        btn1: Btn;
        btn2: Btn;
        btn3: Btn;
        btn_boss: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class SeaBossPosItem extends BaseListenerRenderer {
        lab_index: eui.Label;
        btn_reward: game.mod.Btn;
        data: number;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.yijie {
    class SeaBossSceneView extends eui.Component {
        img_bg: eui.Image;
        grp_monster: eui.Group;
        shenling0: SeaShenlingItem;
        shenling1: SeaShenlingItem;
        shenling2: SeaShenlingItem;
        shenling3: SeaShenlingItem;
        grp_player: eui.Group;
        constructor();
        private _infos;
        private _posXList;
        setIndex(pos: number, index: number): void;
        getInfos(): {
            [pos: number]: number;
        };
        getIndex(pos: number): number;
        setPosX(pos: number, posX: number): void;
        getPosX(pos: number): number;
    }
}
declare namespace game.mod.yijie {
    class SeaBossView extends eui.Component {
        scr: eui.Scroller;
        scene1: SeaBossSceneView;
        scene2: SeaBossSceneView;
        timeItem: TimeItem;
        item0: SeaBossPosItem;
        item1: SeaBossPosItem;
        item2: SeaBossPosItem;
        item3: SeaBossPosItem;
        item4: SeaBossPosItem;
        head: Head;
        lab_name: eui.Label;
        btn_rank: game.mod.Btn;
        grp_gift: eui.Group;
        lab_gift: eui.Label;
        btn_gift: game.mod.Btn;
        btn_ling: game.mod.Btn;
        btn_rule: game.mod.Btn;
        bar: game.mod.ProgressBarComp;
        grp_eff: eui.Group;
        grp_eff_shenling0: eui.Group;
        grp_eff_shenling1: eui.Group;
        grp_eff_shenling2: eui.Group;
        grp_eff_shenling3: eui.Group;
        btn_attack: game.mod.Btn;
        lab_tips: eui.Label;
        costItem: TopCoinItem;
        constructor();
    }
}
declare namespace game.mod.yijie {
    import HuanjingzhihaiTypeConfig = game.config.HuanjingzhihaiTypeConfig;
    class SeaFubenItem extends BaseListenerRenderer {
        lab_name: eui.Label;
        btn_item: game.mod.Btn;
        img_lock0: eui.Image;
        img_lock: eui.Image;
        icon: Icon;
        private _isOpen;
        private _isFinish;
        data: HuanjingzhihaiTypeConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.yijie {
    class SeaFubenView extends eui.Component {
        avatarNameItem: AvatarNameItem;
        icon: game.mod.Icon;
        bar: game.mod.ProgressBarComp;
        seaRewardItem: SeaRewardItem;
        lab_gate: eui.Label;
        list_reward: eui.List;
        grp_font: eui.Group;
        btn_challenge: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class SeaRewardItem extends eui.ItemRenderer {
        private cost1;
        private cost2;
        data: number[][];
        protected dataChanged(): void;
        private updateShow;
        setData(data: number[][]): void;
    }
}
declare namespace game.mod.yijie {
    class SeaRewardView extends eui.Component {
        secondPop: SecondPop;
        seaRewardItem: SeaRewardItem;
        list_reward: eui.List;
        lab_tips: eui.Label;
        btn_draw: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        group_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class SeaSceneView extends eui.Component {
        lab_time: eui.Label;
        lab_damage: eui.Label;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class SeaShenlingItem extends eui.Component {
        grp_shenling: eui.Group;
        starListView: StarListView;
    }
}
declare namespace game.mod.yijie {
    class SeaTaskView extends eui.Component {
        secondPop: SecondPop;
        list_task: eui.List;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class SeaView extends eui.Component {
        btn_sea1: Btn;
        btn_sea2: Btn;
        btn_sea3: Btn;
        btn_sea4: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    import yijie_boss_data = msg.yijie_boss_data;
    import yongheng_boss_data = msg.yongheng_boss_data;
    class YijieBossItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_rate: eui.Image;
        lab_name: eui.Label;
        lab_belong: eui.Label;
        bar: ProgressBarComp;
        lab_tips: eui.Label;
        btn_attack: game.mod.Btn;
        private _proxy;
        private _sceneProxy;
        data: yijie_boss_data | yongheng_boss_data;
        protected onAddToStage(): void;
        private onClick;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.yijie {
    class YijieBossListView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YijieBossView extends eui.Component {
        grp_eff: eui.Group;
        btn_goto: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    import YijieConfig = game.config.YijieConfig;
    import YonghengConfig = game.config.YonghengConfig;
    class YijieItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        img_lock: eui.Image;
        img_type1: eui.Image;
        img_type2: eui.Image;
        timeItem: game.mod.TimeItem;
        redPoint: eui.Image;
        data: YijieConfig | YonghengConfig;
        private _info; /**当前boss*/
        protected dataChanged(): void;
        updateTime(): void;
    }
}
declare namespace game.mod.yijie {
    import teammate = msg.teammate;
    class YijieLuckyItem extends eui.ItemRenderer {
        private lab_name;
        data: teammate;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.yijie {
    class YijieLuckyView extends eui.Component {
        secondPop: SecondPop;
        icon: Icon;
        lab_name: eui.Label;
        lab_first: eui.Label;
        lab_point: eui.Label;
        btn_reward: Btn;
        lab_tips: eui.Label;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YijieResultView extends eui.Component {
        lab_tips: eui.Label;
        resultReward: ResultReward;
        lab_act: eui.Label;
        lab_goto: eui.Label;
        closeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YijieSceneView extends eui.Component {
        lab_lucky: eui.Label;
        lab_cnt: eui.Label;
        cost: CostIcon;
        grp_gift: eui.Group;
        lab_add: eui.Label;
        btn_gift: Btn;
        img_tips: eui.Image;
        btn_reward: Btn;
        btn_rateBoss: Btn;
        bar: game.mod.ProgressBarComp;
        btn_boss: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    import huanjinzhihai_quyu_shuju = msg.huanjinzhihai_quyu_shuju;
    import s2c_huanjingzhihai_single_rank_info = msg.s2c_huanjingzhihai_single_rank_info;
    class SeaModel {
        type: number;
        bigGate: number;
        infoList: {
            [type: number]: huanjinzhihai_quyu_shuju;
        };
        maxSmallGate: {
            [bigGate: number]: number;
        };
        hintType: {
            [type: number]: string[];
        };
        enterHintType: {
            [type: number]: string[];
        };
        rewardHintType: {
            [type: number]: string[];
        };
        fubenHintType: {
            [type: number]: string[];
        };
        openIdxList: {
            [type: number]: number;
        };
        timeEventTypeList: {
            [type: number]: number;
        };
        rankType: number;
        rankList: {
            [type: number]: s2c_huanjingzhihai_single_rank_info;
        };
        bossHintType: {
            [type: number]: string[];
        };
        bossAttackHintType: {
            [type: number]: string[];
        };
        rankHintType: {
            [type: number]: string[];
        };
        orderHintType: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.yijie {
    class YonghengYijieOpenView extends eui.Component {
        list_reward: eui.List;
        timeItem: game.mod.TimeItem;
        btn_challenge: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YonghengYijieSceneView extends eui.Component {
        lab_lucky: eui.Label;
        lab_goodCnt: eui.Label;
        lab_cnt: eui.Label;
        lab_guild: eui.Label;
        cost: CostIcon;
        btn_reward: Btn;
        btn_demon: Btn;
        timeItem: game.mod.TimeItem;
        btn_boss: Btn;
        constructor();
    }
}
declare namespace game.mod.yijie {
    class YijieMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.yijie {
    class SeaBaseMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _canEnter;
        private _itemList;
        private _fuchenlinghuHint;
        private _huanjingMainHint;
        private _huanjingGrowMainHint;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickTask;
        private onClickEnter;
        private onClickReward;
        private onClickBoss;
        private onClick1;
        private onClick2;
        private onClick3;
        private onRoleUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private onTaskUpdate;
        private initShow;
        private updateView;
        private updateDefault;
        private updateEnter;
        private updateHint;
        private updateRewardHint;
        private updateBossHint;
        private updateTaskHint;
        private updateLinghuHint;
        private updateHuanjingMainHint;
        private updateHuanjingGrowMainHint;
    }
}
declare namespace game.mod.yijie {
    class SeaBossMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        private initBtnList;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class SeaBossMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _lastIndex;
        private _effId;
        private _eftId_player;
        private _playingMove;
        private _playingAttack;
        private _attackTime;
        private _moveCnt;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRank;
        private onClickGift;
        private onClickLing;
        private onClickRule;
        private onClickAttack;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private onInfoUpdate;
        private initShow;
        private reqRankInfo;
        private updateGiftTips;
        private setGiftTips;
        private updateItemList;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
        updateTopRank(): void;
        private updateHint;
        private updateRankHint;
        private updateOrderHint;
        private updateScene;
        private removeAttackEft;
        private playAttack;
        private playRoleStand;
        private playShenlingStand;
        private playShenlingAttack;
        private playMove;
        private playShenlingMove;
        private playSceneMove;
        private resetMoveData;
        private onMoveEnd;
        private setBossVisible;
        private setSceneVisible;
    }
}
declare namespace game.mod.yijie {
    class SeaFubenMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        private initBtnList;
        private checkHide;
    }
}
declare namespace game.mod.yijie {
    class SeaFubenMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickChallenge;
        private updateShow;
    }
}
declare namespace game.mod.yijie {
    class SeaMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.yijie {
    class SeaMdr extends MdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSea1;
        private onClickSea2;
        private onClickSea3;
        private checkSea;
        private onClickSea4;
        private updateShow;
        private updateSea;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateHint;
        private updateSeaHint;
    }
}
declare namespace game.mod.yijie {
    class SeaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        /**更新list数据*/
        protected updateBtnList(): void;
        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class SeaRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _canDraw;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickReward;
        private reqRankInfo;
        private initShow;
        private updateShow;
        private updateReward;
        update(time: base.Time): void;
        private updateTime;
        private onClickRank;
    }
}
declare namespace game.mod.yijie {
    class SeaRankSectionMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        _showArgs: {
            start: number;
            end: number;
        };
        private _start;
        private _end;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateRank;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class SeaRewardMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDraw;
        private updateShow;
        private updateState;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class SeaSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onDamageUpdate;
        update(time: base.Time): void;
        private updateTime;
        private updateDamage;
    }
}
declare namespace game.mod.yijie {
    class SeaTaskMdr extends MdrBase {
        private _view;
        private _taskList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private updateTaskList;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class YijieBossListMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: number;
        private _type;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**更新boss*/
        private updateBoss;
        update(time: base.Time): void;
        private reqBossInfo;
    }
}
declare namespace game.mod.yijie {
    import s2c_yijie_rate_boss_update = msg.s2c_yijie_rate_boss_update;
    class YijieBossMdr extends EffectMdrBase {
        private _view;
        private _sceneProxy;
        private _proxy;
        private _effId;
        _showArgs: s2c_yijie_rate_boss_update;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoto;
        private updateBoss;
    }
}
declare namespace game.mod.yijie {
    import s2c_yijie_boss_roll_point = msg.s2c_yijie_boss_roll_point;
    import UpdateItem = base.UpdateItem;
    class YijieLuckyMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _showPoint;
        private _time;
        private readonly TIME_TICK;
        private _itemList;
        _showArgs: s2c_yijie_boss_roll_point;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickReward;
        private changeShowPoint;
        private updateReward;
        private updateViewState;
        /**显示点数*/
        private updateInfo;
        private updateTime;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class YijieMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _selIndex; /**当前选中的boss*/
        private _selCfg; /**当前选中的配置*/
        private _selInfo; /**当前选中的boss*/
        private _effId;
        private _lastIndex;
        private _itemList;
        private _bossList;
        private _costIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBoss;
        private onClickGift;
        private onClickReward;
        private onClickMagic;
        private onClickRule;
        private onClickChallenge;
        private onClickCheckbox;
        private onInfoUpdate;
        private onSelUpdate;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private updateItemList;
        private indexUpdateInfo;
        private updateBoss;
        private updateReward;
        private updateCount;
        private updateSel;
        private updateCost;
        private reqBossInfo;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.yijie {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class YijieResultMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoto;
        private updateReward;
        private updateShow;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.yijie {
    class YijieSceneMdr extends MdrBase {
        private _view;
        private _proxy;
        private _costIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGift;
        private onClickReward;
        private onClickRateBoss;
        private onClickBoss;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private updateGiftTips;
        private setGiftTips;
        private removeTipsTween;
        private updateInfo;
        private updateCost;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class YonghengYijieMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _dailyLimitTimeActProxy;
        private _selIndex; /**当前选中的boss*/
        private _selCfg; /**当前选中的配置*/
        private _selInfo; /**当前选中的boss*/
        private _effId;
        private _lastIndex;
        private _itemList;
        private _bossList;
        private _costIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBoss;
        private onClickReward;
        private onClickAuction;
        private onClickDemon;
        private onClickChallenge;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private updateItemList;
        private indexUpdateInfo;
        private updateBoss;
        private updateReward;
        private updateCount;
        private updateCost;
        private reqBossInfo;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.yijie {
    import YonghengConfig = game.config.YonghengConfig;
    import UpdateItem = base.UpdateItem;
    class YonghengYijieOpenMdr extends MdrBase implements UpdateItem {
        private _view;
        private _sceneProxy;
        private _proxy;
        private _dailyLimitTimeActProxy;
        private _itemList;
        private _selCfg; /**当前选中的配置*/
        _showArgs: YonghengConfig;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private onClickChallenge;
        private updateReward;
        update(time: base.Time): void;
        private updateTime;
        private updateOpen;
    }
}
declare namespace game.mod.yijie {
    import UpdateItem = base.UpdateItem;
    class YonghengYijieSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _dailyLimitTimeActProxy;
        private _costIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGuild;
        private onClickReward;
        private onClickDemon;
        private onClickBoss;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private onInfoUpdate;
        private initShow;
        private updateInfo;
        private updateCost;
        update(time: base.Time): void;
        private updateTime;
        private updateOpen;
        private updateView;
    }
}
