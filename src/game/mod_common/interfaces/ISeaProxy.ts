namespace game.mod {
    import IProxy = base.IProxy;

    export interface ISeaProxy extends IProxy {
        /**能否开启排行榜，幻境系统有用到*/
        canOpenRank(): boolean;
        /**是否开启某区域*/
        isEnter(type: SeaType): boolean;
        getRankHintType(type: number): string[];
    }

}