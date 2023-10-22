namespace game.mod.more {

    import huanggu_nvshen_gongfeng = msg.huanggu_nvshen_gongfeng;
    import huanggu_nvshen_gift = msg.huanggu_nvshen_gift;
    import huanggu_nvhshen_get_reward = msg.huanggu_nvhshen_get_reward;
    import huanggu_shijian = msg.huanggu_shijian;
    import nvshen_chat = msg.nvshen_chat;

    export class HuangguModel {
        public consecrateInfo: huanggu_nvshen_gongfeng;
        public chatInfo: huanggu_nvhshen_get_reward;
        public eventList: huanggu_shijian[];
        public targetInfo: huanggu_nvshen_gift;
        public goddessHint: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.GoddessMain, GoddessMainBtnType.Goddess, MdrTabBtnType.TabBtnType01];
        public targetHint: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.GoddessMain, GoddessMainBtnType.Goddess, MoreViewType.GoddessTargetMain, GoddessTargetMainBtnType.Target];
        public rewards: number[][];//供奉奖励
        public summonRewards: number[][];//召唤奖励
        public chatList: {[type: number]: nvshen_chat[]} = {};
        public costIndex: number;//供奉消耗道具
        public actIndex: number;//激活消耗道具
        public summonIndex: number;//召唤消耗道具
        public maxChatLv: number;
        public curChatType: number;//1荒古女神，2女神录-创世女神
    }

    /**女神对话结构*/
    export interface GoddessChatData {
        type: number;//对话类型，GoddessChatType
        desc?: string;//对话文本
        reward?: number[][];//对话的奖励
        status?: number;//奖励状态，RewardStatus
        notShowDesc?: boolean;//初始不显示文字
    }
    export interface GoddessChatSelData {
        desc: string;//对话文本
        info: nvshen_chat;//对话信息结构
    }
    //事件对话结构
    export interface EventChatData {
        desc: string;//对话文本
        systemInfo: number[];//头像ID、相框ID、性别1男2女
    }
}