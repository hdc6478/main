declare namespace game.mod.pay {
    class PayMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.pay {
    import direct_buy_item = msg.direct_buy_item;
    class PayModel {
        infos: {
            [productId: number]: direct_buy_item;
        };
    }
}
declare namespace game.mod.pay {
    class PayProxy extends ProxyBase implements IPayProxy {
        private _model;
        initialize(): void;
        c2s_direct_buy_reward(productId: number): void;
        private s2c_direct_buy_info;
        c2s_check_product_id(productId: number): void;
        private s2c_check_product_id;
        /**礼包信息*/
        private getInfo;
        /**可购买次数*/
        getBuyTimes(productId: number): number;
        /**礼包是否已领取*/
        hasReceived(productId: number): boolean;
        /**礼包是否可领取*/
        canReceived(productId: number): boolean;
    }
}
declare namespace game.mod.pay {
    class GiftView extends eui.Component {
        grp_eff: eui.Group;
        name_item: AvatarNameSrItem;
        special_attr: game.mod.SpecialAttrView;
        list_reward: eui.List;
        btn_close: game.mod.Btn;
        img_buy: eui.Image;
        btn_buy: game.mod.Btn;
        lab_cut: eui.Label;
        img_text: eui.Image;
        constructor();
    }
}
declare namespace game.mod.pay {
    class GiftMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: number;
        private _productId;
        private _itemList;
        private _canReceived;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private labTimes;
        private onBuyUpdate;
        private onClickBuy;
        private updateShow;
        private updateBuyState;
    }
}
