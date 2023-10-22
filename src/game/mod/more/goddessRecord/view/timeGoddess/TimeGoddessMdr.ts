namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import NvshenLevelConfig = game.config.NvshenLevelConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import zhandui_jitan_struct = msg.zhandui_jitan_struct;
    import GameNT = base.GameNT;

    export class TimeGoddessMdr extends EffectMdrBase implements UpdateItem {
        private _view: TimeGoddessView = this.mark("_view", TimeGoddessView);
        private _proxy: GoddessRecordProxy;
        private _huangguProxy: HuangguProxy;
        private _endTime: number = 0;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
            this._huangguProxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_exp, TouchEvent.TOUCH_TAP, this.onClickExp);
            addEventListener(this._view.btn_chat, TouchEvent.TOUCH_TAP, this.onClickChat);
            addEventListener(this._view.btn_event, TouchEvent.TOUCH_TAP, this.onClickEvent);
            addEventListener(this._view.btn_speedup, TouchEvent.TOUCH_TAP, this.onClickSpeedup);
            addEventListener(this._view.grp_speedup, TouchEvent.TOUCH_TAP, this.onClickSpeedup);
            addEventListener(this._view.btn_card, TouchEvent.TOUCH_TAP, this.onClickCard);

            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_CHAT_INFO, this.updateChatHint, this);
            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_EVENT_INFO, this.onEventUpdate, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.updateEventHint, this);
            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_LV_INFO, this.updateLv, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_GONGFENG_INFO, this.updateGongfeng, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateLv();
            this.updateSummon();
            this.updateHint();
            this.updateGongfeng();

            this.reqInfo();
            this._huangguProxy.c2s_nvshen_get_chat(CommonChatType.TimeGoddess);//请求对话信息
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.cs_nvshen_qinmi) >= 0) {
                this.updateLv();
            }
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            const prop_index: number = 1450100174;
            if (indexs.indexOf(prop_index) > -1) {
                this.updateSummon();
            }
        }

        private onClickExp(): void {
            facade.showView(ModName.More, MoreViewType.TimeGoddessSummon);
        }

        private onClickChat(): void {
            facade.showView(ModName.More, MoreViewType.TimeGoddessChat);
        }

        private onClickEvent(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.TimeGoddessEvent);
        }

        private onClickSpeedup(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.TimeGoddessSpeedUp);
        }

        private onClickCard(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.HunkaMain);
        }

        private initShow(): void {
            this._view.btn_gift.updateGift(ProductId.Id201401);
        }

        private updateLv(): void {
            let lv = this._proxy.lv;
            let exp = RoleVo.ins.getValueByKey(RolePropertyKey.cs_nvshen_qinmi);
            let fontStr = lv + "";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.GoddessFont], this._view.grp_lv, true, 1, true);
            let nextLv = lv + 1;
            let cfg: NvshenLevelConfig = getConfigByNameId(ConfigName.NvshenLevel, nextLv);
            if (!cfg) {
                cfg = getConfigByNameId(ConfigName.NvshenLevel, lv);
            }
            this._view.bar.show(exp, cfg.exp, false, 0, false);
        }

        private updateSummon(): void {
            let val = this._proxy.getMinVal();
            let hint = this._proxy.checkSummonHint();
            this._view.btn_exp.updateShow(val, hint);
        }

        private onEventUpdate(): void {
            this.updateChatHint();
            this.updateEventHint();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.hunkaHint)) {
                this.updateHunkaHint(data.value);
            }
        }

        private updateHint(): void {
            this.updateChatHint();
            this.updateEventHint();
            this.updateHunkaHint(HintMgr.getHint(this._proxy.hunkaHint));
        }

        private updateChatHint() {
            this._view.btn_chat.redPoint.visible = this._proxy.checkChatHint();
        }

        private updateEventHint() {
            this._view.btn_event.redPoint.visible = this._proxy.checkEventHint();
        }

        private updateHunkaHint(hint: boolean) {
            this._view.btn_card.redPoint.visible = hint;
        }

        update(time: base.Time) {
            this.updateTime();
        }

        private updateGongfeng(): void {
            let propList = this._proxy.prop_list;
            let curInfo: zhandui_jitan_struct;
            for (let i = 0; i < TimeGoddessGongfengCnt; i++) {
                let pos = i + 1;
                let info = i < propList.length ? propList[i] : null;
                if (!curInfo && this._proxy.gongfenging(info)) {
                    curInfo = info;
                }
                let data: { info: zhandui_jitan_struct, pos: number } = { info: info, pos: pos };
                this._view[`item${i}`].data = data;
            }
            this._view.grp_speedup.visible = !!curInfo;
            if (curInfo) {
                TimeMgr.addUpdateItem(this, 1000);
                let cfg = GameConfig.getPropConfigById(curInfo.idx.toNumber());
                this._view.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
                this._endTime = curInfo.endtime.toNumber();
                this.updateTime();
            } else {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime == 0) {
                this.reqInfo();
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, "d天H时", true);
        }

        private reqInfo(): void {
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.GongfengInfo);//正在献祭的完成了，请求数据
        }
    }
}