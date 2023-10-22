namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class TongtiangeMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: TongtiangeMainBtnType.TtgBtn1,
                icon: "tongtiangebiaoqiantubiao",
                mdr: TongtiangeMdr1,
                title: LanDef.tongtiange_tips2,
                bg: "tongtiange_bg1",
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn1]
            },
            {
                btnType: TongtiangeMainBtnType.TtgBtn2,
                icon: "gerentiaozhanbiaoqiantubiao",
                mdr: TongtiangeMdr2,
                title: LanDef.tongtiange_tips22,
                bg: "",
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn2]
            },
            {
                btnType: TongtiangeMainBtnType.TtgBtn3,
                icon: "xianzongtiaozhanbiaoqiantubiao",
                mdr: TongtiangeMdr3,
                title: LanDef.tongtiange_tips23,
                bg: "",
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn3]
            },
            {
                btnType: TongtiangeMainBtnType.TtgBtn4,
                icon: "libaobiaoqiantubiao",
                mdr: TongtiangeMdr4,
                title: LanDef.tongtiange_tips24,
                bg: "tongtiange_bg4",
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn4]
            },
            {
                btnType: TongtiangeMainBtnType.TtgBtn5,
                icon: "duihuanbiaoqiantubiao",
                mdr: TongtiangeMdr5,
                title: LanDef.tongtiange_tips25,
                bg: "tongtiange_bg5",
                coinIndex0: PropIndex.Tianxingzhu,
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn5]
            },
            {
                btnType: TongtiangeMainBtnType.TtgBtn6,
                icon: "tongtiangedenglujianglibiaoqiantubiao",
                mdr: TongtiangeMdr6,
                title: LanDef.tongtiange_tips26,
                bg: "",
                hintTypes: [ModName.Activity, MainActivityViewType.TongtiangeMain, TongtiangeMainBtnType.TtgBtn6]
            }
        ];

        private _proxy: TongtiangeProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityClose, this);
        }

        protected onTabChanged() {
            super.onTabChanged();
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            if (data && data.btnType == TongtiangeMainBtnType.TtgBtn4 && this._proxy.giftLoginHint) {
                this._proxy.giftLoginHint = false;
                this._proxy.updateHint4();
            }
        }

        //活动关闭
        private onActivityClose(n: GameNT) {
            let actId: number = n.body;
            let curActId = this._proxy.getActId();
            let curActId1 = this._proxy.getActId(true);
            if ((curActId && curActId == actId) || (curActId1 && curActId1 == actId)) {
                ViewMgr.getIns().showMain();
            }
        }
    }

}