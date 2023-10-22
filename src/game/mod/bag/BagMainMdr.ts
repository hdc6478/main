namespace game.mod.bag {

    import LanDef = game.localization.LanDef;

    export class BagMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: BagMainBtnType.Bag,
                icon: "bag_tab",
                mdr: BagMdr,
                title: LanDef.bag_tips,
                bg: "",
                openIdx: OpenIdx.Bag,
                hintTypes: [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Bag],
            },
            {
                btnType: BagMainBtnType.Equip,
                icon: "equip_tab",
                mdr: BagEquipMdr,
                title: LanDef.equipment_tips,
                bg: "",
                openIdx: OpenIdx.BagEquip,
            },
            {
                btnType: BagMainBtnType.Melt,
                icon: "melt_tab",
                mdr: BagMeltMdr,
                title: LanDef.ronglian_tips,
                bg: "p1_melt_bg",
                openIdx: OpenIdx.BagMelt,
                hintTypes: [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Melt],
            },
            {
                btnType: BagMainBtnType.Compose,
                icon: "compose_tab",
                mdr: BagComposeMdr,
                title: LanDef.compound_tips1,
                bg: "p1_compose_bg",
                openIdx: OpenIdx.BagCompose,
                hintTypes: [ModName.Bag, BagViewType.BagMain + BagMainBtnType.Compose],
            },
            {
                btnType: BagMainBtnType.Del,
                icon: "del_tab",
                mdr: BagDelMdr,
                title: LanDef.fenjie_tips,
                bg: "p1_del_bg",
                openIdx: OpenIdx.BagDel,
            }
        ];
    }
}