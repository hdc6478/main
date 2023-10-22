namespace game.mod.union {


    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class UnionInMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [];
        private _proxy: UnionProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
        }

        protected onShow(): void {
            this.onUpdateData();
            super.onShow();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(UnionEvent.ON_UPDATE_IN_UNION, this.onUpdateInUnion, this);
        }

        private onUpdateData(): void {
            if (this._proxy.isInUnion) {
                this._btnData = [
                    {
                        btnType: MdrTabBtnType.TabBtnType01,
                        icon: "xianzongbiaoqiantubiao",
                        mdr: UnionInMdr,
                        title: LanDef.union_title_2,
                        hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01]
                    },
                    {
                        btnType: MdrTabBtnType.TabBtnType02,
                        icon: "chengyuanbiaoqiantubiao",
                        mdr: UnionMemberMdr,
                        title: LanDef.union_title_4,
                        hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType02]
                    },
                    {
                        btnType: MdrTabBtnType.TabBtnType03,
                        icon: "paimingbiaoqiantubiao",
                        mdr: UnionListMdr,
                        title: LanDef.union_title_2,
                        hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType03]
                    }
                ]
            } else {
                this._btnData = [
                    {
                        btnType: MdrTabBtnType.TabBtnType04,
                        icon: "xianzongliebiaobiaoqiantubiao",
                        mdr: UnionListMdr,
                        title: LanDef.union_title_2,
                        hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType04]
                    },
                    {
                        btnType: MdrTabBtnType.TabBtnType05,
                        icon: "chuangjianxianzongbiaoqiantubiao",
                        mdr: UnionCreateMdr,
                        title: LanDef.union_title_7,
                        hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType05]
                    }
                ]
            }
        }

        private onUpdateInUnion(): void {
            if (this._tab) {
                this._tab.hide();
            }
            this.onUpdateData();
            this.updateBtnList();
            this.updateViewShow();
        }
    }
}