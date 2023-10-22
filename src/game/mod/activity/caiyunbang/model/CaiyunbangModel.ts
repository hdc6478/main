namespace game.mod.activity {

    export class CaiyunbangModel {
        public item_list: msg.prop_tips_data[];
        public times: number;

        public leichong_num = 0;
        public leichong_info: { [id: number]: msg.reward_state } = {};

        public duihuan_info: { [id: number]: msg.goods_buy_times } = {};

        public login_info: { [id: number]: msg.reward_state } = {};

        public rank_list: msg.teammate[] = [];
        public my_score: number = 0;
        public my_rank_no: number = 0;

        //祈福登陆红点 不要了
        public qifuLoginHint = false;
        //累充登陆红点 不要了
        public chargeLoginHint = false;
    }

}