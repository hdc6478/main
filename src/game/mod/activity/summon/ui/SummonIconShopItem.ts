namespace game.mod.activity {

    import DrawGiftConfig = game.config.DrawGiftConfig;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class SummonIconShopItem extends BaseRenderer {

        private icon: Icon;
        private btn: Btn;
        private img_bought: eui.Image;
        private lab_name: eui.Label;
        private lab_limit: eui.Label;

        public data: DrawGiftConfig;

        private _proxy: SummonProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Summon);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            let cfg: DrawGiftConfig = this.data;
            if (!cfg) {
                return;
            }
            this.icon.setData(cfg.items);
            let prop: PropData = PropData.create(cfg.items[0], cfg.items[1]);
            this.lab_name.textFlow = prop.getPropName();

            this.img_bought.visible = !cfg.count;
            this.btn.visible = !this.img_bought.visible;
            this.btn.visible && this.btn.setCost(cfg.cost);
            if (cfg.count) {
                let count: number = this._proxy.getCountByIndex(cfg.index);
                count = count > -1 ? count : cfg.count;
                this.lab_limit.textFlow = TextUtil.parseHtml(`每周:${TextUtil.addColor(`${count}/${cfg.count}`, Color.GREEN)}`);
            } else {
                this.lab_limit.text = "";
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if (!BagUtil.checkPropCnt(data.cost[0], data.cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_draw_buy_gift(data.index);
        }
    }
}