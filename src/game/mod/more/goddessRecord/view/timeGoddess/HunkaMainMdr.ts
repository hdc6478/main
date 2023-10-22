namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class HunkaMainMdr extends WndBaseMdr {
        private _proxy: GoddessRecordProxy;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "hunka_tab",
                mdr: HunkaSecondMdr,
                title: LanDef.hunka_tips,
                hintTypes: [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                    MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01],
            }
        ];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected onHide() {
            super.onHide();
            this._proxy.clearComposeList();//清除魂卡合成选中
        }

    }
}