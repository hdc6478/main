namespace game.mod {
    import IProxy = base.IProxy;

    export interface IFuchenlinghuProxy extends IProxy {
        //是否开启
        isOpenSea(seaType: SeaType, isTips?: boolean): boolean;

        //召唤消耗道具id列表
        getCostIds(): number[];
    }

}