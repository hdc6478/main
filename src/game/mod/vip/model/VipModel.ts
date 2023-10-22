namespace game.mod.vip {

    import vip_reward_info = msg.vip_reward_info;

    export class VipModel {
        /** 当前vip等级索引 直接初始vip0*/
        public idx: number = 110000000;
        /** 当前vip经验 */
        public exp: number = 0;
        /** vip奖励信息 */
        public reward_list: { [index: number]: vip_reward_info } = {};

        public hintPath: string[] = [ModName.Vip, VipViewType.VipMain, VipMainBtnType.Vip];
    }

}