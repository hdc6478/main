namespace game.scene {
    import Point = egret.Point;
    import ObjBase = base.ObjBase;

    export class SceneObjVo extends ObjBase {
        private _worldPt: Point;

        public type: number;
        public entity_id: Long;

        public x: number;
        public y: number;
        public name: string;

        public get worldPt(): Point {
            return this._worldPt = MapData.ins.getWorldPt(this.x, this.y, this._worldPt);
        }

        protected _cfg: any;

        public get cfg(): any {
            return this._cfg;
        }

        constructor(type: number) {
            super();
            this.type = type;
        }

        private _res: string[] = [];

        public applyUpdate(data: any): string[] {
            let res = this._res;
            res.length = 0;
            let s2c: msg.scene_entity_data = data;
            let keys = ["entity_id", "name", "x", "y"];
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
