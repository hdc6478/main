namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionBeastRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongpaimingbiaoqiantubiao",
                mdr: UnionBeastRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, UnionMainType.UnionBeastRank, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "personal_rank_",
                mdr: UnionBeastRank2Mdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, UnionMainType.UnionBeastRank, MdrTabBtnType.TabBtnType02]
            }
        ];
        private _proxy: UnionProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.open_fun = UnionMainType.UnionBeast;
        }
    }
}