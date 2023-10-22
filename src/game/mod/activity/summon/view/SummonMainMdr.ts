namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class SummonMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SummonMainBtnType.Zhaohuan,
                icon: "zhaohuanbiaoqiantubiao",
                mdr: SummonMdr,
                title: LanDef.zhaohuan,
                bg: 'beijingtu_zhaohuan',
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan]
            },
            {
                btnType: SummonMainBtnType.Treasure,
                icon: "baozangbiaoqiantubiao",
                mdr: SummonTreasureMdr,
                title: LanDef.summon_treasure_tips1,
                openIdx: OpenIdx.SummonTreasure,
                bg: 'summon_treasure_bg',
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Treasure]
            },
            {
                btnType: SummonMainBtnType.Fuchenlinghu,
                icon: "fuchenlinghubiaoqiantubiao",
                mdr: FuchenlinghuMdr,
                title: LanDef.fuchenlinghu_tips1,
                bg: 'fuchenlinghu_bg',
                openIdx: OpenIdx.Fuchenlinghu,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu]
            },
            {
                btnType: SummonMainBtnType.Huanjingzengli,
                icon: "huanjingzenglibiaoqiantubiao",
                mdr: HuanjingZengliMdr,
                title: LanDef.fuchenlinghu_tips2,
                bg: '',
                openIdx: OpenIdx.Huanjingzengli,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Huanjingzengli]
            },
            {
                btnType: SummonMainBtnType.Huanjingbaozang,
                icon: "huanjingbaozangbiaoqiantubiao",
                mdr: HuanjingBaozangMdr,
                title: LanDef.fuchenlinghu_tips3,
                bg: '',
                openIdx: OpenIdx.Huanjingbaozang,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Huanjingbaozang]
            }
        ];

        protected onShow(): void {
            super.onShow();
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if (data && data.btnType == SummonMainBtnType.Fuchenlinghu) {
                let proxy: FuchenlinghuProxy = this.retProxy(ProxyType.Fuchenlinghu);
                if (!proxy.isOpenSea(SeaType.Sea1)) {
                    //处理仙界之海
                    let name = proxy.getSeaNameByType(SeaType.Sea1);
                    PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips17), [name]));
                    return false;
                }
            }
            return super.onTabCheck(index);
        }
    }
}