namespace game.mod.surface {


    import fly_sword_info = msg.fly_sword_info;
    import fly_sword_battle_pos_info = msg.fly_sword_battle_pos_info;
    import jiban_item = msg.jiban_item;

    export class XianjianModel {

        public infos: Map<number, fly_sword_info> = new Map();

        public shangzhen: { [pos: number]: fly_sword_battle_pos_info } = {};

        public types: number[] = [];
        public buwei_types: number[] = [];

        public jiban: jiban_item[] = [];

        public isAct: boolean = false;

        public upStarIdx: number;
        public upStarData: UpStarData;

        /**升星消耗道具 */
        // public starProps: Map<number, number[]> = new Map();
        public starProps: number[] = [];
        /**根据道具获取index */
        public propToIndex: Map<number, number[]> = new Map();

        public costIndex: number[] = [];
    }

}