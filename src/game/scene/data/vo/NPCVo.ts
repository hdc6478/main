namespace game.scene {


    //import NpcConfig = game.config.NpcConfig;

    export class NPCVo extends ActorVo {
        public index: number;
        public npc_id: number; // 服务器标识
        public shape: string;

        // public get cfg(): NpcConfig {
        //     let cfg: NpcConfig = this._cfg;
        //     if (cfg && cfg.index != this.index) {
        //         cfg = null;
        //     }
        //     if (cfg == null && this.index) {
        //         cfg = getConfigByNameId(ConfigName.Npc, this.index);
        //         //if (cfg == null) cfg = getConfigByNameId(ConfigName.TempNpc, this.index);
        //         if (cfg == null) cfg = getConfigByNameId(ConfigName.Monster, this.index);
        //     }
        //     this._cfg = cfg;
        //     return cfg;
        // }

        public applyUpdate(data: any): string[] {
            let s2c: msg.scene_collect_data = data;
            this.index = s2c.index;
            let res = s2c.walk_entity_info ? super.applyUpdate(s2c.walk_entity_info) : [];
            return res;
        }
    }
}
