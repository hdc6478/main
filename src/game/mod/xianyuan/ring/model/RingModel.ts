namespace game.mod.xianyuan {

    export class RingModel {
        /** 婚戒 */
        public ring_struct: msg.ring_struct;

        /** 已幻化列表 */
        public ring_list: { [index: number]: msg.ring_item } = {};

        /** 已领取激活礼包列表 */
        public ring_act_libao: number[] = [];

        /** 是否领取2阶奖励 默认false */
        public is_get_class_reward: boolean = false;

        public hintPath: { [type: number]: string[] } = {
            1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain, XianlvRingMainBtnType.Yuanjie],
            2: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain, XianlvRingMainBtnType.Huanhua, MdrTabBtnType.TabBtnType01]
        };
    }

}