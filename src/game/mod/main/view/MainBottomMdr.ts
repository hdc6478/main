namespace game.mod.main {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import GateConfig = game.config.Gate1Config;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import LanDef = game.localization.LanDef;
    import task_data = msg.task_data;
    import Handler = base.Handler;
    import ArrayCollection = eui.ArrayCollection;
    import stage = egret.lifecycle.stage;
    import Rectangle = egret.Rectangle;
    import Point = egret.Point;
    import Tween = base.Tween;
    import Monster1Config = game.config.Monster1Config;
    import HuashenConfig = game.config.HuashenConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import ParamConfig = game.config.ParamConfig;
    import Shape = egret.Shape;
    // import s2c_instance_fin = msg.s2c_instance_fin;
    // import prop_tips_data = msg.prop_tips_data;

    export class MainBottomMdr extends EffectMdrBase implements UpdateItem {
        private _view: MainBottomView = this.mark("_view", MainBottomView);
        private _mainProxy: MainProxy;
        private _passProxy: IPassProxy;
        private _surfaceProxy: ISurfaceProxy;

        private _curTask: task_data;
        private _lastTask: task_data;

        private _moreStatus: number = 0;
        private _skillData: ArrayCollection = new ArrayCollection();

        private rectangle: Rectangle;

        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData: IBtnIconData[];
        /**按钮的监听事件*/
        private _btnNtMap: { [key: string]: BtnIconId } = {};
        /**按钮管理器*/
        private _ins: BtnIconMgr;
        private _isShow: boolean;//是否显示grp_show
        private _isAct: boolean;//是否激活化神

        private _easyUse: PropData;

        private _bossData: BossReviveData;//BOSS复活

        private _huashenOpen: boolean = false;//打开化神轮盘
        private _huashenList: HuashenItem[];//化神轮盘item
        private _huashenVal: number;//化神蓄能进度值
        private _startHuashenVal: boolean;//是否开启化神蓄能
        private _huashenTick: number = 0;//化神蓄能定时5秒累加
        private readonly theGod_resume_5: number = 5;//化神固定每5秒回复能量
        private _sp: Shape;
        private readonly sp_radius: number = 47;//半径
        private _huashenStartTime: number;//化神开始变身的时间
        private _startHuashenBecome: boolean;//是否开启化神变身
        private _huashenBecoming: boolean;//场景化神变身中
        private _huashenSkillTime: number;//化神使用技能的时间
        private _huashenMaxCd: number;//化神变身切换CD
        private _huashenPos: number = 0;//自动使用化神技能下标，用于自动施放化神，0、1、2、3
        private _isTaskTrigger: boolean = false;// 是否的 任务触发的化神体验
        private _huashenTaskId1: number; //化神体验 任务id
        private _huashenTaskId2: number; //化神体验 任务id
        private _huashenId: number; //用于任务体验化神id
        // 任务id

        private initBtnData(): void {
            this._btnData = [
                //添加方法与添加活动一样
                {
                    id: BtnIconId.Union,
                    m: ModName.Union,
                    v: UnionMainType.UnionIn,
                    showBack: true,
                    guideKey: GuideKey.Union
                },
                {
                    id: BtnIconId.Consecrate,
                    m: ModName.Consecrate,
                    v: ConsecrateViewType.Consecrate,
                    showBack: true,
                    guideKey: GuideKey.Consecrate
                },
                {
                    id: BtnIconId.Xianyuan,
                    m: null,
                    v: null,
                    clickHandler: Handler.alloc(this, this.onClickXianyuan),
                    hintMsgList: [[ModName.Xianyuan], [ModName.Friend]]
                },
                // {
                //     id: BtnIconId.Friend,
                //     m: ModName.Friend,
                //     v: FriendViewType.FriendMain,
                //     showBack: true
                // },
                {
                    id: BtnIconId.Achieve,
                    m: ModName.More,
                    v: MoreViewType.AchieveMain,
                    showBack: true
                },
                {
                    id: BtnIconId.Huashen,
                    m: ModName.More,
                    v: MoreViewType.HuashenMain,
                    showBack: true
                },
                // {
                //     id: BtnIconId.SkyPalace,
                //     m: ModName.More,
                //     v: MoreViewType.SkyPalace,
                //     showBack: true
                // },
                {
                    id: BtnIconId.Yishou,
                    m: ModName.Yishou,
                    v: YiShouViewType.Main,
                    showBack: true
                },
                {
                    id: BtnIconId.Zhandui,
                    m: null,
                    v: null,
                    showBack: true,
                    hintMsg: [ModName.More, MoreViewType.ZhanduiMain],
                    clickHandler: Handler.alloc(this, this.onClickZhandui)
                },
                {
                    id: BtnIconId.Huanggu,
                    m: ModName.More,
                    v: MoreViewType.HuangguMain,
                    showBack: true
                },
                {
                    id: BtnIconId.GoddessRecord,
                    m: ModName.More,
                    v: MoreViewType.GoddessRecordMain,
                    showBack: true
                },
                {
                    id: BtnIconId.Huanjing,
                    m: ModName.More,
                    v: MoreViewType.HuanjingMain,
                    showBack: true,
                },
            ];
        }

        private _touchStatus: boolean = false;              //当前触摸状态，按下时 -> 值为true
        private _distance: egret.Point = new egret.Point(); //核心点 -> 鼠标点击时，鼠标全局坐标与_bird的位置差
        private _moveStatus: boolean = false;              //当前触摸状态，移动时 -> 值为true

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.bottom = 0;
            this._view.horizontalCenter = 0;
            this._mainProxy = this.retProxy(ProxyType.Main);
            this._passProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);

            this._view.btn_auto.img_bg.source = 'main_btn_auto';
            this._view.btn_auto.setLabelStyle3({ size: 19, textColor: 0x6c400e, verticalCenter: 2 });

            this._view.list_skill.itemRenderer = MainSkillItem;
            this._view.list_skill.dataProvider = this._skillData;

            this._ins = new BtnIconMgr(this._view.gr_icon);
            if (DEBUG && window) {
                window['BtnIconMgrBot'] = this._ins;
            }

            this._sp = new Shape();
            this._sp.x = this.sp_radius;
            this._sp.y = this.sp_radius;
            this._sp.touchEnabled = false;
            this._view.grp_huashen.addChildAt(this._sp, 4);

            let cfg: ParamConfig = GameConfig.getParamConfigById("huashenexchange_time");
            this._huashenMaxCd = cfg && cfg.value || 5;

            cfg = GameConfig.getParamConfigById("huashen_tryout");
            this._huashenTaskId1 = cfg && cfg.value[0];
            this._huashenTaskId2 = cfg && cfg.value[1];

            cfg = GameConfig.getParamConfigById("huashen_tryout_id");
            this._huashenId = cfg && cfg.value;

        }

        private onInitMore(): void {
            if (this.rectangle) {
                return;
            }
            let point: Point = this._view.gr_more.localToGlobal();
            this.rectangle = new Rectangle(point.x, point.y, this._view.gr_more.width, this._view.gr_more.height - 25);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);


            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_BEGIN, this.onDownChat);
            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_END, this.onUpChat);
            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_TAP, this.onClickChat);

            addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit);
            addEventListener(this._view.btn_offline, TouchEvent.TOUCH_TAP, this.onOffline);
            addEventListener(this._view.btn_mail, TouchEvent.TOUCH_TAP, this.onClickMail);
            addEventListener(this._view.btn_more, TouchEvent.TOUCH_TAP, this.onClickMore);
            addEventListener(this._view.btn_auto, TouchEvent.TOUCH_TAP, this.onClickAutoPass);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickPass);
            addEventListener(this._view.grp_task, TouchEvent.TOUCH_TAP, this.onClickTask);
            addEventListener(this._view.btn_yuanling_invite, TouchEvent.TOUCH_TAP, this.onClickYuanLingInvite);
            addEventListener(this._view.btn_find, TouchEvent.TOUCH_TAP, this.onClickFind);
            /****************************化神*******************************/
            addEventListener(this._view.huashen, TouchEvent.TOUCH_TAP, this.onClickHuashen);
            this._huashenList = [
                this._view.huashenItem1,
                this._view.huashenItem2,
                this._view.huashenItem3
            ];
            for (let item of this._huashenList) {
                addEventListener(item.btn_huashen, TouchEvent.TOUCH_TAP, this.onClickHuashenItem);
            }
            /****************************化神*******************************/
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);

            this.onNt(PassEvent.UPDATE_MAIN_PASS_INFO, this.onPassInfoUpdate, this);

            /********************新的监听事件*******************/
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);//场景切换
            this.onNt(PassEvent.CHALLENGE_HANGUP_BOSS, this.updateShow, this);//挑战boss
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            // 元灵组队邀请按钮
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_INVITE_BTN, this.onUpdateYuanLingInvite, this);

            /**更多功能 */
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
            this.onNt(MainEvent.ON_OPEN_FUNC_DELETE, this.onOpenFuncDelete, this);//功能关闭

            this.onNt(GuideEvent.ON_GUIDE_UPDATE, this.showGuide, this);//指引
            this.onNt(GuideEvent.ON_GUIDE_TRIGGER, this.onGuideTrigger, this);//触发指定指引

            this.onNt(MailEvent.ON_MAIL_UPDATE, this.onUpdateMail, this);

            this.onNt(MainEvent.ON_UPDATE_EASY_USE_PROP, this.onUpdateUse, this);
            this.onNt(MainEvent.ON_CLOSE_EASY_UES_PROP, this.onCloseUse, this);

            this.onNt(MainEvent.ON_UPDATE_EASY_USE_PROP_COUNT, this.onUpdateByProp, this);

            this.onNt(BossEvent.ON_BOSS_REVIVE_UPDATE, this.onBossRevive, this);//BOSS复活

            this.onNt(MainEvent.ON_REWARD_FIND_UPDATE, this.updateFind, this);//资源找回

            /*********************************化神相关*******************************/
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onSurfaceInfoUpdate, this);//数据携带headType
            this.onNt(HuashenEvent.ON_SCENE_HUASHEN_TIME, this.onSceneHuashenTime, this);//化神变身结束时间修改
            this.onNt(HuashenEvent.ON_SCENE_HUASHEN_ID, this.onSceneHuashenId, this);//场景化神变身数据变更
            this.onNt(SceneEvent.ON_SCENE_ENTER, this.onSceneEnter, this);//场景化神变身数据变更
        }

        protected onShow(): void {
            super.onShow();

            this.initBtnData();
            this.updatePass();
            this.updatePassMod();
            this.updatePassName();
            this.updateShow();
            this.updateTask();
            this.showGuide();
            this.onUpdateUse();
            this.updateHint();
            this.setHuashenOpen(false);
            this.updateHuashen();
            this.updateChat();
            this.onUpdateMail();
            this.onUpdateYuanLingInvite();
            this.updateFind();
            this.updateOffline();
        }

        protected onHide(): void {
            super.onHide();
            this._view.gr_icon.removeChildren();
            this._btnData = [];
            this._lastTask = null;

            Tween.remove(this._view.use_prop);
            Tween.remove(this._view.btn_mail);
            Tween.remove(this._view.btn_chat);

            TimeMgr.removeUpdateItem(this);

            stage.removeEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);

            this.clearBtnIconData();
        }

        //-------------------------------------闯关--------------------------------------------------

        /** 闯关 */
        private onClickPass() {
            GuideMgr.getIns().clear(GuideKey.Pass);//清除任务指引
            ViewMgr.getIns().showViewByID(JumpIdx.Pass);
        }

        private updatePassName() {
            let self = this;
            let idx: number = self._passProxy.passNextIdx;
            if (idx) {
                let _passCfg: GateConfig = getConfigByNameId(ConfigName.Gate, idx);
                self._view.btn_challenge.lbl_passName.text = _passCfg.gate_name;
            }
        }

        /** 更新闯关 */
        private updatePassMod() {
            this._view.btn_challenge.group_eft.visible = this._passProxy.now_wave_cnt >= this._passProxy.target_wave_cnt;
        }

        private updatePass() {
            this._view.btn_challenge.visible = this._view.btn_auto.visible = ViewMgr.getIns().checkBtnShow(OpenIdx.Pass);
        }

        private onPassInfoUpdate() {
            let self = this;
            self.updatePassMod();
            self.setPassAuto();
            self.updatePassName();
        }

        private onClickAutoPass() {
            let self = this;
            let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, OpenIdx.PassAuto);
            if (self._passProxy.passNextIdx <= cfg.mainline) {
                let gateCfg: GateConfig = getConfigByNameId(ConfigName.Gate, cfg.mainline);
                let str = StringUtil.substitute(getLanById(LanDef.mainline_funcopen), [gateCfg.gate_name]);
                PromptBox.getIns().show(str);
                return;
            }
            if (self._passProxy.passNextIdx == self._passProxy.passMaxIdx) {
                PromptBox.getIns().show("已通关最大关数");
                return;
            }
            let _isAuto: boolean = !self._passProxy.passIsAuto;
            self._passProxy.c2s_mainline_task_auto(_isAuto);
        }

        /** 设置自动闯关状态 */
        private setPassAuto() {
            let _isAuto: boolean = this._passProxy.passIsAuto;
            this._view.btn_auto.label = _isAuto ? '闯关中' : '自动';
        }

        /** 更新闯关红点 */
        private onRefreshPassHint(b: boolean): void {
            this._view.btn_challenge.redPoint.visible = b;
        }

        /** 更新挂机红点 */
        private onRefreshOfflineHint(b: boolean): void {
            if (b) {
                let grp = this._view.btn_offline.group_eft;
                this._view.btn_offline.setEffect(UIEftSrc.Guajishouyi, grp, grp.width / 2, grp.height / 2);
            } else {
                this._view.btn_offline.clearEffect();
            }
            this._view.btn_offline.redPoint.visible = b;
            // this._view.btn_offline.icon = b ? "guaji1" : "guaji";
            this._view.btn_offline.icon = !b ? "guaji" : "";
            this._view.btn_offline.setImage("title_guajishouyi");
        }

        /** 更新红点 */
        private updateHint() {
            this.onRefreshPassHint(HintMgr.getHint([ModName.Pass]));
            this.onRefreshOfflineHint(HintMgr.getHint(this._mainProxy.offlineHint));
            this.updateMailHint(HintMgr.getHint([ModName.Mail]));
            this.updateChatHint(HintMgr.getHint([ModName.Chat]));
            this.updateBtnMoreHint();
        }

        //------------------------------聊天-----------------------------------
        private onDownChat(e: egret.TouchEvent) {
            this._distance.x = e.stageX - this._view.btn_chat.x;
            this._distance.y = e.stageY - this._view.btn_chat.y;
            this._touchStatus = true;
            this._moveStatus = false;
            this._view.btn_chat.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveChat, this);
        }

        private onMoveChat(e: egret.TouchEvent) {
            if (this._touchStatus) {
                let moveX = e.stageX - this._distance.x;
                let offsetX = this._view.btn_chat.anchorOffsetX;//设置描点后需要计算上
                moveX = Math.max(this._view.grp_show.width - gso.contentWidth + offsetX, moveX);
                moveX = Math.min(gso.contentWidth - this._view.btn_chat.width + offsetX, moveX);
                this._view.btn_chat.x = moveX;

                let moveY = e.stageY - this._distance.y;
                let offsetY = this._view.btn_chat.anchorOffsetY;//设置描点后需要计算上
                moveY = Math.max(-(this._view.y + this._view.grp_show.y) + offsetY, moveY);
                moveY = Math.min(this._view.height - this._view.grp_show.y - this._view.btn_chat.height + offsetY, moveY);
                this._view.btn_chat.y = moveY;

                this._moveStatus = true;
            }
        }

        private onUpChat(): void {
            this._touchStatus = false;
            this._view.btn_chat.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveChat, this);
        }

        //打开聊天
        private onClickChat() {
            if (this._moveStatus) {
                return;
            }
            ViewMgr.getIns().showViewByID(JumpIdx.Chat);
            // let info: msg.skill_item = new msg.skill_item();
            // info.index = 150000301;
            // facade.showView(ModName.Xianfa, XianfaViewType.XianfaActiveTip, info);
            //ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
            // let msg: s2c_instance_fin = new s2c_instance_fin();
            // msg.index = 240000333;
            // msg.is_success = true;
            // msg.type = 106;
            // let rewards: prop_tips_data[] = [];
            // for(let i = 0; i < 20; ++i){
            //     let reward: prop_tips_data = new prop_tips_data();
            //     reward.idx = Long.fromValue(1450000001 + i);
            //     reward.cnt = i + 1;
            //     rewards.push(reward);
            // }
            // msg.reward = rewards;
            // facade.showView(ModName.Result, ResultViewType.ResultWin, msg);/** 战斗胜利默认界面*/
        }

        private updateChatHint(hint: boolean): void {
            this.updateBtnTween(this._view.btn_chat, hint);
        }

        private updateChat(): void {
            this._view.btn_chat.visible = ViewMgr.getIns().checkBtnShow(OpenIdx.Chat);
            this.updateBtnPos();
        }

        //------------------------------聊天-----------------------------------

        //打开挂机界面
        private onOffline() {
            ViewMgr.getIns().showViewByID(JumpIdx.OfflineGain);
        }

        //--------------------邮件-----------------------

        /** 打开邮件*/
        private onClickMail() {
            ViewMgr.getIns().showView(ModName.Mail, MailViewType.MailMain);
        }

        private onUpdateMail(): void {
            let proxy: IMailProxy = facade.retMod(ModName.Mail).retProxy(ProxyType.Mail);
            let cnt = proxy.getTotalMailCnt();
            this._view.btn_mail.visible = cnt > 0;
            this.updateBtnPos();
        }

        //---------------------快捷使用-------------------

        private onUpdateUse(): void {
            if (!this._easyUse && (this._easyUse = BagUtil.getEasyUse(), this._easyUse)) {
                let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
                if (this._easyUse.propType == EquipPropType.RoleEquip && !proxy.checkEquipByPos(this._easyUse.equipPos)) {
                    this._easyUse = null;
                    this.onUpdateUse();
                    return;
                }
                this.onShowUse(this._easyUse);
            }
        }

        private onCloseUse(): void {
            this._easyUse = BagUtil.getEasyUse();
            let tween: Tween = this.setUseTween(this._view.use_prop, 1, 0.01);
            tween.delay(100).exec(Handler.alloc(this, this.onShowUse, [this._easyUse]));
        }

        private onShowUse(prop: PropData): void {
            this._view.use_prop.visible = false;
            if (!prop) {
                return;
            }
            let proxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            if (prop.propType == EquipPropType.RoleEquip && !proxy.checkEquipByPos(prop.equipPos)) {
                this.onCloseUse();
                return;
            }
            this._view.use_prop.setData(prop);
            this.setUseTween(this._view.use_prop, 0.01, 1, 200, true);
        }

        private setUseTween(item: eui.Component, init: number, scale: number, duration: number = 200, visible?: boolean): Tween {
            Tween.remove(item);
            item.scaleX = item.scaleX = init;
            let scaleX: number = scale;
            let scaleY: number = scale;
            if (visible !== null) {
                item.visible = visible;
            }
            return Tween.get(this._view.use_prop).to({ scaleX, scaleY }, duration);
        }

        //--------------------更多-----------------------

        private onClickMore() {
            this.onInitMore();
            if (!this._view.gr_more.visible) {
                this._view.gr_more.visible = true;
                this._moreStatus++;
                this.dealBtnIconList();
                stage.addEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);
            } else {
                this._moreStatus++;
                if (this._moreStatus > MainMoreStatus.Skill) {
                    this._view.gr_more.visible = false;
                    this._moreStatus = MainMoreStatus.More;
                    this.clearBtnIconData();
                }
                if (this._view.gr_xianyuan.visible) {
                    this._view.gr_xianyuan.visible = false;
                }
            }

            this.onUpdateStatus();
        }

        private onUpdateStatus(): void {
            if (this._moreStatus == MainMoreStatus.Fuction) {

                //功能
                this._view.scr_skill.visible = false;
                this._view.scr_icon.visible = true;

                let N = Math.ceil(this._view.gr_icon.numChildren / 6) || 1;
                let height = N * 105 + 27;
                this._view.img_bg.height = height;
                this._view.gr_more.height = height;
            } else if (this._moreStatus == MainMoreStatus.Skill) {
                //技能
                this._view.scr_skill.visible = true;
                this._view.scr_icon.visible = false;
                let xianfa: IXianfaProxy = facade.retMod(ModName.Xianfa).retProxy(ProxyType.Xianfa);
                //xianfa.posSkills.push(xianfa.posSkills[0]); 调试代码
                this._skillData.source = xianfa.posSkills;

                let N = Math.ceil(xianfa.posSkills.length / 6) || 1;
                let height = N * 105 + 27;
                this._view.img_bg.height = height;
                this._view.gr_more.height = height;
            } else {
                //关闭
                this._view.scr_skill.visible = false;
                this._view.scr_icon.visible = false;
                this._skillData.removeAll();
                stage.removeEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);
            }
            this._view.btn_more.icon = `btn_more${this._moreStatus || ""}`;
            this.updateBtnMoreHint();
            this.showMoreGuide();
        }

        //更新
        private updateMailHint(hint: boolean): void {
            this.updateBtnTween(this._view.btn_mail, hint);
        }

        private updateBtnTween(btn: Btn, hint: boolean): void {
            btn.rotation = 0;
            Tween.remove(btn);
            if (hint) {
                Tween.get(btn, { loop: true })
                    .to({ rotation: -20 }, 150)
                    .to({ rotation: 20 }, 150)
                    .to({ rotation: 0 }, 150).delay(1000);
            }
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == ModName.Pass) {
                this.onRefreshPassHint(data.value);
            } else if (data.node == HintMgr.getType(this._mainProxy.offlineHint)) {
                this.onRefreshOfflineHint(data.value);
            } else if (data.node == ModName.Mail) {
                this.updateMailHint(data.value);
            } else if (data.node == ModName.Chat) {
                this.updateChatHint(data.value);
            }

            //更多按钮红点
            let btnMoreHintTypes = this.getBtnMoreHintTypes();
            if (btnMoreHintTypes.indexOf(data.node) > -1) {
            }

            //更多按钮里面的按钮红点
            if (this._view.gr_more.visible) {
                let showBtnMap = this._ins._showBtnMap;
                for (let k in showBtnMap) {
                    let btnIcon = showBtnMap[k];
                    let btnData = btnIcon ? btnIcon.data : null;
                    if (!btnData || (!btnData.hintMsg && !btnData.hintMsgList) || btnData.hintType == BtnIconHintType.None || btnData.hintType == BtnIconHintType.Once) {
                        continue;
                    }
                    if (btnData.hintMsg) {
                        let type = HintMgr.getType(btnData.hintMsg);
                        if (type != data.node) {
                            continue;
                        }
                        let hint = data.value;
                        if (!hint && btnData.hintType == BtnIconHintType.FirstCommon) {
                            hint = BtnIconBase._hintCache[btnData.id] == undefined
                        }
                        btnIcon.setHint(hint);
                        break;
                    } else if (btnData.hintMsgList) {
                        let hint;//undefined
                        for (let hintMsg of btnData.hintMsgList) {
                            let type = HintMgr.getType(hintMsg);
                            if (type != data.node) {
                                continue;
                            }
                            if (!hint) {
                                hint = data.value;//不存在值，或者false的时候才赋值
                            } else {
                                break;
                            }
                        }
                        if (hint != undefined) {
                            if (btnData.hintType == BtnIconHintType.FirstCommon) {
                                hint = BtnIconBase._hintCache[btnData.id] == undefined
                            }
                            btnIcon.setHint(hint);
                            break;
                        }
                    }
                }
            }
        }

        //切换场景
        private onSceneChange(): void {
            this.updateShow();
        }

        //点击退出
        private onClickExit() {
            let sceneType = SceneUtil.getCurSceneType();
            let tip = getLanById(LanDef.bahuang_tips15);
            if (SceneExitTips[sceneType]) {
                //特殊场景退出提示文本
                tip = getLanById(SceneExitTips[sceneType]);
            }
            //退出提示
            ViewMgr.getIns().showConfirm(tip, Handler.alloc(this, () => {
                SceneUtil.clickExit();
            }));
        }

        //--------------------显示主界面-----------------------
        private updateShow(): void {
            let isShow = SceneUtil.isShowMain();
            this._isShow = isShow;
            this._view.grp_show.visible = isShow;
            this._view.btn_exit.visible = !isShow;//退出战斗按钮
            this.setGrpBoss(false);//切换场景时候，隐藏boss提示
            if (isShow) {
                this.showTaskGuide();//切换场景时，显示下任务指引
            } else {
                this.clearAllGuide();
                this.clearMoreGuide();
                this.clearFuncGuide();//清除指引
                this._view.btn_exit.y = SceneUtil.isSceneType(SceneType.Yuanling) ? 874 : 990;//退出按钮位置
            }
        }

        //--------------------更多功能列表-------------------

        private onCheckClose(e: TouchEvent): void {
            if (this._view.gr_more.visible && this.rectangle.contains(e.stageX, e.stageY)) {
                return;
            }
            if (e.target == this._view.btn_more) {
                return;
            }
            //仙缘按钮
            if (e.target && e.target.id && e.target.id == BtnIconId.Xianyuan) {
                return;
            }
            this._view.gr_more.visible = false;
            this._view.gr_xianyuan.visible = false;
            this._moreStatus = MainMoreStatus.More;
            this.onUpdateStatus();
            this.clearBtnIconData();
        }

        private dealBtnIconList(): void {
            this._ins.dealBtnIconList(this._btnData);

            //开启监听按钮额外判断
            let btnNtMap = this._ins._btnNtMap;
            for (let key in btnNtMap) {
                this.onNt(key, this.dealSingleBtnIconByNt, this);
            }
        }

        //监听回调处理单个按钮
        private dealSingleBtnIconByNt(n: GameNT): void {
            let notify = n.type as string;
            let idList: BtnIconId[] = this._ins._btnNtMap[notify];
            if (idList && idList.length) {
                for (let id of idList) {
                    this.dealSingleBtnIcon(id);
                }
            }
        }

        //处理单个按钮
        private dealSingleBtnIcon(id: BtnIconId): void {
            let isAdd = this._ins.dealSingleBtnIcon(id);
        }

        private clearBtnIconData(): void {
            this._ins.clear();
            this._view.gr_icon.removeChildren();
            //移除绑定的监听
            for (let key in this._btnNtMap) {
                this.offNt(key);
                this._btnNtMap[key] = null;
                delete this._btnNtMap[key];
            }
            this._btnNtMap = {};
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            for (let idx of addIdx) {
                if (this._view.gr_more.visible && this._ins._btnDataMap[idx]) {
                    this.dealSingleBtnIcon(idx);
                }
                if (idx == OpenIdx.Huashen) {
                    this.updateHuashen();
                } else if (idx == OpenIdx.Chat) {
                    this.updateChat();
                } else if (idx == OpenIdx.Pass) {
                    this.updatePass();
                } else if (idx == OpenIdx.Offline) {
                    this.updateOffline();
                }
            }
        }

        /**功能关闭移除按钮*/
        private onOpenFuncDelete(n: GameNT): void {
            let delIdx: number[] = n.body;
            for (let idx of delIdx) {
                if (this._view.gr_more.visible && this._ins._showBtnMap[idx]) {
                    this.dealSingleBtnIcon(idx);//调用统一的接口，做一些处理
                }
            }
        }

        //--------------------主线任务-----------------------
        private onClickTask(): void {
            if (!this._curTask) {
                return;
            }
            GuideMgr.getIns().clear(GuideKey.Task);//清除任务指引
            GuideMgr.getIns().clear(GuideKey.TaskClick);//清除任务指引
            TaskUtil.clickTask(this._curTask);
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Main) > -1) {
                this.updateTask();
            }
        }

        private updateTask(): void {
            this._curTask = TaskUtil.getMainTask();
            if (this._curTask) {
                //指引清除规则：
                //1、非完成步骤时，点击即清除，例如主界面的指引
                //2、完成步骤时，任务完成时候清除，例如神灵升级按钮指引
                if (!this._lastTask || this._lastTask.task_id != this._curTask.task_id
                    || this._curTask.status == TaskStatus.Finish) {
                    //任务触发：首次接到任务时，主线任务切换时，主线任务完成时
                    GuideMgr.getIns().taskUpdate();
                }
                this._lastTask = RoleUtil.clone(this._curTask);//切换任务时，当前任务会先被清空，再赋值

                this._view.lab_taskDesc.textFlow = TextUtil.parseHtml(TaskUtil.getTaskDesc(this._curTask, true));

                // TODO:ID1011330需求屏蔽ID1011025TODO:ID1011330需求屏蔽ID1011025
                // if (this._curTask.task_id >= this._huashenTaskId1 && this._curTask.task_id <= this._huashenTaskId2) {
                //     if (this._curTask.task_id == this._huashenTaskId1) {
                //         this._isTaskTrigger = !(this._curTask.status == TaskStatus.NotFinish);
                //     } else {
                //         this._isTaskTrigger = true;
                //     }
                //     this.updateHuashen();
                //
                //     if (this._curTask.task_id == this._huashenTaskId2) {
                //         this.showHuaShenGuide();
                //     }
                //
                // } else {
                //     this._isTaskTrigger = false;
                //     this.updateHuashen();
                // }
                this._isTaskTrigger = false;

            } else {
                this._view.lab_taskDesc.text = getLanById(LanDef.world_boss1);
            }
        }

        // 更新元灵副本组队邀请按钮
        private onUpdateYuanLingInvite(): void {
            let proxy: IYuanLingProxy = getProxy(ModName.Shilian, ProxyType.YuanlingFuben);
            let list = proxy.getInvitedTeamList();

            //todo
            DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList-MainBottomMdr:', list, list && list.length || 0);

            this._view.btn_yuanling_invite.visible = list && list.length > 0;
            this.setBtnShow(this._view.btn_yuanling_invite);
        }

        // 元灵副本组队邀请
        private onClickYuanLingInvite(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shilian, ShilianViewType.YuanLingBeInvited);
        }

        //仙缘 todo
        private onClickXianyuan(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianlv, true)) {
                return;
            }

            this._view.gr_xianyuan.visible = !this._view.gr_xianyuan.visible;
            if (!this._view.gr_xianyuan.visible) {
                return;
            }
            let size = this._view.gr_icon.numChildren;
            for (let i = 0; i < size; i++) {
                let btn = this._view.gr_icon.getChildAt(i) as BtnIconBase;
                if (btn && btn.id == BtnIconId.Xianyuan) {
                    let point: Point = btn.localToGlobal();
                    this._view.gr_xianyuan.x = point.x - 250;
                    break;
                }
            }
            this._view.gr_xianyuan_icon.removeChildren();
            let btnList: IBtnIconData[] = [
                { id: BtnIconId.Xianyuan, m: ModName.Xianyuan, v: XianyuanViewType.Xianlv, showBack: true },
                { id: BtnIconId.Friend, m: ModName.Friend, v: FriendViewType.FriendMain, showBack: true }
                // {id: 2, m: ModName.Xianyuan, v: XianyuanViewType.Xianyou, showBack: true},
                // {id: 3, m: ModName.Xianyuan, v: XianyuanViewType.Xiandui, showBack: true}
            ];

            for (let btnData of btnList) {
                let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, btnData.id);
                btnData.hintMsg = [btnData.m, btnData.v];
                btnData.hintType = BtnIconHintType.Common;

                //修改为读配置
                //btnData.effType = BtnIconEffType.None;
                btnData.effType = cfg.effType || BtnIconEffType.None;
                btnData.sweepType = cfg.sweepType || 0;

                btnData.icon = cfg && cfg.icon || '';
                btnData.sort_num = cfg && cfg.sort_num || 0;
                let btn = new BtnIconBase(btnData.id);
                btn.data = btnData;
                this._view.gr_xianyuan_icon.addChild(btn);
            }
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            if (this._isShow) {
                GuideMgr.getIns().show(GuideKey.Pass, this._view.btn_challenge, Handler.alloc(this, this.onClickPass));//任务指引
                this.showTaskGuide();
                this.showMoreGuide();
            } else {
                this.clearAllGuide();
            }
        }

        private showHuaShenGuide(): void {
            GuideMgr.getIns().show(GuideKey.HuaShengSkillIcon, this._view.huashen, Handler.alloc(this, this.onClickHuashenSkillIcon));//化神指引
        }

        private onClickHuashenSkillIcon(): void {
            this.onClickHuashen();
            GuideMgr.getIns().clear(GuideKey.HuaShengSkillIcon);//清除指引
        }

        private showTaskGuide(): void {
            GuideMgr.getIns().show(GuideKey.Task, this._view.grp_task, Handler.alloc(this, this.onClickTask));//任务指引
            GuideMgr.getIns().show(GuideKey.TaskClick, this._view.grp_task, Handler.alloc(this, this.onClickTask));//任务指引
        }

        private clearAllGuide(): void {
            GuideMgr.getIns().clear(GuideKey.Task);//任务界面隐藏时，清除任务指引
            GuideMgr.getIns().clear(GuideKey.TaskClick);//任务界面隐藏时，清除任务指引
            GuideMgr.getIns().clear(GuideKey.Pass);//清除任务指引
        }

        private clearMoreGuide(): void {
            GuideMgr.getIns().clear(GuideKey.More);//清除更多指引
        }

        private clearFuncGuide(): void {
            this._ins.clearGuide();//清除指引;//清除功能指引
        }

        //触发指定指引
        private onGuideTrigger(n: GameNT): void {
            let key: number = n.body;
            if (key == GuideKey.Tips) {
                this.showTipsGuide();
            }
        }

        //任务提示指引
        private showTipsGuide(): void {
            if (this._isShow) {
                GuideMgr.getIns().show(GuideKey.Tips, this._view.grp_task);//提示指引
            } else {
                GuideMgr.getIns().clear(GuideKey.Tips);
            }
        }

        //更多指引
        private showMoreGuide(): void {
            if (this._isShow && this._moreStatus == MainMoreStatus.More) {
                GuideMgr.getIns().show(GuideKey.More, this._view.btn_more, Handler.alloc(this, this.onClickMore));//任务指引
            } else {
                this.clearMoreGuide();
            }
            if (this._isShow && this._view.gr_more.visible && this._view.scr_icon.visible) {
                //供奉入口
                this._ins.showGuide();//管理器处理指引
            } else {
                this.clearFuncGuide();//清除指引
            }
        }

        /********************资源找回**********************/
        private onClickFind(): void {
            ViewMgr.getIns().showView(ModName.Main, MainViewType.RewardFindMain);
        }

        private updateFind(): void {
            let isShow = this._mainProxy.isFindShow();
            this._view.btn_find.visible = this._view.btn_find.redPoint.visible = isShow;//显示入口的时候就有红点
            this.setBtnShow(this._view.btn_find);
        }

        private setBtnShow(btn: game.mod.Btn): void {
            if (btn.visible) {
                //显示时加入
                if (!btn.parent) {
                    this._view.grp_btn.addChild(btn);
                }
            } else {
                //隐藏时移除
                if (btn.parent) {
                    btn.parent.removeChild(btn);
                }
            }
            this.updateBtnPos();
        }

        private updateOffline(): void {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Offline)) {
                this._view.btn_offline.visible = true;
            } else {
                this._view.btn_offline.visible = false;
            }
        }

        //刷新邮件、聊天、邀请、资源找回按钮位置
        private updateBtnPos(): void {
            let btnGap = 6;//按钮间距
            let btnWidth = 64;//按钮宽度
            let startPos = this._view.btn_mail.x - this._view.btn_mail.anchorOffsetX;//按钮起始位置
            let isMailShow = this._view.btn_mail.visible;
            let btnPos = isMailShow ? startPos + btnWidth + btnGap : startPos;//按钮位置
            let btnNum = this._view.grp_btn.numChildren;//btn组的按钮数量
            if (btnNum) {
                this._view.grp_btn.x = btnPos;
                btnPos += btnNum * btnWidth + (btnNum - 1) * btnGap;
            }
            let isChatShow = this._view.btn_chat.visible;
            if (isChatShow) {
                this._view.btn_chat.x = btnPos + this._view.btn_chat.anchorOffsetX;
            }
        }

        /********************化神**********************/
        protected onSurfaceInfoUpdate(n: GameNT): void {
            let type: number = n.body;
            if (type == ConfigHead.Huashen) {
                //更新化神
                this.updateHuashen();
            }
        }

        //化神变身结束时间修改
        protected onSceneHuashenTime(n: GameNT): void {
            let totalTime = this._surfaceProxy.huashenTime;
            if (totalTime) {
                //开启变身
                let curTime = TimeMgr.time.serverTimeSecond;
                this._huashenStartTime = curTime;//记录开时变身的时间
                this._startHuashenBecome = true;
                this.updateHuashenVal();
                TimeMgr.addUpdateItem(this, 1000);
            } else {
                //重新开启蓄能
                this.setHuashenOpen(false);
                this.startHuashenVal();
            }
        }


        //场景变化
        private onSceneEnter(n: GameNT): void {
            this._startHuashenBecome = false;
            this.setHuashenOpen(false);
        }

        //场景化神变身数据变更
        protected onSceneHuashenId(n: GameNT): void {
            if (!this._isAct) {
                return;
            }
            let curId: number = n.body;
            console.info("场景化神刷新变更：", curId);
            let ret = !!curId;
            if (this._huashenBecoming) {
                this._startHuashenBecome = false;
                this.setHuashenOpen(false);
                this.startHuashenVal();
            }
            this._huashenBecoming = ret;//存在ID时，则表示变身中
            SkillData.setHuashenXing(this._huashenBecoming);
            // if(!this._huashenBecoming){
            //     //变身结束,重新蓄能
            //     this.startHuashenVal();
            // }
            this._surfaceProxy.setHuashenIds(curId);//场景化神ID变化时设置化神数据
            this.updateHuashenIcon();//更新化神图标
        }

        private onClickHuashen(): void {
            this.clickHuashenSkill(true, true);
        }

        private clickHuashenSkill(jump?: boolean, showTips?: boolean): void {
            if (this._isAct || this._isTaskTrigger) {
                //1、没有攻击目标时提示暂无攻击目标，不做其他表现
                let targetId = SceneUtil.getAttackTargetId(showTips);
                if (!targetId) {
                    return;
                }
                //2、能量不足时提示能量点不足，不做其他表现
                if (this._startHuashenVal) {
                    if (showTips) {
                        PromptBox.getIns().show("能量点不足");
                    }
                    return;
                }
                let huashenIds = this._surfaceProxy.huashenIds;
                if (huashenIds && huashenIds.length > 1) {
                    //如果上阵多个化神，则打开轮盘，再次点击化神按钮时，则关闭轮盘
                    this.setHuashenOpen(!this._huashenOpen);
                }
                if (this._huashenBecoming) {
                    //已经处于变身状态，则返回
                    return;
                }
                //激活后化神变身
                let id = huashenIds[0] || this._huashenId;
                this.huashenUseSkill(id, targetId);
            } else {
                if (jump) {
                    ViewMgr.getIns().showView(ModName.More, MoreViewType.HuashenMain);
                }
            }
        }

        //化神变身使用技能
        private huashenUseSkill(id: number, targetId: Long): void {
            let huashenIds = this._surfaceProxy.huashenIds;
            this._huashenPos = huashenIds.indexOf(id);
            let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, id);
            SceneUtil.useSkill(cfg.skill, targetId);
            this._huashenSkillTime = TimeMgr.time.serverTimeSecond;
            //更新技能CD
            this.updateHuashenSkill();
            console.info("客户端使用化神", cfg.name, "的技能：", cfg.skill);
        }

        private updateHuashen(): void {
            let isShow = ViewMgr.getIns().checkBtnShow(OpenIdx.Huashen);
            // TODO:ID1011330需求屏蔽ID1011025
            this._view.grp_huashen.visible = isShow || this._isTaskTrigger;
            //this._view.grp_huashen.visible = isShow;
            if (!isShow && !this._isTaskTrigger) {
                return;
            }

            let isAct = this._surfaceProxy.isDefaultAct(ConfigHead.Huashen);
            if (isAct || this._isTaskTrigger) {
                //已激活
                this._view.huashen.img_huashen_lock.visible = false;
                // TODO:ID1011330需求屏蔽ID1011025
                //this._view.huashen.visible = true;

                if (this._isTaskTrigger) {
                    this.updateHuashenVal(true);
                } else if (!this._isAct) {
                    //如果已经开启化神，则开始蓄能
                    this.startHuashenVal();
                }
                this.updateHuashenIcon();
            } else {
                //未激活
                this._view.huashen.img_huashen_lock.visible = true;
                this._view.huashen.img_huashen.source = "huashen_icon";
                this._view.huashen.img_huashen_val.visible = false;
                this._view.huashen.lab_huashen_val.text = "";
                // TODO:ID1011330需求屏蔽ID1011025
                //this._view.huashen.visible = false;
            }
            this._isAct = isAct;
        }

        //更新化神图标
        private updateHuashenIcon(): void {
            let huashenIds = this._surfaceProxy.huashenIds;
            let id = huashenIds[0] || this._huashenId;
            let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, id);
            this._view.huashen.img_huashen.source = cfg.icon;

            if (huashenIds.length <= 1) {
                return;
            }
            //展示轮盘
            for (let i = 0; i < this._huashenList.length; ++i) {
                let item = this._huashenList[i];
                let pos = i + 1;//下标
                let id = huashenIds.length > pos ? huashenIds[pos] : null;
                item.setData(id);
            }
        }

        //开启化神蓄能
        private startHuashenVal(): void {
            this._view.huashen.group_eft.removeChildren();
            this._huashenVal = 0;//进度置0
            this._startHuashenVal = true;//开启蓄能
            this.updateHuashenVal();
            TimeMgr.addUpdateItem(this, 1000);
        }

        //计算化神蓄能
        private calcHuashenVal(): void {
            if (!this._startHuashenVal) {
                return;
            }
            //当前能量条 += [每秒基础能量回复值 *（1+buff系数） + buff数值]
            // buff系数 == theGod_resume_rate/10000
            // buff数值 == theGod_resume + （每5秒：theGod_resume_5）
            let baseCfg: ParamConfig = GameConfig.getParamConfigById("theGod_Resume");
            let baseVal = baseCfg && baseCfg.value;
            let attr = this._mainProxy.huashenAttr;
            let buffRate = attr && attr.add_damage_rate ? attr.add_damage_rate / 10000 : 0;
            let buffVal = attr && attr.theGod_resume ? attr.theGod_resume : 0;
            this._huashenTick++;//累加
            if (this._huashenTick >= this.theGod_resume_5) {
                //每5秒累加
                buffVal += attr && attr.theGod_resume_5 ? attr.theGod_resume_5 : 0;
                this._huashenTick = 0;
            }
            this._huashenVal += baseVal * (1 + buffRate) + buffVal;

            let maxCfg: ParamConfig = GameConfig.getParamConfigById("theGod_MaxEnergy");
            let maxVal = maxCfg && maxCfg.value;
            if (this._huashenVal >= maxVal) {
                //蓄能已满
                this._view.huashen.group_eft.removeChildren();
                this.addEftByParent(UIEftSrc.HuaShenJiNeng, this._view.huashen.group_eft);
                this._startHuashenVal = false;
                this._view.huashen.img_huashen_val.mask = null;
                this._sp.graphics.clear();
                if (!gso.autoHuashen) {
                    TimeMgr.removeUpdateItem(this);//没有勾选自动化神才移除定时器
                }
            }
        }

        //更新化神进度表现
        private updateHuashenVal(isFullness: boolean = false): void {

            if (isFullness) {
                //直接续满能
                this._view.huashen.lab_huashen_val.text = "";
                this.updateHuashenValBar(true);
                return;
            }

            this._view.huashen.img_huashen_val.visible = true;
            if (this._startHuashenVal) {
                this._view.huashen.lab_huashen_val.text = "";
                //蓄能表现
                this.updateHuashenValBar();
            }
            if (this._startHuashenBecome) {
                this.updateHuashenBecomeBar();
            }
        }

        //刷新蓄能进度，进度初始为空，顺时针递增
        private updateHuashenValBar(isFullness: boolean = false): void {
            let sp = this._sp;
            sp.graphics.clear();
            let radius: number = this.sp_radius;//半径
            let maxCfg: ParamConfig = GameConfig.getParamConfigById("theGod_MaxEnergy");
            let maxVal = maxCfg && maxCfg.value;
            let startPos = -90;//圆弧的起始点， x轴方向开始计算，单位以弧度表示。
            let angle: number = 0;
            if (isFullness) {
                angle = 360 + startPos;
            } else {
                angle = this._huashenVal * 360 / maxVal + startPos;
            }
            sp.graphics.beginFill(0x0, 1);
            sp.graphics.moveTo(0, 0);
            sp.graphics.lineTo(0, radius);
            sp.graphics.drawArc(0, 0, radius, startPos * Math.PI / 180, angle * Math.PI / 180);
            sp.graphics.lineTo(0, 0);
            sp.graphics.endFill();
            this._view.huashen.img_huashen_val.mask = sp;
        }

        //刷新变身进度，进度初始为满，顺时针递减
        private updateHuashenBecomeBar(): void {
            let totalTime = this._surfaceProxy.huashenTime;
            let curTime = TimeMgr.time.serverTimeSecond;
            let passTime = curTime - this._huashenStartTime;//已经经过的时间
            let leftTime = totalTime - passTime;
            this._view.huashen.lab_huashen_val.text = leftTime + "";

            let sp = this._sp;
            sp.graphics.clear();
            if (leftTime <= 0) {
                //变身结束后，默认显示主战化神，关闭轮盘，重新开始蓄能，不移除定时器
                this._startHuashenBecome = false;
                this._surfaceProxy.resetHuashenIds();
                this.updateHuashenIcon();
                this.setHuashenOpen(false);
                this.startHuashenVal();
                return;
            }
            if (passTime <= 0) {
                //0的时候不显示
                return;
            }
            let radius: number = this.sp_radius;//半径
            let startPos = -90;//圆弧的起始点， x轴方向开始计算，单位以弧度表示。
            let angle: number = passTime * 360 / totalTime + startPos;//
            sp.graphics.beginFill(0x0, 1);
            sp.graphics.moveTo(0, 0);
            sp.graphics.lineTo(0, radius);
            sp.graphics.drawArc(0, 0, radius, startPos * Math.PI / 180, angle * Math.PI / 180, true);
            sp.graphics.lineTo(0, 0);
            sp.graphics.endFill();
            this._view.huashen.img_huashen_val.mask = sp;
        }

        //更新化神轮盘
        private setHuashenOpen(open: boolean): void {
            this._huashenOpen = open;
            this._view.grp_huashen_open.visible = this._huashenOpen;
            //更新技能CD
            this.updateHuashenSkill();
        }

        private onClickHuashenItem(e: TouchEvent): void {
            let clickBtn = e.target;
            for (let item of this._huashenList) {
                let btn = item.btn_huashen;
                if (btn != clickBtn) {
                    continue;
                }
                let id = item.data;
                if (!id) {
                    //出战界面
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.HuashenBattleMain);
                    return;
                }
                this.clickHuashenItemSkill(id, true);
                return;
            }
        }

        private clickHuashenItemSkill(id: number, showTips?: boolean): void {
            //1、没有攻击目标时提示暂无攻击目标，不做其他表现
            let targetId = SceneUtil.getAttackTargetId(showTips);
            if (!targetId) {
                return;
            }
            if (showTips) {
                //showTips才做判断
                //2、在冷却时间内，则提示技能冷却中
                let cd = this.getHuashenSkillCd();
                if (cd >= 0) {
                    PromptBox.getIns().show("技能冷却中");
                    return;
                }
            }
            this.huashenUseSkill(id, targetId);
        }

        //更新化神技能CD
        private updateHuashenSkill(): void {
            if (!this._huashenOpen) {
                return;
            }
            if (!this._huashenSkillTime) {
                return;
            }
            let cd = this.getHuashenSkillCd();
            for (let item of this._huashenList) {
                item.updateCd(cd, this._huashenMaxCd);
            }
        }

        private getHuashenSkillCd(): number {
            this._view.huashen.group_eft.removeChildren();
            let curTime = TimeMgr.time.serverTimeSecond;
            let cd = this._huashenMaxCd + this._huashenSkillTime - curTime;
            return cd;
        }

        //自动释放化神
        private autoHuashen(): void {
            if (!gso.autoHuashen || this._isTaskTrigger) {
                return;//未勾选自动幻化
            }
            let isShow = SceneUtil.isShowMain();
            if (isShow && !this._huashenBecoming) {
                //玩家手动变身后如果有多个激活化神可以自动轮流切换
                return;//挂机场景时返回
            }
            //处于变身状态时
            let cd = this.getHuashenSkillCd();
            if (cd >= 0) {
                //在冷却时间内则返回
                return;
            }
            if (!this._huashenBecoming) {
                //不处于变身状态时，todo，待确定
                this.clickHuashenSkill();
                return;
            }
            let huashenIds = this._surfaceProxy.huashenIds;
            if (!huashenIds || huashenIds.length <= 1) {
                return;
            }
            this._huashenPos++;//累加

            if (this._huashenPos >= huashenIds.length) {
                this._huashenPos = 0;
            }
            let id = huashenIds[this._huashenPos];
            this.clickHuashenItemSkill(id);
        }

        update(time: base.Time) {
            //其他系统用update时候需要注意下，这里是化神专用的
            this.calcHuashenVal();
            this.updateHuashenVal();
            this.updateHuashenSkill();
            this.autoHuashen();
        }


        /********************Boss复活提示**********************/
        private onBossRevive(n: GameNT): void {
            let data: BossReviveData = n.body;
            this._bossData = data;
            this.setGrpBoss(this._isShow);//显示主界面UI时候才提示
            this.updateGrpBoss();
        }

        private onClickGo(): void {
            this.setGrpBoss(false);//点击前往，隐藏boss提示
            if (!this._bossData) {
                return;
            }
            let jumpId = this._bossData.jumpId;
            ViewMgr.getIns().showViewByID(jumpId);
        }

        private onClickClose(): void {
            this.setGrpBoss(false);//关闭时候，隐藏boss提示
        }

        private setGrpBoss(val: boolean): void {
            this._view.grp_boss.visible = val;
        }

        private updateGrpBoss(): void {
            if (!this._bossData) {
                return;
            }
            let nameStr = this._bossData.nameStr;
            this._view.lab_name.text = nameStr;

            let index = this._bossData.index;
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, index);
            this._view.img_icon.source = monsterCfg.res_id;
        }

        //点击战队
        private onClickZhandui(): void {
            let zhanduiProxy: IZhanduiProxy = getProxy(ModName.More, ProxyType.Zhandui);
            if (zhanduiProxy.haveTeam()) {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.ZhanduiMain);
            } else {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.ZhanduiBuildMain, null, false);
            }
        }

        //-------------------物品更新------------------------
        private onUpdateByProp(n: GameNT): void {
            let prop: PropData = n.body;
            if (!this._easyUse) {
                return;
            }
            if (this._easyUse.type != prop.type) {
                return;
            }
            if (this._easyUse.index != prop.index) {
                return;
            }
            if (this._easyUse.type == ConfigHead.Equip || !prop.count) {
                this.onCloseUse();
                return;
            }
            this._easyUse = prop;
            this.onShowUse(prop);
        }

        //-------------------更多按钮红点处理start------------------------
        private _btnMoreHintTypes: string[];

        //更多按钮的红点路径
        private getBtnMoreHintTypes(): string[] {
            if (this._btnMoreHintTypes) {
                return this._btnMoreHintTypes;
            }
            let hintTypes: string[] = [];
            for (let item of this._btnData) {
                if (item.m && hintTypes.indexOf(item.m) < 0) {
                    hintTypes.push(item.m);
                }
                if (item.hintMsg && hintTypes.indexOf(item.hintMsg[0]) < 0) {
                    hintTypes.push(item.hintMsg[0]);
                }
                if (item.hintMsgList) {
                    for (let a of item.hintMsgList) {
                        if (hintTypes.indexOf(a[0])) {
                            hintTypes.push(a[0]);
                        }
                    }
                }
            }
            this._btnMoreHintTypes = hintTypes;
            return hintTypes;
        }

        //更多按钮红点
        private getBtnMoreHint(): boolean {
            let hintTypes: string[] = this.getBtnMoreHintTypes();
            let hint = false;
            for (let type of hintTypes) {
                if (HintMgr.getHint([type])) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        //更多按钮红点
        private updateBtnMoreHint(): void {
            if (this._moreStatus == 0) {
                this._view.btn_more.setHint(this.getBtnMoreHint());
            } else {
                this._view.btn_more.setHint(false);
            }
        }
        //-------------------更多按钮红点处理end------------------------


    }
}
