namespace game.mod.xianyuan {

    import teammate = msg.teammate;

    export class XianlvDoufaModel {
        public max_win_count: number = 0;
        /**0没开启挑战 */
        public count: number = 0;
        public buy_count: number = 0;
        public reward: number = 0;

        public total_score: number;
        public total_count: number;

        public show_tips: boolean = false;

        public geren_rank: teammate[];
        public first_info: teammate[];
        public my_rank: teammate;

        public player_info: teammate[];

        public auto: boolean = false;

        xianlvdoufa_xiandeng: number;
        xianlvdoufa_cost: number[];
        xianlvdoufa_rank: number;
        xianlvdoufa_time:number;
        xianlvdoufa_buy:number;
        xianlvdoufa_buycost:number[];
    }

}