namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiXianjiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianji_icon",
                mdr: ZhanduiXianjiSecondMainMdr,
                title: LanDef.zhandui_tips21,
                bg: ""
            }
        ];
    }

}