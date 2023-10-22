declare namespace game.mod.store {
    import UpdateItem = base.UpdateItem;
    class StoreType3Mdr extends MdrBase implements UpdateItem {
        protected _view: StoreType3View;
        protected _proxy: StoreProxy;
        protected _listData: eui.ArrayCollection;
        protected _endTime: number;
        protected _getMoney: number;
        protected _type: DirectShopType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected getEndTime(): number;
        protected onHide(): void;
        protected onUpdateInfo(): void;
        protected updateListData(): void;
        protected updateBigRewardView(): void;
        protected getBigReward(): void;
        private getPbType;
        update(time: base.Time): void;
    }
}
declare namespace game.mod.store {
    import DirectShopConfig = game.config.DirectShopConfig;
    class StoreType2Item extends BaseRenderer {
        img_tag: eui.Image;
        img_icon: eui.Image;
        btn_buy: game.mod.Btn;
        img_cost: eui.Image;
        gr_num: eui.Group;
        data: DirectShopConfig;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.store {
    import treasure_house_info = msg.treasure_house_info;
    import daily_mall_info = msg.daily_mall_info;
    class StoreModel {
        /**=========== 藏宝阁 ===========*/
        treasureInfos: {
            [index: number]: treasure_house_info;
        };
        /**=========== 仙玉商城 ===========*/
        /** 存在代表没有倍数 */
        no_multi_product_ids: number[];
        /** 1 代表没有 */
        no_first_charge: number;
        /** 每日礼包领取状态 1:已领取 0:未领取 */
        daily_reward_state: number;
        /**=========== 1每日商城，2每周商城 ===========*/
        infos: {
            [type: number]: daily_mall_info;
        };
        /**红点路径*/
        storeHint: {
            [StoreMainBtnType.Btn1]: (ModName | StoreMainBtnType | StoreViewType)[];
            [StoreMainBtnType.Btn3]: (ModName | StoreMainBtnType | StoreViewType)[];
            [StoreMainBtnType.Btn4]: (ModName | StoreMainBtnType | StoreViewType)[];
        };
    }
}
declare namespace game.mod.store {
    import GameNT = base.GameNT;
    import DirectShopConfig = game.config.DirectShopConfig;
    import treasure_house_info = msg.treasure_house_info;
    import ShopConfig = game.config.ShopConfig;
    /**
     * @description 商城系统
     */
    class StoreProxy extends ProxyBase {
        private _model;
        readonly model: StoreModel;
        initialize(): void;
        /**请求商品信息, type1*/
        c2s_treasure_house_info(): void;
        /**
         * 购买商品 type1
         * @param index 商品编号
         * @param cnt 购买数量
         */
        c2s_treasure_house_buy_prop(index: number, cnt?: number): void;
        /**返回商品信息 type1*/
        s2c_treasure_house_info(n: GameNT): void;
        /**充值，仙玉商城*/
        c2s_open_charge_ui(): void;
        /**充值回调*/
        private s2c_open_charge_ui;
        /**
         * 每日、每周商城
         * 领取大奖
         * @param type 1 每日 2 每周
         */
        c2s_daily_mall_get_award(type: number): void;
        /**每日、每周商城*/
        s2c_daily_mall_info(n: GameNT): void;
        /**==========================================================================*/
        /**根据类型获取不同的商品id配置*/
        getDirectShopCfgList(type: number): DirectShopConfig[];
        typeMap: {
            [type: number]: ShopConfig[];
        };
        getTypeCfgList(type: StoreType): ShopConfig[];
        /**藏宝阁能展示的配置*/
        getShowCfgListForType1(): ShopConfig[];
        /**
         * 每日、每周商城的购买信息
         * @param type 1每日，2每周
         * @param index
         */
        getShopBuyInfo(type: number, index: number): treasure_house_info;
        getBoughtCnt(type: number, index: number): number;
        isSoldOut(type: number, index: number): boolean;
        /**===================================== hint =====================================*/
        protected onRoleUpdate(n: GameNT): void;
        /**藏宝阁红点*/
        updateStoreHint1(): void;
        /**每日商城，每周商城红点*/
        updateStoreHint3(): void;
        protected onOpenFuncUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.store {
    class StoreBarView extends eui.Component {
        bar: game.mod.ProgressBarComp;
        btn_charge: game.mod.Btn;
        img_bg: eui.Image;
        gr_vip: eui.Group;
        img_desc: eui.Image;
        gr_vipNum: eui.Group;
        img_desc0: eui.Image;
        gr_vipFont: eui.Group;
        private _proxy;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private onClick;
        private updateView;
    }
}
declare namespace game.mod.store {
    class StorePriceItem extends eui.Component {
        img_price: eui.Image;
        lb_price: eui.Label;
        rect_del: eui.Rect;
        constructor();
        /**
         * @param idx 消耗货币
         * @param price 价格
         * @param showDel 展示删除线，默认false
         */
        updateView(idx: number, price: number, showDel?: boolean): void;
    }
}
declare namespace game.mod.store {
    import ShopConfig = game.config.ShopConfig;
    class StoreType1Item extends BaseListenerRenderer {
        icon: game.mod.Icon;
        lb_cnt: eui.Label;
        btn_buy: game.mod.Btn;
        priceItem0: game.mod.store.StorePriceItem;
        priceItem1: game.mod.store.StorePriceItem;
        img_bought: eui.Image;
        img_tag: eui.Image;
        lb_name: eui.Label;
        data: ShopConfig;
        private _proxy;
        private _cost;
        private _leftCnt;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.store {
    class StoreType1View extends eui.Component {
        icon_bigreward: game.mod.Icon;
        lb_time: eui.Label;
        list: eui.List;
        constructor();
    }
}
declare namespace game.mod.store {
    class StoreMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.store {
    class StoreType2View extends eui.Component {
        list: eui.List;
        storeBar: game.mod.store.StoreBarView;
        constructor();
    }
}
declare namespace game.mod.store {
    import DirectShopConfig = game.config.DirectShopConfig;
    class StoreType3Item extends BaseListenerRenderer {
        img_bg: eui.Image;
        img_icon: eui.Image;
        lb_limit: eui.Label;
        list: eui.List;
        btn_buy: game.mod.Btn;
        img_bought: eui.Image;
        private _proxy;
        private _listData;
        /**type: 1每日，2每周*/
        data: {
            cfg: DirectShopConfig;
            type: number;
        };
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        onClick(): void;
    }
}
declare namespace game.mod.store {
    class StoreType3View extends eui.Component {
        img_bg: eui.Image;
        icon_bigreward: game.mod.Icon;
        lb_time: eui.Label;
        list: eui.List;
        lb_money: eui.Label;
        bar: game.mod.ProgressBarComp;
        constructor();
    }
}
declare namespace game.mod.store {
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    class StoreType1Mdr extends MdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _listData;
        private _endTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateListData;
        private onUpdateInfo;
        protected onHide(): void;
        private updateBigReward;
        update(time: base.Time): void;
        protected onRoleUpdate(n: GameNT): void;
    }
}
declare namespace game.mod.store {
    class StoreType2Mdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateListData;
        protected onHide(): void;
        private onUpdateInfo;
    }
}
declare namespace game.mod.store {
    class StoreMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[];
    }
}
declare namespace game.mod.store {
    class StoreType4Mdr extends StoreType3Mdr {
        protected _type: DirectShopType;
        protected onInit(): void;
        protected getEndTime(): number;
    }
}
