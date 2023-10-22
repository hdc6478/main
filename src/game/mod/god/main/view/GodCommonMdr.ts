namespace game.mod.god {


    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import TiandiLevelConfig = game.config.TiandiLevelConfig;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import LanDef = game.localization.LanDef;

    export class GodCommonMdr extends EffectMdrBase {
        private _view: GodCommonView = this.mark("_view", GodCommonView);
        private _proxy: GodProxy;
        private maxLevel: number;
        private _itemList: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list_item.itemRenderer = GodLvItemRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onClickAct);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);

            this.onNt(GodEvent.ON_UPDATE_ROAD_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._view.currentState = "default";
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.iType);
            if (!this._proxy.getActivate(this._proxy.iType)) {
                this._view.currentState = "lock";
            }

            this._view.power.btn_desc.visible = this._view.currentState != "lock";
            this._view.god_item.visible = this._view.currentState != "lock";

            this._view.grp_desc.visible = cfg.text != "";
            if (cfg.text) {
                this._view.lab_desc.textFlow = TextUtil.parseHtml(cfg.text);
            }

            let info = this._proxy.getInfo(this._proxy.iType);
            let level: number = info && info.level || 0;
            let exp: number = info && info.exp || 0;
            this.maxLevel = this._proxy.getMaxLevel();
            if (level >= this.maxLevel) {
                this._view.bar.showMax();
                this._view.currentState = "max";
            } else {
                let maxExp = this._proxy.getMaxExp();
                this._view.bar.show(exp * cfg.add_value, maxExp * cfg.add_value);
            }
            let arr: number[] = [];
            arr.length = 10;
            this._itemList.replaceAll(arr);

            if (info) {
                let cost: TiandiLevelConfig = this._proxy.getCost(this._proxy.iType, level);
                this._view.cost.updateShow(cost.cost[0]);
                this._view.btn_up.setHint(BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
                this._view.btn_onekey.setHint(BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1] * 10));
            } else {
                this._view.btn_up.setHint(false);
                this._view.btn_onekey.setHint(false);
            }
            let bool: boolean = HintMgr.getHint([...this._proxy.common, `0${this._proxy.iType}`, GodViewType.GodGiftMain]);
            this._view.btn_gift.setHint(bool);

            let boolact: boolean = HintMgr.getHint([...this._proxy.common, `0${this._proxy.iType}`, GodHintType.Act]);
            this._view.btn_right.setHint(boolact);

            this._view.btn_right.icon = `btn_act_${this._proxy.iType}`;

            this.updateModel(cfg.image_id);
            this.updatePower();
        }

        public updateModel(index: number, showName = true): void {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if (!cfg) {
                return;
            }
            this._view.name_item.visible = showName;
            this._view.name_item.updateShow(cfg.name, cfg.quality);
            let pin: number = this._proxy.getPin() || 1;
            this._view.name_item.updateSr(`pin_${pin}`);
            this.addAnimate(index, this._view.grp_eff);
            this._view.img_text.source=`tiandi_tips${index}`;
        }

        private updatePower(): void {
            let info = this._proxy.getInfo(this._proxy.iType);
            let power = info && info.attrs && info.attrs.showpower || 0;
            this._view.power.setPowerValue(power);

            let godVal = info && info.attrs && info.attrs.god ? info.attrs.god : 0;
            this._view.god_item.updateGod(godVal);
        }

        private onClick(e: TouchEvent): void {
            let info = this._proxy.getInfo(this._proxy.iType);
            let cfg: TiandiLevelConfig = this._proxy.getCost(this._proxy.iType, info.level);
            if (!BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1], PropLackType.Dialog)) {
                return;
            }
            let button_type: number = e.currentTarget == this._view.btn_up ? 1 : 2;
            this._proxy.c2s_tiandi_level_up(button_type, this._proxy.iType);
        }

        private onClickGift(): void {
            ViewMgr.getIns().showView(ModName.God, GodViewType.GodGiftMain);
        }

        private onClickAct(): void {
            let act: string = this._proxy.getAct(this._proxy.iType);
            if (!act) {
                PromptBox.getIns().show("暂未开放");
                return;
            }
            ViewMgr.getIns().showView(ModName.God, act);
        }

        private onClickAttr(): void {
            let info = this._proxy.getInfo(this._proxy.iType);
            ViewMgr.getIns().showAttrTips(getLanById(LanDef.soul14),
                info ? info.attrs : null);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}