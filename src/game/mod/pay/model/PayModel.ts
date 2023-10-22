namespace game.mod.pay {

    import direct_buy_item = msg.direct_buy_item;

    export class PayModel {
        public infos: {[productId: number] : direct_buy_item};
    }

}