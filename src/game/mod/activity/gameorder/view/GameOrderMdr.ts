namespace game.mod.activity {


    import GameOrderTypeConfig = game.config.GameOrderTypeConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import callLater = egret.callLater;

    /**通用战令mdr*/
    export class GameOrderMdr extends MdrBase implements UpdateItem {
        protected _view: GameOrderView = this.mark("_view", GameOrderView);
        protected _proxy: GameOrderProxy;
        protected _listData: eui.ArrayCollection;
        protected _listItemData: eui.ArrayCollection;

        /**结束时间*/
        protected _endTime: number;
        /**战令类型*/
        protected _gameOrderType: GameOrderType;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GameOrder);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list_item.itemRenderer = GameOrderItem;
            this._view.list_item.dataProvider = this._listItemData = new eui.ArrayCollection();

            this._view.scroller["$hasScissor"] = true;

            // this._view.img_banner.source = ResUtil.getUiJpg("giving_banner");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_unlock, egret.TouchEvent.TOUCH_TAP, this.clickBtnStatus3);
            addEventListener(this._view.btn, egret.TouchEvent.TOUCH_TAP, this.onClick);

            this.onNt(ActivityEvent.ON_UPDATE_GIVING_LIST, this.onUpdateView, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            this._proxy.selType = null;
            this._view.btn_unlock.clearEffect();
            this._view.btn.clearEffect();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        /**onShow内调用*/
        protected updateView(): void {
            let type = this._gameOrderType;
            this._view.img_icon.source = `giving_icon_${type}`;
            if (type == GameOrderType.Chaojilicai || type == GameOrderType.Zhizunlicai) {
                this._view.img_type.source = `giving_type1_${type}`;
                this._view.img_type1.source = `giving_type_7`;
                this._view.img_type2.source = `giving_type2_${type}`;
            } else {
                this._view.img_type.source = `giving_type_${type == GameOrderType.XiuXian ? 1 : type}`;
                this._view.img_type1.source = `giving_title_2`;
                this._view.img_type2.source = type == GameOrderType.Huanjing ? "giving_type2_6" : "giving_title_1";
            }

            if (this._proxy.model.bannerType[type]) {
                this._view.img_banner.source = ResUtil.getUiJpg(this._proxy.model.bannerType[type]);
            } else {
                this._view.img_banner.source = ResUtil.getUiJpg("giving_banner");
            }

            this._endTime = this.getEndTime(type);
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
                this._view.gr_time.visible = true;
            } else {
                this._view.gr_time.visible = false;
            }
            this._view.btn_unlock.setEffect(UIEftSrc.ShouChongQianWang);
            this._view.btn_unlock.img_bg.width = this._view.btn_unlock.width;
            this._view.btn_unlock.img_bg.height = this._view.btn_unlock.height;

            this._view.btn.setEffect(UIEftSrc.Tiaozhan);

            this.onUpdateView();
            this.onUpdateIndex();
        }

        /**
         * 默认监听 ActivityEvent.ON_UPDATE_GIVING_LIST 回调
         */
        protected onUpdateView(): void {
            let type = this._gameOrderType;
            let status: number = this.getBtnStatus(type);
            if (status == 1) {
                let gotoStr = '前往挑战';
                if (GameOrderTypeBtnStr[type]) {
                    gotoStr = GameOrderTypeBtnStr[type];
                }
                this._view.btn.label = gotoStr;
            } else if (status == 2 || status == 0) {
                this._view.btn.label = "全部领取";
            } else if (status == 3) {
                this._view.btn.label = "解锁战令";
            }
            this._view.btn.redPoint.visible = status == 2;

            this._view.btn_unlock.visible = !this.getIsBought(type);
            let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, type);
            if (type == GameOrderType.Zhizunlicai || type == GameOrderType.Chaojilicai) {
                let rmb = PayUtil.getRmbValue(cfg.recharge_id);
                this._view.btn_unlock.setFontPrice(rmb);
            } else {
                this._view.btn_unlock.setImage(`giving_btn_${type}`, true);
            }

            if (cfg.target) {
                this._listData.source = cfg.target;
            }
            this._view.img_tips.visible = !cfg.target;
            this._view.gr_icon.visible = !this._view.img_tips.visible;
            if (this._proxy.model.notTipsType.indexOf(type) > -1) {
                this._view.img_tips.visible = false;//特殊的不展示，字体已嵌入banner中
            }
            if (this._view.img_tips.visible) {
                this._view.img_tips.source = `giving_tips_${type}`;
            }

            this._listItemData.source = this.getListByType(type);

            let val = this._proxy.getValueByType(type);
            let valStr = val + '';
            if (type == GameOrderType.XiuXian) {
                valStr = RoleUtil.getRebirthLvStrNoZhuan(val) + '转';
            }

            let str = GameOrderTypeStr[this._gameOrderType] + TextUtil.addColor(valStr, BlackColor.GREEN);
            this._view.lab_cur.textFlow = TextUtil.parseHtml(str);
        }

        /**滚动到可领取位置*/
        protected onUpdateIndex(): void {
            let type = this._gameOrderType;
            let pos: number = this.getPosByType();
            let child: number = this.getListByType(type).length;
            callLater(() => {
                ScrollUtil.moveVToAssign(this._view.scroller, pos, 134, 200, child);
            }, this);
        }

        /**获取可领取位置*/
        protected getPosByType(): number {
            return this._proxy.getPosByType(this._gameOrderType);
        }

        /**
         * 三种按钮状态的点击事件
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         */
        protected onClick(): void {
            let status: number = this.getBtnStatus(this._gameOrderType);
            switch (status) {
                case 1:
                    this.clickBtnStatus1();
                    break;
                case 2:
                    this.clickBtnStatus2();
                    break;
                case 3:
                    this.clickBtnStatus3();
                    break;
            }
        }

        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let hintPath = this._proxy.model.hintPath[this._gameOrderType];
            if (hintPath && data.node == HintMgr.getType(hintPath)) {
                this._view.btn.redPoint.visible = data.value;
            }
        }

        update(time: base.Time) {
            if (!this._endTime) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime < 0) {
                this._view.lab_time.text = getLanById(LanDef.battle_cue29);
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lab_time.textFlow = TextUtil.parseHtml(TimeUtil.formatSecond(leftTime, "d天H时", true));
        }

        /**重写，战令结束时间，返回0就是没有倒计时*/
        protected getEndTime(type: number): number {
            return this._proxy.getEndTime(type);
        }

        /**
         * 获取按钮状态
         * 1前往挑战
         * 2全部领取
         * 3解锁战令
         */
        protected getBtnStatus(type: number): number {
            return this._proxy.getBtnStatus(type);
        }

        /**重写，是否购买战令*/
        protected getIsBought(type: number): boolean {
            return this._proxy.getIsBought(type);
        }

        /**重写，获取列表数据 */
        protected getListByType(type: number): IGameOrderItemData[] {
            // let list = this._proxy.getListByType(type);
            // let list1: IGameOrderItemData[] = [];
            // for (let item of list) {
            //     list1.push({
            //         type,
            //         isBought: this.getIsBought(type),
            //         ...item
            //     });
            // }
            return this._proxy.getListByType(type);
        }

        /**前往挑战，按钮状态1*/
        protected clickBtnStatus1(): void {
            let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, this._gameOrderType);
            ViewMgr.getIns().showViewByID(cfg.jump);
        }

        /**请求领取战令奖励，按钮状态2*/
        protected clickBtnStatus2(): void {
            this._proxy.c2s_game_order_get_rewards(this._gameOrderType);
        }

        /**解锁战令，按钮状态3*/
        protected clickBtnStatus3(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.GameOrderUnlock,
                [this._gameOrderType, this.getReward(), this.getRewardCanGet()]);
        }

        /**购买后累计可领取的付费奖励*/
        public getReward(): PropData[] {
            return this._proxy.getReward(this._gameOrderType) || [];
        }

        /**现在购买可立即领取的付费奖励*/
        public getRewardCanGet(): PropData[] {
            return this._proxy.getRewardCanGet(this._gameOrderType) || [];
        }

    }
}