namespace game.mod.union {

    import c2s_ask_guild_info = msg.c2s_ask_guild_info;
    import c2s_ask_guild_member = msg.c2s_ask_guild_member;
    import c2s_ask_guild_list = msg.c2s_ask_guild_list;
    import c2s_quit_guild = msg.c2s_quit_guild;
    import c2s_set_guild_member_job = msg.c2s_set_guild_member_job;
    import GameNT = base.GameNT;
    import s2c_ask_guild_info_ret = msg.s2c_ask_guild_info_ret;
    import s2c_ask_guild_member_ret = msg.s2c_ask_guild_member_ret;
    import s2c_ask_guild_list_ret = msg.s2c_ask_guild_list_ret;
    import c2s_create_guild = msg.c2s_create_guild;
    import c2s_guild_open_status = msg.c2s_guild_open_status;
    import c2s_random_guild_name = msg.c2s_random_guild_name;
    import s2c_random_guild_name_ret = msg.s2c_random_guild_name_ret;
    import s2c_set_guild_member_job_ret = msg.s2c_set_guild_member_job_ret;
    import s2c_guild_role_data = msg.s2c_guild_role_data;
    import c2s_ask_guild_apply_info = msg.c2s_ask_guild_apply_info;
    import s2c_ask_guild_apply_info_ret = msg.s2c_ask_guild_apply_info_ret;
    import c2s_agree_or_refuse_guild = msg.c2s_agree_or_refuse_guild;
    import s2c_agree_or_refuse_guild_ret = msg.s2c_agree_or_refuse_guild_ret;
    import member_data = msg.member_data;
    import guild_data = msg.guild_data;
    import function_data = msg.function_data;
    import c2s_choice_apply_guild = msg.c2s_choice_apply_guild;
    import c2s_guild_kick_member = msg.c2s_guild_kick_member;
    import s2c_guild_open_status_ret = msg.s2c_guild_open_status_ret;
    import TimeMgr = base.TimeMgr;
    import c2s_guild_donate = msg.c2s_guild_donate;
    import c2s_guild_daily_reward = msg.c2s_guild_daily_reward;
    import GuildJobDataConfig = game.config.GuildJobDataConfig;
    import c2s_guild_charge_ui = msg.c2s_guild_charge_ui;
    import s2c_guild_charge_ui_ret = msg.s2c_guild_charge_ui_ret;
    import c2s_guild_get_charge_reward = msg.c2s_guild_get_charge_reward;
    import s2c_guild_donate_ret = msg.s2c_guild_donate_ret;
    import guild_reward = msg.guild_reward;
    import c2s_change_guild_name = msg.c2s_change_guild_name;
    import c2s_guild_draw = msg.c2s_guild_draw;
    import s2c_guild_draw_info = msg.s2c_guild_draw_info;
    import c2s_guild_draw_reset = msg.c2s_guild_draw_reset;
    import c2s_guild_draw_open = msg.c2s_guild_draw_open;
    import GuildDrawConfig = game.config.GuildDrawConfig;
    import s2c_guild_shengtan_info = msg.s2c_guild_shengtan_info;
    import c2s_guild_shengtan_ui = msg.c2s_guild_shengtan_ui;
    import s2c_guild_shengtan_ui_ret = msg.s2c_guild_shengtan_ui_ret;
    import c2s_guild_shengtan_score_reward = msg.c2s_guild_shengtan_score_reward;
    import shengtai_data = msg.shengtai_data;
    import c2s_set_guild_xianzong = msg.c2s_set_guild_xianzong;
    import s2c_set_guild_xianzong_ret = msg.s2c_set_guild_xianzong_ret;
    import GuildMibaoConfig = game.config.GuildMibaoConfig;
    import c2s_guild_mibao_ui = msg.c2s_guild_mibao_ui;
    import c2s_guild_mibao_swap = msg.c2s_guild_mibao_swap;
    import s2c_guild_mibao_ui_ret = msg.s2c_guild_mibao_ui_ret;
    import c2s_guild_invita = msg.c2s_guild_invita;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;
    import s2c_guild_yibao_base_info = msg.s2c_guild_yibao_base_info;
    import s2c_guild_yibao_help = msg.s2c_guild_yibao_help;
    import c2s_guild_yibao_request = msg.c2s_guild_yibao_request;
    import c2s_guild_yibao_click = msg.c2s_guild_yibao_click;
    import guild_yibao_box_struct = msg.guild_yibao_box_struct;
    import teammate = msg.teammate;
    import GuildYibaoRankConfig = game.config.GuildYibaoRankConfig;
    import GuildXianshouTargetConfig = game.config.GuildXianshouTargetConfig;
    import GuildXianshouConfig = game.config.GuildXianshouConfig;
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    import guild_yibao_task_struct = msg.guild_yibao_task_struct;
    import GuildYibaoTaskConfig = game.config.GuildYibaoTaskConfig;
    import s2c_guild_zhanyaotai_info = msg.s2c_guild_zhanyaotai_info;
    import c2s_guild_zhanyaotai_request = msg.c2s_guild_zhanyaotai_request;
    import c2s_guild_zhanyaotai_click = msg.c2s_guild_zhanyaotai_click;
    import c2s_guild_zhanyaotai_help_chat = msg.c2s_guild_zhanyaotai_help_chat;
    import GuildZhanyaotaiConfig = game.config.GuildZhanyaotaiConfig;
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;
    import GuildZhanyaotaiRankConfig = game.config.GuildZhanyaotaiRankConfig;
    import GuildYibaoBoxConfig = game.config.GuildYibaoBoxConfig;
    import c2s_guild_ware_show = msg.c2s_guild_ware_show;
    import c2s_guild_ware_oper = msg.c2s_guild_ware_oper;
    import c2s_guild_auction_show = msg.c2s_guild_auction_show;
    import c2s_guild_baoku_show = msg.c2s_guild_baoku_show;
    import c2s_guild_exchange_item = msg.c2s_guild_exchange_item;
    import s2c_guild_ware_show = msg.s2c_guild_ware_show;
    import s2c_guild_ware_oper = msg.s2c_guild_ware_oper;
    import s2c_guild_auction_show = msg.s2c_guild_auction_show;
    import s2c_guild_baoku_show = msg.s2c_guild_baoku_show;
    import s2c_guild_exchange_item = msg.s2c_guild_exchange_item;
    import c2s_guild_auction_buy = msg.c2s_guild_auction_buy;
    import s2c_guild_auction_buy = msg.s2c_guild_auction_buy;
    import GuildStudyConfig = game.config.GuildStudyConfig;
    import c2s_guild_baoku_buy = msg.c2s_guild_baoku_buy;
    import s2c_guild_baoku_buy = msg.s2c_guild_baoku_buy;
    import c2s_guild_study_show = msg.c2s_guild_study_show;
    import s2c_guild_study_show = msg.s2c_guild_study_show;
    import s2c_guild_study_oper = msg.s2c_guild_study_oper;
    import GuildStudyLevelConfig = game.config.GuildStudyLevelConfig;
    import guild_study_data = msg.guild_study_data;
    import c2s_guild_study_oper = msg.c2s_guild_study_oper;
    import c2s_guild_xianshou_show = msg.c2s_guild_xianshou_show;
    import c2s_guild_xianshou_up_level = msg.c2s_guild_xianshou_up_level;
    import c2s_guild_xianshou_receive = msg.c2s_guild_xianshou_receive;
    import c2s_guild_xianshou_rank_show = msg.c2s_guild_xianshou_rank_show;
    import s2c_guild_xianshou_show = msg.s2c_guild_xianshou_show;
    import s2c_guild_xianshou_update_exp = msg.s2c_guild_xianshou_update_exp;
    import s2c_guild_xianshou_receive = msg.s2c_guild_xianshou_receive;
    import attributes = msg.attributes;
    import EquipmentConfig = game.config.EquipmentConfig;
    import c2s_guild_ware_exchange = msg.c2s_guild_ware_exchange;
    import s2c_guild_type_rank_list = msg.s2c_guild_type_rank_list;
    import c2s_guild_type_rank_rewards = msg.c2s_guild_type_rank_rewards;
    import GuildXianshouTaskConfig = game.config.GuildXianshouTaskConfig;
    import s2c_guild_ware_exchange = msg.s2c_guild_ware_exchange;
    import GuildXianshouRankConfig = game.config.GuildXianshouRankConfig;
    import task_data = msg.task_data;
    import Handler = base.Handler;
    import GuildChargeConfig = game.config.GuildChargeConfig;
    import GuildDonateConfig = game.config.GuildDonateConfig;
    import prop_tips_data = msg.prop_tips_data;

    export class UnionProxy extends ProxyBase implements IUnionProxy {
        private _model: UnionModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new UnionModel();

            this.onProto(s2c_ask_guild_info_ret, this.s2c_ask_guild_info_ret, this);
            this.onProto(s2c_ask_guild_member_ret, this.s2c_ask_guild_member_ret, this);
            this.onProto(s2c_ask_guild_list_ret, this.s2c_ask_guild_list_ret, this);
            this.onProto(s2c_random_guild_name_ret, this.s2c_random_guild_name_ret, this);
            this.onProto(s2c_set_guild_member_job_ret, this.s2c_set_guild_member_job_ret, this);
            this.onProto(s2c_guild_role_data, this.s2c_guild_role_data, this);
            this.onProto(s2c_ask_guild_apply_info_ret, this.s2c_ask_guild_apply_info_ret, this);
            this.onProto(s2c_agree_or_refuse_guild_ret, this.s2c_agree_or_refuse_guild_ret, this);
            this.onProto(s2c_guild_open_status_ret, this.s2c_guild_open_status_ret, this);
            this.onProto(s2c_guild_charge_ui_ret, this.s2c_guild_charge_ui_ret, this);
            this.onProto(s2c_guild_donate_ret, this.s2c_guild_donate_ret, this);
            this.onProto(s2c_guild_draw_info, this.s2c_guild_draw_info, this);
            this.onProto(s2c_guild_shengtan_info, this.s2c_guild_shengtan_info, this);
            this.onProto(s2c_guild_shengtan_ui_ret, this.s2c_guild_shengtan_ui_ret, this);
            this.onProto(s2c_set_guild_xianzong_ret, this.s2c_set_guild_xianzong_ret, this);
            this.onProto(s2c_guild_mibao_ui_ret, this.s2c_guild_mibao_ui_ret, this);

