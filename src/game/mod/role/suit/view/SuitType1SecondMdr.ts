namespace game.mod.role {

    export class SuitType1SecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitSecondBtnType.Btn1,
                icon: 'jinjie',
                mdr: SuitType1Mdr,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1, SuitSecondBtnType.Btn1]
            },
            {
                btnType: SuitSecondBtnType.Btn2,
                icon: 'qianghua',
                mdr: SuitType1StrengthenMdr,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1, SuitSecondBtnType.Btn2]
            }
        ];
    }

}