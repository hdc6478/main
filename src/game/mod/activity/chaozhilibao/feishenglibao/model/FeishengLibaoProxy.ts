namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_feisheng_giftbag_info = msg.s2c_feisheng_giftbag_info;
    import DirectShopConfig = game.config.DirectShopConfig;

    /**
     * @description 飞升礼包系统（飞升悟空，绝版仙剑，至尊兽印）
     */
    export class FeishengLibaoProxy extends ProxyBase {
        private _openIdxAry: number[] = [OpenIdx.FeishengWukong, OpenIdx.JuebanXianjian, OpenIdx.ZhizunShouyin];
        private _btnIdAry: number[] = [BtnIconId.FeishengWukong, BtnIconId.JuebanXianjian, BtnIconId.ZhizunShouyin];
        private _indexs: number[];

        initialize(): void {
            super.initialize();
            this.onProto(s2c_feisheng_giftbag_info, this.s2c_feisheng_giftbag_info, this);
        }

        private s2c_feisheng_giftbag_info(n: GameNT): void {
            let msg = n.body as s2c_feisheng_giftbag_info;
            if (msg.index != null) {
                this._indexs = msg.index;
            }
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_UPDATE_FEISHENGLIBAO_INFO);
        }

        private checkOpen(): void {
            for (let i = 0; i < this._openIdxAry.length; i++) {
                let type = this._openIdxAry[i];
                let canOpen = this.canOpen(type);
                BtnIconMgr.insChaozhilibao().updateOpen(this._btnIdAry[i], canOpen, null, true);
            }
        }

        //能否开启
        private canOpen(openIdx: number): boolean {
            return ViewMgr.getIns().checkViewOpen(openIdx) && !this.isBought(openIdx);
        }

        //是否购买
        private isBought(openIdx: number): boolean {
            if (!this._indexs) {
                return false;
            }
            let productId = this.getProductId(openIdx);
            return this._indexs.indexOf(productId) > -1;
        }

        //商品id
        public getProductId(openIdx: number): number {
            let cfgs = StoreUtil.getDirectShopCfgListByType(DirectShopType.FeishengLibao);
            let cfg: DirectShopConfig = cfgs ? cfgs[this._openIdxAry.indexOf(openIdx)] : null;
            return cfg && cfg.product_id || 0;
        }

        //提升数值
        public getUpNumStr(openIdx: number): string {
            let cfgs = StoreUtil.getDirectShopCfgListByType(DirectShopType.FeishengLibao);
            let cfg: DirectShopConfig = cfgs ? cfgs[this._openIdxAry.indexOf(openIdx)] : null;
            return (cfg && cfg.param1 || 0) + '%';
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdxs = n.body as number[];
            for (let type of this._openIdxAry) {
                if (addIdxs.indexOf(type) > -1) {
                    this.checkOpen();
                    break;
                }
            }
        }

        //索引
        public getIdx(openIdx: number): number {
            return this._openIdxAry.indexOf(openIdx);
        }
    }
}