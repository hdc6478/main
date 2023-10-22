namespace game.mod {

    import ShopConfig = game.config.ShopConfig;

    export class IconShop extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public btn: game.mod.Btn;
        public lab_name: eui.Label;
        public lab_limit: eui.Label;
        public img_bought: eui.Image;

        /**[消耗道具id, 消耗数量]*/
        protected _cost: number[];
        data: ShopConfig;

        constructor() {
            super();
            this.skinName = `skins.common.IconShopSkin`;
            this.touchEnabled = false;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClickBuy, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let ary = cfg.prop[0];
            let prop = PropData.create(ary[0], ary[1]);
            if (!prop) {
                DEBUG && console.log(`PropData error: `, ary[0]);
                return;
            }
            this.icon.setData(prop);
            this.lab_name.textFlow = prop.getPropName();
            this.updateLmtLab();
            this.updateCostBtn();
        }

        /**
         * 更新限购次数label
         * @param left_cnt 剩余次数 默认0
         * @param total_cnt 总共次数 默认：商店表的限购次数lmt_cnt
         * @param str 限购文本，默认：限购
         */
        protected updateLmtLab(left_cnt: number = 0, total_cnt?: number, str?: string): void {
            if (total_cnt == null) {
                total_cnt = this.data.lmt_cnt;
            }
            if (str == null) {
                str = '限购';
            }
            let txt = TextUtil.addColor(`${left_cnt}/${total_cnt}`, left_cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_limit.textFlow = TextUtil.parseHtml(str + txt);

            this.img_bought.visible = left_cnt <= 0;
            this.btn.visible = !this.img_bought.visible;
        }

        /**
         * 按钮购买消耗
         * @param cost 购买消耗，不传则默认商店表的 price * discount / 10000
         * @protected
         */
        protected updateCostBtn(cost?: number[]): void {
            if (cost && cost.length) {
                this._cost = cost;
            } else {
                let cfg = this.data;
                let cost_cnt: number;
                if (cfg.discount) {
                    cost_cnt = Math.floor(cfg.price * cfg.discount / 10000);
                } else {
                    cost_cnt = cfg.price;
                }
                this._cost = [cfg.coin_type, cost_cnt];
            }
            this.btn.setCost(this._cost);
        }

        /**
         * 能否购买，只判断购买消耗
         */
        protected canBuy(): boolean {
            if (!this._cost || !BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                return false;
            }
            return true;
        }

        /**
         * 点击购买，子类重载实现
         */
        protected onClickBuy(): void {

        }
    }
}