namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiLevelSecondMainMdr extends WndSecondMainMdr {
        protected _height: number = 1060;//secondPop默认高度
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhanduitubiao1",
                mdr: ZhanduiConstructMdr,
                title: LanDef.zhandui_tips5,
                bg: "",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "zhanduitubiao2",
                mdr: ZhanduiFlagMdr,
                title: LanDef.zhandui_tips5,
                bg: ""
            }
        ];

        protected addListeners() {
            super.addListeners();
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }
    }

}