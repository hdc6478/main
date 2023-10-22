namespace game.mod.boss {

    import CrossBossConfig = game.config.CrossBossConfig;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class CrossBossItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public img_lock: eui.Image;
        public redPoint: eui.Image;

        public data: CrossBossConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            let lv1 = cfg.open[0];
            let lv2 = cfg.open[1];
            let nameStr = RoleUtil.getRebirthLvStrNoZhuan(lv1) + "-" + RoleUtil.getRebirthLvStr(lv2);
            this.lab_name.text = nameStr;

            let proxy: BossProxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
            let canChanllenge = ViewMgr.getIns().checkRebirth(lv1) && proxy.selCrossBossCfg.index == cfg.index;
            this.img_lock.visible = !canChanllenge;
        }
    }
}
