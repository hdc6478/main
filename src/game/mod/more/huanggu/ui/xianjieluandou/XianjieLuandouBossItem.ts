namespace game.mod.more {

    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;

    export class XianjieLuandouBossItem extends BaseListenerRenderer {
        public img_di: eui.Image;
        public img_icon: eui.Image;
        public img_camp: eui.Image;
        public bar: game.mod.ProgressBarComp;
        public img_died: eui.Image;

        data: XianjiebrawlBaseConfig;
        private _proxy: XianjieLuandouProxy;

        constructor() {
            super();
            this.skinName = `skins.more.XianjieLuandouBossItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.XianjieLuandou);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let monsterId = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterId);
            this.img_icon.source = monsterCfg.res_id;
            this.img_di.visible = cfg.lingshi_type == 1;//中间那个
            this.img_camp.source = 'xianjie_imgtype' + cfg.lingshi_type;

            let hp = this._proxy.getBossHp(monsterId);
            this.updateHp(hp);
        }

        /**更新血量*/
        public updateHp(percent: number): void {
            if (!this.data) {
                return;
            }
            this.bar.show(percent, 10000, false, 0, false, ProgressBarType.Percent);//血量
            //已死亡
            this.img_died.visible = percent <= 0;
        }
    }
}