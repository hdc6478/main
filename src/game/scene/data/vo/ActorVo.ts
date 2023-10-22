namespace game.scene {

    import Point = egret.Point;
    import Pool = base.Pool;
    import battle_buff = msg.battle_buff;
    import BuffConfig = game.config.BuffConfig;
    import TimeMgr = base.TimeMgr;
    import teammate = msg.teammate;

    export class ActorVo extends SceneObjVo {
        public speed: number;
        public direction: number;
        public coordinate_list: Point[];

        public percent: number; //血量百分比

        public ex_hp_percent: number;

        public buffs: battle_buff[];
        public is_buff_empty: boolean;

        public hp: Long;
        public max_hp: Long;
        public showpower: Long;

        public camp: number;//阵营
        //public owner_name: string;

        // public talents: number[];

        // public say_params: string[];
        // public say_index: number;

        public isTarget: boolean = false;

        public getBuffByType(type: BuffType): battle_buff {
            if (!this.buffs) {
                return null;
            }
            for (let b of this.buffs) {
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, b.buff_index);
                if (!buffCfg) {
                    continue;
                }
                // if (buffCfg.group == type) {
                //     return b;
                // }
            }
            return null;
        }

        public getBuffByIndex(index: number): battle_buff {
            if (!this.buffs) {
                return null;
            }
            for (let b of this.buffs) {
                let leftTime = b.end_time - TimeMgr.time.serverTimeSecond;
                if (b.buff_index == index && (leftTime > 0 || b.beg_time == b.end_time)) {
                    return b;
                }
            }
            return null;
        }

        public applyUpdate(data: any): string[] {
            let s2c: msg.scene_walk_entity_data = data;
            let keys = [
                "move_type",
                "speed",
                "direction",
                "hp",
                "max_hp",
                "entity_info",
                "buffs",
                // "talents",
                "coordinate_list",
                "camp",
                "percent",
                "is_buff_empty",
                // "say_index",
                // "say_params",
                "showpower",
                //"owner_name",
                "ex_hp_percent"
            ];
            let res = super.applyUpdate(s2c.entity_info);
            for (let k of keys) {
                if (!data.hasOwnProperty(k)) {
                    continue;
                }
                if (k === "coordinate_list") {
                    let list = this.coordinate_list || [];
                    this.coordinate_list = list;
                    list.length = 0;
                    for (let p of s2c.coordinate_list) {
                        list.push(Pool.alloc(Point).setTo(p.x, p.y));
                    }
                    res.push(k);
                    continue;
                }
                if (k === "entity_info") {
                    continue
                }
                if (this[k] instanceof Long) {
                    if (!this[k]) {
                        this[k] = new Long(s2c[k].low, s2c[k].high);
                    } else {
                        this[k].low = s2c[k].low;
                        this[k].high = s2c[k].high;
                    }
                } else {
                    this[k] = s2c[k];
                }
                res.push(k);
            }
            if (this.buffs && this.is_buff_empty && res.indexOf("is_buff_empty") > -1) {
                this.buffs.length = 0;
                if (res.indexOf("buffs") < 0) {
                    res.push("buffs");
                }
            }
            return res;
        }
    }
}
