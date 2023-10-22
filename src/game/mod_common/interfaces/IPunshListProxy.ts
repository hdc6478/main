namespace game.mod {
    import IProxy = base.IProxy;
    import rank_info = msg.rank_info;

    export interface IPunshListProxy extends IProxy {
        type: number;
        surfaceType: number[];
        roleType: number[];
        openIdxs: number[];

        getEndTime(): number;

        getRankFirst(): rank_info;

        getRankTypeByOpenIdx(openIdx: number): number;

        getSurfaceHintNodes(type: number): string[];

        getOpenIdx(type: number): number;
    }
}