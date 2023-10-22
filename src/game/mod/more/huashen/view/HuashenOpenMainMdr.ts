namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    export class HuashenOpenMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HuashenMainBtnType.Huashen,
                icon: "huashen_tab",
                mdr: HuashenOpenMdr,
                title: LanDef.huashen_tips,
                bg: "huashen_open_bg",
            }
        ];
    }
}