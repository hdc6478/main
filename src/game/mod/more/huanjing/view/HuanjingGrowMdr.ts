namespace game.mod.more {
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import facade = base.facade;
    import GameNT = base.GameNT;

    export class HuanjingGrowMdr extends EffectMdrBase {
        private _view: HuanjingGrowView = this.mark("_view", HuanjingGrowView);
        private _proxy: HuanjingProxy;
        private _listData: eui.ArrayCollection;
        private _systemId: number;

        private _viewTypes: string[] = [MoreViewType.HuanjingStage, MoreViewType.HuanjingStar, MoreViewType.HuanjingZhushen, MoreViewType.HuanjingHuanling];

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);

            this._view.list_item.itemRenderer = HuanjingGrowBtnItem;
            this._view.list_item.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners() {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickSkill);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow() {
            super.onShow();
            this._systemId = this.decodeShowArgs();
            if (!this._systemId) {
                return;
            }
            this._view.img_name.source = `huanjing_name` + this._systemId;
            this._view.img_bg.source = ResUtil.getUiPng(`huanjing_stage_bg` + this._systemId);

            this.updateView();
        }

        protected onHide() {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            this._view.name_item.updateShow(cfg.name1);

            this._view.stageSkillItem.updateShow(this._systemId);
            this.updatePower();

            this.updateBtnList();
        }

        private updateBtnList(): void {
            let list: IHuanjingGrowBtnItemData[] = [];
            for (let i = 1; i <= 4; i++) {
                let lv = 0;
                let hint = false;
                if (i == 1) {
                    //进阶
                    lv = this._proxy.getStageNum(this._systemId);
                    hint = this._proxy.getStageHint(this._systemId);
                } else if (i == 2) {
                    //升星
                    lv = this._proxy.getStarLv(this._systemId);
                    hint = this._proxy.getStarHint(this._systemId);
                } else if (i == 3) {
                    //驻神
                    lv = this._proxy.getZhushenStarMax(this._systemId);
                    hint = this._proxy.getZhushenHint(this._systemId);
                } else if (i == 4) {
                    //幻灵
                    lv = this._proxy.getHuanlingStageMax(this._systemId);
                    hint = this._proxy.getHuanlingHint(this._systemId);
                }
                list.push({
                    systemId: this._systemId,
                    type: i,
                    showHint: hint,
                    lv: lv
                });
            }
            this._listData.replaceAll(list);
        }

        private onClickDesc(): void {
            let attr = this._proxy.getGrowAttr(this._systemId);
            ViewMgr.getIns().showAttrTipsWithoutGod('属性', attr);
        }

        private onClickSkill(e: ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            let viewType = this._viewTypes[itemIdx];
            facade.showView(ModName.More, viewType, this._systemId);
        }

        // 这里存在被刷新两次的机会，其中一次是这里请求的，另外的是在 this._viewTypes 的界面请求的 todo
        private updatePower(): void {
            let attr = this._proxy.getGrowAttr(this._systemId);
            this._view.power2.setPowerValue(attr && attr.showpower || 0);
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let costIndexs = this._proxy.getCostIndexs();
            for (let idx of indexs) {
                if (costIndexs.indexOf(idx) > -1) {
                    this.updateBtnList();
                    break;
                }
            }
        }

        private onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.gold) > -1) {
                this.updateBtnList();
            }
        }

    }
}