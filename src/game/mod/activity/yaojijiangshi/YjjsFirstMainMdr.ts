namespace game.mod.activity {
    import LanDef = game.localization.LanDef

    export class YjjsFirstMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: YjjsMainBtnType.Btn1,
                icon: "yaojijiangshibiaoqiantubiao",
                mdr: YjjsFirstMdr,
                title: LanDef.yjjs_tips8,
                bg: "bg_yaojijiangshi",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.YjjsFirstMain, YjjsMainBtnType.Btn1]
            }
        ];
        
    }

}