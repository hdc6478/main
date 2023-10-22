namespace game.mod.compete {

    import TouchEvent = egret.TouchEvent;
    import MagicUpConfig = game.config.MagicUpConfig;
    import ArrayCollection = eui.ArrayCollection;
    import MagicWinConfig = game.config.MagicWinConfig;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import ItemTapEvent = eui.ItemTapEvent;

    export class DoufaMdr extends EffectMdrBase implements UpdateItem {
        private _view: DoufaView = this.mark("_view", DoufaView);
        private _proxy: CompeteProxy;
        private _itemList: ArrayCollection;
        private _winList: ArrayCollection;
        private _time: number;
        private readonly TIME_TICK: number = 3;
        private _autoFlag: boolean = false;//自动挑战成功的标志
        private _maxBuyCnt: number;//当前可购买次数

        private _btnList: ArrayCollection;
        private _selType: number;
        /**当前选中的分组类型*/

        private _eftIdRank: number;
        private _eftStrRank: string;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._winList = new ArrayCollection();
            this._view.reward_view.list_win.itemRenderer = DoufaWinRewardItem;
            this._view.reward_view.list_win.dataProvider = this._winList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = DoufaTabItem;
            this._view.list_type.dataProvider = this._btnList;

            this._view.reward_view.img_tips.source = "shenglicishu";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_rule2, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_finals, TouchEvent.TOUCH_TAP, this.onClickFinals);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_rank2, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_record, TouchEvent.TOUCH_TAP, this.onClickRecord);
            addEventListener(this._view.btn_record2, TouchEvent.TOUCH_TAP, this.onClickRecord);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckBox);
            addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);

            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);

            this.onNt(CompeteEvent.UPDATE_DOUFA_INFO, this.updateFirst, this);
            this.onNt(CompeteEvent.UPDATE_DOUFA_RANK, this.updateTime, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(CompeteEvent.DOUFA_RESET_CHALLENGE, this.resetCheckBox, this);
            this.onNt(CompeteEvent.UPDATE_DOUFA_GROUP_INFO, this.onInfoUpdate, this);
            this.onNt(CompeteEvent.UPDATE_DOUFA_GUESS_INFO, this.onGuessUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateViewState();
            this.updateHint();
        }

        protected onHide(): void {
            this._autoFlag = false;
            this._eftStrRank = null;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private removeEffectRank(): void {
            if (this._eftIdRank) {
                this.removeEffect(this._eftIdRank);
                this._eftIdRank = null;
            }
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.doufa_wanfa));
        }

        private onClickFinals(): void {
            ViewMgr.getIns().showSecondPop(ModName.Compete, CompeteViewType.DoufaFinals);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.DoufaRankMain);
        }

        private onClickRecord(): void {
            ViewMgr.getIns().showSecondPop(ModName.Compete, CompeteViewType.DoufaRecord);
        }

        private onClickReward(): void {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.DoufaRewardMain);
        }

        private onClickChallenge(): void {
            this._autoFlag = true;
            let cnt = this._proxy.cnt;
            if (!cnt) {
                let showTips = getLanById(LanDef.guaji_shouyi_tips07);
                this.onAdd(showTips);
                return;
            }
            this._proxy.c2s_pvp_battle_get_player_challenge_info();
        }

        private onClickAdd(): void {
            this.onAdd();
        }

        private onAdd(showTips?: string): void {
            if (!this._maxBuyCnt) {
                /**挑战次数已达上限*/
                if (!showTips) {
                    showTips = getLanById(LanDef.compete_mars_8);
                }
                PromptBox.getIns().show(showTips);
                return;
            }
            // 1、有道具的时候，优先使用道具，再购买次数
            // 2、没有购买次数时候，弹道具获取途径
            let index = PropIndex.DoufaJuanzhou;
            let propCnt = BagUtil.getPropCntByIdx(index);
            if (propCnt > 0) {
                //使用道具
                ViewMgr.getIns().showPropTips(index, IconShowType.Bag);
                return;
            }

            let cfg1 = GameConfig.getParamConfigById("doufa_count_buy");
            let maxCnt: number = cfg1.value;
            let cnt = maxCnt - this._proxy.buyCnt;
            if (cnt <= 0) {
                // if(!showTips){
                //     showTips = getLanById(LanDef.compete_mars_9);
                // }
                // PromptBox.getIns().show(showTips);
                //弹道具获取途径
                ViewMgr.getIns().showGainWaysTips(index);
                return;
            }
            let tips = getLanById(LanDef.doufa_tips7);
            let cfg2 = GameConfig.getParamConfigById("doufacount_consume");
            let cost: number[] = cfg2.value;
            //购买次数
            ViewMgr.getIns().showBuyTimes(tips, cost, cnt, this._maxBuyCnt, maxCnt, Handler.alloc(this._proxy, this._proxy.c2s_pvp_battle_buy_count));
        }

        private onClickCheckBox(): void {
            let cnt = this._proxy.cnt;
            if (!cnt) {
                let showTips = getLanById(LanDef.guaji_shouyi_tips07);
                PromptBox.getIns().show(showTips);
            } else {
                let auto = this._proxy.auto;
                this._proxy.auto = !auto;
            }
            this._autoFlag = false;
            this.updateCheckBox();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.rewardHint)) {
                this.updateRewardHint(data.value);
            }
        }

        private updateViewState(): void {
            if (this._proxy.groupStatus == DoufaGroupStatus.Score) {
                this._view.currentState = "1";
                this.updateFirst();
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                }
            } else {
                this._view.currentState = "2";
                this.updateSecond();
            }
        }

        private updateFirst(): void {
            this.updateScore();
            this.updateWin();
            this.updateCnt();
            this.updateCheckBox();
            this.updateTime();
        }

        private updateScore(): void {
            let score = this._proxy.score;
            let maxScore = this._proxy.getMaxScore();
            let lv = this._proxy.lv;

            let nextLv = lv + 1;
            let nextCfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, nextLv);
            let isMaxLv = !nextCfg;//最高段位

            this._view.img_lv.source = "doufa_lv" + lv;
            //this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
            let uiEftSrc = "doufa_rank" + lv;
            if (this._eftStrRank != uiEftSrc) {
                this._eftStrRank = uiEftSrc;
                this.removeEffectRank();
                this._eftIdRank = this.addEftByParent(uiEftSrc, this._view.grp_eft);
            }
            this._view.bar.show(score, maxScore, false, 0, false);

            this._view.lab_max.visible = isMaxLv;
            this._view.list_reward.visible = !isMaxLv;
            if (this._view.list_reward.visible) {
                this._itemList.source = nextCfg.reward;
            }
        }

        private updateWin(): void {
            let winCnt = this._proxy.winCnt;
            this._view.reward_view.lab_win.text = winCnt + "";
            let cfgList: MagicWinConfig[] = getConfigListByName(ConfigName.MagicWin);
            this._winList.source = cfgList;
            let cfg = cfgList[cfgList.length - 1];
            let maxCnt = cfg.count;
            this._view.reward_view.bar2.show(winCnt, maxCnt, false, 0, false, ProgressBarType.NoValue);
        }

        private updateCnt(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("doufa_count");
            let maxCnt = cfg && cfg.value;
            let cnt = this._proxy.cnt;
            this._maxBuyCnt = maxCnt - cnt;
            let cntStr = getLanById(LanDef.times) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this._view.btn_challenge.redPoint.visible = cnt > 0;
        }

        private updateCheckBox(): void {
            let auto = this._proxy.auto;
            let cnt = this._proxy.cnt;
            if (!cnt && auto) {
                this._proxy.auto = auto = false;//没有次数时重置自动挑战
            }
            this._view.checkbox.selected = auto;
            if (auto && !this._autoFlag) {
                this._time = this.TIME_TICK;
                this.updateCheckBoxShow();
            } else {
                this._view.checkbox.labelDisplay.text = "自动挑战";
            }
        }

        private updateCheckBoxShow(): void {
            let str = this._time + "S后自动挑战";
            this._view.checkbox.labelDisplay.text = str;
        }

        private resetCheckBox(): void {
            //匹配失败时重置倒计时
            this._autoFlag = false;
            this._time = this.TIME_TICK;
        }

        update(time: base.Time): void {
            if (this._proxy.auto && !this._autoFlag) {
                this._time--;
                this.updateCheckBoxShow();
                if (this._time <= 0) {
                    this.onClickChallenge();//自动挑战
                }
            }
            this.updateTime();
        }

        /** 更新红点 */
        private updateHint() {
            this.updateRewardHint(HintMgr.getHint(this._proxy.rewardHint));
        }

        private updateRewardHint(hint: boolean) {
            this._view.btn_reward.redPoint.visible = hint;
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime(RankCommonType.Type1);
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

        /****************************决赛********************************/
        private updateSecond(): void {
            this.initTypeList();
            this.typeUpdateInfo();
            this.updateGuessCnt();
            this.updateTips();
        }

        private onClickBattle(): void {
            //todo
            PromptBox.getIns().show("待处理");
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex + 1;
            if (type == this._selType) {
                return;
            }
            this._selType = type;
            this.typeUpdateInfo();
        }

        private onInfoUpdate(): void {
            this.updateViewState();
        }

        private onGuessUpdate(): void {
            this.typeUpdateInfo();
            this.updateGuessCnt();
        }

        private initTypeList(): void {
            let datas: number[] = [];
            let groupStatus = this._proxy.groupStatus;
            if (groupStatus == DoufaGroupStatus.First) {
                //小组赛
                for (let i = 1; i <= DoufaGroupType.Type4; ++i) {
                    datas.push(i);
                }
            } else {
                //决赛
                datas.push(DoufaGroupType.Type5);
            }

            this._btnList.source = datas;

            this._selType = datas[0];
            this._view.list_type.selectedIndex = this._selType - 1;
        }

        private typeUpdateInfo(): void {
            this._view.player.updateShow(this._selType);
        }

        private updateGuessCnt(): void {
            let cnt = this._proxy.getGuessCnt();
            let maxCnt = this._proxy.guessMaxCnt;
            let cntStr = getLanById(LanDef.doufa_tips16) + getLanById(LanDef.times) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, BlackColor.GREEN);
            this._view.lab_guessCnt.textFlow = TextUtil.parseHtml(cntStr);
        }

        private updateTips(): void {
            let status = this._proxy.groupStatus;
            //小组赛
            //未开启时显示：本届众仙斗法将于周日12:00开启战斗
            let tipsStr = getLanById(LanDef.doufa_open_tips1);
            //开启时显示：“进入战斗”按钮，todo
            this._view.btn_battle.visible = false;

            //决赛
            if (status == DoufaGroupStatus.Second) {
                let isEnd = TimeMgr.time.serverTimeSecond >= this._proxy.groupTime;
                if (isEnd) {
                    //结束后显示：下一届众仙斗法将于明日0点开启
                    tipsStr = getLanById(LanDef.doufa_open_tips3);
                } else {
                    //未开启时显示：本轮比赛将在周日18：00开启
                    tipsStr = getLanById(LanDef.doufa_open_tips2);
                    //开启时显示：“进入战斗”按钮，todo
                }
            }
            this._view.lab_tips.text = tipsStr;
        }
    }
}