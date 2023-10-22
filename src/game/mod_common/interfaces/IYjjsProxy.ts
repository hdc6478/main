namespace game.mod {
    import IProxy = base.IProxy;

    export interface IYjjsProxy extends IProxy {
        /**是否开启 玩家领取了“送神灵”的活动奖励 且在活动时间内*/
        isOpen(): boolean
    }

}