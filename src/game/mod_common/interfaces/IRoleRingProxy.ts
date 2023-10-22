namespace game.mod {

    import IProxy = base.IProxy;

    export interface IRoleRingProxy extends IProxy {
        /**不要直接访问proxy数据，通过RoleUtil访问*/
        isRoleRingAct(type?: number): boolean;///**主角光环是否激活*/
    }

}