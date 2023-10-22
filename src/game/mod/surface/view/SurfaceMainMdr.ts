namespace game.mod.surface {

    import LanDef = game.localization.LanDef;

    export class SurfaceMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SurfaceMainBtnType.Main,
                icon: "surface_tab",
                mdr: SurfaceBaseMdr,
                title: LanDef.yuling_tips,
                bg: "yuling_bg",
                hintTypes: [ModName.Surface],
            }
        ];
    }
}