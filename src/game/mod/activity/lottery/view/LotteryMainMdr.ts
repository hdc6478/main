namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class LottertMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: LotteryViewType.Main,
                icon: "icon_lottery",
                mdr: LotteryMdr,
                title: LanDef.zhanlizhuanpan,
                hintTypes: [ModName.Activity, MainActivityViewType.Lottery],
            }
        ];
    }
}