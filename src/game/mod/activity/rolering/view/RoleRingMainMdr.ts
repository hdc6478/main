namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class RoleRingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "rolering_tab",
                mdr: RoleRingMdr,
                title: LanDef.role_ring_title1,
                bg: "rolering_bg",
                hintTypes: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "tequanlingtubiao",
                mdr: PrerogativeWritMdr,
                title: LanDef.tql_tips1,
                bg: "prerogativewrit_bg",
                openIdx: OpenIdx.PrerogativeWrit,
                hintTypes: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02]
            }
        ];
    }

}