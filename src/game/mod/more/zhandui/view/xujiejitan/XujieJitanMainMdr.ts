namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieJitanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XujieJitanMainBtnType.Btn1,
                icon: "xujiejitanbiaoqiantubiao",
                mdr: XujieJitanMdr,
                title: LanDef.xujiejitan_tips1,
                bg: "xujiejitan_bg",
                coinIndex2: PropIndex.XujieJitanJiasu,
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn1]
            },
            {
                btnType: XujieJitanMainBtnType.Btn2,
                icon: "xujielingbaobiaoqiantubiao",
                mdr: XujieJitanLingbaoSecondMainMdr, // XujieLingbaoMdr todo 应策划需求，不用通用的图鉴界面，因为有些差异
                title: LanDef.xujiejitan_tips2,
                bg: "",
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn2]
            }
        ];
    }

}