namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionKillMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhanyaotai",
                mdr: UnionKillMdr,
                title: LanDef.union2_title_1,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill]
            }
        ];

    }
}