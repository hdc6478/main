namespace game.mod.shenling {

    import LanDef = game.localization.LanDef;

    export class ShenLingMainMdr extends WndBaseMdr {
        protected _initBtnData: WndBaseViewData[] = [
            {
                btnType: ShenLingBtnType.Main,
                icon: "shenlingbiaoqiantubiao",
                mdr: ShenLingMdr,
                title: "general_tips",
                bg: "p1_shenlingbeijingtu",
                openIdx: 0,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Main]
            },
            {
                btnType: ShenLingBtnType.UpStar,
                icon: "shengxingbiaoqiantubiao",
                mdr: ShenLingUpStarMdr,
                title: "upstar",
                bg: "p1_shenlingbeijingtu",
                openIdx: 0,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.UpStar]
            },
            {
                btnType: ShenLingBtnType.Lingqi,
                icon: "shenqibiaoqiantubiao",
                mdr: ShenLingLingQiMdr,
                title: "lingqi_tips1",
                bg: "p1_shenlingbeijingtu",
                openIdx: 0,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingqi]
            },
            {
                btnType: ShenLingBtnType.Lingpo,
                icon: "lingpobiaoqiantubiao",
                mdr: ShenlingLingpoMdr,
                title: "lingpo_tips1",
                bg: "lingpo_bg",
                openIdx: 0,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingpo]
            },
            {
                btnType: ShenLingBtnType.Lingli,
                icon: "linglibiaoqiantubiao",
                mdr: ShenlingLingliMdr,
                title: "lingli_tips1",
                bg: "lingli_bg1",
                openIdx: 0,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingli]
            }

        ];

        private _proxy: ShenLingProxy;
        private _selIdx: number;
        private _isShowSpecialMdr = false;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
        }

        protected addListeners() {
            super.addListeners();
            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_TYPE, this.onUpdateMdr, this);
        }

        protected onShow() {
            super.onShow();
        }

        protected onHide() {
            super.onHide();
            this._selIdx = null;
        }

        private updateBtnData(): void {
            this._btnData = [];
            let typeAry = this._proxy.getActedTypeList();
            let isShowSpecialMdr = typeAry && typeAry.length > 0;
            for (let btnData of this._initBtnData) {
                if (btnData.btnType == ShenLingBtnType.Lingpo || btnData.btnType == ShenLingBtnType.Lingli) {
                    if (!isShowSpecialMdr) {
                        continue;
                    }
                    if (btnData.btnType == ShenLingBtnType.Lingli) {
                        btnData.bg = `lingli_bg${typeAry[0]}`;
                    }
                    this._btnData.push(btnData);
                    this._isShowSpecialMdr = true;
                } else {
                    this._btnData.push(btnData);
                }
            }
        }

        protected updateBtnList() {
            this.updateBtnData();
            super.updateBtnList();
        }

        protected updateViewShow() {
            //前两个页签，不支持传入。根据选中规则自行选中 2023.1.14
            let args = this._showArgs;
            let ary = [ShenLingBtnType.Main, ShenLingBtnType.UpStar];
            if (args && Array.isArray(args) && args.length == 1 && ary.indexOf(args[0]) < 0) {
                super.updateViewShow();
                return;
            }

            let selectedIdx = this._selIdx ? this._selIdx : this._proxy.getSelTab();
            this._tab.selectIndex = selectedIdx;
            this._selIdx = selectedIdx;
            this._tab.show();
        }

        protected onTabCheck(index: number): boolean {
            if (index == 0) {
                if (this.canClickFirstPage()) {
                    return true;
                }
                PromptBox.getIns().show(getLanById(LanDef.shenling_tips16));
                return false;
            }
            return super.onTabCheck(index);
        }

        private canClickFirstPage(): boolean {
            return this._proxy.haveShangzhen() || this._proxy.haveActType();
        }

        protected onTabChanged() {
            super.onTabChanged();
            this._selIdx = this._tab.selectIndex;
        }

        //激活上阵阵位后，展示灵魄灵力页签
        private onUpdateMdr(): void {
            if (this._isShowSpecialMdr) {
                return;
            }
            this.updateBtnList();
            this.updateViewShow();
            this.updateTabHint();
        }
    }

}