            /**--------------------二期-遗宝-斩妖------------------- */
            this.onProto(s2c_guild_yibao_base_info, this.s2c_guild_yibao_base_info, this);
            this.onProto(s2c_guild_yibao_help, this.s2c_guild_yibao_help, this);
            this.onProto(s2c_guild_zhanyaotai_info, this.s2c_guild_zhanyaotai_info, this);
            /**--------------------二期-遗宝-斩妖------------------- */

            /**--------------------三期-仓库-书斋-仙兽------------------- */
            this.onProto(s2c_guild_ware_show, this.s2c_guild_ware_show, this);
            this.onProto(s2c_guild_ware_oper, this.s2c_guild_ware_oper, this);
            this.onProto(s2c_guild_auction_show, this.s2c_guild_auction_show, this);
            this.onProto(s2c_guild_auction_buy, this.s2c_guild_auction_buy, this);
            this.onProto(s2c_guild_baoku_show, this.s2c_guild_baoku_show, this);
            this.onProto(s2c_guild_exchange_item, this.s2c_guild_exchange_item, this);
            this.onProto(s2c_guild_baoku_buy, this.s2c_guild_baoku_buy, this);
            this.onProto(s2c_guild_study_show, this.s2c_guild_study_show, this);
            this.onProto(s2c_guild_study_oper, this.s2c_guild_study_oper, this);
            this.onProto(s2c_guild_xianshou_show, this.s2c_guild_xianshou_show, this);
            this.onProto(s2c_guild_xianshou_update_exp, this.s2c_guild_xianshou_update_exp, this);
            this.onProto(s2c_guild_xianshou_receive, this.s2c_guild_xianshou_receive, this);
            this.onProto(s2c_guild_ware_exchange, this.s2c_guild_ware_exchange, this);
            /**--------------------三期-仓库-书斋-仙兽------------------- */

            this.onProto(s2c_guild_type_rank_list, this.s2c_guild_type_rank_list, this);
        }

        /**--------------------协议start-------------------- */

        /**请求宗门信息 */
        public c2s_ask_guild_info(): void {
            let msg: c2s_ask_guild_info = new c2s_ask_guild_info();
            this.sendProto(msg);
        }

        /**请求宗门成员列表 */
        public c2s_ask_guild_member(): void {
            let msg: c2s_ask_guild_member = new c2s_ask_guild_member();
            this.sendProto(msg);
        }

        /**请求宗门列表 */
        public c2s_ask_guild_list(): void {
            let msg: c2s_ask_guild_list = new c2s_ask_guild_list();
            this.sendProto(msg);
        }

        /**玩家退出宗门 */
        public c2s_quit_guild(): void {
            let msg: c2s_quit_guild = new c2s_quit_guild();
            this.sendProto(msg);
        }

        /**修改权限 1.升职2.降职  成员降职=踢出工会*/
        public c2s_set_guild_member_job(role_id: Long, type: number): void {
            let msg: c2s_set_guild_member_job = new c2s_set_guild_member_job();
            msg.role_id = role_id;
            msg.type = type;
            this.sendProto(msg);
        }

        /**创建宗门 */
        public c2s_create_guild(type: number, name: string, content?: string): void {
            let msg: c2s_create_guild = new c2s_create_guild();
            msg.type = type;
            msg.name = name;
            msg.content = content || getLanById(LanDef.xianzong_tips1);
            this.sendProto(msg);
        }

        /**设置申请加入条件 */
        public c2s_guild_open_status(is_set: boolean, value: number): void {
            let msg: c2s_guild_open_status = new c2s_guild_open_status();
            msg.condition = { is_set, value };
            this.sendProto(msg);
        }

        /**随机名字 */
        public c2s_random_guild_name(): void {
            let msg: c2s_random_guild_name = new c2s_random_guild_name();
            this.sendProto(msg);
        }

        /**查看申请列表 */
        public c2s_ask_guild_apply_info(): void {
            let msg: c2s_ask_guild_apply_info = new c2s_ask_guild_apply_info();
            this.sendProto(msg);
        }

        /**操作申请列表 1同意 2拒绝 */
        public c2s_agree_or_refuse_guild(role_id: Long, type: number): void {
            let msg: c2s_agree_or_refuse_guild = new c2s_agree_or_refuse_guild();
            msg.role_id = role_id;
            msg.type = type;
            this.sendProto(msg);
        }

        /**选择申请加入宗门 */
        public c2s_choice_apply_guild(id: number): void {
            let msg: c2s_choice_apply_guild = new c2s_choice_apply_guild();
            msg.id = id;
            this.sendProto(msg);
        }

        /**踢出宗门 */
        public c2s_guild_kick_member(role_id: Long): void {
            let msg: c2s_guild_kick_member = new c2s_guild_kick_member();
            msg.role_id = role_id;
            this.sendProto(msg);
        }

        /**一键捐献 */
        public c2s_guild_donate(): void {
            let msg: c2s_guild_donate = new c2s_guild_donate();
            this.sendProto(msg);
        }

        /**每日领取捐献奖励 */
        public c2s_guild_daily_reward(): void {
            let msg: c2s_guild_daily_reward = new c2s_guild_daily_reward();
            this.sendProto(msg);
        }

        /**打开福利大厅 */
        public c2s_guild_charge_ui(): void {
            let msg: c2s_guild_charge_ui = new c2s_guild_charge_ui();
            this.sendProto(msg);
        }

        /**福利大厅领取奖励 */
        public c2s_guild_get_charge_reward(role_id: Long, index: number): void {
            let msg: c2s_guild_get_charge_reward = new c2s_guild_get_charge_reward();
            msg.role_id = role_id;
            msg.index = index;
            this.sendProto(msg);
        }

        /**修改仙宗名 */
        public c2s_change_guild_name(name: string): void {
            let msg: c2s_change_guild_name = new c2s_change_guild_name();
            msg.name = name;
            this.sendProto(msg);
        }

        /**设置仙尊 */
        public c2s_set_guild_xianzong(role_id: Long): void {
            let msg: c2s_set_guild_xianzong = new c2s_set_guild_xianzong();
            msg.role_id = role_id;
            this.sendProto(msg);
        }

        /**打开仙尊秘宝请求 */
        public c2s_guild_mibao_ui(): void {
            let msg: c2s_guild_mibao_ui = new c2s_guild_mibao_ui();
            this.sendProto(msg);
        }

        /**兑换仙尊秘宝 */
        public c2s_guild_mibao_swap(index: number, count: number): void {
            let msg: c2s_guild_mibao_swap = new c2s_guild_mibao_swap();
            msg.index = index;
            msg.count = count;
            this.sendProto(msg);
        }

        /**聊天招募 */
        public c2s_guild_invita(channel_type: number = 2): void {
            let msg: c2s_guild_invita = new c2s_guild_invita();
            msg.channel_type = channel_type;
            this.sendProto(msg);
        }

        //--------------------二期-遗宝-斩妖-------------------
        /**1请求仙宗遗宝信息  2请求排行信息(params字段为1宗门排名 2个人排名)  3请求协助信息 */
        public c2s_guild_yibao_request(oper_type: number, params?: number): void {
            let msg: c2s_guild_yibao_request = new c2s_guild_yibao_request();
            msg.oper_type = oper_type;
            if (params) {
                msg.params = params;
            }
            this.sendProto(msg);
        }

        /**1单次挑战  2一键扫荡  3解锁宝箱  4开启宝箱   5邀请加速  6单个加速  7一键加速  8领取全民奖励 */
        public c2s_guild_yibao_click(button_type: number, params?: number, uid?: Long): void {
            let msg: c2s_guild_yibao_click = new c2s_guild_yibao_click();
            msg.button_type = button_type;
            if (params) {
                msg.params = params;
            }
            if (uid) {
                msg.u_id = uid;
            }
            this.sendProto(msg);
        }

        public c2s_guild_zhanyaotai_request(oper_type: number, params?: number): void {
            let msg: c2s_guild_zhanyaotai_request = new c2s_guild_zhanyaotai_request();
            msg.oper_type = oper_type;
            if (params) {
                msg.params = params;
            }
            this.sendProto(msg);
        }

        public c2s_guild_zhanyaotai_click(button_type: number, id?: Long, boss_index?: number): void {
            let msg: c2s_guild_zhanyaotai_click = new c2s_guild_zhanyaotai_click();
            msg.button_type = button_type;
            if (id) {
                msg.id = id;
            }
            if (boss_index) {
                msg.boss_index = boss_index;
            }
            this.sendProto(msg);
        }

        public c2s_guild_zhanyaotai_help_chat(id: Long): void {
            let msg: c2s_guild_zhanyaotai_help_chat = new c2s_guild_zhanyaotai_help_chat();
            msg.id = id;
            this.sendProto(msg);
        }

        //--------------------二期-遗宝-斩妖-------------------


        //--------------------三期-仓库-书斋-仙兽-------------------
        public c2s_guild_ware_show(): void {
            let msg: c2s_guild_ware_show = new c2s_guild_ware_show();
            this.sendProto(msg);
        }

        public c2s_guild_ware_oper(type: number, props: Long[]): void {
            let msg: c2s_guild_ware_oper = new c2s_guild_ware_oper();
            msg.type = type;
            msg.props = props;
            this.sendProto(msg);
        }

        public c2s_guild_ware_exchange(prop_index: Long): void {
            let msg: c2s_guild_ware_exchange = new c2s_guild_ware_exchange();
            msg.prop_index = prop_index;
            msg.count = 1;
            this.sendProto(msg);
        }

        public c2s_guild_auction_show(): void {
            let msg: c2s_guild_auction_show = new c2s_guild_auction_show();
            this.sendProto(msg);
        }

