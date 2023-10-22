namespace game.scene {
    import PropConfig = game.config.PropConfig;
    import Point = egret.Point;

    export class DropItemVo extends SceneObjVo {

        public index: Long;
        public prop_cnt: number;
        public src_coord: Point;
        public dest_coord: Point;

        public owner_entity_id: Long;

        public readyDraw: boolean = false;

        public get cfg(): PropConfig {
            if (!this._cfg || (this.index && this._cfg && this.index.toNumber() != this._cfg.index)) {
                this._cfg = getConfigById(this.index.toNumber());
            }
            return this._cfg;
        }

        public applyUpdate(data: any): string[] {
            let s2c: msg.scene_drop_data = data;
            let keys = [
                "index",
                "entity_id",
                "prop_cnt",
                "src_coord",
                "dest_coord",
                "owner_entity_id",
            ];
            let res = [];
            for (let k of keys) {
                if (!data.hasOwnProperty(k)) {
                    continue;
                }
                if (k === "entity_id" && this.entity_id && this.entity_id.eq(s2c.entity_id)) {
                    continue;
                }
                res.push(k);
                this[k] = s2c[k];
            }
            return res;
        }
    }
}
