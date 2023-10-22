namespace game.mod.compete {

    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import TourpvpFuliConfig = game.config.TourpvpFuliConfig;
    import PropConfig = game.config.PropConfig;
    import ParamConfig = game.config.ParamConfig;
    import ArrayCollection = eui.ArrayCollection;
    import TourpvpWinConfig = game.config.TourpvpWinConfig;

    export class YouliMdr extends EffectMdrBase implements UpdateItem {

        private _view: YouliView = this.mark("_view", YouliView);
        private _proxy: CompeteProxy;
        private _winList: ArrayCollection;
        
        private _endTime: number = 0;
        private _rankType: number = RankType.Type4;
        private _maxBuyCnt: number;//当前可购买次数

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Compete);

            this._winList = new ArrayCollection();
            this._view.reward_view.list_win.itemRenderer = YouliWinRewardItem;
            this._view.reward_view.list_win.dataProvider = this._winList;

            this._view.reward_view.img_tips.source = "shenglicishu";
            this._view.reward_view.lab_title.text = getLanById(LanDef.youli_day_award_tips);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(CompeteEvent.UPDATE_YOULI_INFO, this.updateInfo, this);
            this.onNt(RankEvent.ON_RANK_INFO_UPDATE, this.onRankUpdate, this);
            this.onNt(CompeteEvent.COMMON_CLICK_ADD, this.onCommonClickAdd, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            addEventListener(this._view.btn_refresh, TouchEvent.TOUCH_TAP, this.onRefresh);

            addEventListener(this._view.lab_rank_jump, TouchEvent.TOUCH_TAP, this.onRank);
            addEventListener(this._view.btn_award, TouchEvent.TOUCH_TAP, this.onAward);
            addEventListener(this._view.btn_score, TouchEvent.TOUCH_TAP, this.onScore);

            addEventListener(this._view.btn_add_times, TouchEvent.TOUCH_TAP, this.onClickAdd);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            RankUtil.c2s_new_rank_req_rank(this._rankType);
            TextUtil.addLinkHtmlTxt2(this._view.lab_rank_jump, "排行榜", BlackColor.GREEN, "");
            this.updateInfo();
            this.showGuide();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            GuideMgr.getIns().clear(GuideKey.YouliChallenge);//清除指引
            super.onHide();
        }

        private initShow(): void {
            this.addEftByParent(UIEftSrc.YouliBg, this._view.grp_eft);
        }

        update(time: base.Time) {
            let rcTime = this.updateRecoverTime();
            if(rcTime <= 0) {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateInfo() {
            this.updateMyScore();
            this.updateCurTypeInfo();
            this.updateMyRank();
            this.updateRankInfo();
            this.updateWin();
        }

        /**
         * 更新当前选中类型数据
         */
        private updateCurTypeInfo() {
            let remainTimes: number = this._proxy.remainTimes;
            let timesStr = getLanById(LanDef.times) + "：" + TextUtil.addColor(remainTimes + "/" + this._proxy.maxFightTimes, BlackColor.GREEN);
            this._view.lab_times.textFlow = TextUtil.parseHtml(timesStr);
            this._maxBuyCnt = this._proxy.maxFightTimes - remainTimes;

            for (let i = 1; i <= 4; i++) {
                this._view["item" + i].data = this._proxy.getTopRank(i);
            }

            let cfg: TourpvpFuliConfig;
            let fuliCfgs: TourpvpFuliConfig[] = getConfigListByName(ConfigName.TourpvpFuli);
            for (cfg of fuliCfgs) {
                let info = this._proxy.getScoreAward(cfg.index);
                if (!info) {
                    break;
                }
            }
            this._view.pro_rate.show(this._proxy.dayScore, cfg.count, false, 0, false);
            
            this._view.lab_recover_time.visible = !!this._proxy.curFightTimes;
            if (!!this._proxy.curFightTimes) {
                this._endTime = this._proxy.nextFightTime;
                this.updateRecoverTime();
                TimeMgr.addUpdateItem(this, 1000);
            }

            this._view.btn_award.redPoint.visible = this._proxy.getYouliAwardHint();
            this._view.btn_score.redPoint.visible = this._proxy.getYouliScoreHint();
        }

        private updateMyScore(): void {
            let score = BagUtil.getPropCntByIdx(PropIndex.Ylcoin);
            this._view.lab_my_score.text = "我的游历积分: " + score;
        }

        private updateRecoverTime(): number {
            let rmTime: number = this._endTime - TimeMgr.time.serverTimeSecond;
            if (rmTime > 0) {
                let timeStr: string = TimeUtil.formatSecond(rmTime, "mm:ss");
                this._view.lab_recover_time.text = timeStr + "恢复1次";
            }
            return rmTime;
        }

        private updateMyRank(): void {
            let paraCfg1: ParamConfig = GameConfig.getParamConfigById("youli_runk_min");    // 上榜积分最低要求
            let paraCfg2: ParamConfig = GameConfig.getParamConfigById("youli_runk_cond");   // 游历排行榜上榜显示条件（小于1001名）
            // 玩家积分是否大于等于500：
            // 否，显示：再接再厉
            // 是，判断玩家排名是否大于等于1000：
            // 是，显示：未上榜
            // 否，显示具体排名
            let myRankStr: string = "";
            let score = BagUtil.getPropCntByIdx(PropIndex.Ylcoin);
            if(score < paraCfg1.value) {
                myRankStr = "再接再厉";
            } else if(!this._proxy.myRank || this._proxy.myRank >= paraCfg2.value) {
                myRankStr = "暂未上榜";
            } else {
                myRankStr = this._proxy.myRank + "";
            }
            this._view.lab_my_rank.text = "我的排名: " + myRankStr;
        }

        private updateRankInfo(): void {
            let rankInfo = RankUtil.getRankInfo(this._rankType);
            if(rankInfo && rankInfo.top_info){
                let nameStr = rankInfo.top_info.name;
                let cntStr = "积分：" + rankInfo.info_list[0].count;
                let str = nameStr ? nameStr + "\n" + cntStr : getLanById(LanDef.tishi_2);
                this._view.lab_top_rank.text = str;
            } else {
                this._view.lab_top_rank.text = getLanById(LanDef.tishi_2);
            }
        }

        private onRankUpdate(): void {
            this.updateMyRank();
            this.updateRankInfo();
        }

        private onRefresh() {
            let str: string = "";
            if(this._proxy.type != YouliType.Normal) {
                str += "当前遇到奇遇事件，是否跳过？"
            }
            let paraCfg: ParamConfig = GameConfig.getParamConfigById("youli_buy_item");
            let propCfg: PropConfig = GameConfig.getPropConfigById(paraCfg.value);
            let cost = this._proxy.refreshCost;
            if(str != "") {
                str += "\n";
            }
            str += `是否花费${cost}${propCfg.name}刷新？`;
            let data = {
                lab: str,
                confirm: Handler.alloc(this, () => {
                    this._proxy.c2s_tour_refresh_defender();
                }),
                cancel: Handler.alloc(this, () => {

                }),
                checkType: AlertCheckType.Youli
            };
            facade.showView(ModName.Login, LoginViewType.Alert, data);
        }

        private onRank(evt: TouchEvent): void {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.YouliRankMain);
        }

        private onAward() {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.YouliAwardMain);
        }

        private onScore() {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.YouliScoreMain);
        }

        private onClickAdd() {
            this.onAddTimes();
        }

        /**
         * 增加挑战次数
         */
        private onAddTimes(showTips?: string) {
            if(!this._maxBuyCnt){
                /**挑战次数已达上限*/
                if(!showTips){
                    showTips = getLanById(LanDef.compete_mars_8);
                }
                PromptBox.getIns().show(showTips);
                return;
            }
            // 1、有道具的时候，优先使用道具，再购买次数
            // 2、没有购买次数时候，弹道具获取途径
            let index = PropIndex.YouliJuanzhou;
            let propCnt = BagUtil.getPropCntByIdx(index);
            if(propCnt > 0){
                //使用道具
                ViewMgr.getIns().showPropTips(index, IconShowType.Bag);
                return;
            }

            let maxCnt = this._proxy.maxBuyFightTimes;
            let cnt = maxCnt - this._proxy.curBuyCnt;
            if (cnt <= 0) {
                /**超过每日可购买上限*/
                // if(!showTips){
                //     showTips = getLanById(LanDef.compete_mars_9);
                // }
                // PromptBox.getIns().show(showTips);
                //弹道具获取途径
                ViewMgr.getIns().showGainWaysTips(index);
                return;
            }

            let tips = "是否花费%s购买%s次游历挑战次数？";
            let cfg = GameConfig.getParamConfigById("youli_buy");
            let cost: number[] = cfg.value;
            //购买次数
            ViewMgr.getIns().showBuyTimes(tips, cost, cnt, this._maxBuyCnt, maxCnt, Handler.alloc(this._proxy, this._proxy.c2s_tour_buy_times));
        }

        private onCommonClickAdd(): void {
            let showTips = getLanById(LanDef.guaji_shouyi_tips07);
            this.onAddTimes(showTips);
        }

        private updateWin(): void {
            let winCnt = this._proxy.youliWinCnt;
            this._view.reward_view.lab_win.text = winCnt + "";
            let cfgList: TourpvpWinConfig[] = getConfigListByName(ConfigName.TourpvpWin);
            this._winList.source = cfgList;//最多显示4个
            let cfg = cfgList[cfgList.length - 1];
            let maxCnt = cfg.count;
            this._view.reward_view.bar2.show(winCnt, maxCnt, false, 0, false, ProgressBarType.NoValue);
        }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.YouliChallenge, this._view.item2, Handler.alloc(this._view.item2, this._view.item2.onClick));//任务指引
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.Ylcoin) > -1){
                this.updateMyScore();
                this.updateMyRank();
            }
        }

    }
}
