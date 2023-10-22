namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodAvatarMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'zhuanxubaxibiaoqiantubiao',
                mdr: GodAvatarMdr,
                title: LanDef.tiandi_act_type4,
                bg: "bg_zhuanxubaxi",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, GodHintType.Type4, GodHintType.Act, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: 'youlibiaoqiantubiao',
                mdr: GodTravelMdr,
                title: LanDef.youli,
                // bg: "tiandilubeijingtu",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, GodHintType.Type4, GodHintType.Act, MdrTabBtnType.TabBtnType02]
            }
        ];
    }
}