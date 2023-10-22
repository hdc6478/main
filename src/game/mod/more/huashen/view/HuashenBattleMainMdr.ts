namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class HuashenBattleMainMdr extends WndSecondMainMdr {
        protected _height: number = 1064;//secondPop默认高度
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "huashen_battle",
                mdr: HuashenBattleMdr,
                title: LanDef.huashen_battle_tips2,
                hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar, MoreViewType.HuashenBattleMain, MdrTabBtnType.TabBtnType01],
            }
        ];
    }
}