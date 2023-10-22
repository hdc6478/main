namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodHauntedMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'baicaolubiaoqiantubiao',
                mdr: GodHauntedMdr,
                title: LanDef.tiandi_act_type2,
                bg: "",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, GodHintType.Type1, GodViewType.GodTreasure]
            }
        ];
    }
}