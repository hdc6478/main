namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class RingMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianlvRingMainBtnType.Yuanjie,
                icon: "xianjiebiaoqiantubiao",
                mdr: RingMdr,
                title: LanDef.ring_tips1,
                bg: "xianlv_beijingtu4",
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain, XianlvRingMainBtnType.Yuanjie]
            },
            {
                btnType: XianlvRingMainBtnType.Huanhua,
                icon: "huanhuabiaoqiantubiao",
                mdr: RingHuanhuaMainMdr,
                title: LanDef.ring_tips1,
                bg: "xianlv_beijingtu4",
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain, XianlvRingMainBtnType.Huanhua]
            }
        ];
    }

}