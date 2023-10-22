namespace game.mod.pass {

    import LanDef = game.localization.LanDef;

    export class PassMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: PassMainBtnType.Main,
                openIdx: OpenIdx.Pass,
                icon: "ui_tab_pass_",
                title: LanDef.pass_tips1,
                bg: "pass_bg",
                mdr: PassMdr,
                hintTypes: [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Main],
            },
            {
                btnType: PassMainBtnType.WorldMap,
                openIdx: OpenIdx.WorldMap,
                icon: "ui_tab_worldmap_",
                title: LanDef.pass_tips2,
                bg: "worldMap1",
                mdr: WorldMapMdr,
                hintTypes: [ModName.Pass, PassViewType.PassMain + PassMainBtnType.WorldMap],
            },
            {
                btnType: PassMainBtnType.Qiyuan,
                openIdx: OpenIdx.Qiyuan,
                icon: "ui_tab_qiyuan_",
                title: LanDef.pass_tips3,
                bg: "pass_map_bg2",
                mdr: QiyuanMdr,
                hintTypes: [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Qiyuan],
            }
        ];
        
    }
}