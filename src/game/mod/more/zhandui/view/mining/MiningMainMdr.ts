namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    /**虚空矿脉 */
    export class MiningMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                mdr: MiningMasterMdr,
                title: LanDef.zhanduishengxu_tips13,
                icon: "kuangnubiaoqiantubiao",
                bg: "",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.MiningMain, MdrTabBtnType.TabBtnType01],
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                mdr: MiningMdr,
                title: LanDef.zhanduishengxu_tips14,
                icon: "shengxubiaoqiantubiao",
                bg: "shengxubeijingtu",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.MiningMain, MdrTabBtnType.TabBtnType02],
            }
        ];

    }
}