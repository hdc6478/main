namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XianmaiMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianmaizhengduo",
                mdr: XianmaiMdr,
                title: LanDef.xianmaizhengduo_tips1,
                bg: "xianmaizhengduo_bg",
                openIdx: 0,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianmaiMain, MdrTabBtnType.TabBtnType01]
            }
        ];

        protected addListeners() {
            super.addListeners();
            this.onNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE, this.onClickBack, this);
        }
    }

}