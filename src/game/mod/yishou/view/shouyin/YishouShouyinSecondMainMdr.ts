namespace game.mod.yishou {

    export class YishouShouyinSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "fanjieshouyintubiao",
                mdr: YishouShouyinMdr,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "mojieshouyintubiao",
                mdr: YishouShouyinMdr2,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType02]
            },
            {
                icon: "xianjieshouyintubiao",
                btnType: MdrTabBtnType.TabBtnType03,
                mdr: YishouShouyinMdr3,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType03]
            }
        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}