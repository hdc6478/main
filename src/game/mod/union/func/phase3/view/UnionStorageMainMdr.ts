namespace game.mod.union {

    import LanDef = game.localization.LanDef;

    export class UnionStorageMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongcangkubiaoqiantubiao",
                mdr: UnionStorageMdr,
                bg: "",
                title: LanDef.guild_tips6,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionStorage, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "xianzongpaimaibiaoqiantubiao",
                mdr: UnionAuctionMdr,
                bg: "",
                title: LanDef.guild_tips7,
                openIdx: OpenIdx.UnionAuction,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionStorage, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "xianzongbaokubiaoqiantubiao",
                mdr: UnionStoreMdr,
                bg: "beijingtu_duihuan",
                title: LanDef.guild_tips5,
                openIdx: OpenIdx.UnionStore,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionStorage, MdrTabBtnType.TabBtnType03]
            }
        ];

    }
}