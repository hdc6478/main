namespace game {

    export const enum ConsecrateEvent {
        /**封魔珍宝抽奖缓动开启 */
        ON_TWEEN_CONSECRATE_OPEN = "on_tween_consecrate_open",
        /**更新封魔界面 */
        ON_UPDATE_CONSECRATE_INFO = "on_update_consecrate_info",
        /**关闭放入封魂界面 */
        ON_CLOSE_CONSECRATE_SHELF = "on_close_consecrate_shelf",

        ON_UPDATE_AMASS_INFO = "on_update_amass_info",//更新异兽奇记数据
    }

    export const enum ConsecrateState {
        Null = 0,//0空 1封印中 2等待封印中 3 封印完毕
        Fengyin = 1,//封印中
        WaitingFengyin = 2,
        Reward = 3
    }

    export const enum AmassClassId {
        Amass = 1,//异兽奇记
        Amass2 = 2,//洪荒妖录
        Amass3 = 3,//墟界祭坛
    }

    export const enum AmassOpType {
        OneKey = 1,//一键进阶
        Up = 2//进阶
    }

    //属性套装定义
    export const enum AmassSuitType {
        PowerAdd = 2//战力加成，万分比
    }
}
