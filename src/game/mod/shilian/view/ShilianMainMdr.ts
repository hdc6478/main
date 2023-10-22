namespace game.mod.shilian {

    import LanDef = game.localization.LanDef;

    export class ShilianMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: ShilianMainBtnType.Fuben,
                icon: "fuben_tab",
                mdr: FubenMdr,
                hintTypes: [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben],
            },
            {
                btnType: ShilianMainBtnType.Forbidden,
                icon: "forbidden_tab",
                title: LanDef.forbidden,
                mdr: ForbiddenMdr,
                openIdx: OpenIdx.Forbidden,
                hintTypes: [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Forbidden],
            },
            {
                btnType: ShilianMainBtnType.Xianta,
                icon: "xianta_tab",
                mdr: XiantaMdr,
                openIdx: OpenIdx.Xianta,
                hintTypes: [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta],
            },
            {
                btnType: ShilianMainBtnType.YuanLing,
                icon: "yuanlingshilian_tab",
                mdr: YuanLingMdr,
                openIdx: OpenIdx.Yuanling,
                bg: 'yuanlingshilian_bg',
                title: LanDef.yuanling_tips1,
                hintTypes: [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.YuanLing],
            },
        ];

    }
}