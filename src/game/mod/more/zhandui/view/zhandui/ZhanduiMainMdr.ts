namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: ZhanduiMainBtnType.Xujie,
                icon: "xujie_icon",
                mdr: ZhanduiMdr,
                title: LanDef.zhandui_tips11,
                bg: "xujie_bg",
                openIdx: OpenIdx.Zhandui,
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie]
            }
        ];
    }

}