namespace game.mod {
    import IProxy = base.IProxy;

    export interface IDailyLimitTimeActProxy extends IProxy {
        isOpen(type: number): boolean;
        getNextStartTime(type: number): number;
    }
}