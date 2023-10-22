namespace game.mod {

    import IProxy = base.IProxy;

    export interface IPrerogativeWritProxy extends IProxy {
        /**特权令是否全部购买了*/
        isAllBought(): boolean;
    }

}