namespace game.mod.role {

    import privilege_info = msg.privilege_info;

    export class RoleModel {
        public serverDay: number;
        public loginDay: number;
        public openServerTime: number;
        public privilegeList: privilege_info[] = [];//特权集合

        /**根据功能开启id 获取红点路径 */
        public openIdxToHintType: { [openIdx: number]: string[] } = {
            [OpenIdx.Wing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing],
            [OpenIdx.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body],
            [OpenIdx.Weapon]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon],
            [OpenIdx.RoleHuanhua]: [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleHuanhua],//角色界面幻化
            [OpenIdx.RoleCollect]: [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleCollect],//角色界面收集
            [OpenIdx.SuitType1]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain],//套装
            [OpenIdx.XiuxianNvpu]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.XiuxianNvpuGrowMain],//修仙女仆
        };
    }
}