        public c2s_guild_auction_buy(id: Long): void {
            let msg: c2s_guild_auction_buy = new c2s_guild_auction_buy();
            msg.id = id;
            this.sendProto(msg);
        }

        public c2s_guild_baoku_show(): void {
            let msg: c2s_guild_baoku_show = new c2s_guild_baoku_show();
            this.sendProto(msg);
        }

        public c2s_guild_exchange_item(num: number): void {
            let msg: c2s_guild_exchange_item = new c2s_guild_exchange_item();
            msg.num = num;
            this.sendProto(msg);
        }

        public c2s_guild_baoku_buy(index: number, count: number): void {
            let msg: c2s_guild_baoku_buy = new c2s_guild_baoku_buy();
            msg.index = index;
            msg.count = count;
            this.sendProto(msg);
        }

        public c2s_guild_study_show(): void {
            let msg: c2s_guild_study_show = new c2s_guild_study_show();
            this.sendProto(msg);
        }

        public c2s_guild_study_oper(index: number): void {
            let msg: c2s_guild_study_oper = new c2s_guild_study_oper();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_guild_xianshou_show(): void {
            let msg: c2s_guild_xianshou_show = new c2s_guild_xianshou_show();
            this.sendProto(msg);
        }

        public c2s_guild_xianshou_up_level(): void {
            let msg: c2s_guild_xianshou_up_level = new c2s_guild_xianshou_up_level();
            this.sendProto(msg);
        }

        public c2s_guild_xianshou_receive(index: number): void {
            let msg: c2s_guild_xianshou_receive = new c2s_guild_xianshou_receive();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_guild_xianshou_rank_show(type: number): void {
            let msg: c2s_guild_xianshou_rank_show = new c2s_guild_xianshou_rank_show();
            msg.type = type;
            this.sendProto(msg);
        }

        //--------------------三期-仓库-书斋-仙兽-------------------

        //---------------------接收返回协议-----------------------

        /**宗门基本数据 */
        private s2c_ask_guild_info_ret(n: GameNT): void {
            let msg: s2c_ask_guild_info_ret = n.body;
            if (msg.header) {
                this._model.header = msg.header;
            }
            if (msg.info) {
                this._model.info = msg.info;
            }
            if (msg.xianzun) {
                this._model.hero = msg.xianzun;
            }
            this.sendNt(UnionEvent.ON_UPDATE_UNION_INFO);
        }

        /**下发宗门成员列表 */
        private s2c_ask_guild_member_ret(n: GameNT): void {
            let msg: s2c_ask_guild_member_ret = n.body;
            if (msg.member_list) {
                this._model.member_list = msg.member_list;
            }
            this.sendNt(UnionEvent.ON_UPDATE_MEMBER_LIST);
        }

        /**下发宗门列表 */
        private s2c_ask_guild_list_ret(n: GameNT): void {
            let msg: s2c_ask_guild_list_ret = n.body;
            this.onUpdateProto(msg);
            if (msg.guild_list) {
                this.sendNt(UnionEvent.ON_UPDATE_UNION_LIST);
            }
        }

        /**获取随机名字 */
        private s2c_random_guild_name_ret(n: GameNT): void {
            let msg: s2c_random_guild_name_ret = n.body;
            if (msg.name) {
                this._model.random_name = msg.name;
            }
            this.sendNt(UnionEvent.ON_UPDATE_UNION_NAME);
        }

        /**设置权限回调 */
        private s2c_set_guild_member_job_ret(n: GameNT): void {
            let msg: s2c_set_guild_member_job_ret = n.body;
            if (msg.target_info) {
                if (msg.target_info.guild_job == 0) {
                    this.onDeleteMember(this._model.member_list, msg.target_info);
                } else {
                    this.onUpdateMember(this._model.member_list, msg.target_info);
                }
            }
            if (msg.self_info && msg.self_info.role_id) {
                this.onUpdateMember(this._model.member_list, msg.self_info);
                this.sendNt(UnionEvent.ON_UPDATE_UNION_INFO);
            }
            this.sendNt(UnionEvent.ON_UPDATE_MEMBER_LIST);
        }

        /**玩家登录下发或者更新数据(维护个人宗门信息) */
        private s2c_guild_role_data(n: GameNT): void {
            let msg: s2c_guild_role_data = n.body;
            if (!msg.id) {
                this._model.show_welcome = true;
            }
            if (this._model.id != msg.id) {
                this._model.id = msg.id;
                this.sendNt(UnionEvent.ON_UPDATE_IN_UNION);
            }
            if (this._model.is_get_reward != msg.is_get_reward) {
                this._model.is_get_reward = msg.is_get_reward;
                this.sendNt(UnionEvent.ON_UPDATE_WAGE_BTN_INFO);
            }
            if (msg.shengtan_info) {
                this._model.shengtan_info = msg.shengtan_info;
            }
            this._model.apply_list = msg.apply_list || [];
            this._model.apply_record = msg.apply_record || [];
            if (msg.xianyu_count) {
                this._model.store_count = msg.xianyu_count;
            }
            if (msg.guild_lv) {
                this._model.union_level = msg.guild_lv;
            }
            this.onUpdateProto(msg);
            this.onUpdateHint();
            if (msg.apply_list) {
                this.sendNt(UnionEvent.ON_UPDATE_UNION_LIST);
            }
        }

        /**查看申请列表返回协议 */
        private s2c_ask_guild_apply_info_ret(n: GameNT): void {
            let msg: s2c_ask_guild_apply_info_ret = n.body;
            this._model.apply_info = msg.apply_info || [];
            this.sendNt(UnionEvent.ON_UPDATE_APPLY_LIST);
        }

        /**申请列表操作回调 */
        private s2c_agree_or_refuse_guild_ret(n: GameNT): void {
            let msg: s2c_agree_or_refuse_guild_ret = n.body;
            for (let i = 0; i < this._model.apply_record.length; i++) {
                let item = this._model.apply_record[i];
                if (item.eq(msg.info.role_id)) {
                    this._model.apply_record.splice(i, 1);
                }
            }
            this.onDeleteMember(this._model.apply_info, msg.info);
            this.onUpdateMember(this._model.member_list, msg.info);
            this.onUpdateHintApply();

            this.sendNt(UnionEvent.ON_UPDATE_APPLY_LIST);
            this.sendNt(UnionEvent.ON_UPDATE_MEMBER_LIST);
        }

        /**申请条件限制 */
        private s2c_guild_open_status_ret(n: GameNT): void {
            let msg: s2c_guild_open_status_ret = n.body;
            if (msg.condition) {
                this._model.info.condition = msg.condition;
            }
            this.sendNt(UnionEvent.ON_UPDATE_APPLY_LIMIT);
        }

        /**福利大厅 */
        private s2c_guild_charge_ui_ret(n: GameNT): void {
            let msg: s2c_guild_charge_ui_ret = n.body;
            if (msg.info) {
                this._model.mvp = msg.info;
            }
            if (msg.count) {
                this._model.mvp_count = msg.count;
            }
            this._model.charge_list = msg.list || [];
            this.onUpdateHintWelfare();
            this.sendNt(UnionEvent.ON_UPDATE_WELFARE_INFO);
        }

        private s2c_guild_donate_ret(n: GameNT): void {
            let msg: s2c_guild_donate_ret = n.body;
            this.onUpdateProto(msg);
            this.sendNt(UnionEvent.ON_UPDATE_UNION_INFO);
        }

        /**设置仙尊回调 */
        private s2c_set_guild_xianzong_ret(n: GameNT): void {
            let msg: s2c_set_guild_xianzong_ret = n.body;
            this.onUpdateMember(this._model.member_list, msg.old_info);
            this.onUpdateMember(this._model.member_list, msg.new_info);
            this.sendNt(UnionEvent.ON_UPDATE_SET_HERO_LIST);
        }

        /**仙尊秘宝 */
        private s2c_guild_mibao_ui_ret(n: GameNT): void {
            let msg: s2c_guild_mibao_ui_ret = n.body;
            if (msg.list) {
                this._model.hero_list = msg.list;
            }
            if (msg.info) {
                this._model.hero = msg.info;
            }
            this.sendNt(UnionEvent.ON_UPDATE_HERO_SHOP_INFO);
        }

        //---------------------------天坛/圣坛------------------------------

        /**
         * 天坛圣坛抽奖通用
         * @param mod_type 1.天坛 2.圣坛
         * @param type 1.单次 2.十连
         * */
        public c2s_guild_draw(mod_type: number, type: number): void {
            let msg: c2s_guild_draw = new c2s_guild_draw();
            msg.mod_type = mod_type;
            msg.type = type;
            this.sendProto(msg);
        }

        /**重置天坛奖励 */
        public c2s_guild_draw_reset(): void {
            let msg: c2s_guild_draw_reset = new c2s_guild_draw_reset();
            this.sendProto(msg);
        }

        /**打开天坛界面请求 */
        public c2s_guild_draw_open(): void {
            let msg: c2s_guild_draw_open = new c2s_guild_draw_open();
            this.sendProto(msg);
        }

        /**天坛数据 */
        private s2c_guild_draw_info(n: GameNT): void {
            let msg: s2c_guild_draw_info = n.body;
            if (msg.info) {
                this._model.info_tian = msg.info;
            }
            /**有抽奖数据发送抽奖事件 */
            if (msg.list && msg.list.length > 0) {
                this.sendNt(UnionEvent.ON_TWEEN_TIAN_LOTTERY_START, msg.list);
            } else {
                this.sendNt(UnionEvent.ON_UPDATE_TIAN_LOTTERY_INFO);
            }
        }

        /**打开圣坛界面请求 */
        public c2s_guild_shengtan_ui(): void {
            let msg: c2s_guild_shengtan_ui = new c2s_guild_shengtan_ui();
            this.sendProto(msg);
        }

        /**积分领取奖励 */
        public c2s_guild_shengtan_score_reward(index: number): void {
            let msg: c2s_guild_shengtan_score_reward = new c2s_guild_shengtan_score_reward();
            msg.index = index;
            this.sendProto(msg)
        }

        /**圣坛更新数据 */
        private s2c_guild_shengtan_info(n: GameNT): void {
            let msg: s2c_guild_shengtan_info = n.body;
            if (msg.info) {
                this._model.shengtan_info = msg.info;
            }
            if (msg.list) {
                this._model.list_sheng = msg.list;
            }
            this.sendNt(UnionEvent.ON_UPDATE_SHENG_LOTTERY_INFO);
        }

        /** */
        private s2c_guild_shengtan_ui_ret(n: GameNT): void {
            let msg: s2c_guild_shengtan_ui_ret = n.body;
            if (msg.draw_list) {
                this._model.list_sheng_run = msg.draw_list;
                this.sendNt(UnionEvent.ON_UPDATE_RUN_MESSAGE_INFO);
            }
            if (msg.item_list) {
                this._model.list_sheng = msg.item_list;
                this._model.list_len = msg.item_list.length;
            }
            if (msg.trigger_list) {
                this._model.list_sheng_reward = msg.trigger_list;
            }
            this.sendNt(UnionEvent.ON_UPDATE_SHENG_LOTTERY_INFO);
        }

        //---------------------------天坛/圣坛------------------------------

        //--------------------二期-遗宝-斩妖-------------------

        private s2c_guild_yibao_base_info(n: GameNT): void {
            let msg: s2c_guild_yibao_base_info = n.body;
            if (msg.boss_index) {
                this._model.boss_index = msg.boss_index;
                this._model.boss_hp = msg.boss_hp;
            }
            if (msg.task_list) {
                this._model.task_list = msg.task_list;
            }
            this._model.box_list = msg.box_list || [];
            this._model.task_rewards_status = msg.task_rewards_status || 0;
            this._model.recover_time = msg.recover_time && msg.recover_time.toNumber() || 0;
            this.onUpdateHintByTreasure();
            this.sendNt(UnionEvent.ON_UPDATE_TREASURE_INFO);
        }

        private s2c_guild_yibao_help(n: GameNT): void {
            let msg: s2c_guild_yibao_help = n.body;
            this._model.request_help_list = msg.request_help_list || [];
            this.sendNt(UnionEvent.ON_UPDATE_TREASURE_HELP_INFO);
        }

        private s2c_guild_zhanyaotai_info(n: GameNT): void {
            let msg: s2c_guild_zhanyaotai_info = n.body;
            this._model.my_boss_data = msg.my_boss_data || null;
            this._model.boss_mvp = msg.mvp || null;
            this._model.boss_list = msg.boss_list || [];
            this._model.limit_list = msg.list || [];
            this.onUpdateHintByKill();
            this.sendNt(UnionEvent.ON_UPDATE_KILL_INFO);
        }

        //--------------------二期-遗宝-斩妖-------------------

        //--------------------三期-仓库-书斋-仙兽-------------------
        private s2c_guild_ware_show(n: GameNT): void {
            let msg: s2c_guild_ware_show = n.body;
            if (msg.donate_logs) {
                this._model.donate_logs = msg.donate_logs;
            }
            if (msg.item_list) {
                this._model.item_list = msg.item_list;
                this._model.list_len = msg.item_list.length;
                this.setEquipList();
            }
            if (msg.guild_score) {
                this._model.guild_score = msg.guild_score;
            }
            this.sendNt(UnionEvent.ON_UPDATE_STORAGE_INFO);
        }

        private s2c_guild_ware_oper(n: GameNT): void {
            let msg: s2c_guild_ware_oper = n.body;
            if (msg.guild_score) {
                this._model.guild_score = msg.guild_score;
            }
        }

        private s2c_guild_ware_exchange(n: GameNT): void {
            let msg: s2c_guild_ware_exchange = n.body;
            if (msg.item) {
                let prop: PropData = PropData.create(msg.item.index);
                if (prop.type != ConfigHead.Equip || !!msg.item.count) {
                    for (let i in this._model.item_list) {
                        let item = this._model.item_list[i];
                        if (item.prop_id.eq(msg.item.prop_id)) {
                            this._model.item_list[i] = msg.item;
                        }
                    }
                } else {
                    this._model.item_list = this._model.item_list.filter(v => {
                        return !v.prop_id.eq(msg.item.prop_id);
                    })
                }
                this._model.list_len = this._model.item_list.filter(v => {
                    return !!v;
                }).length;
                this.setEquipList();
            }
            this.sendNt(UnionEvent.ON_UPDATE_STORAGE_INFO);
        }

        private s2c_guild_auction_show(n: GameNT): void {
            let msg: s2c_guild_auction_show = n.body;
            if (msg.list) {
                this._model.auction_list = msg.list;
            }
            this.sendNt(UnionEvent.ON_UPDATE_AUCTION_INFO);
        }

        private s2c_guild_auction_buy(n: GameNT): void {
            let msg: s2c_guild_auction_buy = n.body;
            if (msg.id) {
                this._model.auction_list = this._model.auction_list.filter(v => {
                    return v.id.toNumber() !== msg.id.toNumber();
                })
            }
            this.sendNt(UnionEvent.ON_UPDATE_AUCTION_INFO);
        }

        private s2c_guild_baoku_show(n: GameNT): void {
            let msg: s2c_guild_baoku_show = n.body;
            if (msg.list) {
                this._model.store_list = msg.list;
            }
            this.sendNt(UnionEvent.ON_UPDATE_STORE_INFO);
        }

        private s2c_guild_exchange_item(n: GameNT): void {
            let msg: s2c_guild_exchange_item = n.body;
            this._model.store_count = msg.count || 0;
        }

        private s2c_guild_baoku_buy(n: GameNT): void {
            let msg: s2c_guild_baoku_buy = n.body;
            for (let i in this._model.store_list) {
                if (this._model.store_list[i].index == msg.data.index) {
                    this._model.store_list[i] = msg.data;
                    this.sendNt(UnionEvent.ON_UPDATE_STORE_INFO);
                    return;
                }
            }
            this._model.store_list.push(msg.data);
            this.sendNt(UnionEvent.ON_UPDATE_STORE_INFO);
        }

        private s2c_guild_study_show(n: GameNT): void {
            let msg: s2c_guild_study_show = n.body;
            if (msg.list) {
                this._model.book_list = msg.list;
            }
            this.onUpdateHintByBook();
            this.sendNt(UnionEvent.ON_UPDATE_BOOK_INFO);
        }

        private s2c_guild_study_oper(n: GameNT): void {
            let msg: s2c_guild_study_oper = n.body;
            if (!msg.data) {
                return;
            }
            let data = msg.data;
            let index: number = this._model.book_list.findIndex(v => { return v.index == data.index });
            if (index > -1) {
                let book = this._model.book_list[index];
                if (book.stage != data.stage) {
                    let buff: number = this.getBuff(book.index);
                    let buff2: number = this.getBuff(book.index, true);
                    ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionBookUpTips2, { skillId: buff, lv: data.stage, skillId2: buff2 });
                } else if (book.level != data.level) {
                    ViewMgr.getIns().showSuccessTips(SuccessTipsType.Up);
                }
                this._model.book_list[index] = data;
            } else {
                this._model.book_list.push(data);
                let buff: number = this.getBuff(data.index);
                ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionBookUpTips, { skillId: buff, lv: data.stage });
            }
            this.onUpdateHintByBook();
            this.sendNt(UnionEvent.ON_UPDATE_BOOK_INFO);
        }

