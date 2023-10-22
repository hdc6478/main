namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionWelfareMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "fulidatingbiaoqiantubiao",
                mdr: UnionWelfareMdr,
                title: LanDef.union_title_9,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionWelfare]
            }
        ];

    }
}