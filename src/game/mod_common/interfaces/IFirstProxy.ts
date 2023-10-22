namespace game.mod {
    import IProxy = base.IProxy;

    export interface IFirstProxy extends IProxy {
        one_first: boolean;
        cache_times: boolean;
    }
}