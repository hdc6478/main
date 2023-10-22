namespace game.mod {

    import IProxy = base.IProxy;
    import s2c_new_rank_info = msg.s2c_new_rank_info;

    export interface IRankProxy extends IProxy {
        /**不要直接访问proxy数据，通过RankUtil访问*/
        c2s_new_rank_req_rank(rankType: number): void;/**请求排行榜信息*/
        c2s_first_rank_award(rankType: number, index: number): void;/**请求领取大神榜 奖励*/
        getRankInfo(rankType: number): s2c_new_rank_info;/**获取排行榜信息*/
        getGodInfos(rankType: number): RankGodRenderData[];/**获取大神榜信息*/
        getHintTypes(rankType: number): string[];/**获取红点类型*/
    }

}