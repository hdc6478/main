namespace game.mod.union {

    import member_data = msg.member_data;
    import guild_data = msg.guild_data;
    import guild_reward = msg.guild_reward;
    import guild_draw_data = msg.guild_draw_data;
    import guild_shengtan = msg.guild_shengtan;
    import shengtai_data = msg.shengtai_data;
    import LanDef = game.localization.LanDef;
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import guild_yibao_task_struct = msg.guild_yibao_task_struct;
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    import teammate = msg.teammate;
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import guild_zhanyaotai_zhaohuan_struct = msg.guild_zhanyaotai_zhaohuan_struct;
    import guild_ware_donate = msg.guild_ware_donate;
    import prop_attributes = msg.prop_attributes;
    import guild_auction_data = msg.guild_auction_data;
    import guild_draw = msg.guild_draw;
    import guild_study_data = msg.guild_study_data;
    import attributes = msg.attributes;
    import prop_tips_data = msg.prop_tips_data;

    export class UnionModel {
        /**展示欢迎弹窗 */
        public show_welcome: boolean = false;
        /**当前宗门id */
        public id: number = 0;
        /**当前宗门名称 */
        public name: string = "";
        /**当前宗门职位id: 1.宗主2.副宗主3.精英4.成员 0退出*/
        public guild_job: number = 0;
        /**退出宗门冷却时间 */
        public quit_cd: number = 0;
        /**创建宗门冷却时间 */
        public create_cd: number = 0;
        /**是否创建vip宗门 */
        public is_create: boolean = false;
        /**我申请的宗门 */
        public apply_list: number[] = [];
        /**当前可操作申请列表(用于判断红点 列表调协议获取) */
        public apply_record: Long[] = [];
        /**是否领取每日奖励 */
        public is_get_reward: boolean = false;
        /**宗门等级 */
        public union_level: number;

        /**创建宗门名字 有值则不自动发请求获取随机名字 */
        public random_name: string = "";

        /**宗门数据 */
        public info: guild_data = null;
        /**宗主数据 */
        public header: member_data = null;

        /**宗门列表 */
        public guild_list: guild_data[] = [];
        /**成员列表 */
        public member_list: member_data[] = [];
        /**申请列表 */
        public apply_info: member_data[] = [];

        /**创建宗门页面状态获取创建类型 */
        public getCreateTypeByStatus: { [status: string]: number } = {
            [UnionCreateViewStatus.COMMON]: UnionCreateType.COMMON,
            [UnionCreateViewStatus.VIP]: UnionCreateType.VIP
        };

        /**仙宗功能模块 */
        public open_fun: string = "";

        //----------------仙尊--------------------
        /**仙尊数据 */
        public hero: member_data = null;
        /**仙尊秘宝列表id */
        public hero_list: number[] = [];

        //----------------仙尊--------------------

        //-----------福利大厅-----------------

        /**福利大厅发奖励最多 */
        public mvp: member_data = null;
        /**福利大厅奖励 */
        public charge_list: guild_reward[] = [];
        /**mvp发奖励次数 */
        public mvp_count: number = 0;

        /**福利大厅红点路径 */
        public welfare_root: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionWelfare];

        //-----------福利大厅-----------------

        //--------------------天坛/圣坛---------------------

        /**天坛抽奖材料index */
        public tian_cost: number[];
        /**圣坛抽奖材料index */
        public sheng_cost: number[];

        /**天坛抽奖数据 列表次数为已抽 */
        public info_tian: guild_draw_data = null;
        // /**天坛抽奖抽中的idx */
        // public list_tian: number[] = [];

        /**圣坛数据 */
        public shengtan_info: guild_shengtan = null;
        /**圣坛大奖 */
        public list_sheng: shengtai_data[] = [];
        /**圣坛走马灯信息 */
        public list_sheng_run: shengtai_data[] = [];
        /**圣坛更多大奖列表 */
        public list_sheng_reward: shengtai_data[] = [];

        /**天坛圣坛红点路径 */
        public lottery_root: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionLottery];

        public getTipsByType: { [type: number]: string } = {
            [UnionRewardType.Type1]: LanDef.xianzong_tips2,
            [UnionRewardType.Type2]: LanDef.xianzong_tips3,
            [UnionRewardType.Type3]: LanDef.xianzong_tips4,
            [UnionRewardType.Type4]: LanDef.xianzong_tips5,
        }

        //--------------------天坛/圣坛---------------------

        //--------------------二期-遗宝-斩妖-------------------
        public boss_index: number;
        public boss_hp: number;
        public box_list: guild_yibao_box_struct[];
        public task_list: guild_yibao_task_struct[];
        public task_rewards_status: number;
        public recover_time: number;

        public guild_ranks: teammate[];
        public my_guild_rank: teammate;
        public person_ranks: teammate[];
        public my_rank: teammate;

        public last_rank_num: number;
        public props: prop_tips_data[];

        public request_help_list: guild_yibao_help_struct[];

        public my_boss_data: guild_zhanyaotai_boss_struct;
        public boss_list: guild_zhanyaotai_boss_struct[];
        public boss_mvp: teammate;
        public limit_list: guild_zhanyaotai_zhaohuan_struct[];

        public boss_guild_ranks: teammate[];
        public boss_my_guild_rank: teammate;
        public boss_person_ranks: teammate[];
        public boss_my_rank: teammate;

        public boss_last_rank_num: number;
        public boss_props: prop_tips_data[];

        public xianzong_yibao_jiasu_shangxian: number;

        kill_boss_cost_index: number[];
        //--------------------二期-遗宝-斩妖-------------------

        //--------------------三期-仓库-书斋-仙兽-------------------
        /**最大格子数 */
        max_boxs: number;

        equip_map: Map<string, PropData[]> = new Map<string, PropData[]>();
        item_list: prop_attributes[] = [];
        list_len: number = 0;
        donate_logs: guild_ware_donate[];
        /**仓库宝箱积分 */
        guild_score: number = 0;

        auction_list: guild_auction_data[] = [];

        store_list: guild_draw[] = [];
        store_count: number = 0;
        guild_exchange_num: number;

        book_list: guild_study_data[] = [];
        book_cost_idxs: number[] = [];

        beast_stage: number = 0;
        total_exp: number = 0;
        week_rewards: number[] = [];
        base_attrs: attributes;
        extra_attrs: attributes;

        public beast_guild_ranks: teammate[];
        public beast_my_guild_rank: teammate;
        public beast_person_ranks: teammate[];
        public beast_my_rank: teammate;

        public beast_last_rank_num: number;
        public beast_props: prop_tips_data[];
        //--------------------三期-仓库-书斋-仙兽-------------------

    }
}
