namespace game.mod.more {

    import zhandui_kuanzhu_data = msg.zhandui_kuanzhu_data;
    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    import zhandui_conquer_data = msg.zhandui_conquer_data;

    export class MiningModel {

        public list: zhandui_kuanzhu_data[] = [];

        public total: number = 0;

        public conquer_num: number = 0;

        /**每天可征服总次数 */
        public team_conquest_num: number;

        public team_rescue_num: number;

        public dail_buy_num: number = 0;

        /**征服购买总次数 */
        public team_buy_num: number;

        public team_buy_pay_num: number;

        public rescue_num: number = 0;

        public logs: zhandui_zhanbao_data[] = [];

        public lingbao_cnt: number = 0;

        public team_lingbao_cishuxianzhi: number;

        public buy_list: number[] = [];

        public mdrType: number;

        public conquest_list: zhandui_conquer_data[] = [];

        public team_lingbao_cost: number[];

        public team_kuanmai_item: number;

        public refresh_list: boolean = false;

        public exitTeam() {
            this.list = [];
            this.total = 0;
            this.conquer_num = 0;
            this.team_conquest_num = null;
            this.team_rescue_num = null;
            this.dail_buy_num = 0;
            this.team_buy_num = null;
            this.team_buy_pay_num = null;
            this.rescue_num = 0;
            this.logs = [];
            this.lingbao_cnt = 0;
            this.team_lingbao_cishuxianzhi = null;
            this.buy_list = [];
            this.conquest_list = [];
            this.team_lingbao_cost = null;
            this.team_kuanmai_item = null;
        }
    }

}