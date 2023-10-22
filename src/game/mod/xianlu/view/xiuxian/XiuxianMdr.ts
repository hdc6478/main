namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import RebirthConfig = game.config.RebirthConfig;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class XiuxianMdr extends EffectMdrBase implements UpdateItem {
        private _view: XiuxianView = this.mark("_view", XiuxianView);
        private _proxy: XianluProxy;
        private _proxy2: ITehuiLibaoProxy;  //特惠礼包判断是否购买

        private _itemList: ArrayCollection;
        private _taskList: ArrayCollection;
        private _effId_break: number;
        private _effId_xianpo: number;
        protected _endTime = 0;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = XiuxianFireRender;
            this._view.list_item.dataProvider = this._itemList;

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = TaskRender2;
            this._view.list_task.dataProvider = this._taskList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
            this._proxy2 = facade.retMod(ModName.Activity).retProxy(ProxyType.TehuiLibao);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickLibao);
            addEventListener(this._view.btn_gift1, TouchEvent.TOUCH_TAP, this.onClickGift1);
            addEventListener(this._view.btn_gift2, TouchEvent.TOUCH_TAP, this.onClickGift2);
            addEventListener(this._view.btn_war, TouchEvent.TOUCH_TAP, this.onClickWar);
            addEventListener(this._view.btn_xianpo, TouchEvent.TOUCH_TAP, this.onClickXianpo);
            addEventListener(this._view.btn_break, TouchEvent.TOUCH_TAP, this.onClickBreak);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(XianluEvent.XIUXIAN_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTaskList();
            this.updateInfo();
            this.updateBreak();
            this.updateHint();
            this.onUpdateTime();

            this.isShowIcon();
        }

        protected isShowIcon(): void {
            let productId = this._proxy2.getInfo(3);
            let hasBuy = PayUtil.hasBuy(productId);
            this._view.btn_gift2.visible = !hasBuy;
        }

        protected onUpdateTime(): void {
            this._view.btn_gift2.img_bg.visible = false;
            this._view.btn_gift2.gr_time.visible = true;
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.btn_gift2.lb_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }

        protected onHide(): void {
            this._effId_break = 0;
            this._effId_xianpo = 0;
            TimeMgr.removeUpdateItem(this);
            this._endTime = 0;
            super.onHide();
        }

        private initShow(): void {
            //this.addEftByParent(UIEftSrc.Xianlu_1, this._view.group_eft1);
            //this.addEftByParent(UIEftSrc.Xianlu_6, this._view.group_eft2);
            this.addEftByParent2(UIEftSrc.Xianlu_1, this._view.group_eft1, true, 0.5);
            this.addEftByParent2(UIEftSrc.Xianlu_6, this._view.group_eft2, true, 0.5);
            this.addEftByParent(UIEftSrc.Xianlu_7, this._view.btn_war.group_eft);

        }

        private onClickPreview(): void {
            ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.XiuxianPreview);
        }

        private onClickGift1(): void {
            //todo
            PromptBox.getIns().show("修仙特惠");
        }

        //修仙礼包
        private onClickGift2(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TehuiLibao, TehuiType.XiuXianJieji);
            //ViewMgr.getIns().showGift(ProductId.Id201903);
        }

        private onClickWar(): void {
            //todo
            //PromptBox.getIns().show("修仙令");
            // let props: msg.prop_tips_data[] = [];
            // for(let i = 0; i < 8; ++i){
            //     props.push({idx: Long.fromValue(1450401001 + i), cnt: i + 1})
            // }
            // PropTipsMgr.getIns().show(props);
            ViewMgr.getIns().showViewByID(JumpIdx.Xiuxianling);
        }

        private onClickXianpo(): void {
            //点击仙魄，弹出仙魄tips
            facade.showView(ModName.Xianlu, XianluViewType.XiuxianTips);
        }

        private onClickBreak(): void {
            //可以突破下一境界
            this._proxy.c2s_xianlu_reinc_levelup();
        }

        private onClickJinji(): void {
            //修仙礼包
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TehuiLibao, TehuiType.XiuXianJieji);
        }

        //坐骑进阶礼包
        private onClickLibao(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.XianLvJinJie);
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Xiuxian) > -1) {
                this.updateTaskList();
                this.updateBreak();
            }
        }

        private onInfoUpdate(): void {
            this.updateInfo();
            this.updateBreak();
            this.isShowIcon();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.model.rewardHint)) {
                this.updateRewardHint(data.value);
            }
        }

        private updateTaskList(): void {
            let tasks = TaskUtil.getTaskList(TaskType.Xiuxian);
            if (this._taskList.source.length > 0) {
                this._taskList.replaceAll(tasks);
            } else {
                this._taskList.source = tasks;
            }
        }

        private updateInfo(): void {
            let index = this._proxy.model.index;
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            if (!cfg) {
                return;
            }
            this._view.lab_name.text = cfg.name;

            let fontStr = ResUtil.getRebirthFontStr(index);
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_lv, true, 1, true);

            let chongLv = cfg.relv2;
            let maxLv = this._proxy.getMaxChongLv();
            let items: number[] = [];
            for (let i = 0; i < maxLv; ++i) {
                items.push(chongLv);
            }
            if (this._itemList.source.length > 0) {
                this._itemList.replaceAll(items);
            } else {
                this._itemList.source = items;
            }
        }

        private updateBreak(): void {
            let canBreak = this._proxy.canBreak();
            this._view.btn_break.visible = this._view.btn_break.redPoint.visible = canBreak;
            if (this._view.btn_break.visible && !this._effId_break) {
                this._effId_break = this.addEftByParent(UIEftSrc.Xianlu_2, this._view.btn_break.group_eft);
            }
            this._view.btn_xianpo.visible = !canBreak;
            if (this._view.btn_xianpo.visible && !this._effId_xianpo) {
                this._effId_xianpo = this.addEftByParent(UIEftSrc.Xianlu_5, this._view.btn_xianpo.group_eft);
            }
        }

        /** 更新红点 */
        private updateHint() {
            this.updateRewardHint(HintMgr.getHint(this._proxy.model.rewardHint));
        }

        private updateRewardHint(hint: boolean) {
            this._view.btn_preview.redPoint.visible = hint;
        }
    }
}