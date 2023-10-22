namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XianjieLuandouMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianjieLuandouMainBtnType.Btn1,
                icon: "xianjieluandoubiaoqiantubiao",
                mdr: XianjieLuandouMdr,
                title: LanDef.xianjieluandou_tips1,
                bg: "xianjieludou_bg",
                openIdx: OpenIdx.XianjieLuandou,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianjieLuandouMain, XianjieLuandouMainBtnType.Btn1]
            }
        ];
    }

}