namespace game.mod.shenling {
    import ShenlingLeixingConfig = game.config.ShenlingLeixingConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import GameNT = base.GameNT;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import Tween = base.Tween;

    export class ShenLingUpStarMdr extends EffectMdrBase {
        private _view: ShenLingUpStarView = this.mark("_view", ShenLingUpStarView);
        private _proxy: ShenLingProxy;
        private _listSkill: eui.ArrayCollection;
        private _listShenLing: eui.ArrayCollection;

        private _type = 1; //系列神灵
        private _typeCfg: ShenlingLeixingConfig;//系列神灵配置
        private _cfg: ShenlingConfig;
        private _curIndex: number;//当前选择的神灵
        private _selIdx: number = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
            this._view.list_talent.itemRenderer = ShenLingSkillIcon;
            this._view.list_talent.dataProvider = this._listSkill = new eui.ArrayCollection();
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listShenLing = new eui.ArrayCollection();

            this._view.skill_normal.setBg('jinengkuang');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.list_talent, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_shenji, egret.TouchEvent.TOUCH_TAP, this.onClickShenJi, this);
            addEventListener(this._view.skill_normal, egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
            addEventListener(this._view.evolveItem, egret.TouchEvent.TOUCH_TAP, this.onClickEvolveItem, this);

            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.onUpdateInfo, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePowerView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, this.onUpdateByPropTypeAndSubType, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateByPropIndex, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE, this.onUpdateHintByShenjiReward, this);
            this.onNt(TaskEvent.ON_TASK_HINT, this.onTaskHint, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.typeListComp.updateListView(ShenLingMdrType.UpStar);
            let selType = this._proxy.getUpStarSelType();
            this.onSwitchType(selType);
        }

        private onSwitchType(type: number = 1): void {
            this._type = type;
            this._typeCfg = this._proxy.getTypeCfg(this._type);
            this._view.typeListComp.updateSelType(type);

            let list: AvatarItemData[] = this.getListData();
            this._selIdx = 0;
            for (let i = 0; i < list.length; i++) {
                let cfg = list[i].cfg;
                if (this._proxy.canUpStar(cfg.index)) {
                    this._selIdx = i;
                    break;
                }
            }
            for (let i = 0; i < list.length; i++) {
                list[i].isSel = this._selIdx == i;
            }
            this._listShenLing.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
            this._curIndex = list[this._selIdx].cfg.index;

            if (this._selIdx > 3) {
                this.moveScroller();
            } else {
                this._view.scroller.stopAnimation();
                this._view.scroller.viewport.scrollH = 0;
            }

            this.updateView();
        }

        protected onHide(): void {
            this._view.moItem.removeModel();
            this._curIndex = null;
            GuideMgr.getIns().clear(GuideKey.ShenlingUpStar);//清除指引
            this._selIdx = 0;
            Tween.remove(this._view.scroller);
            super.onHide();
        }

        private updateView(): void {
            this._cfg = this._proxy.getShenLingCfg(this._curIndex);
            if (!this._cfg) {
                DEBUG && console.error(`没有找到神灵配置：${this._curIndex}`);
                return;
            }
            this.updateInfo();
        }

        //下一个可以激活或升星的神灵
        private onUpdateInfo(): void {
            let list: AvatarItemData[] = this._listShenLing.source;
            let size = list.length;
            let haveNext = false;
            let selIdx = this._selIdx;
            for (let i = 0; i < size; i++) {
                let cfg = list[i].cfg;
                if (this._proxy.canUpStar(cfg.index)) {
                    selIdx = i;
                    haveNext = true;
                    break;
                }
            }

            //当前系列没有可以激活或升星的
            if (!haveNext) {
                //获取下一个有激活升星的系列
                let nextType = this._proxy.getUpStarSelType(true);
                if (nextType) {
                    this.onSwitchType(nextType);
                    return;
                }
            }

            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listShenLing.itemUpdated(preData);
            }
            this._selIdx = selIdx;
            let curData = list[this._selIdx];
            curData.isSel = true;
            this._listShenLing.itemUpdated(curData);

            this._view.list.selectedIndex = this._selIdx;
            this._curIndex = list[this._selIdx].cfg.index;

