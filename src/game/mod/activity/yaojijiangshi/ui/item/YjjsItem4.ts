namespace game.mod.activity {

    import ShopConfig = game.config.ShopConfig;
    import Handler = base.Handler;

    export class YjjsItem4 extends IconShop {
        public icon: game.mod.Icon;
        public btn: game.mod.Btn;
        public lab_name: eui.Label;
        public lab_limit: eui.Label;
        public img_bought: eui.Image;

        data: ShopConfig;
        private _proxy: YjjsProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Yjjs);
        }

        protected dataChanged(): void {
            super.dataChanged();
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let left_cnt = this.getLeftCnt();
            this.updateLmtLab(left_cnt);
        }

        protected updateLmtLab(left_cnt?: number, total_cnt?: number, str?: string) {
            super.updateLmtLab(left_cnt, total_cnt, str);

            this.lab_limit.visible = !this.img_bought.visible;
        }

        private getLeftCnt(): number {
            let info = this._proxy.getStoreInfo(this.data.index);
            let bought_cnt = info ? info.count : 0;
            return this.data.lmt_cnt - bought_cnt;
        }

        protected onClickBuy() {
            ViewMgr.getIns().openStoreBuyTips(this.data.index,
                this.getLeftCnt(),
                Handler.alloc(this._proxy, this._proxy.c2s_yaoji_buy, [3, this.data.index]));
        }
    }
}