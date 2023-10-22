namespace game.mod.xianyuan {

    export class RingHuanhuaMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianlv_second_tab_1",
                mdr: RingHuanhuaMdr,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain, XianlvRingMainBtnType.Huanhua, MdrTabBtnType.TabBtnType01]
            }
        ];

        protected onTabChanged() {
            super.onTabChanged();
            this.sendNt(MainEvent.UPDATE_WND_SECOND_MDR_TOP);
        }
    }

}