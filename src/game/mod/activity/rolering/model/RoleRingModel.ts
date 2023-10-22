namespace game.mod.activity {

    import role_ring_info = msg.role_ring_info;

    export class RoleRingModel {
        public infos: role_ring_info[];
        public hints: string[][] = [
            [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType01, HintType.RoleRingType1],
            [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType01, HintType.RoleRingType2],
            [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType01, HintType.RoleRingType3],
        ];//红点
    }
}
