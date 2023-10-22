namespace game.mod.activity {

    import HuanjingGiftConfig = game.config.HuanjingGiftConfig;

    export class HuanjingLibaoItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list: eui.List;
        public img_bought: eui.Image;
        public btn_buy: game.mod.Btn;
        public lb_cnt: eui.Label;

        data: IHuanjingLibaoItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: FuchenlinghuProxy;

        constructor() {
            super();
            this.skinName = 'skins.common.BaseGiftItemSkin3';
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
            this.img_bought.source = 'lvseyilingqu';
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.cfg) {
                return;
            }

            let cfg = data.cfg;
            this.lb_desc.textFlow = TextUtil.parseHtml(cfg.title);
            this.btn_buy.setHint(false);
            if (cfg.type == 1 && cfg.cost) {
                this._listData.replaceAll(cfg.reward2);
                this.btn_buy.setCost(cfg.cost);
                this.btn_buy.label = '';
                this.btn_buy.setHint(data.status == RewardStatus.Finish);
            } else if (cfg.type == 2 && cfg.product_id) {
                let rewards = PayUtil.getRewards(cfg.product_id);
                this._listData.replaceAll(rewards);
                this.btn_buy.resetCost();
                let rmb = PayUtil.getRmbValue(cfg.product_id);
                if (rmb == 0) {
                    this.btn_buy.label = '免费';
                    this.btn_buy.setHint(true);
                } else {
                    this.btn_buy.label = rmb + PayUtil.getRmbUnit();
                }
            }

            let isDraw = data.status == RewardStatus.Draw;
            this.img_bought.visible = isDraw;
            this.btn_buy.visible = !isDraw;
            this.lb_cnt.visible = !isDraw;
            if (this.lb_cnt.visible) {
                let leftCnt = Math.max(cfg.count - data.boughtCnt, 0);
                let cntStr = TextUtil.addColor(`${leftCnt}/${cfg.count}`, WhiteColor.GREEN);
                if (cfg.reset_type == 1) {
                    cntStr = '每日：' + cntStr;
                }
                this.lb_cnt.textFlow = TextUtil.parseHtml(cntStr);
            }
        }

        protected onClick() {
            let cfg = this.data.cfg;
            if (cfg.type == 1) {
                if (cfg.cost && BagUtil.checkPropCntUp(cfg.cost[0], cfg.cost[1])) {
                    this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper8, cfg.index);
                }
            } else if (cfg.type == 2) {
                PayUtil.pay(cfg.product_id);
            }
        }
    }

    export interface IHuanjingLibaoItemData {
        cfg: HuanjingGiftConfig;
        status: RewardStatus;
        boughtCnt: number;//已购买次数
    }
}