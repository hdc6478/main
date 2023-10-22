namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Back = base.Back;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ParamConfig = game.config.ParamConfig;
    import Point = egret.Point;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import delayCall = base.delayCall;

    export class MainLeftActMidMdr extends MdrBase implements UpdateItem {
        private _view: MainLeftActMidView = this.mark("_view", MainLeftActMidView);
        private _proxy: ActivityProxy;
        private _model: ActivityModel;

        /**展示在此面板上的所有按钮，放到initBtnData()处理*/
        private _btnData: IBtnIconData[];
        /**按钮管理器*/
        private _ins: BtnIconMgr;

        //原始位置
        private _listXOri: number = 0;
        private _isShow: boolean;//显示活动

        private _initFuben: boolean = false;

        private initBtnData(): void {
            /**入口手动赋值就行了，其他的不用管*/
            //todo，特殊显示规则，例如：关闭充值时不显示，未首充时不显示，领完奖励后不显示，个别渠道不显示等等
            //todo，注意，如果以Main为入口的，Main也要做红点，如[ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn1]
            //todo，缺少移除
            this._btnData = [
                {
                    id: BtnIconId.ZeroBuy,
                    m: ModName.Activity,
                    v: MainActivityViewType.ZeroBuy
                },
                {
                    id: BtnIconId.FirstCharge,
                    m: ModName.Activity,
                    v: MainActivityViewType.FirstCharge,
                    isInit: false,
                    initHandler: Handler.alloc(this, this.onInitFirstTips)
                },
                {
                    id: BtnIconId.GivingShenLing,
                    m: ModName.Activity,
                    v: MainActivityViewType.GivingShenLing,
                    showTime: true,
                    //effType: BtnIconEffType.Common,
                    isInit: false,
                    initHandler: Handler.alloc(this, this.onUpdateGivingShenlingTips),
                    showTips: true
                },
                {
                    id: BtnIconId.PrerogativeWrit, m: ModName.Activity, v: MainActivityViewType.RoleRingMain,
                    param: MdrTabBtnType.TabBtnType02, showBack: true,
                    hintMsg: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02]
                },
                {
                    id: BtnIconId.Yjjs,
                    m: ModName.Activity,
                    v: MainActivityViewType.YjjsFirstMain
                },
                {
                    id: BtnIconId.Giving,
                    m: ModName.Activity,
                    v: MainActivityViewType.Giving,
                    showBack: true,
                    isInit: false,
                    initHandler: Handler.alloc(this, this.onUpdatePassTips),
                    showTips: true
                },
                //todo:不要写handlerMsg事件
                {
                    id: BtnIconId.ChaozhiLibao,
                    m: null, v: null,
                    hintMsg: [ModName.Activity, MainActivityViewType.ChaozhiLibao],//超值礼包红点路径
                    clickHandler: Handler.alloc(this, this.onClickChaozhiLibao)
                },
                {
                    id: BtnIconId.Tongtiange,
                    m: ModName.Activity, v: MainActivityViewType.TongtiangeMain,
                    showBack: true,
                    isHide: true
                }
            ];
            //注册中控活动
            let list = this._proxy.getLeftEntranceBtnList();
            this._btnData = this._btnData.concat(list);
        }

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            let self = this;
            this._view.top = 120;
            self._view.left = 0;
            self._view.touchEnabled = false;
            self._proxy = this.retProxy(ProxyType.Activity);
            self._model = self._proxy.getModel();

            this._ins = new BtnIconMgr(this._view.group_top1);
            BtnIconMgr._insLeft = this._ins;
            if (DEBUG && window) {
                window['BtnIconMgrMid'] = this._ins;
            }
        }

        // ==================================活动图标收缩==================================
        private hideActivity() {
            this.setIsShow(!this._isShow);
        }

        private setIsShow(isShow: boolean): void {
            this._isShow = isShow;
            this.btnTween();
        }

        private btnTween() {
            let _isShow = this._isShow;
            this._view.btn_hide.scaleX = _isShow ? -1 : 1;
            if (this._listXOri == 0) {
                this._listXOri = -this._view.group_top1.width - 100;
            }
            if (this._view.group_top1.x > 0) {
                return;
            }
            let _posX1: number = this._listXOri;
            let _posX2: number = 0;
            Tween.remove(this._view.group_top1);
            Tween.get(this._view.group_top1)
                .to({ x: _posX1 }, 500, null, Back.easeIn)
                .exec(Handler.alloc(this, () => {
                    //收缩后刷新活动显示
                    this.dealBtnIconList();
                    this.showGivingShenlingGuide();
                }))
                .to({ x: _posX2 }, 500, null, Back.easeOut);

            Tween.remove(this._view.group_tips);
            Tween.get(this._view.group_tips)
                .to({ x: _posX1 }, 500, null, Back.easeIn)
                .to({ x: _posX2 }, 500, null, Back.easeOut);

            if (this._view.icon_tips.visible) {
                Tween.remove(this._view.icon_tips);
                Tween.get(this._view.icon_tips)
                    .to({ scaleX: 0, scaleY: 0 }, 500, null, Back.easeIn)
                    .delay(600)
                    .to({ scaleX: 1, scaleY: 1 }, 500, null, Back.easeOut);
            }
        }

        // ==================================活动图标收缩 end==================================

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_hide, TouchEvent.TOUCH_TAP, this.hideActivity);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);//红点更新
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启
            this.onNt(MainEvent.ON_OPEN_FUNC_DELETE, this.onOpenFuncDelete, this);//功能关闭
            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);//场景切换
            this.onNt(PassEvent.CHALLENGE_HANGUP_BOSS, this.updateShow, this);//挑战boss

            // this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);//任务更新
            this.onNt(ActivityEvent.ON_ACTIVITY_ICON_TIPS_HIDE, this.onHideIconTips, this);//隐藏图标弹窗

            this.onNt(ActivityEvent.ON_ACTIVITY_INIT, this.onActivityInit, this);//中控活动初始化
            this.onNt(ActivityEvent.ON_ACTIVITY_ENTRANCE_UPDATE, this.onActivityEntranceUpdate, this);//中控活动入口更新

            this.onNt(PassEvent.MAIN_PASS_GUANQIA_UPDATE, this.onUpdatePassTips, this);
            this.onNt(ActivityEvent.ON_UPDATE_GIVING_SHENLING_INFO, this.onUpdateGivingShenlingTips, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initBtnData();

            this.updateShow();
            this.setIsShow(true);//默认显示按钮
        }

        /** 切换场景 */
        private onSceneChange() {
            this.updateShow();
            // this.onUpdateScene();
        }

        private updateShow(): void {
            let cfg = SceneUtil.getCurSceneCfg();
            let showAct = !!cfg.show_left;
            this._view.visible = showAct;
            if (showAct) {
                let isShow = SceneUtil.isShowMain();
                this.setIsShow(isShow);//挂机场景，默认不收缩，其他的则收缩
            }
            this.onUpdateScene();
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
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                }
            } else {
                if (TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.removeUpdateItem(this);
                }
            }
        }

        //处理单个按钮
        private dealSingleBtnIcon(id: BtnIconId, ins: BtnIconMgr = this._ins): void {
            let isAdd = ins.dealSingleBtnIcon(id, this._isShow);

            //开启按钮定时器
            let timeMap = ins._btnTimeMap;
            let mapSize = Object.keys(timeMap).length;
            if (TimeMgr.hasUpdateItem(this) && !mapSize) {
                TimeMgr.removeUpdateItem(this);
            } else if (!TimeMgr.hasUpdateItem(this) && mapSize) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        //按钮设置 showTime=true 的倒计时文本，强制改写 showTime=false
        //此按钮不一定移除，只是出现其他的展示效果，此操作为了从定时器中移除此按钮
        //例如：送瑶姬仙子
        private removeBtnIconTime(id: BtnIconId): void {
            let btnData = this._ins._btnDataMap[id];
            if (btnData) {
                btnData.showTime = false;
            }
            this.dealSingleBtnIcon(id);
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
            Tween.remove(this._view.group_tips);
            Tween.remove(this._view.icon_tips);
            super.onHide();
            this._view.group_top1.removeChildren();
            TimeMgr.removeUpdateItem(this);
            this._btnData = [];
            this._ins.clear();
            BtnTipsMgr.getIns().hideAllTips();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let hint = data.value;

            let showBtnMap = this._ins._showBtnMap;
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
                    hint = BtnIconBase._hintCache[btnData.id] == undefined
                }
                btnIcon.setHint(hint);
                break;
            }
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            for (let openIdx of addIdx) {
                if (this._ins._btnDataMap[openIdx]) {
                    this.dealSingleBtnIcon(openIdx);
                    continue;
                }
                //中控活动存的是活动ID
                let idList = this._ins._btnOpenIdxMap[openIdx];
                if (idList && idList.length) {
                    for (let idx of idList) {
                        this.dealSingleBtnIcon(idx);
                    }
                }
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
            }
        }

        update(time: base.Time) {
            let timeMap = this._ins._btnTimeMap;
            let keys = Object.keys(timeMap);
            for (let key of keys) {
                let btnIcon: BtnIconBase = timeMap[key];
                if (!btnIcon || !this._ins._showBtnMap[key]) {
                    continue;
                }
                if (btnIcon.id == BtnIconId.GivingShenLing) {
                    let timeStr = this.getGivingShenlingTimeStr(btnIcon.id);
                    btnIcon.updateTime(timeStr);
                    continue;
                }
                if (!this._ins.checkBtnTime(btnIcon.data)) {
                    this.dealSingleBtnIcon(btnIcon.id);
                    continue;
                }
                btnIcon.updateTime(); //todo
            }
        }

        // todo ID1010865 策划修改需求
        // private onUpdateTask(): void {
        //     if (this._view.icon_tips.visible || !this._ins._showBtnMap[BtnIconId.FirstCharge]) {
        //         return;
        //     }
        //     let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "shouchong_task");
        //     for (let id of cfg.value) {
        //         let taskData = TaskUtil.getTask(id);
        //         if (taskData && taskData.status == 1) {
        //             this.onSetFirstTips();
        //             break;
        //         }
        //     }
        // }

        private onUpdateScene(): void {
            if (SceneUtil.isSceneType(SceneType.Fuben)) {
                if (!this._initFuben) {
                    this._initFuben = SceneUtil.getCurSceneIdx() == SceneIndex.JingYan;
                }
                this.onSetFirstTips();
            } else {
                this.onHideIconTips();
            }
        }

        private onInitFirstTips(): void {
            this.onSetFirstTips();
        }

        private onSetFirstTips(delay: number = 1000): void {
            if (PayUtil.checkFirstCharge()) {
                this.onHideIconTips();
                return;
            }
            let proxy: IShilianProxy = facade.retMod(ModName.Shilian).retProxy(ProxyType.Shilian);
            let info = proxy.getFubenInfo(FubenType.Type1);
            let maxLv = info && info.history_lv || 0;
            if (!this._initFuben && !maxLv) {
                this.onHideIconTips();
                return;
            }
            let id: number = BtnIconId.FirstCharge;
            let btn: BtnIconBase = this._ins._showBtnMap[id];
            if (!btn) {
                return;
            }
            this._view.icon_tips.source = "first_icon_tips";
            if (delay) {
                delayCall(Handler.alloc(this, this.onShowFirstTips, [btn]), delay);
            } else {
                this.onShowFirstTips(btn);
            }
        }

        private onShowFirstTips(btn: BtnIconBase): void {
            let point: Point = btn.localToGlobal();
            this._view.icon_tips.x = point.x + btn.width;
            this._view.icon_tips.y = point.y - btn.height;
            this._view.icon_tips.scaleX = this._view.icon_tips.scaleY = 1;
            this._view.icon_tips.scaleX = this._view.icon_tips.scaleY = 0.1;
            this._view.icon_tips.visible = true;
            Tween.get(this._view.icon_tips).to({
                scaleX: 1,
                scaleY: 1
            }, 500).delay(100).exec(Handler.alloc(this, this.onLoopTips));
            this._view.icon_tips.addEventListener(TouchEvent.TOUCH_TAP, this.onClickFirst, this);
        }

        private onLoopTips(): void {
            Tween.remove(this._view.icon_tips);
            let scale: number = 0.96;
            Tween.get(this._view.icon_tips, { loop: true }).from({ scaleX: scale, scaleY: scale }, 1000).to({
                scaleX: scale,
                scaleY: scale
            }, 1000);
        }

        private onHideIconTips(): void {
            this._view.icon_tips.visible = false;
            this._view.icon_tips.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickFirst, this);
        }

        private onClickFirst(): void {
            // ViewMgr.getIns().showView()
            let btn = this._ins._showBtnMap[BtnIconId.FirstCharge];
            let btnData = btn.data;
            let showBack = !!btnData.showBack;
            // ViewMgr.getIns().showView(btnData.m, btnData.v, btnData.param, showBack);
            ViewMgr.getIns().showSecondPop(btnData.m, btnData.v, btnData.param);
        }

        /** 送瑶姬仙子 */
        private onClickGiving() {
            GuideMgr.getIns().clear(GuideKey.GivingShenLing);//清除任务指引
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.GivingShenLing);
        }

        //显示送瑶姬仙子引导
        private showGivingShenlingGuide():void{
            let btnId = BtnIconId.GivingShenLing;
            let btnIcon = this._ins._showBtnMap[btnId];
            if(btnIcon){
                GuideMgr.getIns().show(GuideKey.GivingShenLing, btnIcon, Handler.alloc(this, this.onClickGiving));//
            }
        }

        private onUpdateGivingShenlingTips(): void {
            let btnId = BtnIconId.GivingShenLing;
            let givingshenlingProxy: GivingShenLingProxy = getProxy(ModName.Activity, ProxyType.GivingShenLing);
            let receive = givingshenlingProxy.model.receive;
            let btnIcon = this._ins._showBtnMap[btnId];

            this.showGivingShenlingGuide();

            if (receive != 1 || !btnIcon) {
                BtnTipsMgr.getIns().hideTips(btnId);
                return;
            }

            let btnData = btnIcon.data;
            let handler = Handler.alloc(this, () => {
                ViewMgr.getIns().showView(btnData.m, btnData.v, btnData.param);
            });
            //let local = PointUtil.switchLocalPos(btnIcon.localToGlobal(), this._view.group_tips);
            let x = btnIcon.x + btnIcon.width + 20;
            let y = btnIcon.y + btnIcon.height - 20;
            BtnTipsMgr.getIns().showTips({
                idx: btnId,
                tips: getLanById(LanDef.give_shenling_tips1),
                handler,
                x,
                y,
                tween: true
            }, this._view.group_tips);
        }

        private getGivingShenlingTimeStr(btnId: BtnIconId): string {
            let proxy: GivingShenLingProxy = getProxy(ModName.Activity, ProxyType.GivingShenLing);
            let endTime = proxy.getEndTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                //展示tips
                let btnIcon = this._ins._showBtnMap[btnId];
                if (btnIcon) {
                    //判断显示可领取
                    btnIcon.gr_time.visible = true;
                    btnIcon.lb_time.text = "可领取";
                }
                //this.removeBtnIconTime(btnId);
                return btnIcon.lb_time.text;
            }
            //倒计时未结束
            return TimeUtil.formatSecond(leftTime, 'mm分ss秒');
        }

        private onUpdatePassTips(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhanling_bubble");
            let tips: number[][] = cfg.value;

            let btnId: number = BtnIconId.Giving;

            let passProxy: IPassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            let curIndex = passProxy.curIndex;
            for (let info of tips) {
                if (info[0] <= curIndex && curIndex < info[1]) {
                    let str: string = StringUtil.substitute(getLanById(LanDef.zhanling_tips1), [(info[1] - curIndex), info[2]]);
                    this.onShowGivingTips(btnId, str);
                    return;
                }
                if (curIndex == info[1]) {
                    let str: string = StringUtil.substitute(getLanById(LanDef.zhanling_tips2), [info[2]]);
                    let proxy: GameOrderProxy = getProxy(ModName.Activity, ProxyType.GameOrder);
                    let status = proxy.getBtnStatus(GameOrderType.Chuangguanling);
                    if (status == 2) {
                        this.onShowGivingTips(btnId, str);
                        return;
                    }
                }
                this.onShowGivingTips(btnId);
            }
        }

        private onShowGivingTips(btnId: number, tips?: string): void {
            let btnIcon = this._ins._showBtnMap[btnId];
            if (btnIcon) {
                let btnData = btnIcon.data;
                if (tips) {
                    BtnTipsMgr.getIns().hideTips(btnId);
                    let handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showView(btnData.m, btnData.v, btnData.param);
                    });
                    //let localPoint = PointUtil.switchLocalPos(btnIcon.localToGlobal(), this._view.group_tips);
                    let x: number = btnIcon.x + btnIcon.width + 20;
                    let y: number = btnIcon.y + btnIcon.height - 20;
                    BtnTipsMgr.getIns().showTips({ idx: btnId, tips, handler, x, y, tween: true }, this._view.group_tips);
                } else {
                    BtnTipsMgr.getIns().hideTips(btnId);
                }
            }
        }

        //点击超值礼包 ChaozhiLibaoMdr
        private onClickChaozhiLibao(): void {
            let isShow = !ChaozhiLibaoMdr.isShow;
            if (isShow) {
                facade.showView(ModName.Activity, MainActivityViewType.ChaozhiLibao);
            } else {
                facade.hideView(ModName.Activity, MainActivityViewType.ChaozhiLibao);
            }
        }

        //-------------------------------------中控活动------------------------------------------------
        private onActivityInit(): void {
            this.updateLeftActivity();
        }

        private onActivityEntranceUpdate(n: GameNT): void {
            let typeList: number[] = n.body;
            if (typeList.indexOf(ActivityPosType.Left) > -1) {
                //刷新入口
                this.updateLeftActivity();
            }
        }

        private updateLeftActivity(): void {
            this.initBtnData();
            this.dealBtnIconList();
            this.showGivingShenlingGuide();
        }
    }
}