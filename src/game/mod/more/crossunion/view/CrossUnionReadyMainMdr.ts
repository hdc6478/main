namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class CrossUnionReadyMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "kuafuxianzongzhan",
                mdr: CrossUnionReadyMdr,
                title: LanDef.kuafuxianzong_tips1,
                bg: "kuafuxianzongzhan3_bg",
                openIdx: OpenIdx.CrossUnion,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.CrossUnion]
            }
        ];
    }

}