namespace game.mod.activity {

    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import LanDef = game.localization.LanDef;

    export class YjjsMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: YjjsMainBtnType.Btn1,
                icon: "sanshengxiulianbiaoqiantu",
                mdr: YjjsMdr1,
                title: LanDef.yjjs_tips1,
                bg: "bg_sanshengxiulian",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn1]
            },
            {
                btnType: YjjsMainBtnType.Btn2,
                icon: "sanshiweijibiaoqiantubiao",
                mdr: YjjsMdr2,
                title: LanDef.yjjs_tips2,
                bg: "bg_sanshiweiji",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn2]
            },
            {
                btnType: YjjsMainBtnType.Btn3,
                icon: "shenqixiuxingbiaoqiantubiao",
                mdr: YjjsMdr3,
                title: LanDef.yjjs_tips3,
                bg: "bg_sanshixiulian",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn3]
            },
            {
                btnType: YjjsMainBtnType.Btn4,
                icon: "yaojibaokubiaoqiantubiao",
                mdr: YjjsMdr4,
                title: LanDef.yjjs_tips4,
                bg: "bg_yaojibaoku",
                openIdx: 0,
                coinIndex0: PropIndex.Xianshenyu,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn4]
            },
            {
                btnType: YjjsMainBtnType.Btn5,
                icon: "chongzhilibaobiaoqiantubiao",
                mdr: YjjsMdr5,
                title: LanDef.yjjs_tips5,
                bg: "",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn5]
            },
            {
                btnType: YjjsMainBtnType.Btn6,
                icon: "mubiaohaolibiaoqiantubiao",
                mdr: YjjsMdr6,
                title: LanDef.yjjs_tips6,
                bg: "",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn6]
            },
            {
                btnType: YjjsMainBtnType.Btn7,
                icon: "yaojilingbiaoqiantubiao",
                mdr: YjjsMdr7,
                title: LanDef.yjjs_tips7,
                bg: "",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn7]
            }
        ];

        protected onShow() {
            super.onShow();
            let selIdx = this._tab.selectIndex;
            if (selIdx >= 4) {
                egret.callLater(() => {
                    let src = this._view.list_menu.parent as eui.Scroller;
                    ScrollUtil.moveHToAssign(src, selIdx, 120);
                }, this);
            }
        }

        protected onHide() {
            super.onHide();
            Tween.remove((this._view.list_menu.parent as eui.Scroller).viewport);
        }
    }

}