namespace game.mod.role {

    export class SuitType4SecondMdr extends SuitType3SecondMdr {
        protected _suitType: SuitType = SuitType.XuanTian;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitSecondBtnType.Btn1,
                icon: 'jinjie',
                mdr: SuitType4Mdr,
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType4,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn1]
            },
            {
                btnType: SuitSecondBtnType.Btn2,
                icon: 'duanzao',
                mdr: SuitType4ForgeMdr,
                bg: 'suit_duanzao_bg',
                param: OpenIdx.SuitForge4,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn2]
            },
            {
                btnType: SuitSecondBtnType.Btn3,
                icon: 'jingzhu',
                mdr: SuitType4CastMdr,
                bg: "suit_type1_bg",
                param: OpenIdx.SuitCast4,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn3]
            }
        ];
    }

}