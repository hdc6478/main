namespace game.mod.more {

    import ShopConfig = game.config.ShopConfig;

    export class XiandiModel {
        public free_times: number;
        public geren_ranks: msg.teammate[];
        public guild_ranks: msg.teammate[];
        public my_guild_rank: msg.teammate;
        public my_rank: msg.teammate;

        public click_count: number;
        public is_click: boolean;
        public skill_lv: number;
        public tianwang_info: msg.teammate[];
        public tiandi_info: msg.teammate;
        public xianhou_info: msg.teammate;
        public hongyan_info: msg.teammate;
        public is_gongfeng: boolean;

        public king_index: number;

        public tiandi_zhengba_tiaozhan_xiaohao: number[];
        public tiandi_zhengba_tiaozhan_duowei: number[];
        public tiandi_zhengba_tiaozhan_mianfei: number;
        public xiandi_rank: number[];
        public xiandi_jiangli: number[][];
        public xiandi_libao: number;
        public xiandi_open: number;
        public huanggu_nvshen_buff: number[][];
        public tiandi_zhengba_gongfeng: number[][];

        public readonly open_day: number = 0;

        public servet_day: number;

        /** ---------------------二期-------------------- */
        /**消费数量 */
        count: number = 0;
        /**仙帝武器幻化 */
        is_huanhua: boolean = false;
        /**是否激活 */
        is_activa: boolean = false;
        /**试炼奖励 1.可领取2.已领取 */
        reward_status: number = 0;

        tiandi_box_have: number[];
        // xianqi_buff_property: number[];
        xianqi_fuben_reward: number[];
        // xianqi_stage_list: number[][];
        // xianqi_buff_attr: number[][];
        tiandi_box_iteam: number;
        xianqi_waixian: number;

        shops: Map<number, ShopConfig[]> = new Map();
    }
}