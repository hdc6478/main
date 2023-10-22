namespace game.mod {
    import facade = base.facade;
    import ProductIdConfig = game.config.ProductIdConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    import PropConfig = game.config.PropConfig;
    import XianchongConfig = game.config.XianchongConfig;

    export class PayUtil {
        /**获取礼包奖励*/
        public static getRewards(productId: number): number[][] {
            let cfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, productId);
            return cfg.awards;
        }

        /**获取礼包特权配置*/
        public static getPrivilegeCfgList(productId: number): NewPrivilegeConfig[] {
            let rewards = PayUtil.getRewards(productId);
            let propIndex = rewards[0][0];//取第一个奖励，灵宠碎片
            let propCfg: PropConfig = GameConfig.getPropConfigById(propIndex);
            let index = propCfg && propCfg.param1 && propCfg.param1.length ? propCfg.param1[0][0] : 0;//灵宠index
            let cfg: XianchongConfig = getConfigByNameId(ConfigName.Lingchong, index);
            if (!cfg.privilege_id) {
                console.info("礼包ID：", productId, "灵宠特权配置不对，灵宠ID：", index);
                return null;
            }
            let cfgList: NewPrivilegeConfig[] = [];
            for (let info of cfg.privilege_id) {
                let id = info[0];
                let pCfg: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, id);
                if (!pCfg) {
                    console.info("灵宠ID：", index, "灵宠特权配置不对，特权ID：", id);
                    continue;
                }
                cfgList.push(pCfg);
            }
            return cfgList;
        }

        /**礼包是否已购买*/
        public static hasBuy(productId: number): boolean {
            return this.hasReceived(productId) || this.canReceived(productId);
        }

        /**礼包是否已领取*/
        public static hasReceived(productId: number): boolean {
            let proxy: IPayProxy = facade.retMod(ModName.Pay).retProxy(ProxyType.Pay);
            return proxy.hasReceived(productId);
        }

        /**礼包是否可领取*/
        public static canReceived(productId: number): boolean {
            let proxy: IPayProxy = facade.retMod(ModName.Pay).retProxy(ProxyType.Pay);
            return proxy.canReceived(productId);
        }

        /**礼包是否可领取*/
        public static getBuyTimes(productId: number): number {
            let proxy: IPayProxy = facade.retMod(ModName.Pay).retProxy(ProxyType.Pay);
            return proxy.getBuyTimes(productId);
        }

        /**领取奖励*/
        public static drawReward(productId: number): void {
            let proxy: IPayProxy = facade.retMod(ModName.Pay).retProxy(ProxyType.Pay);
            proxy.c2s_direct_buy_reward(productId);
        }

        /**获取商品价格*/
        public static getRmbValue(productId: number): number {
            let cfg = getConfigByNameId(ConfigName.ProductId, productId);
            //todo，不同渠道商品价格可能不一样
            return cfg.rmb;
        }

        /**todo 获取单位，默认元*/
        public static getRmbUnit(): string {
            return '元';
        }

        /**获取商品原价*/
        public static getFakeRmbValue(productId: number): number {
            let cfg = getConfigByNameId(ConfigName.ProductId, productId);
            //todo，不同渠道商品价格可能不一样
            return cfg.fake_rmb;
        }

        /**获取商品名称*/
        public static getPayName(productId: number): string {
            let cfg: ProductIdConfig = getConfigByNameId(ConfigName.ProductId, productId);
            //todo，不同渠道商品名称可能不一样
            return cfg.name;
        }

        /**购买商品*/
        public static pay(productId: number): void {
            let rmb = this.getRmbValue(productId);
            if (rmb <= 0) {
                this.drawReward(productId);
                return;
            }
            let proxy: IPayProxy = facade.retMod(ModName.Pay).retProxy(ProxyType.Pay);
            proxy.c2s_check_product_id(productId);
        }

        /** 检查是否首充,todo*/
        public static checkFirstCharge(): boolean {
            let proxy: IFirstProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.First);
            return proxy.one_first;
        }

        /** 判断是否能显示充值入口,todo*/
        public static checkShowPay(): boolean {
            return true;
        }

        /** 判断是否显示礼包，一般首充后开启,todo*/
        public static checkShowGift(productId: number): boolean {
            if (!this.checkShowPay()) {
                //充值入口未开启时
                return false;
            }
            let cfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, productId);
            if (cfg.funcopen && !ViewMgr.getIns().checkViewOpen(cfg.funcopen)) {
                //功能未开启时
                return false;
            }
            let serverDay = RoleUtil.getServerDay();
            if (cfg.day_up > serverDay || cfg.day_out < serverDay) {
                //开服天数未满足时
                return false;
            }
            if (cfg.open_charge > RoleVo.ins.charge_rmb) {
                //充值金额未满足时
                return false;
            }
            return true;
        }

        /**
         * 特权令是否全部购买
         * true：表示全购买了
         */
        public static checkTequanling(): boolean {
            let proxy: IPrerogativeWritProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PrerogativeWrit);
            return proxy.isAllBought();
        }
    }
}