namespace game.mod.consecrate {


    import LanDef = game.localization.LanDef;

    export class ConsecrateMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'gongfengbiaoqiandubiao',
                mdr: ConsecrateMdr,
                title: LanDef.consecrate_title,
                bg: "gongfeng_bg",
                coinIndex2: PropIndex.Gongfeng,
                hintTypes: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "amass_tab",
                mdr: AmassMdr,
                openIdx: OpenIdx.Amass,
                title: LanDef.amass_tips1,
                bg: "",
                hintTypes: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "amass_tab2",
                mdr: AmassMdr2,
                openIdx: OpenIdx.Amass2,
                title: LanDef.amass_tips2,
                bg: "",
                hintTypes: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType03]
            }
        ];
    }
}