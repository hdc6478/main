namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionTreasureMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongyibao",
                mdr: UnionTreasureMdr,
                bg: "xianzongyibaobeijingtu",
                title: LanDef.union2_title_2,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure]
            }
        ];

    }
}