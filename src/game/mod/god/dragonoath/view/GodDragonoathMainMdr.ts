namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodDragonoathMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'fuxibaguabiaoqiantubiao',
                mdr: GodDragonoathMdr,
                title: LanDef.tiandi_act_type3,
                bg: "bg_fuxibagua",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, GodHintType.Type3, GodHintType.Act]
            }
        ];
    }
}