namespace game.mod.role {

    export class RoleMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "role_tab",
                mdr: RoleInfoMdr,
                title: 'role_tips1',
                bg: "p1_role_bg",
                openIdx: OpenIdx.Role,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "title_tab",
                mdr: TitleSecondMainMdr,
                title: 'surface_tips8',
                bg: '',
                openIdx: OpenIdx.Title,
                hintTypes: [ModName.Role, NewRoleViewType.TitleMain]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "touxiangbiaoqiantubiao",
                mdr: DressUpInfoMdr,
                title: 'dressUp_cue',
                bg: "p1_dressup_bg2",
                openIdx: OpenIdx.DressUp,
                hintTypes: [ModName.Role, NewRoleViewType.DressUpMain,MdrTabBtnType.TabBtnType03]
            },
            {
                btnType: MdrTabBtnType.TabBtnType04,
                icon: "touxiangkuangbiaotiantubiao",
                mdr: DressUpInfo2Mdr,
                title: 'dressUp_cue',
                bg: "p1_dressup_bg2",
                openIdx: OpenIdx.DressUp,
                hintTypes: [ModName.Role, NewRoleViewType.DressUpMain,MdrTabBtnType.TabBtnType04]
            },
            {
                btnType: MdrTabBtnType.TabBtnType05,
                icon: "liaotiankuangbiaoqiantubiao",
                mdr: DressUpInfo3Mdr,
                title: 'dressUp_cue',
                bg: "p1_dressup_bg2",
                openIdx: OpenIdx.DressUp,
                hintTypes: [ModName.Role, NewRoleViewType.DressUpMain,MdrTabBtnType.TabBtnType05]
            },
        ];
    }
}