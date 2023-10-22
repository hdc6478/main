namespace game.mod.activity {


    import c2s_exchange_shop_info = msg.c2s_exchange_shop_info;
    import c2s_exchange_shop_buy_prop = msg.c2s_exchange_shop_buy_prop;
    import c2s_exchange_shop_refresh_prop = msg.c2s_exchange_shop_refresh_prop;
    import s2c_exchange_shop_info = msg.s2c_exchange_shop_info;
    import GameNT = base.GameNT;
    import ShopConfig = game.config.ShopConfig;
    import treasure_house_info = msg.treasure_house_info;
    import c2s_daolv_house_info = msg.c2s_daolv_house_info;
    import c2s_daolv_house_buy_prop = msg.c2s_daolv_house_buy_prop;
    import s2c_daolv_house_info = msg.s2c_daolv_house_info;
    import daolv_house_info = msg.daolv_house_info;
    import DaolvShopConfig = game.config.DaolvShopConfig;
    import ParamConfig = game.config.ParamConfig;

    export class ExchangeShopProxy extends ProxyBase implements IExchangeShopProxy {
        private _model: ExchangeShopModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ExchangeShopModel();

            this.onProto(s2c_exchange_shop_info, this.s2c_exchange_shop_info, this);
            this.onProto(s2c_daolv_house_info, this.s2c_daolv_house_info, this);
        }

        /**--------------------协议start-------------------- */

        /**获取商品信息 */
        public c2s_exchange_shop_info(shop_type: number): void {
            let msg: c2s_exchange_shop_info = new c2s_exchange_shop_info();
            msg.shop_type = shop_type;
            this.sendProto(msg);
        }

        /**购买商店 */
        public c2s_exchange_shop_buy_prop(index: number, buy_cnt: number, shop_type: number = this.getTypeByIndex()): void {
            let msg: c2s_exchange_shop_buy_prop = new c2s_exchange_shop_buy_prop();
            msg.index = index;
            msg.buy_cnt = buy_cnt;
            msg.shop_type = shop_type;
            this.sendProto(msg);
        }

        /**刷新商店 */
        public c2s_exchange_shop_refresh_prop(shop_type: number): void {
            let msg: c2s_exchange_shop_refresh_prop = new c2s_exchange_shop_refresh_prop();
            msg.shop_type = shop_type;
            this.sendProto(msg);
        }

        /**特殊逻辑 道侣商店 */
        public c2s_daolv_house_info(): void {
            let msg: c2s_daolv_house_info = new c2s_daolv_house_info();
            this.sendProto(msg);
        }

        /**道侣商店购买商品 */
        public c2s_daolv_house_buy_prop(index: number, buy_cnt: number): void {
            let msg: c2s_daolv_house_buy_prop = new c2s_daolv_house_buy_prop();
            msg.index = index;
            msg.buy_cnt = buy_cnt;
            this.sendProto(msg);
        }

        /**返回道侣商品信息 */
        public s2c_daolv_house_info(n: GameNT): void {
            let msg: s2c_daolv_house_info = n.body;
            if (msg.infos) {
                this._model.daolvShopMap = {};
                for (let info of msg.infos) {
                    this._model.daolvShopMap[info.index] = info;
                }
            }
            this.onUpdateHintDaolv();
            this.sendNt(ActivityEvent.ON_UPDATE_EXCHANGE_SHOP_INFO);
        }

        /**返回商品信息 */
        private s2c_exchange_shop_info(n: GameNT): void {
            let msg: s2c_exchange_shop_info = n.body;
            if (msg && msg.infos) {
                for (let info of msg.infos) {
                    this._model.shopMap[info.shop_type] = info;
                }
            }
            this.onUpdateHint(msg.oper, msg.oper == 2 ? msg.infos[0].shop_type : 0);
            this.sendNt(ActivityEvent.ON_UPDATE_EXCHANGE_SHOP_INFO);
        }

        /**--------------------协议end-------------------- */

        public getShopList(type: number): ShopConfig[] {
            let info = this._model.shopMap[type];
            let list: ShopConfig[] = [];
            if (info && info.is_random) {
                if (type == ExchangeShopType.Type1) {
                    return this.getType1List(type);
                }
                return this.getShowCfgListByRandom(type);
            } else {
                let cfgArr: ShopConfig[] = getConfigListByName(ConfigName.Store);
                for (let cfg of cfgArr) {
                    if (!StoreUtil.checkStoreCfgShow(cfg)) {
                        continue;
                    }
                    if (cfg.type == type) {
                        list.push(cfg);
                    }
                }
            }
            return list;
        }

        public getSpecialList(): DaolvShopConfig[] {
            let list: DaolvShopConfig[] = [];
            for (let key in this._model.daolvShopMap) {
                let item = this._model.daolvShopMap[key];
                let cfg: DaolvShopConfig = getConfigByNameId(ConfigName.DaoLvShop, item.index);
                if (cfg) {
                    list.push(cfg);
                }
            }
            return list;
        }

        public getCfgListByType(type: number): ShopConfig[] {
            if (this._model.cfgMap[type]) {
                return this._model.cfgMap[type];
            }
            let cfgs: ShopConfig[] = getConfigListByName(ConfigName.Store);
            for (let cfg of cfgs) {
                if (!this._model.cfgMap[cfg.type]) {
                    this._model.cfgMap[cfg.type] = [];
                }
                this._model.cfgMap[cfg.type].push(cfg);
            }
            return this._model.cfgMap[type];
        }

        private getType1List(type: number): ShopConfig[] {
            let shopData = this._model.shopMap[type];
            let info: treasure_house_info[] = shopData.info;
            let list: ShopConfig[] = [];
            let sorts: number[] = [];
            for (let data of info) {
                let cfg: ShopConfig = getConfigByNameId(ConfigName.Store, data.index);
                list.push(cfg);
                sorts.push(cfg.sort);
            }
            let cfgs = this.getCfgListByType(type);
            for (let cfg of cfgs) {
                if (sorts.indexOf(cfg.sort) > -1) {
                    continue;
                }
                if (!StoreUtil.checkStoreCfgShow(cfg)) {
                    continue;
                }
                list.push(cfg);
                sorts.push(cfg.sort);
            }
            return list.sort((a, b) => {
                return a.sort - b.sort;
            });
        }

        /**随机配置 */
        public getShowCfgListByRandom(type: number): ShopConfig[] {
            let shopData = this._model.shopMap[type];
            let info: treasure_house_info[] = shopData.info;
            let sortNum: number[] = [];
            if (info) {
                for (let item of info) {
                    let cfg: ShopConfig = getConfigByNameId(ConfigName.Store, item.index);
                    if (cfg && sortNum.indexOf(cfg.sort) < 0) {
                        sortNum.push(cfg.sort);
                    }
                }
            }
            let rst: ShopConfig[] = [];
            let cfgs = this.getCfgListByType(type);
            let addSort: number[] = [];//已添加的排序
            cfgs.sort((a: ShopConfig, b: ShopConfig) => a.sort - b.sort);
            for (let cfg of cfgs) {
                if (!StoreUtil.checkStoreCfgShow(cfg)) {
                    continue;
                }
                //sort相同的只能存在一个
                if (sortNum.indexOf(cfg.sort) > -1 && !this.getInfoByTypeIndex(cfg.index)) {
                    continue;
                }
                if (addSort.indexOf(cfg.sort) > -1) {
                    continue;
                }
                addSort.push(cfg.sort);
                rst.push(cfg);
            }
            return rst;
        }

        /**获取单个商品的状态数据 */
        public getInfoByTypeIndex(index: number, type: number = this.getTypeByIndex()): treasure_house_info | daolv_house_info {
            if (type == ExchangeShopType.Type5) {
                return this._model.daolvShopMap[index];
            }
            let shopData = this._model.shopMap[type];
            if (!shopData) {
                return null;
            }
            let info: treasure_house_info[] = shopData.info;
            if (!info) {
                return null;
            }
            for (let item of info) {
                if (item.index == index) {
                    return item;
                }
            }
            return null;
        }

        /**刷新时间 */
        public getRefreshType(type: number): number {
            if (type == ExchangeShopType.Type5) {
                return 3;
            }
            let cfgArr: ShopConfig[] = this.getShopList(type);
            if (cfgArr && cfgArr.length > 0) {
                return cfgArr[0].lmt_type;
            }
            return 0;
        }

        /**获取商店类型 */
        public getTypeByIndex(): number {
            // return this._model.shopTypeList[index];
            return this._model.shopType;
        }

        /**获取刷新次数 */
        public getRefreshCount(type: number): number {
            let info = this._model.shopMap[type];
            if (info) {
                return info.refresh_cnt || 0;
            }
            return 0;
        }

        /**获取大奖道具 */
        public getBigReward(type: number): number {
            let id: string = this._model.paramIdMap[type];
            if (id && id != "") {
                let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, id);
                if (cfg) {
                    return cfg.value;
                }
            }
            return 0;
        }

        public getListType(): number[] {
            return this._model.shopTypeList;
        }

        // public get tabIdx(): number {
        //     return this._model.tabIdx;
        // }

        // public set tabIdx(val: number) {
        //     this._model.tabIdx = val;
        // }

        public get shopType(): number {
            return this._model.shopType;
        }

        public set shopType(val: number) {
            this._model.shopType = val;
        }

        /**获取标题id */
        public getTitleByType(type: number): string {
            return this._model.titleIdByType[type];
        }

        /**根据类型获取道具id */
        public getCoinIdByType(type: number): number {
            return this._model.getCoinIdByType[type];
        }

        /**根据类型获取功能开启id */
        public getOpenIdxByType(type: number): number {
            return this._model.getOpenIdxByType[type];
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            for (let key in this._model.typeByPropCoin) {
                if (keys.indexOf(PropIndexToKey[+key]) > -1 || keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                    let type: number = this._model.typeByPropCoin[key];
                    if (type == ExchangeShopType.Type5) {
                        this.onUpdateHintDaolv();
                    } else {
                        this.onUpdateHintByType(type);
                    }
                }
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            for (let key in this._model.typeByPropId) {
                if (indexs.indexOf(+key) > -1) {
                    let type: number = this._model.typeByPropId[key];
                    this.onUpdateHintByType(type);
                }
            }
        }

        private onUpdateHint(oper: number, type?: number): void {
            if (oper == 1) {
                let types: number[] = this.getListType();
                for (let tp of types) {
                    this.onUpdateHintByType(tp);
                }
            } else {
                this.onUpdateHintByType(type);
            }
        }

        //兑换红点
        public getHintByExchangeType(type: ExchangeShopType): boolean {
            let cfgArr: ShopConfig[] = this.getShopList(type);
            let bool: boolean = false;
            for (let cfg of cfgArr) {
                let info = this.getInfoByTypeIndex(cfg.index, type) as treasure_house_info;
                let bought_cnt = info ? info.bought_cnt : 0;//已购买次数
                let lmt_cnt = cfg.lmt_cnt;//限购次数
                let left_cnt = lmt_cnt - bought_cnt;//剩余购买次数
                bool = left_cnt > 0 && BagUtil.checkPropCnt(cfg.coin_type, cfg.price);
                if (bool) {
                    // HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${type}`]);
                    break;
                }
            }
            return bool;
        }

        private onUpdateHintByType(type: number): void {
            // let cfgArr: ShopConfig[] = this.getShopList(type);
            // let bool: boolean = false;
            // for (let cfg of cfgArr) {
            //     let info = this.getInfoByTypeIndex(cfg.index, type) as treasure_house_info;
            //     let bought_cnt = info ? info.bought_cnt : 0;//已购买次数
            //     let lmt_cnt = cfg.lmt_cnt;//限购次数
            //     let left_cnt = lmt_cnt - bought_cnt;//剩余购买次数
            //     bool = left_cnt > 0 && BagUtil.checkPropCnt(cfg.coin_type, cfg.price);
            //     if (bool) {
            //         // HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${type}`]);
            //         break;
            //     }
            // }
            let bool: boolean = this.getHintByExchangeType(type);
            HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${type}`]);
            if (type == ExchangeShopType.Type2) {
                HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonExchange]);
            }
        }

        private onUpdateHintDaolv(): void {
            for (let key in this._model.daolvShopMap) {
                let info = this._model.daolvShopMap[key];
                let bought_cnt = info ? info.week_cnt : 0;//已购买次数
                let left_cnt: number, lmt_cnt: number;
                let cfg: DaolvShopConfig = getConfigByNameId(ConfigName.DaoLvShop, info.index);
                if (cfg.lmt_type == 1) {
                    lmt_cnt = info.max_cnt;//终生购买次数<每周购买次数
                    left_cnt = lmt_cnt - bought_cnt;
                } else if (cfg.lmt_type == 2) {
                    lmt_cnt = cfg.lmt_cnt;
                    left_cnt = lmt_cnt - bought_cnt;
                } else if (cfg.lmt_type == 3) {
                    lmt_cnt = cfg.lmt_cnt;
                    left_cnt = lmt_cnt - info.life_cnt;
                }
                let bool: boolean = left_cnt > 0 && BagUtil.checkPropCnt(cfg.coin_type, cfg.price);
                if (bool) {
                    HintMgr.setHint(bool, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type5}`]);
                    return;
                }
            }
            HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type5}`]);
        }
    }
}