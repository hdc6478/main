namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import VipChargeConfig = game.config.VipChargeConfig;
    import LanDef = game.localization.LanDef;

    export class VipWelfareItem extends BaseListenerRenderer {
        public lab_desc: eui.Label;
        public list_reward: eui.List;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _rewardList: ArrayCollection;
        private _proxy: WonderfulActProxy;

        public data: {cfg: VipChargeConfig, canDraw: boolean, hasDraw: boolean};

        protected onAddToStage(): void {
            super.onAddToStage();
            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.WonderfulAct);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClickDraw, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data.cfg;

            let rmb = this._proxy.getRmb(TiannvWelfareOpType.Vip);
            let limitRmb = cfg.value;
            let descStr = StringUtil.substitute(getLanById(LanDef.vip_welfare_tips1), [limitRmb])
                + TextUtil.addColor("(" + rmb + "/" + limitRmb + ")", rmb >= limitRmb ? WhiteColor.GREEN : WhiteColor.RED);

            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);

            this._rewardList.source = cfg.reward.slice(0,3);

            let hasDraw = data.hasDraw;
            this.btn_draw.visible = !hasDraw;
            this.img_draw.visible = hasDraw;
            if(this.btn_draw.visible){
                let canDraw = data.canDraw;
                this.btn_draw.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_draw.setYellow();
                }
                else {
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.exp_pool15);
                    this.btn_draw.setBlue();
                }
            }
        }

        private onClickDraw(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(data.canDraw){
                let cfg = data.cfg;
                this._proxy.c2s_tired_charge_receive(TiannvWelfareOpType.Vip, cfg.index);
                return;
            }
            ViewMgr.getIns().openCommonRechargeView();
        }
    }
}