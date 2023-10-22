namespace game.mod.yishou {

    import facade = base.facade;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class YishouShouhunMdr extends MdrBase {
        private _view: YishouShouhunView = this.mark("_view", YishouShouhunView);
        private _proxy: YishouProxy;
        private _listSkill: eui.ArrayCollection;
        private _selIdx = 0;
        private _barTween = false;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._view.list_skill.itemRenderer = SkillItemRender;
            this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
            addEventListener(this._view.iconListComp.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIconList, this);
            addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickSkillList, this);

            this.onNt(YishouEvent.ON_UPDATE_YISHOU_BASE_INFO, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this._view.iconListComp.list.selectedIndex = this._selIdx = 0;
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._barTween = false;
        }

        private getType(): YishouType {
            return YishouTypeAry[this._selIdx];
        }

        private updateView(): void {
            let type = this.getType();

            this._view.iconListComp.updateListView(YishouMdrType.Shouhun);
            this.updateSkill();
            this.updateCost();

            //战力
            let attr = this._proxy.getAttr(this.getType(), YishouMdrType.Shouhun);
            this._view.power2.setPowerValue(attr && attr.showpower || 0);

            //名字，模型图片
            let typeCfg = this._proxy.getYishoucfg(type);
            this._view.nameItem.updateShow(typeCfg.type_name + getLanById(LanDef.yishou_tips22));
            this._view.img_icon.source = ResUtil.getUiPng(`yishou_model${type}`);
        }

        private updateSkill(): void {
            let type = this.getType();

            let typeCfg = this._proxy.getYishoucfg(type);
            let idList = typeCfg.skill_list || [];
            let list: SkillItemRenderData[] = [];
            for (let i = 0; i < idList.length; i++) {
                let item = idList[i];
                let skillId = item[1];
                list.push({
                    skillId,
                    showHint: this._proxy.canActSkill(type, skillId),
                    isAct: this._proxy.checkSkillActed(type, skillId)
                });
            }
            this._listSkill.replaceAll(list);
        }

        private updateCost(): void {
            let type = this.getType();
            let info = this._proxy.getInfo(type);
            let level = info && info.level || 0;
            this._view.lb_level.text = level + '';

            let isMax = this._proxy.isLevelMax(type);
            if (isMax) {
                this._view.bar.showMax();
                this._view.img_max.visible = true;
                this._view.costIcon.visible = this._view.btn_do.visible = this._view.btn_onekey.visible = false;
            } else {
                let cfg = this._proxy.getShouhunCfg(type);
                let cost = cfg.star_consume[0];
                let singleCostExp = cost[1] * 10;
                this._view.bar.show((info ? info.exp : 0) * singleCostExp, cfg.exp * singleCostExp, this._barTween, level, true, ProgressBarType.Value);
                this._barTween = true;
                this._view.img_max.visible = false;
                this._view.costIcon.visible = this._view.btn_do.visible = this._view.btn_onekey.visible = true;

                this._view.costIcon.updateShow(cfg.star_consume[0]);

                this._view.btn_do.setHint(this._proxy.canShouHunUpLv(type));
                this._view.btn_onekey.setHint(this._proxy.canShowhunOnekey(type));
            }
        }

        private updatePower(): void {
            this._view.power2.setPowerValue(this._proxy.getPower(this.getType(), YishouMdrType.Shouhun));
        }

        private onClickAttr(): void {
            let attr = this._proxy.getAttr(this.getType(), YishouMdrType.Shouhun);
            ViewMgr.getIns().showAttrTipsWithoutGod(getLanById(LanDef.yishou_tips14), attr, getLanById(LanDef.xiandan_tips9));
        }

        private onClickDo(): void {
            let type = this.getType();
            if (this._proxy.canShouHunUpLv(type, true)) {
                this._proxy.c2s_yishou_shouhun_operate(type, 1);
            }
        }

        private onClickOnekey(): void {
            let type = this.getType();
            if (this._proxy.canShowhunOnekey(type, true)) {
                this._proxy.c2s_yishou_shouhun_operate(type, 2);
            }
        }

        private onClickIconList(e: eui.ItemTapEvent): void {
            let item = e.item as IYishouTypeIconData;
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx || !item
                || !this._proxy.checkTypeActed(item.type, true)) {
                this._view.iconListComp.list.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = e.itemIndex;
            this._barTween = false;
            this.updateView();
        }

        private onClickSkillList(e: eui.ItemTapEvent): void {
            let type = this.getType();
            let itemIdx = e.itemIndex;
            let typeCfg = this._proxy.getYishoucfg(type);
            let data = typeCfg.skill_list[itemIdx];//激活等级,技能id
            facade.showView(ModName.Yishou, YiShouViewType.ShouhunSkillTips, [type, itemIdx].concat(data));
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let costAry = this._proxy.getShouhunCost();
            for (let index of indexs) {
                if (costAry && costAry.indexOf(index) > -1) {
                    this.updateCost();
                    this._view.iconListComp.updateListView(YishouMdrType.Shouhun);
                    break;
                }
            }
        }
    }
}