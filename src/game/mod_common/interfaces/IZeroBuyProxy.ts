namespace game.mod {
    import IProxy = base.IProxy;

    export interface IZeroBuyProxy extends IProxy {
        isOpen: boolean;
    }
}