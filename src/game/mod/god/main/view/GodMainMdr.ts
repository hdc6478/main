namespace game.mod.god {


    import LanDef = game.localization.LanDef;

    export class GodMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'xiuxianzhilubiaoqiantubiao',
                mdr: GodRoadMdr,
                title: LanDef.xunxianzhilu_tips,
                bg: "tiandilubeijingtu2",
                hintTypes: [ModName.God, GodViewType.GodMain, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                title: LanDef.tiandilu_tips,
                icon: 'tiandilubiaoqiantubiao',
                mdr: GodListMdr,
                bg: "tiandilubeijingtu3",
                hintTypes: [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain]
            }
        ];

    }
}