declare namespace game.mod.compete {
    class YouliWishBoxItemRender extends BaseListenerRenderer {
        img_desc: eui.Image;
        icon: Icon;
        data: IYouliWishBoxData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class CompeteMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.compete {
    import GameNT = base.GameNT;
    import s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
    import tour_role_info = msg.tour_role_info;
    import common_reward_status = msg.common_reward_status;
    import TourpvpPaimingConfig = game.config.TourpvpPaimingConfig;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;
    import TourpvpPreciousConfig = game.config.TourpvpPreciousConfig;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    import teammate = msg.teammate;
    import pvp_battle_group_pk = msg.pvp_battle_group_pk;
    import TourpvpWinConfig = game.config.TourpvpWinConfig;
    import tour_wish_reward_status = msg.tour_wish_reward_status;
    import TourpvpDatiConfig = game.config.TourpvpDatiConfig;
    import DoufaJifenConfig = game.config.DoufaJifenConfig;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
    class CompeteProxy extends ProxyBase implements ICompeteProxy {
        private _model;
        initialize(): void;
        c2s_tour_win_get_list(index: number): void;
        s2c_tour_update_list(n: GameNT): void;
        readonly youliWinCnt: number;
        getYouliWinRewardStatus(cfg: TourpvpWinConfig): number;
        s2c_tour_wish_get_list(n: GameNT): void;
        c2s_tour_challenge(pos: number, type?: YouliType): void;
        c2s_tour_refresh_defender(): void;
        c2s_tour_buy_times(cnt: number): void;
        c2s_tour_stage_get_list(): void;
        s2c_tour_stage_get_list(n: GameNT): void;
        c2s_tour_stage_buy(index: number): void;
        c2s_tour_fuli_get_list(): void;
        s2c_tour_fuli_get_list(n: GameNT): void;
        c2s_tour_fuli_buy(index: number): void;
        s2c_city_war_fight_update(n: GameNT): void;
        /**
         * 今日已购买次数
         */
        readonly curBuyCnt: number;
        /**
         * 已挑战次数
         */
        readonly curFightTimes: number;
        /**
         * 刷新1次的花费
         */
        readonly refreshCost: number;
        /**
         * 最大可购买挑战次数
         */
        readonly maxBuyFightTimes: number;
        /**
         * 最大挑战次数
         */
        readonly maxFightTimes: number;
        readonly remainTimes: number;
        getRankCfg(rankNo: number): TourpvpPaimingConfig;
        getChallengeCfg(id: number): TourpvpChallengeConfig;
        getPreciousCfg(id: number): TourpvpPreciousConfig;
        /**
         * 下次挑战次数恢复1次的时间
         */
        readonly nextFightTime: number;
        /**
         * 排行榜结束时间戳
         */
        readonly rankEndTime: number;
        /**
         * 我的名次
         */
        readonly myRank: number;
        /**
         * 站位信息
         */
        getTopRank(pos: number): tour_role_info;
        /**
         * 玩法类型，0 正常 1 宝箱  2宝藏 3异形 4杀手
         */
        readonly type: YouliType;
        /**
         * 奖励宝藏对应的礼包id
         */
        readonly giftIndex: number;
        /**
         * 累计完成游历次数
         */
        readonly challengeCnt: number;
        /**
         * 可领取、已领取的阶段奖励列表
         */
        getStepAward(index: number): common_reward_status;
        /**
         * 今日获得的分数
         */
        readonly dayScore: number;
        /**
         * 可领取、已领取的积分奖励列表
         */
        getScoreAward(index: number): common_reward_status;
        /**
         * 已领取的许愿奖励列表
         */
        getWishBoxAwardArr(): tour_wish_reward_status[];
        clearWishBoxAwardArr(): void;
        datiCfg: TourpvpDatiConfig;
        /**
         * 异形、积分杀手战斗数据
         */
        readonly fightData: s2c_city_war_fight_update;
        private updateYouliHint;
        private getYouliHint;
        getYouliAwardHint(): boolean;
        getYouliScoreHint(): boolean;
        private checkYouliWinRewardHint;
        c2s_tour_dati_select(index: number): void;
        private s2c_tour_dati_select;
        getCurVal(): number;
        getCurValDoufa(): number;
        /************************** 斗法 *************************/
        c2s_pvp_battle_get_player_challenge_info(): void;
        c2s_pvp_battle_rank_challenge(): void;
        c2s_pvp_battle_keep_win_rewards(index: number): void;
        c2s_pvp_battle_win_count_rewards(index: number): void;
        c2s_pvp_battle_buy_count(count: number): void;
        c2s_pvp_battle_get_rank_info(rankType: number): void;
        c2s_pvp_battle_get_pk_info(): void;
        c2s_pvp_battle_group_pk_info(): void;
        private s2c_pvp_battle_get_player_challenge_info;
        private s2c_pvp_battle_more_power_end;
        private s2c_pvp_battle_base_info;
        readonly score: number;
        readonly lv: number;
        getLv(score: number): number;
        getMaxScore(): number;
        readonly winCnt: number;
        readonly curCnt: number;
        readonly cnt: number;
        readonly buyCnt: number;
        private readonly winRewards;
        private readonly rewards;
        getRewardStatus(index: number): number;
        getWinRewardStatus(index: number): number;
        private s2c_pvp_battle_rank_info;
        getRankList(type: number): teammate[];
        getMyRankInfo(type: number): teammate;
        resetTopRank(): void;
        getTopInfo(type: number): teammate;
        getEndTime(type: number): number;
        private s2c_pvp_battle_pk_info;
        readonly recordList: pvp_battle_pk_data[];
        private clearRecordList;
        /**更新红点*/
        private updateDoufaHint;
        private updateChallengeHint;
        private checkChallengeHint;
        readonly rewardHint: string[];
        private updateRewardHint;
        private checkRewardHint;
        private updateWinRewardHint;
        private checkWinRewardHint;
        protected onRoleUpdate(n: base.GameNT): void;
        auto: boolean;
        c2s_pvp_battle_guess(roleId: Long): void;
        private s2c_pvp_battle_guess_list;
        private s2c_pvp_battle_group_pk;
        getGroupInfo(type: number): pvp_battle_group_pk;
        readonly groupStatus: number;
        readonly groupTime: number;
        readonly guessMaxCnt: number;
        getGuessCnt(): number;
        isGuess(roleId: Long): boolean;
        hasGuess(): boolean;
        canGuess(): boolean;
        isEnterGroup(): boolean;
        /************************** 斗法 *************************/
        /**============== 修仙女仆自动挂机 ==============*/
        private getAutoChallengeYouliRankInfo;
        private canAutoChallengeYouli;
        private sendAutoChallengeYouli;
        private checkAutoChallengeYouli;
        private canAutoChallengeDoufa;
        private checkAutoChallengeDoufa;
        private resetAutoChallengeDoufa;
        /**============== 修仙女仆自动挂机 ==============*/
        /**============== 跨服斗法 ==============*/
        c2s_kuafudoufa_click(type: number): void;
        private s2c_kuafudoufa_rank_info;
        c2s_kuafudoufa_scene_use_buff(index: number): void;
        private s2c_kuafudoufa_zhanchang_paiming;
        private s2c_kuafudoufa_base_info;
        private s2c_kuafudoufa_score_info;
        private s2c_kuafudoufa_zhanchang_jifen;
        private s2c_kuafudoufa_boss_info;
        private s2c_kuafudoufa_attack_status;
        private s2c_scene_kill_notice;
        private s2c_kuafudoufa_scene_buff_index_cd;
        getSkillCd(index: number): number;
        haveSkillCd(): boolean;
        getNextTime(): number;
        readonly state: number;
        readonly hasEnroll: boolean;
        readonly leftCnt: number;
        readonly isJoin: boolean;
        getRanks(type: number): teammate[];
        getMyRank(type: number): teammate;
        getScoreHint(): boolean;
        getScoreStatus(cfg: DoufaJifenConfig): number;
        readonly myScore: number;
        readonly redCampScore: number;
        readonly redCampNum: number;
        readonly blueCampScore: number;
        readonly blueCampNum: number;
        getBossHp(index: number): number;
        findCurMonsterIndex(camp: number): number;
        readonly attackStatus: number;
        readonly noticeList: s2c_scene_kill_notice[];
        clearNotice(): void;
        private updateKuafuDoufaHint;
        readonly taskHint: string[];
        protected onTaskHint(n: GameNT): void;
    }
}
declare namespace game.mod.compete {
    class CompeteRewardView extends eui.Component {
        lab_title: eui.Label;
        bar2: game.mod.ProgressBarComp;
        img_tips: eui.Image;
        lab_win: eui.Label;
        list_win: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    class CompeteView extends eui.Component {
        grp1: eui.Group;
        timeItem1: game.mod.TimeItem;
        lab_rank1: eui.Label;
        lab_cnt1: eui.Label;
        redPoint1: eui.Image;
        grp2: eui.Group;
        timeItem2: game.mod.TimeItem;
        lab_open2: eui.Label;
        lab_rank2: eui.Label;
        lab_cnt2: eui.Label;
        redPoint2: eui.Image;
        grp3: eui.Group;
        item: CoinItem;
        btn_shop: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.compete {
    class DoufaFailView extends eui.Component {
        lab_tips: eui.Label;
        lab_score: eui.Label;
        bar: game.mod.ProgressBarComp;
        img_lv_icon: eui.Image;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        gr_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.compete {
    class DoufaFinalsView extends eui.Component {
        secondPop: SecondPop;
        player: DoufaPlayerView;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    class DoufaGuessView extends eui.Component {
        secondPop: SecondPop;
        img_head: eui.Image;
        lab_name: eui.Label;
        lab_double: eui.Label;
        power: PowerLabel;
        costIcon: CostIcon;
        btn_guess: Btn;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.compete {
    import teammate = msg.teammate;
    class DoufaPlayerItem extends eui.Component {
        img_di: eui.Image;
        img_head: eui.Image;
        img_name_di: eui.Image;
        lab_name: eui.Label;
        lab_no: eui.Label;
        img_win: eui.Image;
        img_gray: eui.Image;
        img_has: eui.Image;
        info: teammate;
        updateShow(info: teammate, winRoleId: Long, isFirst?: boolean, isGuess?: boolean, isEmpty?: boolean): void;
    }
}
declare namespace game.mod.compete {
    import TouchEvent = egret.TouchEvent;
    class DoufaPlayerView extends eui.Component {
        grp_title: eui.Group;
        item0: DoufaPlayerItem;
        item1: DoufaPlayerItem;
        item2: DoufaPlayerItem;
        item3: DoufaPlayerItem;
        item4: DoufaPlayerItem;
        item5: DoufaPlayerItem;
        item6: DoufaPlayerItem;
        private _effHub;
        private _eftId;
        private _info;
        private _proxy;
        private _type;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected onClick(e: TouchEvent): void;
        private removeTitle;
        private updateTitle;
        private updateMatch;
        private updateMatch1;
        private updateMatch2;
        private updateMatch3;
        private updateMatchWin;
        private getMatchInfo;
        updateShow(type: number): void;
    }
}
declare namespace game.mod.compete {
    class DoufaQuickWinView extends eui.Component {
        lab_score: eui.Label;
        bar: game.mod.ProgressBarComp;
        img_lv_icon: eui.Image;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.compete {
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    class DoufaRecordItem extends eui.ItemRenderer {
        head: HeadVip;
        lab_desc: eui.Label;
        lab_time: eui.Label;
        data: pvp_battle_pk_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class DoufaRecordView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    import MagicTargetConfig = game.config.MagicTargetConfig;
    class DoufaRewardItemRender extends BaseRenderer {
        private lab_desc;
        private list_reward;
        private img_buy;
        private btn_buy;
        data: MagicTargetConfig;
        private _proxy;
        private _cost;
        private _rewardList;
        private _canBuy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    class DoufaTabItem extends eui.ItemRenderer {
        labelDisplay: eui.Label;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    import MagicTopRankConfig = game.config.MagicTopRankConfig;
    import teammate = msg.teammate;
    class DoufaTopRankItem extends BaseRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        head: HeadVip;
        grp_title: eui.Group;
        lab_name: eui.Label;
        data: {
            cfg: MagicTopRankConfig;
            rankInfo: teammate;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class DoufaTopRankView extends eui.Component {
        grp_eff: eui.Group;
        grp_first: eui.Group;
        grp_title: eui.Group;
        timeItem: game.mod.TimeItem;
        lab_name: eui.Label;
        list_rank: eui.List;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.compete {
    class DoufaView extends eui.Component {
        img_lv: eui.Image;
        grp_eft: eui.Group;
        btn_rule: Btn;
        btn_finals: Btn;
        btn_rank: Btn;
        timeItem: game.mod.TimeItem;
        btn_record: Btn;
        bar: game.mod.ProgressBarComp;
        lab_max: eui.Label;
        list_reward: eui.List;
        reward_view: CompeteRewardView;
        btn_reward: Btn;
        btn_challenge: Btn;
        checkbox: eui.CheckBox;
        lab_cnt: eui.Label;
        btn_add: Btn;
        btn_rank2: Btn;
        btn_record2: Btn;
        btn_rule2: Btn;
        lab_guessCnt: eui.Label;
        player: DoufaPlayerView;
        list_type: eui.List;
        lab_tips: eui.Label;
        btn_battle: Btn;
        constructor();
    }
}
declare namespace game.mod.compete {
    class DoufaVsView extends eui.Component {
        img_player1: eui.Image;
        lab_name1: eui.Label;
        powerLabel1: game.mod.PowerLabel;
        grp_player2: eui.Group;
        img_player2: eui.Image;
        lab_name2: eui.Label;
        powerLabel2: game.mod.PowerLabel;
        constructor();
    }
}
declare namespace game.mod.compete {
    import MagicWinConfig = game.config.MagicWinConfig;
    class DoufaWinRewardItem extends BaseRenderer {
        btn_box: game.mod.Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        private _proxy;
        data: MagicWinConfig;
        private _canDraw;
        protected onAddToStage(): void;
        private onClick;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class DoufaWinView extends eui.Component {
        resultHurt: ResultHurt;
        lab_tips: eui.Label;
        lab_score: eui.Label;
        bar: game.mod.ProgressBarComp;
        img_lv_icon: eui.Image;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        gr_eft: eui.Group;
        gr_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.compete {
    import task_data = msg.task_data;
    class KuafuDoufaAchieveItem extends BaseListenerRenderer {
        private lab_desc;
        private list_reward;
        private img_not;
        private img_draw;
        private btn_draw;
        private _proxy;
        private _rewardList;
        data: task_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaAchieveView extends eui.Component {
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaBossItem extends eui.ItemRenderer {
        private img_icon;
        private img_camp;
        private bar;
        private img_died;
        data: {
            camp: number;
            monsterIndex: number;
        };
        protected dataChanged(): void;
        /**更新血量*/
        updateHp(percent: number): void;
    }
}
declare namespace game.mod.compete {
    import teammate = msg.teammate;
    class KuafuDoufaKillItem extends eui.ItemRenderer {
        private img_head;
        private img_frame;
        private lab_name;
        data: {
            info: teammate;
            beKill: boolean;
        };
        protected dataChanged(): void;
        setData(info: teammate, beKill: boolean): void;
    }
}
declare namespace game.mod.compete {
    import kuafudoufa_zhanchang_paiming = msg.kuafudoufa_zhanchang_paiming;
    class KuafuDoufaRankItem extends eui.ItemRenderer {
        img_mvp: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_kill: eui.Label;
        lab_num: eui.Label;
        lab_score: eui.Label;
        data: kuafudoufa_zhanchang_paiming;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaRankView extends eui.Component {
        list_rank: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    class KuafuDoufaSceneSkillItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_mark: eui.Image;
        lab_time: eui.Label;
        lab_cnt: eui.Label;
        data: DoufaJinengConfig;
        private _proxy;
        private _shape;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private changeMask;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaSceneView extends eui.Component {
        lab_time: eui.Label;
        lab_redScore: eui.Label;
        lab_redCnt: eui.Label;
        lab_blueScore: eui.Label;
        lab_blueCnt: eui.Label;
        list_redBoss: eui.List;
        list_blueBoss: eui.List;
        head1: Head;
        bar1: ProgressBarComp;
        img_fanji: eui.Image;
        head2: Head;
        bar2: ProgressBarComp;
        btn_enemy: game.mod.Btn;
        head3: Head;
        bar3: ProgressBarComp;
        btn_rank: Btn;
        btn_score: Btn;
        btn_attack: Btn;
        grp_attack: eui.Group;
        bar_attack: ProgressBarComp;
        head_attack: Head;
        lab_name_attack: eui.Label;
        grp_kill: eui.Group;
        kill1: KuafuDoufaKillItem;
        img_kill: eui.Image;
        kill2: KuafuDoufaKillItem;
        grp_start: eui.Group;
        grp_time: eui.Group;
        grp_died: eui.Group;
        lab_reviveTime: eui.Label;
        lab_revive: eui.Label;
        grp_skill: eui.Group;
        skill_item: KuafuDoufaSceneSkillItem;
        list_skill: eui.List;
        grp_attactEft1: eui.Group;
        grp_attactEft2: eui.Group;
        grp_attactEft3: eui.Group;
        constructor();
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaScoreItem extends BaseListenerRenderer {
        private lab_desc;
        private list_reward;
        private img_not;
        private img_draw;
        private btn_draw;
        private _proxy;
        private _rewardList;
        data: KuafuScoreData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    class KuafuDoufaSkillItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        btn_buy: Btn;
        private _proxy;
        private _cost;
        data: DoufaJinengConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaView extends eui.Component {
        btn_rule: Btn;
        btn_rank: Btn;
        timeItem: game.mod.TimeItem;
        btn_achieve: Btn;
        timeItem2: game.mod.TimeItem;
        list_reward: eui.List;
        img_tips: eui.Image;
        lab_cnt: eui.Label;
        img_state: eui.Image;
        btn_enter: Btn;
        constructor();
    }
}
declare namespace game.mod.compete {
    import TourpvpTargetConfig = game.config.TourpvpTargetConfig;
    class YouliAwardItemRender extends BaseListenerRenderer {
        private lab_desc;
        private list_reward;
        private img_buy;
        private btn_buy;
        data: TourpvpTargetConfig;
        private _proxy;
        private _rewardList;
        private _cost;
        /**
         * 状态，0-前往，1-可领取，2-已领取
         */
        private _status;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    class YouliDatiItem extends eui.ItemRenderer {
        lab_desc: eui.Label;
        img_sel: eui.Image;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    class YouliDatiResultView extends eui.Component {
        list_reward: eui.List;
        lab_tip: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.compete {
    class YouliDatiView extends eui.Component {
        lab_desc: eui.Label;
        list_item: eui.List;
        lab_tip: eui.Label;
        constructor();
    }
}
declare namespace game.mod.compete {
    import tour_role_info = msg.tour_role_info;
    import TouchEvent = egret.TouchEvent;
    class YouliItem extends BaseRenderer {
        grp_role_eff: eui.Group;
        lab_name: eui.Label;
        lab_power: eui.Label;
        lab_score: eui.Label;
        private _proxy;
        data: tour_role_info;
        private _isNormal;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private addRoleModel;
        private addBoxModel;
        private addMonsterModel;
        onClick(e: TouchEvent): void;
    }
}
declare namespace game.mod.compete {
    class YouliKillerView extends eui.Component {
        img_bg: eui.Image;
        img_title: eui.Image;
        lab_desc: eui.Label;
        list_reward: eui.List;
        grp_power: eui.Group;
        btn_get: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.compete {
    import TourpvpFuliConfig = game.config.TourpvpFuliConfig;
    class YouliScoreItemRender extends BaseListenerRenderer {
        private lab_desc;
        private list_reward;
        private img_buy;
        private btn_buy;
        data: TourpvpFuliConfig;
        private _proxy;
        private _rewardList;
        /**
         * 状态，0-不可领取，1-可领取，2-已领取
         */
        private _status;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.compete {
    class YouliScoreView extends eui.Component {
        lab_score: eui.Label;
        lab_time: eui.Label;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    class YouliTreasureView extends eui.Component {
        lab_desc: eui.Label;
        list_reward: eui.List;
        btn_get: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.compete {
    class YouliView extends eui.Component {
        grp_eft: eui.Group;
        lab_top_rank: eui.Label;
        lab_rank_jump: eui.Label;
        item1: YouliItem;
        item2: YouliItem;
        item3: YouliItem;
        item4: YouliItem;
        btn_award: Btn;
        btn_score: Btn;
        pro_rate: ProgressBarComp;
        lab_my_rank: eui.Label;
        lab_my_score: eui.Label;
        btn_refresh: Btn;
        lab_recover_time: eui.Label;
        lab_times: eui.Label;
        btn_add_times: Btn;
        reward_view: CompeteRewardView;
        constructor();
    }
}
declare namespace game.mod.compete {
    import MagicWinConfig = game.config.MagicWinConfig;
    class YouliWinRewardItem extends BaseRenderer {
        btn_box: game.mod.Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        private _proxy;
        data: MagicWinConfig;
        private _canDraw;
        protected onAddToStage(): void;
        private onClick;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.compete {
    import tour_role_info = msg.tour_role_info;
    import common_reward_status = msg.common_reward_status;
    import s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
    import s2c_pvp_battle_base_info = msg.s2c_pvp_battle_base_info;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    import teammate = msg.teammate;
    import pvp_battle_group_pk = msg.pvp_battle_group_pk;
    import tour_wish_reward_status = msg.tour_wish_reward_status;
    import TourpvpDatiConfig = game.config.TourpvpDatiConfig;
    import DoufaJifenConfig = game.config.DoufaJifenConfig;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
    class CompeteModel {
        curBuyCnt: number;
        curFightTimes: number;
        nextFightTime: number;
        rankEndTime: number;
        topRank: {
            [rank: string]: tour_role_info;
        };
        type: YouliType;
        giftIndex: number;
        youliWinCnt: number;
        youliWinList: number[];
        challengeCnt: number;
        stepAwards: {
            [idx: string]: common_reward_status;
        };
        dayScore: number;
        scoreAwards: {
            [idx: string]: common_reward_status;
        };
        wishBoxAwardArr: tour_wish_reward_status[];
        fightData: s2c_city_war_fight_update;
        youliHint: string[];
        youliChallengeHint: string[];
        datiCfg: TourpvpDatiConfig;
        /************************** 斗法 *************************/
        info: s2c_pvp_battle_base_info;
        recordList: pvp_battle_pk_data[];
        rankList1: teammate[];
        topInfo1: teammate;
        endTime1: number;
        rankList2: teammate[];
        topInfo2: teammate;
        endTime2: number;
        rankList3: teammate[];
        topInfo3: teammate;
        endTime3: number;
        challengeHint: string[];
        rewardHint: string[];
        winRewardHint: string[];
        rewardCostIndexs: string[];
        auto: boolean;
        groupStatus: number;
        groupTime: number;
        groupList: pvp_battle_group_pk[];
        guessList: Long[];
        /************************** 跨服斗法 *************************/
        state: number;
        hasEnroll: boolean;
        leftCnt: number;
        isJoin: boolean;
        rankList: {
            [type: number]: teammate[];
        };
        myRank: {
            [type: number]: teammate;
        };
        scoreList: number[];
        myScore: number;
        redCampScore: number;
        redCampNum: number;
        blueCampScore: number;
        blueCampNum: number;
        bossHpInfos: {
            [index: number]: number;
        };
        attackStatus: number;
        noticeList: s2c_scene_kill_notice[];
        taskHint: string[];
        taskHint2: string[];
        idx_cds: {
            [index: number]: msg.kuafudoufa_scene_buff_index_cd;
        };
    }
    interface KuafuScoreData {
        cfg: DoufaJifenConfig;
        status: RewardStatus;
    }
}
declare namespace game.mod.compete {
    class YouliWishBoxView extends eui.Component {
        lab_desc: eui.Label;
        lab_tip: eui.Label;
        list_award: eui.List;
        constructor();
    }
}
declare namespace game.mod.compete {
    class CompeteMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class CompeteMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _isDoufaOpen;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /****************************************游历**************************************/
        private onClickYouli;
        private updateYouli;
        private reqYouliRankInfo;
        private updateYouliTime;
        private updateYouliRank;
        private updateYouliCnt;
        private updateYouliHint;
        /****************************************斗法**************************************/
        private onClickDoufa;
        private onDoufaRankUpdate;
        private updateDoufa;
        private reqDoufaRankInfo;
        private updateDoufaTime;
        private updateDoufaRank;
        private updateDoufaCnt;
        private updateDoufaOpen;
        private updateDoufaHint;
        /****************************************仙界争霸**************************************/
        private onClickXianjiezhengba;
        /****************************************公共**************************************/
        private onClickShop;
        private updateShop;
        update(time: base.Time): void;
        private showGuide;
    }
}
declare namespace game.mod.compete {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class DoufaFailMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateScore;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.compete {
    class DoufaFinalsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _btnList;
        private _selType; /**当前选中的分组类型*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickType;
        private onInfoUpdate;
        private initTypeList;
        private typeUpdateInfo;
    }
}
declare namespace game.mod.compete {
    import teammate = msg.teammate;
    class DoufaGuessMdr extends MdrBase {
        private _view;
        private _proxy;
        protected _showArgs: teammate;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGuess;
        private updateShow;
    }
}
declare namespace game.mod.compete {
    class DoufaMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class DoufaMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _winList;
        private _time;
        private readonly TIME_TICK;
        private _autoFlag;
        private _maxBuyCnt;
        private _btnList;
        private _selType;
        /**当前选中的分组类型*/
        private _eftIdRank;
        private _eftStrRank;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private removeEffectRank;
        private onClickRule;
        private onClickFinals;
        private onClickRank;
        private onClickRecord;
        private onClickReward;
        private onClickChallenge;
        private onClickAdd;
        private onAdd;
        private onClickCheckBox;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateViewState;
        private updateFirst;
        private updateScore;
        private updateWin;
        private updateCnt;
        private updateCheckBox;
        private updateCheckBoxShow;
        private resetCheckBox;
        update(time: base.Time): void;
        /** 更新红点 */
        private updateHint;
        private updateRewardHint;
        private updateTime;
        /****************************决赛********************************/
        private updateSecond;
        private onClickBattle;
        private onClickType;
        private onInfoUpdate;
        private onGuessUpdate;
        private initTypeList;
        private typeUpdateInfo;
        private updateGuessCnt;
        private updateTips;
    }
}
declare namespace game.mod.compete {
    import s2c_pvp_battle_more_power_end = msg.s2c_pvp_battle_more_power_end;
    class DoufaQuickWinMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: s2c_pvp_battle_more_power_end;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateScore;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.compete {
    class DoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class DoufaRankMdr1 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _rankType;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
        private initShow;
        private updateShow;
        private getReward;
        update(time: base.Time): void;
        private updateTime;
        private reqRankInfo;
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class DoufaRankMdr2 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _maxRank;
        private _rankType;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
        private initShow;
        private updateShow;
        private getMyRankInfo;
        update(time: base.Time): void;
        private updateTime;
        private reqRankInfo;
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class DoufaRankMdr3 extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _maxRank;
        private _rankType;
        private _proxy;
        private _topInfo;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickFirst;
        private onRankUpdate;
        private initShow;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
        private reqRankInfo;
    }
}
declare namespace game.mod.compete {
    class DoufaRecordMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    class DoufaRewardMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    class DoufaRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    class DoufaVsMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        protected _showArgs: teammate;
        private readonly MAX_NUM;
        private _timeCnt;
        private _nameList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**更新自己*/
        private updateSelf;
        private initNameList;
        /**更新敌人*/
        private updateEnemy;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.compete {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class DoufaWinMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateHurtList;
        private updateScore;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaAchieveMdr extends MdrBase {
        private _view;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaGuildRankMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateShow;
        private getReward;
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class KuafuDoufaMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRule;
        private onClickRank;
        private onClickAchieve;
        private onClickEnter;
        private initShow;
        private updateState;
        private updateCnt;
        update(time: base.Time): void;
        private updateTime;
        private updateRankTime;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateTaskHint;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaPersonalRankMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateShow;
        private getReward;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class KuafuDoufaRankMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _time;
        private readonly TIME_TICK;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInfoUpdate;
        update(time: base.Time): void;
        private reqInfo;
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class KuafuDoufaSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _sceneProxy;
        private _curEnemyVo;
        private _minHpEnemyVo;
        private _targetVo;
        private _endTime;
        private readonly START_TIME;
        private _redList;
        private _blueList;
        private _skillList;
        private _reliveTime;
        private readonly ATTACK_TIME_TICK;
        private _attackTime;
        private _isNoticeShowing;
        private readonly NOTICE_TIME;
        private readonly NOTICE_SHOW;
        private _costIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**反击敌人*/
        private onClickMaxHurt;
        /**点击敌人*/
        private onClickEnemy;
        /**点击最低血量敌人*/
        private onClickMinHp;
        private attackTarget;
        /**打开敌人列表*/
        private onClickEnemyList;
        private onObjAdd;
        private onObjDel;
        private initShow;
        /**更新复仇敌人*/
        private updateMaxHurt;
        /**更新复仇敌人血量*/
        private updateMaxHurtHp;
        /**更新附近敌人*/
        private updateEnemy;
        /**更新敌人血量*/
        private updateEnemyHp;
        /**更新血量最低敌人血量*/
        private updateEnemyMinHp;
        private onClickRank;
        private onClickScore;
        /**切换攻击驻守状态*/
        private onClickAttack;
        private onClickRevive;
        update(time: base.Time): void;
        private updateTime;
        private updateScore;
        private updateScoreHint;
        /*********************BOSS显示**************************/
        private onClickBoss;
        private updateBoss;
        private updateBossHp;
        private updateBossHpList;
        /*********************死亡提示**************************/
        private onRoleRelive;
        private onRoleDie;
        private setDiedShow;
        private updateReliveTime;
        /*********************攻击驻守状态**************************/
        private updateAttackStatus;
        /*********************击杀公告**************************/
        private setKillShow;
        private updateKill;
        private showKill;
        private checkNextKill;
        /*********************当前攻击目标**************************/
        private setAttackShow;
        private updateAttack;
        /**更新攻击目标血量*/
        private updateTargetHp;
        /*********************技能**************************/
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private onClickSkill;
        private onClickSkillList;
        private updateSkill;
        private updateSkillCost;
        private updateSkillCd;
        /**===================攻击中字体跳动处理===================*/
        private _bmpDanceGrp;
        private _bmpDanceHeadIdx;
        private updateBmpDanceFunc;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaScoreMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    class KuafuDoufaSkillMdr extends MdrBase {
        private _view;
        private _proxy;
        private _costIndex;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private updateItemList;
        private updateCost;
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class KuafuDoufaTipsMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
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
declare namespace game.mod.compete {
    class YouliAwardMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    class YouliAwardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    import tour_role_info = msg.tour_role_info;
    class YouliDatiMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: tour_role_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickItem;
        private updateShow;
    }
}
declare namespace game.mod.compete {
    import s2c_tour_dati_select = msg.s2c_tour_dati_select;
    class YouliDatiResultMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: s2c_tour_dati_select;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
    }
}
declare namespace game.mod.compete {
    class YouliKillerFightMdr extends MdrBase {
        private _view;
        private readonly HP_WIDTH;
        private _proxy;
        private _fightData;
        private _data;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        hide(disposeImmediately?: boolean): void;
        private updateInfo;
        /**更新自己*/
        private updateSelf;
        /**更新自己血量*/
        private updateSelfHp;
        /**更新敌人*/
        private updateEnemy;
        /**更新敌人血量*/
        private updateEnemyHp;
    }
}
declare namespace game.mod.compete {
    class YouliMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class YouliMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _winList;
        private _endTime;
        private _rankType;
        private _maxBuyCnt;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        update(time: base.Time): void;
        private updateInfo;
        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo;
        private updateMyScore;
        private updateRecoverTime;
        private updateMyRank;
        private updateRankInfo;
        private onRankUpdate;
        private onRefresh;
        private onRank;
        private onAward;
        private onScore;
        private onClickAdd;
        /**
         * 增加挑战次数
         */
        private onAddTimes;
        private onCommonClickAdd;
        private updateWin;
        private showGuide;
        private onRoleUpdate;
    }
}
declare namespace game.mod.compete {
    class YouliRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class YouliRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _itemList;
        private _rankType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.compete {
    class YouliScoreKillerMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _awardDatas;
        private _data;
        private _clickBtn;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateInfo(): void;
        private onGetBtnClick;
        private openFight;
    }
}
declare namespace game.mod.compete {
    class YouliScoreMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.compete {
    import UpdateItem = base.UpdateItem;
    class YouliScoreMdr extends MdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _time;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateItemList;
    }
}
declare namespace game.mod.compete {
    class YouliSpecialKillerMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _awardDatas;
        private _data;
        private _clickBtn;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateInfo(): void;
        private onGetBtnClick;
        private openFight;
    }
}
declare namespace game.mod.compete {
    class YouliTreasureMdr extends MdrBase {
        private _view;
        private _proxy;
        private _awardDatas;
        private _index;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateInfo(): void;
        private onGetBtnClick;
    }
}
declare namespace game.mod.compete {
    import tour_role_info = msg.tour_role_info;
    import prop_tips_data = msg.prop_tips_data;
    class YouliWishBoxMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemDatas;
        protected _showArgs: tour_role_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        protected updateInfo(): void;
        private onClickItem;
    }
    interface IYouliWishBoxData {
        index: number;
        status: WishBoxStatus;
        descUrl: string;
        reward: prop_tips_data;
    }
}
