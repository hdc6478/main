namespace game.mod.store {

    export class StoreMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: StoreMainBtnType.Btn1,
                icon: "cangbaogetubiao",
                mdr: StoreType1Mdr,
                title: "商城",
                bg: "shangcheng_bg",
                openIdx: OpenIdx.Store,
                hintTypes: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn1]
            },
            {
                btnType: StoreMainBtnType.Btn2,
                icon: "xianyushangchengtubiao",
                mdr: StoreType2Mdr,
                title: "商城",
                bg: "shangcheng_bg",
                openIdx: OpenIdx.StoreXianyu
            },
            {
                btnType: StoreMainBtnType.Btn3,
                icon: "meirishangchengtubiao",
                mdr: StoreType3Mdr,
                title: "商城",
                bg: "shangcheng_bg",
                openIdx: OpenIdx.StoreDaily,
                hintTypes: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn3]
            },
            {
                btnType: StoreMainBtnType.Btn4,
                icon: "meizhoushangchengtubiao",
                mdr: StoreType4Mdr,
                title: "商城",
                bg: "shangcheng_bg",
                openIdx: OpenIdx.StoreDaily,
                hintTypes: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn4]
            }
        ];
    }

}