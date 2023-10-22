namespace game.mod.activity {

    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import TiannvchargeWealConfig = game.config.TiannvchargeWealConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class TiannvWelfareRewardItem extends BaseListenerRenderer {
        private list_reward: eui.List;
        private img_status: eui.Image;
        private btn_draw: game.mod.Btn;

        private _rewardList: ArrayCollection;
        private _proxy: WonderfulActProxy;

        public data: TiannvchargeWealConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.WonderfulAct);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClickDraw, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data;
            this._rewardList.source = cfg.reward.concat().slice(0,3);

            let canDraw = this._proxy.canTiannvDraw(cfg);
            this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
            this.img_status.visible = !canDraw;
            if(this.img_status.visible){
                let hasDraw = this._proxy.hasDraw(TiannvWelfareOpType.Tiannv, cfg.index);
                this.img_status.source = hasDraw ? "lvseyilingqu" : "weidacheng";
            }
        }

        private onClickDraw(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data;
            ViewMgr.getIns().showConfirm(getLanById(LanDef.tiannv_welfare_tips3), Handler.alloc(this, () => {
                this._proxy.c2s_tired_charge_receive(TiannvWelfareOpType.Tiannv, cfg.index);
            }));
        }
    }
}