declare namespace game.mod.main {
    import StrongerConfig = game.config.StrongerConfig;
    class StrongerItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        starListView: StarListView;
        lab_desc: eui.Label;
        btn_goto: game.mod.Btn;
        data: StrongerConfig;
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.main {
    class MainMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.main {
    import UpdateItem = base.UpdateItem;
    import attributes = msg.attributes;
    import prop_tips_data = msg.prop_tips_data;
    import reward_find_data = msg.reward_find_data;
    import sys_attrs = msg.sys_attrs;
    class MainProxy extends ProxyBase implements UpdateItem, IMainProxy {
        private _model;
        private _reqList;
        /**登录时候需要向服务端请求数据的系统*/
        private _openIdxs;
        /**登录时候需要向服务端请求数据的任务*/
        private _taskTypes;
        update(time: base.Time): void;
        onStartReconnect(): void;
        initialize(): void;
        getmodel(): MainModel;
        init(): void;
        addReqList(proxy: any, method: Function, args?: any[]): void;
        private isOpenLine;
        private s2c_hangup_day_is_max_get;
        private s2c_hangup_info;
        private s2c_hangup_get_rwd;
        c2s_hangup_get_rwd(type?: number): void;
        c2s_hangup_rate_rwd(): void;
        /**
         * 记录已经开放的界面idx
         * @param {base.GameNT} n
         */
        private get_open_view_idx_s2c;
        readonly rewards: prop_tips_data[];
        readonly offlineCanGet: boolean;
        readonly offlineTotalTime: number;
        readonly offlineMaxtime: number;
        readonly offlineHint: string[];
        /**
         * 挂机红点
         * @returns
         */
        updateOfflineHint(): void;
        getOfflineHint(): boolean;
        saveSettingInfo(): void;
        sendReLogin(): void;
        readonly openFuncIdx: number[];
        /*************************新加的协议**********************/
        /**通用系统数据请求协议*/
        private c2s_open_system_info;
        /**
         * 属性请求协议
         * @param indexList 属性索引列表
         * @param type 不传该字段 表示请求默认的属性     传1表示请求军团属性
         * @private
         */
        private c2s_common_attr_getinfo;
        private s2c_common_attr_sendinfo;
        /**
         * 通用获取属性接口，不要放在update里面频繁请求，统一通过RoleUtil访问
         * type 传1表示请求军团属性，默认不传
         */
        getAttr(index: number, type?: number): attributes;
        /**
         * 通用获取属性列表接口，不要放在update里面频繁请求，统一通过RoleUtil访问
         * type 传1表示请求军团属性，默认不传
         */
        getAttrList(indexList: number[], type?: number): attributes[];
        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttr(index: number): boolean;
        /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
        checkAttrList(indexList: number[]): boolean;
        /**外显系统属性请求协议，统一通过RoleUtil访问*/
        c2s_sys_attributes(openIdx: number): void;
        private s2c_sys_attributes;
        readonly huashenAttr: sys_attrs;
        /*************************登录时候额外请求的协议**********************/
        private c2s_material_get_info;
        private c2s_forbidden_get_info;
        private c2s_single_boss_get_info;
        c2s_pvp_battle_get_base_info(): void;
        c2s_consecrate_info(): void;
        c2s_guild_study_show(): void;
        c2s_guild_xianshou_show(): void;
        /*************************资源找回**********************/
        c2s_reward_find_draw(): void;
        private s2c_reward_find_info;
        readonly findInfos: reward_find_data[];
        isFindShow(): boolean;
        private updateFindHint;
        setNotTipsType(type: number, isSel: boolean): void;
        getNotTipsType(type: number): boolean;
    }
}
declare namespace game.mod.main {
    class MainBottomView extends eui.Component {
        btn_exit: game.mod.Btn;
        grp_show: eui.Group;
        btn_mail: game.mod.Btn;
        btn_chat: game.mod.Btn;
        grp_task: eui.Group;
        img_task_bg: eui.Image;
        lab_taskDesc: eui.Label;
        btn_offline: game.mod.Btn;
        btn_more: game.mod.Btn;
        gr_more: eui.Group;
        btn_challenge: game.mod.main.MainLeftChallengeBtn;
        btn_auto: game.mod.Btn;
        grp_btn: eui.Group;
        btn_yuanling_invite: game.mod.Btn;
        btn_find: game.mod.Btn;
        img_bg: eui.Image;
        scr_skill: eui.Scroller;
        list_skill: eui.List;
        scr_icon: eui.Scroller;
        gr_icon: eui.Group;
        gr_xianyuan: eui.Group;
        gr_xianyuan_icon: eui.Group;
        use_prop: MainFastProp;
        grp_boss: eui.Group;
        lab_name: eui.Label;
        img_icon: eui.Image;
        btn_go: game.mod.Btn;
        btn_close: game.mod.Btn;
        grp_huashen: eui.Group;
        grp_huashen_open: eui.Group;
        huashenItem1: HuashenItem;
        huashenItem2: HuashenItem;
        huashenItem3: HuashenItem;
        huashen: HuashenBtn;
        constructor();
    }
    class MainLeftChallengeBtn extends Btn {
        gr: eui.Group;
        img_bg: eui.Image;
        group_eft: eui.Group;
        lbl_passName: eui.Label;
        redPoint: eui.Image;
        constructor();
    }
}
declare namespace game.mod.main {
    class MainExpItem extends eui.Component {
        img_exp: eui.Image;
        gr_eft: eui.Group;
        lb_progress: eui.Label;
        private _expWidth;
        private _curLv;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**
         * 更新经验条
         * todo 特效待处理
         */
        updateExp(): void;
        private updateExpValue;
        private endExpTween;
        private updateProgressValue;
    }
}
declare namespace game.mod.main {
    class MainFastProp extends BaseRenderer {
        img_bg: eui.Image;
        lab: eui.Label;
        icon: Icon;
        btn_use: Btn;
        btn_close: Btn;
        data: PropData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        setData(data: PropData): void;
        private onClose;
        private onClick;
    }
}
declare namespace game.mod.main {
    class MainLeftBtnView extends BaseRenderer {
        btn_whole: Btn;
        img_hongdian: eui.Image;
        constructor();
        protected dataChanged(): void;
        private addBtnEft;
    }
}
declare namespace game.mod.main {
    class MainLeftView extends eui.Component {
        gr_list2: eui.Group;
        btn_list2: eui.List;
        img_rect: eui.Image;
        btn_list: eui.List;
        constructor();
    }
}
declare namespace game.mod.main {
    class MainMenuBtn extends Btn {
        iconDisplay: eui.Image;
        redPoint: eui.Image;
        private _effHub;
        private _effId;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        setImgLock(isUnlock: boolean): void;
        showUnLockEff(): void;
        private removeEffect;
        private onHide;
    }
}
declare namespace game.mod.main {
    class MainMenuView extends eui.Component {
        img_bg: eui.Image;
        gr_menu: eui.Group;
        btn_role: game.mod.main.MainMenuBtn;
        btn_enhance: game.mod.main.MainMenuBtn;
        btn_surface: game.mod.main.MainMenuBtn;
        btn_xianfa: game.mod.main.MainMenuBtn;
        btn_bag: game.mod.main.MainMenuBtn;
        btn_shenling: game.mod.Btn;
        btn_xianlu: game.mod.Btn;
        grp_tip: eui.Group;
        img_tip: eui.Image;
        gr_shenlingtips: eui.Group;
        lb_shenlingtips: eui.Label;
        constructor();
    }
}
declare namespace game.mod.main {
    class MainPreviewItemView extends eui.Component {
        lab_limit: eui.Label;
        btn_preview: Btn;
        constructor();
    }
}
declare namespace game.mod.main {
    class MainRightActivityRender extends eui.ItemRenderer {
        iconDisplay: eui.Image;
        redPoint: eui.Image;
        data: MainRightActivityRenderData;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.main {
    class MainRightView extends eui.Component {
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.main {
    class MainTopView extends eui.Component {
        img_di: eui.Image;
        expItem: game.mod.main.MainExpItem;
        power: game.mod.Power;
        head_icon: game.mod.Head;
        lb_level: eui.Label;
        item1: game.mod.TopCoinItem;
        item2: game.mod.TopCoinItem;
        vipIcon: game.mod.main.VipIcon;
        btn_rank: game.mod.Btn;
        btn_stronger: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.main {
    class OffLineGain3ItemView extends eui.Component {
        lab_speed: eui.Label;
        img_award: eui.Image;
        constructor();
        setData(awd: number[]): void;
    }
}
declare namespace game.mod.main {
    class OfflineGain3View extends eui.Component {
        grp_item: eui.Group;
        item0: eui.Component;
        item1: eui.Component;
        item2: eui.Component;
        item3: eui.Component;
        item4: eui.Component;
        btn_vip: game.mod.Btn;
        lab_vip_status: eui.Label;
        lab_time: eui.Label;
        list_award: eui.List;
        lab_speed_up: eui.Label;
        btn_speed_up: game.mod.Btn;
        lab_count: eui.Label;
        img_cost: eui.Image;
        lab_cost: eui.Label;
        btn_get: game.mod.Btn;
        btn_close: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.main {
    class VipIcon extends eui.Button {
        group_content: eui.Group;
        img_bg: eui.Image;
        group_eft: eui.Group;
        gr_vipLv: eui.Group;
        redPoint: eui.Image;
        private _effHub;
        private _eftId;
        constructor();
        setText(vipId: number): void;
        setRedPoint(isShow: boolean): void;
        onVipView(): void;
        protected onAddToStage(): void;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected buttonReleased(): void;
        protected onRemoveFromStage(): void;
        private onHide;
    }
}
declare namespace game.mod.main {
    class gmView extends eui.Component {
        txt3: eui.EditableText;
        btn3: game.mod.Btn;
        txt4: eui.EditableText;
        btn4: game.mod.Btn;
        btn5: game.mod.Btn;
        check_0: eui.CheckBox;
        check_1: eui.CheckBox;
        check_2: eui.CheckBox;
        txt1: eui.EditableText;
        btn1: game.mod.Btn;
        txt0: eui.EditableText;
        btn0: game.mod.Btn;
        txt2: eui.EditableText;
        btn2: game.mod.Btn;
        txt_day: eui.Label;
        txt_time: eui.Label;
        txt6: eui.EditableText;
        btn6: game.mod.Btn;
        check_3: eui.CheckBox;
        btn7: game.mod.Btn;
        txt5: eui.EditableText;
        constructor();
    }
}
declare namespace game.mod.main {
    class HuashenBtn extends Btn {
        img_huashen: eui.Image;
        img_huashen_val: eui.Image;
        lab_huashen_val: eui.Label;
        img_huashen_lock: eui.Image;
        group_eft: eui.Group;
    }
}
declare namespace game.mod.main {
    class HuashenItem extends eui.ItemRenderer {
        btn_huashen: game.mod.Btn;
        img_lock: eui.Image;
        img_mark: eui.Image;
        lab_huashen_val: eui.Label;
        data: number;
        protected dataChanged(): void;
        setData(data: number): void;
        updateCd(cd: number, maxCd?: number): void;
    }
}
declare namespace game.mod.main {
    import UpdateItem = base.UpdateItem;
    class MainSkillItem extends BaseRenderer implements UpdateItem {
        private img_bg;
        private img_icon;
        private scr;
        private img_mark;
        private lab_time;
        private img_lock;
        private readonly _markHeight;
        data: number;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        update(time: base.Time): void;
        private onUpdateCd;
    }
}
declare namespace game.mod.main {
    import reward_find_data = msg.reward_find_data;
    class RewardFindItem extends BaseListenerRenderer {
        img_icon: eui.Image;
        scr: eui.Scroller;
        list_reward: eui.List;
        private _rewardList;
        data: reward_find_data;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
}
declare namespace game.mod.main {
    class RewardFindView extends eui.Component {
        lab_tips: eui.Label;
        list_item: eui.List;
        btn_find: game.mod.Btn;
        btn_vipFind: game.mod.Btn;
        lab_find: eui.Label;
        lab_vipFind: eui.Label;
        constructor();
    }
}
declare namespace game.mod.main {
    import prop_tips_data = msg.prop_tips_data;
    import attributes = msg.attributes;
    import reward_find_data = msg.reward_find_data;
    import sys_attrs = msg.sys_attrs;
    class MainModel {
        hangupTimes: number;
        awards: prop_tips_data[];
        canGet: boolean;
        speedUpCnt: number;
        speedUpAwards: prop_tips_data[];
        speedUpCost: number;
        /**挂机获得的装备数量 */
        item_count: number;
        gotAwards: prop_tips_data[];
        gotType: number;
        gotTime: number;
        /**
         * 已经开放的界面模块
         */
        openFuncIdx: number[];
        /** 当前已挂机时间（秒）*/
        readonly offlineTotalTime: number;
        /** 最大挂机时间（秒）*/
        readonly offlineMaxtime: number;
        /**服务端返回的属性*/
        attrList: {
            [index: number]: attributes;
        };
        offlineHint: string[];
        findInfos: reward_find_data[];
        findHint: string[];
        huashenAttr: sys_attrs;
        notTipsInfos: {
            [type: number]: boolean;
        };
    }
}
declare namespace game.mod.main {
    class StrongerView extends eui.Component {
        secondPop: SecondPop;
        scr: eui.Scroller;
        list_item: eui.List;
        list_type: eui.List;
        constructor();
    }
}
declare namespace game.mod.main {
    class AlertView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lab_tips: eui.Label;
        btn_cancel: game.mod.Btn;
        btn_confirm: game.mod.Btn;
        checkbox: eui.CheckBox;
        constructor();
    }
}
declare namespace game.mod.main {
    class BoxRewardView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lab_tip: eui.Label;
        lab_tip1: eui.Label;
        list_reward: eui.List;
        btn_ok: mod.Btn;
        lab_time: eui.Label;
        constructor();
    }
}
declare namespace game.mod.main {
    class BuyTimesView extends eui.Component {
        secondPop: game.mod.SecondPop;
        lab_tip: eui.Label;
        btn_subtract10: game.mod.Btn;
        btn_subtract: game.mod.Btn;
        lbl_num: eui.Label;
        btn_add: game.mod.Btn;
        btn_add10: game.mod.Btn;
        btn_ok: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.main {
    class PowerChange extends eui.Component {
        grp_show: eui.Group;
        grp_cur: eui.Group;
        grp_add: eui.Group;
        grp_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.main {
    class SuccessTipsView extends eui.Component {
        img_type: eui.Image;
        grp_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.main {
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    class MainBottomMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _mainProxy;
        private _passProxy;
        private _surfaceProxy;
        private _curTask;
        private _lastTask;
        private _moreStatus;
        private _skillData;
        private rectangle;
        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData;
        /**按钮的监听事件*/
        private _btnNtMap;
        /**按钮管理器*/
        private _ins;
        private _isShow;
        private _isAct;
        private _easyUse;
        private _bossData;
        private _huashenOpen;
        private _huashenList;
        private _huashenVal;
        private _startHuashenVal;
        private _huashenTick;
        private readonly theGod_resume_5;
        private _sp;
        private readonly sp_radius;
        private _huashenStartTime;
        private _startHuashenBecome;
        private _huashenBecoming;
        private _huashenSkillTime;
        private _huashenMaxCd;
        private _huashenPos;
        private _isTaskTrigger;
        private _huashenTaskId1;
        private _huashenTaskId2;
        private _huashenId;
        private initBtnData;
        private _touchStatus;
        private _distance;
        private _moveStatus;
        constructor();
        protected onInit(): void;
        private onInitMore;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        /** 闯关 */
        private onClickPass;
        private updatePassName;
        /** 更新闯关 */
        private updatePassMod;
        private updatePass;
        private onPassInfoUpdate;
        private onClickAutoPass;
        /** 设置自动闯关状态 */
        private setPassAuto;
        /** 更新闯关红点 */
        private onRefreshPassHint;
        /** 更新挂机红点 */
        private onRefreshOfflineHint;
        /** 更新红点 */
        private updateHint;
        private onDownChat;
        private onMoveChat;
        private onUpChat;
        private onClickChat;
        private updateChatHint;
        private updateChat;
        private onOffline;
        /** 打开邮件*/
        private onClickMail;
        private onUpdateMail;
        private onUpdateUse;
        private onCloseUse;
        private onShowUse;
        private setUseTween;
        private onClickMore;
        private onUpdateStatus;
        private updateMailHint;
        private updateBtnTween;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private onSceneChange;
        private onClickExit;
        private updateShow;
        private onCheckClose;
        private dealBtnIconList;
        private dealSingleBtnIconByNt;
        private dealSingleBtnIcon;
        private clearBtnIconData;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        /**功能关闭移除按钮*/
        private onOpenFuncDelete;
        private onClickTask;
        private onTaskUpdate;
        private updateTask;
        private onUpdateYuanLingInvite;
        private onClickYuanLingInvite;
        private onClickXianyuan;
        private showGuide;
        private showHuaShenGuide;
        private onClickHuashenSkillIcon;
        private showTaskGuide;
        private clearAllGuide;
        private clearMoreGuide;
        private clearFuncGuide;
        private onGuideTrigger;
        private showTipsGuide;
        private showMoreGuide;
        /********************资源找回**********************/
        private onClickFind;
        private updateFind;
        private setBtnShow;
        private updateOffline;
        private updateBtnPos;
        /********************化神**********************/
        protected onSurfaceInfoUpdate(n: GameNT): void;
        protected onSceneHuashenTime(n: GameNT): void;
        private onSceneEnter;
        protected onSceneHuashenId(n: GameNT): void;
        private onClickHuashen;
        private clickHuashenSkill;
        private huashenUseSkill;
        private updateHuashen;
        private updateHuashenIcon;
        private startHuashenVal;
        private calcHuashenVal;
        private updateHuashenVal;
        private updateHuashenValBar;
        private updateHuashenBecomeBar;
        private setHuashenOpen;
        private onClickHuashenItem;
        private clickHuashenItemSkill;
        private updateHuashenSkill;
        private getHuashenSkillCd;
        private autoHuashen;
        update(time: base.Time): void;
        /********************Boss复活提示**********************/
        private onBossRevive;
        private onClickGo;
        private onClickClose;
        private setGrpBoss;
        private updateGrpBoss;
        private onClickZhandui;
        private onUpdateByProp;
        private _btnMoreHintTypes;
        private getBtnMoreHintTypes;
        private getBtnMoreHint;
        private updateBtnMoreHint;
    }
}
declare namespace game.mod.main {
    class MainLeftMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _btnPro;
        private _btnPro2;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.main {
    class MainMenuMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _bagProxy;
        private _shenlingProxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onBagUpdateByPropTypeAndSubType;
        private updateShenlingTips;
        private onClickXianlu;
        private onClickSurface;
        private onClickRole;
        private onClickEnhance;
        private onClickBag;
        private onClickXianfa;
        private onClickShenLing;
        /** 通用红点事件监听 */
        private onHintUpdate;
        /** 更新红点 */
        private updateHint;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        private onUpdateBtn;
        /** 更新仙路红点 */
        private updateXianluHint;
        /** 更新角色红点 */
        private updateRoleHint;
        /** 更新强化红点 */
        private updateEnhanceHint;
        /** 更新背包红点 */
        private updateBagHint;
        /** 更新仙法红点 */
        private updateXianfaHint;
        /**神灵红点*/
        private updateShenLingHint;
        /** 更新御灵红点 */
        private updateSurfaceHint;
        /** 更新角色特权信息 */
        private onRolePrivilegeUpdate;
        private onBagUpdateByPropType;
        /** 熔炼提示 */
        private updateMeltTip;
        private removeMeltTipTween;
        private onClickTip;
        /**自动使用背包宝箱*/
        private autoUseBox;
        private showGuide;
        private onIconImageFly;
        private onIconImageFlyEnd;
        private getMainBtn;
    }
}
declare namespace game.mod.main {
    class MainPreviewItemMdr extends MdrBase {
        private _view;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onUpdateView;
        private onClickPreview;
        protected onHide(): void;
    }
}
declare namespace game.mod.main {
    class MainRightMdr extends EffectMdrBase {
        private _view;
        private _btnList;
        private _dailyProxy;
        private _bossProxy;
        private _isShow;
        /**入口手动赋值就行了，其他的不用管*/
        private _btnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateBossTips;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
        /** 打开界面*/
        private onTapBtn;
        private onClickBtn;
        private updateBtnList;
        private onUpdatePreview;
        /** 通用红点事件监听 */
        private onHintUpdate;
        private updateHint;
        /** 切换场景 */
        private onSceneChange;
        private updateShow;
        private showGuide;
        private onListChange;
        private clearGuide;
    }
}
declare namespace game.mod.main {
    class MainTopMdr extends EffectMdrBase {
        private _view;
        private _oldPower;
        private _mainProxy;
        private _delayPower;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onClickVip;
        private onClickRank;
        private updateRank;
        /**--------------------------我要变强*------------------————————————*/
        private updateStronger;
        private onClickStronger;
        /**--------------------------我要变强*------------------————————————*/
        private onClickHead;
        /**更新等级显示*/
        private updateLv;
        /**更新货币显示*/
        private updateCoin;
        private updateHead;
        private onVipUpdate;
        /** 更新角色信息 */
        private onRoleUpdate;
        /** 展示战力变化特效 */
        private updateShowPower;
        /** 更新战力 */
        private updatePower;
        protected onHide(): void;
        /**经验条*/
        private onUpdateExp;
        /** 切换场景 */
        private onSceneChange;
        private updateShow;
        /**更新红点*/
        private updateHint;
        /**红点事件更新红点*/
        private onUpdateHint;
        /**功能开启刷新按钮*/
        private onOpenFuncUpdate;
    }
}
declare namespace game.mod.main {
    class OfflineGain3Mdr extends MdrBase {
        private _view;
        private _proxy;
        private _model;
        private _passProxy;
        private _rewards;
        private _startY;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        private onVip;
        private onGet;
        private onSpeedUp;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateReward;
        private updateView;
        private playTween;
        private onHintUpdate;
    }
}
declare namespace game.mod.main {
    class gmMdr extends MdrBase {
        private _view;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        private onClick;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.main {
    class RewardFindMainMdr extends WndBaseMdr {
        private _proxy;
        protected _btnData: WndBaseViewData[];
        protected onInit(): void;
        protected addListeners(): void;
        private onInfoUpdate;
    }
}
declare namespace game.mod.main {
    class RewardFindMdr extends MdrBase {
        private _view;
        private _itemList;
        private _isVip;
        private _proxy;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickFind;
        private onClickVipFind;
        private initShow;
        private updateItemList;
    }
}
declare namespace game.mod.main {
    class StrongerMdr extends EffectMdrBase {
        private _view;
        private _typeList;
        private _itemList;
        private _selIndex;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickType;
        private initTypeList;
        private updateItemList;
    }
}
declare namespace game.mod.main {
    import Handler = base.Handler;
    class AlertMdr extends MdrBase {
        private _view;
        protected _showArgs: {
            currentState: string;
            content: string;
            confirm: Handler;
            cancel: Handler;
            type: NotTipsType;
            changeHide: boolean;
        };
        private _cancel;
        private _type;
        private _proxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickCancel;
        private onClickConfirm;
        private execAndHide;
        private updateView;
        private onSceneChange;
    }
}
declare namespace game.mod.main {
    import UpdateItem = base.UpdateItem;
    class BoxRewardMdr extends MdrBase implements UpdateItem {
        private _view;
        protected _showArgs: BoxRewardData;
        private _rewardDatas;
        private _okFunc;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        private btnOkFunc;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        update(time: base.Time): void;
        private onUpdateTime;
    }
}
declare namespace game.mod.main {
    import Handler = base.Handler;
    class BuyTimesMdr extends MdrBase {
        private _view;
        /**
         * 通用的购买次数
         * @param tips 描述文本
         * @param cost 单次购买消耗
         * @param cnt 剩余可购买次数
         * @param maxBuyCnt 当前可购买次数
         * @param maxCnt 最大可购买次数
         * @param handler 点击购买按钮回调
         */
        protected _showArgs: {
            tips: string;
            cost: number[];
            cnt: number;
            maxBuyCnt: number;
            maxCnt: number;
            handler: Handler;
        };
        private _curCnt;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onClickSubtract10;
        private onClickSubtract;
        private delNum;
        private onClickAdd10;
        private onClickAdd;
        private addNum;
        private getMaxCnt;
        private onOkClick;
        private updateNum;
    }
}
declare namespace game.mod.main {
    import UpdateItem = base.UpdateItem;
    class PowerChangeMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _curPower;
        private _endPower;
        private _addPower;
        private _perAdd;
        _showArgs: number;
        private _showing;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initPower;
        private removeFont;
        private showViewTween;
        private removeViewTween;
        private showAddTween;
        private removeAddTween;
        update(time: base.Time): void;
        private showPowerTween;
        private checkHide;
        private showEffect;
    }
}
declare namespace game.mod.main {
    class SuccessTipsMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: SuccessTipsType;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private showTween;
        private removeTween;
        private showEffect;
    }
}
