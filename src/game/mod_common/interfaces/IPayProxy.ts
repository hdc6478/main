namespace game.mod {

    import IProxy = base.IProxy;

    export interface IPayProxy extends IProxy {
        /**统一由PayUtil访问*/
        c2s_check_product_id(productId: number): void;//验证购买
        c2s_direct_buy_reward(productId: number): void;//领取奖励
        hasReceived(productId: number): boolean;

        /**礼包是否已领取*/
        canReceived(productId: number): boolean;

        /**礼包是否可领取*/
        getBuyTimes(productId: number): number;///**可购买次数*/
    }
}