namespace game.mod.store {

    import c2s_treasure_house_info = msg.c2s_treasure_house_info;
    import c2s_treasure_house_buy_prop = msg.c2s_treasure_house_buy_prop;
    import GameNT = base.GameNT;
    import s2c_treasure_house_info = msg.s2c_treasure_house_info;
    import c2s_open_charge_ui = msg.c2s_open_charge_ui;
    import s2c_open_charge_ui = msg.s2c_open_charge_ui;
    import DirectShopConfig = game.config.DirectShopConfig;
    import c2s_daily_mall_get_award = msg.c2s_daily_mall_get_award;
    import s2c_daily_mall_info = msg.s2c_daily_mall_info;
    import treasure_house_info = msg.treasure_house_info;
    import ShopConfig = game.config.ShopConfig;

    /**
     * @description 商城系统
     */
    export class StoreProxy extends ProxyBase {
        private _model: StoreModel;

        public get model(): StoreModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new StoreModel();
            this.onProto(s2c_treasure_house_info, this.s2c_treasure_house_info, this);
            this.onProto(s2c_open_charge_ui, this.s2c_open_charge_ui, this);
            this.onProto(s2c_daily_mall_info, this.s2c_daily_mall_info, this);
        }

        /**请求商品信息, type1*/
        public c2s_treasure_house_info(): void {
            this.sendProto(new c2s_treasure_house_info());
        }

        /**
         * 购买商品 type1
         * @param index 商品编号
         * @param cnt 购买数量
         */
        public c2s_treasure_house_buy_prop(index: number, cnt = 1): void {
            let msg = new c2s_treasure_house_buy_prop();
            msg.index = index;
            msg.buy_cnt = cnt;
            this.sendProto(msg);
        }

