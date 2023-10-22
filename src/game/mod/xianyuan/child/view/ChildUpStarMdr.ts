namespace game.mod.xianyuan {

    import ChildConfig = game.config.ChildConfig;
    import GameNT = base.GameNT;

    export class ChildUpStarMdr extends EffectMdrBase {
        private _view: ChildUpStarView = this.mark("_view", ChildUpStarView);
        private _proxy: ChildProxy;
        /**二级页签类型*/
        public childType: XianlvSecondTabType = XianlvSecondTabType.Type1;
        private _listData: eui.ArrayCollection;
        private _selIdx: number = 0;
        private _selCfg: ChildConfig;
        private _eftIdxx: number;
        private _skillList: SkillItemRender[] = [];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eff.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Child);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiban, this);
            addEventListener(this._view.btn_huanzhuang, egret.TouchEvent.TOUCH_TAP, this.onClickHuanzhuang, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            let i = 0;
            while (this._view[`skillItem${i}`]) {
                addEventListener(this._view[`skillItem${i}`], egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                this._skillList.push(this._view[`skillItem${i}`]);
                i++;
            }
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._selCfg = null;
            this.removeModelEft();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
        }

        private removeModelEft(): void {
            if (this._eftIdxx) {
                this.removeEffect(this._eftIdxx);
                this._eftIdxx = null;
            }
        }

        private updateView(): void {
            this.updateList();
            this.updateTop();
            this.updateSkill();

            this._view.btn_jiban.setHint(this._proxy.getJibanHint());
        }

        private updateList(): void {
            let list: AvatarItemData[] = [];
            let cfgList = this._proxy.getChildCfgsByType(this.childType);
            for (let cfg of cfgList) {
                let info = this._proxy.getChildInfo(cfg.index);
                list.push({
                    cfg,
                    showHint: this._proxy.getHintByChildIndex(cfg.index),
                    star: info ? info.star_lv : 0,
                    isBattle: false,
                    isSel: false
                });
            }
            list.sort((a, b) => {
                if (a.showHint != b.showHint) {
                    return a.showHint ? -1 : 1;
                }
                if (a.star != b.star) {
                    return b.star > 0 ? 1 : -1;
                }
                return a.cfg.index - b.cfg.index;
            });

            if (this._selCfg) {
                for (let i = 0; i < list.length; i++) {
                    let cfg = list[i].cfg;
                    if (cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                // this._selIdx = 0;
                this._selCfg = list[this._selIdx].cfg;
            }

            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = i == this._selIdx;
            }
            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;
        }

        private updateTop(): void {
            if (!this._selCfg) {
                return;
            }

            this.updatePower();
            this.updateModel();
            this.updateBtnUp();
            let isActed = this._proxy.isActed(this._selCfg.index);
            this._view.power.btn_desc.visible = isActed;
            this._view.btn_huanzhuang.visible = isActed;

            this._view.specialAttr.updateDesc(this._selCfg);
        }

        private updatePower(): void {
            if (!this._selCfg) {
                return;
            }
            let info = this._proxy.getChildInfo(this._selCfg.index);
            let attr = info ? info.star_attr : null;
            if (!attr) {
                let starCfg = this._proxy.getChildStarCfg(this._selCfg.index, 1);
                let attrs = RoleUtil.getAttrList(starCfg && starCfg.attr || null);
                if (attrs && attrs.length) {
                    attr = TextUtil.calcAttrList(attrs);
                }
            }
            this._view.power.setPowerValue(attr && attr.showpower || 0);
            this._view.godItem.updateGod(attr && attr.god || 0);
        }

        private updateModel(): void {
            if (!this._selCfg) {
                return;
            }
            this.removeModelEft();
            this._eftIdxx = this.addAnimate(this._selCfg.index, this._view.gr_eff);
            this._view.nameItem.updateShow(this._selCfg.name, this._selCfg.quality);
        }

        private updateBtnUp(): void {
            let index = this._selCfg.index;
            let isMax = this._proxy.isMaxStar(index);
            if (isMax) {
                this._view.btn_up.updateMaxStar();
                return;
            }
            let str = '';
            let star = this._proxy.getStar(index);
            let starCfg = this._proxy.getChildStarCfg(index, star || 1);
            if (starCfg && starCfg.star_power) {
                let power = Math.floor(starCfg.star_power / 100);
                str = `升星战力\n${TextUtil.addColor(power + '%', WhiteColor.GREEN)}`;
            }
            let cost = this._proxy.getCost(index);
            this._view.btn_up.updateCost(cost, !!star, str);
            this._view.btn_up.setHint(this._proxy.canActOrUp(index));
        }

        private updateSkill(): void {
            let info = this._proxy.getChildInfo(this._selCfg.index);
            let star = info ? info.star_lv : 0;
            let skillList = this._selCfg.passive_skill_idc || [];
            for (let i = 0; i < skillList.length; i++) {
                let skillIcon = this._view[`skillItem${i}`] as SkillItemRender;
                if (!skillIcon) {
                    continue;
                }
                let item = skillList[i];
                skillIcon.data = {
                    skillId: item[0],
                    isAct: item[1] <= star
                };
            }
        }

        private onClickUp(): void {
            if (this._selCfg && this._proxy.canActOrUp(this._selCfg.index, true)) {
                this._proxy.c2s_xianlv_child_starup(this._selCfg.index);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIndex = e.itemIndex;
            if (itemIndex == this._selIdx) {
                return;
            }
            let list: AvatarItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }
            let data: AvatarItemData = e.item;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._selIdx = itemIndex;
            this._selCfg = data.cfg;
            this.updateView();
        }

        private onClickSkill(e: egret.TouchEvent): void {
            let obj = e.currentTarget as SkillItemRender;
            let idx = this._skillList.indexOf(obj);
            let skillItem = this._selCfg.passive_skill_idc[idx];
            let star = this._proxy.getStar(this._selCfg.index);
            let isSkillActed = star >= skillItem[1];
            let str = `${this._selCfg.name}${skillItem[1]}星激活（${star}/${skillItem[1]}）`;
            ViewMgr.getIns().showSkillConditionTips(skillItem[0], isSkillActed, str);
        }

        private onClickAttr(): void {
            let info = this._proxy.getChildInfo(this._selCfg.index);
            let attr = info ? info.star_attr : null;
            ViewMgr.getIns().showAttrTips('子女属性', attr);
        }

        private onClickJiban(): void {
            ViewMgr.getIns().showView(ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.Child, true);
        }

        private onClickHuanzhuang(): void {
            ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.ChildHuanzhuang);
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.updateView();
            }
        }
    }

    export class ChildUpStarMdr2 extends ChildUpStarMdr {
        public childType = XianlvSecondTabType.Type2;
    }

    export class ChildUpStarMdr3 extends ChildUpStarMdr {
        public childType = XianlvSecondTabType.Type3;
    }

    export class ChildUpStarMdr4 extends ChildUpStarMdr {
        public childType = XianlvSecondTabType.Type4;
    }
}