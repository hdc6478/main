namespace game.mod {
    import IProxy = base.IProxy;

    export interface IXianmaiProxy extends IProxy {
        //能否打开进阶礼包界面
        isActTime(): boolean;
    }
}