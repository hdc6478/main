namespace game.mod.xianyuan {

    export class XianlvMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianlvMainBtnType.Xianlv,
                icon: "xianlvbiaoqiantubiao",
                mdr: XianlvMdr,
                title: "xianlv_tips1",
                bg: "xianlv_beijingtu1",
                openIdx: OpenIdx.Xianlv,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv]
            },
            {
                btnType: XianlvMainBtnType.Renwu,
                icon: "renwubiaoqiantubiao",
                mdr: TaskMdr,
                title: "xianlv_tips2",
                bg: "",
                openIdx: OpenIdx.XianlvRenwu,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Renwu]
            },
            {
                btnType: XianlvMainBtnType.Shilian,
                icon: "shilianbiaoqiantubiao",
                mdr: ShilianMdr,
                title: "xianlv_tips3",
                bg: "",
                openIdx: OpenIdx.XianlvShilian,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Shilian]
            },
            {
                btnType: XianlvMainBtnType.Zhanchang,
                icon: "xianlvdoufa",
                mdr: XianlvDoufaMdr,
                title: "xianlv_tips4",
                bg: "xianlv_beijingtu7",
                openIdx: OpenIdx.XianlvZhanchang,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Zhanchang]
            }
        ];

        private _proxy: XianlvProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
        }

        protected onTabCheck(index: number): boolean {
            if (index == 2 || index == 3) {
                let txt = index == 2 ? '仙侣试炼' : '仙侣斗法';
                if (!this._proxy.isMarried()) {
                    PromptBox.getIns().show(`暂无伴侣无法参与${txt}`);
                    return false;
                }
            }
            return super.onTabCheck(index);
        }
    }

}