namespace game.mod {

    import IProxy = base.IProxy;

    export interface ILotteryProxy extends IProxy {
        isOpen(): boolean
    }

}