declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class FengmoRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected _type: number;
        private _tips;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        private onUpdateTips;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XiandiRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected _type: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        update(time: base.Time): void;
        private updateTime;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianmaiItemTipsMdr extends MdrBase implements UpdateItem {
        protected _view: XianmaiItemTipsView;
        protected _proxy: XianmaiProxy;
        private _stage;
        private _index;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onUpdateMyShow(): void;
        protected onUpdateStageShow(): void;
        protected updateView(): void;
        protected onClickBtndo(): void;
        private dealFunc;
        private updateDefendView;
        private updateNotoneView;
        protected updateCoolTime(): void;
        protected updateTime(): void;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianmaiRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected _type: number;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onCount;
        private onUpdateTime;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.more {
    class MiningResultFailView extends eui.Component {
        closeTips: game.mod.CloseTips;
        icon_group: eui.Group;
        img_title: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongHuashenMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listAvatar;
        private _listModel;
        /**类型*/
        protected _legionType: LegionType;
        /**上阵个数*/
        private _maxCnt;
        /**上阵的id列表*/
        private _seledList;
        /**激活的id列表*/
        private _actedList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initList;
        private onUpdateView;
        private updateView;
        private updateListAvatar;
        private getList;
        private isBattle;
        private updateListModel;
        private onClickOneKey;
        private onClickList;
        private onClickListModel;
        private finallyShangzhen;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouZhanbaoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    import HonourConfig = game.config.HonourConfig;
    class HonourItem extends BaseListenerRenderer {
        lb_limitcnt: eui.Label;
        lb_taskdef: eui.Label;
        icon: game.mod.Icon;
        lb_status: eui.Label;
        img_status: eui.Image;
        redPoint: eui.Image;
        data: IHonourItemData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IHonourItemData {
        type: HonourType;
        cfg: HonourConfig;
        info: msg.honour_info;
    }
}
declare namespace game.mod.more {
    class HonourView extends eui.Component {
        list: eui.List;
        lb_limitcnt: eui.Label;
        head: game.mod.Head;
        lb_date: eui.Label;
        lb_desc: eui.Label;
        icon: game.mod.Icon;
        lb_taskdesc: eui.Label;
        bar: game.mod.ProgressBarComp;
        btn_go: game.mod.Btn;
        img_status: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class AchieveMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    class AchieveMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _taskList;
        private _canDraw;
        private _canAllDraw;
        private _cfg;
        private _eftId_title;
        protected onInit(): void;
        protected addListeners(): void;
        protected updateAddEft(n: GameNT): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private onInfoUpdate;
        private onRoleUpdate;
        private onClickDraw;
        private onClickIcon;
        private updateTaskList;
        private updateView;
        private removeTween;
        private removeEftTitle;
    }
}
declare namespace game.mod.more {
    class HonourMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _selIdx;
        private _selCfg;
        /**荣耀类型*/
        protected _type: HonourType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateTaskInfo;
        private updateView;
        private updateListData;
        private updateSelectInfo;
        private onClickBtnGo;
        private onClickList;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import guild_pk_base = msg.guild_pk_base;
    class CrossUnionFightProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_guild_pk_use_skill(index: number): void;
        private s2c_guild_pk_update_reward;
        private s2c_guild_pk_enter;
        private s2c_guild_pk_update_buff;
        private s2c_guild_pk_use_skill;
        /**播放表现完成 更新数据 */
        onUpdateData(step: CUFightData): void;
        /**战斗步骤数据 */
        getStepData(index: number): CUFightData;
        setRole(dead_id: Long, role: teammate): void;
        updateRole(target_id: Long, value: number): void;
        updateBeast(type: number, value: number): void;
        getRoleInfo(index: number): teammate;
        getRoleIndex(role_id: Long): number;
        /**根据传入的index获取对位index */
        getFightIndex(index: number): number;
        readonly my_base: guild_pk_base;
        readonly target_base: guild_pk_base;
        readonly reward_num: number;
        readonly reward_status: number;
        onExit(): void;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import guild_pk_skill = msg.guild_pk_skill;
    import guild_pk_buff_data = msg.guild_pk_buff_data;
    import guild_pk_dead_data = msg.guild_pk_dead_data;
    import s2c_guild_pk_fight_show = msg.s2c_guild_pk_fight_show;
    class CrossUnionModel {
        /**是否报名 */
        is_join: boolean;
        /**胜负奖励 1.可领取2.已领取(胜败奖励) */
        status: number;
        /**战斗结果 1.成功2.失败(战斗结果) */
        ret: number;
        /**是否你宗门在本次参加 */
        is_guild_join: boolean;
        /**仙宗数据 */
        my_base: msg.guild_pk_base;
        /**敌对仙宗数据 */
        target_base: msg.guild_pk_base;
        /**敌方队伍数据 */
        list_emeny: Map<number, Map<number, teammate>>;
        /**队伍数据 用于滑动列表展示外显 */
        list: Map<number, Map<number, teammate>>;
        /**队伍数据 用于调整阵型 */
        team_list: Map<number, msg.guild_pk_lineup_base>;
        zhanbao: msg.guild_pk_zhanbao[];
        /**开启日期 */
        /**开启时间 */
        readonly openHours: number;
        /**更换队伍顺序选中的role_id */
        select: number | Long;
        /**选择阵营 1本方2敌方 */
        camp: number;
        guild_pk_win_rewar: number[][];
        guild_pk_lose: number[][];
        guild_pk_show: number[][];
        guild_pk_see_reward: number[][];
        guild_pk_open: number[][];
        guild_mate_time: number[];
        fight_infos: Map<number, s2c_guild_pk_fight_show>;
        /**-------------------战斗--------------------- */
        /**观战奖励状态:0未达成1可领取2已领取 */
        reward_status: number;
        /**观战可领取的次数 */
        reward_num: number;
        fight_list: Map<number, teammate>;
        skill_cd_list: guild_pk_skill[];
        fight_step: CUFightData[];
    }
    interface CUFightData {
        /**技能类型 无则普通对线 */
        type?: number;
        /**扣血详情 */
        list?: guild_pk_buff_data[];
        /**是否死亡替换角色 */
        is_dead?: boolean;
        /**死亡替换列表 */
        list_dead?: guild_pk_dead_data[];
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import guild_pk_base = msg.guild_pk_base;
    import s2c_guild_pk_fight_show = msg.s2c_guild_pk_fight_show;
    class CrossUnionProxy extends ProxyBase {
        private _model;
        initialize(): void;
        /**------------------------协议------------------------- */
        c2s_guild_pk_root(): void;
        c2s_guild_pk_team_show(type: number): void;
        c2s_guild_pk_team_slide(type: number, start_pos: number, end_pos: number): void;
        c2s_guild_pk_lineup_show(): void;
        c2s_guild_pk_zhanbao(): void;
        /**1.报名2.加入队伍3.调整位置4.领取奖励(胜败奖励)5.领取观战奖励6.进入战斗场景 */
        c2s_guild_pk_oper(oper: number, index?: number, start_id?: Long, end_id?: Long): void;
        c2s_guild_pk_fight_show(team_index: number): void;
        private s2c_guild_pk_root;
        /**备战界面 显示外显列表 */
        private s2c_guild_pk_team_show;
        /**调整阵型主界面显示 */
        private s2c_guild_pk_lineup_show;
        /**滑动加载 */
        private s2c_guild_pk_team_slide;
        private s2c_guild_pk_zhanbao;
        private s2c_guild_pk_oper;
        private s2c_guild_pk_fight_show;
        private s2c_guild_pk_ret;
        /**------------------------协议------------------------- */
        /**-----------------------数据逻辑---------------------- */
        getFightInfos(index: number): s2c_guild_pk_fight_show;
        getTeamInfo(type: number): guild_pk_base;
        getTeamList(index: number): CrossUnionFormatData[];
        /**全部队伍的列表 */
        getList(type: number): teammate[];
        readonly team_list_data: {
            team_index: number;
            power: number;
            count: number;
        }[];
        readonly openHours: number;
        readonly openDays: number[];
        readonly openState: CrossUnionOpenState;
        /**判断开启界面 */
        readonly openView: string;
        /**匹配开始时间 */
        readonly matchTime: number;
        /**战斗开始时间 */
        readonly openTime: number;
        select: number | Long;
        readonly is_join: boolean;
        readonly status: number;
        readonly ret: number;
        readonly is_guild_join: boolean;
        camp: number;
        getMap(type: number): Map<number, Map<number, teammate>>;
        readonly team_oper: boolean;
        readonly zhanbao: msg.guild_pk_zhanbao[];
        resetResult(status: number, ret?: number): void;
        /**-----------------------数据逻辑---------------------- */
        /**-------------------------参数表配置------------------------ */
        getRewards(ret: number): number[][];
        readonly guild_pk_win_rewar: number[][];
        readonly guild_pk_lose: number[][];
        readonly guild_pk_show: number[][];
        readonly guild_pk_see_reward: number[][];
        readonly guild_pk_open: number[][];
        readonly guild_mate_time: number[];
    }
}
declare namespace game.mod.more {
    class CrossUnionFormatItem extends BaseRenderer {
        private btn;
        private lab_pos;
        private lab_name;
        private powerLab;
        private lab_job;
        private _proxy;
        private _idx;
        data: CrossUnionFormatData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
    interface CrossUnionFormatData {
        team: number;
        info: msg.guild_pk_lineup_member;
    }
}
declare namespace game.mod.more {
    class CrossUnionFormatView extends eui.Component {
        list: eui.List;
        list_type: eui.List;
        secondPop: SecondPop;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class CrossUnionPlayerItem extends BaseRenderer {
        private lab_name;
        private grp_eft;
        private title;
        private _idx;
        data: teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionReadyView extends eui.Component {
        list_reward: eui.List;
        timeItem: TimeItem;
        btn: Btn;
        img_end: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class CrossUnionRewardView extends eui.Component {
        list_win: eui.List;
        list_lose: eui.List;
        list_look: eui.List;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import guild_pk_base = msg.guild_pk_base;
    class CrossUnionSetTeamItem extends BaseRenderer {
        private lab_name;
        private lab_num;
        private lab_level;
        private bar;
        private img_sel;
        private img_icon;
        data: guild_pk_base;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: guild_pk_base): void;
        isSelect: boolean;
    }
}
declare namespace game.mod.more {
    class CrossUnionTeamItem extends BaseRenderer {
        private lab_cnt;
        private powerLab;
        private title;
        private _idx;
        data: {
            team_index: number;
            power: number;
            count: number;
        };
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionTeamTitle extends BaseRenderer {
        private lab_team;
        private btn_check;
        data: number;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(index: number): void;
        private onClickBtn;
    }
}
declare namespace game.mod.more {
    class CrossUnionTeamView extends eui.Component {
        btn: Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class CrossUnionView extends eui.Component {
        list_item: eui.List;
        timeItem: TimeItem;
        btn: Btn;
        btn_reward: Btn;
        btn_formation: Btn;
        btn_tips: Btn;
        btn_explain: Btn;
        scroller: eui.Scroller;
        item_1: CrossUnionSetTeamItem;
        item_2: CrossUnionSetTeamItem;
        constructor();
    }
}
declare namespace game.mod.more {
    import guild_pk_zhanbao = msg.guild_pk_zhanbao;
    class CrossUnionZhanbaoItem extends BaseRenderer {
        private lab_union1;
        private lab_union2;
        private powerLab1;
        private powerLab2;
        private img_win;
        private lab_time;
        data: guild_pk_zhanbao;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionZhanbaoView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class CrossUnionBeastItem extends BaseRenderer {
        private grp_eft;
        data: {
            src: number;
            scale: number;
        };
        protected dataChanged(): void;
        setData(src: number, scale?: number): void;
    }
}
declare namespace game.mod.more {
    import guild_pk_details = msg.guild_pk_details;
    class CrossUnionResultItem extends BaseRenderer {
        private lab_name1;
        private lab_name2;
        private img_dead1;
        private img_dead2;
        private powerLab1;
        private powerLab2;
        private lab_debuff1;
        private lab_debuff2;
        data: {
            own: guild_pk_details;
            target: guild_pk_details;
        };
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionResultView extends eui.Component {
        list_type: eui.List;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class CrossUnionRole extends BaseRenderer {
        private grp_eft;
        private lab_name;
        private bar;
        data: {
            index: number;
            info: teammate;
        };
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(index: number, info: teammate): void;
        /**单独更新血量 */
        onUpdateHp(info: teammate): void;
        onUpdateEft(act: ActionName): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionSceneView extends eui.Component {
        grp_target: CrossUnionBeastItem;
        grp_own: CrossUnionBeastItem;
        role_1: CrossUnionRole;
        role_2: CrossUnionRole;
        role_3: CrossUnionRole;
        role_4: CrossUnionRole;
        role_5: CrossUnionRole;
        role_6: CrossUnionRole;
        role_7: CrossUnionRole;
        role_8: CrossUnionRole;
        item_1: CrossUnionSetTeamItem;
        item_2: CrossUnionSetTeamItem;
        lab_tips: eui.Label;
        list: eui.List;
        icon: Icon;
        lab_cnt: eui.Label;
        img_got: eui.Image;
        lab_info: eui.Label;
        btn_exit: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import GuildPkSkillConfig = game.config.GuildPkSkillConfig;
    class CrossUnionSkillItem extends BaseRenderer {
        private item;
        private attrList;
        private lab_name;
        private lab_desc;
        data: GuildPkSkillConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionSkillTipsView extends eui.Component {
        list: eui.List;
        clsoeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    import guild_pk_finally = msg.guild_pk_finally;
    class CrossUnionWinItem extends BaseRenderer {
        private lab_name;
        private lab_rank;
        private lab_kill;
        private img_mvp;
        data: guild_pk_finally;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionWinView extends eui.Component {
        list: eui.List;
        list_reward: eui.List;
        closeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    class CrossUnionFormatMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _tabData;
        private _tabList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTab;
        private onInitView;
        private onUpdateView;
        private onClickTab;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class CrossUnionMdr extends MdrBase implements base.UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private readonly _listLen;
        private _endTime;
        private _openState;
        private _timeTips;
        private _enemy;
        private _delayIdx;
        private _start;
        private _end;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onChangeView;
        private onUpdateView;
        private onUpdateList;
        private onUpdateTime;
        private onClickBtn;
        private onClickTeam;
        private onClickReward;
        private onClickFormat;
        private onClickExplain;
        private onClickZhanbao;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
        private select;
        /**-----------------滑动加载-------------------- */
        private onUpdateChange;
        private onRequest;
    }
}
declare namespace game.mod.more {
    class CrossUnionReadyMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class CrossUnionReadyMdr extends MdrBase implements base.UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _openState;
        private _timeTips;
        /**1报名 2领取 3战斗 */
        private _state;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onChangeView;
        private onUpdateView;
        private onUpdateTime;
        private onClickBtn;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
        private setBtn;
    }
}
declare namespace game.mod.more {
    class CrossUnionRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listReward;
        private _listLose;
        private _listLook;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionTeamMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickList;
        private onClickBtn;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class CrossUnionZhanbaoMdr extends MdrBase {
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
declare namespace game.mod.more {
    class CrossUnionResultMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _tabData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTab;
        private onUpdateView;
        private onClickTab;
        private onSort;
        protected onHide(): void;
        private selectIndex;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class CrossUnionSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _fight;
        private readonly _len;
        private _stepData;
        private _step;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onEnter;
        private onInitBeast;
        private onUpdateReward;
        /**更新阵营血量 */
        private onUpdateBeast;
        /**死亡时更新单个数据 */
        private onUpdateRoleByIndex;
        /**更新全部角色的数据 */
        private onUpdateRole;
        private onUpdateSkill;
        private onClickSkill;
        private onClickTips;
        private onClickInfo;
        private onClickReward;
        private onUpdateResult;
        protected onHide(): void;
        update(time: base.Time): void;
        private onUpdateStep;
    }
}
declare namespace game.mod.more {
    class CrossUnionSkillTipsMdr extends EffectMdrBase {
        private _view;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import s2c_guild_pk_ret = msg.s2c_guild_pk_ret;
    class CrossUnionWinMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: s2c_guild_pk_ret;
        private _listData;
        private _rewardData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import nv_shen_hun_ka_struct = msg.nv_shen_hun_ka_struct;
    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
    class GoddessRecordModel {
        event_index: number;
        event_stage: number;
        talk_level: number;
        is_finish: boolean;
        level: number;
        maxChatLv: number;
        prop_list: msg.zhandui_jitan_struct[];
        /** 累计加速时间 */
        total_speed_time: number;
        minVal: number;
        rewards: BasePreviewRewardData[];
        hint: string[];
        hunkaType: number;
        hunkaBagOpenType: number;
        hunkaSelPos: number;
        hunkaList: {
            [type: number]: nv_shen_hun_ka_struct;
        };
        hunkaScoreCfgList: {
            [type: number]: NvshenHunkaScoreConfig[];
        };
        hunkaComposeList: {
            [pos: number]: PropData;
        };
        hunkaComposeSelPos: number;
        hunkaSelQuality: number;
        hunkaPreview: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
        hunkaHint: string[];
        hunkaHintTypeList: {
            [type: number]: string[];
        };
        hunkaComposeHintType: string[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    import nv_shen_hun_ka_pos_struct = msg.nv_shen_hun_ka_pos_struct;
    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
    class GoddessRecordProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_chuang_shi_nv_shen_system_click(type: number, pos?: number, idxs?: Long[]): void;
        private s2c_chuang_shi_nv_shen_base_info;
        /**女神激活数量*/
        getActNum(): number;
        /**女神是否激活*/
        isAct(index: number): boolean;
        /**女神红点*/
        getHint(index: number): boolean;
        readonly lv: number;
        readonly chatLv: number;
        isChatFinish(): boolean;
        getChatOpenLv(): number;
        readonly chatMaxLv: number;
        /***************************事件************************************/
        getEventStage(index: number): number;
        getEventMaxStage(index: number): number;
        isEventOpen(index: number): boolean;
        isEventFinish(index: number): boolean;
        private isEventFinishByStage;
        checkChatHint(): boolean;
        checkEventHint(): boolean;
        checkEventPerHint(index: number): boolean;
        /***************************供奉************************************/
        private s2c_chuang_shi_nv_shen_gongfeng_info;
        readonly prop_list: zhandui_jitan_struct[];
        readonly total_speed_time: number;
        canIconDraw(info: zhandui_jitan_struct): boolean;
        canIconAdd(info: zhandui_jitan_struct): boolean;
        gongfenging(info: zhandui_jitan_struct): boolean;
        getGongfengInfo(): zhandui_jitan_struct;
        getTotalPropTime(): number;
        /**获取空格数量 */
        getSpaceCount(): number;
        private checkGongfengHint;
        private checkIconHint;
        /***************************抽奖************************************/
        getMinVal(): number;
        isOpenSummon(): boolean;
        checkSummonHint(): boolean;
        getSummonRewards(): BasePreviewRewardData[];
        /***************************红点************************************/
        private updateGoddessHint;
        private checkHint;
        protected onUpdateZhenrongInfo(n: GameNT): void;
        protected onBagUpdateByBagType(n: GameNT): void;
        protected onRolePrivilegeUpdate(n: GameNT): void;
        protected onRoleUpdate(n: base.GameNT): void;
        /***************************魂卡************************************/
        c2s_chuang_shi_nv_shen_hun_ka_click(buttonType: number, type?: number, pos?: number, id?: Long, ids?: Long[]): void;
        private s2c_chuang_shi_nv_shen_hun_ka_info;
        private getInfoPos;
        private getHunkaTypeInfo;
        getHunkaLv(type: number): number;
        getHunkaPosInfo(type: number, pos: number): nv_shen_hun_ka_pos_struct;
        private isPosOpen;
        isPosLimitOpen(type: number, pos: number, showTips?: boolean): boolean;
        getMinPos(type: number): number;
        getHunkaTotalScore(type: number): number;
        getHunkaNeedScore(type: number, lv: number): number;
        isHunkaMaxLv(type: number): boolean;
        getHunkaScoreCfgList(type: number): NvshenHunkaScoreConfig[];
        getPosOpenCost(type: number, pos: number): number[];
        hunkaType: number;
        hunkaBagOpenType: number;
        hunkaSelPos: number;
        readonly hunkaHint: string[];
        canHuankaOneKeyWear(type: number): boolean;
        canHuankaPosAct(type: number): boolean;
        private canPosOpen;
        getHunkaPosHint(type: number, pos: number, infos?: PropData[], notCalcOpen?: boolean): boolean;
        canHuankaGongmingAct(type: number): boolean;
        checkBestHunka(type: number, pos: number, prop: PropData): boolean;
        /***************************魂卡合成************************************/
        private s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
        readonly hunkaPreview: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
        clearComposeList(): void;
        readonly composeList: {
            [pos: number]: PropData;
        };
        getComposeSel(): PropData;
        getComposeSelByPos(pos: number): PropData;
        getComposeSelNum(): number;
        setComposeSel(propData: PropData, pos: number): void;
        hunkaComposeSelPos: number;
        canSelCompose(): boolean;
        hunkaSelQuality: number;
        getHunkaSelList(type: number, quality: number): PropData[];
        private canCompose;
        /***************************魂卡红点************************************/
        private updateHunkaHint;
        getHunkaHintType(type: number): string[];
        private checkHunkaTypeHint;
        private updateHunkaComposeHint;
    }
}
declare namespace game.mod.more {
    import NvshenIndexConfig = game.config.NvshenIndexConfig;
    class GoddessRecordRender extends BaseRenderer {
        img_bg: eui.Image;
        img_text: eui.Image;
        group_eft: eui.Group;
        img_mask: eui.Image;
        redPoint: eui.Image;
        private _proxy;
        data: NvshenIndexConfig;
        private _isAct;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class GoddessRecordView extends eui.Component {
        list_item: eui.List;
        lab_tips: eui.Label;
        btn_goddess: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import nvshen_hunka_struct = msg.nvshen_hunka_struct;
    class HunkaAttrItem extends eui.ItemRenderer {
        private lab_type;
        private lab_attr;
        private img_up;
        private lab_up;
        data: nvshen_hunka_struct;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    import nvshen_hunka_struct = msg.nvshen_hunka_struct;
    class HunkaAttrListView extends eui.Component {
        private list_attr;
        private _attrList;
        constructor();
        private onAddToStage;
        private onRemove;
        private initAttrList;
        updateShow(infos: nvshen_hunka_struct[], isSort?: boolean): void;
    }
}
declare namespace game.mod.more {
    class HunkaBagIcon extends BaseRenderer {
        private icon;
        private starListFuView;
        private img_up;
        private _delayProp;
        private _selectShow;
        private _proxy;
        data: PropData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClickBegin;
        private onClickEnd;
        private onClickTap;
        private clearDelayProp;
        private showPropTips;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HunkaBagView extends eui.Component {
        secondPop: SecondPop;
        hunkaNone: HunkaNoneView;
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaComposeItem extends BaseRenderer {
        private redPoint;
        private lab_name;
        private img_icon;
        private hunkaScore;
        private starListView;
        private hunkaAttrListView;
        data: number;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        setData(pos: number): void;
    }
}
declare namespace game.mod.more {
    class HunkaComposeTipsView extends eui.Component {
        grp_type: eui.Group;
        img_icon: eui.Image;
        starListView: StarListView;
        grp_name: eui.Group;
        lab_name: eui.Label;
        img_success: eui.Image;
        hunkaScore: HunkaScore;
        hunkaAttrListView: HunkaAttrListView;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaComposeView extends eui.Component {
        item0: HunkaComposeItem;
        item1: HunkaComposeItem;
        item_preview: HunkaPreviewItem;
        btn_preview: Btn;
        btn_compose: Btn;
        btn_oneKey: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    class HunkaGongmingItem extends eui.ItemRenderer {
        private img_pingjia;
        private img_lv;
        private lab_desc;
        data: NvshenHunkaScoreConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HunkaGongmingView extends eui.Component {
        baseQualityTips: BaseQualityTips;
        img_icon: eui.Image;
        lab_name: eui.Label;
        baseNameItem: BaseNameItem;
        list_item: eui.List;
        lab_tips: eui.Label;
        item: HunkaScoreItem;
        btn_act: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaIcon extends eui.ItemRenderer {
        private icon;
        private starListView;
        private img_sel;
        private img_up;
        data: PropData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HunkaItem extends BaseRenderer {
        private img_bg;
        private item;
        private btn_gongming;
        private redPoint;
        data: number;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickGongming;
    }
}
declare namespace game.mod.more {
    import Handler = base.Handler;
    class HunkaNoneView extends eui.Component {
        private lab_go;
        private _clickHandler;
        constructor();
        private onAddToStage;
        private onRemove;
        private onClickGo;
        updateHunkaNoneView(clickHandler: Handler): void;
    }
}
declare namespace game.mod.more {
    import RadioButton = eui.RadioButton;
    class HunkaOneKeyComposeView extends eui.Component {
        secondPop: SecondPop;
        lab_tips: eui.Label;
        hunkaNone: HunkaNoneView;
        list_item: eui.List;
        list_type: eui.List;
        sel0: RadioButton;
        sel1: RadioButton;
        sel2: RadioButton;
        sel3: RadioButton;
        sel4: RadioButton;
        btn_compose: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaPosItem extends BaseRenderer {
        private img_icon;
        private redPoint;
        data: number;
        private _proxy;
        private _isLock;
        private _isAdd;
        private _posY;
        private _prop;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        private playTween;
        removeTween(): void;
        setData(pos: number): void;
    }
}
declare namespace game.mod.more {
    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
    class HunkaPreviewItem extends eui.ItemRenderer {
        private lab_tips;
        private hunkaAttrListView;
        data: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
        protected dataChanged(): void;
        setData(data: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer): void;
    }
}
declare namespace game.mod.more {
    class HunkaScore extends BaseRenderer {
        private grp_score;
        data: {
            score: number;
            type: number;
        };
        protected dataChanged(): void;
        setData(score: number, type?: number): void;
    }
}
declare namespace game.mod.more {
    class HunkaScoreItem extends eui.ItemRenderer {
        private img_lv;
        private bar;
        data: {
            type: number;
            totalScore?: number;
        };
        protected dataChanged(): void;
        setData(type: number, totalScore?: number): void;
    }
}
declare namespace game.mod.more {
    class HunkaSelIcon extends BaseRenderer {
        private icon;
        private starListFuView;
        private _proxy;
        data: PropData;
        protected onAddToStage(): void;
        private onClickTap;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HunkaTipsView extends eui.Component {
        basePropTips: BasePropTips;
        starListView: StarListView;
        hunkaScore: HunkaScore;
        baseDescItem1: BaseDescItem;
        baseDescItem2: BaseDescItem;
        baseNameItem: BaseNameItem;
        hunkaAttrListView: HunkaAttrListView;
        btn_remove: Btn;
        btn_wear: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaTypeView extends eui.Component {
        hunkaScore: HunkaScore;
        btn_rule: Btn;
        item0: HunkaPosItem;
        item1: HunkaPosItem;
        item2: HunkaPosItem;
        item3: HunkaPosItem;
        item4: HunkaPosItem;
        item5: HunkaPosItem;
        item6: HunkaPosItem;
        item: HunkaScoreItem;
        btn_gongming: Btn;
        btn_oneKey: GiftBtn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HunkaView extends eui.Component {
        list_item: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class TimeGoddessChatView extends eui.Component {
        avatarNameItem: AvatarNameItem;
        btn_close: Btn;
        scr: eui.Scroller;
        list: eui.List;
        lab_tips: eui.Label;
        grp_act: eui.Group;
        lab_go: eui.Label;
        list_sel: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;
    class TimeGoddessEventItem extends BaseListenerRenderer {
        lab_name: eui.Label;
        btn_item: game.mod.Btn;
        private _proxy;
        private _isOpen;
        private _isFinish;
        data: NvshenShijianTypeConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        updateHint(): void;
    }
}
declare namespace game.mod.more {
    class TimeGoddessEventView extends eui.Component {
        secondPop: SecondPop;
        img_line1: eui.Image;
        img_line2: eui.Image;
        img_line3: eui.Image;
        img_line4: eui.Image;
        img_line5: eui.Image;
        item1: TimeGoddessEventItem;
        item2: TimeGoddessEventItem;
        item3: TimeGoddessEventItem;
        item4: TimeGoddessEventItem;
        item5: TimeGoddessEventItem;
        item6: TimeGoddessEventItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class TimeGoddessExp extends Btn {
        private upStarEft;
        private coinItem;
        updateShow(max: number, hint?: boolean): void;
    }
}
declare namespace game.mod.more {
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    class TimeGoddessIcon extends BaseRenderer {
        private btn_add;
        private btn_reward;
        private grp_tips;
        private lab_tips;
        private grp_name;
        private lab_name;
        private redPoint;
        private icon;
        data: {
            info: zhandui_jitan_struct;
            pos: number;
        };
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickReward;
        private onClickAdd;
        private onClickIcon;
    }
}
declare namespace game.mod.more {
    class TimeGoddessShelfItem extends BaseRenderer {
        private lab_name;
        private lab_score;
        private icon;
        private grp_time;
        private _proxy;
        data: PropData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class TimeGoddessShelfView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class TimeGoddessSpeedUpView extends eui.Component {
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
declare namespace game.mod.more {
    import NvshenChoujiangConfig = game.config.NvshenChoujiangConfig;
    class TimeGoddessSummonItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        img_sel: eui.Image;
        private redPoint;
        private coinItem;
        data: NvshenChoujiangConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class TimeGoddessSummonView extends eui.Component {
        grp_eft: eui.Group;
        btn_exp: TimeGoddessExp;
        img_type: eui.Image;
        item0: TimeGoddessSummonItem;
        item1: TimeGoddessSummonItem;
        item2: TimeGoddessSummonItem;
        item3: TimeGoddessSummonItem;
        item4: TimeGoddessSummonItem;
        lab_act: eui.Label;
        btn_reward: Btn;
        btn_summon: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class TimeGoddessView extends eui.Component {
        grp_lv: eui.Group;
        bar: ProgressBarComp;
        btn_chat: Btn;
        btn_event: Btn;
        btn_gift: GiftBtn;
        btn_card: Btn;
        btn_exp: TimeGoddessExp;
        grp_speedup: eui.Group;
        lab_name: eui.Label;
        lab_time: eui.Label;
        btn_speedup: Btn;
        item0: TimeGoddessIcon;
        item1: TimeGoddessIcon;
        item2: TimeGoddessIcon;
        item3: TimeGoddessIcon;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessRecordMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class GoddessRecordMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoddess;
        private updateView;
    }
}
declare namespace game.mod.more {
    class HunkaBagMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        /**部位穿戴时候打开，会提示战力升降，传魂卡类型进来
         * 合成时候也会打开，不传类型*/
        protected _showArgs: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.more {
    class HunkaComposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _showingPreview;
        private _canCompose;
        private _ids;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickPreview;
        private onClickCompose;
        private onClickOneKey;
        private updateSel;
        private setPreview;
        private updatePreview;
    }
}
declare namespace game.mod.more {
    import prop_attributes = msg.prop_attributes;
    class HunkaComposeTipsMdr extends EffectMdrBase {
        private _view;
        _showArgs: prop_attributes;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateShow;
        private showTypeTween;
        private removeTypeTween;
        private showNameTween;
        private removeNameTween;
        private showSuccessTween;
        private removeSuccessTween;
        private showEffect;
    }
}
declare namespace game.mod.more {
    class HunkaGongmingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected _showArgs: number;
        private _type;
        private _canAct;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private initShow;
        private updateView;
    }
}
declare namespace game.mod.more {
    class HunkaMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class HunkaMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
    }
}
declare namespace game.mod.more {
    class HunkaOneKeyComposeMdr extends MdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _btnList;
        private _selType; /**当前选中的类型*/
        private _ids;
        private _infos;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickCompose;
        private onClickType;
        private initTypeList;
        private initCheckGrp;
        private radioChangeHandler;
        private updateSel;
        private updateItemList;
        private updateTips;
        private updateItemListSel;
    }
}
declare namespace game.mod.more {
    class HunkaSecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import prop_attributes = msg.prop_attributes;
    class HunkaTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected _showArgs: PropData | prop_attributes;
        private _propData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRemove;
        private onClickWear;
        private updateView;
    }
}
declare namespace game.mod.more {
    class HunkaTypeMainMdr extends WndBaseMdr {
        private _proxy;
        protected onInit(): void;
        protected onShow(): void;
        private initBtnList;
    }
}
declare namespace game.mod.more {
    class HunkaTypeMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _canOneKey;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickRule;
        private onClickGongming;
        private onClickOneKey;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdate;
        private initShow;
        private updateItemList;
        private updateScore;
        private updateGongmingHint;
        private updateOneKeyHint;
        private removeTween;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class TimeGoddessChatMdr extends MdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _selList;
        private _huangguProxy;
        private _proxy;
        private readonly ITEM_H;
        private readonly ITEM_N;
        private readonly SCR_H;
        private readonly ITEM_N_CHAT;
        private readonly SCR_H_CHAT;
        private _index;
        private _chatList;
        private content;
        private contentLen;
        private startContent;
        private _delay;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private resetData;
        private onClickGo;
        private onInfoUpdate;
        private onChatSel;
        private updateView;
        private getInfos;
        private updateItemList;
        private updateItemListPos;
        private addItemList;
        private setLabAct;
        private setListSel;
        private startChat;
        private nextChat;
        private clearDelay;
        private endChat;
        private updateChatTxt;
        private jumpChat;
        update(time: base.Time): void;
        private updateContent;
    }
}
declare namespace game.mod.more {
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;
    class TimeGoddessEventChallengeMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected _showArgs: NvshenShijianTypeConfig;
        private _index;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickZhenrong;
        private onClickChallenge;
        private updateView;
        private updateBtn;
    }
}
declare namespace game.mod.more {
    class TimeGoddessEventMdr extends MdrBase {
        private _view;
        private _itemList;
        private _lineList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateView;
        private updateHint;
    }
}
declare namespace game.mod.more {
    class TimeGoddessMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class TimeGoddessMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _huangguProxy;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRoleUpdate;
        private onBagUpdateByPropIndex;
        private onClickExp;
        private onClickChat;
        private onClickEvent;
        private onClickSpeedup;
        private onClickCard;
        private initShow;
        private updateLv;
        private updateSummon;
        private onEventUpdate;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateHint;
        private updateChatHint;
        private updateEventHint;
        private updateHunkaHint;
        update(time: base.Time): void;
        private updateGongfeng;
        private updateTime;
        private reqInfo;
    }
}
declare namespace game.mod.more {
    class TimeGoddessShelfMdr extends MdrBase {
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
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class TimeGoddessSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _leftTimeSingle;
        private _leftTimeTotal;
        private _prop;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickSpeedUp;
        private onClickAllSpeedUp;
        private sendSpeedUp;
        update(time: base.Time): void;
        private onUpdateTime;
    }
}
declare namespace game.mod.more {
    class TimeGoddessSummonMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        private _selIndex; /**当前选中的下标*/
        private _selCfg; /**当前选中的配置*/
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickExp;
        private onClickSummon;
        private onClickReward;
        private onBagUpdateByPropIndex;
        private onClickIcon;
        private initShow;
        private updateAct;
        private updateItemList;
        private indexUpdateInfo;
        private updateItemSel;
        private updateExp;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import prop_tips_data = msg.prop_tips_data;
    class FengmoModel {
        mvp_info: teammate;
        times: number;
        buy_times: number;
        total_times: number;
        my_max_damage: number;
        damage_value: number;
        guild_ranks: teammate[];
        person_ranks: teammate[];
        my_guild_rank: teammate;
        my_rank: teammate;
        damage_indexs: number[];
        times_indexs: number[];
        reward: prop_tips_data[];
        guild_fengmo_model: number;
        guild_fengmo_meiricishu: number;
        guild_fengmo_meirixiangou: number;
        guild_fengmo_time: number;
        last_rank_num: number;
        props: prop_tips_data[];
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;
    import prop_tips_data = msg.prop_tips_data;
    import FengmoTiaozhanRewardConfig = game.config.FengmoTiaozhanRewardConfig;
    class FengmoProxy extends ProxyBase {
        private _model;
        initialize(): void;
        /**------------------------协议------------------------- */
        c2s_guild_fengmo_battle(type: number, param?: number): void;
        c2s_guild_fengmo_get_reward(type: number, index: number): void;
        c2s_guild_fengmo_get_info(): void;
        c2s_guild_fengmo_get_rank(type: number): void;
        c2s_buy_fengmo_tiaozhan_times(buy_times: number): void;
        private s2c_guild_fengmo_info;
        private s2c_guild_type_rank_list;
        /**------------------------协议------------------------- */
        readonly mvp_info: teammate;
        /**剩余次数 */
        readonly times: number;
        readonly my_max_damage: number;
        readonly damage_value: number;
        readonly damage_indexs: number[];
        readonly times_indexs: number[];
        readonly total_times: number;
        readonly buy_times: number;
        readonly reward: prop_tips_data[];
        readonly last_rank_num: number;
        readonly props: prop_tips_data[];
        getRanks(type: number): teammate[];
        private getRankName;
        getRankList(type: number): RankRewardRenderData[];
        getRankInfo(type: number): teammate;
        getRankStr(type: number): string;
        getRankCountStr(type: number): string;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getRankSection(rank: string, type: number): IRankSectionData[];
        readonly hurt_cfg: FengmoDamageRewardConfig;
        getRewardState(cfg: FengmoTiaozhanRewardConfig): ComRewardState;
        /**-------------------------参数表配置------------------------ */
        readonly guild_fengmo_model: number;
        readonly guild_fengmo_meiricishu: number;
        readonly guild_fengmo_meirixiangou: number;
        readonly guild_fengmo_time: number;
        /**------------------------红点-------------------------*/
        private onUpdateHint;
        getTimesHint(): boolean;
        getDamageHint(): boolean;
        /**============== 修仙女仆自动挂机 ==============*/
        private canAutoChallenge;
        private sendAutoChallenge;
        private checkAutoChallengeFengmo;
        private onUpdateUnionInfo;
    }
}
declare namespace game.mod.more {
    import huanggu_nvshen_gongfeng = msg.huanggu_nvshen_gongfeng;
    import huanggu_nvshen_gift = msg.huanggu_nvshen_gift;
    import huanggu_nvhshen_get_reward = msg.huanggu_nvhshen_get_reward;
    import huanggu_shijian = msg.huanggu_shijian;
    import nvshen_chat = msg.nvshen_chat;
    class HuangguModel {
        consecrateInfo: huanggu_nvshen_gongfeng;
        chatInfo: huanggu_nvhshen_get_reward;
        eventList: huanggu_shijian[];
        targetInfo: huanggu_nvshen_gift;
        goddessHint: string[];
        targetHint: string[];
        rewards: number[][];
        summonRewards: number[][];
        chatList: {
            [type: number]: nvshen_chat[];
        };
        costIndex: number;
        actIndex: number;
        summonIndex: number;
        maxChatLv: number;
        curChatType: number;
    }
    /**女神对话结构*/
    interface GoddessChatData {
        type: number;
        desc?: string;
        reward?: number[][];
        status?: number;
        notShowDesc?: boolean;
    }
    interface GoddessChatSelData {
        desc: string;
        info: nvshen_chat;
    }
    interface EventChatData {
        desc: string;
        systemInfo: number[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import HuangguGiftConfig = game.config.HuangguGiftConfig;
    import nvshen_chat = msg.nvshen_chat;
    import HuangguHaoganDuihuaConfig = game.config.HuangguHaoganDuihuaConfig;
    import NvshenDuihuaConfig = game.config.NvshenDuihuaConfig;
    class HuangguProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_huanggu_nvshen_op(type: number, index?: number, param?: number): void;
        c2s_nvshen_get_chat(type: number): void;
        c2s_nvshen_save_chat(type: number, list: nvshen_chat[]): void;
        private s2c_huanggu_nvshen_info;
        private getInfoPos;
        private s2c_nvshen_chat;
        readonly lv: number;
        readonly exp: number;
        readonly cnt: number;
        readonly haoganLv: number;
        readonly haoganExp: number;
        getSpecialAttrId(): number;
        readonly isAct: boolean;
        getRewards(): number[][];
        getSummonRewards(): number[][];
        getSummonCost(): number[];
        isOpenSummon(): boolean;
        hasFreeDraw(index: number): boolean;
        hasBuyDraw(index: number): boolean;
        canDraw(cfg: HuangguGiftConfig): boolean;
        readonly chatLv: number;
        isChatFinish(): boolean;
        private saveChat;
        getSelfChat(cfg: HuangguHaoganDuihuaConfig | NvshenDuihuaConfig, type?: number): string;
        getDescList(desc: string): string[];
        readonly chatMaxLv: number;
        curChatType: number;
        getEventStage(index: number): number;
        getEventMaxStage(index: number): number;
        isEventOpen(index: number): boolean;
        isEventFinish(index: number): boolean;
        private updateHint;
        private updateGoddessHint;
        private checkGoddessHint;
        private readonly costIndex;
        private checkConsecrateHint;
        checkChatHint(): boolean;
        checkEventHint(): boolean;
        checkEventPerHint(index: number): boolean;
        private readonly actIndex;
        checkActHint(): boolean;
        readonly summonIndex: number;
        checkSummonHint(): boolean;
        readonly targetHint: string[];
        private updateTargetHint;
        private checkTargetHint;
        protected onRoleUpdate(n: base.GameNT): void;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        protected onRolePrivilegeUpdate(n: GameNT): void;
        protected onUpdateZhenrongInfo(n: GameNT): void;
    }
}
declare namespace game.mod.more {
    import ShopConfig = game.config.ShopConfig;
    class XiandiModel {
        free_times: number;
        geren_ranks: msg.teammate[];
        guild_ranks: msg.teammate[];
        my_guild_rank: msg.teammate;
        my_rank: msg.teammate;
        click_count: number;
        is_click: boolean;
        skill_lv: number;
        tianwang_info: msg.teammate[];
        tiandi_info: msg.teammate;
        xianhou_info: msg.teammate;
        hongyan_info: msg.teammate;
        is_gongfeng: boolean;
        king_index: number;
        tiandi_zhengba_tiaozhan_xiaohao: number[];
        tiandi_zhengba_tiaozhan_duowei: number[];
        tiandi_zhengba_tiaozhan_mianfei: number;
        xiandi_rank: number[];
        xiandi_jiangli: number[][];
        xiandi_libao: number;
        xiandi_open: number;
        huanggu_nvshen_buff: number[][];
        tiandi_zhengba_gongfeng: number[][];
        readonly open_day: number;
        servet_day: number;
        /** ---------------------二期-------------------- */
        /**消费数量 */
        count: number;
        /**仙帝武器幻化 */
        is_huanhua: boolean;
        /**是否激活 */
        is_activa: boolean;
        /**试炼奖励 1.可领取2.已领取 */
        reward_status: number;
        tiandi_box_have: number[];
        xianqi_fuben_reward: number[];
        tiandi_box_iteam: number;
        xianqi_waixian: number;
        shops: Map<number, ShopConfig[]>;
    }
}
declare namespace game.mod.more {
    import ShopConfig = game.config.ShopConfig;
    import teammate = msg.teammate;
    import GameNT = base.GameNT;
    class XiandiProxy extends ProxyBase implements IXiandiProxy {
        private _model;
        initialize(): void;
        /**------------------------协议------------------------- */
        c2s_xiandi_zhengba_oper(oper_type: number, params?: number, role_id?: Long): void;
        c2s_tiandi_zhengba_ui_info(): void;
        private s2c_xiandi_zhengba_rank;
        /** */
        private s2c_xiandi_zhanshi_info;
        private s2c_tiandi_zhengba_ui_info;
        private s2c_xiandi_zhengba_challenge_info;
        /**------------------------协议------------------------- */
        /**------------------------数据------------------------- */
        readonly is_tiandi: boolean;
        readonly is_king: boolean;
        readonly free_times: number;
        readonly is_gongfeng: boolean;
        readonly geren_ranks: teammate[];
        readonly guild_ranks: teammate[];
        readonly is_job: boolean;
        checkJob(role_id: Long): boolean;
        getRanks(type: number): teammate[];
        getRankList(type: number): RankRewardRenderData[];
        getRankItemName(item: teammate, type: number): string;
        getRankInfo(type: number): teammate;
        getRankStr(type: number): string;
        getRankCountStr(type: number): string;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getRankSection(rank: string, type: number): IRankSectionData[];
        getKingInfo(index: number): teammate;
        readonly tiandi_info: teammate;
        readonly hongyan_info: teammate;
        readonly xianhou_info: teammate;
        readonly click_count: number;
        readonly is_click: boolean;
        readonly skill_lv: number;
        /**周日开启 */
        checkOpen(): boolean;
        king_index: number;
        /**------------------------数据------------------------- */
        /**-------------------------参数表配置------------------------ */
        readonly tiandi_zhengba_tiaozhan_xiaohao: number[];
        readonly tiandi_zhengba_tiaozhan_duowei: number[];
        readonly tiandi_zhengba_tiaozhan_mianfei: number;
        readonly xiandi_rank: number[];
        readonly xiandi_jiangli: number[][];
        readonly xiandi_libao: number;
        readonly huanggu_nvshen_buff: number[][];
        readonly tiandi_zhengba_gongfeng: number[][];
        getBuff(): number;
        readonly xiandi_open: number;
        /**-------------------------参数表配置------------------------ */
        /**------------------------红点-------------------------*/
        private onUpdateHint;
        protected onServerDayUpdate(): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        private onUpdateActIcon;
        /**------------------------红点-------------------------*/
        /**弑帝夺位 */
        onCheckJockey(): void;
        /**-----------------------------二期功能-----------------------------*/
        private s2c_tiandi_box_update;
        /**1.幻化2.激活仙器3.奖励领取 */
        c2s_tiandi_box_oper(oper: number): void;
        c2s_tiandi_box_challenge(): void;
        readonly count: number;
        readonly is_huanhua: boolean;
        readonly is_activa: boolean;
        readonly reward_status: number;
        readonly tiandi_box_have: number[];
        readonly xianqi_fuben_reward: number[];
        readonly xianqi_waixian: number;
        readonly tiandi_box_iteam: number;
        readonly xianqi_stage: number;
        readonly shops: Map<number, ShopConfig[]>;
        readonly list: ShopConfig[];
        private onUpdateHintByReward;
    }
}
declare namespace game.mod.more {
    import s2c_xianjie_pvp_kill_boss_info = msg.s2c_xianjie_pvp_kill_boss_info;
    import s2c_xianjie_pvp_scene_info = msg.s2c_xianjie_pvp_scene_info;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;
    class XianjieLuandouModel {
        /** 副本状态 1开启 2关闭 3冷却时间未到 */
        state: number;
        /** 剩余cd时间 */
        cd_sec: number;
        /** 是否首次开启 1是 2否 */
        is_first_open: number;
        /** 全排名 */
        rank: msg.teammate[];
        /** 玩家排名 */
        my_rank: msg.teammate;
        /** 榜单顺序排名 */
        scene_rank: msg.xianjie_pvp_scene_score_info[];
        /** 玩家排名 */
        scene_my_rank: msg.xianjie_pvp_scene_score_info;
        /** 已领取的积分奖励列表 */
        index: number[];
        /** boss血量信息 */
        boss_list: {
            [index: number]: msg.xianjie_pvp_boss_info;
        };
        /** 中央灵石boss归属者信息 */
        owner_info: msg.teammate;
        /** 战报 */
        report_list: msg.xianjie_pvp_battle_report[];
        kill_boss_info: s2c_xianjie_pvp_kill_boss_info;
        pvp_scene_info: s2c_xianjie_pvp_scene_info;
        skill_cds: {
            [index: number]: msg.xianjie_luandou_scene_buff_index_cd;
        };
        sel_scene_rank: RankCommonType2;
        bossCfgList: XianjiebrawlBaseConfig[];
        bossIdxList: number[];
        hintPath: string[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import XianjiebrawlScoreConfig = game.config.XianjiebrawlScoreConfig;
    import teammate = msg.teammate;
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;
    import s2c_xianjie_pvp_kill_boss_info = msg.s2c_xianjie_pvp_kill_boss_info;
    import xianjie_pvp_boss_info = msg.xianjie_pvp_boss_info;
    /**
     * @description 仙界乱斗
     */
    class XianjieLuandouProxy extends ProxyBase {
        private _model;
        initialize(): void;
        /**
         * 1进入副本(s2c_xianjie_pvp_base_info)
         * 2查看活动排名(s2c_xianjie_pvp_rank_info)
         * 3获取战场积分排名(s2c_xianjie_pvp_scene_rank_info)
         * 4领取战场积分奖励(s2c_xianjie_pvp_score_reward)
         * 5发送宗门邀请
         * 6请求战报
         */
        c2s_xianjie_pvp_oper(type: XianjieLuandouOperType, param?: number): void;
        private s2c_xianjie_pvp_base_info;
        private s2c_xianjie_pvp_rank_info;
        private s2c_xianjie_pvp_scene_rank_info;
        private s2c_xianjie_pvp_score_reward;
        c2s_xianjie_pvp_scene_use_buff(index: number): void;
        private s2c_xianjie_pvp_boss_info;
        private s2c_xianjie_pvp_battle_report;
        private s2c_xianjie_pvp_kill_boss_info;
        private s2c_xianjie_pvp_scene_info;
        private s2c_xianjie_luandou_scene_buff_index_cd;
        /**=========================协议end=========================*/
        readonly is_first_open: boolean;
        readonly end_time: number;
        readonly dailyLimitTimeCfg: DailyLimitTimeConfig;
        readonly show_rewards: number[][];
        readonly isOpen: boolean;
        readonly show_time_sec: number;
        readonly skill_list: number[][];
        readonly revive_data: number[];
        readonly rank: teammate[];
        readonly my_rank: teammate;
        readonly my_score: number;
        readonly score_index: number[];
        readonly report_list: msg.xianjie_pvp_battle_report[];
        readonly scene_rank: msg.xianjie_pvp_scene_score_info[];
        readonly scene_my_rank: msg.xianjie_pvp_scene_score_info;
        sel_scene_rank: RankCommonType2;
        readonly bossCfgList: XianjiebrawlBaseConfig[];
        readonly bossIdxList: number[];
        readonly boss_list: {
            [index: number]: xianjie_pvp_boss_info;
        };
        readonly boss_all_died: boolean;
        getBossHp(idx: number): number;
        getBossInfo(idx: number): xianjie_pvp_boss_info;
        readonly owner_info: teammate;
        readonly boss_kill_count: number;
        readonly guild_count: number;
        kill_boss_info: s2c_xianjie_pvp_kill_boss_info;
        getSkillCd(index: number): number;
        haveSkillCd(): boolean;
        getScoreCfgList(): XianjiebrawlScoreConfig[];
        getScoreRewardHint(): boolean;
        getRankInfo(rankNo: number): teammate;
        getRankRewardData(): RankRewardRenderData[];
        private updateHint;
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.more {
    class XianmaiModel {
        mvp_role: msg.teammate;
        role_list: {
            [index: number]: msg.xianmai_role_data;
        };
        attack_time: number;
        stage_index_map: {
            [stage: number]: {
                [index: number]: msg.xianmai_role_data;
            };
        };
        my_data: msg.xianmai_role_data;
        penglai_score: number;
        lingshi: number;
        search_stage: number;
        search_index: number;
        reward_items: msg.prop_tips_data[];
        list: msg.xianmai_stage_data[];
        logs: {
            [type: number]: msg.xianmai_zhanbao_data[];
        };
        /** 宗门排名(value为积分) */
        guild_ranks: msg.teammate[];
        /** 个人排名(value为积分) */
        person_ranks: msg.teammate[];
        /** 玩家宗门排名数据 */
        my_guild_rank: msg.teammate;
        /** 玩家个人排名数据 */
        my_rank: msg.teammate;
        fight_data: msg.s2c_city_moment_fight_update;
        hintPath: string[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import xianmai_zhanbao_data = msg.xianmai_zhanbao_data;
    import xianmai_stage_data = msg.xianmai_stage_data;
    import xianmai_role_data = msg.xianmai_role_data;
    /**
     * @description 仙脉争夺系统
     */
    class XianmaiProxy extends ProxyBase implements IXianmaiProxy {
        private _model;
        reqStage: number;
        onStartReconnect(): void;
        initialize(): void;
        c2s_xianmai_stage_show(stage: number): void;
        private s2c_xianmai_stage_show;
        private s2c_update_xianmai_data;
        private updateRoleList;
        c2s_xianmai_buy_time(): void;
        private s2c_xianmai_buy_time;
        c2s_xianmai_my_show(): void;
        private s2c_xianmai_my_show;
        c2s_xianmai_search(): void;
        private s2c_xianmai_search;
        c2s_xianmai_pvp_oper(type: XianmaiOperType, stage: number, index: number): void;
        private s2c_xianmai_reward_show;
        c2s_xianmai_get_reward(): void;
        c2s_xianmai_list_show(): void;
        private s2c_xianmai_list_show;
        c2s_xianmai_guild_invite(): void;
        c2s_xianmai_zhanbao(type: number): void;
        private s2c_xianmai_zhanbao;
        c2s_xianmai_rank_show(type: number, start: number, end: number): void;
        private s2c_xianmai_rank_show;
        private s2c_city_moment_fight_update;
        private _stage;
        private _index;
        getInitEnemyHp(): number;
        /**==================================协议end==================================*/
        getBossPower(idx: number): number;
        getBossNames(): string[];
        getBossIcon(): string;
        readonly guild_num: number;
        getEarnCnt(cnt?: number): number;
        readonly mvp_role: msg.teammate;
        readonly cool_time: number;
        readonly stage_list: xianmai_stage_data[];
        reward_items: msg.prop_tips_data[];
        readonly my_data: xianmai_role_data;
        readonly penglai_score: number;
        readonly lingshi: number;
        readonly search_stage: number;
        readonly search_index: number;
        readonly person_ranks: msg.teammate[];
        getActTimeRange(): number[][];
        getStartTime(): number;
        getEndTime(): number;
        isActTime(): boolean;
        /**
         * 开启时间或结束时间，秒
         * @param isStart true表示开始时间10点，false表示结束时间22点
         */
        getShowStartTime(isStart?: boolean): number;
        getZhanbao(type: number): xianmai_zhanbao_data[];
        getCoolTimeCostStr(): string;
        getStageInfo(index: number): xianmai_role_data;
        getMinEndTime(): number;
        private _stageCfgs;
        getStageCfgs(type: number): XianmaiStageConfig[];
        getStageCfg(stage: number, index: number): XianmaiStageConfig;
        private _maxStage;
        getMaxStage(): number;
        readonly coolTimeLimit: number;
        isCoolTimeLarge(): boolean;
        getLeftCoolTime(): number;
        getCoolTimeStr(): string;
        dealCoolTime(): void;
        getExchangeHint(): boolean;
        private updateHint;
        protected onRoleUpdate(n: GameNT): void;
        /**==================排行榜==================*/
        getRanks(type: number): msg.teammate[];
        getRankList(type: number): RankRewardRenderData[];
        getRankStr(type: number): string;
        getRankCountStr(type: number): string;
        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        getRankSection(rank: string, type: number): IRankSectionData[];
        getLayerIdx(layer: number): number;
        getSecondPopTitle(layer: number): string;
        private setTimeInterval;
        /**============== 修仙女仆自动挂机 ==============*/
        private _sendSearch;
        private _sendPvpOper4;
        private canAutoChallengeXianmai;
        private sendAutoChallengeXianmai;
        /**
         * 21.仙脉争夺
         * @param searchBack true表示一键寻脉协议返回
         */
        private checkAutoChallengeXianmai;
    }
}
declare namespace game.mod.more {
    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_member_data = msg.xianwei_member_data;
    import xianwei_place_data = msg.xianwei_place_data;
    import xianwei_reward_data = msg.xianwei_reward_data;
    import xianwei_common_log_data = msg.xianwei_common_log_data;
    import xianwei_log_data = msg.xianwei_log_data;
    import teammate = msg.teammate;
    class XianweiModel {
        list: Map<string, xianwei_member_data>;
        my_place: xianwei_place_data;
        reward_data: xianwei_reward_data;
        log_list: xianwei_common_log_data[];
        attack_time: number;
        member_list: xianwei_member_data[];
        zhanbao_list: xianwei_log_data[];
        ranks: teammate[];
        my_rank: teammate;
        cfgs: Map<number, XianweiBaseConfig[]>;
        cfgArr: Map<string, XianweiBaseConfig>;
        xianwei_act: number[][];
        xianwei_buy_time: number[];
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    import xianwei_log_data = msg.xianwei_log_data;
    import xianwei_place_data = msg.xianwei_place_data;
    import xianwei_reward_data = msg.xianwei_reward_data;
    import xianwei_member_data = msg.xianwei_member_data;
    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_common_log_data = msg.xianwei_common_log_data;
    class XianweiProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_xianwei_root_show(): void;
        c2s_xianwei_buy_time(): void;
        c2s_xianwei_branch_show(stage: number, index: number): void;
        c2s_xianwei_zhanbao_show(): void;
        c2s_xianwei_challenge(stage: number, index: number, pos: number): void;
        c2s_xianwei_rank_show(): void;
        private s2c_xianwei_root_show;
        private s2c_xianwei_buy_time;
        private s2c_xianwei_branch_show;
        private s2c_xianwei_zhanbao_show;
        private s2c_xianwei_rank_show;
        reward_data: xianwei_reward_data;
        readonly attack_time: number;
        readonly zhanbao_list: xianwei_log_data[];
        readonly member_list: xianwei_member_data[];
        readonly ranks: teammate[];
        readonly my_rank: teammate;
        readonly is_open: boolean;
        readonly open_time: number;
        /**开启时返回结束时间 未开启返回开启时间 */
        readonly end_time: number;
        readonly log_list: xianwei_common_log_data[];
        readonly xianwei_act: number[][];
        readonly my_place: xianwei_place_data;
        checkJob(key: string): boolean;
        readonly list: Map<string, xianwei_member_data>;
        readonly cfgArr: Map<string, XianweiBaseConfig>;
        readonly xianwei_buy_time: number[];
        getRankName(item: teammate): string;
        getRanks(): RankRewardRenderData[];
        getRankStr(): string;
        getRankCountStr(): string;
        getRankSection(rank: string): IRankSectionData[];
    }
}
declare namespace game.mod.more {
    class HuangguView extends eui.Component {
        btn_goddess: Btn;
        btn_xiandi: Btn;
        btn_doufa: Btn;
        btn_shenqi: Btn;
        btn_xianwei: Btn;
        item: XiandiXianhouItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class HundunBtnItem extends Btn {
        img_icon: eui.Image;
        redPoint: eui.Image;
        gr_name: eui.Group;
        lb_name: eui.Label;
        gr_desc: eui.Group;
        lb_desc: eui.Label;
        timeItem: game.mod.TimeItem;
        group_eff: eui.Group;
        constructor();
        /**
         * 更新按钮
         * @param icon
         * @param name
         * @param showHint
         * @param desc
         */
        updateShow(icon: string, name: string, showHint?: boolean, desc?: string): void;
        /**
         * 更新倒计时
         * @param endTime 结束时间戳，单位：秒
         * @param sufStr 时间末尾文本，默认空
         */
        updateTime(endTime: number, sufStr?: string): void;
        setHint(hint?: boolean): void;
    }
}
declare namespace game.mod.more {
    class HundunView extends eui.Component {
        btn_fengmo: Btn;
        btn_crossunion: Btn;
        btn_xianmai: game.mod.more.HundunBtnItem;
        btn_xuanyuanmen: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class FengmoFightView extends eui.Component {
        list: eui.List;
        progress: ProgressBarComp;
        lab_name: eui.Label;
        lab_maxhurt: eui.Label;
        lab_hurt: eui.Label;
        countItem: CountItem;
        btn_saodang: Btn;
        btn_fight: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;
    class FengmoHurtRewardItem extends BaseGiftItemRender {
        data: {
            status: number;
            cfg: FengmoDamageRewardConfig;
        };
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        /**点击购买*/
        protected onClick(): void;
    }
}
declare namespace game.mod.more {
    class FengmoHurtRewardView extends eui.Component {
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class FengmoProgressItem extends BaseRenderer {
        progress: ProgressBarComp;
        data: VProgressData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    import ArrayCollection = eui.ArrayCollection;
    class FengmoProgressReward extends BaseRenderer {
        img_tips: eui.Image;
        lab_count: eui.Label;
        list_reward: eui.List;
        list_progress: eui.List;
        scroller: eui.Scroller;
        protected _listData: ArrayCollection;
        protected _listReward: ArrayCollection;
        private _proxy;
        private readonly _count;
        protected onAddToStage(): void;
        updateShow(val: number): void;
    }
}
declare namespace game.mod.more {
    import FengmoTiaozhanRewardConfig = game.config.FengmoTiaozhanRewardConfig;
    class FengmoProgressRewardItem extends BaseRenderer {
        btn_box: Btn;
        lab_value: eui.Label;
        redPoint: eui.Image;
        img_got: eui.Image;
        data: FengmoTiaozhanRewardConfig;
        /**0不可领取 1可领取 2已领取 */
        private _state;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
}
declare namespace game.mod.more {
    class FengmoResultWinView extends eui.Component {
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        lab_hurt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class FengmoSceneView extends eui.Component {
        lab_hurt: eui.Label;
        lab_time: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class FengmoView extends eui.Component {
        grp_eft: eui.Group;
        grp_hurt: eui.Group;
        img_bg: eui.Image;
        btn_rank: Btn;
        btn_fight: Btn;
        btn_add: Btn;
        btn_reward: Btn;
        timeItem: TimeItem;
        headMvp: HeadMvp;
        lab_tips: eui.Label;
        lab_times: eui.Label;
        reward: FengmoProgressReward;
        progress: ProgressBarComp;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessAttrView extends eui.Component {
        baseDescItem1: BaseDescItem;
        baseDescItem2: BaseDescItem;
        btn_act: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessChatView extends eui.Component {
        secondPop: SecondPop;
        scr: eui.Scroller;
        list: eui.List;
        lab_tips: eui.Label;
        lab_act: eui.Label;
        list_sel: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuangguShijianTypeConfig = game.config.HuangguShijianTypeConfig;
    class GoddessEventItem extends BaseListenerRenderer {
        lab_name: eui.Label;
        btn_item: game.mod.Btn;
        img_lock: eui.Rect;
        private _proxy;
        private _isOpen;
        private _isFinish;
        data: HuangguShijianTypeConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
        updateHint(): void;
    }
}
declare namespace game.mod.more {
    class GoddessEventView extends eui.Component {
        secondPop: SecondPop;
        img_line1: eui.Image;
        img_line2: eui.Image;
        img_line3: eui.Image;
        img_line4: eui.Image;
        img_line5: eui.Image;
        item1: GoddessEventItem;
        item2: GoddessEventItem;
        item3: GoddessEventItem;
        item4: GoddessEventItem;
        item5: GoddessEventItem;
        item6: GoddessEventItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessExp extends Btn {
        private upStarEft;
        private lab_lv;
        updateShow(val: number, max: number, lv: number): void;
    }
}
declare namespace game.mod.more {
    class GoddessGodView extends eui.Component {
        grp_god: eui.Group;
        lab_desc: eui.Label;
        lab_lv: eui.Label;
        lab_act: eui.Label;
        btn_act: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessSummonView extends eui.Component {
        grp_eft: eui.Group;
        btn_close: Btn;
        img_icon: eui.Image;
        lab_act: eui.Label;
        btn_reward: Btn;
        bar: ProgressBarComp;
        btn_summon: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuangguGiftConfig = game.config.HuangguGiftConfig;
    class GoddessTargetRender extends BaseListenerRenderer {
        lb_cond: eui.Label;
        icon: game.mod.IconGot;
        btn_go: game.mod.Btn;
        btn_buy: game.mod.Btn;
        list: eui.List;
        img_got: eui.Image;
        img_got0: eui.Image;
        private _rewardList;
        private _proxy;
        private _productId;
        private _cost;
        private _canDraw;
        data: HuangguGiftConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickGo;
        private onClick;
    }
}
declare namespace game.mod.more {
    class GoddessTargetView extends eui.Component {
        icon_bigreward: IconBigReward;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class GoddessView extends eui.Component {
        grp_haoganLv: eui.Group;
        bar: ProgressBarComp;
        power2: Power2;
        btn_chat: Btn;
        btn_event: Btn;
        btn_target: Btn;
        btn_gift: GiftBtn;
        god_item: game.mod.AttrGodItem;
        btn_exp: GoddessExp;
        btn_summon: Btn;
        item_summon: CoinItem;
        lab_tips: eui.Label;
        btn_consecrate: Btn;
        lab_reward: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class RewardShowView extends eui.Component {
        secondPop: SecondPop;
        lab_desc: eui.Label;
        list_reward: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiBuffItem extends SkillItemRender {
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XiandiGiftView extends eui.Component {
        btn_buy: game.mod.Btn;
        btn_close: game.mod.Btn;
        list_reward: eui.List;
        lab_cut: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiGodressView extends eui.Component {
        nameItem: AvatarNameItem;
        grp_eft: eui.Group;
        head: Head;
        lab_name: eui.Label;
        btn_fight: Btn;
        grp_skill: eui.Group;
        img_icon: eui.Image;
        lab_cnt: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiHouseItem extends BaseRenderer {
        private grp_eft;
        private lab_desc;
        protected onAddToStage(): void;
        setData(index: number, str: string): void;
        setGray(bool: boolean): void;
    }
}
declare namespace game.mod.more {
    class XiandiHouseView extends eui.Component {
        btn_god1: Btn;
        btn_god2: Btn;
        btn_god3: Btn;
        btn_god4: Btn;
        btn: Btn;
        lab_name: eui.Label;
        head: Head;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiInfoItem extends BaseRenderer {
        private grp_eft;
        private lab_name;
        private lab_power;
        private img_nobody;
        private grp_info;
        data: msg.teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: msg.teammate): void;
    }
}
declare namespace game.mod.more {
    class XiandiInfoView extends eui.Component {
        img_bg: eui.Image;
        item1: XiandiInfoItem;
        item2: XiandiInfoItem;
        item3: XiandiInfoItem;
        lab_desc: eui.Label;
        item: XiandiXianhouItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiItem extends BaseRenderer {
        private grp_eft;
        private lab_name;
        private lab_score;
        private img_rank;
        private img_nobody;
        private _eft;
        private _index;
        data: msg.teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: msg.teammate, index: number): void;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    /**仙帝弑帝夺位 */
    class XiandiJockeyItem extends BaseRenderer {
        private head;
        private lab_name;
        /**按钮需求要自己扩展 */
        private btn_fight;
        private _proxy;
        data: teammate;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickFight;
        setData(data: teammate): void;
        initData(): void;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class XiandiKingItem extends BaseRenderer {
        private grp_eft;
        private btn_change;
        private btn_add;
        private btn_info;
        private titleItem;
        data: teammate;
        private _bool;
        private _index;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: teammate, index: number, bool?: boolean): void;
        private onClickChange;
        private onClickInfo;
    }
}
declare namespace game.mod.more {
    class XiandiListItem extends BaseRenderer {
        private headVip;
        private lab_name;
        private lab_power;
        private btn_set;
        private _proxy;
        data: msg.rank_info;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
    }
}
declare namespace game.mod.more {
    class XiandiListView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiShowView extends eui.Component {
        item: XiandiKingItem;
        item1: XiandiKingItem;
        item2: XiandiKingItem;
        item3: XiandiKingItem;
        item4: XiandiKingItem;
        lab_count: eui.Label;
        btn_like: Btn;
        btn_explain: Btn;
        btn_goddess: Btn;
        btn_house: Btn;
        btn_gift: Btn;
        btn_reward: Btn;
        lab_desc: eui.Label;
        btn_fight: Btn;
        btn_treasure: Btn;
        btn_weapon: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiSkillTipsView extends eui.Component {
        private baseQualityTips;
        skill: SkillItemRender;
        lab_name: eui.Label;
        img_tips: eui.Image;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiTipsView extends eui.Component {
        img_title: eui.Image;
        lab_desc: eui.Label;
        head: Head;
        closeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiTitleItem extends BaseRenderer {
        private img_title;
        private lab_name;
        private lab_power;
        data: {
            title: string;
            name: string;
            power?: string;
        };
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: {
            title: string;
            name: string;
            power?: string;
        }): void;
    }
}
declare namespace game.mod.more {
    class XiandiView extends eui.Component {
        item1: XiandiItem;
        item2: XiandiItem;
        item3: XiandiItem;
        btn: Btn;
        lab_count: eui.Label;
        btn_add: Btn;
        lab_rank: eui.Label;
        lab_score: eui.Label;
        timeItem: TimeItem;
        btn_rank: Btn;
        btn_explain: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiXianhouItem extends eui.Component {
        private lab_name1;
        private lab_name2;
        private head1;
        private head2;
        private lab_power1;
        private lab_power2;
        showInfo(): void;
    }
}
declare namespace game.mod.more {
    class XiandiActiveView extends eui.Component {
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiShilianView extends eui.Component {
        icon: Icon;
        btn: Btn;
        recommendPower: RecommendPower;
        lab_tips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiStageView extends eui.Component {
        btn_right: Btn;
        btn_left: Btn;
        btn_shilian: Btn;
        btn_act: Btn;
        grp_limit: eui.Group;
        grp_day: eui.Group;
        power: Power2;
        grp_eft: eui.Group;
        grp_font: eui.Group;
        lab_desc1: eui.Label;
        lab_desc2: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiTreasureItem extends IconShop {
        protected dataChanged(): void;
        private getLeftCnt;
        protected onClickBuy(): void;
    }
}
declare namespace game.mod.more {
    class XiandiTreasureView extends eui.Component {
        list: eui.List;
        lab_name: eui.Label;
        btn_explain: Btn;
        btn_fight: Btn;
        grp_eft: eui.Group;
        prop: Icon;
        lab_rate: eui.Label;
        grp_font: eui.Group;
        coin1: CoinItem;
        coin2: CoinItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class XiandiWeaponView extends eui.Component {
        coin1: CoinItem;
        coin2: CoinItem;
        grp_eft: eui.Group;
        jockeyItem: XiandiJockeyItem;
        btn_battle: Btn;
        btn_preview: Btn;
        power: Power2;
        lab_desc1: eui.Label;
        lab_desc2: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;
    class XianjieLuandouBossItem extends BaseListenerRenderer {
        img_di: eui.Image;
        img_icon: eui.Image;
        img_camp: eui.Image;
        bar: game.mod.ProgressBarComp;
        img_died: eui.Image;
        data: XianjiebrawlBaseConfig;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        /**更新血量*/
        updateHp(percent: number): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSceneSkillItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_mark: eui.Image;
        lab_time: eui.Label;
        lab_cnt: eui.Label;
        data: number[];
        private _shape;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private changeMask;
        /**
         * 技能列表入口
         */
        updateSkillItem(): void;
        updateCost(cntStr: string): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSceneView extends eui.Component {
        list_boss: eui.List;
        btn_zhanbao: game.mod.Btn;
        btn_rule: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        lb_cnt: eui.Label;
        btn_reward: game.mod.Btn;
        btn_hurt: game.mod.Btn;
        btn_skill: game.mod.more.XianjieLuandouSkillBtn;
        lb_goto: eui.Label;
        head1: game.mod.Head;
        bar1: game.mod.ProgressBarComp;
        btn1: game.mod.Btn;
        enemyInfo1: game.mod.EnemyInfoView;
        head2: game.mod.Head;
        bar2: game.mod.ProgressBarComp;
        btn2: game.mod.Btn;
        enemyInfo2: game.mod.EnemyInfoView;
        head3: game.mod.Head;
        bar3: game.mod.ProgressBarComp;
        btn3: game.mod.Btn;
        enemyInfo3: game.mod.EnemyInfoView;
        img_fanji: eui.Image;
        grp_tips: eui.Group;
        grp_lv1: eui.Group;
        headKillView: game.mod.HeadKillView;
        grp_killtips: eui.Group;
        lb_killtips: eui.Label;
        list_skill: eui.List;
        skillItem: game.mod.more.XianjieLuandouSceneSkillItem;
        buffReviveView: game.mod.RoleBuffReviveView;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSkillBtn extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_mask: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        data: number;
        private _proxy;
        private _shape;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private changeGraphics;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSkillItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        lab_name: eui.Label;
        lab_desc: eui.Label;
        btn_buy: game.mod.Btn;
        data: number[];
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSkillTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        img_skill: eui.Image;
        lb_name: eui.Label;
        baseDescItem0: game.mod.BaseDescItem;
        baseDescItem1: game.mod.BaseDescItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianjieLuandouStatisticItem extends BaseListenerRenderer {
        img_mvp: eui.Image;
        lab_rank: eui.Label;
        lab_name: eui.Label;
        lab_kill: eui.Label;
        lab_num: eui.Label;
        lab_score: eui.Label;
        img_line: eui.Image;
        data: msg.xianjie_pvp_scene_score_info;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        updateMyShow(): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouStatisticView extends eui.Component {
        secondPop: game.mod.SecondPop;
        img_type3: eui.Image;
        img_type4: eui.Image;
        img_type5: eui.Image;
        list_rank: eui.List;
        item: game.mod.more.XianjieLuandouStatisticItem;
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianjieLuandouView extends eui.Component {
        btn_rule: game.mod.Btn;
        btn_rank: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        list_reward: eui.List;
        img_end: eui.Image;
        lb_desc: eui.Label;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianjieLuandouZhanbaoItem extends BaseListenerRenderer {
        img_boss: eui.Image;
        lb_name: eui.Label;
        lb_guildname: eui.Label;
        lb_desc: eui.Label;
        lb_died: eui.Label;
        data: msg.xianjie_pvp_battle_report;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouZhanbaoView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiCoolTimeItem extends BaseListenerRenderer {
        lb_cooltime: eui.Label;
        btn_lengque: game.mod.Btn;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        /**
         * 大于2小时，才会出现冷却加速按钮
         */
        updateShow(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class XianmaiFightFailView extends eui.Component {
        closeTips: game.mod.CloseTips;
        icon_group: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiFightSuccessView extends eui.Component {
        resultReward: game.mod.ResultReward;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import xianmai_role_data = msg.xianmai_role_data;
    class XianmaiInfoItem extends BaseRenderer {
        img_bg: eui.Image;
        timeItem: game.mod.TimeItem;
        gr_defendtime: eui.Group;
        lb_defendtime: eui.Label;
        lb_desc0: eui.Label;
        lb_desc1: eui.Label;
        lb_desc2: eui.Label;
        bar: game.mod.ProgressBarComp;
        private _proxy;
        private _defendEft;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        updateDefaultView(stage: number, index: number): void;
        updateInfo(cfg: XianmaiStageConfig, stage: number): void;
        updateRoleView(data: xianmai_role_data): void;
        private removeDefendEff;
        private addDefendEff;
    }
}
declare namespace game.mod.more {
    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import xianmai_role_data = msg.xianmai_role_data;
    class XianmaiItem extends BaseRenderer {
        img_bg: eui.Image;
        img_timedi: eui.Image;
        lb_name: eui.Label;
        powerLabel: game.mod.PowerLabel;
        bar: game.mod.ProgressBarComp;
        lb_defendtime: eui.Label;
        data: IXianmaiItemData;
        private _proxy;
        private _defendEft;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        updateTime(): void;
        private removeDefendTime;
        private addDefendEff;
    }
    interface IXianmaiItemData {
        stage: number;
        cfg: XianmaiStageConfig;
        info: xianmai_role_data;
    }
}
declare namespace game.mod.more {
    class XianmaiItemTipsView extends eui.Component {
        secondPop: game.mod.SecondPop;
        nameItem: game.mod.AttrNameItem;
        lb_title: eui.Label;
        infoItem: game.mod.more.XianmaiInfoItem;
        btn_do: game.mod.Btn;
        coolTimeItem: game.mod.more.XianmaiCoolTimeItem;
        lb_mydesc0: eui.Label;
        lb_mydesc1: eui.Label;
        lb_mynum0: eui.Label;
        lb_mynum1: eui.Label;
        headVip: game.mod.HeadVip;
        lb_name: eui.Label;
        powerLabel: game.mod.PowerLabel;
        lb_guild: eui.Label;
        img_defender: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiListItem extends BaseListenerRenderer {
        lb_layer: eui.Label;
        lb_num: eui.Label;
        lb_earn: eui.Label;
        btn_do: game.mod.Btn;
        data: msg.xianmai_stage_data;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class XianmaiListView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn_invite: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiMvpItem extends eui.Component {
        head: game.mod.HeadVip;
        img_title: eui.Image;
        lb_name: eui.Label;
        powerLabel: game.mod.PowerLabel;
        lb_guild: eui.Label;
        lb_score: eui.Label;
        constructor();
        updateShow(data: msg.teammate): void;
        private defaultView;
    }
}
declare namespace game.mod.more {
    class XianmaiResultView extends eui.Component {
        list_reward: eui.List;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiSelectView extends eui.Component {
        secondPop: game.mod.SecondPop;
        infoItem0: game.mod.more.XianmaiInfoItem;
        infoItem1: game.mod.more.XianmaiInfoItem;
        btn_do0: game.mod.Btn;
        btn_do1: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianmaiView extends eui.Component {
        btn_rank: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        list_btn: eui.List;
        btn_zhanbao: game.mod.Btn;
        btn_yijianxunkuang: game.mod.Btn;
        btn_wodexianmai: game.mod.Btn;
        btn_xianmailiebiao: game.mod.Btn;
        btn_xianmaiduihuan: game.mod.Btn;
        btn_rule: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        lb_time: eui.Label;
        lb_teamcnt: eui.Label;
        lb_teamearn: eui.Label;
        mvpItem: game.mod.more.XianmaiMvpItem;
        coolTimeItem: game.mod.more.XianmaiCoolTimeItem;
        constructor();
    }
}
declare namespace game.mod.more {
    import xianmai_zhanbao_data = msg.xianmai_zhanbao_data;
    class XianmaiZhanbaoItem extends BaseListenerRenderer {
        img_bg: eui.Image;
        lb_desc: eui.Label;
        headVip: game.mod.HeadVip;
        lb_time: eui.Label;
        data: {
            type: number;
            info: xianmai_zhanbao_data;
        };
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XianmaiZhanbaoView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list_btn: eui.List;
        lb_desc: eui.Label;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianweiCDItem extends BaseRenderer {
        private lab_time;
        private btn;
        private _proxy;
        protected onAddToStage(): void;
        updateTime(leftTime: number): void;
        private onClickBtn;
    }
}
declare namespace game.mod.more {
    class XianweiCommonItem extends BaseRenderer {
        private img_role;
        private img_title;
        private lab_cnt;
        private _proxy;
        data: string;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(key: string): void;
    }
}
declare namespace game.mod.more {
    import xianwei_place_data = msg.xianwei_place_data;
    class XianweiInfoItem extends BaseRenderer {
        private lab_name;
        private list;
        private timeItem;
        private _listData;
        private _proxy;
        data: xianwei_place_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: xianwei_place_data): void;
        updateTime(leftTime: number): void;
    }
}
declare namespace game.mod.more {
    import xianwei_member_data = msg.xianwei_member_data;
    class XianweiListItem extends BaseRenderer {
        private head;
        private img_title;
        private lab_name;
        private powerLabel;
        private timeItem;
        private btn;
        private grp_time;
        private _proxy;
        private _power;
        private _self;
        data: xianwei_member_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickBtn;
        private onClickHead;
    }
}
declare namespace game.mod.more {
    class XianweiListView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        list_prop: eui.List;
        img_title: eui.Image;
        timeItem: TimeItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianweiPropView extends eui.Component {
        list_reward: eui.List;
        lab: eui.Label;
        closeTips: CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    import xianwei_common_log_data = msg.xianwei_common_log_data;
    class XianweiTipsItem extends BaseRenderer {
        private lab;
        private _proxy;
        data: xianwei_common_log_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    import xianwei_log_data = msg.xianwei_log_data;
    class XianweiTipsItem2 extends BaseRenderer {
        private lab;
        private head;
        private _proxy;
        data: xianwei_log_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XianweiTipsView extends eui.Component {
        secondPop: SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XianweiTopItem extends BaseRenderer {
        private head;
        private img_title;
        private lab_name;
        private powerLabel;
        private _proxy;
        data: string;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(key: string): void;
    }
}
declare namespace game.mod.more {
    class XianweiView extends eui.Component {
        timeItem: TimeItem;
        btn_tips: Btn;
        btn_rank: Btn;
        btn_explain: Btn;
        list: eui.List;
        infoItem: XianweiInfoItem;
        cdItem: XianweiCDItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuangguMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class HuangguMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickGoddess;
        private onClickXiandi;
        private onClickDoufa;
        private onClickShenqi;
        private onClickXianwei;
        private updateHint;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class HundunMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _fengmo;
        private _crossunion;
        private _xianmaiProxy;
        private _xianjieProxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickCrossUnion;
        private onClickFengmo;
        private onClickXianmai;
        private onClickXuanyuanmen;
        private updateView;
        private updateBtnXuanyuanmen;
        private updateHint;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.more {
    class FengmoFightMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private onUpdateCount;
        private onClickSao;
        private onClickFight;
    }
}
declare namespace game.mod.more {
    class FengmoHurtRewardMdr extends MdrBase {
        private _view;
        private _itemList;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private sortDamage;
    }
}
declare namespace game.mod.more {
    class FengmoMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class FengmoMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        private _eftIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateModel;
        onUpdateView(): void;
        private onUpdateCnt;
        protected onHide(): void;
        private onClickFight;
        private onClickAdd;
        private onClickReward;
        private onClickRank;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class FengmoRank2Mdr extends FengmoRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.more {
    class FengmoRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class MoreMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.more {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class FengmoResultWinMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateHurtList;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class FengmoSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateHurt;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class FengmoSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        private _type;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.more {
    class GoddessAttrMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private updateView;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class GoddessChatMdr extends MdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _selList;
        private _proxy;
        private readonly ITEM_H;
        private readonly ITEM_N;
        private _index;
        private _chatList;
        private content;
        private contentLen;
        private startContent;
        private _delay;
        private _isClose;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClick;
        private resetData;
        private onInfoUpdate;
        private onChatSel;
        private updateView;
        private getInfos;
        private updateItemList;
        private updateItemListPos;
        private addItemList;
        private setLabAct;
        private setListSel;
        private startChat;
        private nextChat;
        private clearDelay;
        private endChat;
        private updateChatTxt;
        private jumpChat;
        update(time: base.Time): void;
        private updateContent;
    }
}
declare namespace game.mod.more {
    import HuangguShijianTypeConfig = game.config.HuangguShijianTypeConfig;
    class GoddessEventChallengeMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        protected _showArgs: HuangguShijianTypeConfig;
        private _index;
        private _cfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickZhenrong;
        private onClickChallenge;
        private updateView;
        private updateBtn;
    }
}
declare namespace game.mod.more {
    class GoddessEventMdr extends MdrBase {
        private _view;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateView;
        private updateHint;
    }
}
declare namespace game.mod.more {
    class GoddessGodMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _canAct;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private updateView;
    }
}
declare namespace game.mod.more {
    class GoddessMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class GoddessMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cost;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDesc;
        private onClickChat;
        private onClickEvent;
        private onClickTarget;
        private onClickGodItem;
        private onClickSummon;
        private onClickConsecrate;
        private onClickReward;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private onUpdateIndex2;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private initShow;
        private updateInfo;
        private updateCost;
        private updateAttr;
        private updateHint;
        private updateChatHint;
        private updateEventHint;
        private updateTargetHint;
        private updateActHint;
        private updateSummonHint;
    }
}
declare namespace game.mod.more {
    class GoddessSummonMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _cost;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSummon;
        private onClickReward;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        private initShow;
        private updateView;
    }
}
declare namespace game.mod.more {
    class GoddessTargetMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class GoddessTargetMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initShow;
        private updateItemList;
    }
}
declare namespace game.mod.more {
    class RewardShowMdr extends MdrBase {
        private _view;
        private _itemList;
        protected _showArgs: {
            rewards: number[][];
            tips: string;
            title?: string;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XiandiGiftMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: number;
        private _productId;
        private _itemList;
        private _canReceived;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private labTimes;
        private onBuyUpdate;
        private onClickBuy;
        private updateShow;
        private updateBuyState;
    }
}
declare namespace game.mod.more {
    class XiandiGodressMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiGodressMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickFight;
        private onClickSkill;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiHouseMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiHouseMdr extends MdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickFight;
        private onClickGod;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiInfoMdr extends EffectMdrBase {
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
declare namespace game.mod.more {
    class XiandiListMdr extends EffectMdrBase {
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
declare namespace game.mod.more {
    class XiandiMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiMdr extends EffectMdrBase implements base.UpdateItem {
        private _view;
        private _proxy;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        update(time: base.Time): void;
        protected onHide(): void;
        private onClickAdd;
        private onClickFight;
        private onClickRank;
        private onClickExplain;
    }
}
declare namespace game.mod.more {
    class XiandiRank2Mdr extends XiandiRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.more {
    class XiandiRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    class AchieveProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_achievement_get_big_rewards(): void;
        private s2c_achievement_info;
        readonly lv: number;
        readonly status: number;
        private updateHint;
        private checkHint;
        protected onTaskHint(n: base.GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.more {
    class XiandiSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        private _type;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.more {
    class XiandiShowMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiShowMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private readonly _kings;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickHouse;
        private onClickLike;
        private onClickExplain;
        private onClickGoddess;
        private onClickGift;
        private onClickReward;
        private onClickFight;
        private onClickTreasure;
        private onClickWeapon;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiSkillTipsMdr extends MdrBase {
        protected _view: XiandiSkillTipsView;
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
declare namespace game.mod.more {
    class XiandiTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onNoRemind;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiShilianMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickBtn;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiStageMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _index;
        private _cfgs;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onnUpdateSelect;
        private onUpdateAttr;
        private onClickRight;
        private onClickLeft;
        private onClickActive;
        private onClickAttr;
        private onClickShilian;
        protected onHide(): void;
        private readonly stage;
    }
}
declare namespace game.mod.more {
    class XiandiTreasureMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiTreasureMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCoin;
        private onUpdateList;
        private onUpdateCount;
        private onClickFight;
        private onClickExplain;
        private onRoleUpdate;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XiandiWeaponMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XiandiWeaponMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCoin;
        private onUpdateSkill;
        private onUpdateAttr;
        private onClickBattle;
        private onClickPreview;
        private onClickAttr;
        private onRoleUpdate;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianjieLuandouBossTipsMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianjieLuandouMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        update(time: base.Time): void;
        private onClickRule;
        private onClickRank;
        private onClickDo;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianjieLuandouRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _type;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouRankSectionMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: number[];
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianjieLuandouSceneMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _sceneProxy;
        private _competeProxy;
        private _listBoss;
        private _listSkill;
        private _selBossIdx;
        private _skillCostIdx;
        private _belongVo;
        private _nearbyEnemyVo;
        private _targetVo;
        private _isNoticeShowing;
        private readonly NOTICE_TIME;
        private readonly NOTICE_SHOW;
        private _reliveTime;
        private _clickBtn1;
        private _clickBtn2;
        private _clickBtn3;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private initShow;
        protected onHide(): void;
        private onUpdateBattleReportInfo;
        private onUpdateXianjieSceneInfo;
        private updateBtnHint;
        private updateAttack;
        private setAttackShow;
        private onBossHpChange;
        private onUpdateKillBossInfo;
        private setKillShow;
        private updateKill;
        private showKill;
        private checkNextKill;
        private updateBossList;
        private initBossSelect;
        private updateBossListHp;
        private onObjAdd;
        private onObjDel;
        private updateBelong;
        private updateBelongHp;
        private updateNearbyEnemy;
        private updateNearbyEnemyHp;
        private updateAvengeEnemy;
        private updateAvengeEnemyHp;
        private getVoByRoleId;
        private updateSkill;
        private updateSkillCost;
        private updateSkillCd;
        private onRoleRelive;
        private onRoleDie;
        private setDiedShow;
        private updateReliveTime;
        private onClickRevive;
        private onClickHead1;
        private onClickHead2;
        private onClickHead3;
        private changeAttackTarget;
        private onClickBtn1;
        private onClickBtn2;
        private onClickBtn3;
        private onClickZhanbao;
        private onClickRule;
        private onClickHurt;
        private onClickRrward;
        private onClickSkillItem;
        private onClickListBoss;
        private onClickListSkill;
        private onClickBtnSkill;
        private onClickGoto;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    import XianjiebrawlScoreConfig = game.config.XianjiebrawlScoreConfig;
    class XianjieLuandouScoreRewardItem extends BaseListenerRenderer {
        lab_desc: eui.Label;
        list_reward: eui.List;
        img_not: eui.Image;
        img_draw: eui.Image;
        btn_draw: game.mod.Btn;
        private _proxy;
        private _listData;
        data: IXianjieLuandouScoreRewardItemData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IXianjieLuandouScoreRewardItemData {
        cfg: XianjiebrawlScoreConfig;
        status: RewardStatus;
        myScore: number;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouScoreRewardMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSkillMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _costIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateItemList;
        private updateCost;
        /** 通用背包事件监听 */
        private onBagUpdateIndex;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XianjieLuandouStatisticMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listBtn;
        private _rankType;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateListBtn;
        private updateView;
        private onClickListBtn;
    }
}
declare namespace game.mod.more {
    class AchieveModel {
        lv: number;
        status: number;
        hintType: string[];
    }
}
declare namespace game.mod.more {
    class XianmaiFightFailMdr extends MdrBase {
        private _view;
        private _proxy;
        private _btnList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected addBtn(data: IJumpData, jumpId: number): void;
        protected jumpFunc(e: egret.Event): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XianmaiFightMdr extends MdrBase {
        private _view;
        private _proxy;
        private readonly HP_WIDTH;
        private readonly TWEEN_TIME;
        private _data;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateInfo;
        private endTween;
        /**更新自己*/
        private updateSelf;
        /**更新敌人*/
        private updateEnemy;
    }
}
declare namespace game.mod.more {
    class XianmaiFightSuccessMdr extends MdrBase {
        private _view;
        private _proxy;
        private _props;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    import HonourConfig = game.config.HonourConfig;
    class HonourModel {
        /**type-index存储信息，二维Map存储*/
        typeInfo: {
            [type: number]: {
                [index: number]: msg.honour_info;
            };
        };
        typeCfgMap: {
            [type: number]: HonourConfig[];
        };
        hintPathObj: {
            [type: number]: string[];
        };
    }
}
declare namespace game.mod.more {
    class XianmaiItemTipsMineMdr extends XianmaiItemTipsMdr {
        protected updateView(): void;
        protected onUpdateMyShow(): void;
        protected onUpdateStageShow(): void;
        protected onClickBtndo(): void;
        protected updateTime(): void;
    }
}
declare namespace game.mod.more {
    class XianmaiItemTipsOnekeyMdr extends XianmaiItemTipsMdr {
        protected updateView(): void;
        protected onClickBtndo(): void;
        protected updateTime(): void;
    }
}
declare namespace game.mod.more {
    class XianmaiListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickInvite;
    }
}
declare namespace game.mod.more {
    class XianmaiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected addListeners(): void;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianmaiMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listBtn;
        private _listData;
        private _selIdx;
        private _minEndTime;
        private _isClickSearch;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateRewardShow;
        private onUpdateSearchView;
        private updateTimeStr;
        private updateListBtn;
        private onUpdateView;
        private updateView;
        private onClickListBtn;
        private onClickRank;
        private onClickZhanbao;
        private onClickYijianxunkuang;
        private onClickWodexianmai;
        private onClickXianmailiebiao;
        private onClickXianmaiduihuan;
        private onClickRule;
        update(time: base.Time): void;
        private updateBtnHint;
    }
}
declare namespace game.mod.more {
    class XianmaiRank2Mdr extends XianmaiRankMdr {
        protected _type: number;
    }
}
declare namespace game.mod.more {
    class XianmaiRanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import HonourConfig = game.config.HonourConfig;
    import GameNT = base.GameNT;
    import honour_info = msg.honour_info;
    /**
     * @description 荣耀系统
     */
    class HonourProxy extends ProxyBase {
        private _model;
        initialize(): void;
        c2s_honour_get_info(type: HonourType): void;
        private s2c_honour_get_reward;
        /**=========================协议end=========================*/
        /**大类信息*/
        getInfoByType(type: HonourType): {
            [index: number]: honour_info;
        };
        /**大类下某index的信息*/
        getInfoByTypeIndex(type: HonourType, index: number): honour_info;
        getCfgList(type: HonourType): HonourConfig[];
        getCfg(type: HonourType, index: number): HonourConfig;
        getListData(type: HonourType): IHonourItemData[];
        /**大类下某index的红点*/
        getHintByTypeIndex(type: HonourType, index: number): boolean;
        /**大类红点*/
        getHintByType(type: HonourType): boolean;
        private updateHint;
        protected onTaskHint(n: GameNT): void;
    }
}
declare namespace game.mod.more {
    class XianmaiRankSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        private _type;
        protected _showArgs: {
            rank: string;
            type: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.more {
    class XianmaiResultMdr extends MdrBase {
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
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianmaiSelectMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _stage;
        private _index;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBtnDo0;
        private onClickBtnDo1;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class XianmaiZhanbaoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listBtn;
        private _selIdx;
        private _btnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickList;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianweiListMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _listProp;
        private _stage;
        private _index;
        private _idxs;
        private _delayIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private onResult;
        private onClearDelay;
    }
}
declare namespace game.mod.more {
    class XianweiMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianweiMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        private _delayIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateReward;
        private onUpdateView;
        /**挑战cd */
        private onUpdateFigth;
        private onClickExplain;
        private onClickTips;
        private onClickRank;
        private onClickItem;
        protected onHide(): void;
        update(time: base.Time): void;
        private onResult;
        private onClearDelay;
    }
}
declare namespace game.mod.more {
    class XianweiPropMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        private onUpdateView;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class XianweiRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XianweiRankMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _itemList;
        private _proxy;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateTime;
        private onUpdateView;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTime;
    }
}
declare namespace game.mod.more {
    class XianweiSectionMdr extends EffectMdrBase {
        private _view;
        private _itemList;
        private _proxy;
        private _section;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRankUpdate;
    }
}
declare namespace game.mod.more {
    class XianweiTipsMdr extends MdrBase {
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
declare namespace game.mod.more {
    class HuanjingModel {
        infoMap: {
            [systemId: number]: msg.s2c_update_huanjin_info;
        };
        attrMap: {
            [systemId: number]: msg.s2c_huanjin_attr_update;
        };
        stageLvMap: {
            [systemId: number]: number;
        };
        starPosMap: {
            [systemId: number]: {
                [pos: number]: number;
            };
        };
        huanlingMaxStageMap: {
            [systemId: number]: {
                [type: number]: number;
            };
        };
        huanlingSkillMap: {
            [systemId: number]: {
                [type: number]: {
                    [pos: number]: number[];
                };
            };
        };
        zhushenSkillLvMap: {
            [systemId: number]: {
                [pos: number]: number;
            };
        };
        headTypes: number[];
        shenlingIds: number[];
        costIndexs: number[];
        shenlingStarCost: number[];
        mainHintPath: string[];
        growHintPath: string[];
        collectHintPath: string[];
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import s2c_update_huanjin_info = msg.s2c_update_huanjin_info;
    import HuanjinParamConfig = config.HuanjinParamConfig;
    import HuanjinStageConfig = game.config.HuanjinStageConfig;
    import HuanjinStarConfig = game.config.HuanjinStarConfig;
    import huanjin_star_data = msg.huanjin_star_data;
    import HuanjinHuanlingConfig = game.config.HuanjinHuanlingConfig;
    import HuanjinZushenConfig = game.config.HuanjinZushenConfig;
    import s2c_huanjin_attr_update = msg.s2c_huanjin_attr_update;
    /**
     * @description 幻境系统
     */
    class HuanjingProxy extends ProxyBase implements IHuanjingProxy {
        private _model;
        initialize(): void;
        /**
         * 激活升阶升星等操作
         * @param systemId
         * @param oper 1.祭炼2.天星槽位升星3.天星激活4.幻灵升阶5.幻灵技能激活6.驻神进阶
         * @param pos 槽位(2,4,5,6)
         * @param place 技能槽位(5)
         */
        c2s_huanjin_oper(systemId: number, oper: number, pos?: number, place?: number): void;
        private s2c_update_huanjin_info;
        private s2c_huanjin_attr_update;
        private checkBreakthrough;
        /**====================协议end====================*/
        checkSystemOpen(systemId: number, isTips?: boolean): boolean;
        getHuanjingParamCfgs(): HuanjinParamConfig[];
        getHuanjingParamCfg(systemId: number): HuanjinParamConfig;
        getStageCfg(systemId: number, stageLv?: number): HuanjinStageConfig;
        getStarCfg(systemId: number, pos: number, star: number): HuanjinStarConfig;
        getHuanlingCfg(systemId: number, type: number, lv: number): HuanjinHuanlingConfig;
        getZhushenCfg(systemId: number, pos: number, lv: number): HuanjinZushenConfig;
        getSystemInfo(systemId: number): s2c_update_huanjin_info;
        getSystemAttr(systemId: number): s2c_huanjin_attr_update;
        getAttr(systemId: number): number;
        getStageLv(systemId: number): number;
        getStageNum(systemId: number): number;
        getStageSkill(systemId: number): number;
        getMaxStageLv(systemId: number): number;
        isMaxStageLv(systemId: number): boolean;
        canUpStage(systemId: number, isTips?: boolean): boolean;
        getSurfaceActedNum(systemId: number): number;
        canOpenGrow(systemId: number, isTips?: boolean): boolean;
        getStarLv(systemId: number): number;
        getStarList(systemId: number): huanjin_star_data[];
        getStarPosData(systemId: number, pos: number): huanjin_star_data;
        getStarPosMax(systemId: number, pos: number): number;
        isStarPosMax(systemId: number, pos: number): boolean;
        canActOrUpStarPos(systemId: number, pos: number, isTips?: boolean): boolean;
        canActOrUpStar(systemId: number, isTips?: boolean): boolean;
        getMaxStarLv(systemId: number): number;
        isMaxStarLv(systemId: number): boolean;
        getStarActNum(systemId: number, starLv: number): number;
        getHuanlingMaxStage(systemId: number, type: number): number;
        isHuanlingMaxStage(systemId: number, type: number): boolean;
        getHuanlingList(systemId: number): msg.huanjin_huanling_data[];
        getHuanlingInfo(systemId: number, type: number): msg.huanjin_huanling_data;
        getHuanlingSkillInfo(systemId: number, type: number, pos: number): msg.huanjin_skill_data;
        getHuanlingSkillData(systemId: number, type: number, pos: number): number[];
        getHuanlingSpecialId(systemId: number, type: number, pos: number): number;
        canHuanling(systemId: number, type: number, isTips?: boolean): boolean;
        canHuanlingSkillAct(systemId: number, type: number, pos: number): boolean;
        getHuanlingHintByType(systemId: number, type: number): boolean;
        getHuanlingStageMax(systemId: number): number;
        getZhushenList(systemId: number): msg.huanjin_star_data[];
        getZhushenInfo(systemId: number, pos: number): msg.huanjin_star_data;
        getZhushenStageLv(systemId: number): number;
        getZhushenSkillMaxLv(systemId: number, pos: number): number;
        isZhushenSkillMax(systemId: number, pos: number): boolean;
        canActOrUpZhushen(systemId: number, pos: number, isTips?: boolean): boolean;
        getZhushenStarMax(systemId: number): number;
        getGrowAttr(systemId: number): msg.attributes;
        /**======================== hint start ========================*/
        readonly mainHintPath: string[];
        readonly growHintPath: string[];
        readonly collectHintPath: string[];
        getStageHint(systemId: number): boolean;
        getStarHint(systemId: number): boolean;
        getHuanlingHint(systemId: number): boolean;
        getZhushenHint(systemId: number): boolean;
        getGrowHintPath(systemId: number): string[];
        getGrowHint(systemId: number): boolean;
        getCollectHintPath(systemId: number): string[];
        getSurfaceHint(systemId: number): boolean;
        getSurfaceSingleHint(id: number): boolean;
        getShenlingShenjiHint(id: number): boolean;
        getHintBySystemId(systemId: number): boolean;
        getCollectHint(systemId: number): boolean;
        private updateGrowHint;
        private updateCollectHint;
        private updateHint;
        private getOutlookHeadType;
        private getShenlingIds;
        protected onShenlingInfoUpdate(): void;
        protected onSurfaceInfoUpdate(n: GameNT): void;
        getCostIndexs(): number[];
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
        private getShenlingStarCost;
        protected onSeaInfoUpdate(n: GameNT): void;
        getFuchenlinghuHint(): boolean;
        getSeaRankHint(type?: SeaType): boolean;
        getSeaMainHint(): boolean;
        private onUpdateFuchenlinghuInfo;
        private onUpdateShenlingShenjiInfo;
    }
}
declare namespace game.mod.more {
    class HuanjingCollectItem extends BaseListenerRenderer {
        avatarItem: game.mod.AvatarBaseItem;
        img_icon: eui.Image;
        img_frame: eui.Image;
        img_quality: eui.Image;
        lb_name: eui.Label;
        starListView: game.mod.StarListView;
        img_gray: eui.Image;
        redPoint: eui.Image;
        data: number;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class HuanjingCollectItemTipsView extends eui.Component {
        gr_eft: eui.Group;
        nameItem: game.mod.AvatarNameSrItem;
        btn_god: game.mod.AttrGodItem;
        power2: game.mod.Power2;
        btn_shenji: game.mod.Btn;
        btn_shangzhen: game.mod.Btn;
        btn_upstar: game.mod.UpStarBtn;
        specialAttrView: game.mod.SpecialAttrView;
        btn_shenlingskill: game.mod.ShenLingSkillIcon;
        starListView: game.mod.StarListView;
        item_pill0: game.mod.SurfacePillItemRender;
        item_pill1: game.mod.SurfacePillItemRender;
        item_pill2: game.mod.SurfacePillItemRender;
        item_skill0: game.mod.ShenLingSkillIcon;
        item_skill1: game.mod.ShenLingSkillIcon;
        item_skill2: game.mod.ShenLingSkillIcon;
        item_skill3: game.mod.ShenLingSkillIcon;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingCollectView extends eui.Component {
        btn0: game.mod.Btn;
        btn1: game.mod.Btn;
        btn2: game.mod.Btn;
        btn3: game.mod.Btn;
        lb_name: eui.Label;
        scroller: eui.Scroller;
        list: eui.List;
        skillItem: game.mod.SkillItemRender;
        img_name: eui.Image;
        img_title: eui.Image;
        gr_font: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuanjinParamConfig = game.config.HuanjinParamConfig;
    class HuanjingEntranceItem extends BaseRenderer {
        img_bg: eui.Image;
        img_name: eui.Image;
        lb_lv: eui.Label;
        btn0: game.mod.Btn;
        skillItem: game.mod.SkillItemRender;
        img_text: eui.Image;
        gr_font: eui.Group;
        redPoint: eui.Image;
        img_gray: eui.Image;
        data: HuanjinParamConfig;
        private _proxy;
        private _clickBtn;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickThis;
    }
}
declare namespace game.mod.more {
    class HuanjingEntranceView extends eui.Component {
        btn0: game.mod.Btn;
        btn1: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingGrowBtnItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        lb_lv: eui.Label;
        redPoint: eui.Image;
        img_type: eui.Image;
        data: IHuanjingGrowBtnItemData;
        protected dataChanged(): void;
    }
    interface IHuanjingGrowBtnItemData {
        systemId: number;
        type: number;
        showHint: boolean;
        lv: number;
    }
}
declare namespace game.mod.more {
    class HuanjingGrowView extends eui.Component {
        power2: game.mod.Power2;
        name_item: game.mod.AvatarNameItem;
        list_item: eui.List;
        stageSkillItem: game.mod.more.HuanjingStageSkillItem;
        img_name: eui.Image;
        img_bg: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingHuanlingView extends eui.Component {
        secondPop: game.mod.SecondPop;
        grp_lv: eui.Group;
        list_btn: eui.List;
        skillItem0: game.mod.SkillItemRender;
        skillItem1: game.mod.SkillItemRender;
        skillItem2: game.mod.SkillItemRender;
        skillItem3: game.mod.SkillItemRender;
        img_name: eui.Image;
        img_eff: eui.Image;
        lb_lv: eui.Label;
        icon: game.mod.Icon;
        btn_do: game.mod.Btn;
        img_huanlingname: eui.Image;
        img_bg: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingStageBar extends eui.Component {
        img_xian: eui.Image;
        img0: eui.Image;
        img1: eui.Image;
        img2: eui.Image;
        img3: eui.Image;
        img4: eui.Image;
        img5: eui.Image;
        img6: eui.Image;
        img7: eui.Image;
        img8: eui.Image;
        img9: eui.Image;
        private _singleBar;
        constructor();
        private _proxy;
        updateShow(systemId: number): void;
    }
}
declare namespace game.mod.more {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class HuanjingStageSkillItem extends BaseStageEventItem {
        skillItem: game.mod.SkillItemRender;
        img_icon: eui.Image;
        lb_lv: eui.Label;
        img_title: eui.Image;
        gr_font: eui.Group;
        protected _effHub: UIEftHub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClick;
        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal?: boolean, scale?: number, center?: boolean, gap?: number, expandParent?: boolean): void;
        private _systemId;
        private _proxy;
        updateShow(systemId: number): void;
    }
}
declare namespace game.mod.more {
    class HuanjingStageSkillTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_skilltype: eui.Image;
        baseDescItem: game.mod.BaseDescItem;
        skillAttrList: game.mod.SkillAttrList;
        baseDescList2: game.mod.BaseDescList2;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingStageView extends eui.Component {
        secondPop: game.mod.SecondPop;
        power2: game.mod.Power2;
        grp_lv: eui.Group;
        nameItem: game.mod.AvatarNameItem;
        lb_nextstage: eui.Label;
        list_nextattr: eui.List;
        costIcon: game.mod.CostIcon;
        btn_do: game.mod.Btn;
        stageSkillItem: game.mod.more.HuanjingStageSkillItem;
        stageBar: game.mod.more.HuanjingStageBar;
        img_name: eui.Image;
        img_bg: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingStarComp extends BaseStageEventItem {
        starItem0: game.mod.more.HuanjingStarItem;
        starItem1: game.mod.more.HuanjingStarItem;
        starItem2: game.mod.more.HuanjingStarItem;
        starItem3: game.mod.more.HuanjingStarItem;
        starItem4: game.mod.more.HuanjingStarItem;
        img_line: eui.Image;
        private _proxy;
        private _systemId;
        private _maxNum;
        private _singleLine;
        constructor();
        protected onAddToStage(): void;
        updateShow(systemId: number): void;
        private getPosNum;
        private getPosStar;
    }
}
declare namespace game.mod.more {
    class HuanjingStarItem extends BaseListenerRenderer {
        redPoint: eui.Image;
        data: {
            systemId: number;
            pos: number;
            star: number;
            showHint: boolean;
        };
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class HuanjingStarStageItem extends BaseListenerRenderer {
        baseNameItem: game.mod.BaseNameItem;
        lb_desc: eui.Label;
        baseZhuangshiItem: game.mod.BaseZhuangshiItem;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        updateShow(title: string, actDesc: string, desc: string): void;
    }
}
declare namespace game.mod.more {
    class HuanjingStarStageTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_skilltype: eui.Image;
        starStageItem0: game.mod.more.HuanjingStarStageItem;
        starstageItem1: game.mod.more.HuanjingStarStageItem;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingStarView extends eui.Component {
        secondPop: game.mod.SecondPop;
        power: game.mod.Power;
        starComp: game.mod.more.HuanjingStarComp;
        costIcon: game.mod.CostIcon;
        lb_desc: eui.Label;
        lb_name: eui.Label;
        lb_skilldesc: eui.Label;
        img_icon: eui.Image;
        lb_lv: eui.Label;
        redPoint: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingZhushenSkillItem extends BaseListenerRenderer {
        skillItem: game.mod.SkillItemRender;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        redPoint: eui.Image;
        data: IHuanjingZhushenSkillItemData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IHuanjingZhushenSkillItemData {
        systemId: number;
        pos: number;
        skillId: number;
    }
}
declare namespace game.mod.more {
    class HuanjingZhushenSkillTipsView extends eui.Component {
        baseQualityTips: game.mod.BaseQualityTips;
        skillItem: game.mod.SkillItemRender;
        lb_name: eui.Label;
        img_skilltype: eui.Image;
        baseDescItem0: game.mod.BaseDescItem;
        baseDescItem1: game.mod.BaseDescItem;
        icon: game.mod.Icon;
        btn_do: game.mod.Btn;
        lb_condition: eui.Label;
        list_cost: eui.List;
        constructor();
        updateBaseView(skillId: number): void;
    }
}
declare namespace game.mod.more {
    class HuanjingZhushenView extends eui.Component {
        secondPop: game.mod.SecondPop;
        skillItem0: game.mod.more.HuanjingZhushenSkillItem;
        skillItem1: game.mod.more.HuanjingZhushenSkillItem;
        skillItem2: game.mod.more.HuanjingZhushenSkillItem;
        skillItem3: game.mod.more.HuanjingZhushenSkillItem;
        img_name: eui.Image;
        img_eff1: eui.Image;
        gr_font1: eui.Group;
        img_eff2: eui.Image;
        gr_font2: eui.Group;
        lb_lv: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuanjingCollectItemTipsMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _shenlingProxy;
        private _surfaceProxy;
        private _index;
        private _cfg;
        private _modelIdx;
        private _itemData;
        private _modelSrc;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private isShenling;
        private isXianjian;
        private updateView;
        private updateSurfacePill;
        private onUpdateShenlingShenjiHint;
        private updateShenlingSkill;
        private updateModel;
        private getAttr;
        private updatePower;
        private onClickBtnShangzhen;
        private onClickBtnShenji;
        private onClickBtnShenlingSKill;
        private onClickAttr;
        private onClickShenlingTalentSkill;
        private onClickBtnUpstar;
    }
}
declare namespace game.mod.more {
    class HuanjingCollectMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected updateBtnList(): void;
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    class HuanjingCollectMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _systemId;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBtn;
        private updateBtnHint;
        private onUpdateHint;
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
    }
}
declare namespace game.mod.more {
    class HuanjingEntranceMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickBtn0;
        private onClickBtn1;
        private updateBtnHint;
        private onUpdateHint;
    }
}
declare namespace game.mod.more {
    class HuanjingGrowMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected updateBtnList(): void;
    }
}
declare namespace game.mod.more {
    class HuanjingGrowMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _systemId;
        private _viewTypes;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateBtnList;
        private onClickDesc;
        private onClickSkill;
        private updatePower;
        private onBagUpdateByPropIndex;
        private onRoleUpdate;
    }
}
declare namespace game.mod.more {
    class HuanjingHuanlingMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _systemId;
        private _listBtn;
        private _selIdx;
        private _skillItems;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateSkill;
        private onClick;
        private onClickList;
        private onClickSkill;
    }
}
declare namespace game.mod.more {
    class HuanjingHuanlingSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: {
            systemId: number;
            type: number;
            pos: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateSpecialAttr;
        private onClickBtnDo;
    }
}
declare namespace game.mod.more {
    class HuanjingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class HuanjingStageMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listAttr;
        private _systemId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateAttr;
        private onClickAttr;
        private onClickBtnDo;
    }
}
declare namespace game.mod.more {
    class HuanjingStageSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _systemId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private getStageDesc;
        private getHuanlingDesc;
        private getZhushenDesc;
    }
}
declare namespace game.mod.more {
    class HuanjingStarMdr extends MdrBase {
        private _view;
        private _proxy;
        private _systemId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateSkillView;
        private updatePower;
        private onClick;
    }
}
declare namespace game.mod.more {
    class HuanjingStarSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listCost;
        _showArgs: {
            systemId: number;
            pos: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
        private updateAttr;
    }
}
declare namespace game.mod.more {
    class HuanjingStarStageTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        private _systemId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.more {
    class HuanjingZhushenMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _systemId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateAttr;
        protected onHide(): void;
        private updateView;
        private updateSkill;
    }
}
declare namespace game.mod.more {
    class HuanjingZhushenSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: {
            systemId: number;
            pos: number;
            skillId: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateAttr;
        private onClick;
    }
}
declare namespace game.mod.more {
    import huashen_data = msg.huashen_data;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;
    class HuashenModel {
        selIndex: number;
        hintType: string[];
        roadIndex: number;
        nowId: number;
        roadHint: string[];
        zhanshendianHint: string[];
        tianfuList: huashen_data[];
        tianfuOpen: boolean;
        tianfuCfgList: {
            [type: number]: HuashenTianfuConfig[];
        }; /**客户端分类*/
        tianfuUpHint: string[];
        tianfuUpIndex: number;
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import huashen_data = msg.huashen_data;
    import HuashenTianfuLeixingConfig = game.config.HuashenTianfuLeixingConfig;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;
    class HuashenProxy extends ProxyBase implements IHuashenProxy {
        private _model;
        initialize(): void;
        selIndex: number;
        /**更新红点*/
        private updateHint;
        protected onTaskHint(n: GameNT): void;
        protected onSurfaceInfoUpdate(n: GameNT): void;
        /***********************************化神之路*****************************************/
        c2s_huashen_levelup(index: number): void;
        c2s_huashen_road_get_rewards(): void;
        private s2c_huashen_data_info;
        private getTianfuPos;
        checkRoadOpen(showTips?: boolean): boolean;
        private checkActCnt;
        readonly roadIndex: number;
        isRoadEnd(index: number): boolean;
        isCur(): boolean;
        getRoadStartIndex(): number;
        hasDraw(index: number): boolean;
        canDraw(index: number): boolean;
        hasAllDraw(): boolean;
        /**更新红点*/
        private updateRoadHint;
        getRoadHint(): string[];
        /**************************************战神殿******************************************/
        readonly nowId: number;
        checkShow(): boolean;
        checkOpen(showTips?: boolean): boolean;
        /**更新红点*/
        private updateZhanshendianHint;
        getZhanshendianHint(): string[];
        /**************************************天赋******************************************/
        private checkTianfuOpen;
        private updateTianfuOpen;
        readonly tianfuOpen: boolean;
        getTianfuInfo(index: number): huashen_data;
        isTianfuTypeOpen(cfg: HuashenTianfuLeixingConfig, showTips?: boolean): boolean;
        isTianfuOpen(cfg: HuashenTianfuConfig): boolean;
        getTianfuCfgList(type: number): HuashenTianfuConfig[];
        getTianfuHint(cfg: HuashenTianfuConfig): boolean;
        getTianfuTypeHint(cfg: HuashenTianfuLeixingConfig): boolean;
        private updateTianfuHint;
        readonly tianfuUpIndex: number;
        protected onBagUpdateByPropIndex(n: base.GameNT): void;
        protected onRoleUpdate(n: base.GameNT): void;
    }
}
declare namespace game.mod.more {
    class HuashenBattleItem1 extends BaseListenerRenderer {
        private grp_item;
        private grp_item2;
        private item;
        private img_first;
        private item_skill;
        private img_add;
        private grp_lock;
        private lab_lock;
        private redPoint;
        data: number;
        private _surfaceProxy;
        protected onAddToStage(): void;
        private onClickSkill;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    import ride_item = msg.ride_item;
    class HuashenBattleItem2 extends BaseListenerRenderer {
        private item;
        private item_skill;
        private grp_sel;
        private _proxy;
        private _surfaceProxy;
        data: ride_item;
        protected onAddToStage(): void;
        private onClickSkill;
        private onClick;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HuashenBattleView extends eui.Component {
        list_item1: eui.List;
        list_item2: eui.List;
        btn_onekey: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuashenOpenView extends eui.Component {
        constructor();
    }
}
declare namespace game.mod.more {
    class HuashenTaskView extends eui.Component {
        grp_eff: eui.Group;
        grp_skill: eui.Group;
        img_type: eui.Image;
        img_name: eui.Image;
        btn_play: game.mod.Btn;
        btn_open: game.mod.Btn;
        img_task: eui.Image;
        scr: eui.Scroller;
        list_task: eui.List;
        btn_act: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;
    class HuashenTianfuItem extends eui.ItemRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        img_sel: eui.Image;
        lab_lv: eui.Label;
        img_lock: eui.Image;
        private redPoint;
        data: HuashenTianfuConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    import HuashenTianfuLeixingConfig = game.config.HuashenTianfuLeixingConfig;
    class HuashenTianfuTabItem extends eui.ItemRenderer {
        img_icon: eui.Image;
        redPoint: eui.Image;
        data: HuashenTianfuLeixingConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class HuashenTianfuView extends eui.Component {
        lab_lv: eui.Label;
        lab_desc: eui.Label;
        lab_nextLv: eui.Label;
        lab_nextDesc: eui.Label;
        lab_limit: eui.Label;
        img_max: eui.Image;
        img_max2: eui.Image;
        item1: HuashenTianfuItem;
        item2: HuashenTianfuItem;
        item3: HuashenTianfuItem;
        item4: HuashenTianfuItem;
        item5: HuashenTianfuItem;
        item6: HuashenTianfuItem;
        item7: HuashenTianfuItem;
        cost: game.mod.CostIcon;
        btn_up: game.mod.Btn;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuashenZhiluConfig = game.config.HuashenZhiluConfig;
    class HuashenZhiluItem extends eui.ItemRenderer {
        img_di: eui.Image;
        private img_cur;
        grp_cnt: eui.Group;
        private lab_cnt;
        btn_draw: game.mod.Btn;
        data: {
            cfg: HuashenZhiluConfig;
            isEnd: boolean;
            hasDraw?: boolean;
            isCur?: boolean;
            canDraw?: boolean;
        };
        protected dataChanged(): void;
        setDefault(): void;
        setIsCur(isCur: boolean): void;
        setSel(sel: boolean): void;
        setData(cfg: HuashenZhiluConfig, isEnd: boolean, hasDraw?: boolean, isCur?: boolean, canDraw?: boolean): void;
    }
}
declare namespace game.mod.more {
    class HuashenZhiluView extends eui.Component {
        secondPop: game.mod.SecondPop;
        img_line1: eui.Image;
        img_line2: eui.Image;
        img_line3: eui.Image;
        img_line4: eui.Image;
        img_line5: eui.Image;
        img_line6: eui.Image;
        img_line7: eui.Image;
        img_line8: eui.Image;
        img_line9: eui.Image;
        img_line10: eui.Image;
        list_reward: eui.List;
        grp_cnt: eui.Group;
        lab_cnt: eui.Label;
        list_task: eui.List;
        item0: HuashenZhiluItem;
        item1: HuashenZhiluItem;
        item2: HuashenZhiluItem;
        item3: HuashenZhiluItem;
        item4: HuashenZhiluItem;
        item5: HuashenZhiluItem;
        item6: HuashenZhiluItem;
        item7: HuashenZhiluItem;
        item8: HuashenZhiluItem;
        item9: HuashenZhiluItem;
        item10: HuashenZhiluItem;
        item_sel: HuashenZhiluItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanshendianView extends eui.Component {
        grp_eff: eui.Group;
        name_item: AvatarNameItem;
        img_task: eui.Image;
        scr: eui.Scroller;
        list_task: eui.List;
        btn_act: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class HuashenBattleMainMdr extends WndSecondMainMdr {
        protected _height: number;
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class HuashenBattleMdr extends MdrBase {
        private _view;
        private _itemList1;
        private _itemList2;
        private _surfaceProxy;
        private _proxy;
        private _headType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickOnekey;
        private onClickItem1;
        private onInfoUpdate;
        private updateItemList1;
        private updateItemList2;
    }
}
declare namespace game.mod.more {
    class HuashenMainMdr extends WndBaseMdr {
        private _proxy;
        private _surfaceProxy;
        private _index;
        private _isAct;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private initBtnList;
        private updateSelfBtnList;
        private surfaceActUpdate;
        private onTianfuOpen;
        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string;
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    class HuashenMdr extends SurfaceMdr {
        protected showLv: boolean;
        protected showZero: boolean;
        private _huashenProxy;
        protected onInit(): void;
        protected addListeners(): void;
        private onClickGod;
        private onClickZhanshendian;
        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void;
        private updateZhanshendian;
        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void;
        private updateHuashenHint;
        private updateRoadHint;
        private updateZhanshendianHint;
    }
}
declare namespace game.mod.more {
    class HuashenOpenMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class HuashenOpenMdr extends MdrBase {
        private _view;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class HuashenStarMdr extends SurfaceStarMdr {
        protected addListeners(): void;
        private onClickItemSkill;
        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void;
        /**点击幻化或出战，子类可重写*/
        protected onClickBattle(): void;
        /**刷新幻化或出战，子类可重写*/
        protected updateBattle(): void;
        /**刷新选中，子类可重写*/
        protected indexUpdateInfo(): void;
        private updateSkill;
    }
}
declare namespace game.mod.more {
    class HuashenTaskMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _surfaceProxy;
        private _taskList;
        private _index;
        private _cfg;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private onClickPlay;
        private onClickOpen;
        private onClickAct;
        private updateModel;
        private updateTaskList;
    }
}
declare namespace game.mod.more {
    class HuashenTianfuMdr extends MdrBase {
        private _view;
        private _proxy;
        private _btnList;
        private _itemList;
        private _selType; /**当前选中的类型*/
        private _selIndex; /**当前选中的下标*/
        private _selCfg; /**当前选中的配置*/
        private _cfgList;
        private _maxNum;
        private _cost;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickUp;
        private onClickIcon;
        private onInfoUpdate;
        private onClickType;
        private initTypeList;
        private updateTypeListHint;
        private typeUpdateInfo;
        private updateItemList;
        private indexUpdateInfo;
        private updateItemSel;
        private updateDesc;
    }
}
declare namespace game.mod.more {
    class HuashenZhiluMdr extends MdrBase {
        private _view;
        private _proxy;
        private _taskList;
        private _rewardList;
        private _itemList;
        private _lineList;
        private _selIndex; /**当前选中的奖励下标，从0开始*/
        private _selItem;
        private _lastIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private onInfoUpdate;
        private initItemList;
        private onClickItem;
        private updateItemList;
        private indexUpdateInfo;
        private setSelIndex;
        private updateItemSel;
        private updateReward;
        private updateTaskList;
    }
}
declare namespace game.mod.more {
    class ZhanshendianMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected addListeners(): void;
        private onInfoUpdate;
    }
}
declare namespace game.mod.more {
    class ZhanshendianMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _surfaceProxy;
        private _taskList;
        private _effIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onTaskUpdate;
        private onInfoUpdate;
        private onClickAct;
        private updateModel;
        private updateTaskList;
    }
}
declare namespace game.mod.more {
    import huanggu_shenqi_info = msg.huanggu_shenqi_info;
    class SkyPalaceModel {
        cfg_index: number;
        infos: {
            [index: number]: huanggu_shenqi_info;
        };
    }
}
declare namespace game.mod.more {
    import huanggu_shenqi_info = msg.huanggu_shenqi_info;
    import HuangguShenqiBuweiConfig = game.config.HuangguShenqiBuweiConfig;
    import huanggu_shenqi_pos_info = msg.huanggu_shenqi_pos_info;
    import attributes = msg.attributes;
    import huanggu_shenqi_skill_info = msg.huanggu_shenqi_skill_info;
    class SkyPalaceProxy extends ProxyBase {
        private _model;
        initialize(): void;
        readonly model: SkyPalaceModel;
        c2s_huanggu_shenqi_oper(oper_type: number, index: number, pos?: number): void;
        private s2c_huanggu_shenqi_info;
        getInfo(index: number): huanggu_shenqi_info;
        getSkillLevel(index: number, skill_id: number): number;
        /**skill_id技能初始id */
        getSkill(index: number, skill_id: number): huanggu_shenqi_skill_info;
        /**获取传入等级的技能解锁条件 */
        getSkillAct(index: number, skill_id: number, level?: number): number;
        getBuwei(index: number, pos: number): huanggu_shenqi_pos_info;
        getBuweiCfg(index: number, level?: number): HuangguShenqiBuweiConfig;
        getBuweiNextCost(index: number, pos: number): number[];
        getBuweiCost(index: number, pos: number): number[];
        getBuweiLevel(index: number, pos: number): number;
        getBuweiAttr(index: number, pos: number): attributes;
        getActStatus(index: number): boolean;
        private onUpdateHint;
        checkBuweiHint(index: number): boolean;
        checkSkillHint(index: number): boolean;
        getListSelect(index?: number): number;
    }
}
declare namespace game.mod.more {
    class ArtifactBuffTipsView extends eui.Component {
        private baseQualityTips;
        skill: SkillItemRender;
        lab_name: eui.Label;
        baseDescItem: BaseDescItem;
        baseDescItem2: BaseDescItem;
        btn: game.mod.Btn;
        lab_limit: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class ArtifactBuweiItem extends BaseRenderer {
        private img_icon;
        private lab_level;
        private lab_act;
        private redPoint;
        private _proxy;
        data: ArtifactBuweiData;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        setData(data: ArtifactBuweiData): void;
    }
}
declare namespace game.mod.more {
    class ArtifactBuweiTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        power: game.mod.Power;
        icon: Icon;
        cost: Icon;
        scroller: eui.Scroller;
        gr_middle: eui.Group;
        baseAttrItem: BaseAttrItem;
        taozhuangItem: BaseDescItem;
        skillItem: BaseDescList2;
        btn_up: game.mod.Btn;
        img_max: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class ArtifactIconBtn extends Btn {
        img_icon: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        redPoint: eui.Image;
        setData(index: number, level: number): void;
        setUp(eft?: string): void;
    }
}
declare namespace game.mod.more {
    class ArtifactTipsItem extends eui.Component {
        private btn_suit;
        private item_1;
        private item_2;
        private item_3;
        private item_4;
        private _proxy;
        constructor();
        private onAddToStage;
        private onRemove;
        setData(index: number): void;
    }
}
declare namespace game.mod.more {
    class ArtifactTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        power: game.mod.Power;
        img_icon: eui.Image;
        scroller: eui.Scroller;
        gr_middle: eui.Group;
        img_status: eui.Image;
        skill_item: BaseDescList2;
        artifact_item: ArtifactTipsItem;
        constructor();
    }
}
declare namespace game.mod.more {
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;
    class ArtifactTypeItem extends BaseRenderer {
        private img_name;
        private img_icon;
        private img_mask;
        private redPoint;
        data: HuangguShenqiConfig;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    /**���� */
    class ArtifactView extends eui.Component {
        btn_onekey: Btn;
        power2: Power2;
        btn_suit: ArtifactIconBtn;
        item_1: ArtifactBuweiItem;
        item_2: ArtifactBuweiItem;
        item_3: ArtifactBuweiItem;
        item_4: ArtifactBuweiItem;
        list_skill: eui.List;
        name_item: AvatarNameSrItem;
        list_item: eui.List;
        img_name: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    import Handler = base.Handler;
    class ArtifactBuffTipsMdr extends MdrBase {
        protected _view: ArtifactBuffTipsView;
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        _showArgs: ArtifactBuffData;
        protected _cost: number[];
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickAct;
        private updateView;
    }
    interface ArtifactBuffData {
        skillId: number;
        isAct: boolean;
        confirm?: Handler;
        condHandler?: Handler;
        index: number;
    }
}
declare namespace game.mod.more {
    class ArtifactBuweiTipsMdr extends EffectMdrBase {
        protected _view: ArtifactBuweiTipsView;
        _showArgs: ArtifactBuweiData;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickBtn(): void;
        protected updateView(): void;
        protected updateTopView(): void;
        private onUpdateAttr;
        protected updateMiddleView(): void;
        protected updateBottomView(): void;
    }
    interface ArtifactBuweiData {
        /**index */
        index: number;
        /**部位 */
        pos: number;
        /** */
        setHint?: boolean;
    }
}
declare namespace game.mod.more {
    class ArtifactMdr extends MdrBase {
        protected _view: ArtifactView;
        private _listData;
        private _listSkill;
        private _proxy;
        private isUp;
        private _lastIndex;
        private readonly len;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onInitType;
        private onUpdateType;
        private onClickTypes;
        private onUpdateView;
        private onUpdateTypeData;
        private onClickBtn;
        private onClickSkill;
        private onClickSuit;
        private onClickItem;
        private onClickDesc;
        private onUpdateHint;
    }
}
declare namespace game.mod.more {
    class ArtifactTipsMdr extends MdrBase {
        protected _view: ArtifactTipsView;
        _showArgs: ArtifactBuweiData;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
        protected updateTopView(): void;
        protected updateMiddleView(): void;
    }
}
declare namespace game.mod.more {
    class SkyPalaceMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class CommonChatRender extends BaseListenerRenderer {
        img_di: eui.Image;
        lab_txt: eui.Label;
        list_reward: eui.List;
        img_draw: eui.Image;
        redPoint: eui.Image;
        head: Head;
        private _rewardList;
        private _proxy;
        private _goddessRecordProxy;
        data: GoddessChatData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class CommonChatSelRender extends BaseListenerRenderer {
        lab_txt: eui.Label;
        btn_sel: game.mod.Btn;
        data: GoddessChatSelData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class EventChatView extends eui.Component {
        head: Head;
        grp_desc: eui.Group;
        lab_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoBossGridView extends eui.Component {
        secondPop: game.mod.SecondPop;
        nameItem: game.mod.AvatarNameItem;
        gr_power: eui.Group;
        btn_zhanbao: game.mod.Btn;
        btn_zhenrong: game.mod.Btn;
        bar: game.mod.ProgressBarComp;
        list_reward: eui.List;
        btn_challenge: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class EventChatMdr extends MdrBase implements UpdateItem {
        private _view;
        private content;
        private contentLen;
        private startContent;
        protected _showArgs: EventChatData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private jumpChat;
        private updateView;
        private resetData;
        update(time: base.Time): void;
        private updateContent;
    }
}
declare namespace game.mod.more {
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    import zhandui_conquer_data = msg.zhandui_conquer_data;
    class MiningModel {
        list: zhandui_kuanzhu_data[];
        total: number;
        conquer_num: number;
        /**每天可征服总次数 */
        team_conquest_num: number;
        team_rescue_num: number;
        dail_buy_num: number;
        /**征服购买总次数 */
        team_buy_num: number;
        team_buy_pay_num: number;
        rescue_num: number;
        logs: zhandui_zhanbao_data[];
        lingbao_cnt: number;
        team_lingbao_cishuxianzhi: number;
        buy_list: number[];
        mdrType: number;
        conquest_list: zhandui_conquer_data[];
        team_lingbao_cost: number[];
        team_kuanmai_item: number;
        refresh_list: boolean;
        exitTeam(): void;
    }
}
declare namespace game.mod.more {
    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    import teammate = msg.teammate;
    import HelotTargetRewardConfig = game.config.HelotTargetRewardConfig;
    import zhandui_oper = msg.zhandui_oper;
    class MiningProxy extends ProxyBase {
        private _model;
        readonly model: MiningModel;
        onExitZhanduiTeam(): void;
        initialize(): void;
        c2s_zhandui_zhanbao_show(): void;
        c2s_zhandui_conquer_show(): void;
        c2s_zhandui_buy_conquer_num(count: number): void;
        c2s_zhandui_helot_operate(type: number, role_id: Long, kuanzhu_id?: Long): void;
        c2s_zhandui_helot_target_show(): void;
        c2s_zhandui_target_buy(index: number): void;
        c2s_zhandui_lingbao(): void;
        /**type2用于矿脉界面领取奖励 */
        c2s_zhandui_kuanzhu_show(type: number): void;
        private s2c_zhandui_zhanbao_show;
        private s2c_zhandui_conquer_show;
        private s2c_zhandui_buy_conquer_num;
        private s2c_zhandui_helot_target_show;
        private s2c_zhandui_update_call_num;
        private s2c_zhandui_kuanzhu_show;
        /**------------------------- 协议end ----------------------------- */
        readonly list: zhandui_kuanzhu_data[];
        readonly conquest_list: msg.zhandui_conquer_data[];
        readonly total: number;
        readonly rescue_num: number;
        readonly conquer_num: number;
        readonly dail_buy_num: number;
        readonly team_conquest_num: number;
        readonly team_rescue_num: number;
        readonly team_buy_num: number;
        readonly team_buy_pay_num: number;
        readonly team_lingbao_cost: number[];
        readonly logs: zhandui_zhanbao_data[];
        readonly my_info: zhandui_kuanzhu_data;
        getSlaveOper(roleId: Long, oper?: number): zhandui_oper | boolean;
        readonly my_slave_list: teammate[];
        /**战队其他队员奴隶 */
        readonly slave_list: teammate[];
        readonly lingbao_cnt: number;
        readonly team_lingbao_cishuxianzhi: number;
        mdrType: number;
        refresh_list: boolean;
        getGiftList(type: number): HelotTargetRewardConfig[];
        getGiftBought(index: number): boolean;
        readonly team_kuanmai_item: number;
        private onUpdateHint;
        getHintByLingbao(): boolean;
    }
}
declare namespace game.mod.more {
    class XujieJitanModel {
        /** 供奉的道具列表（顺序的） */
        prop_list: msg.zhandui_jitan_struct[];
        /** 累计加速时间 */
        total_speed_time: Long;
        /** 战队拥有的能源石（公共的） */
        value: Long;
        /** 已激活幻化的列表 */
        ids: {
            [index: number]: msg.zhandui_jitan_huanhua_struct;
        };
        /** 当前使用的幻化id */
        now_use_id: Long;
        /** 已经领取过的礼包索引列表（前端根据等级和列表判断是否可以领取） */
        index_get_list: number[];
        /** 祭坛等级 */
        jitan_level: number;
        /** 战队拥有的水晶数量（公共的） */
        shuijin_value: Long;
        jitanHintPath: string[];
        lingbaoHintPaths: {
            [type: number]: string[];
        };
        exitTeam(): void;
    }
}
declare namespace game.mod.more {
    import GameNT = base.GameNT;
    import ZhanduiJitanLibaoConfig = game.config.ZhanduiJitanLibaoConfig;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    import ZhanduiJitanHuanhuaConfig = game.config.ZhanduiJitanHuanhuaConfig;
    import zhandui_jitan_huanhua_struct = msg.zhandui_jitan_huanhua_struct;
    import ZhanduiJitanDengjiConfig = game.config.ZhanduiJitanDengjiConfig;
    /**
     * @description 墟界祭坛系统
     */
    class XujieJitanProxy extends ProxyBase {
        private _model;
        initialize(): void;
        onExitZhanduiTeam(): void;
        /**
         * 200 供奉道具和一键放入
         * 201回收道具
         * 202道具加速
         * 203领取道具供奉奖励
         * 204幻化激活升级
         * 205使用幻化
         * 206领取等级礼包
         * 207请求战队祭坛供奉信息
         * @param type
         * @param index 206领取等级礼包
         * @param use_id (204幻化激活升级 205使用幻化传0表示卸下)
         * @param idxs 放入供奉id的列表(200供奉道具和一键放入)
         * @param oper 202战队祭坛供奉加速：1表示单个加速，2表示全部加速   203领取道具供奉奖励1单个领取 2全部领取
         * @param pos 201回收道具的位置  203领取道具的位置
         */
        sendJitanButtonClick(type: ZhanduiOperType, index?: number, use_id?: number, idxs?: number[], oper?: number, pos?: number): void;
        private s2c_zhandui_jitan_base_info;
        private s2c_zhandui_jitan_gongfeng_info;
        /**================================ 协议end ================================*/
        getGainId(): number;
        isGiftReceived(idx: number): boolean;
        getGiftConfig(idx: number): ZhanduiJitanLibaoConfig;
        canReceiveGift(idx: number): boolean;
        readonly jitan_level: number;
        readonly value: number;
        readonly shuijin_value: number;
        readonly prop_list: zhandui_jitan_struct[];
        readonly total_speed_time: number;
        readonly now_use_id: number;
        getHuanhuaCfg(index?: number): ZhanduiJitanHuanhuaConfig;
        isHuanhuaActed(index: number): boolean;
        getHuanhuaInfo(index: number): zhandui_jitan_huanhua_struct;
        isMaxHuanhuaStar(index: number): boolean;
        canActOrUpstar(index: number, isTips?: boolean): boolean;
        isMaxLv(): boolean;
        getMaxLv(): number;
        getLvConfig(lv?: number): ZhanduiJitanDengjiConfig;
        canUpstar(isTips?: boolean): boolean;
        getSpaceCount(): number;
        getSacrificeInfo(): zhandui_jitan_struct;
        getBagDatas(subType?: number): PropData[];
        getTotalPropTime(): number;
        getLibaoHint(): boolean;
        getHuanhuaHint(): boolean;
        getSacrificeHint(): boolean;
        private updateJitanHint;
        private updateLingbaoHint;
        protected onBagUpdateByBagType(n: GameNT): void;
        protected onBagUpdateByPropType(n: base.GameNT): void;
    }
}
declare namespace game.mod.more {
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    class XujieTansuoModel {
        /** 当前参与搜索的战队数量 */
        team_count: number;
        /**区域-层 数据缓存*/
        map_layer_datas_map: {
            [type: number]: {
                [layer: number]: msg.xujietansuo_struct;
            };
        };
        /** 战利品记录 */
        rewards_records: msg.xujietansuo_challenge_records[];
        /** 探索最新进度的区域 */
        now_map_index: number;
        /** 探索最新进度区域的层数 */
        now_layer: number;
        /**正在远征格子的数据*/
        expedition_info: msg.s2c_zhandui_xujietansuo_single_grid;
        /**阵容军团列表*/
        legion_list: {
            [type: number]: msg.zhandui_legion_type_struct;
        };
        /** 军团属性 */
        legion_attrs: msg.zhandui_legion_attribute;
        /** 战队探索排名 */
        tansuo_ranks: msg.zhandui_legion_rank_struct[];
        /** 玩家所属战队数据 */
        my_team_rank: msg.zhandui_legion_rank_struct;
        /** 战斗记录 */
        round_records: msg.zhandui_battle_round_struct[];
        /** 我方信息 */
        myself_info: msg.teammate;
        /** 怪物id    （对手是怪物则有该字段） */
        boss_id: Long;
        /** 敌方玩家信息（对手是玩家则有该字段） */
        target_info: msg.teammate;
        /**回合制结算数据*/
        result_info: msg.s2c_zhandui_legion_result_info;
        hintPath1: string[];
        hintPath2: string[];
        layerHintPath: string[];
        exitTeam(): void;
        msg: s2c_zhandui_kuanmai_pvp_ret;
        seledArea: number;
    }
}
declare namespace game.mod.more {
    import ZhanduiTansuoMapConfig = game.config.ZhanduiTansuoMapConfig;
    import GameNT = base.GameNT;
    import xujietansuo_challenge_records = msg.xujietansuo_challenge_records;
    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import xujietansuo_row_grid_struct = msg.xujietansuo_row_grid_struct;
    import zhandui_legion_type_struct = msg.zhandui_legion_type_struct;
    import zhandui_legion_attribute = msg.zhandui_legion_attribute;
    import s2c_zhandui_legion_result_info = msg.s2c_zhandui_legion_result_info;
    import zhandui_battle_round_struct = msg.zhandui_battle_round_struct;
    import xujietansuo_struct = msg.xujietansuo_struct;
    import s2c_zhandui_xujietansuo_single_grid = msg.s2c_zhandui_xujietansuo_single_grid;
    import zhandui_legion_rank_struct = msg.zhandui_legion_rank_struct;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    /**
     * @description 墟界探索系统
     */
    class XujieTansuoProxy extends ProxyBase implements IXujieTansuoProxy {
        private _model;
        initialize(): void;
        onExitZhanduiTeam(): void;
        c2s_zhandui_xujietansuo_quyu_info(type: number, layer: number): void;
        private s2c_zhandui_xujietansuo_base_info;
        private s2c_zhandui_xujietansuo_records_info;
        /**
         * 玩家操作墟界探索
         * @param button_type 1为领取战利品  2商店格子购买  3上阵神灵 4领取远征奖励 5挑战怪物 6扫荡怪物 7请求排行榜
         * @param type
         * @param layer
         * @param row
         * @param pos
         * @param shenlingList
         * @param cnt 扫荡次数
         * @private
         */
        c2s_zhandui_xujietansuo_role_click(button_type: XujieTansuoOperType, type?: number, layer?: number, row?: number, pos?: number, shenlingList?: Long[], cnt?: number): void;
        private s2c_zhandui_legion_rank_list;
        private s2c_zhandui_xujietansuo_single_grid;
        /**================================== 协议end ==================================*/
        getMapLayerData(type: number, layer: number): xujietansuo_struct;
        readonly team_count: number;
        readonly rewards_records: xujietansuo_challenge_records[];
        readonly now_type: number;
        readonly now_layer: number;
        readonly my_team_rank: zhandui_legion_rank_struct;
        readonly expedition_info: s2c_zhandui_xujietansuo_single_grid;
        getRankInfo(rankNo: number): zhandui_legion_rank_struct;
        private _typeList;
        getTypeList(): number[];
        getTypeCfg(type: number): ZhanduiTansuoTypeConfig;
        getCfgByRow(type: number, layer: number, row: number): ZhanduiTansuoMapConfig;
        private _gridColMap;
        getGridByCol(type: number, layer: number, row: number, col: number): number[];
        isActedByRow(type: number, layer: number, row: number): boolean;
        isActedByLayer(type: number, layer: number, isTips?: boolean): boolean;
        isActedByType(type: number, isTips?: boolean): boolean;
        canGotoMaxLayer(type: number): boolean;
        getProgressRowMap: {
            [index: number]: boolean;
        };
        /**
         * 排能否获取当前进度（击杀一个怪物即可）
         * @param type
         * @param layer
         * @param row
         */
        private canGetProgressByRow;
        /**
         * 某区域进度
         * 外部“区域总进度”显示：非boss排每排x%，第12排进度y%，x和y读配置，配在参数表内
         * @param type
         */
        getProgressByType(type: number): number;
        /**
         * 获取某区域某层进度
         * 每一排仅一个战斗格计算进度，只要本排战胜1个怪物即可获得本排进度，未完全击杀怪物不获得进度。
         * 如本排4个怪物，挑战1个并击杀后获得8%的层进度，击杀本排第二个后依然为8%
         * 每层内部的“排进度”显示：非boss排每排进度8%，第12排进度12%，11排+boss合计共100%
         * @param type
         * @param layer
         */
        getProgressByLayer(type: number, layer: number): number;
        getRankProgressByRow(type: number, layer: number, row: number): number;
        getRowInfo(type: number, layer: number, row: number): xujietansuo_row_grid_struct[];
        getGridInfo(type: number, layer: number, row: number, col: number): xujietansuo_row_grid_struct;
        getExpeditionGridInfo(): xujietansuo_row_grid_struct;
        getExpeditionGridInfoByLayer(type: number, layer: number): xujietansuo_row_grid_struct;
        getExpeditionGridItemData(): IXujieTansuoGridItemData;
        getExpeditionGridEndTimeByLayer(type: number, layer: number): number;
        private _maxLayerMap;
        getMaxLayerByType(type: number): number;
        canGetZhanlipin(isTips?: boolean): boolean;
        /**============================= hint start =============================*/
        getZhanlipinHint(): boolean;
        getExpeditionHint(): boolean;
        canTansuo(): boolean;
        getTansuoHint(): boolean;
        private _gameOrderHint;
        protected onUpdateGivingList(n: GameNT): void;
        private updateGameOrderHint;
        private updateHint;
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onSurfaceInfoUpdate(n: GameNT): void;
        protected onShenlingInfoUpdate(n: GameNT): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        /**============================= hint end =============================*/
        /**============================= 阵容 =============================*/
        sendShangzhenOnekey(): void;
        sendShangzhen(type: LegionType, operType: number, list?: number[]): void;
        private c2s_zhandui_legion_shangzheng;
        private s2c_zhandui_legion_shangzheng_list;
        getShangzhenInfo(type: LegionType): zhandui_legion_type_struct;
        getShangzhenIdList(type: LegionType): number[];
        readonly legion_attr: zhandui_legion_attribute;
        readonly shenling_list: Long[];
        isHuashenOpen(isTips?: boolean): boolean;
        isNvshenOpen(isTips?: boolean): boolean;
        getZhenrongHint(): boolean;
        getShenlingLimitQuality(): number;
        getZhenrongShenlingHint(): boolean;
        getShenlingList(type: ShenLingType): number[];
        getZhenrongHuashenHint(): boolean;
        getZhenrongHuashenList(): number[];
        /**============================= 阵容end =============================*/
        /**============================= 回合制 =============================*/
        private s2c_zhandui_legion_battle_info;
        private s2c_zhandui_legion_result_info;
        round_records: zhandui_battle_round_struct[];
        result_info: s2c_zhandui_legion_result_info;
        readonly myself_id: Long;
        readonly myself_info: msg.teammate;
        isMyself(id: Long): boolean;
        readonly target_id: Long;
        readonly target_info: msg.teammate;
        readonly is_legion_speed_equal: boolean;
        readonly is_legion_speed_greater: boolean;
        /**============================= 回合制end =============================*/
        private s2c_zhandui_kuanmai_pvp_ret;
        msg: s2c_zhandui_kuanmai_pvp_ret;
        seledArea: number;
    }
}
declare namespace game.mod.more {
    class ZhanduiModel {
        /** 战队id */
        team_id: Long;
        /** 战队名称 */
        team_name: string;
        /** 战队等级 */
        team_level: number;
        /** 战队成员（顺序1234，第一个为队长，其余成员依照加入时间顺延） */
        team_roles: msg.teammate[];
        /** 玩家申请列表 */
        role_apply_list: msg.teammate[];
        /** 战队每日奖励 当天是否可以领取  1可领取   2已领取 */
        today_is_get: number;
        /** 已创建的战队数量 */
        total_team_count: number;
        /** 进入要求的最低战力（0为不限制） */
        limit_showpower: number;
        /** 是否需要审核 true为需要   false为不需要 */
        is_check_apply: boolean;
        /** 是否需要限制战力 true为需要   false为不需要 */
        is_check_power: boolean;
        /** 已购买的旗帜 */
        flag_list: number[];
        /**当前使用的旗帜*/
        flag_index: number;
        /**累计活跃度*/
        team_point: number;
        /** 加入战队的时间 */
        join_time: Long;
        /** 仙纪功绩 */
        strs1: string[];
        /** 仙纪事件 */
        strs2: string[];
        /** 可以申请的战队列表 */
        can_apply_list: msg.zhandui_can_apply_struct[];
        exitTeam(): void;
        applyHintPath: string[];
        rewardHintPath: string[];
    }
}
declare namespace game.mod.more {
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    import zhandui_can_apply_struct = msg.zhandui_can_apply_struct;
    import teammate = msg.teammate;
    import ZhanduiDengjiConfig = game.config.ZhanduiDengjiConfig;
    /**
     * @description 战队系统
     */
    class ZhanduiProxy extends ProxyBase implements IZhanduiProxy {
        private _model;
        initialize(): void;
        /**
         * 1为创建战队
         * @param flagIndex
         * @param teamName
         */
        sendButtonClickCreate(flagIndex: number, teamName: string): void;
        /**
         * 2为购买战队旗帜
         * 8战队使用旗帜（仅队长）
         * @param type
         * @param flagIndex 旗帜
         */
        sendButtonClickQizhi(type: ZhanduiOperType, flagIndex: number): void;
        /**
         * 4申请加入
         * @param teamId
         */
        sendButtonClickTeamId(teamId: Long): void;
        /**
         * 6搜索战队
         * 7战队改名（仅队长）
         * @param type
         * @param teamName
         */
        sendButtonClickTeamname(type: ZhanduiOperType, teamName: string): void;
        /**
         * 12转移队长（仅队长）
         * 13踢出战队（仅队长）
         * @param type
         * @param roleId
         */
        sendButtonClickRoleId(type: ZhanduiOperType, roleId: Long): void;
        /**
         * 10操作申请人员（仅队长）
         * @param roleId
         * @param isPass 0为拒绝申请  1为同意申请
         */
        sendButtonClickIspass(roleId: Long, isPass: number): void;
        /**
         * 3请求战队列表，默认最多10个战队数据（用于查看可以加入哪些战队）
         * 5刷新战队列表
         * 9请求申请列表（仅队长）
         * 11发送招募聊天
         * 14玩家自己退出战队
         * 16设置申请审核（仅队长)
         * 17请求仙纪功绩
         * 18请求仙纪事件
         * 100 请求战队数据
         * @param type
         */
        sendButtonClick(type: ZhanduiOperType): void;
        /**
         * 15设置进入战力条件（仅队长）
         * @param power
         */
        sendButtonClickPower(power?: number): void;
        /**
         * 战队操作 请使用上面的 sendButtonClick函数，不要外部调用这个
         * button_type字段备注
         *      1为创建战队
         *      2为购买战队旗帜
         *      3请求战队列表，默认最多10个战队数据（用于查看可以加入哪些战队）
         *      4申请加入
         *      5刷新战队列表
         *      6搜索战队
         *      7战队改名（仅队长）
         *      8战队使用旗帜（仅队长）
         *      9请求申请列表（仅队长）
         *      10操作申请人员（仅队长）
         *      11发送招募聊天
         *      12转移队长（仅队长）
         *      13踢出战队（仅队长）
         *      14玩家自己退出战队
         *      15设置进入要求的最低战力
         *      16设置申请审核（仅队长)
         *      17请求仙纪功绩
         *      18请求仙纪事件
         *      100 请求战队数据
         * @param type
         * @param index 旗帜索引（1创建战队、2购买战队、8旗帜使用旗帜需要)
         * @param teamId 战队id（4申请加入战队需要）
         * @param teamName 战队名称（6搜索战队  7战队改名需要)
         * @param roleId 10操作申请人员、12转移队长、13踢出战队 需要
         * @param isPass 0为拒绝申请  1为同意申请 10
         * @param setPower 15设置进入要求的最低战力
         * @private
         */
        private c2s_zhandui_button_click;
        c2s_zhandui_get_day_rewards(): void;
        private s2c_zhandui_base_info;
        private s2c_zhandui_apply_list;
        private s2c_zhandui_team_role_apply_list;
        private s2c_zhandui_get_thing_records;
        private doExitTeam;
        /**================================= 协议end =================================*/
        getQizhiCfgList(): ZhanduiQizhiConfig[];
        getLevelCfg(lv: number): ZhanduiDengjiConfig;
        readonly total_team_count: number;
        readonly can_apply_list: zhandui_can_apply_struct[];
        readonly team_name: string;
        readonly team_level: number;
        readonly team_roles: teammate[];
        readonly role_apply_list: teammate[];
        limit_showpower: number;
        is_check_apply: boolean;
        is_check_power: boolean;
        readonly flag_index: number;
        readonly flag_list: number[];
        readonly team_point: number;
        readonly join_time: number;
        isCaption(): boolean;
        isMyself(mate: teammate): boolean;
        haveTeam(): boolean;
        readonly team_id: Long;
        getRenameCost(): number[];
        getCreateCost(): number[];
        isGotReward(): boolean;
        canGetReward(): boolean;
        getStrs(type?: number): string[];
        getApplyHint(): boolean;
        isMaxLv(): boolean;
        getRewardHint(): boolean;
        private updateHint;
    }
}
declare namespace game.mod.more {
    class MiningBuyCntView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lb_cnt: eui.Label;
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
declare namespace game.mod.more {
    import zhandui_conquer_data = msg.zhandui_conquer_data;
    class MiningFightItem extends BaseRenderer {
        private headVip;
        private lab_name;
        private power;
        private btn_fight;
        private lab_rate;
        private lab_master;
        private _proxy;
        data: zhandui_conquer_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClickFight;
    }
}
declare namespace game.mod.more {
    class MiningFightListView extends eui.Component {
        btn: Btn;
        btn_add: Btn;
        list: eui.List;
        lab_count: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import HelotTargetRewardConfig = game.config.HelotTargetRewardConfig;
    class MiningGiftItem extends BaseGiftItemRender {
        data: HelotTargetRewardConfig;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
}
declare namespace game.mod.more {
    class MiningGiftView extends eui.Component {
        img_bg: eui.Image;
        list: eui.List;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    class MiningItem extends BaseRenderer {
        private head_master;
        private lab_slavetime;
        private grp_all;
        private grp_self;
        private head_self;
        private lab_self;
        private power_label;
        private grp_tips;
        private lab_tips;
        private slaveItem1;
        private slaveItem2;
        private lab_time1;
        private lab_time2;
        data: zhandui_kuanzhu_data;
        private is_self;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private setMaster;
        private onFight;
        private onUpdateTime;
        onUpdateTimes(): void;
    }
}
declare namespace game.mod.more {
    class MiningLingbaoView extends eui.Component {
        list: eui.List;
        btn: Btn;
        costItem: CostIcon;
        lab_count: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class MiningMasterView extends eui.Component {
        list: eui.List;
        btn_tips: Btn;
        btn_zhenrong: Btn;
        btn_explain: Btn;
        img_icon: eui.Image;
        lab_count: eui.Label;
        lab_fight: eui.Label;
        lab_help: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class MiningModalItem extends Btn {
        private lab_name;
        private timeItem;
        private img_add;
        private img_head;
        private grp_info;
        setModal(info: teammate): void;
        setCurrentState(state?: string): void;
    }
}
declare namespace game.mod.more {
    class AchieveTaskRender extends TaskRenderIcon {
        protected onClickDraw(): void;
    }
}
declare namespace game.mod.more {
    class MiningResultWinView extends eui.Component {
        closeTips: game.mod.CloseTips;
        icon_group: eui.Group;
        img_title: eui.Image;
        lab_tips1: eui.Label;
        lab_tips2: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class MiningSaveView extends eui.Component {
        head1: HeadVip;
        head2: HeadVip;
        power1: TeamGodPower;
        power2: TeamGodPower;
        lab_name1: eui.Label;
        lab_name2: eui.Label;
        lab_count: eui.Label;
        btn: Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class MiningSlaveEftItem extends BaseRenderer {
        private btn_modal;
        private btn_ot;
        private btn_check;
        private btn_free;
        private btn_out;
        private btn_goon;
        data: teammate;
        private _proxy;
        private _show;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private setHint;
        setData(data: teammate, dir?: number): void;
        private onClickModal;
        private onClickOt;
        private onClickCheck;
        private onClickFree;
        private onClickOut;
        private onClickGoOn;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class MiningSlaveItem extends BaseRenderer {
        private head_slave;
        private lab_slave;
        private grp_count;
        private img_icon;
        private lab_count;
        private btn_add;
        private img_lock;
        private redPoint;
        data: teammate;
        private is_self;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: teammate, self?: boolean): void;
        private onFight;
        setHint(bool: boolean): void;
    }
}
declare namespace game.mod.more {
    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    class MiningTipsItem extends BaseRenderer {
        private lab;
        data: zhandui_zhanbao_data;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class MiningTipsView extends eui.Component {
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class MiningView extends eui.Component {
        icon: eui.Image;
        lab_count: eui.Label;
        img_icon: eui.Image;
        lab_have: eui.Label;
        modalItem1: MiningSlaveEftItem;
        modalItem2: MiningSlaveEftItem;
        modal1: MiningModalItem;
        modal2: MiningModalItem;
        modal3: MiningModalItem;
        modal4: MiningModalItem;
        modal5: MiningModalItem;
        modal6: MiningModalItem;
        btn_lingbao: Btn;
        btn_gift: Btn;
        btn_sale: GiftBtn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieJitanHuanhuaItem extends BaseRenderer {
        img_icon: eui.Image;
        gr_time: eui.Group;
        lb_time: eui.Label;
        lb_name: eui.Label;
        img_gray: eui.Image;
        gr_star: eui.Group;
        list_star: eui.List;
        gr_eft: eui.Group;
        redPoint: eui.Image;
        avatarItem: game.mod.AvatarItem;
        data: AvatarItemData;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        updateTime(endTime?: number): void;
    }
}
declare namespace game.mod.more {
    class XujieJitanHuanhuaView extends eui.Component {
        gr_eft: eui.Group;
        btn_upstar: game.mod.UpStarBtn;
        btn_huanhua: game.mod.Btn;
        lb_desc: eui.Label;
        img_name: eui.Image;
        nameItem: game.mod.AvatarNameItem;
        starListView: StarListView;
        scroller: eui.Scroller;
        list: eui.List;
        lb_buff: eui.Label;
        coin: game.mod.CoinItem;
        constructor();
    }
}
declare namespace game.mod.more {
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    class XujieJitanIconItem extends BaseListenerRenderer {
        grp_tips: eui.Group;
        grp_name: eui.Group;
        lab_name: eui.Label;
        redPoint: eui.Image;
        img_icon: eui.Image;
        data: IXujieJitanIconItemData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IXujieJitanIconItemData {
        info: zhandui_jitan_struct;
        showHint: boolean;
        status: number;
        idx: number;
    }
}
declare namespace game.mod.more {
    class XujieJitanIconItemComp extends BaseStageEventItem {
        item0: game.mod.more.XujieJitanIconItem;
        item1: game.mod.more.XujieJitanIconItem;
        item2: game.mod.more.XujieJitanIconItem;
        item3: game.mod.more.XujieJitanIconItem;
        item4: game.mod.more.XujieJitanIconItem;
        item5: game.mod.more.XujieJitanIconItem;
        item6: game.mod.more.XujieJitanIconItem;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        updateShow(): void;
        private getIconHint;
        private getStatus;
    }
}
declare namespace game.mod.more {
    class XujieJitanLingbaoView extends eui.Component {
        list_item: eui.List;
        img_type: eui.Image;
        bar: game.mod.ProgressBarComp;
        btn_up: game.mod.Btn;
        list_suit: eui.List;
        img_goto: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieJitanSeacomItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        img_flag: eui.Image;
        data: {
            isActed: boolean;
            txt: string;
        };
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieJitanSeasonComp extends BaseStageEventItem {
        list: eui.List;
        private _proxy;
        private _listData;
        constructor();
        protected onAddToStage(): void;
        updateShow(): void;
        private getBuffCfg;
        private getPrivilegeCfg;
    }
}
declare namespace game.mod.more {
    class XujieJitanShelfItem extends BaseRenderer {
        icon: game.mod.Icon;
        lab_name: eui.Label;
        lab_score: eui.Label;
        grp_time: eui.Group;
        data: PropData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class XujieJitanShelfView extends eui.Component {
        secondPop: game.mod.SecondPop;
        img_bg: eui.Image;
        btn: game.mod.Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieJitanSpeedUpView extends eui.Component {
        secondPop: game.mod.SecondPop;
        grp_tips: eui.Group;
        lab_name: eui.Label;
        lab_time: eui.Label;
        btn_speedup: game.mod.Btn;
        icon: game.mod.Icon;
        grp_all: eui.Group;
        lab_alltime: eui.Label;
        btn_allspeedup: game.mod.Btn;
        lab_havetime: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieJitanView extends eui.Component {
        btn_rule: game.mod.Btn;
        btn_gift: game.mod.Btn;
        btn_upstar: game.mod.UpStarBtn;
        gr_eft: eui.Group;
        btn_huanhua: game.mod.Btn;
        itemComp: game.mod.more.XujieJitanIconItemComp;
        seasonComp: game.mod.more.XujieJitanSeasonComp;
        sacrificeItem: game.mod.more.XujiejitanSacrificeItem;
        nameItem: game.mod.AvatarNameItem;
        gr_lv: eui.Group;
        gr_cost: eui.Group;
        coin: game.mod.CoinItem;
        img_max: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujiejitanSacrificeItem extends BaseStageEventItem {
        grp_tips: eui.Group;
        lab_name: eui.Label;
        lab_time: eui.Label;
        btn_speedup: game.mod.Btn;
        private _proxy;
        private _endTime;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        updateShow(): void;
        updateTime(): void;
    }
}
declare namespace game.mod.more {
    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    class XujieTansuoAreaItem extends BaseRenderer {
        img_bg: eui.Image;
        lb_name: eui.Label;
        gr_num: eui.Group;
        img_gray: eui.Image;
        data: IXujieTansuoAreaItemData;
        constructor();
        protected dataChanged(): void;
    }
    interface IXujieTansuoAreaItemData {
        cfg: ZhanduiTansuoTypeConfig;
        progress: number;
        isActed: boolean;
    }
}
declare namespace game.mod.more {
    class XujieTansuoBusinessGridView extends eui.Component {
        list: eui.List;
        icon: game.mod.Icon;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoExpeditionGridView extends eui.Component {
        checkBox: eui.CheckBox;
        list_reward: eui.List;
        list_avatar: eui.List;
        btn_do: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoExpeditionShenLingView extends eui.Component {
        secondPop: game.mod.SecondPop;
        item0: game.mod.AvatarIconLongPress;
        item1: game.mod.AvatarIconLongPress;
        item2: game.mod.AvatarIconLongPress;
        item3: game.mod.AvatarIconLongPress;
        item4: game.mod.AvatarIconLongPress;
        item5: game.mod.AvatarIconLongPress;
        item6: game.mod.AvatarIconLongPress;
        item7: game.mod.AvatarIconLongPress;
        scroller: eui.Scroller;
        list: eui.List;
        list_menu: eui.List;
        btn_oneKey: game.mod.Btn;
        btn_sure: game.mod.Btn;
        checkBox: eui.CheckBox;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoGridItem extends BaseRenderer {
        img_gray: eui.Image;
        img_light: eui.Image;
        img_bg: eui.Image;
        head: game.mod.Head;
        img_yuanzhengzhong: eui.Image;
        timeItem: game.mod.TimeItem;
        gr_eft: eui.Group;
        rect: eui.Rect;
        data: IXujieTansuoGridItemData;
        private _proxy;
        private _isActed;
        private _transferUrl;
        private _imgBg;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        private defaultView;
        private nullView;
        private monsterView;
        private rewardView;
        private businessView;
        private expeditionView;
        private transferView;
        updateTime(): void;
    }
    interface IXujieTansuoGridItemData {
        type: number;
        layer: number;
        row: number;
        col: number;
        status: XujieTansuoGridStatus;
        grid: number[];
        isActed?: boolean;
    }
}
declare namespace game.mod.more {
    class XujieTansuoGridView extends BaseStageEventItem {
        /**
         * 从上到下
         * 前两行分别是1+2结构
         *      命名规则：12_1
         *              11_1, 11_2
         * 后面10行，分布是3+4结构
         *      命名规则：10_1, 10_2, 10_3
         *              9_1, 9_2, 9_3, 9_4
         *              ......
         */
        item12_1: game.mod.more.XujieTansuoGridItem;
        private _proxy;
        private _expeditionItemList;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 更新层的格子内容
         * @param type
         * @param layer
         */
        updateView(type: number, layer: number): void;
        private getGrids;
        private getStatus;
        updateTime(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoLayerItem extends BaseListenerRenderer {
        lb_layer: eui.Label;
        data: number;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoLayerView extends eui.Component {
        scroller: eui.Scroller;
        gridView: game.mod.more.XujieTansuoGridView;
        costIcon: game.mod.CostIcon;
        lb_desc: eui.Label;
        gr_layerfont: eui.Group;
        btn_showlayer: game.mod.Btn;
        gr_layer: eui.Group;
        list_layer: eui.List;
        btn_zhanlipin: game.mod.Btn;
        btn_zhenrong: game.mod.Btn;
        btn_yuanzheng: game.mod.Btn;
        timeItem: game.mod.TimeItem;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoMapItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        img_gray: eui.Image;
        img_sel: eui.Image;
        img_name: eui.Image;
        bossItem: game.mod.more.XujieTansuoMapItemBoss;
        teamItem: game.mod.more.XujieTansuoMapItemTeam;
        data: IXujieTansuoMapItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IXujieTansuoMapItemData {
        type: number;
        isSel: boolean;
        isAct: boolean;
    }
}
declare namespace game.mod.more {
    class XujieTansuoMapItemBoss extends BaseListenerRenderer {
        img_boss: eui.Image;
        data: number;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoMapItemTeam extends BaseListenerRenderer {
        img_flag: eui.Image;
        lb_name: eui.Label;
        data: msg.zhandui_legion_rank_struct;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoMapView extends eui.Component {
        map1: game.mod.more.XujieTansuoMapItem;
        map2: game.mod.more.XujieTansuoMapItem;
        map3: game.mod.more.XujieTansuoMapItem;
        map4: game.mod.more.XujieTansuoMapItem;
        map5: game.mod.more.XujieTansuoMapItem;
        map6: game.mod.more.XujieTansuoMapItem;
        map7: game.mod.more.XujieTansuoMapItem;
        map8: game.mod.more.XujieTansuoMapItem;
        constructor();
        /**
         *
         * @param selType 选中的区域
         * @param curType 当前正在探索的区域
         */
        updateView(selType: number, curType: number): void;
    }
}
declare namespace game.mod.more {
    import zhandui_legion_rank_struct = msg.zhandui_legion_rank_struct;
    class XujieTansuoRankItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        img_flag: eui.Image;
        lab_name: eui.Label;
        lab_num: eui.Label;
        data: IXujieTansuoRankItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IXujieTansuoRankItemData {
        rank: number[];
        info: zhandui_legion_rank_struct;
        progress: number;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankItem2 extends BaseListenerRenderer {
        img_flag: eui.Image;
        lb_name: eui.Label;
        lb_rankno: eui.Label;
        data: {
            rankNo: number;
            rankInfo: msg.zhandui_legion_rank_struct;
        };
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankSectionItem extends BaseListenerRenderer {
        img_rank: eui.Image;
        lab_rank: eui.Label;
        img_flag: eui.Image;
        lab_name: eui.Label;
        lab_num: eui.Label;
        data: IXujieTansuoRankItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankView extends eui.Component {
        img_type1: eui.Image;
        img_type2: eui.Image;
        lab_rank: eui.Label;
        lab_num: eui.Label;
        list_rank: eui.List;
        rankItem0: game.mod.more.XujieTansuoRankItem2;
        rankItem2: game.mod.more.XujieTansuoRankItem2;
        rankItem1: game.mod.more.XujieTansuoRankItem2;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoRewardGridView extends eui.Component {
        list: eui.List;
        lb_cond: eui.Label;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoSaodangView extends eui.Component {
        secondPop: game.mod.SecondPop;
        img_icon: eui.Image;
        lb_name: eui.Label;
        bar: game.mod.ProgressBarComp;
        lb_record: eui.Label;
        list: eui.List;
        lb_hurt: eui.Label;
        btnListView: game.mod.BuyBtnListView;
        btn_saodang: game.mod.Btn;
        btn_challenge: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoView extends eui.Component {
        mapView: game.mod.more.XujieTansuoMapView;
        list_reward: eui.List;
        btn_tansuo: game.mod.Btn;
        scroller: eui.Scroller;
        list_area: eui.List;
        btn_rule: game.mod.Btn;
        btn_rank: game.mod.Btn;
        btn_zhanlipin: game.mod.Btn;
        btn_zhenrong: game.mod.Btn;
        btn_yuanzheng: game.mod.Btn;
        gr_team: eui.Group;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    import xujietansuo_challenge_records = msg.xujietansuo_challenge_records;
    class XujieTansuoZhanbaoItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        headVip: game.mod.HeadVip;
        lb_time: eui.Label;
        data: xujietansuo_challenge_records;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoZhanbaoView extends eui.Component {
        secondPop: game.mod.SecondPop;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoZhanlipinItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list: eui.List;
        private _listData;
        data: msg.xujietansuo_challenge_records;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoZhanlipinView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn_do: game.mod.Btn;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class TBSFightView extends eui.Component {
        grp1: eui.Group;
        lab_name1: eui.Label;
        img_hp1: eui.Image;
        head1: game.mod.HeadVip;
        grp_power1: eui.Group;
        grp2: eui.Group;
        lab_name2: eui.Label;
        img_hp2: eui.Image;
        head2: game.mod.HeadVip;
        img_boss2: eui.Image;
        grp_power2: eui.Group;
        grp3: eui.Group;
        img_vs: eui.Image;
        gr_eft2: eui.Group;
        gr_eft: eui.Group;
        btn_skip: game.mod.Btn;
        gr_model0: eui.Group;
        gr_model1: eui.Group;
        grp_tips: eui.Group;
        grp_lv: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoSceneResultFailView extends eui.Component {
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoSceneResultKillView extends eui.Component {
        lb_desc: eui.Label;
        lb_damage: eui.Label;
        resultReward0: game.mod.ResultReward;
        resultReward1: game.mod.ResultReward;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    class XujieTansuoSceneResultView extends eui.Component {
        resultReward: game.mod.ResultReward;
        lb_desc: eui.Label;
        lb_damage: eui.Label;
        lb_hp: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongAttrView extends eui.Component {
        secondPop: game.mod.SecondPop;
        name0: game.mod.AttrNameItem;
        power: game.mod.XianLiPower;
        listAttr0: game.mod.AttrListView;
        name1: game.mod.AttrNameItem;
        scroller: eui.Scroller;
        listAttr1: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongHuashenView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        btn_oneKey: game.mod.Btn;
        list_model: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongItem extends BaseRenderer {
        img_add: eui.Image;
        gr_eft: eui.Group;
        private _effId;
        data: number;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class ZhenrongShenlingView extends eui.Component {
        item0: game.mod.AvatarIconLongPress;
        item1: game.mod.AvatarIconLongPress;
        item2: game.mod.AvatarIconLongPress;
        item3: game.mod.AvatarIconLongPress;
        item4: game.mod.AvatarIconLongPress;
        item5: game.mod.AvatarIconLongPress;
        item6: game.mod.AvatarIconLongPress;
        item7: game.mod.AvatarIconLongPress;
        item8: game.mod.AvatarIconLongPress;
        item9: game.mod.AvatarIconLongPress;
        item10: game.mod.AvatarIconLongPress;
        item11: game.mod.AvatarIconLongPress;
        scroller: eui.Scroller;
        list: eui.List;
        list_menu: eui.List;
        btn_oneKey: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongView extends eui.Component {
        secondPop: game.mod.SecondPop;
        godPower: game.mod.TeamGodPower;
        btn_desc: game.mod.Btn;
        list_attr: eui.List;
        list_btn: eui.List;
        btn_onekey: game.mod.Btn;
        list_shenling: eui.List;
        list_huashen: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiBuildView extends eui.Component {
        btn_create: game.mod.Btn;
        btn_join: game.mod.Btn;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiConstructBtn extends BaseRenderer {
        iconDisplay: eui.Image;
        labelDisplay: eui.Label;
        redPoint: eui.Image;
        gr_font: eui.Group;
        data: IZhanduiConstructBtnData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IZhanduiConstructBtnData {
        gainId?: number;
        bonus?: number;
        flag?: number;
    }
}
declare namespace game.mod.more {
    import ZhanduiDengjiConfig = game.config.ZhanduiDengjiConfig;
    class ZhanduiConstructItem extends BaseListenerRenderer {
        list: eui.List;
        vBar: game.mod.VProgressBar;
        lb_val: eui.Label;
        data: IZhanduiConstructItemData;
        private _listData;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IZhanduiConstructItemData {
        cfg: ZhanduiDengjiConfig;
        vBarData: VProgressData;
    }
}
declare namespace game.mod.more {
    class ZhanduiConstructView extends eui.Component {
        img_flag: eui.Image;
        lb_lv: eui.Label;
        bar: game.mod.ProgressBarComp;
        btn_go: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        list_reward: eui.List;
        btn_get: game.mod.Btn;
        img_got: eui.Image;
        img_got1: eui.Image;
        lb_desc: eui.Label;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiCreateView extends eui.Component {
        list: eui.List;
        lb_input: eui.EditableText;
        costIcon: game.mod.CostIcon;
        btn_create: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.more {
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    class ZhanduiFlagItem extends IconSel {
        img_sel: eui.Image;
        redPoint: eui.Image;
        img_tag: eui.Image;
        img_gray: eui.Image;
        lb_cond: eui.Label;
        img_flag: eui.Image;
        data: IZhanduiFlagItemData;
        protected dataChanged(): void;
    }
    interface IZhanduiFlagItemData {
        type: number;
        cfg: ZhanduiQizhiConfig;
    }
}
declare namespace game.mod.more {
    class ZhanduiFlagView extends eui.Component {
        lb_name: eui.Label;
        img_flag: eui.Image;
        img_di: eui.Image;
        lb_desc: eui.Label;
        scroller: eui.Scroller;
        list: eui.List;
        btn_use: game.mod.Btn;
        lb_actCond: eui.Label;
        img_used: eui.Image;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiInviteItem extends BaseListenerRenderer {
        private lab_name;
        private lab_power;
        private head;
        btn_agree: Btn;
        btn_refuse: Btn;
        data: msg.teammate;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClickAgree;
        private onClickRefuse;
    }
}
declare namespace game.mod.more {
    class ZhanduiInviteListView extends eui.Component {
        secondPop: game.mod.SecondPop;
        scroller: eui.Scroller;
        list: eui.List;
        checkbox1: eui.CheckBox;
        checkbox2: eui.CheckBox;
        lb_noteam: eui.Label;
        gr_power: eui.Group;
        editable_value: eui.EditableText;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiItem extends BaseRenderer {
        redPoint: eui.Image;
        img_bg: eui.Image;
        gr_eft: eui.Group;
        img_name: eui.Image;
        lb_lv: eui.Label;
        data: {
            type: number;
            showHint: boolean;
        };
        private _jitanProxy;
        private _jitanEft;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        setData(type: XujieType, showHint?: boolean): void;
    }
}
declare namespace game.mod.more {
    import zhandui_can_apply_struct = msg.zhandui_can_apply_struct;
    class ZhanduiJoinItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        lb_captain: eui.Label;
        lb_num: eui.Label;
        powerLabel: game.mod.PowerLabel;
        btn_do: game.mod.Btn;
        lb_limit: eui.Label;
        img_flag: eui.Image;
        data: zhandui_can_apply_struct;
        private _proxy;
        private _teamCnt;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.more {
    class ZhanduiJoinView extends eui.Component {
        lb_input: eui.EditableText;
        btn_search: game.mod.Btn;
        btn_refresh: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiRenameView extends eui.Component {
        secondPop: game.mod.SecondPop;
        btn_do: game.mod.Btn;
        lb_input: eui.EditableText;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiTeammateCheckView extends eui.Component {
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    class ZhanduiTeammateItem extends BaseListenerRenderer {
        headVip: game.mod.HeadVip;
        group_head: eui.Group;
        img_captain: eui.Image;
        img_add: eui.Image;
        img_online: eui.Image;
        lb_name: eui.Label;
        private _proxy;
        data: teammate;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private defaultView;
        private onClick;
        private onClickAdd;
    }
}
declare namespace game.mod.more {
    class ZhanduiView extends eui.Component {
        btn_rule: game.mod.Btn;
        btn_jixing: game.mod.Btn;
        lb_name: eui.Label;
        btn_rename: game.mod.Btn;
        btn_apply: game.mod.Btn;
        btn_channel: game.mod.Btn;
        lb_lv: eui.Label;
        teammateItem0: game.mod.more.ZhanduiTeammateItem;
        teammateItem1: game.mod.more.ZhanduiTeammateItem;
        teammateItem2: game.mod.more.ZhanduiTeammateItem;
        teammateItem3: game.mod.more.ZhanduiTeammateItem;
        img_flag: eui.Image;
        redPoint: eui.Image;
        btn_jitan: game.mod.more.ZhanduiItem;
        lb_text: eui.Label;
        btn_tansuo: game.mod.more.ZhanduiItem;
        btn_kuangmai: game.mod.more.ZhanduiItem;
        group_eft1: eui.Group;
        group_eft2: eui.Group;
        group_eft3: eui.Group;
        group_eft4: eui.Group;
        group_eft5: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhanduiXianjiItem extends BaseListenerRenderer {
        lb_name: eui.Label;
        lb_desc: eui.Label;
        data: string;
        constructor();
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class ZhanduiXianjiView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.more {
    class MiningBuyCntMdr extends MdrBase {
        private _view;
        private _proxy;
        /**单次兑换需要材道具数量 */
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
declare namespace game.mod.more {
    class MiningFightListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCnt;
        private onClickBtn;
        private onClickAdd;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import ItemTapEvent = eui.ItemTapEvent;
    class MiningGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _btnList;
        private _type;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateType;
        private onUpdateView;
        private onUpdateTask;
        protected onTabChanged(e: ItemTapEvent): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class MiningLingbaoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCnt;
        private onClickBtn;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    /**虚空矿脉 */
    class MiningMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class MiningMasterMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickExplain;
        private onClickZhenrong;
        private onClickTips;
        update(time: base.Time): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    /**虚界矿脉 */
    class MiningMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private readonly _cnt;
        private readonly _other;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onUpdateCnt;
        private onUpdateSale;
        private onClickBtn;
        private onClickGift;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    class MiningResultFailMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _btnList;
        _showArgs: s2c_zhandui_kuanmai_pvp_ret;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected addBtn(data: IJumpData, jumpId: number): void;
        protected jumpFunc(e: egret.Event): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    class MiningResultWinMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _btnList;
        _showArgs: s2c_zhandui_kuanmai_pvp_ret;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    class MiningSaveMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        _showArgs: zhandui_kuanzhu_data;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickBtn;
        protected onHide(): void;
    }
}
declare namespace game.mod.more {
    class MiningTipsMdr extends EffectMdrBase {
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
declare namespace game.mod.more {
    import ZhanduiJitanLibaoConfig = game.config.ZhanduiJitanLibaoConfig;
    class XujieJitanGiftItem extends BaseGiftItemRender {
        data: IXujieJitanGiftItemData;
        private _proxy;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        protected onClick(): void;
    }
    interface IXujieJitanGiftItemData {
        cfg: ZhanduiJitanLibaoConfig;
        status: RewardStatus;
        curLv: number;
    }
}
declare namespace game.mod.more {
    class XujieJitanGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XujieJitanGiftMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XujieJitanHuanhuaMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _selIdx;
        private _selCfg;
        private _effId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateListData;
        private updateView;
        private updateStar;
        private updateCost;
        private onClickHuanhua;
        private onClickUpstar;
        private upstarHandler;
        private onClickList;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class XujieJitanLingbaoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _consecrateProxy;
        private _classId;
        private _itemList;
        private _suitList;
        protected _type: XujieType;
        private _selType;
        private _curCnt;
        private _types;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private typeUpdateInfo;
        private onInfoUpdate;
        /** 通用背包事件监听 */
        private onBagUpdate;
        private updateBar;
        private updateItemList;
        private updateSuitList;
        private onClickGoto;
        private onClickBtnUp;
        private onClickItem;
    }
    class XujieJitanLingbaoMdr2 extends XujieJitanLingbaoMdr {
        protected _type: XujieType;
    }
}
declare namespace game.mod.more {
    class XujieJitanLingbaoSecondMainMdr extends WndSecondMdr {
        protected onInit(): void;
        protected _btnData: WndBaseViewData[];
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieJitanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XujieJitanMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _effId;
        private _effSrc;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private updateCost;
        private updateModel;
        private onClickGift;
        private onClickRule;
        private onClickUpstar;
        private onClickSacrificeItem;
        private onClickHuanhua;
        update(time: base.Time): void;
        private onBagUpdateByBagType;
    }
}
declare namespace game.mod.more {
    class XujieJitanShelfMdr extends MdrBase {
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
        private onBagUpdateByBagType;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XujieJitanSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _leftTimeSingle;
        private _leftTimeTotal;
        private _prop;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickSpeedUp;
        private onClickAllSpeedUp;
        private sendSpeedUp;
        update(time: base.Time): void;
        private onUpdateTime;
    }
}
declare namespace game.mod.more {
    class XujieLingbaoMdr extends AmassBaseMdr {
        protected classId: number;
        protected onInit(): void;
        protected updateSelIndex(isUpdate?: boolean): void;
        protected getPropType(): PropType;
    }
}
declare namespace game.mod.more {
    class XujieTansuoBossGridMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _gridItemData;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onClickZhanbao;
        private onClickChallenge;
        private confirmFunc;
    }
}
declare namespace game.mod.more {
    class XujieTansuoBusinessGridMdr extends MdrBase {
        private _view;
        private _proxy;
        /**3_消耗货币id_消耗货币的数量_掉落id(奖励为必掉的)_奖励预览id*/
        private _data;
        /**格子数据*/
        private _gridItemData;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XujieTansuoExpeditionGridMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        /**4_数量_品质_需要挂机时长（秒）_掉落id_展示id*/
        private _data;
        /**格子数据*/
        private _gridItemData;
        private _listReward;
        private _listAvatar;
        private _endTime;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateTimeInfo;
        private updateView;
        private isQualitySatisfy;
        private updateListAvatar;
        private onClick;
        private onClickList;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoExpeditionShenLingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _shenlingProxy;
        private _listMenu;
        private _listAvatar;
        private _seledType;
        private _seledList;
        /**4_数量_品质_需要挂机时长（秒）_掉落id_展示id*/
        private _gridItemData;
        private _data;
        private _maxCnt;
        private _itemList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onResetScroller;
        private onUpdateView;
        private onSwitchType;
        private updateListAvatar;
        private getList;
        private getListData;
        private isBattle;
        private updateCondition;
        private isQualitySatisfy;
        private updateTopInfo;
        private onClickOneKey;
        private onSure;
        private onClickListMenu;
        private onClickList;
        private onClickItem;
    }
}
declare namespace game.mod.more {
    class XujieTansuoLayerMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class XujieTansuoLayerMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _type;
        private _curLayer;
        private _listLayer;
        private _scrollerH;
        private _viewportH;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private resetScroller;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updateCost;
        private onClickLayer;
        private onClickZhanlipin;
        private onClickZhenrong;
        private onClickYuanzheng;
        private onClickListLayer;
        private onGotoNextLayer;
        update(time: base.Time): void;
        private onUpdateZhanlipin;
        private onUpdateZhenrong;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.more {
    class XujieTansuoMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
        protected updateViewShow(): void;
        protected onTabChanged(): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listReward;
        private _listArea;
        private _selIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private onUpdateZhanlipin;
        private onUpdateZhenrong;
        private onUpdateTopTeam;
        private updateListData;
        private updateView;
        private onClickRule;
        private onClickRank;
        private onClickZhanlipin;
        private onClickYuanzheng;
        private onClickTansuo;
        private onClickZhenrong;
        private onClickArea;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private getRankInfo;
        private updateTopThree;
        private updateListData;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRankSectionMdr extends MdrBase {
        private _view;
        private _proxy;
        /**排名范围*/
        private _rank;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getRankInfo;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XujieTansuoRewardGridMdr extends MdrBase {
        private _view;
        private _proxy;
        /**2_任务id*/
        private _data;
        /**格子数据*/
        private _gridItemData;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onClick;
    }
}
declare namespace game.mod.more {
    class XujieTansuoSaodangMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _gridItemData;
        private _gridInfo;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        getHurt(): number;
        private updateView;
        private onBtnBuyCntPost;
        private updateHurtStr;
        private onClickSaodang;
        private onClickChallenge;
        private onBagUpdateByPropIndex;
    }
}
declare namespace game.mod.more {
    class XujieTansuoZhanbaoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _gridItemData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    class XujieTansuoZhanlipinMdr extends MdrBase {
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
declare namespace game.mod.more {
    import zhandui_battle_round_struct = msg.zhandui_battle_round_struct;
    import UpdateItem = base.UpdateItem;
    /**
     * A 我方
     * B 敌方
     *
     * A 攻击 B  把B秒了  测试ok
     * B 攻击 A  把A秒了  测试ok
     * AB互相攻击，一方死亡 （n回合）测试ok
     * AB同时攻击 （1回合，n回合）todo 待测试 大头
     * 回血 todo 待测试
     * 反弹伤害 todo 待测试
     * 直接伤害 todo 待测试
     */
    class TBSFightMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private btsMgr;
        /**当前回合*/
        private _curRound;
        /**当前回合战斗记录数据*/
        private _curRoundStruct;
        private _battleRecordList;
        private _curBattleRecords;
        private _skipRound;
        private _actorEntity;
        private _enemyEntity;
        private _delayCallId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private dealHide;
        protected onHide(): void;
        private updateView;
        private updateModel;
        private getActorEntity;
        private getEnemyEntity;
        private updateEntityHp;
        private updateActorView;
        private updateEnemyView;
        private onClickSkin;
        /**=============================== 攻击等处理 ===============================*/
        private onActorFight;
        private onEnemyFight;
        private onTogetherFight;
        private getXYObj;
        /**=============================== 回合战斗处理 ===============================*/
        getNextRoundRecords(): zhandui_battle_round_struct;
        checkAllRoundFinished(): void;
        showRoundTips(round: number): void;
        doRound(): void;
        doRoundBattle(): void;
        update(time: base.Time): void;
        private doBattleRecord;
    }
}
declare namespace game.mod.more {
    import PoolObject = base.PoolObject;
    import teammate = msg.teammate;
    /**
     * 回合制模型控制器 todo
     */
    class TBSModelMgr {
        private _gr_model0;
        private _gr_model1;
        private _proxy;
        private static _instance;
        static getIns(): TBSModelMgr;
        private _radius;
        /**
         * 己方12个神灵布局，锚点的x正方向是12
         * 相对于group的锚点，象限不同
         */
        private _angle;
        /**敌方布局*/
        private _enemyAngle;
        private getAngle;
        private getX;
        private getY;
        /**
         * 添加神灵模型 (其他模型暂时不需要展示）
         * @param list 神灵列表
         * @param gr 容器
         * @param dir 方向，默认右上
         */
        private addGeneral;
        /**
         * 己方
         * @param info
         * @param gr
         * @param dir 默认右上
         */
        updateActor(info: teammate, gr: eui.Group, dir?: Direction): void;
        /**
         * 敌方
         * @param info
         * @param gr
         * @param dir 默认左下
         */
        updateEnemy(info: teammate, gr: eui.Group, dir?: Direction): void;
        onRemove(): void;
    }
    /**模型容器*/
    class TBSModelItem extends eui.Component implements PoolObject {
        private _dsp;
        private _hub;
        private _url;
        constructor();
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
        onAddGeneral(index: number, dir?: Direction): void;
        onAddRole(teammate: teammate, dir?: Direction): void;
        onAddMonster(id: number, dir?: Direction): void;
    }
}
declare namespace game.mod.more {
    class TBSTxtMgr {
        private static _instance;
        static getIns(): TBSTxtMgr;
        /**
         * @param {string} dmgStr 伤害文本
         * @param {egret.DisplayObjectContainer} display 添加到对象
         * @param {number} x
         * @param {number} y
         * @param {number} dir 1右飘2左飘
         * */
        show(dmgStr: string, display: egret.DisplayObjectContainer, x?: number, y?: number, dir?: number): void;
    }
}
declare namespace game.mod.more {
    class XujieTansuoSceneResultFailMdr extends EffectMdrBase {
        private _view;
        constructor();
        protected onShow(): void;
    }
}
declare namespace game.mod.more {
    import s2c_zhandui_legion_result_info = msg.s2c_zhandui_legion_result_info;
    class XujieTansuoSceneResultKillMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: s2c_zhandui_legion_result_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    import s2c_zhandui_legion_result_info = msg.s2c_zhandui_legion_result_info;
    class XujieTansuoSceneResultMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: s2c_zhandui_legion_result_info;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
}
declare namespace game.mod.more {
    class ZhenrongAttrMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _slProxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private getLegionBuffDesc;
    }
}
declare namespace game.mod.more {
    class AchieveView extends eui.Component {
        grp_title: eui.Group;
        bar: ProgressBarComp;
        lab_lv: eui.Label;
        icon: Icon;
        img_draw: eui.Image;
        list_task: eui.List;
        btn_draw: Btn;
        group_eft1: eui.Group;
        constructor();
    }
}
declare namespace game.mod.more {
    class ZhenrongMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listBtn;
        private _listShenling;
        private _listHuashen;
        private _listAttr;
        private _selIdx;
        private _legionTypeAry;
        private _btnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private updatePower;
        private updateListBtn;
        private onClickOnekey;
        private onClickAttr;
        private onClickListBtn;
        private onClickModel;
    }
}
declare namespace game.mod.more {
    class ZhenrongNvshenMdr extends ZhenrongHuashenMdr {
        /**类型*/
        protected _legionType: LegionType;
    }
}
declare namespace game.mod.more {
    class ZhenrongShangzhenSecondMainMdr extends WndSecondMainMdr {
        protected _height: number;
        protected _btnData: WndBaseViewData[];
        private _proxy;
        protected onInit(): void;
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.more {
    /**
     * 神灵上阵
     * 前端做个假上阵处理，只有点击一键或者关闭界面，才会最终上阵
     */
    class ZhenrongShenlingMdr extends MdrBase {
        private _view;
        private _proxy;
        private _shenlingProxy;
        private _listMenu;
        private _listAvatar;
        private _seledType;
        private _seledList;
        private _legionType;
        private _maxCnt;
        private _itemList;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onResetScroller;
        private initShangzhenList;
        private onUpdateView;
        private onSwitchType;
        private updateTopItemList;
        private updateListAvatar;
        private getList;
        private getListData;
        private isBattle;
        private onClickOneKey;
        private onClickListMenu;
        private onClickList;
        private onClickItem;
        private finallyShangzhen;
    }
}
declare namespace game.mod.more {
    class ZhanduiBuildMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class ZhanduiBuildMdr extends MdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickCreate;
        private onClickJoin;
        private onTeam;
    }
}
declare namespace game.mod.more {
    import UpdateItem = base.UpdateItem;
    class ZhanduiConstructMdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listReward;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateExpTime;
        update(time: base.Time): void;
        private updateView;
        private updateReward;
        private onClickGet;
        private onClickGo;
    }
}
declare namespace game.mod.more {
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    class ZhanduiCreateItem extends IconSel {
        img_flag: eui.Image;
        data: ZhanduiQizhiConfig;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.more {
    class ZhanduiCreateMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _selIdx;
        private _cost;
        private _selCfg;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickCreate;
        private onClickList;
    }
}
declare namespace game.mod.more {
    class ZhanduiFlagMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _selIdx;
        private _selCfg;
        private _btnType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private udpateListData;
        private updateTopInfo;
        private updateBottomInfo;
        private onClickUse;
        private onClickList;
    }
}
declare namespace game.mod.more {
    class ZhanduiInviteListMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _isSendSuccess;
        private _sendTime;
        private _chatChannel;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onSendSuccess;
        protected onHide(): void;
        private updateView;
        private onClickCheckbox1;
        private onClickCheckbox2;
        private onClickLabel;
        private getPowerLimit;
        private onClickEditable;
        private onFocusOut;
        private onChangeValue;
    }
}
declare namespace game.mod.more {
    class ZhanduiJoinMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onClickRefresh;
        private onClickSearch;
    }
}
declare namespace game.mod.more {
    class ZhanduiLevelSecondMainMdr extends WndSecondMainMdr {
        protected _height: number;
        protected _btnData: WndBaseViewData[];
        protected addListeners(): void;
    }
}
declare namespace game.mod.more {
    class ZhanduiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class ZhanduiMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected isShowEft(): void;
        protected onHide(): void;
        protected updateData(): void;
        private onUpdateView;
        private onUpdateBtnHint;
        private updateView;
        private onClickRule;
        private onClickJixing;
        private onClickRename;
        private onClickApply;
        private onClickChannel;
        private onClickFlag;
        private onClickJitan;
        private onClickTansuo;
        private onClickKuangmai;
        private updateBtnInfo;
    }
}
declare namespace game.mod.more {
    class ZhanduiRenameMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickDo;
    }
}
declare namespace game.mod.more {
    import teammate = msg.teammate;
    /**
     * 策划文档：玩家头像，点击其他玩家头像显示如下按钮，操作逻辑与仙友相同不再赘述
     */
    class ZhanduiTeammateCheckMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: {
            data: teammate;
            point: egret.Point;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initTypeList;
        private onClickBtn;
        private onClickQuit;
        private confirmQuit;
        private transferCaption;
        private removeTeammate;
        private onClickOther;
    }
}
declare namespace game.mod.more {
    class ZhanduiXianjiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.more {
    class ZhanduiXianjiMdr extends MdrBase {
        private _view;
        private _proxy;
        /**1功绩，2事件*/
        protected _type: number;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
    }
    class ZhanduiXianjiMdr2 extends ZhanduiXianjiMdr {
        protected _type: number;
    }
}
declare namespace game.mod.more {
    class ZhanduiXianjiSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[];
    }
}
