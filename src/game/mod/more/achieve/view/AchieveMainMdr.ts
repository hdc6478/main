namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class AchieveMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: AchieveMainBtnType.Achieve,
                icon: "achieve_tab",
                mdr: AchieveMdr,
                title: LanDef.achieve_tips,
                bg: "achieve_bg",
                hintTypes: [ModName.More, MoreViewType.AchieveMain, AchieveMainBtnType.Achieve],
            },
            {
                btnType: AchieveMainBtnType.Honour,
                icon: "rongyaobiaoqiantubiao",
                mdr: HonourMdr,
                title: LanDef.honour_tips1,
                bg: "honour_bg",
                hintTypes: [ModName.More, MoreViewType.AchieveMain, AchieveMainBtnType.Honour],
            }
        ];

    }
}