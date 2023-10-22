

namespace game.mod {
    import IProxy = base.IProxy;
    export interface IResultProxy extends IProxy {
        is_success: boolean,
    }
}