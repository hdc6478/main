namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieJitanLingbaoSecondMainMdr extends WndSecondMdr {

        protected onInit() {
            super.onInit();
            this._view.img_bg.visible = false;
        }

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "jitantubiao",
                mdr: XujieJitanLingbaoMdr,
                title: LanDef.xujiejitan_tips2,
                bg: "",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn2, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "kuangmaitubiao",
                mdr: XujieJitanLingbaoMdr2,
                title: LanDef.xujiejitan_tips2,
                bg: "",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn2, MdrTabBtnType.TabBtnType02]
            }
        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}