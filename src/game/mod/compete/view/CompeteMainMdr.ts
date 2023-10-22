namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class CompeteMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "compete_tab",
                mdr: CompeteMdr,
                title: LanDef.compete,
                hintTypes: [ModName.Compete, CompeteViewType.CompeteMain],
            }
        ];

    }
}