namespace game.mod {

    import ShopConfig = game.config.ShopConfig;
    import DirectShopConfig = game.config.DirectShopConfig;

    export class StoreUtil {
        private static _storeMap: { [type: number]: ShopConfig[] } = {};

        /**
         * 根据类型获取对应的商店数据
         * @param type
         */
        public static getStoreCfgListByType(type: StoreType): ShopConfig[] {
            if (this._storeMap[type]) {
                return this._storeMap[type];
            }
            this._storeMap = {};
            let cfgs: ShopConfig[] = getConfigListByName(ConfigName.Store);
            for (let cfg of cfgs) {
                if (!cfg) {
                    continue;
                }
                if (!this._storeMap[cfg.type]) {
                    this._storeMap[cfg.type] = [];
                }
                this._storeMap[cfg.type].push(cfg);
            }
            return this._storeMap[type];
        }

        /**
         * 商品是否展示
         * @param cfg
         */
        public static checkStoreCfgShow(cfg: ShopConfig): boolean {
            if (!cfg) {
                return false;
            }
            //转生
            if (cfg.unlock_type == StoreUnlockType.Rebirth) {
                let relv = RoleUtil.getRebirthLv();
                if (relv < cfg.unlock) {
                    return false;
                }
            }
            //vip
            if (cfg.unlock_type == StoreUnlockType.Vip) {
                let vip = RoleVo.ins.vip_lv || 0;
                if (cfg.unlock > vip) {
                    return false;
                }
            }
            return true;
        }

        private static _directShopMap: { [type: number]: DirectShopConfig[] } = {};

        /**
         * 获取 direct_shop 配置
         * @param type DirectShopType
         */
        public static getDirectShopCfgListByType(type: DirectShopType): DirectShopConfig[] {
            if (this._directShopMap[type]) {
                return this._directShopMap[type];
            }
            this._directShopMap = {};
            let obj = getConfigByName(ConfigName.DirectShop);
            for (let key in obj) {
                if (!this._directShopMap[+key]) {
                    this._directShopMap[+key] = [];
                }
                for (let id in obj[key]) {
                    this._directShopMap[+key].push(obj[key][id]);
                }
                this._directShopMap[+key].sort((a, b) => {
                    return a.sort - b.sort;
                });
            }
            return this._directShopMap[type];
        }

        /**兑换信息请求 */
        public static c2s_exchange_shop_info(shop_type: number): void {
            let proxy: IExchangeShopProxy = getProxy(ModName.Activity, ProxyType.ExchangeShop);
            proxy.c2s_exchange_shop_info(shop_type);
        }

        public static c2s_exchange_shop_buy_prop(index: number, shop_type: number, buy_cnt: number): void {
            let proxy: IExchangeShopProxy = getProxy(ModName.Activity, ProxyType.ExchangeShop);
            proxy.c2s_exchange_shop_buy_prop(index, buy_cnt, shop_type);
        }

        public static getInfoByTypeIndex(index: number, shop_type?: number): msg.treasure_house_info | msg.daolv_house_info {
            let proxy: IExchangeShopProxy = getProxy(ModName.Activity, ProxyType.ExchangeShop);
            return proxy.getInfoByTypeIndex(index, shop_type);
        }
    }
}