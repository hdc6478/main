namespace game.mod.boss {

    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import Monster1Config = game.config.Monster1Config;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;

    export class ManyBossItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public bar: ProgressBarComp;
        public img_lock: eui.Image;
        public img_type: eui.Image;
        public timeItem: game.mod.TimeItem;
        public redPoint: eui.Image;

        public data: NewMultipleBossConfig;
        private _info: new_multiple_boss_data;/**当前boss*/

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;
            //todo，boss类型定义

            let proxy: BossProxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
            this._info = proxy.getBossInfo(cfg.index);

            let isDied = !this._info || this._info.hp <= 0;//boss已死亡
            this.img_lock.visible = this.timeItem.visible = isDied;
            this.bar.visible = !isDied;
            if(this.bar.visible){
                this.bar.show(this._info.hp, 100, false, 0, false, ProgressBarType.Percent);//boss血量
            }
            this.updateTime();

            // this.redPoint.visible = !isDied && proxy.canChallengeBoss();
        }

        public updateTime(): void {
            if(!this.data || !this._info){
                return;
            }
            if(!this.timeItem.visible){
                return;
            }
            let bossTime = this._info.recover_time.toNumber();
            let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
            if(nextTime == 0){
                facade.sendNt(BossEvent.UPDATE_BOSS_lIST);
            }
            this.timeItem.updateLeftTime(nextTime);
        }
    }
}
