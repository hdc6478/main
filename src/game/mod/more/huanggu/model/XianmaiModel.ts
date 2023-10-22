namespace game.mod.more {

    export class XianmaiModel {
        public mvp_role: msg.teammate;//本周第一名玩家(积分取字段 value)
        public role_list: { [index: number]: msg.xianmai_role_data } = {};//每层列表
        public attack_time: number;//攻击冷却时间

        //每层每个位置缓存
        public stage_index_map: { [stage: number]: { [index: number]: msg.xianmai_role_data } } = {};

        public my_data: msg.xianmai_role_data;//我的占领数据
        public penglai_score: number;//蓬莱积分累计
        public lingshi: number;//灵石积分累计

        public search_stage: number;//一键寻脉层
        public search_index: number;//一键寻脉索引

        public reward_items: msg.prop_tips_data[];//奖励列表

        //仙脉列表
        public list: msg.xianmai_stage_data[];

        //战报 1.个人2.宗门
        public logs: { [type: number]: msg.xianmai_zhanbao_data[] } = {};

        /** 宗门排名(value为积分) */
        public guild_ranks: msg.teammate[];
        /** 个人排名(value为积分) */
        public person_ranks: msg.teammate[];
        /** 玩家宗门排名数据 */
        public my_guild_rank: msg.teammate;
        /** 玩家个人排名数据 */
        public my_rank: msg.teammate;

        //动画PK直接计算结果
        public fight_data: msg.s2c_city_moment_fight_update;

        public hintPath: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.XianmaiMain, MdrTabBtnType.TabBtnType01];
    }

}