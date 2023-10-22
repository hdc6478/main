namespace game.mod.role {

    export class TitleSecondMainMdr extends WndSecondMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "achievement_tab_icon",
                mdr: TitleMdr,
                title: 'surface_tips8',
                openIdx: 0,
                hintTypes: [ModName.Role, NewRoleViewType.TitleMain, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "rank_tab_icon",
                mdr: TitleMdr2,
                title: 'surface_tips8',
                openIdx: 0,
                hintTypes: [ModName.Role, NewRoleViewType.TitleMain, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "special_tab_icon",
                mdr: TitleMdr3,
                title: 'surface_tips8',
                openIdx: 0,
                hintTypes: [ModName.Role, NewRoleViewType.TitleMain, MdrTabBtnType.TabBtnType03]
            }
        ];
    }

}