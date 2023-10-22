namespace game.mod {

    import IProxy = base.IProxy;

    export interface ITehuiLibaoProxy extends IProxy {
        getInfo(type:number): number;
    }
}