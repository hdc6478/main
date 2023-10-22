declare namespace game.mod.union {
    import GameNT = base.GameNT;
    import member_data = msg.member_data;
    import guild_data = msg.guild_data;
    import function_data = msg.function_data;
    import guild_reward = msg.guild_reward;
    import shengtai_data = msg.shengtai_data;
    import GuildMibaoConfig = game.config.GuildMibaoConfig;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import teammate = msg.teammate;
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    import guild_yibao_task_struct = msg.guild_yibao_task_struct;
    import GuildZhanyaotaiConfig = game.config.GuildZhanyaotaiConfig;
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import guild_study_data = msg.guild_study_data;
    import attributes = msg.attributes;
    import GuildXianshouTaskConfig = game.config.GuildXianshouTaskConfig;
    import prop_tips_data = msg.prop_tips_data;
    class UnionProxy extends ProxyBase implements IUnionProxy {
        private _model;
        readonly model: UnionModel;
        initialize(): void;
        /**--------------------协议start-------------------- */
        /**请求宗门信息 */
        c2s_ask_guild_info(): void;
        /**请求宗门成员列表 */
        c2s_ask_guild_member(): void;
        /**请求宗门列表 */
        c2s_ask_guild_list(): void;
        /**玩家退出宗门 */
        c2s_quit_guild(): void;
        /**修改权限 1.升职2.降职  成员降职=踢出工会*/
        c2s_set_guild_member_job(role_id: Long, type: number): void;
        /**创建宗门 */
        c2s_create_guild(type: number, name: string, content?: string): void;
        /**设置申请加入条件 */
        c2s_guild_open_status(is_set: boolean, value: number): void;
        /**随机名字 */
        c2s_random_guild_name(): void;
        /**查看申请列表 */
        c2s_ask_guild_apply_info(): void;
        /**操作申请列表 1同意 2拒绝 */
        c2s_agree_or_refuse_guild(role_id: Long, type: number): void;
        /**选择申请加入宗门 */
        c2s_choice_apply_guild(id: number): void;
        /**踢出宗门 */
        c2s_guild_kick_member(role_id: Long): void;
        /**一键捐献 */
        c2s_guild_donate(): void;
        /**每日领取捐献奖励 */
        c2s_guild_daily_reward(): void;
        /**打开福利大厅 */
        c2s_guild_charge_ui(): void;
        /**福利大厅领取奖励 */
        c2s_guild_get_charge_reward(role_id: Long, index: number): void;
        /**修改仙宗名 */
        c2s_change_guild_name(name: string): void;
        /**设置仙尊 */
        c2s_set_guild_xianzong(role_id: Long): void;
        /**打开仙尊秘宝请求 */
        c2s_guild_mibao_ui(): void;
        /**兑换仙尊秘宝 */
        c2s_guild_mibao_swap(index: number, count: number): void;
        /**聊天招募 */
        c2s_guild_invita(channel_type?: number): void;
        /**1请求仙宗遗宝信息  2请求排行信息(params字段为1宗门排名 2个人排名)  3请求协助信息 */
        c2s_guild_yibao_request(oper_type: number, params?: number): void;
        /**1单次挑战  2一键扫荡  3解锁宝箱  4开启宝箱   5邀请加速  6单个加速  7一键加速  8领取全民奖励 */
        c2s_guild_yibao_click(button_type: number, params?: number, uid?: Long): void;
        c2s_guild_zhanyaotai_request(oper_type: number, params?: number): void;
        c2s_guild_zhanyaotai_click(button_type: number, id?: Long, boss_index?: number): void;
        c2s_guild_zhanyaotai_help_chat(id: Long): void;
        c2s_guild_ware_show(): void;
        c2s_guild_ware_oper(type: number, props: Long[]): void;
        c2s_guild_ware_exchange(prop_index: Long): void;
        c2s_guild_auction_show(): void;
        c2s_guild_auction_buy(id: Long): void;
        c2s_guild_baoku_show(): void;
        c2s_guild_exchange_item(num: number): void;
        c2s_guild_baoku_buy(index: number, count: number): void;
        c2s_guild_study_show(): void;
        c2s_guild_study_oper(index: number): void;
        c2s_guild_xianshou_show(): void;
        c2s_guild_xianshou_up_level(): void;
        c2s_guild_xianshou_receive(index: number): void;
        c2s_guild_xianshou_rank_show(type: number): void;
        /**宗门基本数据 */
        private s2c_ask_guild_info_ret;
        /**下发宗门成员列表 */
        private s2c_ask_guild_member_ret;
        /**下发宗门列表 */
        private s2c_ask_guild_list_ret;
        /**获取随机名字 */
        private s2c_random_guild_name_ret;
        /**设置权限回调 */
        private s2c_set_guild_member_job_ret;
        /**玩家登录下发或者更新数据(维护个人宗门信息) */
        private s2c_guild_role_data;
        /**查看申请列表返回协议 */
        private s2c_ask_guild_apply_info_ret;
        /**申请列表操作回调 */
        private s2c_agree_or_refuse_guild_ret;
        /**申请条件限制 */
        private s2c_guild_open_status_ret;
        /**福利大厅 */
        private s2c_guild_charge_ui_ret;
        private s2c_guild_donate_ret;
        /**设置仙尊回调 */
        private s2c_set_guild_xianzong_ret;
        /**仙尊秘宝 */
        private s2c_guild_mibao_ui_ret;
        /**
         * 天坛圣坛抽奖通用
         * @param mod_type 1.天坛 2.圣坛
         * @param type 1.单次 2.十连
         * */
        c2s_guild_draw(mod_type: number, type: number): void;
        /**重置天坛奖励 */
        c2s_guild_draw_reset(): void;
        /**打开天坛界面请求 */
        c2s_guild_draw_open(): void;
        /**天坛数据 */
        private s2c_guild_draw_info;
        /**打开圣坛界面请求 */
        c2s_guild_shengtan_ui(): void;
        /**积分领取奖励 */
        c2s_guild_shengtan_score_reward(index: number): void;
        /**圣坛更新数据 */
        private s2c_guild_shengtan_info;
        /** */
        private s2c_guild_shengtan_ui_ret;
        private s2c_guild_yibao_base_info;
        private s2c_guild_yibao_help;
        private s2c_guild_zhanyaotai_info;
        private s2c_guild_ware_show;
        private s2c_guild_ware_oper;
        private s2c_guild_ware_exchange;
        private s2c_guild_auction_show;
        private s2c_guild_auction_buy;
        private s2c_guild_baoku_show;
        private s2c_guild_exchange_item;
        private s2c_guild_baoku_buy;
        private s2c_guild_study_show;
        private s2c_guild_study_oper;
        private s2c_guild_xianshou_show;
        private s2c_guild_xianshou_update_exp;
        private s2c_guild_xianshou_receive;
        c2s_guild_type_rank_rewards(rank_type: number): void;
        private s2c_guild_type_rank_list;
        /**--------------------协议end-------------------- */
        open_fun: string;
        /**宗門等級 */
        readonly union_level: number;
        /**更新数据 */
        private onUpdateProto;
        private onDeleteMember;
        getDonateReward(cfg: game.config.GuildDonateConfig, index: number): number[][];
        private onUpdateMember;
        /**获取单个成员数据 */
        getMemberById(id: Long): member_data;
        /**职位文本 */
        getJobTextByJob(job: number): string;
        /**获取申请限制条件 */
        getApplyLimit(): function_data;
        /**是否申请加入宗门 */
        getApplyStatus(id: number): boolean;
        /**获取成员列表（排序） */
        getMemberList(): member_data[];
        /**宗门列表（排序） */
        getUnionList(): guild_data[];
        /**福利列表 */
        getWelfareList(): guild_reward[];
        /**圣坛更多大奖 */
        getShengRewardList(): shengtai_data[];
        /**申请列表 */
        getApplyList(): member_data[];
        /**是否有申请 */
        readonly isApply: boolean;
        /**是否加入仙宗 */
        readonly isInUnion: boolean;
        /**仙宗id */
        readonly guild_id: number;
        /**仙宗名字 */
        readonly guild_name: string;
        readonly guild_job: number;
        /**是否已经创建vip宗门 */
        readonly isCreateVip: boolean;
        /**退出宗门cd中 */
        readonly isInCd: boolean;
        /**根据创建宗门页面状态获取创建类型 */
        getCreateType(status: string): number;
        /**判断是否仙尊（用于设置仙尊） */
        checkHero(role_id: Long): boolean;
        /**是否设置仙尊 */
        checkIsSetHero(): boolean;
        /**仙尊配置 */
        getHeroList(): GuildMibaoConfig[];
        /**宗门排序 */
        private sortByUnion;
        /**成员排序 */
        private sortByMember;
        /**福利大厅列表排序 */
        private sortByWelfare;
        protected onRoleUpdate(n: GameNT): void;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onBagUpdateByPropType(n: base.GameNT): void;
        /**更新红点 */
        private onUpdateHint;
        private onUpdateHintByDonate;
        private onUpdateHintWage;
        /**天坛红点 */
        private onUpdateHintTian;
        /**圣坛红点 */
        private onUpdateHintSheng;
        /**福利大厅红点 */
        private onUpdateHintWelfare;
        /**有申请列表红点 */
        private onUpdateHintApply;
        /**是否重置 */
        readonly isReset: boolean;
        /**
         * 当前奖励已抽次数
         * GuildDrawConfig配置
         * */
        getTianCount(index: number): number;
        /**获取圣坛大奖数据 */
        getShengInfo(index: number): shengtai_data;
        getShengFixReward(): ShengtanItemConfig[];
        /**圣坛抽奖次数 */
        getShengCount(): number;
        /**圣坛积分礼包数据 */
        getShengStatus(index: number): guild_reward;
        /**天坛单次消耗 */
        readonly tian_cost: number[];
        /**圣坛单次消耗 */
        readonly sheng_cost: number[];
        getTipsByType(type: number): string;
        readonly guild_exchange_num: number;
        readonly box_list: guild_yibao_box_struct[];
        readonly boss_index: number;
        readonly boss_hp: number;
        getRankList(type: number, open_fun?: string): RankRewardRenderData[];
        getRankStr(type: number): string;
        getRankCountStr(type: number): string;
        readonly help_list: guild_yibao_help_struct[];
        getTask(index: number): guild_yibao_task_struct;
        getTaskReward(): boolean;
        readonly vip_boss: GuildZhanyaotaiConfig;
        readonly boss_mvp: teammate;
        readonly boss_data: guild_zhanyaotai_boss_struct;
        readonly boss_list: guild_zhanyaotai_boss_struct[];
        readonly recover_time: number;
        getSummonCount(index: number): number;
        getBossRankList(type: number): RankRewardRenderData[];
        getBossRankStr(type: number): string;
        getBossRankCountStr(type: number): string;
        readonly recycle_oper: boolean;
        /**遗宝红点 */
        onUpdateHintByTreasure(): void;
        getTaskHint(): boolean;
        getBoxHint(info: guild_yibao_box_struct): boolean;
        private onUpdateHintByKill;
        getMyBossHint(): boolean;
        getZhaohuanHint(): boolean;
        getBossListHint(): boolean;
        getBossHint(boss: guild_zhanyaotai_boss_struct): boolean;
        readonly xianzong_yibao_jiasu_shangxian: number;
        readonly kill_boss_cost_index: number[];
        readonly max_boxs: number;
        readonly residue_boxs: number;
        readonly guild_score: number;
        getStoreData(index: number): number;
        getBookInfo(index: number): guild_study_data;
        getBuff(index: number, before?: boolean): number;
        getCost(index: number): number[];
        readonly beast_stage: number;
        readonly total_exp: number;
        /**仙兽操作权限 */
        readonly beast_oper: boolean;
        getExtraAttrJob(): string;
        readonly base_attrs: attributes;
        readonly extra_attrs: attributes;
        getRewardStatus(index: number): boolean;
        getRewardState(index: number): number;
        getBeastRankStr(type: number): string;
        getBeastRankCountStr(type: number): string;
        getBeastTask(task_id: number): GuildXianshouTaskConfig;
        setEquipList(): void;
        getEquipKeyValue1(): UnionSelectData[];
        getEquipKeyValue2(key: string): UnionSelectData[];
        getEquipString(str: string): string;
        getEquioList(key: string, quality: string): PropData[];
        getBeastRankList(type: number): RankRewardRenderData[];
        getBookRoots(index: number): string[];
        private onUpdateHintByBook;
        private readonly book_cost_indexs;
        onTaskUpdate(n: GameNT): void;
        private onUpdateHintByBeast;
        private onUpdateHintByBeastReward;
        getRanks(type: number, open_fun?: string): teammate[];
        getMyRank(type: number, open_fun?: string): teammate;
        getRankName(item: teammate, type: number, open_fun?: string): string;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getRankSection(rank: string, type: number, open_fun?: string): IRankSectionData[];
        getLastRank(type: number): number;
        getRankProps(type: number): prop_tips_data[];
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionKillRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _end_time;
        protected _type: number;
        private _tips;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTips;
        private onUpdateTime;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionTreasureRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _end_time;
        protected _type: number;
        private _tips;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTips;
        private onUpdateTime;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionBeastRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected _type: number;
        private _tips;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTips;
        private onUpdateTime;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.union {
    import member_data = msg.member_data;
    class UnionApplyItem extends BaseRenderer {
        private lab_name;
        private lab_power;
        private head;
        btn_agree: Btn;
        btn_refuse: Btn;
        protected _proxy: UnionProxy;
        data: member_data;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onAgree;
        private onRefuse;
    }
}
declare namespace game.mod.union {
    class UnionWelfareView extends eui.Component {
        list: eui.List;
        btn_explain: Btn;
        head: HeadVip;
        lab_nobody: eui.Label;
        img_title: eui.Image;
        lab_name: eui.Label;
        lab_count: eui.Label;
        gr_eft: eui.Group;
        img_ditu: eui.Image;
        img_nobody: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionHorseLampItem extends BaseRenderer {
        lab: eui.Label;
        constructor();
        setData(str: string): void;
    }
}
declare namespace game.mod.union {
    class UnionLotteryItem extends BaseRenderer {
        icon: Icon;
        redPoint: eui.Image;
        gr_got: eui.Group;
        img_get: eui.Image;
        img_reward2: eui.Image;
        grp_count: eui.Group;
        lab_count: eui.Label;
        data: UnionTianData;
        constructor();
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: UnionTianData): void;
    }
}
declare namespace game.mod.union {
    import shengtai_data = msg.shengtai_data;
    class UnionLotteryRewardItem extends BaseRenderer {
        icon: Icon;
        lab: eui.Label;
        lab_time: eui.Label;
        data: shengtai_data;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    class UnionProgressItem extends BaseRenderer {
        progress: ProgressBarComp;
        data: VProgressData;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod {
    import ShengtanScoreConfig = game.config.ShengtanScoreConfig;
    class UnionProgressRewardItem extends BaseRenderer {
        btn_box: Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        private _proxy;
        data: ShengtanScoreConfig;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
}
declare namespace game.mod.union {
    import shengtai_data = msg.shengtai_data;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;
    class UnionShengLotteryItem extends BaseRenderer {
        icon: Icon;
        redPoint: eui.Image;
        gr_got: eui.Group;
        img_reward2: eui.Image;
        grp_name: eui.Group;
        lab_name: eui.Label;
        data: shengtai_data | ShengtanItemConfig;
        constructor();
        protected dataChanged(): void;
        /**设置数据data，单个icon时候调用*/
        setData(data: shengtai_data | ShengtanItemConfig): void;
    }
}
declare namespace game.mod.union {
    import guild_reward = msg.guild_reward;
    class UnionWelfareItem extends BaseGiftItemRender {
        data: guild_reward;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.union {
    class UnionLotteryMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**圣坛更多大奖 */
    class UnionLotteryRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionShengLotteryMdr extends MdrBase {
        private _view;
        private _proxy;
        /**奖励数量 */
        private readonly count;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        /**走马灯 */
        private onOpenTween;
        private onTween;
        private onClearItem;
        private onTen;
        private onOne;
        private onClickTips;
        /**提示说明 */
        private onExplain;
        private onMoreReward;
        private onPreviewReward;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionTianLotteryMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        /**光圈可跳icon坐标和id */
        private posArr;
        /**缓动延迟 */
        private readonly _delay;
        /**动画圈数 */
        private readonly round;
        /**动画当前位置索引 */
        private current;
        /**正在抽奖 */
        private isTween;
        /**最后一个抽中的index */
        private last_index;
        /**抽中的所有index 去重 用于抽奖动画结束展示特效的索引 */
        private idxs;
        /**抽中的所有index 不去重 用于弹出奖励的 */
        private indexs;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitView;
        private onUpdateView;
        private onOpenTween;
        private onTween;
        private onTweenOver;
        private onPopupReward;
        private onCheckTween;
        private onNext;
        private onTen;
        private onOne;
        /**提示说明 */
        private onExplain;
        private onClickTips;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionWelfareMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**福利大厅 */
    class UnionWelfareMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private eft_id;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickExplain;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionBossHpItem extends BaseRenderer {
        private img_hp1;
        private img_mask;
        private img_bai;
        private img_hp0;
        private img_icon;
        private lab_name;
        private lab_hp;
        btn_reward: Btn;
        data: {
            index: number;
            hp: number;
            boss_hp: number;
        };
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: {
            index: number;
            hp: number;
            boss_hp: number;
        }): void;
    }
}
declare namespace game.mod.union {
    class UnionFightView extends eui.Component {
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
declare namespace game.mod.union {
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import UpdateItem = base.UpdateItem;
    class UnionKillItem extends BaseRenderer implements UpdateItem {
        private img_name;
        private img_head;
        private lab_success;
        private lab_master;
        private list;
        private btn;
        private timeItem;
        private coinItem;
        private progress;
        data: guild_zhanyaotai_boss_struct;
        private _proxy;
        private _listData;
        /**是否击杀 */
        private _status;
        private _endTime;
        private _cfg;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    class UnionKillTipsView extends eui.Component {
        btn: Btn;
        list: eui.List;
        list_summon: eui.List;
        list_kill: eui.List;
        grp_eff: eui.Group;
        costIcon: CostIcon;
        nameItem: AvatarNameItem;
        lab_limit: eui.Label;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionKillView extends eui.Component {
        head: HeadVip;
        lab_nobody: eui.Label;
        lab_name: eui.Label;
        lab_count: eui.Label;
        lab_power: eui.Label;
        img_zhanli: eui.Image;
        btn_rank: Btn;
        timeItem: TimeItem;
        list: eui.List;
        grp_tips_private: eui.Group;
        progress: ProgressBarComp;
        timeItem2: TimeItem;
        btn_summon: Btn;
        btn_preview: Btn;
        btn_fight: Btn;
        lab_master: eui.Label;
        lab_wait: eui.Label;
        coinItem: CoinItem;
        lab_help: eui.Label;
        list_reward: eui.List;
        img_name: eui.Image;
        img_head: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionRankTipsView extends eui.Component {
        list_reward: eui.List;
        btn_do: Btn;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.union {
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    class UnionTreasureHelpItem extends BaseRenderer {
        private lab;
        private btn;
        private _proxy;
        data: guild_yibao_help_struct;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    class UnionTreasureHelpView extends eui.Component {
        btn: Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import UpdateItem = base.UpdateItem;
    class UnionTreasureItem extends BaseRenderer implements UpdateItem {
        private img_bg;
        private lab_name;
        private box;
        private timeItem;
        private btn;
        private lab;
        private bar;
        private _proxy;
        private endTime;
        private status;
        data: guild_yibao_box_struct;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onNull;
        private onStart;
        private onEnd;
        private onInvite;
        update(time: base.Time): void;
        private onClickBox;
        private onClickBtn;
    }
}
declare namespace game.mod.union {
    class UnionTreasureRewardItem extends BaseRenderer {
        private lab;
        private progress;
        private _proxy;
        data: UnionTreasureRewardData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
    interface UnionTreasureRewardData {
        str: string;
        value: number;
        target: number;
    }
}
declare namespace game.mod.union {
    class UnionTreasureRewardView extends eui.Component {
        list: eui.List;
        icon: Icon;
        timeItem: TimeItem;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionTreasureView extends eui.Component {
        grp_eff: eui.Group;
        list_item: eui.List;
        btn_rank: Btn;
        btn_help: Btn;
        btn_reward: Btn;
        btn_onekey: Btn;
        btn_once: Btn;
        timeItem: TimeItem;
        timeItem2: TimeItem;
        coinItem: CoinItem;
        hpItem: UnionBossHpItem;
        constructor();
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionFightMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private readonly HP_WIDTH;
        private readonly ALL_HP;
        private self;
        private boss;
        private id;
        /**总血量 */
        private boss_all;
        /**当前 */
        private boss_hp;
        /**血量扣除 */
        private boss_deduct;
        /** */
        private boss_index;
        /**结束血量比例 */
        private boss_end_hp;
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
declare namespace game.mod.union {
    class UnionKillMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionKillMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        /**排行榜时间 */
        private _endTime;
        /**boss时间 */
        private _endTime2;
        /**0没召唤 1召唤中 2领取 */
        private _status;
        private _cfg;
        private _cost;
        private _data;
        private _listData;
        private _rewardData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        private onUpdateStatus;
        private onUpdateMvp;
        update(time: base.Time): void;
        private onClickRank;
        private onClickPreview;
        private onClickSummon;
        private onClickFight;
        private onClickHelp;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionKillRank2Mdr extends UnionKillRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.union {
    class UnionKillRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    class UnionMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.union {
    class UnionKillTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private showBtn;
        private _cfg;
        private eft_id;
        private _listData;
        private _summonData;
        private _killData;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateType;
        private onUpdateView;
        private onTabChanged;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionRankSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        private _type;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.union {
    class UnionRankTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.union {
    class UnionTreasureHelpMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionTreasureMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    /**遗宝 */
    class UnionTreasureMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private readonly _len;
        private eft_id;
        private _endTime;
        private _cfg;
        private _costIdx;
        private _recoverTime;
        private _beginTime;
        private _isHasGuide;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        private onClickKey;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        private onUpdateProp;
        private onBagUpdateByPropIndex;
        update(time: base.Time): void;
        private onClickPreview;
        private onClickRank;
        private onClickHelp;
        private onClickOneKey;
        private onClickOnce;
        private onClickReward;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionTreasureRank2Mdr extends UnionTreasureRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.union {
    class UnionTreasureRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    import ArrayCollection = eui.ArrayCollection;
    class UnionProgressReward extends BaseRenderer {
        img_tips: eui.Image;
        lab_count: eui.Label;
        list_reward: eui.List;
        list_progress: eui.List;
        protected _listData: ArrayCollection;
        protected _listReward: ArrayCollection;
        constructor();
        protected onAddToStage(): void;
        setData(val: number): void;
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    class UnionTreasureRewardMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _status;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        private onClick;
        update(time: base.Time): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    import guild_auction_data = msg.guild_auction_data;
    import UpdateItem = base.UpdateItem;
    class UnionAuctionItem extends BaseRenderer implements UpdateItem {
        private icon;
        private lab_title;
        private btn_buy;
        private timeItem;
        private _proxy;
        private _cost;
        data: guild_auction_data;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onClickBtn;
    }
}
declare namespace game.mod.union {
    class UnionAuctionView extends eui.Component {
        list: eui.List;
        grp_tips: eui.Group;
        lab_explain: eui.Label;
        lab_jump: eui.Label;
        constructor();
    }
}
declare namespace game.mod.union {
    import GuildXianshouTargetConfig = game.config.GuildXianshouTargetConfig;
    class UnionBeastRewardItem extends BaseGiftItemRender {
        data: {
            cfg: GuildXianshouTargetConfig;
            state: RewardStatus;
        };
        private _proxy;
        private _status;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.union {
    class UnionBeastRewardView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionBeastTaskItem extends TaskRender {
        private coinItem;
        private img_icon;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    class UnionBeastView extends eui.Component {
        power: Power;
        nameItem: AvatarNameItem;
        coinItem: CoinItem;
        btn_up: UpStarBtn;
        list_task: eui.List;
        btn_rank: Btn;
        btn_reward: Btn;
        btn_ring: Btn;
        grp_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.union {
    import GuildStudyConfig = game.config.GuildStudyConfig;
    class UnionBookItem extends BaseRenderer {
        private _proxy;
        img_icon: eui.Image;
        img_lock: eui.Image;
        img_quality: eui.Image;
        lab_level: eui.Label;
        lab_name: eui.Label;
        redPoint: eui.Image;
        name_item: AvatarNameItem;
        grp_open: eui.Group;
        lab_open: eui.Label;
        data: GuildStudyConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    class UnionBookSkillView extends eui.Component {
        private lab_desc;
        private lab_name;
        private lab_cnt;
        private img_icon;
        setData(index: number, stage: number): void;
    }
}
declare namespace game.mod.union {
    class UnionBookUpTipsView extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill: game.mod.SkillItemRender;
        grp_desc: eui.Group;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionBookUpTipsView2 extends eui.Component {
        img_bg: eui.Image;
        grp_eft2: eui.Group;
        img_title: eui.Image;
        grp_eft: eui.Group;
        grp_show: eui.Group;
        grp_lv1: eui.Group;
        grp_lv2: eui.Group;
        skill1: game.mod.SkillItemRender;
        grp_desc1: eui.Group;
        lab_lv1: eui.Label;
        lab_name1: eui.Label;
        lab_desc1: eui.Label;
        skill2: game.mod.SkillItemRender;
        grp_desc2: eui.Group;
        lab_lv2: eui.Label;
        lab_name2: eui.Label;
        lab_desc2: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionBookView extends eui.Component {
        list: eui.List;
        grp_eff: eui.Group;
        nameItem: AvatarNameItem;
        power: Power2;
        bookItem: UnionBookSkillView;
        img_max: eui.Image;
        icon: Icon;
        btn_up: Btn;
        lab_limit: eui.Label;
        node_1: eui.Image;
        node_2: eui.Image;
        node_3: eui.Image;
        node_4: eui.Image;
        node_5: eui.Image;
        node_6: eui.Image;
        node_7: eui.Image;
        node_8: eui.Image;
        node_9: eui.Image;
        node_10: eui.Image;
        line_2: eui.Image;
        line_3: eui.Image;
        line_4: eui.Image;
        line_5: eui.Image;
        line_6: eui.Image;
        line_7: eui.Image;
        line_8: eui.Image;
        line_9: eui.Image;
        line_10: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionDonateEquipItem extends IconSel {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    class UnionDonateEquipView extends eui.Component {
        secondPop: SecondPop;
        list_item: eui.List;
        btn_donate: Btn;
        lab_tips: eui.Label;
        lab_explain: eui.Label;
        coinItem: CoinItem;
        scr: eui.Scroller;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionLotteryRewardView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionSelectComponent extends BaseRenderer {
        gr_box: eui.Group;
        private gr_list;
        private img_status;
        private lab_select;
        list: eui.List;
        private _proxy;
        private _listData;
        private _show;
        private _keys;
        private _type;
        protected onAddToStage(): void;
        setData(keys?: UnionSelectData[]): void;
        private onUpdateStatus;
        setStatus(): void;
        readonly getIndex: number;
        readonly getKey: string;
    }
}
declare namespace game.mod.union {
    class UnionSelectItem extends BaseRenderer {
        private lab_select;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    class UnionStorageItem extends Icon {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    import guild_ware_donate = msg.guild_ware_donate;
    class UnionStorageMsgItem extends BaseRenderer {
        private lab_content;
        private lab_equip;
        data: guild_ware_donate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickProp;
    }
}
declare namespace game.mod.union {
    class UnionStorageView extends eui.Component {
        list_item: eui.List;
        list_msg: eui.List;
        btn_recycle: Btn;
        btn_donate: Btn;
        coinItem: CostIcon;
        scr: eui.Scroller;
        checkbox: eui.CheckBox;
        constructor();
    }
}
declare namespace game.mod.union {
    import GuildBaoKuConfig = game.config.GuildBaoKuConfig;
    class UnionStoreItem extends BaseRenderer {
        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;
        data: GuildBaoKuConfig;
        private _proxy;
        private lmt_cnt;
        private left_cnt;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    class UnionStoreTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_cnt: eui.Label;
        lab_1: eui.Label;
        lab_2: eui.Label;
        lab_3: eui.Label;
        coinItem: CoinItem;
        btn_cancel: Btn;
        btn_confirm: Btn;
        btn_add: Btn;
        btn_addTen: Btn;
        btn_subtract: Btn;
        btn_subtractTen: Btn;
        constructor();
    }
}
declare namespace game.mod.union {
    /**拍卖 */
    class UnionAuctionMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickExplain;
        private onClickJump;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionBeastBuffTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _list;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.union {
    class UnionBeastMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**仙兽 */
    class UnionBeastMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickUp;
        private onClickReward;
        private onClickRank;
        private onClickRing;
        private onUpdateTask;
        private onTaskUpdate;
        private onUpdateHint;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionBeastRank2Mdr extends UnionBeastRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.union {
    class UnionBeastRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
    }
}
declare namespace game.mod.union {
    class UnionShengLotteryView extends eui.Component {
        img_bg: eui.Image;
        icon_1: UnionShengLotteryItem;
        icon_2: UnionShengLotteryItem;
        icon_3: UnionShengLotteryItem;
        icon_4: UnionShengLotteryItem;
        icon_5: UnionShengLotteryItem;
        icon_6: UnionShengLotteryItem;
        icon_7: UnionShengLotteryItem;
        icon_8: UnionShengLotteryItem;
        btn_ten: Btn;
        btn_one: Btn;
        btn_explain: Btn;
        btn_look: Btn;
        btn_reward: Btn;
        btn_get: Btn;
        progress: ProgressBarComp;
        cost_one: CoinItem;
        cost_ten: CoinItem;
        grp: eui.Group;
        reward: UnionProgressReward;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionBeastRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionBookMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**书斋 */
    class UnionBookMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _cost;
        private _init;
        private readonly nodes;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateStatus;
        private onClickTips;
        private onClickBtn;
        private onClickSelect;
        private onClickAttr;
        private onUpdateIndex;
        private readonly getData;
        protected onHide(): void;
        private readonly is_max;
    }
}
declare namespace game.mod.union {
    class UnionBookUpTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: BattleSkillItemRenderData; /**技能数据*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod.union {
    class UnionBookUpTipsMdr2 extends EffectMdrBase {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTitleTween;
        private removeTitleTween;
        private showBgTween;
        private removeBgTween;
        private showGrpTween;
        private removeGrpTween;
        private showDescTween;
        private removeDescTween;
        private showSkillTween;
        private removeSkillTween;
        private showTipsTween;
        private removeTipsTween;
        private showEffect;
    }
}
declare namespace game.mod.union {
    class UnionDonateEquipMdr extends MdrBase {
        private _view;
        private _proxy;
        private _idxs;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateScore;
        private onClickDonate;
        private onSelect;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**回收 */
    class UnionRecycleMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _idxs;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateBox;
        private onUpdateScore;
        private onClickSelect1;
        private onClickBox1;
        private onClickSelect2;
        private onClickBox2;
        private onClickRecycle;
        private onClickOneSelect;
        private onClickSelectBox;
        private onClickReward;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionStorageMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**仓库 */
    class UnionStorageMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _msgData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCount;
        private onClickRecycle;
        private onClickDonate;
        private onRoleUpdate;
        private onClickCheckbox;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    import UpdateItem = base.UpdateItem;
    /**宗门宝库 */
    class UnionStoreMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        update(time: base.Time): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionStoreTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private index;
        /**单次兑换数量 */
        private count;
        /**总兑换次数 */
        private num;
        /**剩余可兑换次数 */
        private _leftCnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCost;
        protected onHide(): void;
        private onConfirm;
        private setCnt;
        private onAdd;
        private onAddTen;
        private onSubtract;
        private onSubtractTen;
        private readonly getCnt;
    }
}
declare namespace game.mod.union {
    class UnionApplyListView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        checkbox1: eui.CheckBox;
        checkbox2: eui.CheckBox;
        editable_value: eui.EditableText;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionCreateView extends eui.Component {
        editable_value: eui.EditableText;
        btn: Btn;
        btn_random: Btn;
        lab_tips: eui.Label;
        lab_jump: eui.Label;
        img_common: eui.Image;
        img_common_sel: eui.Image;
        img_vip: eui.Image;
        img_vip_sel: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionDonateView extends eui.Component {
        secondPop: SecondPop;
        btn: Btn;
        lab_level: eui.Label;
        lab_level2: eui.Label;
        lab_member: eui.Label;
        lab_member2: eui.Label;
        lab_wage: eui.Label;
        lab_wage2: eui.Label;
        coin_1: CostIcon;
        coin_2: CostIcon;
        coin_3: CostIcon;
        list_1: eui.List;
        list_2: eui.List;
        list_3: eui.List;
        progress: ProgressBarComp;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionFirstView extends eui.Component {
        img_bg: eui.Image;
        head: Head;
        lab_name: eui.Label;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionInView extends eui.Component {
        /**仙尊秘宝 */
        btn_hero: Btn;
        /**每日俸禄 */
        btn_wage: Btn;
        /**宗门图标弹出捐赠界面 */
        btn_donate: Btn;
        /**宗名 */
        lab_name: eui.Label;
        /**等级 */
        /**公告 */
        lab_notice: eui.Label;
        /**宗主头像 */
        head: Head;
        /**宗主名字 */
        lab_header: eui.Label;
        /**福利大厅 */
        btn_welfare: Btn;
        /**天坛/圣坛 */
        btn_lottery: Btn;
        /**仙宗遗宝 */
        btn_treasure: Btn;
        /**斩妖台 */
        btn_kill: Btn;
        /**书斋 */
        btn_book: Btn;
        /**仙兽 */
        btn_beast: BtnIconBase;
        /**仓库 */
        btn_storage: Btn;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionListView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionMemberPopupView extends eui.Component {
        secondPop: SecondPop;
        img_bg: eui.Image;
        head: HeadVip;
        power: Power;
        lab_name: eui.Label;
        lab_power: eui.Label;
        btn_down: Btn;
        btn_up: Btn;
        grp_eff: eui.Group;
        img_job: eui.Image;
        img_di: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionMemberView extends eui.Component {
        btn_exit: Btn;
        btn_rename: Btn;
        btn_explain: Btn;
        /**招募（频道发送消息） */
        btn_recruit: Btn;
        /**查看申请 */
        btn_check: Btn;
        lab_level: eui.Label;
        lab_name: eui.Label;
        lab_leader: eui.Label;
        lab_count: eui.Label;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionRenameView extends eui.Component {
        secondPop: SecondPop;
        editable_value: eui.EditableText;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionSetHeroView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionWageView extends eui.Component {
        secondPop: SecondPop;
        btn: Btn;
        list: eui.List;
        img_get: eui.Image;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionXianZunShopView extends eui.Component {
        /**列表 */
        list: eui.List;
        /**倒计时 */
        lb_time: eui.Label;
        /**可不用 用tab的bg */
        img_bg: eui.Image;
        /**大奖banner图 */
        img_banner: eui.Image;
        /**时间容器 */
        gr_time: eui.Group;
        head: Head;
        lab_name: eui.Label;
        btn_explain: Btn;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionTianLotteryView extends eui.Component {
        btn_explain: Btn;
        btn_one: Btn;
        btn_ten: Btn;
        cost_one: CoinItem;
        cost_ten: CoinItem;
        checkbox: eui.CheckBox;
        list: eui.List;
        btn_next: Btn;
        btn_tips: Btn;
        /**选中框 */
        img_sel: eui.Image;
        icon_1: UnionLotteryItem;
        icon_2: UnionLotteryItem;
        icon_3: UnionLotteryItem;
        icon_4: UnionLotteryItem;
        icon_5: UnionLotteryItem;
        icon_6: UnionLotteryItem;
        icon_7: UnionLotteryItem;
        icon_8: UnionLotteryItem;
        constructor();
    }
}
declare namespace game.mod.union {
    class UnionDonateItem extends CostIcon {
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.union {
    import guild_data = msg.guild_data;
    /**仙门列表item */
    class UnionListItem extends BaseRenderer {
        private btn;
        private lab_name;
        private lab_limit;
        private lab_leader;
        private lab_count;
        private lab_level;
        private img_apply;
        private _proxy;
        data: guild_data;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    import member_data = msg.member_data;
    class UnionMemberItem extends BaseRenderer {
        private lab_name;
        private lab_power;
        private head;
        private lab_online;
        private img_job;
        private img_hero;
        data: member_data;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    class UnionSetHeroItem extends UnionApplyItem {
        private btn;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickSet;
    }
}
declare namespace game.mod.union {
    import UnionProxy = game.mod.union.UnionProxy;
    class UnionShopItem extends BaseRenderer {
        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;
        protected _proxy: UnionProxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.union {
    /**申请列表界面 */
    class UnionApplyListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _limit;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateLimit;
        private onChangeValue;
        private onCheckSelect;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**创建宗门 */
    class UnionCreateMdr extends MdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateName;
        private onSelectCommon;
        private onSelectVip;
        private onClick;
        private onJumpVip;
        private onRandom;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**宗门捐赠 */
    class UnionDonateMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cfg;
        private _listData1;
        private _listData2;
        private _listData3;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onInitView;
        private onUpdateView;
        private onDonate;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**首次欢迎界面 */
    class UnionFirstMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionInMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        protected addListeners(): void;
        private onUpdateData;
        private onUpdateInUnion;
    }
}
declare namespace game.mod.union {
    class UnionInMdr extends MdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateWage;
        private onDonate;
        private onWelfare;
        private onLottery;
        private onTreasure;
        private onKill;
        private onStorage;
        private onBook;
        private onBeast;
        private onClickHead;
        private onClickWage;
        /**仙尊秘宝 */
        private onClickHero;
        private onUpdateHint;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**宗门列表界面 */
    class UnionListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**成员列表 */
    class UnionMemberMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateHeader;
        private onUpdateUnionName;
        private onUpdateUninonCount;
        private onUpdateList;
        /** */
        private onRename;
        /**问号 规则 */
        private onExplain;
        private onClickCheck;
        private onClickExit;
        private onExit;
        private onClickRecruit;
        private onRecruit;
        private onUpdateHint;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**成员信息二级弹窗界面 */
    class UnionMemberPopupMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickDown;
        private onFired;
        private onDown;
        private onClickUp;
        private onUpgrade;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**改名弹窗 */
    class UnionRenameMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onRename;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    /**设置仙尊 */
    class UnionSetHeroMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    class UnionShopMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.union {
    /**每日俸禄 */
    class UnionWageMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateBtn;
        private onClick;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    class UnionXianZunShopMdr extends MdrBase implements UpdateItem {
        protected _view: UnionXianZunShopView;
        protected _proxy: UnionProxy;
        protected _listData: ArrayCollection;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateHero;
        private onUpdateList;
        private onExplain;
        update(time: base.Time): void;
        private onUpdateTime;
        protected onHide(): void;
    }
}
declare namespace game.mod.union {
    import member_data = msg.member_data;
    import guild_data = msg.guild_data;
    import guild_reward = msg.guild_reward;
    import guild_draw_data = msg.guild_draw_data;
    import guild_shengtan = msg.guild_shengtan;
    import shengtai_data = msg.shengtai_data;
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import guild_yibao_task_struct = msg.guild_yibao_task_struct;
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    import teammate = msg.teammate;
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import guild_zhanyaotai_zhaohuan_struct = msg.guild_zhanyaotai_zhaohuan_struct;
    import guild_ware_donate = msg.guild_ware_donate;
    import prop_attributes = msg.prop_attributes;
    import guild_auction_data = msg.guild_auction_data;
    import guild_draw = msg.guild_draw;
    import guild_study_data = msg.guild_study_data;
    import attributes = msg.attributes;
    import prop_tips_data = msg.prop_tips_data;
    class UnionModel {
        /**展示欢迎弹窗 */
        show_welcome: boolean;
        /**当前宗门id */
        id: number;
        /**当前宗门名称 */
        name: string;
        /**当前宗门职位id: 1.宗主2.副宗主3.精英4.成员 0退出*/
        guild_job: number;
        /**退出宗门冷却时间 */
        quit_cd: number;
        /**创建宗门冷却时间 */
        create_cd: number;
        /**是否创建vip宗门 */
        is_create: boolean;
        /**我申请的宗门 */
        apply_list: number[];
        /**当前可操作申请列表(用于判断红点 列表调协议获取) */
        apply_record: Long[];
        /**是否领取每日奖励 */
        is_get_reward: boolean;
        /**宗门等级 */
        union_level: number;
        /**创建宗门名字 有值则不自动发请求获取随机名字 */
        random_name: string;
        /**宗门数据 */
        info: guild_data;
        /**宗主数据 */
        header: member_data;
        /**宗门列表 */
        guild_list: guild_data[];
        /**成员列表 */
        member_list: member_data[];
        /**申请列表 */
        apply_info: member_data[];
        /**创建宗门页面状态获取创建类型 */
        getCreateTypeByStatus: {
            [status: string]: number;
        };
        /**仙宗功能模块 */
        open_fun: string;
        /**仙尊数据 */
        hero: member_data;
        /**仙尊秘宝列表id */
        hero_list: number[];
        /**福利大厅发奖励最多 */
        mvp: member_data;
        /**福利大厅奖励 */
        charge_list: guild_reward[];
        /**mvp发奖励次数 */
        mvp_count: number;
        /**福利大厅红点路径 */
        welfare_root: string[];
        /**天坛抽奖材料index */
        tian_cost: number[];
        /**圣坛抽奖材料index */
        sheng_cost: number[];
        /**天坛抽奖数据 列表次数为已抽 */
        info_tian: guild_draw_data;
        /**圣坛数据 */
        shengtan_info: guild_shengtan;
        /**圣坛大奖 */
        list_sheng: shengtai_data[];
        /**圣坛走马灯信息 */
        list_sheng_run: shengtai_data[];
        /**圣坛更多大奖列表 */
        list_sheng_reward: shengtai_data[];
        /**天坛圣坛红点路径 */
        lottery_root: string[];
        getTipsByType: {
            [type: number]: string;
        };
        boss_index: number;
        boss_hp: number;
        box_list: guild_yibao_box_struct[];
        task_list: guild_yibao_task_struct[];
        task_rewards_status: number;
        recover_time: number;
        guild_ranks: teammate[];
        my_guild_rank: teammate;
        person_ranks: teammate[];
        my_rank: teammate;
        last_rank_num: number;
        props: prop_tips_data[];
        request_help_list: guild_yibao_help_struct[];
        my_boss_data: guild_zhanyaotai_boss_struct;
        boss_list: guild_zhanyaotai_boss_struct[];
        boss_mvp: teammate;
        limit_list: guild_zhanyaotai_zhaohuan_struct[];
        boss_guild_ranks: teammate[];
        boss_my_guild_rank: teammate;
        boss_person_ranks: teammate[];
        boss_my_rank: teammate;
        boss_last_rank_num: number;
        boss_props: prop_tips_data[];
        xianzong_yibao_jiasu_shangxian: number;
        kill_boss_cost_index: number[];
        /**最大格子数 */
        max_boxs: number;
        equip_map: Map<string, PropData[]>;
        item_list: prop_attributes[];
        list_len: number;
        donate_logs: guild_ware_donate[];
        /**仓库宝箱积分 */
        guild_score: number;
        auction_list: guild_auction_data[];
        store_list: guild_draw[];
        store_count: number;
        guild_exchange_num: number;
        book_list: guild_study_data[];
        book_cost_idxs: number[];
        beast_stage: number;
        total_exp: number;
        week_rewards: number[];
        base_attrs: attributes;
        extra_attrs: attributes;
        beast_guild_ranks: teammate[];
        beast_my_guild_rank: teammate;
        beast_person_ranks: teammate[];
        beast_my_rank: teammate;
        beast_last_rank_num: number;
        beast_props: prop_tips_data[];
    }
}
declare namespace game.mod.union {
    class UnionRecycleView extends eui.Component {
        list_item: eui.List;
        selectItem1: UnionSelectComponent;
        selectItem2: UnionSelectComponent;
        btn_recycle: Btn;
        btn_select: Btn;
        lab_tips: eui.Label;
        lab: eui.Label;
        progress: ProgressBarComp;
        scr: eui.Scroller;
        btn_reward: Btn;
        constructor();
    }
}
