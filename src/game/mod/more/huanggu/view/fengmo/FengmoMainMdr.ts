namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class FengmoMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongfengmobiaotiantubiao",
                mdr: FengmoMdr,
                bg: 'fengmo_bg1',
                title: LanDef.xianzong_tips11,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo]
            },
        ];

    }
}