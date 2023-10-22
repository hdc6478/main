namespace game.mod.shenling {

    import LanDef = game.localization.LanDef;
    import ShenlingLeixingConfig = game.config.ShenlingLeixingConfig;
    import facade = base.facade;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import TouchEvent = egret.TouchEvent;

    export class ShenLingMdr extends EffectMdrBase implements UpdateItem {
        private _view: ShenLingView = this.mark("_view", ShenLingView);
        private _proxy: ShenLingProxy;
        private _giftProxy: IShenlingGiftProxy;
        private _listSkill: eui.ArrayCollection;
        private _listCost: eui.ArrayCollection;

        private _type = 1; //系列神灵
        private _typeCfg: ShenlingLeixingConfig;//系列神灵配置
        private _changeExp = false;//经验变化
        private _skillIdx = 0;//当前点击的灵宝技能index
        private _curIndex = 0;//当前对应的上阵的神灵index，如果还未上阵但有可激活的情况，就是此可激活的神灵index

        private _actTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
            this._giftProxy = getProxy(ModName.Activity, ProxyType.ShenlingGift);
            this._view.list_lingbao.itemRenderer = ShenLingSkillIcon;
            this._view.list_lingbao.dataProvider = this._listSkill = new eui.ArrayCollection();
            this._view.list_cost.itemRenderer = CostIcon;
            this._view.list_cost.dataProvider = this._listCost = new eui.ArrayCollection();
            this._view.btn_jiban.setHintStyle(0, 14);
            this._view.btn_shangzhen.setHintStyle(0, 14);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiBan, this);
            addEventListener(this._view.btn_shangzhen, egret.TouchEvent.TOUCH_TAP, this.onClickShangZhen, this);
            addEventListener(this._view.btn_lv, egret.TouchEvent.TOUCH_TAP, this.onClickUpLv, this);
            addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.icon_heji, egret.TouchEvent.TOUCH_TAP, this.onClickHeJi, this);
            addEventListener(this._view.list_lingbao, eui.ItemTapEvent.ITEM_TAP, this.onClickLingBao, this);
            addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct, this);
            addEventListener(this._view.btn_activity, TouchEvent.TOUCH_TAP, this.onClickActivity);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.onUpdateInfo, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_JI_BAN_UPDATE, this.onUpdateJiBanHint, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateByPropIndex, this);
            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE, this.onUpdateAct, this);
            this.onNt(ActivityEvent.ON_SHENLING_GIFT_INFO_UPDATE, this.updateTalentGift, this);
        }

        protected onShow(): void {
            super.onShow();

            GuideMgr.getIns().recordSpecialGuideMap(GuideKey.Back);
            GuideMgr.getIns().recordSpecialGuideMap(GuideKey.Shenling);

            this._view.typeListComp.updateListView(ShenLingMdrType.Main);
            this.onSwitchType(this.getDefaultType());
            this.updateGift();

            this.updateTalentGift();
        }

        private updateTalentGift(): void {
            this._view.btn_gift.visible = this._giftProxy.canOpen();
            this.updateShenlingGiftHint();
        }

        private updateGift(): void {
            let isShow = !PayUtil.checkFirstCharge();
            this._view.btn_first.visible = isShow;
            if (!isShow) {
                return;
            }
            this._view.btn_first.updateGift(null, true, Handler.alloc(this, this.onClickFirst));
        }

        //类型选择规则，可激活的阵位 > 可升级或突破 > 顺序第一个激活的 > 默认首个
        private getDefaultType(): number {
            for (let type of ShenLingTypeAry) {
                let cfg = this._proxy.getFirstActByType(type);
                if (cfg) {
                    this._curIndex = cfg.index;
                    return type;
                }
            }

            //指引自动选中
            let autoSel = GuideMgr.getIns().hasGuideKey([GuideKey.ShenlingOneUpAutoSel]);//会默认选中等级第2大的神灵
            if (autoSel) {
                let selType: number;
                let selInfo: GodBrotherTypeData = null;
                for (let i = 1; i < ShenLingTypeAry.length; ++i) {
                    //从第2个开始查找
                    let type = ShenLingTypeAry[i];
                    let info = this._proxy.getTypeInfo(type);
                    if (!info || !info.upindex) {
                        continue;
                    }
                    if (!selInfo || selInfo.level < info.level) {
                        selInfo = info;//选中等级最大的
                        selType = type;
                    }
                }
                if (selInfo) {
                    this._curIndex = selInfo.upindex;
                    return selType;
                }
            }

            for (let type of ShenLingTypeAry) {
                if (this._proxy.canUpLv(type) || this._proxy.canBreakThrough(type)) {
                    let info = this._proxy.getTypeInfo(type);
                    if (info && info.upindex) {
                        this._curIndex = info.upindex;
                        return type;
                    }
                }
            }

            for (let type of ShenLingTypeAry) {
                if (this._proxy.isTypeActed(type)) {
                    return type;
                }
            }

            return ShenLingTypeAry[0];
        }

        private onSwitchType(type: number = 1): void {
            this._type = type;
            this._typeCfg = this._proxy.getTypeCfg(this._type);
            this._view.typeListComp.updateSelType(type);
            this._changeExp = false;
            this.onUpdateInfo();
        }

        protected onHide(): void {

            GuideMgr.getIns().recordSpecialGuideMap(GuideKey.ShenlingAct);
            GuideMgr.getIns().firstFailedPass = false;
            GuideMgr.getIns().clear(GuideKey.ShenlingAct);//清除指引
            GuideMgr.getIns().clear(GuideKey.ShenlingOneUp);//清除指引
            GuideMgr.getIns().clear(GuideKey.ShenlingOneUpAutoSel);//清除指引
            this._view.moItem.removeModel();
            super.onHide();
            if (ActivityUtil.getFirstChargeCacheTimes() && !PayUtil.checkFirstCharge()) {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
            }
        }

        private onUpdateInfo(): void {
            this.updateTopInfo();
            this.updateHeJiSkillInfo();
            this.updateLingBaoSkillInfo();
            this.updateLvInfo();
            this.onUpdateAct();
            this.updateHint();
        }

        private updateTopInfo(): void {
            this._view.power.setPowerValue(this._proxy.getAllPowerByType(this._type));
            let index = this._curIndex;
            let info = this._proxy.getTypeInfo(this._type);
            if (info && info.upindex) {
                index = info.upindex;
                this._view.power.btn_desc.visible = true;
            } else {
                this._view.power.btn_desc.visible = false;
            }
            this._view.moItem.updateModel(index);
        }

        private updateHeJiSkillInfo(): void {
            let typeInfo = this._proxy.getTypeInfo(this._type);

            this._view.icon_heji.data = {
                skill_index: this._typeCfg.heji_id,
                is_act: typeInfo && typeInfo.level > 0,
                lv: typeInfo && typeInfo.skilllevel || 0,
                skill_type: SLSkillType.HeJi
            };
        }

        // 灵宝技能
        private updateLingBaoSkillInfo(): void {
            let typeInfo = this._proxy.getTypeInfo(this._type);
            let skillList: number[] = typeInfo && typeInfo.skill_list || [];
            let list: ISLSkillIconData[] = [];
            for (let idx of this._typeCfg.skill_array) {
                let isAct = skillList.indexOf(idx) > -1;
                list.push({
                    skill_index: idx,
                    is_act: isAct,
                    hint: this._proxy.checkLingBaoSkillAct(this._type, idx)
                });
                if (this._skillIdx && this._skillIdx == idx && isAct) {
                    this.sendNt(SurfaceEvent.SURFACE_SKILL_UPDATE, isAct);
                    this._skillIdx = null;
                }
            }
            this._listSkill.replaceAll(list);
        }

        private updateLvInfo(): void {
            let info = this._proxy.getTypeInfo(this._type);
            this._view.img_max.visible = false;

            //神灵激活
            GuideMgr.getIns().clear(GuideKey.ShenlingAct);
            if ((!info || !info.upindex) && this._curIndex) {
                this._view.gr_uplv.visible = false;
                this._view.btn_act.visible = true;
                this._view.btn_act.setHint(true);
                GuideMgr.getIns().show(GuideKey.ShenlingAct, this._view.btn_act, Handler.alloc(this, this.onClickAct), GuideKey.Back);
                return;
            }

            this._view.gr_uplv.visible = true;
            this._view.btn_act.visible = false;

            let lvCfg = this._proxy.getLevelCfg(info.level);
            if (!lvCfg) {
                return;
            }
            let cost = lvCfg.star_consume;
            let time = 10;
            if (cost && cost[0]) {
                time *= cost[0][1];
            }
            this._view.lb_level.text = info.level + '';
            let isMax = this._proxy.isMaxLv(this._type);
            if (isMax) {
                this._view.bar.showMax();
            } else {
                this._view.bar.show(info.exp * time, lvCfg.exp * time, this._changeExp, info.level);
            }
            this._changeExp = false;
            if (isMax) {
                this._view.img_max.visible = true;
                this._view.list_cost.visible = this._view.btn_lv.visible
                    = this._view.btn_oneKey.visible = this._view.btn_act.visible = false;
                return;
            }
            this._view.btn_lv.visible = true;
            this._view.list_cost.visible = true;
            this.updateCost();
        }

        private updateCost(): void {
            let info = this._proxy.getTypeInfo(this._type);
            let lvCfg = this._proxy.getLevelCfg(info.level);
            if (!lvCfg) {
                return;
            }
            let cost: number[][] = [];
            if (this._proxy.isBreakThrough(this._type)) {
                this._view.btn_lv.x = 261;
                this._view.btn_lv.label = getLanById(LanDef.weapon_tips34);
                this._view.btn_lv.setYellow();
                this._view.btn_lv.setHint(this._proxy.canBreakThrough(this._type));
                this._view.bar.visible = this._view.gr_lv.visible = false;
                cost.push(...lvCfg.tupo_consume);
                this._view.btn_oneKey.visible = false;
                this._view.list_cost.y = 60;
                GuideMgr.getIns().show(GuideKey.ShenlingOneUp, this._view.btn_lv, Handler.alloc(this, this.onClickUpLv));//神灵突破指引
                GuideMgr.getIns().show(GuideKey.ShenlingOneUpAutoSel, this._view.btn_lv, Handler.alloc(this, this.onClickUpLv));//神灵突破指引
            } else {
                this._view.list_cost.y = 81;
                this._view.btn_lv.x = 100;
                this._view.btn_lv.label = getLanById(LanDef.uplv);
                this._view.btn_lv.setBlue();
                this._view.bar.visible = this._view.gr_lv.visible = true;
                cost.push(...lvCfg.star_consume);
                this._view.btn_oneKey.visible = true;
                let isHint = this._proxy.canUpLv(this._type);
                this._view.btn_lv.setHint(isHint);
                this._view.btn_oneKey.setHint(isHint);
                GuideMgr.getIns().show(GuideKey.ShenlingOneUp, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey));//神灵升级指引
                GuideMgr.getIns().show(GuideKey.ShenlingOneUpAutoSel, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey));//神灵升级指引
            }
            this._listCost.replaceAll(cost);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = (e.item as ISLTypeIconData).type;
            let info = this._proxy.getTypeInfo(type);
            if (!info || !info.upindex) {
                let canActCfg = this._proxy.getFirstActByType(type);
                if (!canActCfg) {
                    this._view.typeListComp.updateSelType(this._type);
                    ViewMgr.getIns().showGainWaysTips(PropIndex.ShenlingSuipian);
                    return;
                }
                this._curIndex = canActCfg.index;
            } else {
                this._curIndex = info.upindex;
            }
            GuideMgr.getIns().clear(GuideKey.ShenlingAct);//清除指引
            this.onSwitchType(type);
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingAttr, [this._type]);
        }

        private onClickJiBan(): void {
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.ShenLing);
        }

        private onClickShangZhen(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingShangZhen);
        }

        private onClickUpLv(): void {
            let isBt = this._proxy.isBreakThrough(this._type);
            if ((isBt && !this._proxy.canBreakThrough(this._type, true))
                || (!isBt && !this._proxy.canUpLv(this._type, true))) {
                return;
            }
            this._changeExp = true;
            this._proxy.c2s_god_brother_levelup(this._type, isBt ? 3 : 1);
        }

        private onClickOneKey(): void {
            if (!this._proxy.canUpLv(this._type, true)) {
                return;
            }
            this._changeExp = true;
            this._proxy.c2s_god_brother_levelup(this._type, 2);
        }

        private onClickHeJi(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._curIndex,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.HeJi
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickLingBao(e: eui.ItemTapEvent): void {
            let sData = e.item as ISLSkillIconData;
            if (!sData) {
                return;
            }
            this._skillIdx = sData.skill_index;
            let skillData = this.getSkillStatue(sData.skill_index);
            ViewMgr.getIns().showSkillTips(sData.skill_index, skillData.is_act,
                Handler.alloc(this, this.clickLingBaoSkillHandler, [this._type, skillData.slot]),
                Handler.alloc(this, this.lingBaoCondHandler));
        }

        private getSkillStatue(skill_index: number): { is_act: boolean, slot: number } {
            let skillList = this._typeCfg.skill_array;
            let typeInfo = this._proxy.getTypeInfo(this._type);
            let actedList = typeInfo && typeInfo.skill_list || [];
            for (let i = 0; i < skillList.length; i++) {
                let item = skillList[i];
                if (item && item == skill_index) {
                    return {
                        is_act: actedList.indexOf(skill_index) > -1,
                        slot: i + 1
                    };
                }
            }
            return { is_act: false, slot: 0 };
        }

        private onClickAct(): void {
            if (this._curIndex) {
                GuideMgr.getIns().recordSpecialGuideMap(GuideKey.ShenlingAct);
                GuideMgr.getIns().firstFailedPass = false;
                this._proxy.c2s_god_brother_starup(this._curIndex);
            }
        }

        private onClickActivity(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.PunshList);
        }

        private onClickFirst(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
        }

        /**点击灵宝技能激活按钮回调*/
        private clickLingBaoSkillHandler(...data: any[]): void {
            this._proxy.c2s_god_brother_s_skill(data[0], data[1]);
        }

        /**灵宝技能激活条件*/
        private lingBaoCondHandler(): boolean {
            let info = this._proxy.getTypeInfo(this._type);
            return !!(info && info.upindex);
        }

        private onUpdateByPropIndex(n: GameNT): void {
            if (!this._proxy.isTypeActed(this._type)) {
                return;
            }
            let list = n.body as number[];
            let costList = this._proxy.getConsumeList();
            for (let idx of list) {
                if (costList.indexOf(idx) > -1) {
                    this.updateHint();
                    this.updateLingBaoSkillInfo();
                    this.updateCost();
                    break;
                }
            }
        }

        //羁绊红点
        private onUpdateJiBanHint(): void {
            this._view.btn_jiban.setHint(this._proxy.getJiBanHint());
        }

        private onUpdateAct(): void {
            let rankType: number = ActivityUtil.getRankTypeByOpenIdx(OpenIdx.Shenling);
            let type: number = ActivityUtil.getType();
            if (rankType == type && ViewMgr.getIns().checkViewOpen(OpenIdx.PunshList)) {
                this._actTime = ActivityUtil.getPunshListEndTime();
                if (this._actTime > 0 && !TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                }
                this._view.grp_act.visible = true;
            } else {
                this._actTime = 0;
                this._view.grp_act.visible = false;
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateHint(): void {
            this._view.typeListComp.updateListHint(ShenLingMdrType.Main);//类型按钮红点
            this._view.btn_shangzhen.setHint(this._proxy.getShangZhenHint());//上阵红点
            this.onUpdateJiBanHint();
            this.onUpdateActHint();
        }

        private onUpdateActHint(): void {
            if (this._view.grp_act.visible) {
                let rankType: number = ActivityUtil.getRankTypeByOpenIdx(OpenIdx.Shenling);
                this._view.btn_activity.setHint(HintMgr.getHint(ActivityUtil.getSurfaceHintNodes(rankType)));
            }
        }

        update(time: base.Time) {
            let leftTime = this._actTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            if (leftTime <= 0) {
                this._view.lab_time.text = '';
                return;
            }
            let format = 'mm分ss秒';
            if (leftTime >= Second.Day) {
                format = 'dd天HH时';
            } else if (leftTime >= Second.Hour) {
                format = 'HH时mm分';
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, format) + "";
        }

        private onClickGift(): void {
            facade.showView(ModName.Activity, MainActivityViewType.ShenlingGift);
            this._giftProxy.giftHint = false;
            this.updateShenlingGiftHint();
        }

        private updateShenlingGiftHint(): void {
            this._view.btn_gift.setHint(this._giftProxy.giftHint);
        }
    }
}