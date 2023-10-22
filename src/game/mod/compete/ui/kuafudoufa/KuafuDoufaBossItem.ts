namespace game.mod.compete {

    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;

    export class KuafuDoufaBossItem extends eui.ItemRenderer {
        private img_icon: eui.Image;
        private img_camp: eui.Image;
        private bar: ProgressBarComp;
        private img_died: eui.Image;

        public data: {camp: number, monsterIndex: number};//怪物ID

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let camp = this.data.camp;
            let monsterIndex = this.data.monsterIndex;
            this.img_camp.source = "kuafu_doufa_icon" + camp;
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            let proxy: CompeteProxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            let hp = proxy.getBossHp(monsterIndex);
            this.updateHp(hp);
        }

        /**更新血量*/
        public updateHp(percent: number): void {
            if(!this.data){
                return;
            }
            this.bar.show(percent, 10000, false, 0, false, ProgressBarType.Percent);//血量
            let isDied = percent <= 0;//已死亡
            this.img_died.visible = isDied;
        }
    }
}
