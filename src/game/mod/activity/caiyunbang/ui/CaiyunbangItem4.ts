namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class CaiyunbangItem4 extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public icon: game.mod.Icon;
        public lab_name: eui.Label;
        public lab_limit: eui.Label;
        public img_bought: eui.Image;
        public btn: game.mod.Btn;
        public img_tag: eui.Image;

        data: ICaiyunbangItemData;
        private _proxy: CaiyunbangProxy;
        private _bulkData: ShopBuyBulkData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Caiyunbang);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let reward = data.reward.rewards[0];
            this.icon.data = reward;
            let propCfg = GameConfig.getPropConfigById(reward.idx.toNumber());
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(TextUtil.truncateString(propCfg.name), ColorUtil.getColorByQuality1(propCfg.quality)));

            let limitCnt = data.reward.cond_2[0];
            let boughtCnt = this._proxy.getBoughtCnt(data.reward.index);
            this.img_bought.visible = boughtCnt >= limitCnt;
            this.lab_limit.visible = this.btn.visible = !this.img_bought.visible;

            if (this.lab_limit.visible) {
                this.lab_limit.textFlow = TextUtil.parseHtml(getLanById(LanDef.tongtiange_tips8)
                    + TextUtil.addColor(`${limitCnt - boughtCnt}/${limitCnt}`, WhiteColor.GREEN));
            }

            this._bulkData = null;
            if (this.btn.visible) {
                let costCnt = data.reward.cond_1[0];
                let costIdx = this._proxy.getExchangeCost();
                let cost = [costIdx, costCnt];
                this.btn.setCost(cost);
                this.btn.setHint(BagUtil.checkPropCnt(costIdx, costCnt));

                this._bulkData = {
                    prop: [reward.idx.toNumber(), reward.cnt],
                    cost: cost,
                    lmt_type: StoreLimitBuy.Limit,
                    lmt_cnt: limitCnt,
                    left_cnt: limitCnt - boughtCnt,
                    handler: Handler.alloc(this._proxy, this._proxy.c2s_activity_caiyun_duihuan, [data.reward.index])
                };
            }
        }

        private onClick(): void {
            if (this._bulkData) {
                ViewMgr.getIns().openBuyBulkTips(this._bulkData);
            }
        }
    }
}