namespace game.mod.store {

    export class StorePriceItem extends eui.Component {
        public img_price: eui.Image;
        public lb_price: eui.Label;
        public rect_del: eui.Rect;

        constructor() {
            super();
            this.skinName = "skins.store.StorePriceItemSkin";
        }

        /**
         * @param idx 消耗货币
         * @param price 价格
         * @param showDel 展示删除线，默认false
         */
        public updateView(idx: number, price: number, showDel = false): void {
            let cfg = GameConfig.getPropConfigById(idx);
            this.img_price.source = cfg.icon;
            this.lb_price.text = price + '';
            this.rect_del.visible = showDel;
            let txt = price + '';
            if (!showDel) {
                txt = TextUtil.addColor(txt, WhiteColor.GREEN);
            }
            this.lb_price.textFlow = TextUtil.parseHtml(txt);
        }
    }
}