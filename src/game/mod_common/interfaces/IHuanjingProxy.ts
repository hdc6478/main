namespace game.mod {
    import IProxy = base.IProxy;
    export interface IHuanjingProxy extends IProxy {
         getGrowHintPath(systemId: number): string[];
        //外显激活数量
        getSurfaceActedNum(systemId: number): number;
    }
}