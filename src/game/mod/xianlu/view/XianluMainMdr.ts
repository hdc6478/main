namespace game.mod.xianlu {

    import LanDef = game.localization.LanDef;

    export class XianluMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianluMainBtnType.Xiuxian,
                icon: "xiuxian_tab",
                mdr: XiuxianMdr,
                title: LanDef.xiuxian_tips,
                bg: "p1_xiuxian_bg",
                openIdx: OpenIdx.Xiuxian,
                hintTypes: [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiuxian],
            },
            {
                btnType: XianluMainBtnType.Xiandan,
                icon: "xiandan_tab",
                mdr: XiandanMdr,
                title: LanDef.xiandan_tips,
                bg: "p1_xiandan_bg",
                openIdx: OpenIdx.Xiandan,
                hintTypes: [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiandan],
            },
            {
                btnType: XianluMainBtnType.Lingchi,
                icon: "lingchi_tab",
                mdr: LingchiMdr,
                title: LanDef.lingchi_tips,
                bg: "p1_lingchi_bg",
                openIdx: OpenIdx.Lingchi,
                hintTypes: [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingchi],
            },
            {
                btnType: XianluMainBtnType.Lingmai,
                icon: "lingmai_tab",
                mdr: LingmaiMdr,
                title: LanDef.lingmai_tips,
                bg: "p1_lingmai_bg",
                openIdx: OpenIdx.Lingmai,
                hintTypes: [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Lingmai],
            },
            {
                btnType: XianluMainBtnType.Linggen,
                icon: "linggen_tab",
                mdr: LinggenMdr,
                title: LanDef.linggen_tips,
                bg: "p1_linggen_bg",
                openIdx: OpenIdx.Linggen,
                hintTypes: [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Linggen],
            }
        ];
    }
}