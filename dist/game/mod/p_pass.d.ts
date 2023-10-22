declare namespace game.mod.pass {
    class WorldMapBtnItem extends mod.Btn {
        img_bg: eui.Image;
        lab_title: eui.Label;
        lab_idx: eui.Label;
        constructor();
        isSelect: boolean;
    }
}
declare namespace game.mod.pass {
    class PassMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.pass {
    import GameNT = base.GameNT;
    import WorldmapConfig = game.config.WorldmapConfig;
    import QiyuanConfig = game.config.QiyuanConfig;
    import task_data = msg.task_data;
    class PassProxy extends ProxyBase implements IPassProxy {
        private _model;
        private _tmpIdx;
        getModel(): PassModel;
        initialize(): void;
        s2c_mainline_first_lose(n: GameNT): void;
        /**打开闯关界面*/
        c2s_mainline_open_ui(): void;
        private s2c_mainline_open_ui;
        /**排行榜*/
        c2s_mainline_rank(): void;
        private s2c_mainline_rank;
        /**大神榜*/
        c2s_mainline_rank_server_award(): void;
        private s2c_mainline_rank_server_award;
        /**大神榜领奖*/
        c2s_mainline_rank_award(idx: number): void;
        private s2c_mainline_rank_award;
        /**开始战斗*/
        c2s_mainline_enter(): void;
        /** 场景信息 */
        private s2c_mainline_challenge_stage;
        challengeBoss: boolean;
        /** 自动闯关 */
        c2s_mainline_task_auto(bool: boolean): void;
        /**
         * 世界地图请求
         * @param idx
         */
        c2s_mainline_wroldmap(idx: number): void;
        private s2c_mainline_wroldmap;
        /**
         * 世界地图详情请求
         * @param idx
         */
        c2s_mainline_topthree(idx: number): void;
        private s2c_mainline_topthree;
        /**
         * 副本奇缘挑战请求
         * @param idx
         */
        c2s_qiyuan_enter(idx: number): void;
        private s2c_qiyuan_award;
        updateWorldMapHint(): void;
        /**
         * 地图红点
         * @param idx 地图id
         * @returns
         */
        getWorldMapHint(cfg: WorldmapConfig): boolean;
        readonly passNextIdx: number;
        readonly passSceneChan: number;
        readonly passMaxIdx: number;
        passIsAuto: boolean;
        readonly target_wave_cnt: number;
        readonly now_wave_cnt: number;
        curIndex: number;
        changeIdxToNum(idx: number): number;
        getChapterByIdx(chapterIdx: number): number;
        isCurChapter(mapCfg: WorldmapConfig): boolean;
        /**
         * 是否已通关指定章节
         * @param mapCfg
         * @returns
         */
        isPass(mapCfg: WorldmapConfig): boolean;
        getStepByIdx(stepIdx: number): number;
        /**闯关关卡数*/
        readonly curStep: number;
        getIndexByCfgIndex(index: number): number;
        private onUpdateHint;
        protected onTaskUpdate(n: base.GameNT): void;
        c2s_preview(index: number): void;
        private s2c_preview_online_request;
        private s2c_preview_ret;
        getShowIndex(): number;
        getIcon(index: number): string;
        getOpenTxt(index: number): string;
        checkBought(index: number): boolean;
        private onUpdateHintOfPreview;
        /**主页展示功能预览 */
        onCheckMainShow(): boolean;
    }
    interface IPassWorldMapData {
        cfg: WorldmapConfig;
        isCurMap: boolean;
        isPass: boolean;
        hint: boolean;
    }
    interface IPassQiyuanData {
        cfg: QiyuanConfig;
        task: task_data;
        state: number;
        isFinish: boolean;
        isInStep: boolean;
        desc: string;
    }
}
declare namespace game.mod.pass {
    class PassBossTipView extends eui.Component {
        img_bg: eui.Image;
        group_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.pass {
    class PassGodRankRander extends BaseListenerRenderer {
        lab_title: eui.Label;
        role_head: game.mod.Head;
        lab_role_name: eui.Label;
        btn_see: game.mod.Btn;
        list_reward: eui.List;
        btn_get: game.mod.Btn;
        private _proxy;
        private _model;
        private _awdDatas;
        private _info;
        private _cfg;
        protected createChildren(): void;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onBtnSeeClick;
        private onBtnGetClick;
    }
}
declare namespace game.mod.pass {
    class PassGodRankView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.pass {
    class PassNode extends BaseRenderer {
        grp_eff: eui.Group;
        grp_1: eui.Group;
        grp_2: eui.Group;
        grp_touch: eui.Group;
        grp_font: eui.Group;
        img_sel: eui.Image;
        img_state: eui.Image;
        lab_name: eui.Label;
        /**
         * 关卡，1，2...
         */
        step: number;
        private _state;
        private _isSnode;
        constructor();
        isSnode: boolean;
        /**
        * 状态
        * @param 0-未完成，1-进行中，2-已通关
        * @return
        */
        state: number;
    }
}
declare namespace game.mod.pass {
    import RankRoleInfo = msg.rank_role_info;
    class PassRankRander extends BaseRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        lab_rank: eui.Label;
        lab_role_name: eui.Label;
        lab_power: eui.Label;
        lab_step: eui.Label;
        grp_eff: eui.Group;
        data: RankRoleInfo;
        private _proxy;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.pass {
    class PassRankView extends eui.Component {
        gr_gz_eff: eui.Group;
        scr: eui.Scroller;
        list: eui.List;
        lab_my_rank: eui.Label;
        lab_my_step: eui.Label;
        btn_record: game.mod.Btn;
        grp_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.pass {
    import Component = eui.Component;
    class PassView extends Component {
        btn_rank: game.mod.Btn;
        btn_preview: game.mod.Btn;
        lab_open: eui.Label;
        node0: game.mod.pass.PassNode;
        node1: game.mod.pass.PassNode;
        node2: game.mod.pass.PassNode;
        node3: game.mod.pass.PassNode;
        node4: game.mod.pass.PassNode;
        node5: game.mod.pass.PassNode;
        node6: game.mod.pass.PassNode;
        node7: game.mod.pass.PassNode;
        node8: game.mod.pass.PassNode;
        node9: game.mod.pass.PassNode;
        snode0: game.mod.pass.PassNode;
        snode1: game.mod.pass.PassNode;
        snode2: game.mod.pass.PassNode;
        snode3: game.mod.pass.PassNode;
        snode4: game.mod.pass.PassNode;
        snode5: game.mod.pass.PassNode;
        snode6: game.mod.pass.PassNode;
        snode7: game.mod.pass.PassNode;
        snode8: game.mod.pass.PassNode;
        list_reward: eui.List;
        lab_step_name: eui.Label;
        lab_condition: eui.Label;
        btn_fight: game.mod.Btn;
        grp_boss: eui.Group;
        grp_bg: eui.Group;
        btn_ling: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.pass {
    import PreviewConfig = game.config.PreviewConfig;
    class PreviewItem extends BaseRenderer {
        private _proxy;
        private icon;
        private lab;
        private img_name;
        private img_gray;
        private img_bg;
        private redPoint;
        data: PreviewConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.pass {
    class PreviewView extends eui.Component {
        list: eui.List;
        list_rewards: eui.List;
        btn_get: Btn;
        btn_jump: Btn;
        btn_lock: Btn;
        img_state: eui.Image;
        constructor();
    }
}
declare namespace game.mod.pass {
    class QiyuanDetail1View extends eui.Component {
        secondPop: game.mod.SecondPop;
        awd_icon: Icon;
        pro_awd: ProgressBarComp;
        lab_desc: eui.Label;
        lab_awd_title: eui.Label;
        list_reward: eui.List;
        btn_fight: game.mod.Btn;
        recommendPower: RecommendPower;
        constructor();
    }
}
declare namespace game.mod.pass {
    class QiyuanDetail2View extends eui.Component {
        lab_desc: eui.Label;
        list_reward: eui.List;
        cost: game.mod.CostIcon;
        lab_tip: eui.Label;
        btn_get: game.mod.Btn;
        lab_task: eui.Label;
        constructor();
    }
}
declare namespace game.mod.pass {
    class QiyuanFightView extends eui.Component {
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        img_hp1: eui.Image;
        head1: game.mod.Head;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        img_hp2: eui.Image;
        head2: game.mod.Head;
        constructor();
    }
}
declare namespace game.mod.pass {
    class QiyuanItem extends eui.ItemRenderer {
        progress: eui.Image;
        progressbar: eui.Image;
        lab_step: eui.Label;
        btn: QiyuanItemBtn;
        private _isFinish;
        private _isInStep;
        constructor();
        isFinish: boolean;
        readonly isInStep: boolean;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.pass {
    class QiyuanItemBtn extends Btn {
        img_icon: eui.Image;
        lab_desc: eui.Label;
        img_finish: eui.Image;
        img_black: eui.Image;
        redPoint: eui.Image;
        constructor();
        isFinish: boolean;
        setData(value: IPassQiyuanData): void;
    }
}
declare namespace game.mod.pass {
    class QiyuanView extends eui.Component {
        scr: eui.Scroller;
        check: eui.CheckBox;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.pass {
    class WorldMapBoxAwdView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_reward: eui.List;
        lab_tip: eui.Label;
        btn_get: mod.Btn;
        constructor();
    }
}
declare namespace game.mod.pass {
    import WorldmapConfig = game.config.WorldmapConfig;
    class WorldMapBtn extends BaseRenderer {
        btn_bg: WorldMapBtnItem;
        btn_box: game.mod.Btn;
        grp_eff: eui.Group;
        isCurMap: boolean;
        private _mapCfg;
        private _hasAward;
        private _isSelect;
        constructor();
        readonly mapCfg: WorldmapConfig;
        readonly hasAward: boolean;
        setData(mapCfg: WorldmapConfig): void;
        setBox(show: boolean, hint: boolean): void;
        isSelect: boolean;
    }
}
declare namespace game.mod.pass {
    import WorldmapConfig = game.config.WorldmapConfig;
    import mainline_rank_award_info = msg.mainline_rank_award_info;
    import mainline_topthree_info = msg.mainline_topthree_info;
    import qiyuan_raid_data = msg.qiyuan_raid_data;
    class PassModel {
        /** 当前关卡id */
        curIndex: number;
        maxMainlineIdx: number;
        curChallengeIdx: number;
        targetWaveCnt: number;
        nowWaveCnt: number;
        passIsAuto: boolean;
        worldMapAwardGotIds: number[];
        worldMapTopInfos: {
            [idx: string]: mainline_topthree_info[];
        };
        worldMapCurTaskId: number;
        curWorldMapCfg: WorldmapConfig;
        curTotalStep: number;
        startIdx: number;
        endIdx: number;
        godRankInfos: {
            [idx: string]: mainline_rank_award_info;
        };
        godRankAwdGotIds: number[];
        qyFbFinishIds: number[];
        qyFbTotalAwdCnt: number;
        qyFbGotsAwdCnt: number;
        WMBoxRewardHint: string[];
        readonly curStep: number;
        challengeBoss: boolean;
        list: qiyuan_raid_data[];
        indexs: number[];
        index: number;
    }
}
declare namespace game.mod.pass {
    class WorldMapContent extends BaseRenderer {
        img_bg: eui.Image;
        private readonly _cityCnt;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
        private onBtnGetClick;
    }
}
declare namespace game.mod.pass {
    class WorldMapDetailView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lab_chapter_name: eui.Label;
        lab_step: eui.Label;
        grp_role1: eui.Group;
        grp_role2: eui.Group;
        grp_role3: eui.Group;
        head1: game.mod.Head;
        head2: game.mod.Head;
        head3: game.mod.Head;
        lab_role_name1: eui.Label;
        lab_role_name2: eui.Label;
        lab_role_name3: eui.Label;
        lab_desc: eui.Label;
        cost1: game.mod.CostIcon;
        cost2: game.mod.CostIcon;
        cost3: game.mod.CostIcon;
        img_no_qy: eui.Image;
        img_no_awd: eui.Image;
        list_qiyuan: eui.List;
        list_reward0: eui.List;
        list_reward: eui.List;
        lab_open_tip: eui.Label;
        constructor();
    }
}
declare namespace game.mod.pass {
    class WorldMapOfflineIcon extends BaseListenerRenderer {
        img_cost: eui.Image;
        lab_cost: eui.Label;
        /**消耗道具【index, count】*/
        private _cost;
        constructor();
        protected onAddToStage(): void;
        /**点击弹出道具tips*/
        protected onClick(): void;
        protected dataChanged(): void;
        /**设置图标*/
        imgCost: string;
        /**设置数值*/
        setLabCost(str: string, color?: number): void;
        /**设置消耗显示，一般会配置一个数组【index，count】*/
        updateShow(cost: number[]): void;
    }
}
declare namespace game.mod.pass {
    class WorldMapQiyuanIcon extends eui.ItemRenderer {
        img_icon: eui.Image;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.pass {
    class WorldMapView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        btn_left: game.mod.Btn;
        btn_right: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.pass {
    class PassBossTipMdr extends EffectMdrBase {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateData(): void;
        private over;
        closeUI(): void;
    }
}
declare namespace game.mod.pass {
    class PassGodRankMdr extends MdrBase {
        private _view;
        private _coll;
        constructor();
        protected onInit(): void;
        protected onHide(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateData;
    }
}
declare namespace game.mod.pass {
    class PassMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.pass {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import UpdateItem = base.UpdateItem;
    class PassMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _model;
        private _curNode;
        private _cfgs;
        private _rewardDatas;
        private readonly passNum;
        constructor(parent: DisplayObjectContainer);
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        update(time: base.Time): void;
        protected onHide(): void;
        private updateData;
        private updateCurStep;
        private updateOther;
        private onNode;
        private onBtnRank;
        private onBtnFight;
        private onBtnPreview;
        private onBtnLing;
    }
}
declare namespace game.mod.pass {
    class PassRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.pass {
    import GameNT = base.GameNT;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class PassRankMdr extends EffectMdrBase {
        private _view;
        private _coll;
        private _proxy;
        constructor(parent: DisplayObjectContainer);
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateRankInfo(n: GameNT): void;
        private openGodRank;
    }
}
declare namespace game.mod.pass {
    class PreviewMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.pass {
    class PreviewMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cfg;
        private _selectIndex;
        private _listData;
        private _listRewards;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitTab;
        private onUpdateTab;
        private onUpdateList;
        private onUpdateSelect;
        private onUpdateIndex;
        private onClickSelect;
        private onUpdateView;
        private onClick;
        private onJump;
        private onClickFight;
    }
}
declare namespace game.mod.pass {
    class QiyuanDetail1Mdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _cfg;
        private _fbCfg;
        private _rewardDatas;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateData(): void;
        private onFightBtnClick;
    }
}
declare namespace game.mod.pass {
    class QiyuanDetail2Mdr extends MdrBase {
        private _view;
        private _proxy;
        private _data;
        private _tasCfg;
        private _rewardDatas;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateData(): void;
        private updateTask;
        private onGetBtnClick;
    }
}
declare namespace game.mod.pass {
    import UpdateItem = base.UpdateItem;
    class QiyuanFightMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private readonly HP_WIDTH;
        private readonly ALL_HP;
        private self;
        private boss;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        update(time: base.Time): void;
        private onUpdateInfo;
        private onUpdateRandomHP;
        protected onOver(): void;
    }
}
declare namespace game.mod.pass {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class QiyuanMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _cfgs;
        private _offHight;
        private _itemDatas;
        private _isChecked;
        constructor(parent: DisplayObjectContainer);
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateData;
        private onTaskUpdate;
        private onClickItem;
        private onCheckChange;
    }
}
declare namespace game.mod.pass {
    class WorldMapBoxAwdMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _cfg;
        private _rewardDatas;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onBtnClick;
    }
}
declare namespace game.mod.pass {
    class WorldMapDetailMdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _cfg;
        private _isOpen;
        private _qiyuanDatas;
        private _rewardDatas0;
        private _rewardDatas;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateData(): void;
        private onHeadClick;
        private onQyClick;
    }
}
declare namespace game.mod.pass {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class WorldMapMdr extends MdrBase {
        private _view;
        private _listData;
        private _proxy;
        private _cfgs;
        private _showIdx;
        private _len;
        constructor(p: DisplayObjectContainer);
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateData;
        protected onHide(): void;
        private scrollMap;
        private onLast;
        private onNext;
        private onScroll;
        private onLimitIdx;
    }
}
