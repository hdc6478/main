namespace game.mod.role {

    export class SuitType2SecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitSecondBtnType.Btn1,
                icon: 'jinjie',
                mdr: SuitType2Mdr,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2, SuitSecondBtnType.Btn1]
            },
            {
                btnType: SuitSecondBtnType.Btn2,
                icon: 'qianghua',
                mdr: SuitType2StrengthenMdr,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2, SuitSecondBtnType.Btn2]
            }
        ];
    }

}