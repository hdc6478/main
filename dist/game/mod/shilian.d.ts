declare namespace game.mod.shilian {
    class YuanLingTeamItem extends BaseListenerRenderer {
        head: game.mod.HeadVip;
        lb_name: eui.Label;
        lb_power: eui.Label;
        btn_do: game.mod.Btn;
        lb_state: eui.Label;
        gr_invite: eui.Group;
        btn_cancel: game.mod.Btn;
        btn_ok: game.mod.Btn;
        lb_diff: eui.Label;
        img_zhanli: eui.Image;
        protected _proxy: YuanLingProxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    class YuanLingTeamItem2 extends YuanLingTeamItem {
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickCancel;
        /**
         * 如果点击接受的队伍已经开了或者满了，则会提示队伍已不存在，服务端飘字提示。
         * 前端不管服务端如何处理，不论是加入队伍还是不给加入队伍，都删除这条信息。
         * （若是加入队伍成功，就会跳到组队界面，全部被邀请信息都会清空了）
         */
        private onClickOk;
    }
}
declare namespace game.mod.shilian {
    class YuanLingSceneView extends eui.Component {
        list_player: eui.List;
        lb_pass: eui.Label;
        lb_nextLv: eui.Label;
        gr_eft: eui.Group;
        lb_time: eui.Label;
        list_buff: eui.List;
        constructor();
    }
}
declare namespace game.mod.shilian {
    import GameNT = base.GameNT;
    import material_item = msg.material_item;
    import forbidden_item = msg.forbidden_item;
    import forbidden_reward_list = msg.forbidden_reward_list;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import xiantower_info = msg.xiantower_info;
    import XiantaSceneConfig = game.config.XiantaSceneConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    class ShilianProxy extends ProxyBase implements IShilianProxy {
        private _model;
        onStartReconnect(): void;
        initialize(): void;
        c2s_material_enter(type: number): void;
        c2s_material_reset(type: number): void;
        c2s_material_sweep(type: number): void;
        private s2c_material_update;
        private getInfoPos;
        /**副本信息*/
        getFubenInfo(type: number): material_item;
        private s2c_material_lvl;
        readonly type: number;
        readonly lv: number;
        readonly totalCount: number;
        selType: number;
        private s2c_material_skip;
        readonly stLv: number;
        readonly endLv: number;
        resetLvInfo(): void;
        /**默认道具index*/
        getPropIndex(type: number): number;
        isFubenOpen(type: number, showTips?: boolean): boolean;
        readonly typeList: number[];
        getPrivilegeAdd(cfg: NewPrivilegeConfig, type: number): number;
        /**挑战红点类型*/
        getChallengeHintType(type: number): string[];
        /**重置红点类型*/
        getResetHintType(type: number): string[];
        /**更新红点*/
        private updateFubenHint;
        /**更新挑战红点*/
        private updateAllChallengeHint;
        private updateChallengeHint;
        private checkChallengeHint;
        /**更新重置红点*/
        private updateAllResetHint;
        private updateResetHint;
        private checkResetHint;
        protected onRoleUpdate(n: base.GameNT): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        /************************** 禁地副本 *************************/
        /**
         * 禁地副本基本信息
         */
        private s2c_forbidden_update;
        /**
         * 取禁地信息
         */
        c2s_forbidden_get_info(): void;
        /**
         * 通关大奖推送
         */
        private s2c_forbidden_reward;
        private updateFbdHasDrawAwds;
        hasDrawAwds(index: number, id: number): boolean;
        /**
         * 领取通关大奖
         * @param bigGateId
         * @param smallGateId
         */
        c2s_get_reward(bigGateId: number, smallGateId: number): void;
        /**
         * 进入挑战
         * @param type
         */
        c2s_forbidden_enter(type: number): void;
        /**
         * 请求扫荡
         */
        c2s_forbidden_sweep(type: number): void;
        /**
         * 指定类型禁地副本是否已开启
         * @param type
         */
        isFbdTypeOpen(type: number, showTips?: boolean): boolean;
        getFbdTypes(): ForbiddenType[];
        getFbdInfo(type: number): forbidden_item;
        /**
         * 取通关大奖
         * @param type
         * @param bigGateId
         * @returns
         */
        getFbdAwd(type: number): forbidden_reward_list[];
        /**
         * 取通关大奖
         * @param type
         * @param bigGateId
         * @returns
         */
        getFbdAwd2(type: number, bigGateId: number): forbidden_reward_list[];
        getFbdFubenCfgByType(type: number): {
            [bigGateId: string]: ForbiddenFubenConfig;
        };
        /**
         * 取指定类型的第一个禁地副本配置
         * @param type
         * @returns
         */
        getFbdFirstFubenCfg(type: number): ForbiddenFubenConfig;
        /**
         * 取当前已通关的最大小关卡id
         * @param type
         * @param bigGateId
         */
        getCurSmallGateId(type: number, bigGateId: number): number;
        /**
         * 取领取通关大奖需完成的小关卡数量
         * @param bigGateId
         * @param curSmallGateId
         * @returns
         */
        getBigAwdCondition(bigGateId: number, curSmallGateId: number): number;
        /**
         * 取最近的可领取的通关大奖配置（已领取的排除）
         * @param bigGateId
         * @returns
         */
        getNearBigAwdCfg(bigGateId: number): ForbiddenGateConfig;
        /**
         * 每大关的最后一小关配置（扫荡奖励等用）
         * @param bigGateId
         * @returns
         */
        getGateEndCfg(bigGateId: number): ForbiddenGateConfig;
        /**
         * 大关卡是否已通关
         * @param bigGateId
         * @returns
         */
        isBigGateFinished(type: number, bigGateId: number): boolean;
        isFinishByType(type: number): boolean;
        /**
         * 已通关最后一小关卡
         */
        readonly isEndSmallGate: boolean;
        /**
         * 是否为最后一小关卡
         */
        isEndSmallGate2(bigGateId: number, curSmallGateId: number): boolean;
        /**
         * 有无大奖可领取
         * @param type
         * @returns
         */
        hasBigAwd(type: number, bigGateId: number): boolean;
        /**
         * 取剩余扫荡次数
         * @param type
         */
        getSaodangTimes(type: number): number;
        private updateFbdHint;
        getFbdTypeHint(type: number): boolean;
        getSaodangHint(type: number): boolean;
        getChallengeHint(type: number): boolean;
        curFbdType: ForbiddenType;
        curFbdBigGateId: number;
        /********************************仙塔副本*********************************/
        c2s_challenge_xiantower(type: number): void;
        c2s_xiantower_sweep(type: number): void;
        c2s_xiantower_get_rewards(type: number): void;
        private s2c_xiantower_info;
        private getXiantaInfoPos;
        /**副本信息*/
        getXiantaInfo(type: number): xiantower_info;
        getXiantaBigRewardCfg(type: number): XiantaSceneConfig;
        isXiantaOpen(type: number, showTips?: boolean): boolean;
        selXiantaType: number;
        /**仙塔只显示退出按钮，满级或者小于推荐战力*/
        isXiantaShowExit(): boolean;
        /**红点*/
        getXiantaHint(type: number): boolean;
        /**挑战红点类型*/
        private getXiantaChallengeHintType;
        /**扫荡红点类型*/
        private getXiantaSweepHintType;
        /**奖励红点类型*/
        private getXiantaRewardHintType;
        /**奖励红点类型*/
        private getXiantaRankHintType;
        /**更新红点*/
        private updateXiantaHint;
        /**更新挑战红点*/
        private updateAllXiantaChallengeHint;
        private updateXiantaChallengeHint;
        private checkXiantaChallengeHint;
        /**更新扫荡红点*/
        private updateAllXiantaSweepHint;
        private updateXiantaSweepHint;
        private checkXiantaSweepHint;
        /**更新奖励红点*/
        private updateAllXiantaRewardHint;
        private updateXiantaRewardHint;
        private checkXiantaRewardHint;
        /**需要监听的，子类重写下*/
        protected onMainPassGuanqiaUpdate(n: GameNT): void;
        /**============== 修仙女仆自动挂机 ==============*/
        private canAutoSweepFuben;
        private canAutoChallengeFuben;
        private _sendFubenReset;
        private sendAutoChallengeFuben;
        private checkAutoChallengeFuben;
        private canAutoSweepXianta;
        private sendAutoSweepXianta;
        private checkAutoChallengeXianta;
        private canSweepJindi;
        private sendAutoSweepJindi;
        private checkAutoSweepJindi;
    }
}
declare namespace game.mod.shilian {
    class YuanLingModel {
        /** 已使用收益次数 */
        count: number;
        /** 已通关的难度 */
        diff: number;
        /** 已经购买次数 */
        buy: number;
        /** 单个难度信息 */
        info: {
            [type: number]: msg.yuanling_item;
        };
        /** 队伍列表信息 */
        team_list: msg.yuanling_team[];
        /** 自己队伍的难度 */
        own_index: number;
        /** 自己队伍的id */
        own_team_id: number;
        /** 自己队伍信息 */
        own_team_infos: msg.yuanling_team_info[];
        /** buff时间 */
        buff_info: {
            [index: number]: number;
        };
        /**被提出的队伍 [队伍id:被踢出的时间戳]*/
        kick_out_team: {
            [team_id: number]: number;
        };
        /**收到组队邀请*/
        be_invited_team: {
            [team_id: number]: msg.s2c_yuanling_invita;
        };
        /**可邀请列表*/
        invite_list: msg.teammate[];
        /**进入副本挑战*/
        scene_index: number;
        scene_layer: number;
        /**伤害排行*/
        damage_info: msg.yuanling_damage_info[];
        /**各难度通关次数*/
        challenge_counts: {
            [idx: number]: number;
        };
        /**元灵试炼红点*/
        hintPath: string[];
    }
}
declare namespace game.mod.shilian {
    import GameNT = base.GameNT;
    import YuanlingFubenConfig = game.config.YuanlingFubenConfig;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;
    /**
     * @description 元灵试炼系统
     */
    class YuanLingProxy extends ProxyBase implements IYuanLingProxy {
        private _model;
        /**当前困难度*/
        curDiffType: number;
        /**收到组队邀请延迟回调*/
        private _delayId;
        /**被邀请时候，进入界面附带的参数。解决直接带参数打开界面，又打开其他界面，back的时候有参数*/
        inviteParam: number[];
        readonly model: YuanLingModel;
        initialize(): void;
        /** 请求副本信息 */
        c2s_yuanling_info(): void;
        /** 副本信息 */
        private s2c_yuanling_info;
        /** 创建队伍 */
        c2s_yuanling_create_team(index: number): void;
        /** 加入队伍 */
        c2s_yuanling_jion_team(team_id: number, index: number): void;
        /** 退出队伍 */
        c2s_yuanling_exit_team(): void;
        /** 返回退出队伍 */
        private s2c_yuanling_exit_team;
        /** 踢出队伍 */
        c2s_yuanling_out_time(role_id: Long): void;
        /** 自己的队伍信息 */
        private s2c_yuanling_team_info;
        /** 勾选收益次数 1选择；2取消 */
        c2s_yuanling_check(check: number): void;
        /** 购买收益次数 */
        c2s_yuanling_buyCount(): void;
        /** 开始战斗;单人匹配也是这个 */
        c2s_yuanling_enter(index: number): void;
        /** 更新buff时间 */
        private s2c_yuanling_buff_info;
        /** 购买buff */
        c2s_yuanling_buyBuff(index: number): void;
        /** 邀请 */
        c2s_yuanling_invita(role_id: Long, index: number): void;
        /** 聊天组队邀请 */
        c2s_yuanling_room_invita(type: number): void;
        /** 收到组队邀请 */
        s2c_yuanling_invita(n: GameNT): void;
        /** 请求可邀请列表 */
        c2s_yuanling_role_list(index: number): void;
        /** 可邀请列表 */
        private s2c_yuanling_role_list;
        /** 请求队伍列表 */
        c2s_yuanling_team_list(idx: number): void;
        /** 队伍列表 */
        private s2c_yuanling_team_list;
        /** 更新副本内信息 */
        private s2c_yuanling_fb_info;
        private s2c_yuanling_damage;
        private s2c_yuanling_counts;
        /**=================================协议 end=================================*/
        getConfig(type: number): YuanlingFubenConfig;
        getTeamCount(): number;
        getCount(): number;
        getMaxBuy(): number;
        getCost(): number[][];
        isMineLeader(): boolean;
        /**获取邀请列表*/
        getInvitedTeamList(): s2c_yuanling_invita[];
        /**有队伍*/
        onTeam(): boolean;
        /**当前挑战层数*/
        curLayer(): number;
        /**当前难度*/
        getCurDiff(): number;
        /**当前皮肤状态，1奖励，2组队*/
        getCurState(): number;
        onClearInvitedTeam(): void;
        /**进去其他副本，或者掉线，默认全部拒绝邀请*/
        clearInvitedTeam(team_id: number): void;
        /**============================== hint ==============================*/
        /**收益次数红点*/
        getCntHint(): boolean;
        getAllHint(): boolean;
        updateHint(): void;
        getGiftHint(): boolean;
        private onUpdateGiftHint;
    }
}
declare namespace game.mod.shilian {
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    class ForbiddenGateAwd extends eui.Component {
        pro_rate: ProgressBarComp;
        icon: game.mod.Icon;
        redPoint: eui.Image;
        private _canGet;
        constructor();
        setData(bigGateCfg: ForbiddenGateConfig, canGet0: boolean): void;
        readonly canGet: boolean;
    }
}
declare namespace game.mod.shilian {
    class ForbiddenGateItemRender extends eui.ItemRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        img_lock: eui.Image;
        img_finished: eui.Image;
        redPoint: eui.Image;
        data: IFbdGateData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    class ForbiddenSaodangRender extends BaseListenerRenderer {
        lab_title: eui.Label;
        list_awd: eui.List;
        data: {
            fbdFubenCfg: ForbiddenFubenConfig;
            fbdGateCfg: ForbiddenGateConfig;
            passSmallGateId: number;
            isFinished: boolean;
        };
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    class ForbiddenSaodangView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_item: eui.List;
        btn_saodang: game.mod.Btn;
        lab_tip: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class ForbiddenView extends eui.Component {
        grp_eff: eui.Group;
        list_big_gate: eui.List;
        lab_gate: eui.Label;
        lab_boss_name: eui.Label;
        gate_awd: ForbiddenGateAwd;
        list_awd: eui.List;
        btn_saodan: game.mod.Btn;
        btn_fight: game.mod.Btn;
        lab_saodang_times: eui.Label;
        list_type: eui.List;
        grp_awd_list: eui.Group;
        scr_biggate: eui.Scroller;
        grp_saodang: eui.Group;
        img_finished: eui.Image;
        grp_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class FubenLayerItem1 extends BaseRenderer {
        grp_layer: eui.Group;
        data: {
            layer?: number;
            isCur?: boolean;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    class FubenLayerItem2 extends BaseRenderer {
        grp_layer: eui.Group;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    class FubenSceneView extends eui.Component {
        grp_lv0: eui.Group;
        grp_lv: eui.Group;
        grp_lv_show: eui.Group;
        scr1: eui.Scroller;
        list_layer1: eui.List;
        scr2: eui.Scroller;
        list_layer2: eui.List;
        grp_tips: eui.Group;
        lab_tips: eui.Label;
        lab_name: eui.Label;
        lab_cur: eui.Label;
        lab_cnt: eui.Label;
        lab_time: eui.Label;
        grp_gift: eui.Group;
        img_tips: eui.Image;
        lab_add: eui.Label;
        btn_gift: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class FubenView extends eui.Component {
        lab_more: eui.Label;
        grp_lv: eui.Group;
        list_reward: eui.List;
        grp_maxLv: eui.Group;
        grp_reset: eui.Group;
        img_cost: eui.Image;
        lab_cost: eui.Label;
        btn_reset: game.mod.Btn;
        btn_more1: game.mod.Btn;
        btn_more2: game.mod.Btn;
        btn_more3: game.mod.Btn;
        btn_challenge: game.mod.Btn;
        btn_gift: GiftBtn;
        list_type: eui.List;
        recommendPower: RecommendPower;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class ResultFubenView extends eui.Component {
        grp_lv: eui.Group;
        grp_maxLv: eui.Group;
        lab_cnt: eui.Label;
        lab_add: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class XiantaSceneView extends eui.Component {
        grp_reward: eui.Group;
        lab_name: eui.Label;
        icon: game.mod.Icon;
        bar: game.mod.ProgressBarComp;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class XiantaView extends eui.Component {
        grp_lv: eui.Group;
        rankFirstItem: game.mod.RankFirstItem;
        icon: game.mod.Icon;
        bar: game.mod.ProgressBarComp;
        list_reward: eui.List;
        btn_sweep: game.mod.Btn;
        lab_sweepCnt: eui.Label;
        btn_challenge: game.mod.Btn;
        list_type: eui.List;
        grp_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class YuanLingBuffItem extends BaseRenderer implements UpdateItem {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_lock: eui.Image;
        redPoint: eui.Image;
        data: IYuanLingBuffItemData;
        private _proxy;
        private _gr;
        private _shape;
        private _radius;
        private _delayId;
        constructor();
        protected onAddToStage(): void;
        protected childrenCreated(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onUpdateInfo;
        update(time: base.Time): void;
        private setBuyView;
        private drawCircle;
    }
    interface IYuanLingBuffItemData {
        index: number;
        duraTime: number;
        cd: number;
    }
}
declare namespace game.mod.shilian {
    import yuanling_damage_info = msg.yuanling_damage_info;
    class YuanLingResultItem extends BaseListenerRenderer {
        lb_num: eui.Label;
        lb_name: eui.Label;
        lb_damage: eui.Label;
        data: yuanling_damage_info;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    class YuanLingResultView extends eui.Component {
        lb_layer: eui.Label;
        list: eui.List;
        lb_time: eui.Label;
        lb_cd: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shilian {
    import prop_tips_data = msg.prop_tips_data;
    class YuanLingRewardItem extends BaseRenderer {
        img_bg: eui.Image;
        icon: game.mod.Icon;
        gr_eft: eui.Group;
        data: prop_tips_data;
        private _cardAry;
        private _backEftSrc;
        private _eftSrc;
        private _turnEftSrc;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private setTurnEft;
        private endEft;
    }
}
declare namespace game.mod.shilian {
    class YuanLingRewardView extends eui.Component {
        lb_cnt: eui.Label;
        list: eui.List;
        gr_eft: eui.Group;
        lb_cd: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class YuanLingSceneDiedView extends eui.Component {
        constructor();
    }
}
declare namespace game.mod.shilian {
    import GPlayerVo = game.scene.GPlayerVo;
    /**场景组队head信息*/
    class YuanLingSceneHeadVipItem extends BaseListenerRenderer {
        head: game.mod.HeadVip;
        bar: game.mod.ProgressBarComp;
        data: GPlayerVo;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.shilian {
    import material_item = msg.material_item;
    import forbidden_item = msg.forbidden_item;
    import forbidden_reward_list = msg.forbidden_reward_list;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import xiantower_info = msg.xiantower_info;
    class ShilianModel {
        infos: material_item[];
        type: number;
        lv: number;
        total_count: number;
        selType: number;
        st_lv: number;
        end_lv: number;
        typeList: number[];
        typeToPropIndex: {
            [type: number]: number;
        };
        challengeHints: string[][];
        resetHints: string[][];
        /************************** 禁地副本 *************************/
        fbdTypes: ForbiddenType[];
        curFbdType: ForbiddenType;
        curFbdBigGateId: number;
        fbdInfos: {
            [type: string]: forbidden_item;
        };
        fbdAwds: {
            [type: string]: {
                [bigGateId: string]: forbidden_reward_list[];
            };
        };
        hasDrawAwds: {
            [bigGateId: number]: number[];
        };
        fbdFubenCfg: {
            [type: string]: {
                [bigGateId: string]: ForbiddenFubenConfig;
            };
        };
        fbdFirstFubenCfg: {
            [type: string]: ForbiddenFubenConfig;
        };
        fbdGateEndCfg: {
            [type: string]: ForbiddenGateConfig;
        };
        fbdHint: string[];
        /********************************仙塔副本*********************************/
        selXiantaType: number;
        xiantaInfos: xiantower_info[];
        xiantaTypeList: number[];
        xiantaChallengeHints: string[][];
        xiantaSweepHints: string[][];
        xiantaRewardHints: string[][];
        xiantaRankHints: string[][];
    }
}
declare namespace game.mod.shilian {
    import yuanling_team_info = msg.yuanling_team_info;
    class YuanLingTeammateItem extends BaseListenerRenderer {
        img_captain: eui.Image;
        head: game.mod.Head;
        lb_name: eui.Label;
        lb_power: eui.Label;
        img_add: eui.Image;
        btn_del: game.mod.Btn;
        lb_add: eui.Label;
        data: yuanling_team_info;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickAdd;
        private onDel;
        private onConfirm;
    }
}
declare namespace game.mod.shilian {
    /**副本首杀玩家信息*/
    class YuanLingTopPlayerComp extends eui.Component {
        head: game.mod.Head;
        lb_name: eui.Label;
        img_di: eui.Image;
        constructor();
        /**更新信息*/
        updatePlayerInfo(info: msg.teammate): void;
    }
}
declare namespace game.mod.shilian {
    class YuanLingView extends eui.Component {
        btn_achievement: game.mod.Btn;
        btn_team: game.mod.Btn;
        playerComp: game.mod.shilian.YuanLingTopPlayerComp;
        gr_reward: eui.Group;
        list_reward: eui.List;
        btn_go: game.mod.Btn;
        btn_room: game.mod.Btn;
        gr_team: eui.Group;
        list_team: eui.List;
        checkbox: eui.CheckBox;
        btn_quit: game.mod.Btn;
        btn_start: game.mod.Btn;
        addComp: game.mod.AddCntComp;
        btn_chat: game.mod.Btn;
        list_type: eui.List;
        lb_enterTime: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shilian {
    /**组队邀请item*/
    class YuanLingTeamInviteItem extends YuanLingTeamItem {
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.shilian {
    /**组队邀请界面*/
    class YuanLingTeamInviteView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        btn_kuafu: game.mod.Btn;
        btn_zongmen: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class ShilianMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.shilian {
    /**队伍列表以及被邀请列表界面*/
    class YuanLingTeamListView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scroller: eui.Scroller;
        list: eui.List;
        lb_noteam: eui.Label;
        btn_create: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shilian {
    class ShilianMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.shilian {
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import forbidden_item = msg.forbidden_item;
    class ForbiddenMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listTypeData;
        private _listBigGateData;
        private _listAwdData;
        private _curTypeSelIdx;
        private _curBigGateSelIdx;
        private _curBigGateData;
        private _bigGateCfg;
        private _fubenCfgAry;
        private _effId;
        private readonly BTN_CENTER;
        private readonly BTN_SAODANG;
        private readonly BTN_FIGHT;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateInfo;
        private clearShow;
        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo;
        /**
         * 更新大关卡数据
         */
        private updateCurBigGateInfo;
        private updateBigAwd;
        private onClickTypeList;
        private onClickBigGateList;
        private onClickGateAwd;
        private onClickSaodan;
        private onClickFight;
    }
    interface IFbdGateData {
        info: forbidden_item;
        cfg: ForbiddenFubenConfig;
        isOpen: boolean;
        isFinished: boolean;
        showOpenStr: boolean;
        isLimitOpen: boolean;
    }
}
declare namespace game.mod.shilian {
    class ForbiddenSaodangMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _curType;
        private _canSaodang;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private onClickGemUse;
    }
}
declare namespace game.mod.shilian {
    class ForbiddenSceneMdr extends MdrBase {
        private _view;
        private _proxy;
        private _curInfo;
        private _awdData;
        private _curLv;
        private _lastLayer;
        private _canGet;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private updateTips;
        private onClickGateAwd;
    }
}
declare namespace game.mod.shilian {
    class FubenMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _selType; /**当前选中的副本类型*/
        private _selInfo; /**当前选中的副本信息*/
        private _selCfg; /**当前选中的副本配置*/
        private _cost;
        private _canSweep;
        private _isMax;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private onClickType;
        private onClickCost;
        private onClickMore1;
        private onClickMore2;
        private onClickMore3;
        private onClickReset;
        private onClickChallenge;
        private onInfoUpdate;
        private initTypeList;
        private setSelType;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateShow;
        private updateInfo;
        private updateResetGrp;
        private showGuide;
        private updateMore;
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class FubenSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _lastLv;
        private _leftTime;
        private _curLv;
        private _timeOut;
        private _timeOutLv;
        private _selCfg; /**当前选中的副本配置*/
        private _showJump;
        private readonly LAYER_NUM;
        private _itemList1;
        private _itemList2;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private clearTimeOutLv;
        private onSceneUpdate;
        private onClickGift;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
        private updateJump;
        private showJumpTween;
        private showLv;
        private updateTips;
        private updateGiftTips;
        private setGiftTips;
        private removeTipsTween;
    }
}
declare namespace game.mod.shilian {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ResultFubenMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
    }
}
declare namespace game.mod.shilian {
    class XiantaMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _selType;
        /**当前选中的副本类型*/
        private _selCfg;
        /**当前选中的副本配置*/
        private _selInfo;
        /**当前选中的副本信息*/
        private _canSweep;
        private _isMax;
        private _canDraw;
        private _rankList;
        private _rankType;
        /**排行榜类型*/
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickType;
        onClickSweep(): void;
        private onClickChallenge;
        private onClickIcon;
        private onInfoUpdate;
        private onRankUpdate;
        private initTypeList;
        private setSelType;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateShow;
        private updateInfo;
        private updateRankInfo;
    }
}
declare namespace game.mod.shilian {
    class XiantaSceneMdr extends MdrBase {
        private _view;
        private _proxy;
        private _canDraw;
        private _lastLv;
        private _passLv;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickIcon;
        private updateShow;
        private updateTips;
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class YuanLingMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listReward;
        private _listTeam;
        private _listBtn;
        private _stateType;
        private _type;
        private _enterCd;
        private _enterTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateTypeList;
        protected onHide(): void;
        private onTeamInfoUpdate;
        private onJumpToView;
        private switchState;
        private updateView;
        private updateMainView;
        private updateTeamView;
        private getEarnCnt;
        private updateAddComp;
        private updateTopPlayer;
        private onClickAchieve;
        private onClickTeam;
        private onClickBattle;
        private onClickCreateTeam;
        private onClickAddCnt;
        private onBuyCount;
        private onClickEquip;
        private onClickTeamBattle;
        private gotoBattle;
        private onClickType;
        private sendExitTeam;
        update(time: base.Time): void;
        private onClickChat;
        private onClickTopPlayer;
        private updateBtnHint;
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class YuanLingResultMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        protected _showArgs: msg.s2c_instance_fin;
        private _endTime;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private onUpdateList;
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class YuanLingRewardMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected _showArgs: msg.s2c_instance_fin;
        private _endTime;
        private _isSecondClick;
        private _reward;
        private _rowAry;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected doHide(disposeImmediately: boolean): void;
        private onClickList;
        update(time: base.Time): void;
        private autoOpenReward;
    }
}
declare namespace game.mod.shilian {
    class YuanLingSceneDiedMdr extends MdrBase {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.shilian {
    import UpdateItem = base.UpdateItem;
    class YuanLingSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _listBuff;
        private _listPlayer;
        private _proxy;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        private updateLvInfo;
        private updateBuff;
        private updatePlayer;
        protected onHide(): void;
        private onClickBuffList;
        private sendBuyBuff;
        private _buffCost;
        private getBuffCost;
        private _endTime;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.shilian {
    /**元灵组队邀请*/
    class YuanLingTeamInviteMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickKuafu;
        private onClickZongmen;
    }
}
declare namespace game.mod.shilian {
    /**被邀请列表*/
    class YuanLingTeamListInvitedMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onDeleteListItem;
        private onUpdateJoinTeam;
    }
}
declare namespace game.mod.shilian {
    /**元灵队伍列表*/
    class YuanLingTeamListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listTeam;
        private _index;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        protected onHide(): void;
        private onClickCreate;
        private onUpdateJoinTeam;
    }
}
