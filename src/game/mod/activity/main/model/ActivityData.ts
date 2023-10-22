namespace game.mod.activity {


    import act_reward = msg.act_reward;
    import oper_act_item = msg.oper_act_item;

    export class ActivityData {

        act_id: number;//活动id
        name: string;//活动名称
        sort_num: number;//界面里标签页排序
        type: number;//活动类型
        is_single_icon: boolean;//是否为独立图标
        entrance: string;//入口图标
        icon: string;//活动图标
        banner: string;//活动横幅
        desc: string;//描述
        c_begin_time: number;//活动开始显示时间（预告）
        c_end_time: number;//活动结束显示时间
        s_begin_time: number;//真正活动开始时间
        s_end_time: number;//真正活动结束
        param: number[];//活动参数
        reward_list: act_reward[];

        public updateData(msg: oper_act_item) {
            let keys = Object.keys(msg);
            if (keys && keys.length) {
                for (let key of keys) {
                    if (msg[key] != undefined) {
                        this[key] = msg[key];
                    }
                }
            }
        }

    }

}