        private s2c_guild_xianshou_show(n: GameNT): void {
            let msg: s2c_guild_xianshou_show = n.body;
            if (msg.stage) {
                this._model.beast_stage = msg.stage;
            }
            if (msg.total_exp) {
                this._model.total_exp = msg.total_exp;
            }
            if (msg.week_rewards) {
                this._model.week_rewards = msg.week_rewards;
            }
            if (msg.base_attrs) {
                this._model.base_attrs = msg.base_attrs;
            }
            if (msg.extra_attrs) {
                this._model.extra_attrs = msg.extra_attrs;
            }
            this.onUpdateHintByBeastReward();
            this.sendNt(UnionEvent.ON_UPDATE_BEAST_INFO);
        }

        private s2c_guild_xianshou_update_exp(n: GameNT): void {
            let msg: s2c_guild_xianshou_update_exp = n.body;
            if (msg.stage) {
                this._model.beast_stage = msg.stage;
            }
            if (msg.total_exp) {
                this._model.total_exp = msg.total_exp;
            }
            if (msg.base_attrs) {
                this._model.base_attrs = msg.base_attrs;
            }
            if (msg.extra_attrs) {
                this._model.extra_attrs = msg.extra_attrs;
            }
            this.onUpdateHintByBeastReward();
            this.sendNt(UnionEvent.ON_UPDATE_BEAST_INFO);
        }

        private s2c_guild_xianshou_receive(n: GameNT): void {
            let msg: s2c_guild_xianshou_receive = n.body;
            if (msg.week_rewards) {
                this._model.week_rewards = msg.week_rewards;
            }
            this.onUpdateHintByBeastReward();
            this.sendNt(UnionEvent.ON_UPDATE_BEAST_REWARD_INFO);
        }


        //--------------------三期-仓库-书斋-仙兽-------------------

        //--------------------通用-排行榜-------------------
        public c2s_guild_type_rank_rewards(rank_type: number): void {
            let msg: c2s_guild_type_rank_rewards = new c2s_guild_type_rank_rewards();
            msg.rank_type = rank_type;
            this.sendProto(msg);
        }

