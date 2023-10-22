namespace game.mod.role {

    export class SuitType3SecondMdr extends WndSecondMdr {
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _suitType: SuitType = SuitType.HaoTian;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitSecondBtnType.Btn1,
                icon: 'jinjie',
                mdr: SuitType3Mdr,
                bg: "suit_type1_bg",
                openIdx: OpenIdx.SuitType3,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn1]
            },
            {
                btnType: SuitSecondBtnType.Btn2,
                icon: 'duanzao',
                mdr: SuitType3ForgeMdr,
                bg: 'suit_duanzao_bg',
                param: OpenIdx.SuitForge3,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn2]
            },
            {
                btnType: SuitSecondBtnType.Btn3,
                icon: 'jingzhu',
                mdr: SuitType3CastMdr,
                bg: "suit_type1_bg",
                param: OpenIdx.SuitCast3,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.SuitMain, SuitMainBtnType.SuitType3, SuitSecondBtnType.Btn3]
            }
        ];

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if (data && data.param && index != 0 && !ViewMgr.getIns().checkViewOpen(data.param, true)) {
                return false;
            }
            if (index == 1 && !this._proxy.checkOpenForge(this._suitType)) {
                PromptBox.getIns().show(`未有穿戴的装备`);
                return false;
            }
            return super.onTabCheck(index);
        }
    }

}