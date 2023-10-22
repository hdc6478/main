namespace game.scene {
    export class PetVo extends ActorVo {

        public index: number;
        public master_id: Long;
        public buddy_type: number;
        public weapon: number;
        public ride: number;
        public circle: number; //灵阵
        public title: number;
        public evolve: number;//神灵进化次数，用于神灵进化后模型、名字等显示

        public master_name: string;

        public isMainPet: boolean;

        public applyUpdate(data: any): string[] {
            let s2c: msg.scene_buddy_data = data;
            let keys = [
                "index",
                "buddy_type",
                "weapon",
                "ride",
                "circle",
                "title",
                "master_id",
                "walk_entity_info",
                "master_name",
                "evolve"
            ];
            let res = super.applyUpdate(s2c.walk_entity_info);
            for (let k of keys) {
                if (!data.hasOwnProperty(k)) {
                    continue;
                }
                if (k === "walk_entity_info") {
                    continue;
                }
                res.push(k);
                this[k] = s2c[k];
            }
            return res;
        }
    }
}
