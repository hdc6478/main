namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XianweiMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xiandi_huanggutiangong",
                mdr: XianweiMdr,
                bg: '',
                title: LanDef.xiandi_tips1,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xianwei]
            },
        ];
    }
}