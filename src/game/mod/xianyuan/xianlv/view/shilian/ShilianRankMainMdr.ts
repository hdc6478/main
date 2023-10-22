namespace game.mod.xianyuan {

    export class ShilianRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "ui_tab_rank_",
                mdr: ShilianRankMdr,
                title: "pass_rank",
                bg: "pass_rank_bg",
                openIdx: 0,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.ShilianRank, MdrTabBtnType.TabBtnType01]
            }
        ];
    }

}