        private s2c_guild_type_rank_list(n: GameNT): void {
            let msg: s2c_guild_type_rank_list = n.body;
            if (!msg || !msg.rank_type) {
                return;
            }
            let isGuild: boolean = msg.button_type == UnionRankType.Guild;
            switch (msg.rank_type) {
                case UnionRank.Treasure:
                    if (isGuild) {
                        this._model.guild_ranks = msg.all_ranks;
                        this._model.my_guild_rank = msg.my_rank;
                    } else {
                        this._model.person_ranks = msg.all_ranks;
                        this._model.my_rank = msg.my_rank;
                    }
                    this.sendNt(UnionEvent.ON_UPDATE_TREASURE_RANK_INFO);

                    this._model.last_rank_num = msg.last_rank_num || 0;
                    this._model.props = msg.props || [];
                    if (msg.last_rank_num && msg.props) {
                        HintMgr.setHint(true, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure, HintType.UnionRank]);
                    } else {
                        HintMgr.setHint(false, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure, HintType.UnionRank]);
                    }
                    break;
                case UnionRank.Kill:
                    if (isGuild) {
                        this._model.boss_guild_ranks = msg.all_ranks;
                        this._model.boss_my_guild_rank = msg.my_rank;
                    } else {
                        this._model.boss_person_ranks = msg.all_ranks;
                        this._model.boss_my_rank = msg.my_rank;
                    }
                    this.sendNt(UnionEvent.ON_UPDATE_KILL_RANK_INFO);

