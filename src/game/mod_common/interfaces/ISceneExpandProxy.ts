namespace game.mod {

    import IProxy = base.IProxy;

    export interface ISceneExpandProxy extends IProxy {
        end_time: number
        
        jumpToStrength: string
    }
}