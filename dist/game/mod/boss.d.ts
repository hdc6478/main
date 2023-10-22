declare namespace game.mod.boss {
    import new_vip_boss = msg.new_vip_boss;
    import NewVipBossFubenConfig = game.config.NewVipBossFubenConfig;
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import GameNT = base.GameNT;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import single_boss = msg.single_boss;
    import PersonalBossConfig = game.config.PersonalBossConfig;
    import s2c_new_cross_boss = msg.s2c_new_cross_boss;
    import CrossBossConfig = game.config.CrossBossConfig;
    import teammate = msg.teammate;
    import guild_hurt_rank = msg.guild_hurt_rank;
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    import zhuimo_army_data = msg.zhuimo_army_data;
    import s2c_new_cross_boss_ranks_list = msg.s2c_new_cross_boss_ranks_list;
    class BossProxy extends ProxyBase implements IBossProxy {
        private _model;
        initialize(): void;
        onUpdateTips(): void;
        onStartReconnect(): void;
        c2s_new_multiple_boss_challenge(index: number): void;
        c2s_new_multiple_boss_info(): void;
        private s2c_new_multiple_boss_list;
        private getInfoPos;
        /**boss信息*/
        getBossInfo(index: number): new_multiple_boss_data;
        /**boss挑战次数*/
        readonly bossCount: number;
        /**boss挑战次数上限*/
        readonly bossMaxCount: number;
        /**boss次数恢复时间戳*/
        readonly bossTime: number;
        /**boss挑战次数道具*/
        readonly bossCostIndex: number;
        /**幸运爆率次数*/
        readonly luckyCount: number;
        getCurVal(): number;
        getBossCfgs(): {
            [type: number]: NewMultipleBossConfig[];
        };
        isBossOpen(type: number, showTips?: boolean): boolean;
        /**更新红点*/
        private updateBossHint;
        private checkBossChallengeHint;
        private checkBossRevive;
        private onBossRevive;
        protected reincarnateInfoUpdate(n: GameNT): void;
        /************************** 个人 boss *************************/
        c2s_single_boss_enter(index: number): void;
        c2s_single_boss_sweep(): void;
        private s2c_single_boss_info;
        private getPersonalInfoPos;
        /**boss信息*/
        getPersonalBossInfo(index: number): single_boss;
        isPersonalBossOpen(cfg: PersonalBossConfig): boolean;
        /**更新红点*/
        private updatePersonalBossHint;
        private checkPersonalBossChallengeHint;
        /**获取个人boss最小复活时间*/
        private getPersonalBossMinReviveTime;
        getPersonalBossMaxCnt(): number;
        protected onRoleUpdate(n: base.GameNT): void;
        /************************** 跨服 boss *************************/
        c2s_new_cross_boss_challenge(index: number): void;
        c2s_new_cross_boss(index: number, type: number): void;
        c2s_new_cross_boss_hurt_reward(index: number): void;
        c2s_new_cross_boss_buy_count(): void;
        private s2c_new_cross_boss;
        private s2c_new_cross_boss_ranks_list;
        private s2c_new_cross_boss_scene;
        private s2c_new_cross_boss_hurt_reward;
        private getRewardPos;
        private s2c_new_cross_boss_roll_point;
        readonly crossBossInfo: s2c_new_cross_boss;
        readonly crossBossRankInfo: s2c_new_cross_boss_ranks_list;
        selCrossBossCfg: CrossBossConfig;
        crossBossSceneRank: boolean;
        clearCrossBossSceneRankInfo(): void;
        getPersonalRanks(): teammate[];
        getMyPersonalRank(): teammate;
        getGuildRanks(): guild_hurt_rank[];
        getMyGuildRank(): guild_hurt_rank;
        /**实际状态为客户端用的排序状态*/
        getCrossBossRewardStatus(index: number): number;
        /**跨服boss开启，登录时候客户端主动检测下*/
        updateCrossBossTips(): void;
        /**更新红点*/
        private updateCrossBossHint;
        private checkCrossBossChallengeHint;
        /************************** vip boss *************************/
        /**
         * 请求进入对应BOSS关卡
         * @param index 关卡id
         */
        c2s_new_vip_boss_enter(index: number): void;
        /**
         * vip boss基本信息
         */
        private s2c_new_vip_boss_info;
        /**
         * 碾压
         * @param index 关卡id
         */
        c2s_new_vip_boss_sweep(index: number): void;
        /**
         * 取 vip boss 信息
         * @param index new_vip_boss 表 index
         * @returns
         */
        getVipBossInfo(index: number): new_vip_boss;
        /**
         * vip boss 副本配置
         * @param index new_vip_boss_fuben 表 index
         * @returns
         */
        getVipBossFubenCfg(index: number): NewVipBossFubenConfig;
        /**
         * vip boss 副本配置
         * @param bossId
         * @returns
         */
        getVipBossFubenCfgByBossId(bossId: number): NewVipBossFubenConfig;
        /**
         * vip boss 配置
         * @param index
         * @returns
         */
        getVipBossCfg(index: number): NewVipBossConfig;
        /**
         * 当前转生对应的 vip boss 配置列表
         * @returns
         */
        getRebVipBossCfg(): {
            [index: string]: NewVipBossConfig;
        };
        /**
         * 当前 vip 等级是否达到指定关卡vip限制
         * @param index new_vip_boss_fuben 表 index
         */
        isVipEnough(index: number): boolean;
        /**
         * 取关卡状态
         * @param index new_vip_boss 表 index
         */
        getState(index: number): VipBossState;
        /**
         * 取关卡状态
         * @param gateId new_vip_boss_fuben 表 index
         */
        private getState2;
        /**
         * 所有转生 id
         */
        readonly vipBossRebirthIds: number[];
        isVipBossOpen(index: number): boolean;
        private updateVipBossHint;
        private checkVipBossRevive;
        private onVipBossRevive;
        c2s_zhuimo_open_ui(): void;
        c2s_zhuimo_boss_challenge(): void;
        c2s_zhuimo_boss_info(): void;
        c2s_zhuimo_show_reward(): void;
        c2s_zhuimo_army_ui_show(type: number): void;
        c2s_zhuimo_army_oper(type: number, role_id?: Long, army_id?: number): void;
        private s2c_zhuimo_boss_info_ret;
        private s2c_zhuimo_update_date;
        private s2c_zhuimo_open_ui_ret;
        private s2c_zhuimo_show_reward_ret;
        private s2c_zhuimo_boss_roll_point;
        private s2c_zhuimo_army_ui_show;
        private s2c_zhuimo_update_buff_info;
        /**return second */
        readonly openTime: number;
        /**bool是否返回0做开启判断 */
        getOpenTime(bool?: boolean): number;
        readonly endTime: number;
        readonly openHours1: number;
        readonly openHours2: number;
        readonly bossList: zhuimo_boss_data[];
        readonly total: number;
        readonly memberNum: number;
        readonly reward_name_list: string[];
        readonly team_add_hurt: number;
        readonly my_team: teammate[];
        readonly army_list: zhuimo_army_data[];
        readonly duiyou_list: teammate[];
        readonly leader: teammate;
        readonly preview_id: number;
        readonly zhuimo_jiangli: number[][];
        readonly zhuimo_dajiang: number;
        readonly zhuimo_cost: number[];
        onUpdateHintByAbyss(): void;
        protected onUpdateSceneEnter(n: GameNT): void;
        /**============== 修仙女仆自动挂机 ==============*/
        getChallengeManyBossIdx(): number;
        private canChallengeManyBoss;
        sendAutoChallengeManyBoss(): void;
        checkAutoChallengeManyBoss(): void;
        canChallengeAbyss(): boolean;
        private checkAutoChallengeAbyss;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        private getCanChallengePersonalBossCfg;
        private canChallengePersonalBoss;
        private sendAutoChallengePersonalBoss;
        private checkAutoChallengePersonalBoss;
        private getCanChallengeVipBossCfg;
        private canChallengeVipBoss;
        private sendAutoChallengeVipBoss;
        private checkAutoChallengeVipBoss;
        private canAutoChallengeCrossBoss;
        private getAutoChallengeCrossBossCfg;
        private sendAutoChallengeCrossBoss;
        private checkAutoChallengeCrossBoss;
    }
}
declare namespace game.mod.boss {
    import PersonalBossConfig = game.config.PersonalBossConfig;
    class PersonalBossItem extends BaseRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        list_reward: eui.List;
        lab_limit: eui.Label;
        img_has: eui.Image;
        btn_challenge: Btn;
        lab_cnt: eui.Label;
        timeItem: game.mod.TimeItem;
        private _rewardList;
        private _proxy;
        data: PersonalBossConfig;
        private _info; /**当前boss*/
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        updateTime(): void;
    }
}
declare namespace game.mod.boss {
    class BossMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.boss {
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    class AbyssBossItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        bar: ProgressBarComp;
        lab_tips: eui.Label;
        btn_attack: game.mod.Btn;
        private _proxy;
        private _sceneProxy;
        data: zhuimo_boss_data;
        protected onAddToStage(): void;
        private onClick;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.boss {
    class AbyssBossListView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.boss {
    import teammate = msg.teammate;
    class AbyssInviteItem extends BaseListenerRenderer {
        private btn;
        private head;
        private lab_name;
        private lab_count;
        private img_leader;
        private _proxy;
        data: teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.boss {
    import teammate = msg.teammate;
    class AbyssLuckyItem extends eui.ItemRenderer {
        private lab_name;
        data: teammate;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.boss {
    class AbyssLuckyView extends eui.Component {
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
declare namespace game.mod.boss {
    import teammate = msg.teammate;
    class AbyssMyTeamItem extends BaseListenerRenderer {
        private btn;
        private head;
        private lab_name;
        private lab_count;
        private img_leader;
        private btn_add;
        private _proxy;
        data: teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickAdd;
    }
}
declare namespace game.mod.boss {
    class AbyssMyTeamView extends eui.Component {
        list_item: eui.List;
        secondPop: SecondPop;
        lab_hurt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.boss {
    class AbyssNoTeamView extends eui.Component {
        btn_invite: Btn;
        btn_union: Btn;
        btn_team: Btn;
        lab_tips1: eui.Label;
        lab_tips2: eui.Label;
        constructor();
    }
}
declare namespace game.mod.boss {
    class AbyssRewardView extends eui.Component {
        list_reward: eui.List;
        btn_confirm: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    class AbyssSceneView extends eui.Component {
        lab_people: eui.Label;
        lab_cnt: eui.Label;
        cost: CostIcon;
        timeItem: TimeItem;
        btn_reward: Btn;
        btn_boss: Btn;
        btn_add: Btn;
        grp_hurt: eui.Group;
        head: HeadVip;
        lab_name: eui.Label;
        btn_team: Btn;
        lab_hurt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.boss {
    import zhuimo_army_data = msg.zhuimo_army_data;
    class AbyssTeamItem extends BaseListenerRenderer {
        private btn;
        private head;
        private lab_name;
        private lab_count;
        private img_leader;
        private _proxy;
        data: zhuimo_army_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.boss {
    class AbyssTeamListView extends eui.Component {
        list_item: eui.List;
        secondPop: SecondPop;
        constructor();
    }
}
declare namespace game.mod.boss {
    class AbyssView extends eui.Component {
        lab_name: eui.Label;
        btn_reward: Btn;
        list_reward: eui.List;
        btn_add: Btn;
        timeItem: TimeItem;
        btn_challenge: Btn;
        nameItem: AvatarNameItem;
        lab_tips: eui.Label;
        costIcon: CostIcon;
        icon: Icon;
        constructor();
    }
}
declare namespace game.mod.boss {
    class CrossBossHurtRewardItem extends BaseRenderer {
        private lab_desc;
        private list_reward;
        private img_not;
        private img_draw;
        private btn_draw;
        private _proxy;
        private _rewardList;
        data: {
            index: number;
            hurt: number;
            rewardId: number;
            status: number;
        };
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.boss {
    class CrossBossHurtRewardView extends eui.Component {
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod.boss {
    import CrossBossConfig = game.config.CrossBossConfig;
    class CrossBossItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        img_lock: eui.Image;
        redPoint: eui.Image;
        data: CrossBossConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.boss {
    import teammate = msg.teammate;
    class CrossBossLuckyRewardItem extends eui.ItemRenderer {
        private lab_name;
        private lab_value;
        data: teammate;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.boss {
    class CrossBossLuckyRewardView extends eui.Component {
        lab_tips: eui.Label;
        icon: game.mod.Icon;
        lab_first: eui.Label;
        list_item: eui.List;
        lab_value: eui.Label;
        lab_time: eui.Label;
        btn_close: Btn;
        btn_reward: Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    class CrossBossSceneView extends eui.Component {
        head: Head;
        btn_rank: Btn;
        icon: Icon;
        btn_reward: Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    class CrossBossView extends eui.Component {
        grp_eff: eui.Group;
        list_boss: eui.List;
        avatarNameItem: AvatarNameItem;
        lab_name: eui.Label;
        lab_rank: eui.Label;
        bar: game.mod.ProgressBarComp;
        btn_reward: Btn;
        list_reward: eui.List;
        grp_cnt: eui.Group;
        lab_cnt: eui.Label;
        btn_add: Btn;
        lab_time: eui.Label;
        timeItem: game.mod.TimeItem;
        btn_challenge: Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    class BossRewardShowView extends eui.Component {
        list_reward: eui.List;
        btn_confirm: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    class BossRewardView extends eui.Component {
        list_reward: eui.List;
        list_tips: eui.List;
        btn_confirm: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.boss {
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    class ManyBossItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        bar: ProgressBarComp;
        img_lock: eui.Image;
        img_type: eui.Image;
        timeItem: game.mod.TimeItem;
        redPoint: eui.Image;
        data: NewMultipleBossConfig;
        private _info; /**当前boss*/
        protected dataChanged(): void;
        updateTime(): void;
    }
}
declare namespace game.mod.boss {
    class ManyBossView extends eui.Component {
        grp_eff: eui.Group;
        list_boss: eui.List;
        scroller: eui.Scroller;
        list_type: eui.List;
        avatarNameItem: AvatarNameItem;
        btn_gift: GiftBtn;
        head: Head;
        lab_name: eui.Label;
        btn_reward: Btn;
        list_reward: eui.List;
        grp_cnt: eui.Group;
        lab_cnt: eui.Label;
        btn_add: Btn;
        lab_time: eui.Label;
        timeItem: game.mod.TimeItem;
        btn_challenge: Btn;
        grp_luckyCnt0: eui.Group;
        grp_luckyCnt: eui.Group;
        checkBoxNvpu: game.mod.XiuxianNvpuCheckBox;
        constructor();
    }
}
declare namespace game.mod.boss {
    import new_vip_boss = msg.new_vip_boss;
    import NewVipBossFubenConfig = game.config.NewVipBossFubenConfig;
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import single_boss = msg.single_boss;
    import s2c_new_cross_boss = msg.s2c_new_cross_boss;
    import CrossBossConfig = game.config.CrossBossConfig;
    import s2c_new_cross_boss_scene = msg.s2c_new_cross_boss_scene;
    import common_reward_status = msg.common_reward_status;
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    import teammate = msg.teammate;
    import zhuimo_army_data = msg.zhuimo_army_data;
    import s2c_new_cross_boss_ranks_list = msg.s2c_new_cross_boss_ranks_list;
    class BossModel {
        bossCfgs: {
            [type: number]: NewMultipleBossConfig[];
        };
        /**boss信息*/
        bossInfos: new_multiple_boss_data[];
        /**boss挑战次数*/
        bossCount: number;
        /**boss次数恢复时间戳*/
        bossTime: number;
        bossChallengeHint: string[];
        /**幸运爆率次数*/
        luckyCount: number;
        /************************** 个人 boss *************************/
        /**boss信息*/
        personalBossInfos: single_boss[];
        personalBossChallengeHint: string[];
        /************************** 跨服 boss *************************/
        crossBossInfo: s2c_new_cross_boss;
        crossBossRankInfo: s2c_new_cross_boss_ranks_list;
        selCrossBossCfg: CrossBossConfig;
        crossBossSceneRank: boolean;
        crossBossSceneRankInfo: s2c_new_cross_boss_scene;
        crossBossReward: common_reward_status[];
        crossBossChallengeHint: string[];
        /************************** vip boss *************************/
        vipBossInfos: {
            [index: string]: new_vip_boss;
        };
        vipBossFubenCfg: {
            [index: string]: NewVipBossFubenConfig;
        };
        vipBossFubenCfg2: {
            [bossId: string]: NewVipBossFubenConfig;
        };
        vipBossCfg: {
            [index: string]: NewVipBossConfig;
        };
        rebVipBossCfg: {
            [rebirth: string]: {
                [index: string]: NewVipBossConfig;
            };
        };
        vipBossRebirthIds: number[];
        vipBossHint: string[];
        /************************** 坠魔深渊 *************************/
        bossList: zhuimo_boss_data[];
        total: number;
        member_num: number;
        reward_name_list: string[];
        duiyou_list: teammate[];
        army_id: number;
        army_list: zhuimo_army_data[];
        my_team: teammate[];
        army_step: number;
        guild_step: number;
        zhuimo_jiangli: number[][];
        zhuimo_dajiang: number;
        zhuimo_cost: number[];
        readonly openHours1: number;
        readonly openHours2: number;
        open_view: boolean;
        oper_type: number;
        readonly previewId: number;
    }
}
declare namespace game.mod.boss {
    class PersonalBossView extends eui.Component {
        list_boss: eui.List;
        btn_sweep: Btn;
        lab_vip: eui.Label;
        constructor();
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class VipBossItemRender extends BaseRenderer implements UpdateItem {
        img_icon: eui.Image;
        img_lock: eui.Image;
        timeItem: game.mod.TimeItem;
        lab_name: eui.Label;
        grp_vip_num: eui.Group;
        redPoint: eui.Image;
        data: IVipBossGateData;
        private _time;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onClick;
    }
}
declare namespace game.mod.boss {
    class VipBossView extends eui.Component {
        grp_eff: eui.Group;
        list_gate: eui.List;
        lab_boss_name: eui.Label;
        list_awd: eui.List;
        btn_awd_preview: game.mod.Btn;
        btn_fight: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        scroller: eui.Scroller;
        list_type: eui.List;
        img_title: eui.Image;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.boss {
    class BossMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class AbyssBossListMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
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
declare namespace game.mod.boss {
    class AbyssInviteListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected onInitList(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onUpdateView(): void;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    import s2c_zhuimo_boss_roll_point = msg.s2c_zhuimo_boss_roll_point;
    class AbyssLuckyMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _showPoint;
        private _time;
        private readonly TIME_TICK;
        private _itemList;
        _showArgs: s2c_zhuimo_boss_roll_point;
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
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class AbyssMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
        private onClickFight;
        private onClickAdd;
        private onClickPreview;
        update(time: base.Time): void;
        private endTime;
    }
}
declare namespace game.mod.boss {
    class AbyssMyTeamMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected onInitList(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onUpdateView(): void;
    }
}
declare namespace game.mod.boss {
    class AbyssNoTeamMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickInvite;
        private onClickUnion;
        private onClickTeam;
    }
}
declare namespace game.mod.boss {
    class AbyssRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class AbyssSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _costIdx;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickReward;
        private onClickBoss;
        private onClickTeam;
        private onClickAdd;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private updateInfo;
        private onUpdateTeam;
        private onUpdateHead;
        private updateCost;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.boss {
    class AbyssTeamListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected onInitList(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onUpdateView(): void;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class AbyssTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.boss {
    class CrossBossGuildRankMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateShow;
        private getReward;
    }
}
declare namespace game.mod.boss {
    class CrossBossHurtRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
    }
}
declare namespace game.mod.boss {
    import s2c_new_cross_boss_roll_point = msg.s2c_new_cross_boss_roll_point;
    import UpdateItem = base.UpdateItem;
    class CrossBossLuckyRewardMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _showPoint;
        private _time;
        private readonly TIME_TICK;
        protected _showArgs: s2c_new_cross_boss_roll_point;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickClose;
        private onClickReward;
        private updateReward;
        private changeShowPoint;
        private updateViewState;
        /**显示点数*/
        private updateInfo;
        private updateTime;
        update(time: base.Time): void;
        private checkMyFirst;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class CrossBossMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _bossList;
        private _selIndex; /**当前选中的boss*/
        private _selCfg; /**当前选中的配置*/
        private _effId;
        private _lastIndex;
        private _time;
        private readonly TIME_TICK;
        private _lastShowTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickBoss;
        private onClickReward;
        private onClickAdd;
        private onClickChallenge;
        private onClickRank;
        private onInfoUpdate;
        private updateItemList;
        private indexUpdateInfo;
        private updateBoss;
        private updateReward;
        private updateRank;
        private updateReviveTime;
        private updateBossHp;
        update(time: base.Time): void;
        private updateCount;
        private reqBossInfo;
        private reqRankInfo;
    }
}
declare namespace game.mod.boss {
    class CrossBossPersonalRankMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateShow;
        private getReward;
    }
}
declare namespace game.mod.boss {
    class CrossBossRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.boss {
    class CrossBossSceneMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRank;
        private onClickReward;
        private onRankUpdate;
        private updateMvp;
        private updateRewatd;
        private updateRewardHint;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class CrossBossTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateLeftTime;
    }
}
declare namespace game.mod.boss {
    class BossRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _tipsList;
        protected _showArgs: {
            rewardId: number;
            tips?: string[];
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
    }
}
declare namespace game.mod.boss {
    import prop_tips_data = msg.prop_tips_data;
    class BossRewardShowMdr extends MdrBase {
        private _view;
        private _itemList;
        protected _showArgs: prop_tips_data[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class ManyBossMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _bossList;
        private _selType; /**当前选中的类型*/
        private _selIndex; /**当前选中的boss*/
        private _selCfg; /**当前选中的配置*/
        private _selInfo; /**当前选中的boss*/
        private _effId;
        private _lastIndex;
        private _isMaxCnt;
        private _time;
        private readonly TIME_TICK;
        private _firstEnter;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickType;
        private onClickBoss;
        private onClickReward;
        private onClickAdd;
        private onClickChallenge;
        private onInfoUpdate;
        private initTypeList;
        private setSelType;
        private getSelIndex;
        private typeUpdateInfo;
        private updateItemList;
        private indexUpdateInfo;
        private updateBoss;
        private updateReward;
        private updateBelong;
        private updateCount;
        private updateTime;
        private updateReviveTime;
        update(time: base.Time): void;
        private reqBossInfo;
        private showGuide;
    }
}
declare namespace game.mod.boss {
    import UpdateItem = base.UpdateItem;
    class PersonalBossMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _bossList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSweep;
        private onClickVip;
        private updateItemList;
        update(time: base.Time): void;
        private updateVip;
    }
}
declare namespace game.mod.boss {
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import new_vip_boss = msg.new_vip_boss;
    import UpdateItem = base.UpdateItem;
    class VipBossMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listTypeData;
        private _listGateData;
        private _listAwdData;
        private _curTypeSelIdx;
        private _curGateSelIdx;
        private _curGateData;
        private _curState;
        private _effId;
        private _time;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateInfo;
        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo;
        /**
         * 更新当前关卡数据
         */
        private updateCurGateInfo;
        private onClickTypeList;
        private onClickGateList;
        private onClickAwdPreview;
        private onClickFight;
    }
    interface IVipBossGateData {
        info: new_vip_boss;
        cfg: NewVipBossConfig;
        state: VipBossState;
    }
}
