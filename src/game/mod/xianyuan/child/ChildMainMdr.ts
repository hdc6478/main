namespace game.mod.xianyuan {

    export class ChildMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianlvChildMainBtnType.Gongxiang,
                icon: "gongxiangbiaoqiantubiao",
                mdr: ChildMdr,
                title: "xianlv_tips24",
                bg: "xianlv_beijingtu2",
                openIdx: 0,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Gongxiang]
            },
            {
                btnType: XianlvChildMainBtnType.Shengxing,
                icon: "xianlvshengxingbiaoqiantubiao",
                mdr: ChildUpStarMainMdr,
                title: "xianlv_tips24",
                bg: "xianlv_beijingtu4",
                openIdx: 0,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing]
            },
            {
                btnType: XianlvChildMainBtnType.Shenbing,
                icon: "shenbingbiaoqiantubiao",
                mdr: ChildShenbingMainMdr,
                title: "xianlv_tips24",
                bg: "xianlv_beijingtu4",
                openIdx: 0,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shenbing]
            },
            {
                btnType: XianlvChildMainBtnType.Lingyi,
                icon: "yuyibiaoqiantubiao",
                mdr: ChildLingyiMainMdr,
                title: "xianlv_tips24",
                bg: "xianlv_beijingtu4",
                openIdx: 0,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Lingyi]
            }

        ];
    }

}