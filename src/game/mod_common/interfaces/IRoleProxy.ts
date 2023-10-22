namespace game.mod {
    import property = msg.property;
    import attributes = msg.attributes;
    import IProxy = base.IProxy;

    export interface IRoleProxy extends IProxy {

        updateDay(serverDay : number, loginDay: number): void;

        readonly serverDay: number;//开服天数，RoleUtil直接取
        readonly loginDay: number;//登录天数，RoleUtil直接取

        updateRole(prop: property, attr: attributes): string[];

        getLeftTime(endDay: number): number;

        hasPrivilege(key: string): boolean;//是否有特权

        getPrivilegeValue(key: string): number;//特权值

    }
}