namespace game.mod.union {

    import LanDef = game.localization.LanDef;

    export class UnionBeastMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianshouzhufubiaoqiantubiao",
                mdr: UnionBeastMdr,
                bg: "xianshoubeijingtu",
                title: LanDef.guild_tips3,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast]
            },
        ];

    }
}