        /**返回商品信息 type1*/
        public s2c_treasure_house_info(n: GameNT): void {
            let msg = n.body as s2c_treasure_house_info;
            this._model.treasureInfos = {};
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.treasureInfos[info.index] = info;
                }
            }
            this.updateStoreHint1();
            this.sendNt(StoreEvent.ON_UPDATE_TYPE_INFO_1);
        }

        /**充值，仙玉商城*/
        public c2s_open_charge_ui(): void {
            this.sendProto(new c2s_open_charge_ui());
        }

        /**充值回调*/
        private s2c_open_charge_ui(n: GameNT): void {
            let msg = n.body as s2c_open_charge_ui;
            if (msg.no_first_charge != null) {
                this._model.no_first_charge = msg.no_first_charge;
            }
            if (msg.daily_reward_state != null) {
                this._model.daily_reward_state = msg.daily_reward_state;
            }

            if (msg.oper != null && msg.oper == 1) {
                this._model.no_multi_product_ids = [];
            }
            if (msg.no_multi_product_ids != null) {
                this._model.no_multi_product_ids = msg.no_multi_product_ids;
            }
            this.sendNt(StoreEvent.ON_UPDATE_CHARGE_INFO);
        }

        /**
         * 每日、每周商城
         * 领取大奖
         * @param type 1 每日 2 每周
         */
        public c2s_daily_mall_get_award(type: number): void {
            let msg = new c2s_daily_mall_get_award();
            msg.type = type;
            this.sendProto(msg);
        }

        /**每日、每周商城*/
        public s2c_daily_mall_info(n: GameNT): void {
            let msg = n.body as s2c_daily_mall_info;
            if (msg.is_new_day != null && msg.is_new_day == 1) {
                this._model.infos = {};
            }
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.infos[info.type] = info;
                }
            }
            this.updateStoreHint3();
            this.sendNt(StoreEvent.ON_UPDATE_DAILY_WEEKLY_INFO);
        }

        /**==========================================================================*/

        /**根据类型获取不同的商品id配置*/
        public getDirectShopCfgList(type: number): DirectShopConfig[] {
            return StoreUtil.getDirectShopCfgListByType(type);
        }

        public typeMap: { [type: number]: ShopConfig[] } = {};

        public getTypeCfgList(type: StoreType): ShopConfig[] {
            if (this.typeMap[type]) {
                return this.typeMap[type];
            }
            let cfgs: ShopConfig[] = getConfigListByName(ConfigName.Store);
            for (let cfg of cfgs) {
                if (!this.typeMap[cfg.type]) {
                    this.typeMap[cfg.type] = [];
                }
                this.typeMap[cfg.type].push(cfg);
            }
            return this.typeMap[type];
        }

        /**藏宝阁能展示的配置*/
        public getShowCfgListForType1(): ShopConfig[] {
            let info = this._model.treasureInfos;
            let sortNum: number[] = [];
            for (let key in info) {
                let cfg: ShopConfig = getConfigByNameId(ConfigName.Store, +key);
                if (cfg && sortNum.indexOf(cfg.sort) < 0) {
                    sortNum.push(cfg.sort);
                }
            }
            let rst: ShopConfig[] = [];
            let cfgs = this.getTypeCfgList(StoreType.Cangbaoge);
            cfgs.sort((a: ShopConfig, b: ShopConfig) => a.sort - b.sort);
            let addSort: number[] = [];//已添加的排序
            for (let cfg of cfgs) {
                if (!StoreUtil.checkStoreCfgShow(cfg)) {
                    continue;
                }
                //sort相同的只能存在一个
                if (sortNum.indexOf(cfg.sort) > -1 && !info[cfg.index]) {
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

        /**
         * 每日、每周商城的购买信息
         * @param type 1每日，2每周
         * @param index
         */
        public getShopBuyInfo(type: number, index: number): treasure_house_info {
            let info = this._model.infos[type];
            if (!info || !info.shop_info) {
                return null;
            }
            for (let item of info.shop_info) {
                if (item.index == index) {
                    return item;
                }
            }
            return null;
        }

        //已购买次数 type 1每日，2每周
        public getBoughtCnt(type: number, index: number): number {
            let info = this.getShopBuyInfo(type, index);
            return info && info.bought_cnt || 0;
        }

        //是否售罄 type 1每日，2每周
        public isSoldOut(type: number, index: number): boolean {
            let boughtCnt = this.getBoughtCnt(type, index);
            let directType = type == 1 ? DirectShopType.Daily : DirectShopType.Weekly;
            let directCfgObj = getConfigByNameId(ConfigName.DirectShop, directType);
            let totalCnt = 0;
            if (directCfgObj && directCfgObj[index]) {
                let directCfg: DirectShopConfig = directCfgObj[index];
                totalCnt = directCfg.param1;
            }
            return boughtCnt >= totalCnt;
        }

        /**===================================== hint =====================================*/

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            // 仙玉更新，vip变化
            if (keys.indexOf(RolePropertyKey.diamond) > -1
                || keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                this.updateStoreHint1();
            }
        }

        /**藏宝阁红点*/
        public updateStoreHint1(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Store)) {
                return;
            }
            let cfgs = this.getShowCfgListForType1();
            let hint = false;
            for (let cfg of cfgs) {
                let info = this._model.treasureInfos[cfg.index];
                let bought_cnt = info && info.bought_cnt || 0;//已购买次数
                let left_cnt = cfg.lmt_cnt - bought_cnt;//剩余购买次数
                let cost_cnt = cfg.price;
                if (cfg.discount) {
                    cost_cnt = Math.floor(cfg.price * cfg.discount / 10000);
                }
                if (left_cnt > 0 && BagUtil.checkPropCnt(cfg.coin_type, cost_cnt)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.storeHint[StoreMainBtnType.Btn1]);
        }

        /**每日商城，每周商城红点*/
        public updateStoreHint3(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.StoreDaily)) {
                return;
            }
            let directTypes = [DirectShopType.Daily, DirectShopType.Weekly];
            for (let directType of directTypes) {
                let directCfgs = this.getDirectShopCfgList(directType);
                let pbType = DirectType2PbType[directType];
                let btnType = pbType == 1 ? StoreMainBtnType.Btn3 : StoreMainBtnType.Btn4;

                //0元购买红点
                let hint = false;
                for (let cfg of directCfgs) {
                    let rmb = PayUtil.getRmbValue(cfg.product_id);
                    let isSoldOut = this.isSoldOut(pbType, cfg.product_id);
                    if (rmb == 0 && !isSoldOut) {
                        hint = true;
                        break;
                    }
                }

                if (!hint) {
                    //大奖红点
                    let info = this._model.infos[pbType];
                    if (info) {
                        let change = info && info.change || 0;
                        let cfg = GameConfig.getParamConfigById(`direct_shop_big_award${pbType}`);
                        let money = cfg && cfg.value[1] || 0;
                        hint = change >= money;
                    }
                }

                HintMgr.setHint(hint, this._model.storeHint[btnType]);
            }
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdxs = n.body as number[];
            if (addIdxs.indexOf(OpenIdx.Store) > -1) {
                this.updateStoreHint1();
            }
            if (addIdxs.indexOf(OpenIdx.StoreDaily) > -1) {
                this.updateStoreHint3();
            }
        }
    }
}