                    this._model.boss_last_rank_num = msg.last_rank_num || 0;
                    this._model.boss_props = msg.props || [];
                    if (msg.last_rank_num && msg.props) {
                        HintMgr.setHint(true, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill, HintType.UnionRank]);
                    } else {
                        HintMgr.setHint(false, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill, HintType.UnionRank]);
                    }
                    break;
                case UnionRank.Beast:
                    if (isGuild) {
                        this._model.beast_guild_ranks = msg.all_ranks;
                        this._model.beast_my_guild_rank = msg.my_rank;
                    } else {
                        this._model.beast_person_ranks = msg.all_ranks;
                        this._model.beast_my_rank = msg.my_rank;
                    }
                    this.sendNt(UnionEvent.ON_UPDATE_BEAST_RANK_INFO);

                    this._model.beast_last_rank_num = msg.last_rank_num || 0;
                    this._model.beast_props = msg.props || [];
                    if (msg.last_rank_num && msg.props) {
                        HintMgr.setHint(true, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, HintType.UnionRank]);
                    } else {
                        HintMgr.setHint(false, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, HintType.UnionRank]);
                    }
                    break;
            }
        }
        //--------------------通用-排行榜-------------------

        /**--------------------协议end-------------------- */

        public get open_fun(): string {
            return this._model.open_fun;
        }

        public set open_fun(v: string) {
            this._model.open_fun = v;
        }

        /**宗門等級 */
        public get union_level(): number {
            return this._model.info && this._model.info.level || this._model.union_level;
        }

        /**更新数据 */
        private onUpdateProto(s2c: any): void {
            for (let k in s2c) {
                this._model[k] = s2c[k];
                // if (this._model[k]) {
                // }
            }
        }

        private onDeleteMember(list: member_data[], info: member_data): void {
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (item.role_id.eq(info.role_id)) {
                    list.splice(i, 1);
                }
            }
        }

        public getDonateReward(cfg: game.config.GuildDonateConfig, index: number): number[][] {
            let reward1: number[] = cfg.donate_reward.find(v => {
                return v[2] == index;
            })
            let reward2: number[] = cfg.donate_exp.find(v => {
                return v[1] == index;
            })
            return [[reward1[0], reward1[1]], [1450000048, reward2[0]]];
        }

        private onUpdateMember(list: member_data[], info: member_data): void {
            if (info.guild_job === UnionJob.Leader) {
                this._model.header = info;
            }
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (item.role_id.eq(info.role_id)) {
                    list[i] = info;
                    return;
                }
            }
            list.push(info);
        }

        /**获取单个成员数据 */
        public getMemberById(id: Long): member_data {
            if (this._model.header.role_id.eq(id)) {
                return this._model.header
            }
            for (let member of this._model.member_list) {
                if (member.role_id.eq(id)) {
                    return member;
                }
            }
            return null;
        }

        /**职位文本 */
        public getJobTextByJob(job: number): string {
            return UnionJobStr[job];
        }

        /**获取申请限制条件 */
        public getApplyLimit(): function_data {
            return this._model.info.condition;
        }

        /**是否申请加入宗门 */
        public getApplyStatus(id: number): boolean {
            return this._model.apply_list.indexOf(id) > -1;
        }

        /**获取成员列表（排序） */
        public getMemberList(): member_data[] {
            return this._model.member_list.sort(this.sortByMember);
        }

        /**宗门列表（排序） */
        public getUnionList(): guild_data[] {
            return this._model.guild_list.sort(this.sortByUnion);
        }

        /**福利列表 */
        public getWelfareList(): guild_reward[] {
            return this._model.charge_list.sort(this.sortByWelfare);
        }

        /**圣坛更多大奖 */
        public getShengRewardList(): shengtai_data[] {
            return this._model.list_sheng_reward;
        }

        /**申请列表 */
        public getApplyList(): member_data[] {
            return this._model.apply_info;
        }

        /**是否有申请 */
        public get isApply(): boolean {
            let list = this._model.apply_record;
            return list && list.length > 0;
        }

        /**是否加入仙宗 */
        public get isInUnion(): boolean {
            return this._model.id && this._model.id != 0;
        }

        /**仙宗id */
        public get guild_id(): number {
            return this._model.id;
        }

        /**仙宗名字 */
        public get guild_name(): string {
            return this._model.info && this._model.info.guild_name || "";
        }

        public get guild_job(): number {
            return this._model.guild_job;
        }

        /**是否已经创建vip宗门 */
        public get isCreateVip(): boolean {
            return this._model.is_create;
        }

        /**退出宗门cd中 */
        public get isInCd(): boolean {
            return this._model.quit_cd > TimeMgr.time.serverTimeSecond;
        }

        /**根据创建宗门页面状态获取创建类型 */
        public getCreateType(status: string): number {
            return this._model.getCreateTypeByStatus[status];
        }

        /**判断是否仙尊（用于设置仙尊） */
        public checkHero(role_id: Long): boolean {
            if (this._model.hero) {
                return this._model.hero.role_id.eq(role_id);
            }
            return false;
        }

        /**是否设置仙尊 */
        public checkIsSetHero(): boolean {
            return this._model.hero && !!this._model.hero.role_id;
        }

        /**仙尊配置 */
        public getHeroList(): GuildMibaoConfig[] {
            let list: GuildMibaoConfig[] = [];
            for (let item of this._model.hero_list) {
                let cfg: GuildMibaoConfig = getConfigByNameId(ConfigName.GuildMiBao, item);
                list.push(cfg);
            }
            return list;
        }

        /**宗门排序 */
        private sortByUnion(a: guild_data, b: guild_data): number {
            if (a.level != b.level) {
                return b.level - a.level;
            }
            return +b.power - +a.power;
        }

        /**成员排序 */
        private sortByMember(a: member_data, b: member_data): number {
            if (a.is_online != b.is_online) {
                return a.is_online ? -1 : 1;
            }
            if (a.guild_job != b.guild_job) {
                return a.guild_job - b.guild_job;
            }
            return +b.power - +a.power;
        }

        /**福利大厅列表排序 */
        private sortByWelfare(a: guild_reward, b: guild_reward): number {

            let aCfg: GuildChargeConfig = getConfigByNameId(ConfigName.GuildCharge, a.index);
            let bCfg: GuildChargeConfig = getConfigByNameId(ConfigName.GuildCharge, b.index);

            if (a.state != b.state) {
                if (a.state == 1) {
                    return -1;
                } else {
                    return 1;
                }
            } else if (a.state == b.state) {
                return aCfg.charge_num - bCfg.charge_num;
            }

            return a.index - b.index;
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;

            if (keys.indexOf(PropIndexToKey[this.tian_cost[0]]) > -1) {
                this.onUpdateHintTian();
            }
            if (keys.indexOf(PropIndexToKey[this.sheng_cost[0]]) > -1) {
                this.onUpdateHintSheng();
            }
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;

            let book_cost_indexs = this.book_cost_indexs;
            for (let idxs of book_cost_indexs) {
                if (indexs.indexOf(idxs) > -1) {
                    this.onUpdateHintByBook();
                }
            }

            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, 1);
            for (let cost of cfg.cost) {
                if (indexs.indexOf(cost[0]) > -1) {
                    this.onUpdateHintByDonate();
                }
            }

            let yibao: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, this.boss_index);
            if (yibao && indexs.indexOf(yibao.boss_cost[0]) > -1) {
                this.onUpdateHintByTreasure();
            }

            let kill_boss_cost_index = this.kill_boss_cost_index;
            for (let idxs of kill_boss_cost_index) {
                if (indexs.indexOf(idxs) > -1) {
                    this.onUpdateHintByKill();
                }
            }
        }

        protected onBagUpdateByPropType(n: base.GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(PropType.Xianfa) > -1) {
                this.onUpdateHintByBook();
            }
        }

        /**更新红点 */
        private onUpdateHint(): void {
            if (!this.isInUnion) {
                return;
            }
            this.onUpdateHintApply();
            this.onUpdateHintWelfare();
            this.onUpdateHintWage();
            this.onUpdateHintTian();
            this.onUpdateHintSheng();
            this.onUpdateHintByDonate();
        }

        private onUpdateHintByDonate(): void {
            let roots: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, HintType.UnionDonate];
            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, 1);
            for (let cost of cfg.cost) {
                if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                    HintMgr.setHint(true, roots);
                    return;
                }
            }
            HintMgr.setHint(false, roots);
        }

        private onUpdateHintWage(): void {
            HintMgr.setHint(!this._model.is_get_reward, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, HintType.UnionWage]);
        }

        /**天坛红点 */
        private onUpdateHintTian(): void {
            let bool: boolean = BagUtil.checkPropCnt(this.tian_cost[0], this.tian_cost[1] * 9);
            HintMgr.setHint(bool, [...this._model.lottery_root, MdrTabBtnType.TabBtnType01]);
        }

        /**圣坛红点 */
        private onUpdateHintSheng(): void {
            let info = this._model.shengtan_info;
            if (info && info.list) {
                for (let item of info.list) {
                    if (item.state == 1) {
                        HintMgr.setHint(true, [...this._model.lottery_root, MdrTabBtnType.TabBtnType02]);
                        return;
                    }
                }
            }
            let bool: boolean = BagUtil.checkPropCnt(this.sheng_cost[0], this.sheng_cost[1] * 9);
            HintMgr.setHint(bool, [...this._model.lottery_root, MdrTabBtnType.TabBtnType02]);
        }

        /**福利大厅红点 */
        private onUpdateHintWelfare(): void {
            if (!this.isInUnion) {
                HintMgr.setHint(false, this._model.welfare_root);
                return;
            }
            for (let info of this._model.charge_list) {
                if (info.state == 1) {
                    HintMgr.setHint(true, this._model.welfare_root);
                    return;
                }
            }
            HintMgr.setHint(false, this._model.welfare_root);
        }

        /**有申请列表红点 */
        private onUpdateHintApply(): void {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._model.guild_job);
            /**有操作权限 */
            let isOper: boolean = cfg && cfg.agree_join == 1;
            if (this.isInUnion && isOper) {
                HintMgr.setHint(this.isApply, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType02]);
            } else {
                HintMgr.setHint(false, [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType02]);
            }
        }

        //------------------天坛/圣坛----------------------------

        /**是否重置 */
        public get isReset(): boolean {
            let round: number = this._model.info_tian.stage;
            let cfgMap = getConfigByNameId(ConfigName.GuildDraw, round);
            for (let k in cfgMap) {
                let cfg: GuildDrawConfig = cfgMap[k];
                let count: number = this.getTianCount(cfg.index);
                if (cfg.num !== count) {
                    return false;
                }
            }
            return true;
        }

        /**
         * 当前奖励已抽次数
         * GuildDrawConfig配置
         * */
        public getTianCount(index: number): number {
            if (!this._model.info_tian || !this._model.info_tian.list) {
                return 0;
            }
            for (let item of this._model.info_tian.list) {
                if (item.index == index) {
                    return item.count;
                }
            }
            return 0;
        }

        /**获取圣坛大奖数据 */
        public getShengInfo(index: number): shengtai_data {
            return this._model.list_sheng[index] || null;
        }

        public getShengFixReward(): ShengtanItemConfig[] {
            let cfgArr: ShengtanItemConfig[] = getConfigListByName(ConfigName.ShengtanItem);
            return cfgArr.filter(v => {
                return v.item_type == 1 && v.reward_type == 2;
            });
        }

        /**圣坛抽奖次数 */
        public getShengCount(): number {
            return this._model.shengtan_info && this._model.shengtan_info.count || 0;
        }

        /**圣坛积分礼包数据 */
        public getShengStatus(index: number): guild_reward {
            if (!this._model.shengtan_info || !this._model.shengtan_info.list) {
                return null;
            }
            for (let info of this._model.shengtan_info.list) {
                if (info.index == index) {
                    return info;
                }
            }
            return null;
        }

        /**天坛单次消耗 */
        public get tian_cost(): number[] {
            if (!this._model.tian_cost) {
                let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_draw_cost");
                this._model.tian_cost = cfg.value;
            }
            return this._model.tian_cost;
        }

        /**圣坛单次消耗 */
        public get sheng_cost(): number[] {
            if (!this._model.sheng_cost) {
                let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_shengtan_cost");
                this._model.sheng_cost = cfg.value;
            }
            return this._model.sheng_cost;
        }

        public getTipsByType(type: number): string {
            return this._model.getTipsByType[type];
        }

        //------------------天坛/圣坛----------------------------

        //--------------------二期-遗宝-斩妖-------------------
        public get guild_exchange_num(): number {
            if (!this._model.guild_exchange_num) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_exchange_num");
                this._model.guild_exchange_num = param.value;
            }
            return this._model.guild_exchange_num;
        }

        public get box_list(): guild_yibao_box_struct[] {
            if (!this._model.box_list || !this._model.box_list.length) {
                return [];
            }
            let list: guild_yibao_box_struct[] = [];
            for (let info of this._model.box_list) {
                list.push(info);
            }
            return list;
        }

        public get boss_index(): number {
            return this._model.boss_index;
        }

        public get boss_hp(): number {
            return this._model.boss_hp || 0;
        }

        public getRankList(type: number, open_fun: string = this.open_fun): RankRewardRenderData[] {
            let ranks = this.getRanks(type, open_fun);
            let cfgArr: GuildYibaoRankConfig[] = getConfigListByName(ConfigName.GuildYibaoRank);
            let list: RankRewardRenderData[] = [];
            let isGuild: boolean = type == UnionRankType.Guild;
            for (let cfg of cfgArr) {
                let start: number = cfg.ranks[0];
                let end: number = cfg.ranks[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankName(item, type, open_fun);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: isGuild ? cfg.rewards : []
                    })
                } else {
                    let more: boolean = start > MAX_RANK_NUM
                    let rank: string = more ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: Handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRankTips, { rank, type })
                    })
                    list.push({
                        rank,
                        name: "",
                        reward: isGuild ? cfg.rewards : [],
                        param: type,
                        lookHandler: !more && lookHandler
                    })
                }
            }
            return list;
        }

        public getRankStr(type: number): string {
            let info = this.getMyRank(type);
            let isGuild: boolean = type == UnionRankType.Guild;
            if (!info || !info.rank_num) {
                if (isGuild) {
                    let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_yibao_paiming1");
                    return StringUtil.substitute(getLanById(LanDef.guild_tips19), [param.value]);
                } else {
                    let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_yibao_paiming2");
                    return StringUtil.substitute(getLanById(LanDef.guild_tips20), [param.value]);
                }
            } else {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let content: string = isGuild ? getLanById(LanDef.xianzong_tips8) : getLanById(LanDef.compete_mars_4);
                return StringUtil.substitute(content, [str]);
            }
        }

        public getRankCountStr(type: number): string {
            let info = this.getMyRank(type);
            let isGuild: boolean = type == UnionRankType.Guild;
            let content: string = isGuild ? getLanById(LanDef.guild_tips21) : getLanById(LanDef.guild_tips22);
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return StringUtil.substitute(content, [str]);
        }

        public get help_list(): guild_yibao_help_struct[] {
            return this._model.request_help_list || [];
        }

        public getTask(index: number): guild_yibao_task_struct {
            if (!this._model.task_list || !this._model.task_list.length) {
                return null;
            }
            for (let task of this._model.task_list) {
                if (task.task_index == index) {
                    return task;
                }
            }
            return null;
        }

        public getTaskReward(): boolean {
            if (this._model.task_rewards_status == 1) {
                return false;
            }
            let cfgArr: GuildYibaoTaskConfig[] = getConfigListByName(ConfigName.GuildYibaoTask);
            for (let cfg of cfgArr) {
                let task = this.getTask(cfg.index);
                if (!task || task.step < cfg.target_num) {
                    return false;
                }
            }
            return true;
        }

        public get vip_boss(): GuildZhanyaotaiConfig {
            let cfgArr: GuildZhanyaotaiConfig[] = getConfigListByName(ConfigName.GuildZhanyaotai);
            for (let cfg of cfgArr) {
                if (cfg.vip_limit) {
                    return cfg;
                }
            }
            return null;
        }

        public get boss_mvp(): teammate {
            return this._model.boss_mvp || null;
        }

        public get boss_data(): guild_zhanyaotai_boss_struct {
            return this._model.my_boss_data || null;
        }

        public get boss_list(): guild_zhanyaotai_boss_struct[] {
            return this._model.boss_list || [];
        }

        public get recover_time(): number {
            return this._model.recover_time || 0;
        }

        public getSummonCount(index: number): number {
            if (!this._model.limit_list || !this._model.limit_list.length) {
                return 0;
            }
            for (let info of this._model.limit_list) {
                if (info.index == index) {
                    return info.count;
                }
            }
            return 0;
        }

        public getBossRankList(type: number): RankRewardRenderData[] {
            let ranks = this.getRanks(type, UnionMainType.UnionKill);
            let cfgArr: GuildZhanyaotaiRankConfig[] = getConfigListByName(ConfigName.GuildZhanyaotaiRank);
            let list: RankRewardRenderData[] = [];
            let isGuild: boolean = type == UnionRankType.Guild;
            for (let cfg of cfgArr) {
                let start: number = cfg.ranks[0];
                let end: number = cfg.ranks[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankName(item, type, this.open_fun);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: isGuild ? cfg.rewards : []
                    })
                } else {
                    let more: boolean = start > MAX_RANK_NUM
                    let rank: string = more ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: Handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRankTips, { rank, type })
                    })
                    list.push({
                        rank,
                        name: "",
                        reward: isGuild ? cfg.rewards : [],
                        param: type,
                        lookHandler: !more && lookHandler
                    })
                }
            }
            return list;
        }

        public getBossRankStr(type: number): string {
            let info = this.getMyRank(type);
            if (type == UnionRankType.Guild) {
                if (!info || !info.rank_num) {
                    let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_zhanyao_paiming1");
                    return StringUtil.substitute(getLanById(LanDef.guild_tips18), [param.value]);
                }
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                return StringUtil.substitute(getLanById(LanDef.xianzong_tips8), [str]);
            } else {
                let str: string = TextUtil.addColor(`${info && info.rank_num || getLanById(LanDef.tishi_13)}`, WhiteColor.GREEN);
                return StringUtil.substitute(getLanById(LanDef.compete_mars_4), [str]);
            }
        }

        public getBossRankCountStr(type: number): string {
            let info = this.getMyRank(type);
            let content: string = "";
            if (type == UnionRankType.Guild) {
                content = getLanById(LanDef.guild_tips16);
            } else {
                content = getLanById(LanDef.guild_tips17);
            }
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return StringUtil.substitute(content, [str]);
        }

        public get recycle_oper(): boolean {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._model.guild_job);
            return cfg && !!cfg.recover_ware_item;
        }

        /**遗宝红点 */
        public onUpdateHintByTreasure(): void {
            let root: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure];
            let cfg: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, this.boss_index);
            if (BagUtil.checkPropCnt(cfg.boss_cost[0], cfg.boss_cost[1])) {
                HintMgr.setHint(true, root);
                return;
            }
            if (this._model.box_list && this._model.box_list.length) {
                for (let info of this._model.box_list) {
                    let bool: boolean = this.getBoxHint(info);
                    if (bool) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                }
            }
            // let cfgArr: GuildYibaoTaskConfig[] = getConfigListByName(ConfigName.GuildYibaoTask);
            // let bool: boolean = true;
            // for (let cfg of cfgArr) {
            //     let task = this.getTask(cfg.index);
            //     if (task.step < cfg.target_num) {
            //         bool = false;
            //         break;
            //     }
            // }
            // if (bool) {
            //     HintMgr.setHint(!this._model.task_rewards_status, root);
            //     return;
            // }
            let bool: boolean = this.getTaskHint();
            if (bool) {
                HintMgr.setHint(true, root);
                return;
            }
            HintMgr.setHint(false, root);
        }

        public getTaskHint(): boolean {
            let cfgArr: GuildYibaoTaskConfig[] = getConfigListByName(ConfigName.GuildYibaoTask);
            for (let cfg of cfgArr) {
                let task = this.getTask(cfg.index);
                if (task.step < cfg.target_num) {
                    return false;
                }
            }
            return !this._model.task_rewards_status;
        }

        public getBoxHint(info: guild_yibao_box_struct): boolean {
            // let cfg: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, info.boss_index);
            // if (ViewMgr.getIns().checkLv(cfg.limit_vip)) {
            //     return true;
            // } else {
            //     if (info.time && TimeMgr.time.serverTimeSecond >= info.time.toNumber()) {
            //         return true;
            //     }
            // }
            if (info && info.hasOwnProperty("count")) {
                return false;
            }
            return true;
        }

        private onUpdateHintByKill(): void {
            let roots: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill];
            let zhaohuan_hint: boolean = this.getZhaohuanHint();
            if (zhaohuan_hint) {
                HintMgr.setHint(true, roots);
                return;
            }

            let my_boss_hint = this.getMyBossHint();
            if (my_boss_hint) {
                HintMgr.setHint(true, roots);
                return;
            }

            let boss_list_hint: boolean = this.getBossListHint();
            if (boss_list_hint) {
                HintMgr.setHint(true, roots);
                return;
            }

            HintMgr.setHint(false, roots);
        }

        public getMyBossHint(): boolean {
            if (!this.boss_data) {
                return false;
            }
            if (!this.boss_data.boss_hp) {
                return true;
            } else {
                let cfg: GuildZhanyaotaiConfig = getConfigByNameId(ConfigName.GuildZhanyaotai, this.boss_data.index);
                let cost = cfg.atk_cost[0];
                return BagUtil.checkPropCnt(cost[0], cost[1]);
            }
        }

        public getZhaohuanHint(): boolean {
            let cfgArr: GuildZhanyaotaiConfig[] = getConfigListByName(ConfigName.GuildZhanyaotai);
            for (let cfg of cfgArr) {
                if (cfg.costs && cfg.costs[0][0] == PropIndex.Xianyu) {
                    continue;
                }
                if (cfg.vip_limit > 0) {
                    if (cfg.count && this.getSummonCount(cfg.index) >= cfg.count) {
                        return true;
                    }
                } else {
                    if (BagUtil.checkPropCnt(cfg.costs[0][0], cfg.costs[0][1])) {
                        return true;
                    }
                }
            }
            return false;
        }

        public getBossListHint(): boolean {
            let boss_list = this._model.boss_list;
            if (!boss_list) {
                return false;
            }
            for (let boss of boss_list) {
                // if (!boss.boss_hp) {
                //     return true;
                // } else {
                //     let cfg: GuildZhanyaotaiConfig = getConfigByNameId(ConfigName.GuildZhanyaotai, boss.index);
                //     return BagUtil.checkPropCnt(cfg.atk_cost[0][0], cfg.atk_cost[0][1]);
                // }
                let bool: boolean = this.getBossHint(boss);
                if (bool) {
                    return true;
                }
            }
            return false;
        }

        public getBossHint(boss: guild_zhanyaotai_boss_struct): boolean {
            if (!boss.boss_hp) {
                return true;
            } else {
                let cfg: GuildZhanyaotaiConfig = getConfigByNameId(ConfigName.GuildZhanyaotai, boss.index);
                if (BagUtil.checkPropCnt(cfg.atk_cost[0][0], cfg.atk_cost[0][1])) {
                    return true;
                }
            }
            return false;
        }

        public get xianzong_yibao_jiasu_shangxian(): number {
            if (!this._model.xianzong_yibao_jiasu_shangxian) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianzong_yibao_jiasu_shangxian");
                this._model.xianzong_yibao_jiasu_shangxian = param.value;
            }
            return this._model.xianzong_yibao_jiasu_shangxian;
        }

        public get kill_boss_cost_index(): number[] {
            if (!this._model.kill_boss_cost_index) {
                this._model.kill_boss_cost_index = [];
                let cfgArr: GuildZhanyaotaiConfig[] = getConfigListByName(ConfigName.GuildZhanyaotai);
                for (let cfg of cfgArr) {
                    if (cfg.atk_cost) {
                        for (let cost of cfg.atk_cost) {
                            if (this._model.kill_boss_cost_index.indexOf(cost[0]) == -1) {
                                this._model.kill_boss_cost_index.push(cost[0]);
                            }
                        }
                    }
                    if (cfg.costs) {
                        for (let cost of cfg.costs) {
                            if (this._model.kill_boss_cost_index.indexOf(cost[0]) == -1) {
                                this._model.kill_boss_cost_index.push(cost[0]);
                            }
                        }
                    }
                }
            }
            return this._model.kill_boss_cost_index;
        }

        //--------------------二期-遗宝-斩妖-------------------

        //--------------------三期-仓库-书斋-仙兽-------------------
        public get max_boxs(): number {
            if (this._model.max_boxs) {
                return this._model.max_boxs;
            }
            let cfg: ParamConfig = GameConfig.getParamConfigById("guild_ware_num");
            this._model.max_boxs = cfg.value;
            return this._model.max_boxs;
        }

        public get residue_boxs(): number {
            return this.max_boxs - this._model.list_len;
        }

        public get guild_score(): number {
            return this._model.guild_score;
        }

        public getStoreData(index: number): number {
            if (!this._model.store_list) {
                return 0;
            }
            for (let data of this._model.store_list) {
                if (data.index == index) {
                    return data.count;
                }
            }
            return 0;
        }

        public getBookInfo(index: number): guild_study_data {
            return this._model.book_list.find(v => {
                return v.index == index;
            })
        }

        public getBuff(index: number, before: boolean = false): number {
            let info = this.getBookInfo(index);
            let stage: number = info && info.stage || 0;
            let buff_index: number = !stage ? 0 : stage - 1;
            let cfg: GuildStudyConfig = getConfigByNameId(ConfigName.GuildStudy, index);
            if (cfg && cfg.break_property) {
                if (before) {
                    buff_index && buff_index--;
                }
                return cfg.break_property[buff_index];
            }
            return 0;
        }

        public getCost(index: number): number[] {
            let info = this.getBookInfo(index);
            let stage: number = info && info.stage || 0;
            let level: number = info && info.level || 0;
            let cfg: GuildStudyConfig = getConfigByNameId(ConfigName.GuildStudy, index);
            if (!info) {
                return cfg.break_item[stage];
            } else {
                if (level == 10) {
                    return cfg.break_item[stage];
                } else {
                    let cfgs = getConfigByNameId(ConfigName.GuildStudyLevel, index);
                    for (let i in cfgs) {
                        let cfgi: GuildStudyLevelConfig = cfgs[i];
                        if (cfgi && cfgi.splevel == stage) {
                            return cfgi.grade_item[level];
                        }
                    }
                }
            }
            return [];
        }

        public get beast_stage(): number {
            return this._model.beast_stage || 0;
        }

        public get total_exp(): number {
            return this._model.total_exp || 0;
        }

        /**仙兽操作权限 */
        public get beast_oper(): boolean {
            let cfg: GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, this._model.guild_job);
            return cfg && !!cfg.xiaoshou_up_level;
        }

        public getExtraAttrJob(): string {
            let jobs: string = "";
            let cfgArr: GuildJobDataConfig[] = getConfigListByName(ConfigName.GuildJobData);
            for (let cfg of cfgArr) {
                if (!!cfg.xiaoshou_attr) {
                    jobs += `${(!!jobs.length ? "," : "") + UnionJobStr[cfg.index]}`;
                }
            }
            return jobs;
        }

        public get base_attrs(): attributes {
            return this._model.base_attrs || null;
        }

        public get extra_attrs(): attributes {
            return this._model.extra_attrs || null;
        }

        public getRewardStatus(index: number): boolean {
            return this._model.week_rewards.indexOf(index) > -1;
        }

        public getRewardState(index: number): number {
            let bool: boolean = this.getRewardStatus(index);
            let cnt: number = BagUtil.getPropCntByIdx(PropIndex.GuildXianshouExp);
            let cfg: GuildXianshouTargetConfig = getConfigByNameId(ConfigName.GuildXianshouTarget, index);
            if (cfg.score > cnt) {
                return RewardStatus.NotFinish;
            } else if (bool) {
                return RewardStatus.Draw;
            } else {
                return RewardStatus.Finish;
            }
        }

        public getBeastRankStr(type: number): string {
            let info: teammate = this.getMyRank(type);
            if (!info || !info.rank_num) {
                let param: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_xianshou_rank");
                if (type == UnionRankType.Guild) {
                    return StringUtil.substitute(getLanById(LanDef.guild_tips13), [param.value[1]]);
                } else {
                    return StringUtil.substitute(getLanById(LanDef.guild_tips14), [param.value[0]]);
                }
            } else {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let content: string = ""
                if (type == UnionRankType.Guild) {
                    content = getLanById(LanDef.xianzong_tips8)
                } else {
                    content = getLanById(LanDef.compete_mars_4)
                }
                return StringUtil.substitute(content, [str]);
            }
        }

        public getBeastRankCountStr(type: number): string {
            let info: teammate = this.getMyRank(type);
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return `仙兽经验：${str}`;
        }

        public getBeastTask(task_id: number): GuildXianshouTaskConfig {
            let cfgArr: GuildXianshouTaskConfig[] = getConfigListByName(ConfigName.GuildXianshouTask);
            let list = cfgArr.filter(v => {
                return v.task_list.indexOf(task_id) > -1;
            });
            return list && list[0];
        }

        public setEquipList(): void {
            this._model.equip_map.clear();
            for (let data of this._model.item_list) {
                if (!data) {
                    return;
                }
                let prop: PropData = PropData.create(data.index);
                prop.update(data);
                if (prop.propType != EquipPropType.RoleEquip || prop.type != ConfigHead.Equip) {
                    continue;
                }
                let cfg: EquipmentConfig = prop.cfg;
                let rebirth = RoleUtil.getRebirthLv(cfg.rebirth_limit);
                let stage = cfg.equip_lv || 0;
                let key: string = `${rebirth}-${stage}`;
                if (this._model.equip_map.has(key)) {
                    let list: PropData[] = this._model.equip_map.get(key);
                    list.push(prop);
                } else {
                    this._model.equip_map.set(key, [prop]);
                }
            }
        }

        public getEquipKeyValue1(): UnionSelectData[] {
            let list: UnionSelectData[] = [UnionSelectDefault];
            let keys: string[] = Array.from(this._model.equip_map.keys());
            for (let key of keys) {
                list.push({ key, value: this.getEquipString(key) });
            }
            return list;
        }

        public getEquipKeyValue2(key: string): UnionSelectData[] {
            let list: UnionSelectData[] = [UnionSelectDefault];
            let props: PropData[] = [];
            if (key == "0") {
                let values = Array.from(this._model.equip_map.values());
                for (let i in values) {
                    let value = values[i];
                    props.push(...value);
                }
            } else {
                props = Array.from(this._model.equip_map.get(key));
            }
            let keys: number[] = [];
            for (let prop of props) {
                if (keys.indexOf(prop.quality) == -1) {
                    keys.push(prop.quality);
                    list.push({ key: `${prop.quality}`, value: ColorUtil.getColorChineseStrByQua2(prop.quality) })
                }
            }
            return list;
        }

        public getEquipString(str: string): string {
            let s: string[] = str.split("-");
            if (s.length > 1) {
                if (+s[0] == 0) {
                    s[0] = "50级";
                } else {
                    s[0] = `${s[0]}转`;
                }
                s[1] = `${s[1]}阶`;
                str = s.join("-");
            }
            return str;
        }

        public getEquioList(key: string, quality: string): PropData[] {
            let props: PropData[] = [];
            if (key == "0") {
                let values = Array.from(this._model.equip_map.values());
                for (let i in values) {
                    let value = values[i];
                    props.push(...value);
                }
            } else {
                props = Array.from(this._model.equip_map.get(key));
            }
            if (quality == "0") {
                return props;
            }
            return props.filter(v => {
                return v.quality == +quality;
            })
        }

        public getBeastRankList(type: number): RankRewardRenderData[] {
            let ranks = this.getRanks(type, UnionMainType.UnionBeast);
            let cfgArr: GuildXianshouRankConfig[] = getConfigListByName(ConfigName.GuildXianshouRank);
            let list: RankRewardRenderData[] = [];
            let isGuild: boolean = type == UnionRankType.Guild;
            for (let cfg of cfgArr) {
                let start: number = cfg.rank_no[0];
                let end: number = cfg.rank_no[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankName(item, type);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: isGuild ? cfg.reward : []
                    })
                } else {
                    let more: boolean = start > MAX_RANK_NUM;
                    let rank: string = more ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: Handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionRankTips, { rank, type })
                    })
                    list.push({
                        rank,
                        name: "",
                        reward: isGuild ? cfg.reward : [],
                        param: type,
                        lookHandler: !more && lookHandler
                    })
                }
            }
            return list;
        }

        public getBookRoots(index: number): string[] {
            let roots: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBook, MdrTabBtnType.TabBtnType01];
            let type: string = `${index < 10 ? "0" : ""}${index}`;
            return [...roots, type];
        }

        private onUpdateHintByBook(): void {
            let cfgArr: GuildStudyConfig[] = getConfigListByName(ConfigName.GuildStudy);
            for (let cfg of cfgArr) {
                let root = this.getBookRoots(cfg.index);
                if (cfg.activate_condition > this.union_level) {
                    HintMgr.setHint(false, root);
                    break;
                }
                let cost: number[] = this.getCost(cfg.index);
                if (!cost) {
                    HintMgr.setHint(false, root);
                    continue;
                }
                let bool: boolean = BagUtil.checkPropCnt(cost[0], cost[1]);
                HintMgr.setHint(bool, root);
            }
        }

        private get book_cost_indexs(): number[] {
            if (this._model.book_cost_idxs && this._model.book_cost_idxs.length) {
                return this._model.book_cost_idxs;
            }
            let cfgArr: GuildStudyConfig[] = getConfigListByName(ConfigName.GuildStudy);
            for (let cfg of cfgArr) {
                let cfgs = getConfigByNameId(ConfigName.GuildStudyLevel, cfg.index);
                for (let i in cfgs) {
                    for (let key in cfgs[i].grade_item) {
                        let idx = cfgs[i].grade_item[key][0];
                        if (this._model.book_cost_idxs.indexOf(idx) == -1) {
                            this._model.book_cost_idxs.push(idx);
                        }
                    }
                }
                for (let i in cfg.break_item) {
                    let idx = cfg.break_item[i][0];
                    if (this._model.book_cost_idxs.indexOf(idx) == -1) {
                        this._model.book_cost_idxs.push(idx);
                    }
                }
            }
            return this._model.book_cost_idxs;
        }

        public onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.UnionBeast) > -1) {
                this.onUpdateHintByBeast();
            }
        }

        private onUpdateHintByBeast(): void {
            this.onUpdateHintByBeastReward();

            let roots: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast, HintType.UnionBeastTask];
            let tasks: task_data[] = TaskUtil.getTaskList(TaskType.UnionBeast);
            for (let task of tasks) {
                let bool = TaskUtil.canRewardDraw(task);
                if (bool) {
                    HintMgr.setHint(bool, roots);
                    return;
                }
            }
            HintMgr.setHint(false, roots);
        }

        private onUpdateHintByBeastReward(): void {
            let roots: string[] = [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast];

            if (this.beast_oper) {
                let cfg: GuildXianshouConfig = getConfigByNameId(ConfigName.GuildXianshou, this.beast_stage + 1);
                let bool: boolean = cfg && this.total_exp >= cfg.score;
                HintMgr.setHint(bool, [...roots, HintType.UnionBeastUp]);
            }

            let cfgArr: GuildXianshouTargetConfig[] = getConfigListByName(ConfigName.GuildXianshouTarget);
            for (let cfg of cfgArr) {
                if (this.getRewardState(cfg.index) == RewardStatus.Finish) {
                    HintMgr.setHint(true, [...roots, HintType.UnionBeastReward]);
                    return;
                }
            }
            HintMgr.setHint(false, [...roots, HintType.UnionBeastReward]);
        }

        //--------------------三期-仓库-书斋-仙兽-------------------


        //--------------------排行榜数据-------------------

        public getRanks(type: number, open_fun: string = this.open_fun): teammate[] {
            let isGuild: boolean = type == UnionRankType.Guild;
            switch (open_fun) {
                case UnionMainType.UnionTreasure:
                    return isGuild ? this._model.guild_ranks : this._model.person_ranks;
                case UnionMainType.UnionKill:
                    return isGuild ? this._model.boss_guild_ranks : this._model.boss_person_ranks;
                case UnionMainType.UnionBeast:
                    return isGuild ? this._model.beast_guild_ranks : this._model.beast_person_ranks;
                default:
                    return [];
            }
        }

        public getMyRank(type: number, open_fun: string = this.open_fun): teammate {
            let isGuild: boolean = type == UnionRankType.Guild;
            switch (open_fun) {
                case UnionMainType.UnionTreasure:
                    return isGuild ? this._model.my_guild_rank : this._model.my_rank;
                case UnionMainType.UnionKill:
                    return isGuild ? this._model.boss_my_guild_rank : this._model.boss_my_rank;
                case UnionMainType.UnionBeast:
                    return isGuild ? this._model.beast_my_guild_rank : this._model.beast_my_rank;
                default:
                    return null;
            }
        }

        public getRankName(item: teammate, type: number, open_fun: string = this.open_fun): string {
            if (!item) {
                return getLanById(LanDef.tishi_2);
            }
            let isGuild: boolean = type == UnionRankType.Guild;
            return isGuild ? StringUtil.substitute(getLanById(LanDef.guild_tips15), [item.guild_name, item.name]) : item.name;
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getRankSection(rank: string, type: number, open_fun: string = this.open_fun): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: teammate[] = this.getRanks(type, open_fun);
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                let name: string = this.getRankName(item, type, open_fun);
                if (item) {
                    list.push({ rank: item.rank_num, name, value: +item.value });
                } else {
                    list.push({ rank: i + 1, name, value: 0 });
                }
            }
            return list;
        }

        getLastRank(type: number): number {
            switch (type) {
                case UnionRank.Treasure:
                    return this._model.last_rank_num;
                case UnionRank.Kill:
                    return this._model.boss_last_rank_num;
                case UnionRank.Beast:
                    return this._model.beast_last_rank_num;
                case UnionRank.Fengmo:
                    let fengmo = getProxy(ModName.More, ProxyType.Fengmo);
                    return fengmo["last_rank_num"];
            }
            return 0;
        }

        getRankProps(type: number): prop_tips_data[] {
            switch (type) {
                case UnionRank.Treasure:
                    return this._model.props;
                case UnionRank.Kill:
                    return this._model.boss_props;
                case UnionRank.Beast:
                    return this._model.beast_props;
                case UnionRank.Fengmo:
                    let fengmo = getProxy(ModName.More, ProxyType.Fengmo);
                    return fengmo["props"];
            }
            return [];
        }

        //--------------------排行榜数据-------------------
    }
}