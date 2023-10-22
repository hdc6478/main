namespace game.mod.more {

    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_member_data = msg.xianwei_member_data;
    import xianwei_place_data = msg.xianwei_place_data;
    import xianwei_reward_data = msg.xianwei_reward_data;
    import xianwei_common_log_data = msg.xianwei_common_log_data;
    import xianwei_log_data = msg.xianwei_log_data;
    import teammate = msg.teammate;

    export class XianweiModel {

        public list: Map<string, xianwei_member_data> = new Map();
        public my_place: xianwei_place_data;
        public reward_data: xianwei_reward_data;
        public log_list: xianwei_common_log_data[];
        public attack_time: number;

        public member_list: xianwei_member_data[];
        public zhanbao_list: xianwei_log_data[];
        public ranks: teammate[];
        public my_rank: teammate;

        public cfgs: Map<number, XianweiBaseConfig[]> = new Map();
        public cfgArr: Map<string, XianweiBaseConfig> = new Map();

        public xianwei_act: number[][];
        public xianwei_buy_time: number[];
    }
}