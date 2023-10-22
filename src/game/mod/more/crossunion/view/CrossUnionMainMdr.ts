namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class CrossUnionMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "kuafuxianzongzhan",
                mdr: CrossUnionMdr,
                title: LanDef.kuafuxianzong_tips3,
                bg: "kuafuxianzongzhan2_bg",
                openIdx: OpenIdx.CrossUnion,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.CrossUnion]
            }
        ];
    }

}