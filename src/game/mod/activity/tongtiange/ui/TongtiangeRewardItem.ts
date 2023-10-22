namespace game.mod.activity {

    import AtticExchangeConfig = game.config.AtticExchangeConfig;
    import LanDef = game.localization.LanDef;

    export class TongtiangeRewardItem extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public lb_limit: eui.Label;
        public img_bought: eui.Image;
        public btn_do: game.mod.Btn;

        data: ITongtiangeRewardItemData;
        private _proxy: TongtiangeProxy;
        private _cost: number[];

        constructor() {
            super();
            this.skinName = `skins.activity.TongtiangeRewardItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let pos = this.itemIndex;
            this.icon.data = data.cfg.give_items[pos];
            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn_do.visible = !this.img_bought.visible;
            if (this.btn_do.visible) {
                this._cost = data.cfg.cost_items[pos];
                this.btn_do.setCost(this._cost);
                this.btn_do.setHint(BagUtil.checkPropCnt(this._cost[0], this._cost[1]));
            }
            if (data.boughtCnt >= data.maxCnt) {
                this.lb_limit.text = '';
            } else {
                this.lb_limit.text = getLanById(LanDef.tongtiange_tips8) + `${data.maxCnt - data.boughtCnt}/${data.maxCnt}`;
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let index = data.cfg.index;
            if (index > 1 && !this._proxy.canExchange(index, true)) {
                return;
            }
            if (!this._cost || !BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_attic_exchange(index, this.itemIndex + 1);
        }
    }

    export interface ITongtiangeRewardItemData {
        cfg: AtticExchangeConfig;
        status: RewardStatus;
        maxCnt: number;//最大购买次数
        boughtCnt: number;//已购买次数
    }
}