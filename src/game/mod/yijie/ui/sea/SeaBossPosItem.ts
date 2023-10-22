namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class SeaBossPosItem extends BaseListenerRenderer {
        public lab_index: eui.Label;
        public btn_reward: game.mod.Btn;

        public data: number;//boss索引

        protected onAddToStage(): void {
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_reward, this.onClick, this);
            super.onAddToStage();
        }

        protected dataChanged() {
            if (!this.data) {
                return;
            }
            let bossIndex = this.data;
            let proxy: SeaProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Sea);
            let curIndex = proxy.getBossIndex(proxy.type);
            let isPass = curIndex > bossIndex;
            let isCur = curIndex == bossIndex;
            this.currentState = isCur ? "cur" : (isPass ? "pass" : "lock");
            this.lab_index.text = bossIndex + "";
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            let bossIndex = this.data;
            let proxy: SeaProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Sea);
            let cfg = proxy.getBossCfg(proxy.type, bossIndex);
            let tipsStr = TextUtil.addColor(StringUtil.substitute(getLanById(LanDef.sea_tips12), [bossIndex]), WhiteColor.YELLOW);
            ViewMgr.getIns().showRewardTips(
                "",
                cfg.show_reward,
                RewardStatus.NotFinish,
               null,
                tipsStr);
        }

    }
}