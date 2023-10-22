namespace game.mod.more {
    import teammate = msg.teammate;
    import prop_tips_data = msg.prop_tips_data;

    export class FengmoModel {
        public mvp_info: teammate;
        public times: number = 0;
        public buy_times: number = 0;
        public total_times: number = 0;
        public my_max_damage: number;
        public damage_value: number;
        public guild_ranks: teammate[];
        public person_ranks: teammate[];
        public my_guild_rank: teammate;
        public my_rank: teammate;
        public damage_indexs: number[] = [];
        public times_indexs: number[] = [];
        public reward: prop_tips_data[] = [];

        public guild_fengmo_model: number;
        public guild_fengmo_meiricishu: number;
        public guild_fengmo_meirixiangou: number;
        public guild_fengmo_time: number;

        last_rank_num: number;
        props: prop_tips_data[];
    }
}