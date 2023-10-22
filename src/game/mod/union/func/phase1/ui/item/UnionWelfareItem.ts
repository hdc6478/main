namespace game.mod.union {

    import guild_reward = msg.guild_reward;
    import GuildChargeConfig = game.config.GuildChargeConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class UnionWelfareItem extends BaseGiftItemRender {
        public data: guild_reward;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg: GuildChargeConfig = getConfigByNameId(ConfigName.GuildCharge, data.index);
            this._listData.source = cfg.rewards;

            let content: string = cfg.type == 1 ? getLanById(LanDef.guild_charge_title) : getLanById(LanDef.guild_charge_title_vip);
            let str = StringUtil.substitute(content, [data.name, cfg.charge_num]);
            this.lb_desc.textFlow = TextUtil.parseHtml(str);

            this.img_bought.visible = data.state == 2;
            this.img_bought.source = "lvseyilingqu";
            this.btn_buy.visible = !this.img_bought.visible;

            if (this.btn_buy.visible) {
                this.btn_buy.label = getLanById(LanDef.lingqu);
                this.btn_buy.setHint(data.state == 1);
            }
        }

        protected onClick() {
            let _proxy: UnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            _proxy.c2s_guild_get_charge_reward(this.data.role_id, this.data.index);
        }
    }
}
