namespace game.mod.more {

    export class HuangguMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HuangguMainBtnType.Huanggu,
                icon: "huanggu_tab",
                mdr: HuangguMdr,
                bg: "huanggu_bg",
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu],
            },
            {
                btnType: HuangguMainBtnType.Hundun,
                icon: "hundun_tab",
                mdr: HundunMdr,
                bg: "hundun_bg",
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun],
            }
        ];

    }
}