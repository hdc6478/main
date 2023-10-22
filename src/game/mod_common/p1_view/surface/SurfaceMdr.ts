namespace game.mod {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import attributes = msg.attributes;
    import HorseConfig = game.config.HorseConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import oper_act_item = msg.oper_act_item;

    export class SurfaceMdr extends EffectMdrBase implements UpdateItem {
        protected _view: SurfaceView = this.mark("_view", SurfaceView);

        private _itemList: ArrayCollection;
        private _skillList: ArrayCollection;

        private _proxy: ISurfaceProxy;
        private _headType: number;
        private _cost: number[];
        /**当前外显属性*/
        private _attr: attributes;
        private _skillId: number;
        private _isFirst: boolean = true;//首次进入

        private _actTime: number;
        private _flyRankTime: number;
        private _flyRankActInfo: oper_act_item;

        /**幻化按钮data */
        private _huanData: TabBaseItemData = {
            icon: "huanhua_btn_icon",
            showHint: false
        };

        protected showLv: boolean = true;//默认显示技能等级，子类可重写
        protected showZero: boolean = false;//默认不显示0级技能，子类可重写

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            // this._proxy = this.retProxy(ProxyType.Surface);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = SurfaceLvItemRender;
            this._view.list_item.dataProvider = this._itemList;

            this._skillList = new ArrayCollection();
            this._view.list_skill.itemRenderer = SkillItemRender;
            this._view.list_skill.dataProvider = this._skillList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_jiban, TouchEvent.TOUCH_TAP, this.onClickJiban);
            addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickOnekey);
            addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
            addEventListener(this._view.btn_huan, TouchEvent.TOUCH_TAP, this.onClickStar);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
            addEventListener(this._view.btn_flyRank, TouchEvent.TOUCH_TAP, this.onClickFlyRank);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_TYPE, this.onUpdateAct, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_UPDATE_BY_TYPE, this.onActivityUpdateByType, this);
        }

        protected onShow(): void {
            super.onShow();
            this._headType = this._proxy.headType;
            this.initView();
            this.updateModel();
            this.updateInfo();
            this.onUpdateAct();
            this.updateHint();
            this.updateFlyRank();
        }

        protected onHide(): void {
            this._skillId = 0;
            this._isFirst = true;
            this._flyRankTime = 0;
            this._flyRankActInfo = null;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickAct(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.PunshList);
        }

        private onClickDesc(): void {


            if(this._headType == ConfigHead.Huashen){
                //化神属性为 0 不显示
                let attr = PropData.filterAtr0(this._attr);
                ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"),attr as attributes);

            }else{
                ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[this._headType] + "_attr"),this._attr);
            }


        }

        private onClickGift(): void {
            ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.SurfaceGiftMain);
            // let skillId = this._proxy.getSurfaceSkillId(this._headType);
            // let data: BattleSkillItemRenderData = {skillId: skillId, lv: 1};
            // facade.showView(ModName.Surface, SurfaceViewType.SurfaceUpTips, data);//进阶成功
        }

        private onClickJiban(): void {
            let btnType = this._proxy.getBtnType(this._headType);
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, btnType);
        }

        private onClickItemSkill(): void {
            let data: BattleSkillItemRenderData = this._view.item_skill.data;
            facade.showView(ModName.Surface, SurfaceViewType.SurfaceSkillTips, data);
        }

        private onClickSkill(e: ItemTapEvent): void {
            let data: SkillItemRenderData = e.item;
            let skillId = data.skillId;
            let isAct = data.isAct;
            this._skillId = skillId;

            ViewMgr.getIns().showSkillTips(skillId, isAct, Handler.alloc(this, () => {
                //激活技能
                this._proxy.c2s_ride_oper_skill_active(skillId, this._headType);
            }));
        }

        private onClickStar(): void {
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, this._proxy.getStarRoadByHeadType(this._headType));
        }

        private onClickUp(): void {
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_ride_oper_up(SurfaceUpOpType.Per, this._headType);
        }

        private onClickOnekey(): void {
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_ride_oper_up(SurfaceUpOpType.Onekey, this._headType);
        }

        private onUpdateAct(): void {
            let openIdx: number = this._proxy.getOpenIdx(this._headType);
            let rankType: number = ActivityUtil.getRankTypeByOpenIdx(openIdx);
            let type: number = ActivityUtil.getType();
            if (type && rankType == type && ViewMgr.getIns().checkViewOpen(OpenIdx.PunshList)) {
                this._actTime = ActivityUtil.getPunshListEndTime();
                if (this._actTime > 0 && !TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.updateTime(TimeMgr.time);
                }
                this._view.grp_act.visible = true;
            } else {
                this._actTime = 0;
                this._view.grp_act.visible = false;
            }
        }

        private onInfoUpdate(n: GameNT): void {
            let headType: number = n.body;
            if (headType == this._headType) {
                this.updateInfo();
            }
        }

        /** 通用红点事件监听 */
        protected onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.getGiftHint(this._headType))) {
                this.updateGiftHint(data.value);
            }
            if (this._view.btn_jiban.visible && data.node == HintMgr.getType(this._proxy.getJibanHint(this._headType))) {
                this.updateJibanHint(data.value);
            }
            if (this._view.btn_huan.visible && data.node == HintMgr.getType(this._proxy.getHeadTypeToStarHint(this._headType))) {
                this.updateStarHint(data.value);
            }
            if (this._view.grp_act.visible) {
                let openIdx: number = this._proxy.getOpenIdx(this._headType);
                let rankType: number = ActivityUtil.getRankTypeByOpenIdx(openIdx);
                if (data.node == HintMgr.getType(ActivityUtil.getSurfaceHintNodes(rankType))) {
                    this._view.btn_act.setHint(data.value);
                }
            }
        }

        private updateModel(): void {
            let index = this._proxy.getSurfaceId(this._headType) || this._proxy.getDefaultId(this._headType);
            if (!index) {
                this._view.special_attr.visible = false;
                this._view.name_item.visible = false;
                return;
            }
            this.addAnimate(index, this._view.grp_eff);
            let cfg = getConfigById(index) as HorseConfig;
            this._view.special_attr.updateDesc(cfg, 360);

            this._view.name_item.updateShow(cfg.name, cfg.quality);
            this._view.name_item.visible = true;
        }

        private updateInfo(): void {
            this.updatePower();
            this.updateSkillList();
            this.updateLv();
        }

        private updatePower(): void {
            let attr = this._proxy.getSurfaceAllAttr(this._headType);
            this._attr = attr;
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power2.setPowerValue(power);
        }

        private updateSkillList(): void {
            let battleSkillId = this._proxy.getSurfaceSkillId(this._headType);
            let stage = this._proxy.getSurfaceStage(this._headType);
            this._view.item_skill.setData(battleSkillId, stage, this.showLv, this.showZero);

            let skillList = this._proxy.getSurfaceSkillList(this._headType);
            let infos: SkillItemRenderData[] = [];
            for (let skillId of skillList) {
                let info: SkillItemRenderData = {};
                info.skillId = skillId;
                info.isAct = this._proxy.isSurfaceSkillAct(this._headType, skillId);
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                let cost: number[] = cfg.act_material[0];
                info.showHint = !info.isAct && BagUtil.checkPropCnt(cost[0], cost[1]);
                infos.push(info);

                if (skillId == this._skillId && info.isAct) {
                    this.sendNt(SurfaceEvent.SURFACE_SKILL_UPDATE, info.isAct);
                }
            }
            this._skillList.replaceAll(infos);
        }

        private updateLv(): void {
            let perLv = this._proxy.getSurfacePerLv(this._headType);
            let items: number[] = [];
            items.length = perLv;
            this._itemList.replaceAll(items);

            let lv = this._proxy.getSurfaceLv(this._headType);
            let exp = this._proxy.getSurfaceExp(this._headType);
            let upExp = this._proxy.getSurfaceUpExp(this._headType, lv);

            let stage = this._proxy.getSurfaceStage(this._headType);
            let stageStr = ResUtil.getChineseFontStr(stage) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);

            let cost = this._proxy.getSurfaceUpCost(this._headType, lv);
            let nextCost = this._proxy.getSurfaceUpCost(this._headType, lv + 1);
            let isMax = !nextCost && exp >= upExp;
            this._view.currentState = isMax ? "max" : "default";
            if (!isMax) {
                this._cost = cost[0];
                this._view.cost.updateShow(this._cost);
                this._view.btn_onekey.redPoint.visible = BagUtil.checkPropCnt(this._cost[0], this._cost[1]);

                this._view.bar.show(exp * this._cost[1], upExp * this._cost[1], !this._isFirst, lv);
                this._isFirst = false;
            } else {
                this._view.btn_onekey.redPoint.visible = false;
                this._view.bar.showMax();
            }
        }

        private updateHint(): void {
            if (this._view.btn_gift.visible) {
                this.updateGiftHint(HintMgr.getHint(this._proxy.getGiftHint(this._headType)));
            }
            if (this._view.btn_jiban.visible) {
                this.updateJibanHint(HintMgr.getHint(this._proxy.getJibanHint(this._headType)));
            }
            if (this._view.btn_huan.visible) {
                this.updateStarHint(HintMgr.getHint(this._proxy.getHeadTypeToStarHint(this._headType)));
            }
            if (this._view.grp_act.visible) {
                let openIdx: number = this._proxy.getOpenIdx(this._headType);
                let rankType: number = ActivityUtil.getRankTypeByOpenIdx(openIdx);
                this._view.btn_act.setHint(HintMgr.getHint(ActivityUtil.getSurfaceHintNodes(rankType)));
            }
        }

        private updateJibanHint(hint: boolean) {
            this._view.btn_jiban.redPoint.visible = hint;
        }

        private updateGiftHint(hint: boolean) {
            this._view.btn_gift.redPoint.visible = hint;
        }

        private updateStarHint(hint: boolean): void {
            this._huanData.showHint = hint;
            this._view.btn_huan.setData(this._huanData);
        }

        /**初始化显示不同的ui，子类可重写*/
        protected initView(): void {
            this._view.btn_gift.iconDisplay.source = "jinjiehaoli_" + this._headType;

            this._view.btn_jiban.visible = this._proxy.isJiban();

            this._view.btn_huan.visible = this._proxy.isStar();
            this._view.btn_huan.setData(this._huanData);

            this.addEftByParent(UIEftSrc.Gift, this._view.btn_gift.group_eft);

            this._view.btn_god.visible = false;
            this._view.btn_zhanshendian.visible = false;
        }

        update(time: base.Time) {
            this.updateTime(time);
            this.updateFlyRankTime();
        }

        private updateTime(time: base.Time): void {
            let leftTime = this._actTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                return;
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }

        /**************************飞升榜********************************/
        private onClickFlyRank(): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ActMain, this._flyRankActInfo);
        }

        /** 通用中控活动事件监听 */
        private onActivityUpdateByType(n: GameNT): void {
            let typeList: number[] = n.body;
            if (typeList.indexOf(ActivityType.FlyRank) > -1) {
                this.updateFlyRank();
            }
        }

        private updateFlyRank(): void {
            let actInfo = this.getFlyRank();
            this._flyRankActInfo = actInfo;
            if (!actInfo) {
                this._view.grp_flyRank.visible = false;//没有对应的飞升榜
                return;
            }
            this._view.grp_flyRank.visible = true;
            this._flyRankTime = actInfo.c_end_time;
            this.updateFlyRankTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        private getFlyRank(): oper_act_item {
            //获取对应的飞升榜
            let index = this._cost[0];
            let jumpIdx = FlyPropToJumpIdx[index];
            if (!jumpIdx) {
                return null;
            }
            let activityProxy: IActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            let actList = activityProxy.getOperActList(ActivityType.FlyRank);
            let flyRankProxy: IFlyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);
            for (let actInfo of actList) {
                let propIndex = flyRankProxy.getRankProp(actInfo);
                if (propIndex == index) {
                    return actInfo;
                }
            }
            return null;
        }

        private updateFlyRankTime(): void {
            let leftTime = this._flyRankTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._view.grp_flyRank.visible = false;//没有对应的飞升榜
                return;
            }
            this._view.lab_flyRank.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }

        /**************************飞升榜********************************/
    }
}