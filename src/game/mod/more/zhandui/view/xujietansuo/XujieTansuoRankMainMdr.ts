namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieTansuoRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "ui_tab_rank_",
                mdr: XujieTansuoRankMdr,
                title: LanDef.pass_rank,
                bg: "xujietansuo_rank_bg"
            }
        ];
    }

}