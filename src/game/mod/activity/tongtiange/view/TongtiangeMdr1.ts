namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class TongtiangeMdr1 extends MdrBase implements UpdateItem {
        private _view: TongtiangeView1 = this.mark("_view", TongtiangeView1);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        private _reqNext = false;//请求标识
        private _isClickCheckBox = false;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = TongtiangeItem1;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
            addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_build, egret.TouchEvent.TOUCH_TAP, this.onClickBuild, this);
            addEventListener(this._view.btn_buildten, egret.TouchEvent.TOUCH_TAP, this.onClickBuildTen, this);
            addEventListener(this._view.checkBox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
            addEventListener(this._view.img_gain, egret.TouchEvent.TOUCH_TAP, this.onClickGain, this);
            addEventListener(this._view.lb_checkboxcond, egret.TouchEvent.TOUCH_TAP, this.onClickVip, this);
            addEventListener(this._view.scroller.viewport, eui.PropertyEvent.PROPERTY_CHANGE, this.onListChange, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_STOREY_INFO, this.onUpdateViewByScroller, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_BUILD_SUCCESS, this.onUpdateViewByBuildSuccess, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this._proxy.c2s_attic_storey_show(1);//打开界面请求

            let buildVip = this._proxy.getAutoBuildVip();
            let myVip = VipUtil.getShowVipLv();
            let showCheckbox = myVip >= buildVip;
            this._view.checkBox.visible = showCheckbox;
            this._view.lb_checkboxcond.visible = !showCheckbox;
            if (!showCheckbox) {
                let vipStr = StringUtil.substitute(getLanById(LanDef.tongtiange_tips21), [buildVip]);
                this._view.lb_checkboxcond.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(vipStr, WhiteColor.GREEN));
            }

            this._proxy.checkActTips(NotTipsType.Tongtiange);

        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._endTime = 0;
            this._reqNext = false;
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
            this._proxy.minRankNo = null;
            this._view.checkBox.selected = false;
            this._proxy.model.role_list = {};//todo
        }

        //打开界面请求或滚动请求回调，todo 待优化
        private onUpdateViewByScroller(): void {
            let roleMap = this._proxy.model.role_list;
            let keys = Object.keys(roleMap) || [];
            if (keys) {
                keys.sort((a, b) => (+b) - (+a));
            }
            let list: teammate[] = [];
            for (let key of keys) {
                list.push(roleMap[key]);
            }
            this._listData.replaceAll(list);

            this.updateScrollerPos();

            //打开界面请求返回
            if (!this._reqNext) {
                this.updateBuildCnt();
                let topPlayer = this._proxy.getTopPlayerInfo();
                if (topPlayer) {
                    this._view.head.updateHeadShow(topPlayer.head, topPlayer.head_frame, topPlayer.sex, topPlayer.role_id, topPlayer.server_id);
                    this._view.lb_name.text = topPlayer.name;
                } else {
                    this._view.head.defaultHeadShow();
                    this._view.lb_name.text = getLanById(LanDef.tishi_2);
                }
                this.updateCost();
            }

            this._reqNext = false;
        }

        //建造成功回调，顶部10条数据
        private onUpdateViewByBuildSuccess(): void {
            let roleMap = this._proxy.model.role_list;
            let keys = Object.keys(roleMap) || [];
            if (keys) {
                keys.sort((a, b) => (+b) - (+a));
            }
            let list: teammate[] = [];
            for (let i = 0; i < 10; i++) {//只展示10名即可
                let roleData = roleMap[keys[i]];
                if (roleData) {
                    list.push(roleData);
                }
            }
            this._listData.source = list;

            this.updateScrollerPos();
            this.updateBuildCnt();
            this.updateCost();

            if (this._isClickCheckBox) {
                this._isClickCheckBox = false;
                this._view.checkBox.selected = false;
            }
        }

        //更新scroller的y位置
        private updateScrollerPos(): void {
            let source = this._listData.source;
            if (source && source.length == 1) {
                this._view.scroller.y = 680;
            } else if (source && source.length == 2) {
                this._view.scroller.y = 460;
            } else {
                this._view.scroller.y = 210;
            }
        }

        private updateBuildCnt(): void {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById('attic_baodi');
            let maxCnt = paramCfg.value as number;
            let myBuildCnt = this._proxy.getBuildCnt();
            let leftCnt = (myBuildCnt % maxCnt == 0) ? maxCnt : (maxCnt - myBuildCnt % maxCnt);

            let str = StringUtil.substitute(getLanById(LanDef.tongtiange_tips3), [TextUtil.addColor(leftCnt + '', WhiteColor.GREEN)])
                + TextUtil.addColor(getLanById(LanDef.tongtiange_tips4), WhiteColor.YELLOW);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        private updateCost(): void {
            this._view.costIconOne.updateShow(this._proxy.getBuildCost());
            this._view.costIconTen.updateShow(this._proxy.getBuildCost(true));
            this._view.btn_build.setHint(this._proxy.canBuild());
            this._view.btn_buildten.setHint(this._proxy.canBuild(true));
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.TongtiangeRank);
        }

        private onClickReward(): void {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById('attic_weight');
            let list: BasePreviewRewardData[] = [];
            let value = paramCfg.value as number[];
            for (let i = 0; i < value.length; i++) {
                list.push({
                    nameStr: i == 0 ? 'huangjinge' : 'putongge',
                    weight: value[i] * 100,
                    award: this._proxy.getPreviewRewards(i + 1)
                });
            }
            ViewMgr.getIns().openPreviewReward(list);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.tongtiange_tips1));
        }

        private onClickBuild(): void {
            if (this._proxy.canBuild(false, true)) {
                this.sendBuild(1);
            }
        }

        private onClickBuildTen(): void {
            if (this._proxy.canBuild(true, true)) {
                this.sendBuild(2);
            }
        }

        private onClickCheckBox(): void {
            let check = this._view.checkBox.selected;
            this._isClickCheckBox = true;
            if (check && this._proxy.canBuild()) {
                this.sendBuild(3);
            } else {
                this._view.checkBox.selected = false;
            }
        }

        private sendBuild(type: number): void {
            //todo 粗暴处理，避免数据滑动断层，后续有时间再优化
            this._proxy.model.role_list = {};
            this._proxy.c2s_attic_build(type);
        }

        private onClickGain(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn4);
        }

        private onClickVip(): void {
            if (PayUtil.checkFirstCharge()) {
                ViewMgr.getIns().openVipView();
            } else {
                // facade.showView(ModName.Activity, MainActivityViewType.FirstCharge);
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
            }
        }

        //list滚动，请求下一页数据
        private onListChange(e: eui.PropertyEvent): void {
            if (e.property == "scrollV") {
                let viewport = this._view.scroller.viewport;
                let contentH = viewport.contentHeight;
                let scrollV = viewport.scrollV;
                let scrollerH = this._view.scroller.height;
                if (scrollV >= contentH - scrollerH && !this._reqNext) {
                    // 每次请求10名
                    let source = this._listData.source;
                    let lastRankItem: teammate;
                    if (source && source[source.length - 1]) {
                        lastRankItem = source[source.length - 1];
                    }
                    let lastRankNo = lastRankItem ? lastRankItem.rank_num : 0;//list中最后一名的数据
                    let rankNo = Math.max(lastRankNo - 10, 1);//最底下一名
                    if (rankNo == 1 && this._proxy.model.role_list[rankNo]) {
                        return;//最后一名已有，不需要请求
                    }
                    this._proxy.c2s_attic_storey_show(2, rankNo, rankNo + 10);
                    this._reqNext = true;
                }
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let cost = this._proxy.getBuildCost();
            if (indexs.indexOf(cost[0]) > -1) {
                this.updateCost();
            }
        }
    }
}