namespace game.mod.yishou {

    export class YishouShoulingSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "shoulingtitubiao",
                mdr: YishouShoulingMdr,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouling, MdrTabBtnType.TabBtnType01]
            }
        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}