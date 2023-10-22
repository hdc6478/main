namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionShopMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzinmibaobiaoqiantubiao",
                bg: "beijingtu_duihuan",
                mdr: UnionXianZunShopMdr,
                title: LanDef.union_title_1,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, UnionMainType.UnionHeroShop],
            },

        ];

    }
}