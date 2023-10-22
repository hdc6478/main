namespace game.mod.more {


    import NvshenChoujiangConfig = game.config.NvshenChoujiangConfig;
    import facade = base.facade;

    export class TimeGoddessSummonItem extends eui.ItemRenderer {

        public img_icon: eui.Image;
        public img_sel: eui.Image;
        private redPoint: eui.Image;
        private coinItem: CoinItem;

        public data: NvshenChoujiangConfig;

        protected dataChanged(): void {
            let data = this.data;
            if(!data){
                return;
            }
            this.img_icon.source = "sl_type_" + data.index;
            this.coinItem.initIcon(PropIndex.Chuangshinengliang, false);
            let curCnt = BagUtil.getPropCntByIdx(PropIndex.Chuangshinengliang);
            let costCnt = data.costs[0][1];
            let isEnough = curCnt >= costCnt;
            let cntStr = TextUtil.addColor(costCnt + "", isEnough ? BlackColor.GREEN : BlackColor.RED);
            this.coinItem.lab_cost.textFlow = TextUtil.parseHtml(cntStr);
            let proxy: GoddessRecordProxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            this.redPoint.visible = isEnough && proxy.isOpenSummon();
        }
    }

}