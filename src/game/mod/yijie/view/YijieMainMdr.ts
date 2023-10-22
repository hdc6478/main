namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;

    export class YijieMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: YijieMainBtnType.Yijie,
                icon: "yijie_tab",
                mdr: YijieMdr,
                title: LanDef.yijie,
                bg: "manyboss_bg",
                openIdx: OpenIdx.Yijie,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Yijie],
            },
            {
                btnType: YijieMainBtnType.YonghengYijie,
                icon: "yonghengyijie_tab",
                mdr: YonghengYijieMdr,
                title: LanDef.yonghengyijie,
                bg: "manyboss_bg",
                openIdx: OpenIdx.YonghengYijie,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.YonghengYijie],
            },
            {
                btnType: YijieMainBtnType.Sea,
                icon: "sea_tab",
                mdr: SeaMdr,
                title: LanDef.sea_tips,
                bg: "sea_bg",
                openIdx: OpenIdx.Sea,
                hintTypes: [ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea],
            }
        ];

    }
}