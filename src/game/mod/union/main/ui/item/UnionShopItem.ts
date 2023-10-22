namespace game.mod.union {

    import UnionProxy = game.mod.union.UnionProxy;
    import GuildMibaoConfig = game.config.GuildMibaoConfig;
    import Handler = base.Handler;

    export class UnionShopItem extends BaseRenderer {

        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;

        protected _proxy: UnionProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg: GuildMibaoConfig = this.data;
            if (!cfg) {
                return;
            }
            this.img_bg.source = "common_shop_bg";
            // this.img_bought.source = "yishouqing";
            this.img_bought.visible = false;

            this.icon.data = [cfg.give_item, cfg.give_count];
            let propCfg = GameConfig.getPropConfigById(cfg.give_item);
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(propCfg.name, ColorUtil.getColorByQuality1(propCfg.quality)));
            this.lab_limit.visible = false;

            // this.img_tag.visible = !!cfg.tag;
            // if (cfg.tag) {
            //     this.img_tag.source = cfg.tag;
            // }

            this.btn.setCost([cfg.cost_item, cfg.cost_count])
        }

        private onClick(): void {
            let cfg: GuildMibaoConfig = this.data;
            ViewMgr.getIns().openBuyBulkTips({
                prop: [cfg.give_item, cfg.give_count],
                cost: [cfg.cost_item, cfg.cost_count],
                handler: Handler.alloc(this._proxy, this._proxy.c2s_guild_mibao_swap, [cfg.index])
            });
        }

    }
}