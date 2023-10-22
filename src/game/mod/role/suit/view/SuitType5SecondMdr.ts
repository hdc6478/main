namespace game.mod.role {

    export class SuitType5SecondMdr extends SuitType3SecondMdr {
        protected _suitType: SuitType = SuitType.JunTian;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitSecondBtnType.Btn1,
                icon: 'jinjie',
                mdr: SuitType5Mdr,
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType5,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn1]
            },
            {
                btnType: SuitSecondBtnType.Btn2,
                icon: 'duanzao',
                mdr: SuitType5ForgeMdr,
                bg: 'suit_duanzao_bg',
                param: OpenIdx.SuitForge5,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn2]
            },
            {
                btnType: SuitSecondBtnType.Btn3,
                icon: 'jingzhu',
                mdr: SuitType5CastMdr,
                bg: "suit_type1_bg",
                param: OpenIdx.SuitCast5,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn3]
            }
        ];
    }

}