namespace game.mod {
    import IProxy = base.IProxy;

    export interface IShenlingGiftProxy extends IProxy {
        //能否开启
        canOpen(): boolean;

        //神灵界面按钮红点
        giftHint: boolean;
    }

}