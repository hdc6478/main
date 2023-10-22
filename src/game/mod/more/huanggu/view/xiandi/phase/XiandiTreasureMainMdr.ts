namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XiandiTreasureMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xiandi_huanggutiangong",
                mdr: XiandiTreasureMdr,
                bg: 'xiandibaoge_bg',
                // title: LanDef.xiandi_tips2,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xiandi, MoreViewType.XiandiTreasure]
            },
        ];
    }
}