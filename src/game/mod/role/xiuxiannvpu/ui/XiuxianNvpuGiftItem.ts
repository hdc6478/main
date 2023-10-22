namespace game.mod.role {

    import AyahTargetConfig = game.config.AyahTargetConfig;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuGiftItem extends BaseGiftItemRender {

        data: AyahTargetConfig;
        private _proxy: XiuxianNvpuProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }

            if (cfg.type == 1) {
                this._listData.replaceAll(cfg.reward);
            } else {
                this._listData.replaceAll(PayUtil.getRewards(cfg.product_id));
            }
            let lv = this._proxy.level;
            let str = StringUtil.substitute(getLanById(LanDef.xiuxiannvpu_tips6), [cfg.level]) + TextUtil.addColor(`(${lv}/${cfg.level})`, lv >= cfg.level ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);

            //未完成
            if (cfg.level > lv) {
                this.img_bought.source = `hongseweiwancheng`;
                this.img_bought.visible = true;
                this.btn_buy.visible = false;
                return;
            }

            let isBought = this._proxy.isGiftBought(cfg.index);
            this.img_bought.visible = isBought;
            this.btn_buy.visible = !isBought;

            if (!isBought) {
                if (cfg.type == 2) {
                    let rmb = PayUtil.getRmbValue(cfg.product_id);
                    this.btn_buy.resetCost();
                    this.btn_buy.label = rmb == 0 ? getLanById(LanDef.bosshome_tips5) : rmb + PayUtil.getRmbUnit();
                    this.btn_buy.setHint(rmb == 0);
                } else {
                    this.btn_buy.label = '';
                    if (cfg.cost) {
                        this.btn_buy.setCost(cfg.cost);
                        this.btn_buy.setHint(BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1]));
                    }
                }
            }
        }

        protected onClick() {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            if (cfg.type == 2 && cfg.product_id) {
                PayUtil.pay(cfg.product_id);
                return;
            }
            let cost = cfg.cost;
            if (cost && BagUtil.checkPropCntUp(cost[0], cost[1])) {
                this._proxy.c2s_ayah_buy_gift(cfg.index);
            }
        }
    }
}