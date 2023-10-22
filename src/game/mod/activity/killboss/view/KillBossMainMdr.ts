namespace game.mod.activity {


    import LanDef = game.localization.LanDef;

    export class KillBossMainMdr extends WndBaseMdr {
        private _proxy: KillBossProxy;

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.KillBoss);
            super.onInit();
        }

        protected onShow(): void {
            this._proxy.c2s_open_demon_reward();
            let types: number[] = this._proxy.getMapKeyList();
            if (types && types.length == 0) {
                console.error("检查配置列表");
                return;
            }
            this._btnData = [];
            for (let type of types) {
                this._btnData.push({
                    btnType: `0${type}`,
                    icon: `${type}zhuan`,
                    mdr: KillBossMdr,
                    title: LanDef.killboss_tips2,
                    bg:"killboss_bg",
                    hintTypes: [ModName.Activity, MainActivityViewType.KillBoss, `0${type}`],
                });
            }
            super.onShow();

            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, this._proxy.getInitTab());
        }

        protected onTabCheck(index: number): boolean {
            // let type: number = this._proxy.getTypeByIndex(index);
            // let open: number[] = this._proxy.getOpenByType(type);
            // return ViewMgr.getIns().checkBossOpen(open[0], open[1], true);
            this._proxy.tabIdx = index;
            return true;
        }

        protected onHide() {
            super.onHide();
        }
    }
}