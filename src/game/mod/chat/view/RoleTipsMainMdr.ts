namespace game.mod.chat {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class RoleTipsMainMdr extends WndSecondMainMdr {
        protected _btnList: ArrayCollection;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "chat_role_1",
                mdr: RoleTipsMdr,
                title: LanDef.chat_role_tips_tab1,
                bg: "",
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "chat_role_2",
                mdr: RoleTipsBattleMdr,
                title: LanDef.chat_role_tips_tab1,
                bg: "chat_bg2",
            }
        ];
    }
}