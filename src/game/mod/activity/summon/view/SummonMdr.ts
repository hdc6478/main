namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;
    import facade = base.facade;
    import DrawMainConfig = game.config.DrawMainConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import oper_act_item = msg.oper_act_item;
    import LanDef = game.localization.LanDef;

    export class SummonMdr extends EffectMdrBase implements UpdateItem{
        private _view: SummonView = this.mark("_view", SummonView);
        private _proxy: SummonProxy;

        private _isHund: boolean = false;
        private _eftId_sel: number;//特效

        private _rankTime: number;
        private _actInfo: oper_act_item;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Summon);

            // this._view.img_bg.source = ResUtil.getUiJpg("beijingtu_zhaohuan");
            this._view.img_card.source = `card_2`;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClickSummon);
            addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onClickSummonTen);
            addEventListener(this._view.btn_exchange, TouchEvent.TOUCH_TAP, this.onJumpExchange);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onJumpGift);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onJumpRank);
            addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onCheckBox);
            addEventListener(this._view.btn_gain, TouchEvent.TOUCH_TAP, this.onClickGain);
            addEventListener(this._view.btn_zhanling, TouchEvent.TOUCH_TAP, this.onClickZhanling);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.btn_carnival, TouchEvent.TOUCH_TAP, this.onClickCarnival);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
            this.onNt(ActivityEvent.ON_UPDATE_SUMMON, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_UPDATE_BY_TYPE, this.onActivityUpdateByType, this);

        }

        protected onShow(): void {
            super.onShow();

            this.removeEft();
            this.addEftByParent(UIEftSrc.Zhaohuananniu, this._view.btn_ten.group_eft, 510, 914);
            this.onUpdateView();
            this.showGuide();
            this.updateCarnival();
        }

        private onUpdateView(): void {
            this._view.checkbox.visible = this._proxy.model.count >= 300;

            // let liquan: PropData = PropData.create(PropIndex.Ticket);
            // this._view.cost.imgCost = liquan.cfg.icon;
            let cnt: number = BagUtil.getPropCntByIdx(PropIndex.Ticket);
            this._view.cost.updateShow([PropIndex.Ticket, cnt]);
            this._view.cost.setLabCost(`${BagUtil.getPropCntByIdx(PropIndex.Ticket)}`);

            this._view.btn_gift.setHint(HintMgr.getHint([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift]));
            this._view.btn_rank.setHint(HintMgr.getHint([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank]));
            this._view.btn_exchange.setHint(HintMgr.getHint([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonExchange]));

            let head = this._proxy.model.rank_list[0];
            if (head) {
                //this._view.head.updateShow(head.head, head.head_frame, head.sex, head.vip);
                this._view.head.updateShow(head.head, head.head_frame, head.sex, head.sex, head.role_id);
                this._view.lab_name.text = `${head.name}`;
            } else {
                this._view.head.defaultHeadShow();
                this._view.lab_name.text = "虚位以待";
            }

            this.onUpdateMust();

            this.onUpdateBtn();
        }

        private onUpdateBtn(): void {
            let once: PropData = this._proxy.getPropDataByType(CommonCountType.Once);
            this._view.cost_once.imgCost = once.cfg.icon;
            let num: number = BagUtil.getPropCntByIdx(once.index);
            let color = num >= once.count ? BlackColor.GREEN : BlackColor.RED;
            if (once.index == PropIndex.Xianyu) {
                this._view.cost_once.setLabCost(`${once.count}`, color);
            } else {
                this._view.cost_once.setLabCost(`${num}/${once.count}`, color);
            }
            this._view.btn_once.setImage("dancizhaohuan");
            this._view.btn_once.setHint(num >= once.count);
            this.onUpdateTenBtn();
        }

        private onUpdateMust(): void {
            let count: number = this._proxy.getCount(this._proxy.model.count);

            if (count < 1) {
                //隐藏保底
                this._view.gr.visible = false;
                this.removeEft();
                this._eftId_sel = null;
                return;
            }
            if (!this._eftId_sel) {
                this._eftId_sel = this.addEftByParent(UIEftSrc.SurfaceSel, this._view.group_eft, 0, 0, 0, null, 0, 1.1);
            }
            this._view.icon.setData(this._proxy.getMustGetProp());

            this._view.img_must.visible = count == 1;
            this._view.grp_havecount.visible = count > 1;
            if (count > 1) {
                this.addBmpFont(`${count}`, BmpTextCfg[BmpTextType.Summon], this._view.grp_count, true, 1, true);
            }
        }

        private isCheck(prop: PropData): boolean {
            if (prop.index == PropIndex.Xianyu) {
                let xianyu = BagUtil.getPropCntByIdx(PropIndex.Xianyu);
                if (xianyu < prop.count) {
                    ViewMgr.getIns().openCommonRechargeView();
                }
            }
            return true;
        }

        private onClickSummon(): void {

            let once: PropData = this._proxy.getPropDataByType(CommonCountType.Once);
            if (this.isCheck(once)) {
                this.reqSummon(CommonCountType.Once);
            }
        }

        private onClickSummonTen(): void {
            let ten: PropData = this._proxy.getPropDataByType(CommonCountType.Ten);
            if (this.isCheck(ten)) {
                let type = this._isHund ? CommonCountType.Hund : CommonCountType.Ten;
                this.reqSummon(type);
            }
        }

        private reqSummon(type: number): void {
            this._proxy.model.type = type;
            this._proxy.c2s_draw_button_click(this._proxy.model.type);
        }

        private onJumpExchange(): void {
            // ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonExchange);
            ViewMgr.getIns().openExchangeShopView(`0${ExchangeShopType.Type2}`);
        }

        private onJumpGift(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.SummonGift);
        }

        private onJumpRank(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonRank);
        }

        private onClickGain(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item");
            ViewMgr.getIns().showGainWaysTips(cfg.value[0][0]);
        }

        private onClickZhanling(): void {
            //ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.Giving);
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02);
        }

        private onClickPreview(): void {
            let cfgArr: DrawMainConfig[] = getConfigListByName(ConfigName.DrawMain);
            let list: BasePreviewRewardData[] = [];
            for (let cfg of cfgArr) {
                list.push({
                    weight: cfg.weight,
                    award: cfg.award,
                    nameStr: "rolering_reward_type" + cfg.quality
                });
            }
            ViewMgr.getIns().openPreviewReward(list);
        }

        private onCheckBox(): void {
            this._isHund = !this._isHund;
            this.onUpdateTenBtn();
        }

        private onUpdateTenBtn(): void {
            this._view.checkbox.currentState = this._isHund ? "upAndSelected" : "disabled";

            let ten: PropData = this._proxy.getPropDataByType(this._isHund ? CommonCountType.Hund : CommonCountType.Ten);
            this._view.cost_ten.imgCost = ten.cfg.icon;
            let count: number = BagUtil.getPropCntByIdx(ten.index);
            let color = count >= ten.count ? BlackColor.GREEN : BlackColor.RED;
            if (ten.index == PropIndex.Xianyu) {
                this._view.cost_ten.setLabCost(`${ten.count}`, color);
            } else {
                this._view.cost_ten.setLabCost(`${count}/${ten.count}`, color);
            }

            this._view.btn_ten.setImage(this._isHund ? "bailianzhaohuan" : "shilianzhaohuan");
            this._view.btn_ten.setHint(count >= ten.count);
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "zhaohuan_item");
            this._view.img_zhekou.visible = ten.index != cfg.value[0][0];
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank])) {
                this._view.btn_rank.redPoint.visible = data.value;
            }
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift])) {
                this._view.btn_gift.redPoint.visible = data.value;
            }
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonExchange])) {
                this._view.btn_exchange.redPoint.visible = data.value;
            }

        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.SummonTen);//清除指引
            this._eftId_sel = null;
            TimeMgr.removeUpdateItem(this);
            this._rankTime = 0;
            this._actInfo = null;
            super.onHide();
        }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.SummonTen, this._view.btn_ten, Handler.alloc(this, this.onClickSummonTen), GuideKey.Back, {y: -10});
        }


        /**********************************狂欢庆典**********************************/
        private onClickCarnival(): void {
            if(!this._actInfo){
                PromptBox.getIns().show(getLanById(LanDef.huodongzanweikaiqi));
                return;
            }

            if(!ViewMgr.getIns().isOpenCentralActivity(this._actInfo)){
                PromptBox.getIns().show("活动未开启");
                return;
            }
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ActMain, this._actInfo);
        }

        /** 通用中控活动事件监听 */
        private onActivityUpdateByType(n: GameNT): void {
            let typeList: number[] = n.body;
            if (typeList.indexOf(ActivityType.Carnival) > -1 || typeList.indexOf(ActivityType.CarnivalNotice) > -1) {
                this.updateCarnival();
            }
        }

        private updateCarnival(): void {
            let activityProxy: ActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            let actList = activityProxy.getOperActList(ActivityType.Carnival);
            if(!actList.length){
                //取不到活动时，取活动预告时间
                actList = activityProxy.getOperActList(ActivityType.CarnivalNotice);
            }
            this._actInfo = actList.length ? actList[0] : null;
            if(!this._actInfo){
                this._view.btn_carnival.visible = false;
                this._view.img_ditu1.visible=false;
                this._view.lab_carnival.text = "";
                return;
            }
            this._view.btn_carnival.visible = true;
            this._view.img_ditu1.visible=true;
            this._rankTime = this._actInfo.c_end_time;
            this.updateTime();

            this._view.btn_carnival.redPoint.visible = activityProxy.getEntranceHintByActType(ActivityType.Carnival);

            TimeMgr.addUpdateItem(this, 1000);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let leftTime = this._rankTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._view.btn_carnival.visible = false;
                this._view.img_ditu1.visible=false;
                this._view.lab_carnival.text = "";
                return;
            }
            if(this._actInfo.type == ActivityType.Carnival){
                this._view.lab_carnival.text = getLanById(LanDef.battle_cue32);
            }
            else {
                this._view.lab_carnival.text = TimeUtil.formatSecond(leftTime, 'd天H时', true) + "后开启";
            }
        }
    }
}