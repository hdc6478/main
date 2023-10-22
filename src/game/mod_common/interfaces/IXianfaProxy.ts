namespace game.mod {
    import IProxy = base.IProxy;

    export interface IXianfaProxy extends IProxy {
        posSkills: number[];
        skills:number[];
    }
}