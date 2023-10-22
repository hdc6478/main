namespace game.mod.role {

    export class SuitMainMdr extends WndBaseMdr {
        private _proxy: SuitProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitMainBtnType.SuitType1,
                icon: "cangtianbiaoqiantubiao",
                mdr: SuitType1SecondMdr,
                title: SuitTypeName[SuitType.CangTian],
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType1,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType1]
            },
            {
                btnType: SuitMainBtnType.SuitType2,
                icon: "yantianbiaoqiantubiao",
                mdr: SuitType2SecondMdr,
                title: SuitTypeName[SuitType.YanTian],
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType2,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType2]
            },
            {
                btnType: SuitMainBtnType.SuitType3,
                icon: "haotianbiaoqiantubiao",
                mdr: SuitType3SecondMdr,
                title: SuitTypeName[SuitType.HaoTian],
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType3,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3]
            },
            {
                btnType: SuitMainBtnType.SuitType4,
                icon: "xuantianbiaoqiantubiao",
                mdr: SuitType4SecondMdr,
                title: SuitTypeName[SuitType.XuanTian],
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType4,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType4]
            },
            {
                btnType: SuitMainBtnType.SuitType5,
                icon: "juntianbiaoqiantubiao",
                mdr: SuitType5SecondMdr,
                title: SuitTypeName[SuitType.JunTian],
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType5,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType5]
            }

        ];
    }

}