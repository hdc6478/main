namespace game.mod.friend {

    import FriendGiftConfig = game.config.FriendGiftConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class FriendGiftItem extends eui.ItemRenderer {
        public icon: game.mod.Icon;
        public lab_name: eui.Label;
        public lab_cnt: eui.Label;
        public item1: CoinItem;
        public lab_value: eui.Label;
        public redPoint: eui.Image;

        public data: FriendGiftConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            this.icon.setData(index);
            this.lab_name.textFlow = this.icon.getPropName();

            let giveItem = this.data.give_item;
            this.item1.initIcon(giveItem[0]);
            this.item1.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor("+" + giveItem[1], WhiteColor.GREEN));

            this.lab_value.textFlow = TextUtil.parseHtml(TextUtil.addColor("+" + this.data.value, WhiteColor.GREEN));

            let cnt = BagUtil.getPropCntByIdx(index);
            let cntStr = getLanById(LanDef.have) + "：" + TextUtil.addColor(cnt + "", cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            let _proxy: FriendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
            this.redPoint.visible = _proxy.getLeftGiftCnt() > 0 && cnt > 0;
        }

    }
}