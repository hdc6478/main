namespace game.mod.main {
    import LanDef = game.localization.LanDef;

    export class RewardFindMainMdr extends WndBaseMdr {
        private _proxy: MainProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "reward_find_tab",
                mdr: RewardFindMdr,
                title: LanDef.reward_find_tips,
                hintTypes: [ModName.Main, MainViewType.RewardFindMain, MdrTabBtnType.TabBtnType01]
            }
        ];

        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.Main);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MainEvent.ON_REWARD_FIND_UPDATE, this.onInfoUpdate, this);
        }

        private onInfoUpdate(): void {
            let isShow = this._proxy.isFindShow();
            if(!isShow){
                ViewMgr.getIns().showMain();
            }
        }
    }
}