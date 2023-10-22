namespace game.mod {

    import IProxy = base.IProxy;

    export interface IDailyProxy extends IProxy {
        getOtherHint(): boolean;//获取玩法系统外部系统红点
        isOtherHint(node: string): boolean;//是否是玩法系统外部系统红点
    }
}