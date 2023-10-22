namespace game.mod.god {


    import TouchEvent = egret.TouchEvent;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import LanDef = game.localization.LanDef;
    import TiandiRandomConfig = game.config.TiandiRandomConfig;

    export class GodRoadMdr extends EffectMdrBase {
        private _view: GodRoadView = this.mark("_view", GodRoadView);
        private _proxy: GodProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onClickAct);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_prop, TouchEvent.TOUCH_TAP, this.onClickProp);
            addEventListener(this._view.btn_tiandi, TouchEvent.TOUCH_TAP, this.onClickTiandi);

            this.onNt(GodEvent.ON_UPDATE_ROAD_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.nowType);
            let maxValue: number = this._proxy.maxValue;
            if (this._proxy.value < maxValue) {
                this._view.bar.show(this._proxy.value, maxValue);
            } else {
                this._view.bar.showMax();
            }
            this._view.cost_once.updateShow(cfg.items[0]);
            let items: number[] = [cfg.items[0][0], cfg.items[0][1] * 10];
            this._view.cost_ten.updateShow(items);

            this._view.icon.setData(cfg.rewards[0]);

            this._view.grp_desc.visible = cfg.desc != "";
            if (cfg.desc) {
                this._view.lab_desc.textFlow = TextUtil.parseHtml(cfg.desc);
            }
            let str: string = getLanById(LanDef.tiandi_tips2);
            let actname: string = getLanById(this._proxy.getActname(this._proxy.nowType));
            this._view.lab_tips.text = `(${StringUtil.substitute(str, [cfg.name, actname])})`;

            this._view.btn_once.setImage("dancigongfeng");
            this._view.btn_once.setHint(BagUtil.checkPropCnt(cfg.costs[0], cfg.costs[1]));
            this._view.btn_ten.setImage("shiliangongfeng");
            this._view.btn_ten.setHint(BagUtil.checkPropCnt(cfg.costs[0], cfg.costs[1] * 10));

            this._view.btn_left.icon = `btn_act_${this._proxy.nowType}`;

            this.updateModel(cfg.image_id);
        }

        public updateModel(index: number, showName = true): void {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if (!cfg) {
                return;
            }
            this._view.name_item.visible = showName;
            this._view.name_item.updateShow(cfg.name, cfg.quality);
            this._view.name_item.updateSr("tiandi");
            this.addAnimate(index, this._view.grp_eff);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(e: TouchEvent): void {
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.nowType);
            let type: number = e.currentTarget == this._view.btn_once ? 1 : 2;
            let cnt = type == 1 ? cfg.items[0][1] : cfg.items[0][1] * 10;
            if (!BagUtil.checkPropCntUp(cfg.items[0][0], cnt)) {
                return;
            }
            this._proxy.c2s_tiandi_gongfeng(type);
        }

        private onClickTiandi(e: TouchEvent): void {
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.nowType);
            ViewMgr.getIns().showGainWaysTips(cfg.items[0][0]);
        }

        private onClickAct(): void {
            let act: string = this._proxy.getAct(this._proxy.nowType);
            ViewMgr.getIns().showView(ModName.God, act);
        }

        private onClickReward(): void {
            let cfgArr: TiandiRandomConfig[] = this._proxy.getPreviewReward(this._proxy.nowType);
            let list: BasePreviewRewardData[] = [];
            for (let cfg of cfgArr) {
                list.push({
                    weight: cfg.weight,
                    award: cfg.award,
                    nameStr: "rolering_reward_type" + cfg.index
                });
            }
            ViewMgr.getIns().openPreviewReward(list);
        }

        private onClickProp(): void {
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.nowType);
            ViewMgr.getIns().showGainWaysTips(cfg.items[0][0]);
        }
    }
}