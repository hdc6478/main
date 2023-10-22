namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodTreasureMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'xuanyuandikubiaoqiantubiao',
                mdr: GodTreasureMdr,
                title: LanDef.tiandi_act_type1,
                bg: "tiandilubeijingtu",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, GodHintType.Type1, GodHintType.Act]
            }
        ];
    }
}