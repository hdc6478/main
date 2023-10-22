namespace game.mod.activity {


    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import BlessMainConfig = game.config.BlessMainConfig;

    export class WonderfulActMdr6 extends MdrBase {
        protected _view: WonderfulActView6 = this.mark("_view", WonderfulActView6);
        protected _proxy: WonderfulActProxy;


        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_gain, TouchEvent.TOUCH_TAP, this.onClickGain);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickPreview);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_6, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cost: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            this._view.cost_once.updateShow(cost.value[0]);
            this._view.cost_ten.updateShow(cost.value[1]);

            //let count_one: number = BagUtil.getPropCntByIdx(cost.value[0][0]);
            //let hint1 = count_one >= cost.value[0][1];
            this._view.btn_once.setImage("cifu_1");
            let hint1 = this._proxy.oneIsHasHint();
            this._view.btn_once.setHint(hint1);


            //let count_ten: number = BagUtil.getPropCntByIdx(cost.value[1][0]);
            //let hint2 = count_ten >= cost.value[1][1];
            this._view.btn_ten.setImage("cifu_2");
            let hint2 = this._proxy.tenIsHasHint();
            this._view.btn_ten.setHint(hint2);

            let param: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_bottom");
            for (let i = 1; i <= param.value.length; i++) {
                let icon: Icon = this._view[`icon_${i}`];
                if (!icon) {
                    break;
                }
                let nums: number[] = param.value[i - 1];
                let prop: PropData = PropData.create(nums[0], nums[1]);
                icon.setData(prop);
                let color: eui.Image = this._view[`color_${i}`];
                color.source = `yuan_color_${prop.quality}`;
            }

            this.onUpdateCount();
        }

        private onUpdateCount(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_bottom_num");
            let count: number = this._proxy.model.count || 0;
            let showValue: number = cfg.value - count % cfg.value;
            this._view.lab.textFlow = TextUtil.parseHtml(`再抽${TextUtil.addColor(`${showValue}`, WhiteColor.GREEN)}次获得大奖`);
        }

        private onClick(e: TouchEvent): void {
            let button_type: number;
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            switch (e.currentTarget) {
                case this._view.btn_once:
                    if (!BagUtil.checkPropCnt(cfg.value[0][0], cfg.value[0][1], PropLackType.Dialog)) {
                        return;
                    }
                    button_type = 1;
                    break;
                case this._view.btn_ten:
                    if (!BagUtil.checkPropCnt(cfg.value[1][0], cfg.value[1][1], PropLackType.Dialog)) {
                        return;
                    }
                    button_type = 2;
                    break;
            }
            if (!button_type) {
                return;
            }
            this._proxy.c2s_luckbless_button_click(button_type);
        }

        private onClickGain(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "bless_cost");
            ViewMgr.getIns().showGainWaysTips(cfg.value[0][0]);
        }

        private onClickPreview(): void {
            let cfgArr: BlessMainConfig[] = getConfigListByName(ConfigName.BlessMain);
            let list: BasePreviewRewardData[] = [];
            for (let cfg of cfgArr) {
                list.push({
                    weight: cfg.weight,
                    award: cfg.show,
                    nameStr: "rolering_reward_type" + cfg.quality
                });
            }
            ViewMgr.getIns().openPreviewReward(list);
        }
    }
}