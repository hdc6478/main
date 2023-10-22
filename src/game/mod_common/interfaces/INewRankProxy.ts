namespace game.mod {

    import IProxy = base.IProxy;
    import s2c_rank_info = msg.s2c_rank_info;

    export interface INewRankProxy extends IProxy {
        getRankInfo(type: RankType, eventType?: number): s2c_rank_info;
        getMyRankTypeDesc(rankType: number,powerCN?:boolean): string;
        c2s_rank_req_rank(rankType: number,event_type?:number):void;
    }

}