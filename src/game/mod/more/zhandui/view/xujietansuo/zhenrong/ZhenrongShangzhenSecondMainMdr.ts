namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhenrongShangzhenSecondMainMdr extends WndSecondMainMdr {
        protected _height: number = 1120;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "tubiao_shenlingshangzhen",
                mdr: ZhenrongShenlingMdr,
                title: getLanById(LanDef.general_tips) + getLanById(LanDef.shangzhen),
                bg: "",
                openIdx: 0,
                hintTypes: []
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "tubiao_huashenshangzhen",
                mdr: ZhenrongHuashenMdr,
                title: getLanById(LanDef.huashen_tips) + getLanById(LanDef.shangzhen),
                bg: "",
                openIdx: 0,
                hintTypes: []
            }/*,
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "tubiao_nvshenshangzhen",
                mdr: ZhenrongNvshenMdr,
                title: "女神上阵",
                bg: "",
                openIdx: 0,
                hintTypes: []
            }*/
        ];

        private _proxy: XujieTansuoProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if (data && data.btnType == MdrTabBtnType.TabBtnType03) {
                if (!this._proxy.isNvshenOpen(true)) {
                    return false;
                }
            } else if (data && data.btnType == MdrTabBtnType.TabBtnType02) {
                if (!this._proxy.isHuashenOpen(true)) {
                    return false;
                }
            }
            return true;
        }
    }

}