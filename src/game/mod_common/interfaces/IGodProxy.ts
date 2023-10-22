namespace game.mod {
    import IProxy = base.IProxy;

    export interface IGodProxy extends IProxy {
        getActivate(type: number): boolean;
    }

}