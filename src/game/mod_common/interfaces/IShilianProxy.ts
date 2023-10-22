namespace game.mod {

    import IProxy = base.IProxy;
    import forbidden_item = msg.forbidden_item;
    import material_item = msg.material_item;

    export interface IShilianProxy extends IProxy {
        isEndSmallGate: boolean;            // 当前是否为最后一个小关
        isXiantaShowExit(): boolean;

        /**获取关卡信息*/
        getFbdInfo(type: number): forbidden_item;
        getFubenInfo(type: number): material_item;
        isFbdTypeOpen(type: number, showTips?: boolean): boolean;
    }

}