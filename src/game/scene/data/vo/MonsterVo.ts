namespace game.scene {

    import Monster1Config = game.config.Monster1Config;

    export class MonsterVo extends ActorVo {
        public isReady: boolean = false;
        public index: number;
        public lv: number = 0;
        private _monsterType: number;
        public get monsterType(): MonsterType {
            if (this._monsterType != undefined) {
                return this._monsterType;
            }
            if (this.cfg) {
                let idx = this.cfg.index + "";
                this._monsterType = parseInt(idx.slice(2, 4));/**index第三、四位为怪物类型，BOSS类型是2*/
                return this._monsterType;
            }
            return null;
        }

        public isDead: boolean = false;

        public get cfg(): Monster1Config {
            let cfg: Monster1Config = this._cfg;
            if (cfg == null || cfg.index != this.index) {
                cfg = null;
            }
            if (cfg == null && this.index) {
                cfg = getConfigByNameId(ConfigName.Monster, this.index);
            }
            this._cfg = cfg;
            // this.lv = cfg ? cfg.level : 0;
            return cfg;
        }

        public applyUpdate(s2c: msg.scene_monster_data | msg.scene_collect_data): string[] {
            if(s2c.index){
                if (typeof s2c.index == "number"){
                    this.index = s2c.index;
                }
                else {
                    this.index = s2c.index.toNumber();
                }
            }
            return super.applyUpdate(s2c.walk_entity_info);
        }

    }
}
