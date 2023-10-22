namespace game.mod.more {

    import facade = base.facade;
    import attributes = msg.attributes;
    import ShenlingConfig = game.config.ShenlingConfig;
    import LanDef = game.localization.LanDef;

    export class HuanjingCollectItemTipsMdr extends EffectMdrBase {
        private _view: HuanjingCollectItemTipsView = this.mark("_view", HuanjingCollectItemTipsView);
        private _proxy: HuanjingProxy;
        private _shenlingProxy: IShenLingProxy;
        private _surfaceProxy: ISurfaceProxy;

        private _index: number;//外显id
        private _cfg: any;
        private _modelIdx: number;
        private _itemData: AvatarItemData;
        private _modelSrc: string;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
            this._shenlingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._surfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_shangzhen, egret.TouchEvent.TOUCH_TAP, this.onClickBtnShangzhen, this);
            addEventListener(this._view.btn_shenji, egret.TouchEvent.TOUCH_TAP, this.onClickBtnShenji, this);
            addEventListener(this._view.btn_shenlingskill, egret.TouchEvent.TOUCH_TAP, this.onClickBtnShenlingSKill, this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_upstar, egret.TouchEvent.TOUCH_TAP, this.onClickBtnUpstar, this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.updateView, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE, this.onUpdateShenlingShenjiHint, this);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._index = this._showArgs;
            if (!this._index) {
                return;
            }
            this._cfg = getConfigById(this._index);
            if (!this._cfg) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._index = null;
            this._cfg = null;
            this.removeEffect(this._modelIdx);
            this._modelIdx = null;
            this._itemData = null;
            this._modelSrc = null;
        }

        //为神灵类型
        private isShenling(): boolean {
            let headType = PropData.getPropParse(this._index);
            return headType == ConfigHead.Shenling;
        }

        //为仙剑类型
        private isXianjian(): boolean {
            let headType = PropData.getPropParse(this._index);
            return headType == ConfigHead.Xianjian;
        }

        private updateView(): void {
            let isShenling = this.isShenling();
            this._view.currentState = isShenling ? 'shenling' : 'base';
            if (isShenling) {
                this.updateShenlingSkill();
            } else {
                this.updateSurfacePill();
            }

            let isAct = SurfaceUtil.isAct(this._index);
            this._view.power2.btn_desc.visible = isAct;
            this._view.starListView.visible = isAct;
            if (isAct) {
                this._view.starListView.updateSurfaceStar(this._index);
            }

            this.updateModel();
            this.updatePower();
        }

        //基础
        private updateSurfacePill(): void {
            let surfaceProxy = this._surfaceProxy;
            let itemData: AvatarItemData = {
                cfg: this._cfg,
                star: surfaceProxy.getSurfacePerStar(this._cfg.index)
            };
            this._itemData = itemData;
            surfaceProxy.selData = itemData;

            let headType = PropData.getPropParse(this._index);
            surfaceProxy.headType = headType;
            let pillList = [this._view.item_pill0, this._view.item_pill1, this._view.item_pill2];
            let infos = surfaceProxy.getSurfacePillCost(this._cfg.quality, itemData.star, headType) || [];
            for (let i = 0; i < pillList.length; i++) {
                pillList[i].data = infos[i];
            }

            let maxStar = surfaceProxy.getSurfaceMaxStar(headType);
            let isMaxStar = itemData.star >= maxStar;
            if (isMaxStar) {
                this._view.btn_upstar.updateMaxStar();
                this._view.btn_upstar.redPoint.visible = false;
            } else {
                let isAct = itemData.star > 0;
                let tips = '';
                if (isAct) {
                    let starPower = this._cfg.star_power[itemData.star];
                    starPower = Math.floor(starPower / 100);
                    tips = getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n" + TextUtil.addColor("+" + starPower + "%", WhiteColor.GREEN);
                }
                let cost = this._cfg.material[itemData.star];
                let idx = cost[0];
                let costCnt = cost[1];
                let curCnt = surfaceProxy.getStarPropCnt(headType, this._cfg.quality, idx, itemData.star);

                this._view.btn_upstar.updateCost(cost, isAct, tips, true, curCnt);

                this._view.btn_upstar.redPoint.visible = curCnt >= costCnt;
            }
        }

        //神灵神迹红点
        private onUpdateShenlingShenjiHint(): void {
            this._view.btn_shenji.redPoint.visible = this._proxy.getShenlingShenjiHint(this._index);
        }

        //神灵
        private updateShenlingSkill(): void {
            this.onUpdateShenlingShenjiHint();

            let cfg = this._cfg as ShenlingConfig;
            let info = this._shenlingProxy.getInfoByIndex(this._index);
            this._view.btn_shenlingskill.data = {
                skill_index: cfg.common,
                skill_type: SLSkillType.PuGong,
                is_act: !!info
            };

            let skillList = [this._view.item_skill0, this._view.item_skill1, this._view.item_skill2, this._view.item_skill3];
            for (let i = 0; i < cfg.talent1.length; i++) {
                let item = cfg.talent1[i];
                let is_act = false;
                if (info && item[0] <= info.star) {
                    is_act = true;
                }
                if (skillList[i]) {
                    this.onEgret(skillList[i], egret.TouchEvent.TOUCH_TAP, this.onClickShenlingTalentSkill, this);
                    skillList[i].data = {
                        skill_index: item[1],
                        is_act
                    };
                }
            }

            let isAwaken = this._shenlingProxy.isAwaken(this._index);
            let isLvMax = info ? info.star >= this._shenlingProxy.getMaxStar(this._index) : false;

            //觉醒状态
            if (isAwaken) {
                this._view.btn_upstar.updateJuexing();
                this._view.btn_upstar.setHint(this._shenlingProxy.canAwaken(this._index));
                return;
            }
            //满级状态
            if (isLvMax) {
                this._view.btn_upstar.updateMaxStar();
                this._view.btn_upstar.setHint(false);
                return;
            }
            let starCfg = this._shenlingProxy.getStarCfg(this._index, info ? info.star + 1 : 1);
            if (!starCfg || !starCfg.star_consume) {
                return;
            }
            let tips = '';
            let isAct = info && info.star;
            if (isAct) {
                let cfg1 = this._shenlingProxy.getStarCfg(this._index, info.star);
                let starPower = Math.floor(cfg1.star_power / 100);
                tips = getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n"
                    + TextUtil.addColor(`+${starPower}%`, WhiteColor.GREEN);
            }
            let cost = starCfg.star_consume[0];
            let commonCostId = this._shenlingProxy.getCommonCost(this._index);
            let costCnt = BagUtil.getPropCntByIdx(cost[0]);
            if (commonCostId) {
                costCnt += BagUtil.getPropCntByIdx(commonCostId);
            }
            this._view.btn_upstar.updateCost(cost, !!isAct, tips, true, costCnt);
            let canUp = this._shenlingProxy.canUpStar(this._index);
            this._view.btn_upstar.setHint(canUp);
        }

        private updateModel(): void {
            if (!this._modelSrc || this._modelSrc != this._cfg.icon) {
                this._modelSrc = this._cfg.icon;
                this.removeEffect(this._modelIdx);
                this._modelIdx = this.addAnimate(this._index, this._view.gr_eft);
                this.isXianjian() ? this._view.gr_eft.y = 600 : this._view.gr_eft.y = 770;
            }
            this._view.nameItem.updateShow(this._cfg.name, this._cfg.quality);
            this._view.specialAttrView.updateDesc(this._cfg);
        }

        private getAttr(): attributes {
            let isShenling = this.isShenling();
            let attr: attributes;
            if (isShenling) {
                let info = this._shenlingProxy.getInfoByIndex(this._index);
                attr = info && info.attrs;
                if (!attr || !Object.keys(attr).length) {
                    let cfg = this._shenlingProxy.getStarCfg(this._index, 1);
                    if (cfg && cfg.star_property) {
                        attr = RoleUtil.getAttr(cfg.star_property[0]);
                    }
                }
            } else {
                attr = this._surfaceProxy.getSurfacePerAttr(this._index);
                if (!attr || !Object.keys(attr).length) {
                    attr = RoleUtil.getAttr(this._cfg.attr_id[0]);
                }
            }
            return attr;
        }

        private updatePower(): void {
            let attr = this.getAttr();
            this._view.power2.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            this._view.btn_god.updateGod(attr && attr.god ? attr.god : 0);
        }

        private onClickBtnShangzhen(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingShangZhen);
        }

        private onClickBtnShenji(): void {
            let type = this._cfg.type;//神灵类型
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingShenJi, [type, this._index]);
        }

        private onClickBtnShenlingSKill(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._index,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.PuGong
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickAttr(): void {
            if (this.isShenling()) {
                ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingAttr, [this._cfg.type, this._index]);
            } else {
                let attr = this.getAttr();
                let headType = PropData.getPropParse(this._index);
                ViewMgr.getIns().showAttrTips(getLanById(SurfaceConfigList[headType] + "_attr"), attr);
            }
        }

        private onClickShenlingTalentSkill(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._index || 0,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.Talent
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickBtnUpstar(): void {
            if (this.isShenling()) {
                if (this._shenlingProxy.isAwaken(this._index)) {
                    let cfg = this._shenlingProxy.getShenLingCfg(this._index);
                    ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingAwaken, {
                        type: cfg.type,
                        index: this._index
                    });
                    return;
                }
                if (this._shenlingProxy.canUpStar(this._index, true)) {
                    this._shenlingProxy.c2s_god_brother_starup(this._index);
                }
                return;
            }

            let headType = PropData.getPropParse(this._index);
            let isMaxStar = this._itemData.star >= this._surfaceProxy.getSurfaceMaxStar(headType);
            if (isMaxStar) {
                PromptBox.getIns().show(getLanById(LanDef.maxstar));
                return;
            }
            if (!this._surfaceProxy.canUpStar(this._index)) {
                let cost = this._cfg.material[this._itemData.star];
                BagUtil.checkPropCntUp(cost[0], cost[1]);
                return;
            }
            this._surfaceProxy.c2s_ride_oper_up_star(SurfaceStarOpType.Act, this._index, headType);
        }
    }
}