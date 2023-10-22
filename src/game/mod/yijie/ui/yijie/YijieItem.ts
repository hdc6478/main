namespace game.mod.yijie {

    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;
    import YijieConfig = game.config.YijieConfig;
    import LanDef = game.localization.LanDef;
    import yijie_ui_info = msg.yijie_ui_info;
    import YonghengConfig = game.config.YonghengConfig;
    import yongheng_ui_info = msg.yongheng_ui_info;

    export class YijieItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public img_lock: eui.Image;
        public img_type1: eui.Image;
        public img_type2: eui.Image;
        public timeItem: game.mod.TimeItem;
        public redPoint: eui.Image;

        public data: YijieConfig | YonghengConfig;
        private _info: yijie_ui_info | yongheng_ui_info;/**当前boss*/

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let monsterIndex = cfg.monster_index[0];
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this.img_icon.source = monsterCfg.res_id;

            let proxy: YijieProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Yijie);
            let isOpen = proxy.isBossOpen(cfg);

            let nameStr = "";
            if(isOpen){
                nameStr = cfg.name;
            }
            else {
                let lv = cfg.open;
                nameStr = RoleUtil.getRebirthLvStr(lv) + getLanById(LanDef.boss_cue5);
            }
            this.lab_name.text = nameStr;

            let type = cfg.fight_type;
            this.img_type1.visible = true;
            this.img_type2.visible = type == YijieFightType.All;
            if(type == YijieFightType.All){
                this.img_type1.source = "boss_type_1";
                this.img_type2.source = "boss_type_2";
            }
            else {
                this.img_type1.source = "boss_type_" + type;
            }

            this._info = proxy.getBossInfo(cfg["stage"], proxy.curType);//字段定义没导出
            let bossTime = this._info && this._info.time.toNumber() || 0;
            let isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;//已死亡
            this.img_lock.visible = !isOpen || isDied;
            this.timeItem.visible = isDied;

            this.updateTime();
        }

        public updateTime(): void {
            if(!this.data || !this._info){
                return;
            }
            if(!this.timeItem.visible){
                return;
            }
            let bossTime = this._info.time.toNumber();
            let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
            if(nextTime == 0){
                facade.sendNt(BossEvent.UPDATE_BOSS_lIST);
            }
            this.timeItem.updateLeftTime(nextTime);
        }
    }
}
