namespace game.mod.more {

    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class XiandiTreasureItem extends IconShop {

        protected dataChanged(): void {
            super.dataChanged();
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let left_cnt = this.getLeftCnt();
            this.updateLmtLab(left_cnt, this.data.lmt_cnt, `${getLanById(LanDef.store7)}:`);
        }

        private getLeftCnt(): number {
            let info: msg.treasure_house_info = StoreUtil.getInfoByTypeIndex(this.data.index, this.data.type) as msg.treasure_house_info;
            // let info = this._proxy.getStoreInfo(this.data.index);
            let bought_cnt = info ? info.bought_cnt : 0;
            return this.data.lmt_cnt - bought_cnt;
        }

        protected onClickBuy() {
            ViewMgr.getIns().openStoreBuyTips(this.data.index,
                this.getLeftCnt(),
                Handler.alloc(StoreUtil, StoreUtil.c2s_exchange_shop_buy_prop, [this.data.index, this.data.type]));
        }
    }
}