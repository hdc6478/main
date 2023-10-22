namespace game.mod.union {

    import LanDef = game.localization.LanDef;

    export class UnionBookMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "diyicengbiaoqiantubiao",
                mdr: UnionBookMdr,
                bg: "shuzhaibeijingtu",
                title: LanDef.guild_tips8,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBook, MdrTabBtnType.TabBtnType01]
            },
        ];

    }
}