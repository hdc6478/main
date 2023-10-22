namespace game.mod.activity {


    import Monster1Config = game.config.Monster1Config;
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import facade = base.facade;

    export class KillBossTabItem extends BaseRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public redPoint: eui.Image;

        private _proxy: KillBossProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.KillBoss);
        }

        protected dataChanged(): void {
            let data: DemonRewardConfig = this.data;
            if (!data) {
                return;
            }
            let monsterIndex = data.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            this.lab_name.text = monsterCfg.name;

            // let status = this._proxy.getInfoByIndex(data.index);
            // if (status) {
            //     this.redPoint.visible = status.first_reward == 1 || status.personal_reward == 1 || status.kill_reward == 1;
            // } else {
            //     this.redPoint.visible = false;
            // }
            this.redPoint.visible = this._proxy.getBossItemHint(data.index);
        }
    }
}
