namespace game.mod.role {

    export class SuitModel {
        /** 苍天 炎天信息 */
        public infos: { [type: number]: msg.suit_item } = {};
        /** 颢天、玄天、钧天信息 */
        public infos2: { [type: number]: msg.suit_two_item } = {};

        /**二级页签红点路径*/
        public hintPath = {
            [SuitType.CangTian]: {
                [1]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1, SuitSecondBtnType.Btn1],
                [2]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1, SuitSecondBtnType.Btn2]
            },
            [SuitType.YanTian]: {
                [1]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2, SuitSecondBtnType.Btn1],
                [2]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2, SuitSecondBtnType.Btn2]
            },
            [SuitType.HaoTian]: {
                [SuitOperType.JinJie]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn1],
                [SuitOperType.DuanZao]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn2],
                [SuitOperType.JingZhu]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn3]
            },
            [SuitType.XuanTian]: {
                [SuitOperType.JinJie]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn1],
                [SuitOperType.DuanZao]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn2],
                [SuitOperType.JingZhu]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4, SuitSecondBtnType.Btn3]
            },
            [SuitType.JunTian]: {
                [SuitOperType.JinJie]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn1],
                [SuitOperType.DuanZao]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn2],
                [SuitOperType.JingZhu]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5, SuitSecondBtnType.Btn3]
            }
        };

        /**合成红点*/
        public composeHintPath = {
            [SuitType.CangTian]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1, SuitSecondBtnType.Btn1, 'compose1'],
            [SuitType.YanTian]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2, SuitSecondBtnType.Btn1, 'compose2']
        };
    }

}