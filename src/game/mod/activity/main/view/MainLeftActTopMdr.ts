namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Back = base.Back;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    export class MainLeftActTopMdr extends EffectMdrBase implements UpdateItem {
        private _view: MainLeftActTopView = this.mark("_view", MainLeftActTopView);
        private _proxy: ActivityProxy;
        private _model: ActivityModel;
        private _flyRankProxy: FlyRankProxy;
        private _chatProxy: IChatProxy;

        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData: IBtnIconData[];
        /**按钮管理器*/
        private _ins: BtnIconMgr;
        /**冲榜按钮管理器*/
        private _ins_big: BtnIconMgr;
        private _btnData_big: IBtnIconData[];

        //原始位置
        private _listYOri: number = 0;
        private _listYOri_big: number = 0;
        private _isShow: boolean;//显示活动
        private _isOnTween = false;//是否正在缓动按钮群

        /**新服冲榜结束时间 */
        private _endTime: number;
        /**新服冲榜计时 一分钟请求一次排行榜 */
        private _time: number = 0;

        private _itemList: ArrayCollection;//主界面聊天用
        private _isNoticeShowing: boolean = false;//是否正在公吿
        private readonly NOTICE_TIME: number = 10; //公告滚动速度
        private readonly NOTICE_SHOW: number = 2000; //公告暂停时间

        /**入口手动赋值就行了，其他的不用管*/
        private initBtnData(): void {
            //todo，特殊显示规则，例如：关闭充值时不显示，未首充时不显示，领完奖励后不显示，个别渠道不显示等等
            //todo，注意，如果以Main为入口的，Main也要做红点，如[ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn1]
            //todo，缺少移除
            this._btnData = [
                {id: BtnIconId.Store, m: ModName.Store, v: StoreViewType.StoreMain, showBack: true},
                {id: BtnIconId.SignGift, m: ModName.Activity, v: MainActivityViewType.SignGift},
                {
                    id: BtnIconId.Summon,
                    m: ModName.Activity,
                    v: MainActivityViewType.SummonMain,
                    showBack: true,
                    guideKey: GuideKey.Summon
                },
                {
                    id: BtnIconId.PowerTurntable,
                    m: ModName.Activity,
                    v: MainActivityViewType.Lottery,
                    handlerMsg: ActivityEvent.ON_UPDATE_LOTTERY_INFO,
                    handler: Handler.alloc(this, this.checkLottery)
                },
                {
                    id: BtnIconId.RoleRing,
                    m: ModName.Activity,
                    v: MainActivityViewType.RoleRingMain,
                    hintMsg: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType01],
                    hintType: BtnIconHintType.FirstCommon,
                    // effType: BtnIconEffType.FirstCommon,
                    showBack: true
                },
                {id: BtnIconId.Zcx, m: ModName.Activity, v: MainActivityViewType.ZcxMain, showBack: true},
                {id: BtnIconId.KillBoss, m: ModName.Activity, v: MainActivityViewType.KillBoss, showBack: true},
                {
                    id: BtnIconId.ExchangeShop,
                    m: ModName.Activity,
                    v: MainActivityViewType.ExchangeShop,
                    hintType: BtnIconHintType.None,//永不展示红点
                    showBack: true
                },
                {
                    id: BtnIconId.WonderfulAct,
                    m: ModName.Activity,
                    v: MainActivityViewType.WonderfulAct,
                    showBack: true,
                    showTime: true,
                    handler: Handler.alloc(this, this.checkWonderful)
                },
                {
                    id: BtnIconId.Yhcs,
                    m: ModName.Activity,
                    v: MainActivityViewType.Yhcs,
                    showBack: true,
                    handlerMsg: ActivityEvent.ON_UPDATE_YHCS_INFO,
                    handler: Handler.alloc(this, this.checkYhcs)
                },
                // {
                //     id: BtnIconId.XianlvGift,
                //     m: ModName.Activity,
                //     v: MainActivityViewType.XianlvGift
                // },
                {
                    id: BtnIconId.Chengshen,
                    m: ModName.Activity,
                    v: MainActivityViewType.ChengshenMain,
                    showBack: true
                    // handlerMsg: ActivityEvent.ON_UPDATE_CHENGSHEN_REWARD,
                    // handler: Handler.alloc(this, this.checkChengshen)
                },
                {
                    id: BtnIconId.Tiandilu,
                    m: ModName.God,
                    v: GodViewType.GodMain,
                    showBack: true,
                    isHide: true
                },
                {
                    id: BtnIconId.XiuxianNvpu,
                    m: ModName.Role,
                    v: NewRoleViewType.XiuxianNvpuBuy,
                    hintType: BtnIconHintType.Once
                },
                {
                    id: BtnIconId.Xiandi,
                    // m: ModName.More,
                    // v: MoreViewType.Xiandi,
                    m: null,
                    v: null,
                    showBack: true,
                    isHide: true,
                    clickHandler: Handler.alloc(this, this.onClickXiandi),
                    hintMsg: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xiandi]
                }
                //todo:不要写handlerMsg事件
            ];

            //注册中控活动
            let list = this._proxy.getTopEntranceBtnList();
            this._btnData = this._btnData.concat(list);
        }

        private initBigBtnData(): void {
            //注册冲榜活动
            this._btnData_big = this._proxy.getBigEntranceBtnList();
        }

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            let self = this;
            self._view.left = 0;
            self._view.touchEnabled = false;
            self._proxy = this.retProxy(ProxyType.Activity);
            self._model = self._proxy.getModel();
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);
            this._chatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);

            this._ins = new BtnIconMgr(this._view.group_top1);
            BtnIconMgr._insTop = this._ins;
            if (DEBUG && window) {
                window['BtnIconMgrTop'] = this._ins;
            }
            this._ins_big = new BtnIconMgr(this._view.group_big);
            BtnIconMgr._insBig = this._ins_big;

            this._itemList = new ArrayCollection();
            this._view.list_chat.itemRenderer = MainChatRender;
            this._view.list_chat.dataProvider = this._itemList;
        }

        // ==================================活动图标收缩==================================
        private hideActivity() {
            if (this._isOnTween) {
                return;
            }
            this._isOnTween = true;
            this.setIsShow(!this._isShow);
        }

        private setIsShow(isShow: boolean): void {
            this._isShow = isShow;
            this.btnTween();
        }

        private btnTween() {
            let _isShow = this._isShow;
            this._view.btn_hide.scaleX = _isShow ? -1 : 1;
            if (this._listYOri == 0) {
                this._listYOri = -this._view.group_top1.height - 120;
            }

            let _posY1: number = this._listYOri;
            let _posY2: number = 60;//默认位置
            Tween.remove(this._view.group_top1);
            Tween.get(this._view.group_top1)
                .to({y: _posY1}, 500, null, Back.easeIn)
                .exec(Handler.alloc(this, () => {
                    //收缩后刷新活动显示
                    this.dealBtnIconList();
                }))
                .to({y: _posY2}, 500, null, Back.easeOut);

            if (this._listYOri_big == 0) {
                this._listYOri_big = -this._view.group_big.height - 120;
            }
            let _posY1_big: number = this._listYOri_big;
            let _posY2_big: number = this.getGroupBigY();//默认位置
            Tween.remove(this._view.group_big);
            Tween.get(this._view.group_big)
                .to({y: _posY1_big}, 500, null, Back.easeIn)
                .exec(Handler.alloc(this, () => {
                    //收缩后刷新活动显示
                    this.dealBigBtnIconList();
                }))
                .to({y: _posY2_big}, 500, null, Back.easeOut);

            let _posY1_btn: number = -256;
            let _posY2_btn: number = 78;//默认位置
            Tween.remove(this._view.btn);
            Tween.get(this._view.btn)
                .to({y: _posY1_btn}, 500, null, Back.easeIn)
                .exec(Handler.alloc(this, () => {
                    // this._view.btn.visible = _isShow
                    this.onCheckPunshListBtn();
                }))
                .to({y: _posY2_btn}, 500, null, Back.easeOut)
                .exec(Handler.alloc(this, () => {
                    this._isOnTween = false;
                }));
        }

        // ==================================活动图标收缩 end==================================

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_hide, TouchEvent.TOUCH_TAP, this.hideActivity);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickPunshList);
            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_TAP, this.onClickChatBtn);
            addEventListener(this._view.img_chat, TouchEvent.TOUCH_TAP, this.onClickChat);
            addEventListener(this._view.list_chat, TouchEvent.TOUCH_TAP, this.onClickChat);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);//红点更新
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
            this.onNt(MainEvent.ON_OPEN_FUNC_DELETE, this.onOpenFuncDelete, this);//功能关闭
            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);//场景切换
            this.onNt(PassEvent.CHALLENGE_HANGUP_BOSS, this.updateShow, this);//挑战boss

            this.onNt(GuideEvent.ON_GUIDE_UPDATE, this.showGuide, this);//指引

            this.onNt(ActivityEvent.ON_ACTIVITY_INIT, this.onActivityInit, this);//中控活动初始化
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityInit, this);//中控活动结束
            this.onNt(ActivityEvent.ON_ACTIVITY_ENTRANCE_UPDATE, this.onActivityEntranceUpdate, this);//中控活动入口更新

            this.onNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, this.onRankUpdate, this);
            this.onNt(RankEvent.ON_RANK_BASE_INFO_UPDATE, this.onRankUpdate, this);

            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO, this.onUpdatePunshList, this);

            this.onNt(ChatEvent.ON_CHAT_UPDATE, this.updateNotice, this);//聊天信息变更时刷新
            this.onNt(ChatEvent.ON_CHAT_PRIVATE_UPDATE, this.updateChatList, this);//私聊信息变更时刷新
        }

        protected onShow(): void {
            super.onShow();
            this.initBtnData();
            this.initBigBtnData();

            this.updateShow();
            this.setIsShow(true);//默认显示按钮

            this.onUpdatePunshList();

            this.onUpdateTimeOpen();

            this.showGuide();
            this.updateNotice();
        }

        /** 切换场景 */
        private onSceneChange() {
            this.updateShow();
        }

        private updateShow(): void {
            let isShow = SceneUtil.isShowMain();
            this._view.top = isShow ? 120 : 0;
            this.setIsShow(isShow);//挂机场景，默认不收缩，其他的则收缩
        }

        //处理按钮列表
        private dealBtnIconList(): void {
            this._ins.dealBtnIconList(this._btnData, this._isShow);

            //开启监听按钮额外判断
            let btnNtMap = this._ins._btnNtMap;
            for (let key in btnNtMap) {
                this.onNt(key, this.dealSingleBtnIconByNt, this);
            }

            //开启按钮定时器
            if (Object.keys(this._ins._btnTimeMap).length) {
                // if (!TimeMgr.hasUpdateItem(this)) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
                // }
            } else {
                // if (TimeMgr.hasUpdateItem(this)) {
                //     TimeMgr.removeUpdateItem(this);
                // }
            }
        }

        //处理冲榜按钮列表
        private dealBigBtnIconList(): void {
            this._ins_big.dealBtnIconList(this._btnData_big, this._isShow, true);
            //开启按钮定时器
            if (Object.keys(this._ins_big._btnTimeMap).length) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        //处理单个按钮
        private dealSingleBtnIcon(id: BtnIconId): void {
            let isAdd = this._ins.dealSingleBtnIcon(id, this._isShow);

            //开启按钮定时器
            let timeMap = this._ins._btnTimeMap;
            if (isAdd && Object.keys(timeMap).length) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }

            // if (!isAdd && TimeMgr.hasUpdateItem(this)) {
            //     if (!Object.keys(timeMap).length) {
            //         TimeMgr.removeUpdateItem(this);
            //     }
            // }
        }

        //处理单个冲榜按钮
        private dealSingleBigBtnIcon(id: BtnIconId): void {
            let isAdd = this._ins_big.dealSingleBtnIcon(id, this._isShow, true);
            //开启按钮定时器
            let timeMap = this._ins_big._btnTimeMap;
            if (isAdd && Object.keys(timeMap).length) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
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

        protected onHide(): void {
            Tween.remove(this._view.group_top1);
            Tween.remove(this._view.group_big);
            Tween.remove(this._view.lab_notice);
            Tween.remove(this._view.group_chat);
            this._view.group_top1.removeChildren();
            this._view.group_big.removeChildren();
            TimeMgr.removeUpdateItem(this);
            this._btnData = [];
            this._btnData_big = [];
            this._ins.clear();
            this._ins_big.clear();
            super.onHide();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let hint = data.value;

            this.updateBtnHint(this._ins._showBtnMap, data);
            this.updateBtnHint(this._ins_big._showBtnMap, data);
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.PunshList])) {
                this._view.btn.setHint(hint);
            }
        }

        private updateBtnHint(showBtnMap: object, data: IHintData): void {
            let hint = data.value;
            for (let k in showBtnMap) {
                let btnIcon = showBtnMap[k];
                let btnData = btnIcon ? btnIcon.data : null;
                if (!btnData || !btnData.hintMsg || btnData.hintType == BtnIconHintType.None || btnData.hintType == BtnIconHintType.Once) {
                    continue;
                }
                let type = HintMgr.getType(btnData.hintMsg);
                if (type != data.node) {
                    continue;
                }
                if (!hint && btnData.hintType == BtnIconHintType.FirstCommon) {
                    hint = BtnIconBase._hintCache[btnData.id] == undefined;
                }
                btnIcon.setHint(hint);
                break;
            }
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let isOpen = false;
            let addIdx: number[] = n.body;
            for (let openIdx of addIdx) {
                if (openIdx == OpenIdx.PunshList) {
                    this.onUpdatePunshList();
                    continue;
                } else if (openIdx == OpenIdx.Chat) {
                    this.updateChat();
                    continue;
                } else if (openIdx == OpenIdx.ChatSystem) {
                    this.updateNotice();
                    continue;
                }
                if (this._ins._btnDataMap[openIdx]) {
                    this.dealSingleBtnIcon(openIdx);
                    isOpen = true;
                    continue;
                }
                //中控活动存的是活动ID
                let idList = this._ins._btnOpenIdxMap[openIdx];
                if (idList && idList.length) {
                    for (let idx of idList) {
                        this.dealSingleBtnIcon(idx);
                        isOpen = true;
                    }
                }
                //中控活动存的是活动ID
                let idList_big = this._ins_big._btnOpenIdxMap[openIdx];
                if (idList_big && idList_big.length) {
                    for (let idx of idList_big) {
                        this.dealSingleBigBtnIcon(idx);
                        isOpen = true;
                    }
                }
            }
            if (isOpen) {
                this.showGuide();//功能开启时候，执行下指引，防止任务指引执行的时候功能还未开启
            }
        }

        /**功能关闭移除按钮*/
        private onOpenFuncDelete(n: GameNT): void {
            let delIdx: number[] = n.body;
            for (let openIdx of delIdx) {
                if (this._ins._showBtnMap[openIdx]) {
                    this.dealSingleBtnIcon(openIdx);//调用统一的接口，做一些处理
                    continue;
                }
                //中控活动存的是活动ID
                let idList = this._ins._btnOpenIdxMap[openIdx];
                if (idList && idList.length) {
                    for (let idx of idList) {
                        this.dealSingleBtnIcon(idx);
                    }
                }
                //中控活动存的是活动ID
                let idList_big = this._ins_big._btnOpenIdxMap[openIdx];
                if (idList_big && idList_big.length) {
                    for (let idx of idList_big) {
                        this.dealSingleBigBtnIcon(idx);
                    }
                }
            }
        }

        //精彩活动的倒计时文本
        private getWonderfulActTimeStr(): number | string {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct)) {
                return "";
            }
            let proxy: WonderfulActProxy = getProxy(ModName.Activity, ProxyType.WonderfulAct);
            let canGet = proxy.canGetXiannvReward();
            if (canGet) {
                return getLanById(LanDef.battle_cue45);
            }
            return proxy.getXiannvNextTimeSec();
        }

        update(time: base.Time) {
            let timeMap = this._ins._btnTimeMap;
            let keys = Object.keys(timeMap);
            for (let key of keys) {
                let btnIcon: BtnIconBase = timeMap[key];
                if (!btnIcon || !this._ins._showBtnMap[key]) {
                    continue;
                }
                if (btnIcon.id == BtnIconId.WonderfulAct) {
                    let timeStr = this.getWonderfulActTimeStr();
                    if (timeStr && typeof timeStr == 'string') {
                        btnIcon.updateTime(timeStr);
                    } else if (timeStr && typeof timeStr == 'number') {
                        let leftTime = timeStr - TimeMgr.time.serverTimeSecond;
                        let timeTxt = TimeUtil.formatSecond(leftTime, leftTime >= Second.Hour ? 'HH时mm分' : 'mm分ss秒');
                        btnIcon.updateTime(timeTxt);
                    }
                } else {
                    if (!this._ins.checkBtnTime(btnIcon.data)) {
                        this.dealSingleBtnIcon(btnIcon.id);
                        continue;
                    }
                    btnIcon.updateTime(); //todo,刷新榜一
                }
            }
            //冲榜排行
            let timeMap_big = this._ins_big._btnTimeMap;
            let keys_big = Object.keys(timeMap_big);
            for (let key of keys_big) {
                let btnIcon: BtnIconBase = timeMap_big[key];
                if (!btnIcon || !this._ins_big._showBtnMap[key]) {
                    continue;
                }
                btnIcon.updateTime();
                let paramInfo = btnIcon.data.param;
                let actInfo = paramInfo.actInfo;
                let nameStr = this._flyRankProxy.getFirstRankName(actInfo);
                btnIcon.labelDisplay.text = nameStr;
            }

            if (this._view.btn.visible && this._endTime) {
                let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                if (leftTime <= 0) {
                    this._view.btn.lab_time.text = getLanById(LanDef.battle_cue29);
                    return;
                }
                let timeStr = TimeUtil.formatSecond(leftTime, 'd天H时', true);
                this._view.btn.lab_time.text = timeStr;

                if (!this._time || time.time - this._time > Second.Minute * 1000) {
                    this._time = time.time;
                    RankUtil.c2s_rank_req_rank(ActivityUtil.getType());
                }
            }
        }

        private onRankUpdate(): void {
            if (this._view.btn.visible && this._endTime) {
                this.onUpdateFirst();
            }
        }

        /**浴火重生 */
        private checkYhcs(): boolean {
            let proxy: YhcsProxy = getProxy(ModName.Activity, ProxyType.Yhcs);
            return proxy && proxy.isOpen();
        }

        /**战力转盘 */
        private checkLottery(): boolean {
            let proxy: LotteryProxy = getProxy(ModName.Activity, ProxyType.Lottery);
            return proxy && proxy.isOpen();
        }

        /**精彩活动特殊开启判断 */
        private checkWonderful(): boolean {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Leijicharge)) {
                //累计充值开启的时候，判断活动是否有数据
                let proxy: WonderfulActProxy = getProxy(ModName.Activity, ProxyType.WonderfulAct);
                if (proxy.canOpen(ActivityType.Leijicharge)) {
                    return true;
                }
            }
            return ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct);//精彩活动-仙女送礼
        }

        /** */
        private onUpdateTimeOpen(): void {
            let _xiandi: IXiandiProxy = getProxy(ModName.More, ProxyType.Xiandi);
            if (!_xiandi.checkOpen()) {
                // return;
                let time = TimeUtil.getNextWeekTime() - Second.Day;
                HintMgr.addTimeEvent(TimeEventType.XiandiOpen, time, this, () => {
                    if (!_xiandi.checkOpen()) {
                        return;
                    }
                    _xiandi.c2s_xiandi_zhengba_oper(2, XiandiRankType.Person);
                });
            }
        }

        //-----------------------新服冲榜--------------------------

        private onCheckPunshListBtn(): void {
            let isShow = this.getPunshListBtnShow();
            this._view.btn.visible = isShow;
            this.removeEft();
            if (this._view.btn.visible) {
                this.addEftByParent(UIEftSrc.FeiShengBang, this._view.btn.gr_eff);
            }
        }

        private getPunshListBtnShow(): boolean {
            let type: number = ActivityUtil.getType();
            let isShow = this._isShow && !!type && ViewMgr.getIns().checkViewOpen(OpenIdx.PunshList);
            return isShow;
        }

        private onUpdatePunshList(): void {
            let proxy: PunshListProxy = getProxy(ModName.Activity, ProxyType.PunshList);
            let type: number = ActivityUtil.getType();
            this.onCheckPunshListBtn();
            this.updateGroupBigY();
            // if (this._view.btn.visible) {
            this._view.btn.setHint(HintMgr.getHint([ModName.Activity, MainActivityViewType.PunshList]));
            if (type) {
                this._view.btn.icon = `xinbangchongfu_img_${type}`;
            }
            // }
            this._endTime = proxy.getEndTime();
            if (this._endTime && this._endTime > TimeMgr.time.serverTimeSecond) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        private onClickPunshList(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.PunshList);
        }

        private onUpdateFirst(): void {
            let info = ActivityUtil.getRankFirst();
            this._view.btn.lab_name.text = info && info.base_info && info.base_info.name || "虚位以待";
        }

        private onClickXiandi(): void {
            let proxy: IXiandiProxy = getProxy(ModName.More, ProxyType.Xiandi);
            if (proxy.checkOpen()) {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.Xiandi);
            } else {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiShow);
            }
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            this._ins.showGuide();//管理器处理指引
        }

        //-------------------------------------中控活动------------------------------------------------
        private onActivityInit(): void {
            this.updateTopActivity();
            this.updateBigActivity();
        }

        private onActivityEntranceUpdate(n: GameNT): void {
            let typeList: number[] = n.body;
            if (typeList.indexOf(ActivityPosType.Top) > -1) {
                //刷新入口
                this.updateTopActivity();
            } else if (typeList.indexOf(ActivityPosType.Big) > -1) {
                //刷新冲榜入口
                this.updateBigActivity();
            }
        }

        private updateTopActivity(): void {
            this.initBtnData();
            this.dealBtnIconList();
        }

        private updateBigActivity(): void {
            this.initBigBtnData();
            this.dealBigBtnIconList();
        }

        //刷新长按钮位置
        private updateGroupBigY(): void {
            let y = this.getGroupBigY();
            this._view.group_big.y = y;
        }

        //获取长按钮的初始y坐标
        private getGroupBigY(): number {
            let isShow = this.getPunshListBtnShow();
            return isShow ? 220 : 78;
        }

        /**************************系统公吿***************************/
        private updateNotice(): void {
            let isShow = ViewMgr.getIns().checkBtnShow(OpenIdx.ChatSystem);
            if (isShow) {
                let chatList = this._chatProxy.systemList;
                if (!this._isNoticeShowing && chatList.length) {
                    //不在公告表现，且存在公告信息时
                    this.showNotice(chatList.shift());
                }
                isShow = this._isNoticeShowing;//正在表现的时候才显示公告
            }
            this.updateNoticeVisible(isShow);
        }

        private updateNoticeVisible(isShow: boolean): void {
            this._view.group_notice.visible = isShow;
            this.updateChat();
        }

        private showNotice(txt: string): void {
            this._isNoticeShowing = true;
            this._view.lab_notice.textFlow = TextUtil.parseHtml(txt);
            let startPos = this._view.scr_notice.width;//设置起始位置
            let endPos = -this._view.lab_notice.textWidth;//结束的位置
            this._view.lab_notice.x = startPos;
            let startTime = this.NOTICE_TIME * startPos;//X坐标移动到0所花的时间
            let endTime = this.NOTICE_TIME * Math.abs(endPos);
            Tween.remove(this._view.lab_notice);
            Tween.get(this._view.lab_notice)
                .to({x: 0}, startTime)
                .delay(this.NOTICE_SHOW)//显示2秒钟
                .to({x: endPos}, endTime)
                .exec(Handler.alloc(this, () => {
                    this._view.lab_notice.x = startPos;//重复播放两次
                }))
                .to({x: 0}, startTime)
                .delay(this.NOTICE_SHOW)//显示2秒钟
                .to({x: endPos}, endTime)
                .exec(Handler.alloc(this, this.checkNextNotice));
        }

        private checkNextNotice() {
            let chatList = this._chatProxy.systemList;
            if (!chatList.length) {
                this._isNoticeShowing = false;
                this.updateNoticeVisible(false);
                return;
            }
            this.showNotice(chatList.shift());
        }

        /**************************聊天***************************/
        private onClickChatBtn(): void {
            let openChat = this._chatProxy.openChat;
            this._chatProxy.openChat = !openChat;
            this.updateChatList();
        }

        private onClickChat(): void {
            //打开聊天界面
            ViewMgr.getIns().showViewByID(JumpIdx.Chat);
        }

        private updateChat(): void {
            //显示系统公告时候，不显示聊天
            let isShow = ViewMgr.getIns().checkBtnShow(OpenIdx.Chat) && !this._view.group_notice.visible;
            let chatList = this._chatProxy.mainChatList.concat();
            let haveChatInfo = chatList && chatList.length > 0;
            Tween.remove(this._view.group_chat);
            //【ID1011444】主界面聊天栏当无聊天消息记录时需要暂时隐藏，有聊天记录是重新显示。显示过程最好能做一个渐变效果，从无到有的透明度逐渐变化
            if (isShow && haveChatInfo) {
                if (!this._view.group_chat.visible) {
                    this._view.group_chat.visible = true;
                    this._view.group_chat.alpha = 0;
                    Tween.get(this._view.group_chat).to({alpha: 1}, 1500)
                        .exec(Handler.alloc(this, () => {
                            this._view.group_chat.visible = true;
                            this.updateChatList();
                        }));
                } else {
                    this._view.group_chat.visible = true;
                    this.updateChatList();
                }
            } else {
                this._view.group_chat.visible = false;
            }
        }

        private updateChatList(): void {
            if (!this._view.group_chat.visible) {
                return;
            }
            let openChat = this._chatProxy.openChat;
            this._view.btn_chat.scaleY = openChat ? -1 : 1;
            let chatList = this._chatProxy.mainChatList.concat();
            let infos = openChat || !chatList.length ? chatList : chatList.slice(chatList.length - 1, chatList.length);
            if (this._itemList.source.length) {
                this._itemList.replaceAll(infos);
            } else {
                this._itemList.source = infos;
            }
        }
    }
}