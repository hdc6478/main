namespace game.mod.activity {

    export class TongtiangeModel {
        //第一名数据
        public first_data: msg.teammate;
        //列表数据，value=1为黄金屋，rank_num为层数
        public role_list: { [layer: number]: msg.teammate } = {};

        //排名（个人，宗门）
        public rank_no: number = 0;
        public rank_value: number = 0;
        //排行榜玩家数据
        public role_rank_list: { [rankNo: number]: msg.teammate } = {};
        //宗门列表数据
        public guild_rank_list: { [rankNo: number]: msg.teammate } = {};

        //我的建造的次数
        public my_build_num: number = 0;
        //宗门建造的次数
        public guild_build_num: number = 0;
        //挑战奖励列表
        public role_challenge_list: { [index: number]: msg.attic_challenge_data } = {};
        //宗门挑战奖励列表
        public guild_challenge_list: { [index: number]: msg.attic_challenge_data } = {};
        //挑战阶段奖励列表
        public stage_list: { [round: number]: msg.attic_reward_stage_data } = {};
        //兑换列表
        public exchange_list: { [index: number]: msg.attic_exchange_data } = {};
        //登录奖励列表
        public login_reward_list: { [index: number]: msg.attic_Login_reward } = {};
        //礼包数据
        public gift_list: { [index: number]: msg.attic_gift_data } = {};

        //上期排行数据
        public last_rank_no: number = 0;
        public last_build_cnt: number = 0;
        public last_role_list: { [rankNo: number]: msg.teammate } = {};
        public last_guild_list: { [rankNo: number]: msg.teammate } = {};

        public hintPath: { [type: number]: string[] } = {
            1: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn1],
            2: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn2],
            3: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn3],
            4: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn4],
            5: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn5],
            6: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn6]
        };
    }

}