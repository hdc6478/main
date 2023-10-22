namespace game.mod {

    import facade = base.facade;
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    import s2c_rank_info = msg.s2c_rank_info;

    export class RankUtil {
        /**请求排行榜信息*/
        public static c2s_new_rank_req_rank(rankType: number): void {
            let proxy: IRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.Rank);
            return proxy.c2s_new_rank_req_rank(rankType);
        }

        /**请求领取大神榜 奖励*/
        public static c2s_first_rank_award(rankType: number, index: number): void {
            let proxy: IRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.Rank);
            return proxy.c2s_first_rank_award(rankType, index);
        }

        /**获取排行榜信息*/
        public static getRankInfo(rankType: number): s2c_new_rank_info {
            let proxy: IRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.Rank);
            return proxy.getRankInfo(rankType);
        }

        /**获取大神榜信息*/
        public static getGodInfos(rankType: number): RankGodRenderData[] {
            let proxy: IRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.Rank);
            return proxy.getGodInfos(rankType);
        }

        /**获取红点类型*/
        public static getHintTypes(rankType: number): string[] {
            let proxy: IRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.Rank);
            return proxy.getHintTypes(rankType);
        }

        /**新排行榜文本 */
        public static getMyRankTypeDesc(rankType: number, powerCN: boolean = false): string {
            let proxy: INewRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.NewRank);
            return proxy.getMyRankTypeDesc(rankType, powerCN);
        }

        /**新排行榜信息 */
        public static getNewRankInfo(rankType: number): s2c_rank_info {
            let proxy: INewRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.NewRank);
            return proxy.getRankInfo(rankType);
        }

        public static c2s_rank_req_rank(rankType: number, event_type: number = 1): void {
            let proxy: INewRankProxy = facade.retMod(ModName.Rank).retProxy(ProxyType.NewRank);
            return proxy.c2s_rank_req_rank(rankType, event_type);
        }

    }
}