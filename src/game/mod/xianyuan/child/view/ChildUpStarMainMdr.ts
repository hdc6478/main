namespace game.mod.xianyuan {

    export class ChildUpStarMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "child_tab1",
                mdr: ChildUpStarMdr,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "child_tab2",
                mdr: ChildUpStarMdr2,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "child_tab3",
                mdr: ChildUpStarMdr3,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType03]
            },
            {
                btnType: MdrTabBtnType.TabBtnType04,
                icon: "child_tab4",
                mdr: ChildUpStarMdr4,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType04]
            }

        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}