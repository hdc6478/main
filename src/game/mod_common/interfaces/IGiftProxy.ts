namespace game.mod {

    import IProxy = base.IProxy;
    import jinjie_list = msg.jinjie_list;
    import common_reward_status = msg.common_reward_status;

    export interface IGiftProxy extends IProxy {
        /** 点击阶段奖励信息 */
        c2s_jinjie_stage_get_list(type: GiftType): void;

        /**领取奖励*/
        c2s_jinjie_stage_get_reward(type: GiftType, index: number): void;

        /**根据类型，获取对应的进阶奖励列表*/
        getGiftInfo(type: GiftType): jinjie_list;

        /**根据类型和索引，获取对应的奖励状态信息*/
        getGiftStatus(type: GiftType, index: number): common_reward_status;

        /**根据 GiftType 获取红点*/
        getHintByGiftType(type: GiftType): boolean;
    }

}