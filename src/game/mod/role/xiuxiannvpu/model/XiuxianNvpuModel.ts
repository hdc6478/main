namespace game.mod.role {

    import Handler = base.Handler;

    export class XiuxianNvpuModel {
        /** s2c_update_ayah_info time. */
        public time: number;

        /** s2c_update_ayah_info level. */
        public level: number;

        /** s2c_update_ayah_info exp. */
        public exp: number;

        /** s2c_update_ayah_info show_index. */
        public show_index: number;

        /** s2c_update_ayah_info buy_list. */
        public buy_list: number[];

        /** s2c_update_ayah_info finish_list. */
        public finish_list: msg.ayah_fuben_data[];

        /** s2c_update_ayah_info offline_list. */
        public offline_list: number[];

        /** s2c_update_ayah_info online_list. */
        public online_list: number[];

        /** s2c_ayah_offline_reward_show list. */
        public reward_list: msg.ayah_fuben_data[];

        /** s2c_ayah_offline_reward_show items. */
        public reward_items: msg.prop_tips_data[];

        public giftHintPath: string[] = [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.XiuxianNvpuGrowMain, MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType01];

        /**离线收益一次登陆弹窗界面处理*/
        public offlineRewardShow = true;
        //天帝类型
        public tiandiList: number[];
        //天帝事件类型
        public tiandiMap: { [index: number]: number[] } = {};

        /**当前正在处理的事件类型*/
        public autoChallengeEventType: XiuxianNvpuEventType;
        /**可处理的事件类型集合*/
        public autoChallengeEventMap: Map<XiuxianNvpuEventType, Handler>;
    }

}