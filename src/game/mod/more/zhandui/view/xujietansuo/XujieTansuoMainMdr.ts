namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieTansuoMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XujieTansuoMainBtnType.Btn1,
                icon: "xujietansuo_tab",
                mdr: XujieTansuoMdr,
                title: LanDef.xujietansuo_tips1,
                bg: "xujietansuo_bg",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn1]
            },
            {
                btnType: XujieTansuoMainBtnType.Btn2,
                icon: "tab_5_giving",
                mdr: XujieTansuoMdr,//todo
                title: LanDef.xujietansuo_tips21,
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn2]
            }
        ];

        protected updateViewShow() {
            let type = this.getDefaultBtnType();
            if (this._showArgs) {
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                    this._tab.params = this._showArgs;
                } else {
                    type = this._showArgs;
                }
            }
            //从战令跳转回来，强制第一个页签
            if (type == XujieTansuoMainBtnType.Btn2) {
                type = XujieTansuoMainBtnType.Btn1;
            }
            this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
            this._tab.show();
        }

        protected onTabChanged() {
            super.onTabChanged();
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            if (data && data.btnType == XujieTansuoMainBtnType.Btn2) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.Giving, [MdrTabBtnType.TabBtnType05]);
            }
        }
    }

}