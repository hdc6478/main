namespace game.mod {

    import IProxy = base.IProxy;

    export interface IHuashenProxy extends IProxy {
        checkRoadOpen(showTips?: boolean): boolean;
    }

}