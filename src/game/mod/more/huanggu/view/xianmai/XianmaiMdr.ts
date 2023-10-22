namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;

    export class XianmaiMdr extends MdrBase implements UpdateItem {
        private _view: XianmaiView = this.mark("_view", XianmaiView);
        private _proxy: XianmaiProxy;
        private _listBtn: eui.ArrayCollection;
        private _listData: eui.ArrayCollection;
        private _selIdx: number = 0;
        private _minEndTime: number;
        private _isClickSearch = false;//标识是否点击了一键寻矿按钮，避免自动挑战时的弹窗

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);

            this._view.list.itemRenderer = XianmaiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
            addEventListener(this._view.btn_zhanbao, egret.TouchEvent.TOUCH_TAP, this.onClickZhanbao, this);
            addEventListener(this._view.btn_yijianxunkuang, egret.TouchEvent.TOUCH_TAP, this.onClickYijianxunkuang, this);
            addEventListener(this._view.btn_wodexianmai, egret.TouchEvent.TOUCH_TAP, this.onClickWodexianmai, this);
            addEventListener(this._view.btn_xianmailiebiao, egret.TouchEvent.TOUCH_TAP, this.onClickXianmailiebiao, this);
            addEventListener(this._view.btn_xianmaiduihuan, egret.TouchEvent.TOUCH_TAP, this.onClickXianmaiduihuan, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);

            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_STAGE_SHOW, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_REWARD_SHOW, this.onUpdateRewardShow, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_SEARCH, this.onUpdateSearchView, this);
        }

        protected onShow(): void {
            super.onShow();

            let selIdx = 0;
            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                selIdx = selType;
            }
            this._selIdx = selIdx;

            this._proxy.c2s_xianmai_stage_show(this._selIdx + 1);
            this._proxy.c2s_xianmai_my_show();//请求我的占领数据

            this.updateListBtn();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);

            this.onUpdateRewardShow();
            this.updateBtnHint();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._minEndTime = null;
            this._proxy.reqStage = null;
            this._isClickSearch = false;
        }

        //结算奖励弹窗
        private onUpdateRewardShow(): void {
            let rewardItems = this._proxy.reward_items;
            if (rewardItems && rewardItems.length) {
                facade.showView(ModName.More, MoreViewType.XianmaiResult);
            }
        }

        //请求一键寻矿返回
        private onUpdateSearchView(): void {
            if (!this._isClickSearch) {
                return;
            }
            this._isClickSearch = false;
            if (this._proxy.search_stage) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiItemTipsOnekey);
            } else {
                PromptBox.getIns().show(getLanById(LanDef.xianmaizhengduo_tips18));
            }
        }

        private updateTimeStr(): void {
            let sufStr = getLanById(LanDef.tishi_8);
            let timeSec = this._proxy.getEndTime() || 0;
            let leftTime = timeSec - TimeMgr.time.serverTimeSecond;

            //活动时间结束，返回上一层界面
            if (leftTime <= 0) {
                this.sendNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE);
                return;
            }

            let timeStr = StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips11), [TextUtil.addColor(TimeUtil.formatSecond(leftTime, 'HH时mm分'), 0x00ff00), sufStr]);
            this._view.lb_time.textFlow = TextUtil.parseHtml(timeStr);
        }

        private updateListBtn(): void {
            let maxStage = this._proxy.getMaxStage();
            let list: TabBaseItemData[] = [];
            for (let i = 1; i <= maxStage; i++) {
                let nameStr = `第${i}层`;
                list.push({
                    icon: `xianmai_icon` + this._proxy.getLayerIdx(i),
                    nameStr,
                    gray: false
                });
            }
            this._listBtn.replaceAll(list);
            this._view.list_btn.selectedIndex = this._selIdx;
        }

        private onUpdateView(): void {
            this._view.coolTimeItem.updateShow();

            this._minEndTime = this._proxy.getMinEndTime();

            this.updateView();
        }

        private updateView(): void {
            let guildNum = this._proxy.guild_num;
            let guildStr = StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips9), [TextUtil.addColor(guildNum + '', 0x00ff00)]);
            this._view.lb_teamcnt.textFlow = TextUtil.parseHtml(guildStr);

            let earnCnt = this._proxy.getEarnCnt();
            let earnStr = StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips10), [TextUtil.addColor(earnCnt + '%', 0x00ff00)]);
            this._view.lb_teamearn.textFlow = TextUtil.parseHtml(earnStr);

            //mvp
            this._view.mvpItem.updateShow(this._proxy.mvp_role);

            let list: IXianmaiItemData[] = [];
            let cfgList = this._proxy.getStageCfgs(this._selIdx + 1);
            for (let cfg of cfgList) {
                list.push({
                    stage: this._selIdx + 1,
                    cfg,
                    info: this._proxy.getStageInfo(cfg.index)
                });
            }
            this._listData.replaceAll(list);
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this._minEndTime = null;
            this._proxy.c2s_xianmai_stage_show(this._selIdx + 1);
        }

        //排行榜
        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianmaiRank);
        }

        private onClickZhanbao(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiZhanbao);
        }

        private onClickYijianxunkuang(): void {
            if (this._proxy.my_data) {
                PromptBox.getIns().show(getLanById(LanDef.xianmaizhengduo_tips19));
                return;
            }
            this._isClickSearch = true;
            this._proxy.c2s_xianmai_search();
        }

        private onClickWodexianmai(): void {
            if (!this._proxy.my_data) {
                PromptBox.getIns().show(getLanById(LanDef.xianmaizhengduo_tips8));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiItemTipsMine);
        }

        private onClickXianmailiebiao(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiList);
        }

        private onClickXianmaiduihuan(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ExchangeShop, ExchangeShopType.Type6);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianmaizhengduo_tips2));
        }

        update(time: base.Time) {
            this.updateTimeStr();

            if (this._view.coolTimeItem.visible) {
                this._view.coolTimeItem.updateShow();
            }

            let endTime = TimeUtil.getNextWeekTime() - 1;//减一秒
            this._view.timeItem.updateTime(endTime);

            // 改成服务端统一处理，因位置被占领等等需要及时推送
            // //占领时间到了，需要重新请求，更新数据
            // if (this._minEndTime && TimeMgr.time.serverTimeSecond >= this._minEndTime) {
            //     this._proxy.c2s_xianmai_stage_show(this._selIdx + 1);
            //     this._minEndTime = null;
            // }

            // todo
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let data = this._listData.source[i] as IXianmaiItemData;
                if (!data || !data.info || !data.info.defend_time) {
                    continue;
                }
                let item = this._view.list.getChildAt(i) as XianmaiItem;
                if (item) {
                    item.updateTime();
                }
            }
        }

        private updateBtnHint(): void {
            this._view.btn_xianmaiduihuan.setHint(this._proxy.getExchangeHint());
        }
    }
}