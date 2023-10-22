namespace game.mod.more {

    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class XianjieLuandouZhanbaoItem extends BaseListenerRenderer {
        public img_boss: eui.Image;
        public lb_name: eui.Label;
        public lb_guildname: eui.Label;
        public lb_desc: eui.Label;
        public lb_died: eui.Label;

        data: msg.xianjie_pvp_battle_report;
        private _proxy: XianjieLuandouProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.XianjieLuandou);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let bossId = data.boss_id.toNumber();
            let bossCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, bossId);
            this.img_boss.source = bossCfg && bossCfg.res_id || '';
            this.lb_name.text = bossCfg && bossCfg.name || '';
            this.lb_guildname.text = getLanById(LanDef.xianjieluandou_tips12) + `：` + (data.kill_name || '无');
            this.lb_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xianjieluandou_tips11));

            let hp = this._proxy.getBossHp(bossId);
            this.lb_died.visible = hp <= 0;
        }
    }
}