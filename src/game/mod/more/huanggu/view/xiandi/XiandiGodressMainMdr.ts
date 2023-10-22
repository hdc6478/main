namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XiandiGodressMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xiandi_huanggunvshen",
                mdr: XiandiGodressMdr,
                bg: 'xiandi_godress_bg',
                title: LanDef.xiandi_tips6,
                hintTypes: []
            },
        ];

    }
}