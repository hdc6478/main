namespace game.mod.activity {

    import s2c_tianfu_giftbag_info = msg.s2c_tianfu_giftbag_info;
    import GameNT = base.GameNT;

    /**
     * @description 神灵天赋礼包
     */
    export class ShenlingGiftProxy extends ProxyBase implements IShenlingGiftProxy {
        /**当前已购买的礼包index*/
        private _index: number;
        //神灵天赋礼包红点
        private _giftHint = true;

        initialize(): void {
            super.initialize();
            this.onProto(s2c_tianfu_giftbag_info, this.s2c_tianfu_giftbag_info, this);
        }

        private s2c_tianfu_giftbag_info(n: GameNT): void {
            let msg = n.body as s2c_tianfu_giftbag_info;
            if (msg.index != null) {
                this._index = msg.index;
            }
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_SHENLING_GIFT_INFO_UPDATE);
        }

        private _productIdAry: number[];

        private getProductIdAry(): number[] {
            if (!this._productIdAry) {
                this._productIdAry = [];
                let cfgList = StoreUtil.getDirectShopCfgListByType(DirectShopType.ShenlingGift) || [];
                for (let cfg of cfgList) {
                    if (cfg && this._productIdAry.indexOf(cfg.product_id) < 0) {
                        this._productIdAry.push(cfg.product_id);
                    }
                }
            }
            return this._productIdAry;
        }

        //当前商品id
        public getProductId(): number {
            let ary = this.getProductIdAry();
            if (!this._index) {
                return ary[0];
            }
            let idx = ary.indexOf(this._index);
            if (ary[idx + 1]) {
                return ary[idx + 1];
            }
            return null;
        }

        //全购买完毕
        public isAllBought(): boolean {
            if (!this._index) {
                return false;
            }
            let ary = this.getProductIdAry();
            let len = ary ? ary.length : 0;
            return ary && this._index == ary[len - 1];
        }

        //能否开启
        public canOpen(): boolean {
            return ViewMgr.getIns().checkViewOpen(OpenIdx.Shenling)
                && ViewMgr.getIns().checkViewOpen(OpenIdx.ShenlingGift)
                && PayUtil.checkFirstCharge() && !this.isAllBought();
        }

        public checkOpen(): void {
            let canOpen = this.canOpen();
            BtnIconMgr.insChaozhilibao().updateOpen(BtnIconId.ShenlingGift, !!canOpen, null, true);
        }

        public get giftHint(): boolean {
            return this._giftHint;
        }

        public set giftHint(hint: boolean) {
            this._giftHint = hint;
        }
    }
}