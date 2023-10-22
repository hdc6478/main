namespace game.mod.activity {

    import draw_itype_luck_gift_data = msg.draw_itype_luck_gift_data;
    import teammate = msg.teammate;
    import draw_fengyun_data = msg.draw_fengyun_data;
    import draw_gift_data = msg.draw_gift_data;

    export class SummonModel {
        /**当前mdr*/
        public mdrType: number;
        /**当前抽奖类型 */
        public type: number | CommonCountType;

        /**总抽取数 */
        public count: number = 0;
        /**积分 */
        public score: number = 0;
        /**非酋积分 */
        public unluck_score: number = 0;
        /**最小幸运值 */
        public min_luck_score: number = 0;
        /**最大幸运值 */
        public max_luck_score: number = 0;
        /**排行榜结束时间 */
        public end_time: number;
        /**我的排行属性 */
        public my_data: teammate;
        /**此次抽奖欧气值(用于抽奖界面显示) */
        public luck_num: number;

        /**命运豪礼各类型豪礼数据 */
        public gift_list: { [key: number]: draw_itype_luck_gift_data } = {};
        /**排行榜数据 */
        public rank_list: teammate[] = [];
        /**风云录数据 */
        public list: draw_fengyun_data[] = [];
        /**礼券数据 */
        public item_list: draw_gift_data[] = [];
    }
}
