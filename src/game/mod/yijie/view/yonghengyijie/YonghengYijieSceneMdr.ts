namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import TextEvent = egret.TextEvent;
    import Handler = base.Handler;
    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class YonghengYijieSceneMdr extends MdrBase implements UpdateItem {
        private _view: YonghengYijieSceneView = this.mark("_view", YonghengYijieSceneView);
        private _proxy: YijieProxy;
        private _dailyLimitTimeActProxy: IDailyLimitTimeActProxy;
        private _costIdx: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yijie);
            this._dailyLimitTimeActProxy = facade.retMod(ModName.Daily).retProxy(ProxyType.DailyLimitTime);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.lab_guild, TextEvent.LINK, this.onClickGuild);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_demon, TouchEvent.TOUCH_TAP, this.onClickDemon);
            addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);

            this.onNt(YijieEvent.ON_YONGHENG_YIJIE_SCENE_UPDATE, this.updateInfo, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(DailyLimitTimeEvent.UPDATE_LIMIT_ACT_INFO, this.onInfoUpdate, this);
            this.onNt(ActivityEvent.ON_ROLE_RING_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateInfo();
            this.updateCost();
            this.updateOpen();
            this.updateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickGuild(): void {
            if(RoleUtil.isInUnion()){
                //有仙宗
                ViewMgr.getIns().showConfirm(getLanById(LanDef.guild_invite_tips), Handler.alloc(this, () => {
                    //todo
                    PromptBox.getIns().show("仙宗邀请，待处理");
                }));
                return;
            }
            //跳转仙宗界面
            ViewMgr.getIns().showViewByID(JumpIdx.Union);
        }

        private onClickReward(): void {
            this._proxy.c2s_yongheng_show_reward();
        }

        private onClickDemon(): void {
            facade.showView(ModName.Yijie, YijieViewType.YonghengYijieOpen, this._proxy.selCfg);
        }

        private onClickBoss(): void {
            ViewMgr.getIns().showSecondPop(ModName.Yijie, YijieViewType.YijieBossList, YijieBossType.YonghengYijie);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(this._costIdx) < 0){
                return;
            }
            this.updateCost();
        }

        private onInfoUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(DailyLimitTimeType.YonghengYijie) < 0){
                return;
            }
            this.updateOpen();
        }

        private initShow(): void {
            this._view.lab_guild.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.guild_invite), BlackColor.GREEN, ""));
        }

        private updateInfo(): void {
            let luckyStr = getLanById(LanDef.yijie_tips3) + "：" + TextUtil.addColor(this._proxy.yonghengCount + "", BlackColor.GREEN);
            this._view.lab_lucky.textFlow = TextUtil.parseHtml(luckyStr);

            let goodStr = getLanById(LanDef.yijie_tips19) + "：" + TextUtil.addColor(this._proxy.goodCount + "", BlackColor.GREEN);
            this._view.lab_goodCnt.textFlow = TextUtil.parseHtml(goodStr);

            let cntStr = getLanById(LanDef.yijie_tips4) + "：" + TextUtil.addColor(this._proxy.memberNum + "", BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
        }

        private updateCost(): void {
            let costInfo = this._proxy.getCostInfo();
            let index = costInfo[0];
            let cnt = costInfo[1];
            this._costIdx = index;
            this._view.cost.updateShow([index, cnt]);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let nextTime = this._dailyLimitTimeActProxy.getNextStartTime(DailyLimitTimeType.YonghengYijie);
            this._view.timeItem.updateTime(nextTime);
        }

        private updateOpen(): void {
            let isOpen = this._dailyLimitTimeActProxy.isOpen(DailyLimitTimeType.YonghengYijie);
            if(!isOpen){
                //未开启
                this.updateTime();
                TimeMgr.addUpdateItem(this, 1000);
            }
            else {
                this._view.timeItem.lab_time.text = getLanById(LanDef.battle_cue32);//进行中
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateView(): void {
            let isAct = RoleUtil.isRoleRingAct(RoleRingType.Type3);
            this._view.currentState = isAct ? "act" : "notAct";
        }

    }
}