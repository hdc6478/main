namespace game.mod.xianyuan {

    export class ChildLingyiMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "child_lingyi_tab1",
                mdr: ChildLingyiMdr,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Lingyi, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "child_lingyi_tab2",
                mdr: ChildLingyiMdr2,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Lingyi, MdrTabBtnType.TabBtnType02]
            }
        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}