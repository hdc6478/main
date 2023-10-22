namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieJitanGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "shengjilibaobiaoqiantubiao",
                mdr: XujieJitanGiftMdr,
                title: LanDef.xujiejitan_tips6,
                bg: "",
                openIdx: 0,
                hintTypes: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, MoreViewType.XujieJitanGiftMain, MdrTabBtnType.TabBtnType01]
            }
        ];
    }

}