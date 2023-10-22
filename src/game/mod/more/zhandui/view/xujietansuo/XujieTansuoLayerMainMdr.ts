namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieTansuoLayerMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xujietansuo_tab",
                mdr: XujieTansuoLayerMdr,
                title: LanDef.xujietansuo_tips1,
                bg: "xujietansuo_bg1",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn1, MdrTabBtnType.TabBtnType01]
            }
        ];
    }

}