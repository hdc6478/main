namespace game.mod.rank {

    export class NewRankModel {
        /**排行榜信息*/
        public rank_info: { [rankType: number]: { [eventType: number]: msg.s2c_rank_info } } = {};

        /**大神榜奖励信息*/
        public reward_list: { [rankType: number]: { [index: number]: msg.rank_reward } } = {};

        /**可点赞信息*/
        public worship_list: number[] = [];

        public hintPath: string[] = [ModName.Rank, RankViewType.NewRankMain, RankMainBtnType.Rank];

        /**在一个小时内，请求不生效*/
        public time_map: {[type: number]: number} = {}
    }

}