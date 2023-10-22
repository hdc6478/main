namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XiandiHouseMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xiandigong",
                mdr: XiandiHouseMdr,
                bg: 'xiandigong_bg',
                title: LanDef.xiandi_tips5,
                hintTypes: []
            },
        ];

    }
}