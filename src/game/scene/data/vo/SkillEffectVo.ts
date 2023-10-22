namespace game.scene {
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import battle_value = msg.battle_value;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class SkillEffectVo implements PoolObject {
        private static _pool: SkillEffectVo[][] = [];

        public static allocList(): SkillEffectVo[] {
            if (this._pool.length) {
                return this._pool.pop();
            }
            return [];
        }

        public static releaseList(list: SkillEffectVo[]): void {
            if (!list) {
                return;
            }
            Pool.releaseList(list);
            this._pool.push(list);
        }

        public target: BaseActor;
        public target_id: Long;
        public b_value: battle_value[];
        public is_dead: boolean;
        public push_x: number;
        public push_y: number;
        public skillCfg:BattleSkillConfig;

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            self.target = null;
            self.target_id = null;
            self.b_value = null;
            self.is_dead = null;
            self.push_x = null;
            self.push_y = null;
        }

    }

}
