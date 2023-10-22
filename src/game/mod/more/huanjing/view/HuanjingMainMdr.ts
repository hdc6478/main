namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class HuanjingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HuanjingMainBtnType.Btn1,
                icon: "huanjingbiaoqiantubiao",
                mdr: HuanjingEntranceMdr,
                title: LanDef.huanjing_tips6,
                bg: "huanjingguanggao",
                openIdx: OpenIdx.Huanjing,
                hintTypes: [ModName.More, MoreViewType.HuanjingMain, HuanjingMainBtnType.Btn1]
            }
        ];
    }

}