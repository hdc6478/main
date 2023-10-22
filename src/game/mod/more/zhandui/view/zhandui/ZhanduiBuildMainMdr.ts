namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiBuildMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhandui_icon",
                mdr: ZhanduiBuildMdr,
                title: LanDef.zhandui_tips1,
                bg: "zhandui_bg",
                openIdx: OpenIdx.Zhandui
            }
        ];
    }

}