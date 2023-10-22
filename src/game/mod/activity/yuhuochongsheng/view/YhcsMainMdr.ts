namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class YhcsMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "yuhuochongshengbiaoqiantubiao",
                mdr: YhcsMdr,
                title: LanDef.yhcs_tips,
                hintTypes: [ModName.Activity, MainActivityViewType.Yhcs]
            }
        ];

    }
}