namespace game.mod.yishou {

    import LanDef = game.localization.LanDef;

    export class YishouMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: YishouMainBtnType.Shougu,
                icon: "yishoubiaoqiantubiao",
                mdr: YishouShouguMdr,
                title: LanDef.yishou_tips5,
                bg: "yishou_bg",
                openIdx: 0,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shougu]
            },
            {
                btnType: YishouMainBtnType.Shouhun,
                icon: "shouhunbiaoqiantubiao",
                mdr: YishouShouhunMdr,
                title: LanDef.yishou_tips6,
                bg: "yishou_bg",
                openIdx: 0,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouhun]
            },
            {
                btnType: YishouMainBtnType.Shouling,
                icon: "shoulingbiaoqiantubiao",
                mdr: YishouShoulingSecondMainMdr,
                title: LanDef.yishou_tips7,
                bg: "yishou_bg",
                openIdx: 0,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouling]
            },
            {
                btnType: YishouMainBtnType.Shouyin,
                icon: "shouyinbiaoqiantubiao",
                mdr: YishouShouyinSecondMainMdr,
                title: LanDef.yishou_tips8,
                bg: "yishou_bg",
                openIdx: 0,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin]
            }
        ];
    }

}