namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class GivingShenLingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "songyaojixianzitubiao",
                mdr: GivingShenLingMdr,
                title: LanDef.give_shenling_tips,
                bg: "yaojixianzi_bg",
                hintTypes: [ModName.Activity, MainActivityViewType.GivingShenLing],
            }
        ]
    }
}