            this.moveScroller();
            this.updateView();
        }

        private moveScroller(): void {
            // egret.callLater(() => {
            // ScrollUtil.moveHToAssign(this._view.scroller, this._selIdx, 137, 0);
            // }, this);
        }

        private updateInfo(): void {
            let haveEvolve = this._proxy.haveEvolve(this._curIndex);
            let isActed = this._proxy.isActed(this._curIndex);
            let maxEvolve = this._proxy.isMaxEvolve(this._curIndex);
            this._view.evolveItem.visible = haveEvolve && isActed && !maxEvolve;
            if (this._view.evolveItem.visible) {
                let nextQua = this._proxy.getNextEvolvedQuality(this._curIndex);
                this._view.evolveItem.updateView(this._cfg, 1, nextQua);
                this.updateEvolveHint();
            }
            this.updateTopInfo();
            this.updateSkillInfo();
            this.updateHint();
        }

        private getListData(): AvatarItemData[] {
            let cfgList = this._proxy.getShenLingCfgListByType(this._type);
            if (!cfgList || !cfgList.length) {
                return null;
            }
            let typeInfo = this._proxy.getTypeInfo(this._type);
            let battle: AvatarItemData[] = [];
            let actOrUp: AvatarItemData[] = [];
            let actedList: AvatarItemData[] = [];
            let notAct: AvatarItemData[] = [];
            for (let cfg of cfgList) {
                let info = this._proxy.getInfoByIndex(cfg.index);
                let isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                let itemData: AvatarItemData = {
                    cfg,
                    showHint: this._proxy.getStarHintByIndex(cfg.index),
                    star: info && info.star || 0,
                    isBattle: !!isBattle,
                    isSel: false,
                    evolution: info && info.evolutions ? info.evolutions : 0 //进化神灵的进化次数
                };
                if (isBattle) {
                    // actOrUp.unshift(itemData);
                    battle.push(itemData);
                } else if (this._proxy.canUpStar(cfg.index)) {
                    actOrUp.push(itemData);
                } else if (itemData.star) {
                    actedList.push(itemData);
                } else {
                    notAct.push(itemData);
                }
            }
            actOrUp.sort(this.sortFunc);
            actedList.sort(this.sortFunc);
            notAct.sort(this.sortFunc);
            return battle.concat(actOrUp, actedList, notAct);
        }

        private sortFunc(a: AvatarItemData, b: AvatarItemData): number {
            if (a.cfg.quality == b.cfg.quality) {
                return a.cfg.index - b.cfg.index;
            }
            return a.cfg.quality - b.cfg.quality;
        }

        private updatePowerView(): void {
            let info = this._proxy.getInfoByIndex(this._curIndex);
            this._view.power.btn_desc.visible = !!info;
            let attr = info && info.attrs;
            if (!attr || !Object.keys(attr).length) {
                let cfg = this._proxy.getStarCfg(this._curIndex, 1);
                if (cfg && cfg.star_property) {
                    attr = RoleUtil.getAttr(cfg.star_property[0]);
                }
            }
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            this._view.btn_god.updateGod(attr && attr.god ? attr.god : 0);
        }

        private updateTopInfo(): void {
            this._view.moItem.updateModel(this._curIndex);
            this.updatePowerView();

            // let info = this._proxy.getInfoByIndex(this._curIndex);
            // let curStar = info && info.star || 0;
            // let maxUpStar = this._proxy.getMaxStar(this._curIndex);
            // let maxStar = info && info.star > maxUpStar ? this._proxy.getMaxAwakenStar(this._curIndex) : maxUpStar;
            // if (curStar > maxUpStar) {
            //     this._view.starCom.updateStarSrc(curStar - maxUpStar, 'moon_yellow');
            // } else {
            //     this._view.starCom.updateStar(curStar, maxStar);
            // }
            this._view.starCom.updateSurfaceStar(this._curIndex);
        }

        private updateSkillInfo(): void {
            let info = this._proxy.getInfoByIndex(this._curIndex);
            let list: ISLSkillIconData[] = [];
            for (let item of this._cfg.talent1) {
                let is_act = false;
                if (info && item[0] <= info.star) {
                    is_act = true;
                }
                list.push({
                    skill_index: item[1],
                    is_act
                });
            }
            this._listSkill.replaceAll(list);

            this._view.skill_normal.data = {
                skill_index: this._cfg.common,
                is_act: !!info,
                skill_type: SLSkillType.PuGong
            };
        }

        private updateCostInfo(): void {
            let info = this._proxy.getInfoByIndex(this._curIndex);
            let isAwaken = this._proxy.isAwaken(this._curIndex);
            let isLvMax = info ? info.star >= this._proxy.getMaxStar(this._curIndex) : false;

            GuideMgr.getIns().clear(GuideKey.ShenlingUpStar);
            //觉醒状态
            if (isAwaken) {
                this._view.btn_up.updateJuexing();
                this._view.btn_up.setHint(this._proxy.canAwaken(this._curIndex));
                return;
            }
            //满级状态
            if (isLvMax) {
                this._view.btn_up.updateMaxStar();
                this._view.btn_up.setHint(false);
                return;
            }
            let cfg = this._proxy.getStarCfg(this._curIndex, info ? info.star + 1 : 1);
            if (!cfg || !cfg.star_consume) {
                return;
            }
            let tips = '';
            let isAct = info && info.star;
            if (isAct) {
                let cfg1 = this._proxy.getStarCfg(this._curIndex, info.star);
                let starPower = Math.floor(cfg1.star_power / 100);
                tips = getLanById(LanDef.upstar) + getLanById(LanDef.showpower) + "\n"
                    + TextUtil.addColor(`+${starPower}%`, WhiteColor.GREEN);
            }
            let cost = cfg.star_consume[0];
            let commonCostId = this._proxy.getCommonCost(this._curIndex);
            let costCnt = BagUtil.getPropCntByIdx(cost[0]);
            if (commonCostId) {
                costCnt += BagUtil.getPropCntByIdx(commonCostId);
            }
            this._view.btn_up.updateCost(cost, !!isAct, tips, true, costCnt);
            let canUp = this._proxy.canUpStar(this._curIndex);
            if (canUp) {
                //请求所有升星的属性，为了升星弹窗属性展示
                let maxStar = this._proxy.getMaxStar(this._curIndex);
                let attrList: number[] = [];
                for (let i = 1; i <= maxStar; i++) {
                    let starCfg = this._proxy.getStarCfg(this._curIndex, i);
                    if (starCfg && starCfg.star_property) {
                        attrList = attrList.concat(starCfg.star_property);
                    }
                }
                RoleUtil.getAttrList(attrList);
            }
            this._view.btn_up.setHint(canUp);
            if (canUp) {
                GuideMgr.getIns().show(GuideKey.ShenlingUpStar, this._view.btn_up, Handler.alloc(this, this.onClickUp));//任务指引
            }
        }

        private onClickListMenu(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = (e.item as ISLTypeIconData).type;
            if (type == this._type) {
                return;
            }
            this.onSwitchType(type);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (!e || !e.item) {
                return;
            }
            let list: AvatarItemData[] = this._listShenLing.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listShenLing.itemUpdated(preData);
            }
            let data = e.item as AvatarItemData;
            data.isSel = true;
            this._listShenLing.itemUpdated(data);
            this._selIdx = e.itemIndex;
            this._curIndex = data.cfg.index;
            this.updateView();
        }

        private onClickUp(): void {
            if (this._proxy.isAwaken(this._curIndex)) {
                ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingAwaken, {
                    type: this._type,
                    index: this._curIndex
                });
                return;
            }
            if (this._proxy.canUpStar(this._curIndex, true)) {
                this._proxy.c2s_god_brother_starup(this._curIndex);
            }
        }

        private onClickAttr(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingAttr, [this._type, this._curIndex]);
        }

        private onClickShenJi(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenLingShenJi, [this._type, this._curIndex]);
        }

        private onClickTalent(e: eui.ItemTapEvent): void {
            let sData = e.item as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._curIndex || 0,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.Talent
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private onClickSkill(e: egret.TouchEvent): void {
            let sData = e.currentTarget.data as ISLSkillIconData;
            let data: ISLSkillTipsData = {
                index: this._curIndex,
                skill_index: sData.skill_index,
                skill_type: SLSkillType.PuGong
            };
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, data);
        }

        private updateHint(): void {
            //升星按钮红点
            this.updateCostInfo();
            //神迹红点
            this._view.btn_shenji.setHint(this._proxy.getShenJiRewardHint(this._curIndex));
            //类型按钮红点
            this._view.typeListComp.updateListHint(ShenLingMdrType.UpStar);
            //神灵列表
            this.updateShenLingList();
        }

        private updateEvolveHint(): void {
            if (this._view.evolveItem.visible) {
                this._view.evolveItem.redPoint.visible = this._proxy.getEvolveHint(this._curIndex);
            }
        }

        private updateShenLingList(): void {
            let size = this._listShenLing.source.length;
            let typeInfo = this._proxy.getTypeInfo(this._type);
            for (let i = 0; i < size; i++) {
                let item = this._listShenLing.source[i] as AvatarItemData;
                if (!item || !item.cfg) {
                    continue;
                }
                let index = item.cfg.index;
                let info = this._proxy.getInfoByIndex(index);
                item.star = info && info.star || 0;
                item.showHint = this._proxy.getStarHintByIndex(index);
                let isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == index;
                item.isBattle = !!isBattle;
                this._listShenLing.itemUpdated(item);
            }
        }

        private onUpdateByPropTypeAndSubType(n: GameNT): void {
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    this.updateHint();
                    break;
                }
            }
        }

        private onUpdateByPropIndex(n: GameNT): void {
            let list = n.body as number[];
            let costList = this._proxy.getConsumeList();
            for (let idx of list) {
                if (costList.indexOf(idx) > -1) {
                    this.updateHint();
                    break;
                }
            }
        }

        //神迹奖励领取
        private onUpdateHintByShenjiReward(): void {
            this.updateHint();
        }

        private onClickEvolveItem(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenlingEvolve, this._cfg);
        }

        private onTaskHint(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.ShenlingEvolve) > -1) {
                this._view.typeListComp.updateListHint(ShenLingMdrType.UpStar);
                this.updateShenLingList();
                this.updateEvolveHint();
            }
        }
    }
}