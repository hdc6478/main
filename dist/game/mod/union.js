var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var c2s_ask_guild_info = msg.c2s_ask_guild_info;
            var c2s_ask_guild_member = msg.c2s_ask_guild_member;
            var c2s_ask_guild_list = msg.c2s_ask_guild_list;
            var c2s_quit_guild = msg.c2s_quit_guild;
            var c2s_set_guild_member_job = msg.c2s_set_guild_member_job;
            var s2c_ask_guild_info_ret = msg.s2c_ask_guild_info_ret;
            var s2c_ask_guild_member_ret = msg.s2c_ask_guild_member_ret;
            var s2c_ask_guild_list_ret = msg.s2c_ask_guild_list_ret;
            var c2s_create_guild = msg.c2s_create_guild;
            var c2s_guild_open_status = msg.c2s_guild_open_status;
            var c2s_random_guild_name = msg.c2s_random_guild_name;
            var s2c_random_guild_name_ret = msg.s2c_random_guild_name_ret;
            var s2c_set_guild_member_job_ret = msg.s2c_set_guild_member_job_ret;
            var s2c_guild_role_data = msg.s2c_guild_role_data;
            var c2s_ask_guild_apply_info = msg.c2s_ask_guild_apply_info;
            var s2c_ask_guild_apply_info_ret = msg.s2c_ask_guild_apply_info_ret;
            var c2s_agree_or_refuse_guild = msg.c2s_agree_or_refuse_guild;
            var s2c_agree_or_refuse_guild_ret = msg.s2c_agree_or_refuse_guild_ret;
            var c2s_choice_apply_guild = msg.c2s_choice_apply_guild;
            var c2s_guild_kick_member = msg.c2s_guild_kick_member;
            var s2c_guild_open_status_ret = msg.s2c_guild_open_status_ret;
            var TimeMgr = base.TimeMgr;
            var c2s_guild_donate = msg.c2s_guild_donate;
            var c2s_guild_daily_reward = msg.c2s_guild_daily_reward;
            var c2s_guild_charge_ui = msg.c2s_guild_charge_ui;
            var s2c_guild_charge_ui_ret = msg.s2c_guild_charge_ui_ret;
            var c2s_guild_get_charge_reward = msg.c2s_guild_get_charge_reward;
            var s2c_guild_donate_ret = msg.s2c_guild_donate_ret;
            var c2s_change_guild_name = msg.c2s_change_guild_name;
            var c2s_guild_draw = msg.c2s_guild_draw;
            var s2c_guild_draw_info = msg.s2c_guild_draw_info;
            var c2s_guild_draw_reset = msg.c2s_guild_draw_reset;
            var c2s_guild_draw_open = msg.c2s_guild_draw_open;
            var s2c_guild_shengtan_info = msg.s2c_guild_shengtan_info;
            var c2s_guild_shengtan_ui = msg.c2s_guild_shengtan_ui;
            var s2c_guild_shengtan_ui_ret = msg.s2c_guild_shengtan_ui_ret;
            var c2s_guild_shengtan_score_reward = msg.c2s_guild_shengtan_score_reward;
            var c2s_set_guild_xianzong = msg.c2s_set_guild_xianzong;
            var s2c_set_guild_xianzong_ret = msg.s2c_set_guild_xianzong_ret;
            var c2s_guild_mibao_ui = msg.c2s_guild_mibao_ui;
            var c2s_guild_mibao_swap = msg.c2s_guild_mibao_swap;
            var s2c_guild_mibao_ui_ret = msg.s2c_guild_mibao_ui_ret;
            var c2s_guild_invita = msg.c2s_guild_invita;
            var s2c_guild_yibao_base_info = msg.s2c_guild_yibao_base_info;
            var s2c_guild_yibao_help = msg.s2c_guild_yibao_help;
            var c2s_guild_yibao_request = msg.c2s_guild_yibao_request;
            var c2s_guild_yibao_click = msg.c2s_guild_yibao_click;
            var s2c_guild_zhanyaotai_info = msg.s2c_guild_zhanyaotai_info;
            var c2s_guild_zhanyaotai_request = msg.c2s_guild_zhanyaotai_request;
            var c2s_guild_zhanyaotai_click = msg.c2s_guild_zhanyaotai_click;
            var c2s_guild_zhanyaotai_help_chat = msg.c2s_guild_zhanyaotai_help_chat;
            var c2s_guild_ware_show = msg.c2s_guild_ware_show;
            var c2s_guild_ware_oper = msg.c2s_guild_ware_oper;
            var c2s_guild_auction_show = msg.c2s_guild_auction_show;
            var c2s_guild_baoku_show = msg.c2s_guild_baoku_show;
            var c2s_guild_exchange_item = msg.c2s_guild_exchange_item;
            var s2c_guild_ware_show = msg.s2c_guild_ware_show;
            var s2c_guild_ware_oper = msg.s2c_guild_ware_oper;
            var s2c_guild_auction_show = msg.s2c_guild_auction_show;
            var s2c_guild_baoku_show = msg.s2c_guild_baoku_show;
            var s2c_guild_exchange_item = msg.s2c_guild_exchange_item;
            var c2s_guild_auction_buy = msg.c2s_guild_auction_buy;
            var s2c_guild_auction_buy = msg.s2c_guild_auction_buy;
            var c2s_guild_baoku_buy = msg.c2s_guild_baoku_buy;
            var s2c_guild_baoku_buy = msg.s2c_guild_baoku_buy;
            var c2s_guild_study_show = msg.c2s_guild_study_show;
            var s2c_guild_study_show = msg.s2c_guild_study_show;
            var s2c_guild_study_oper = msg.s2c_guild_study_oper;
            var c2s_guild_study_oper = msg.c2s_guild_study_oper;
            var c2s_guild_xianshou_show = msg.c2s_guild_xianshou_show;
            var c2s_guild_xianshou_up_level = msg.c2s_guild_xianshou_up_level;
            var c2s_guild_xianshou_receive = msg.c2s_guild_xianshou_receive;
            var c2s_guild_xianshou_rank_show = msg.c2s_guild_xianshou_rank_show;
            var s2c_guild_xianshou_show = msg.s2c_guild_xianshou_show;
            var s2c_guild_xianshou_update_exp = msg.s2c_guild_xianshou_update_exp;
            var s2c_guild_xianshou_receive = msg.s2c_guild_xianshou_receive;
            var c2s_guild_ware_exchange = msg.c2s_guild_ware_exchange;
            var s2c_guild_type_rank_list = msg.s2c_guild_type_rank_list;
            var c2s_guild_type_rank_rewards = msg.c2s_guild_type_rank_rewards;
            var s2c_guild_ware_exchange = msg.s2c_guild_ware_exchange;
            var Handler = base.Handler;
            var UnionProxy = /** @class */ (function (_super) {
                __extends(UnionProxy, _super);
                function UnionProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(UnionProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new union.UnionModel();
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
                };
                /**--------------------协议start-------------------- */
                /**请求宗门信息 */
                UnionProxy.prototype.c2s_ask_guild_info = function () {
                    var msg = new c2s_ask_guild_info();
                    this.sendProto(msg);
                };
                /**请求宗门成员列表 */
                UnionProxy.prototype.c2s_ask_guild_member = function () {
                    var msg = new c2s_ask_guild_member();
                    this.sendProto(msg);
                };
                /**请求宗门列表 */
                UnionProxy.prototype.c2s_ask_guild_list = function () {
                    var msg = new c2s_ask_guild_list();
                    this.sendProto(msg);
                };
                /**玩家退出宗门 */
                UnionProxy.prototype.c2s_quit_guild = function () {
                    var msg = new c2s_quit_guild();
                    this.sendProto(msg);
                };
                /**修改权限 1.升职2.降职  成员降职=踢出工会*/
                UnionProxy.prototype.c2s_set_guild_member_job = function (role_id, type) {
                    var msg = new c2s_set_guild_member_job();
                    msg.role_id = role_id;
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**创建宗门 */
                UnionProxy.prototype.c2s_create_guild = function (type, name, content) {
                    var msg = new c2s_create_guild();
                    msg.type = type;
                    msg.name = name;
                    msg.content = content || game.getLanById("xianzong_tips1" /* xianzong_tips1 */);
                    this.sendProto(msg);
                };
                /**设置申请加入条件 */
                UnionProxy.prototype.c2s_guild_open_status = function (is_set, value) {
                    var msg = new c2s_guild_open_status();
                    msg.condition = { is_set: is_set, value: value };
                    this.sendProto(msg);
                };
                /**随机名字 */
                UnionProxy.prototype.c2s_random_guild_name = function () {
                    var msg = new c2s_random_guild_name();
                    this.sendProto(msg);
                };
                /**查看申请列表 */
                UnionProxy.prototype.c2s_ask_guild_apply_info = function () {
                    var msg = new c2s_ask_guild_apply_info();
                    this.sendProto(msg);
                };
                /**操作申请列表 1同意 2拒绝 */
                UnionProxy.prototype.c2s_agree_or_refuse_guild = function (role_id, type) {
                    var msg = new c2s_agree_or_refuse_guild();
                    msg.role_id = role_id;
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**选择申请加入宗门 */
                UnionProxy.prototype.c2s_choice_apply_guild = function (id) {
                    var msg = new c2s_choice_apply_guild();
                    msg.id = id;
                    this.sendProto(msg);
                };
                /**踢出宗门 */
                UnionProxy.prototype.c2s_guild_kick_member = function (role_id) {
                    var msg = new c2s_guild_kick_member();
                    msg.role_id = role_id;
                    this.sendProto(msg);
                };
                /**一键捐献 */
                UnionProxy.prototype.c2s_guild_donate = function () {
                    var msg = new c2s_guild_donate();
                    this.sendProto(msg);
                };
                /**每日领取捐献奖励 */
                UnionProxy.prototype.c2s_guild_daily_reward = function () {
                    var msg = new c2s_guild_daily_reward();
                    this.sendProto(msg);
                };
                /**打开福利大厅 */
                UnionProxy.prototype.c2s_guild_charge_ui = function () {
                    var msg = new c2s_guild_charge_ui();
                    this.sendProto(msg);
                };
                /**福利大厅领取奖励 */
                UnionProxy.prototype.c2s_guild_get_charge_reward = function (role_id, index) {
                    var msg = new c2s_guild_get_charge_reward();
                    msg.role_id = role_id;
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**修改仙宗名 */
                UnionProxy.prototype.c2s_change_guild_name = function (name) {
                    var msg = new c2s_change_guild_name();
                    msg.name = name;
                    this.sendProto(msg);
                };
                /**设置仙尊 */
                UnionProxy.prototype.c2s_set_guild_xianzong = function (role_id) {
                    var msg = new c2s_set_guild_xianzong();
                    msg.role_id = role_id;
                    this.sendProto(msg);
                };
                /**打开仙尊秘宝请求 */
                UnionProxy.prototype.c2s_guild_mibao_ui = function () {
                    var msg = new c2s_guild_mibao_ui();
                    this.sendProto(msg);
                };
                /**兑换仙尊秘宝 */
                UnionProxy.prototype.c2s_guild_mibao_swap = function (index, count) {
                    var msg = new c2s_guild_mibao_swap();
                    msg.index = index;
                    msg.count = count;
                    this.sendProto(msg);
                };
                /**聊天招募 */
                UnionProxy.prototype.c2s_guild_invita = function (channel_type) {
                    if (channel_type === void 0) { channel_type = 2; }
                    var msg = new c2s_guild_invita();
                    msg.channel_type = channel_type;
                    this.sendProto(msg);
                };
                //--------------------二期-遗宝-斩妖-------------------
                /**1请求仙宗遗宝信息  2请求排行信息(params字段为1宗门排名 2个人排名)  3请求协助信息 */
                UnionProxy.prototype.c2s_guild_yibao_request = function (oper_type, params) {
                    var msg = new c2s_guild_yibao_request();
                    msg.oper_type = oper_type;
                    if (params) {
                        msg.params = params;
                    }
                    this.sendProto(msg);
                };
                /**1单次挑战  2一键扫荡  3解锁宝箱  4开启宝箱   5邀请加速  6单个加速  7一键加速  8领取全民奖励 */
                UnionProxy.prototype.c2s_guild_yibao_click = function (button_type, params, uid) {
                    var msg = new c2s_guild_yibao_click();
                    msg.button_type = button_type;
                    if (params) {
                        msg.params = params;
                    }
                    if (uid) {
                        msg.u_id = uid;
                    }
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_zhanyaotai_request = function (oper_type, params) {
                    var msg = new c2s_guild_zhanyaotai_request();
                    msg.oper_type = oper_type;
                    if (params) {
                        msg.params = params;
                    }
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_zhanyaotai_click = function (button_type, id, boss_index) {
                    var msg = new c2s_guild_zhanyaotai_click();
                    msg.button_type = button_type;
                    if (id) {
                        msg.id = id;
                    }
                    if (boss_index) {
                        msg.boss_index = boss_index;
                    }
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_zhanyaotai_help_chat = function (id) {
                    var msg = new c2s_guild_zhanyaotai_help_chat();
                    msg.id = id;
                    this.sendProto(msg);
                };
                //--------------------二期-遗宝-斩妖-------------------
                //--------------------三期-仓库-书斋-仙兽-------------------
                UnionProxy.prototype.c2s_guild_ware_show = function () {
                    var msg = new c2s_guild_ware_show();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_ware_oper = function (type, props) {
                    var msg = new c2s_guild_ware_oper();
                    msg.type = type;
                    msg.props = props;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_ware_exchange = function (prop_index) {
                    var msg = new c2s_guild_ware_exchange();
                    msg.prop_index = prop_index;
                    msg.count = 1;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_auction_show = function () {
                    var msg = new c2s_guild_auction_show();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_auction_buy = function (id) {
                    var msg = new c2s_guild_auction_buy();
                    msg.id = id;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_baoku_show = function () {
                    var msg = new c2s_guild_baoku_show();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_exchange_item = function (num) {
                    var msg = new c2s_guild_exchange_item();
                    msg.num = num;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_baoku_buy = function (index, count) {
                    var msg = new c2s_guild_baoku_buy();
                    msg.index = index;
                    msg.count = count;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_study_show = function () {
                    var msg = new c2s_guild_study_show();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_study_oper = function (index) {
                    var msg = new c2s_guild_study_oper();
                    msg.index = index;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_xianshou_show = function () {
                    var msg = new c2s_guild_xianshou_show();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_xianshou_up_level = function () {
                    var msg = new c2s_guild_xianshou_up_level();
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_xianshou_receive = function (index) {
                    var msg = new c2s_guild_xianshou_receive();
                    msg.index = index;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.c2s_guild_xianshou_rank_show = function (type) {
                    var msg = new c2s_guild_xianshou_rank_show();
                    msg.type = type;
                    this.sendProto(msg);
                };
                //--------------------三期-仓库-书斋-仙兽-------------------
                //---------------------接收返回协议-----------------------
                /**宗门基本数据 */
                UnionProxy.prototype.s2c_ask_guild_info_ret = function (n) {
                    var msg = n.body;
                    if (msg.header) {
                        this._model.header = msg.header;
                    }
                    if (msg.info) {
                        this._model.info = msg.info;
                    }
                    if (msg.xianzun) {
                        this._model.hero = msg.xianzun;
                    }
                    this.sendNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */);
                };
                /**下发宗门成员列表 */
                UnionProxy.prototype.s2c_ask_guild_member_ret = function (n) {
                    var msg = n.body;
                    if (msg.member_list) {
                        this._model.member_list = msg.member_list;
                    }
                    this.sendNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */);
                };
                /**下发宗门列表 */
                UnionProxy.prototype.s2c_ask_guild_list_ret = function (n) {
                    var msg = n.body;
                    this.onUpdateProto(msg);
                    if (msg.guild_list) {
                        this.sendNt("on_update_union_list" /* ON_UPDATE_UNION_LIST */);
                    }
                };
                /**获取随机名字 */
                UnionProxy.prototype.s2c_random_guild_name_ret = function (n) {
                    var msg = n.body;
                    if (msg.name) {
                        this._model.random_name = msg.name;
                    }
                    this.sendNt("on_update_union_name" /* ON_UPDATE_UNION_NAME */);
                };
                /**设置权限回调 */
                UnionProxy.prototype.s2c_set_guild_member_job_ret = function (n) {
                    var msg = n.body;
                    if (msg.target_info) {
                        if (msg.target_info.guild_job == 0) {
                            this.onDeleteMember(this._model.member_list, msg.target_info);
                        }
                        else {
                            this.onUpdateMember(this._model.member_list, msg.target_info);
                        }
                    }
                    if (msg.self_info && msg.self_info.role_id) {
                        this.onUpdateMember(this._model.member_list, msg.self_info);
                        this.sendNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */);
                    }
                    this.sendNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */);
                };
                /**玩家登录下发或者更新数据(维护个人宗门信息) */
                UnionProxy.prototype.s2c_guild_role_data = function (n) {
                    var msg = n.body;
                    if (!msg.id) {
                        this._model.show_welcome = true;
                    }
                    if (this._model.id != msg.id) {
                        this._model.id = msg.id;
                        this.sendNt("on_update_in_union" /* ON_UPDATE_IN_UNION */);
                    }
                    if (this._model.is_get_reward != msg.is_get_reward) {
                        this._model.is_get_reward = msg.is_get_reward;
                        this.sendNt("on_update_wage_btn_info" /* ON_UPDATE_WAGE_BTN_INFO */);
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
                        this.sendNt("on_update_union_list" /* ON_UPDATE_UNION_LIST */);
                    }
                };
                /**查看申请列表返回协议 */
                UnionProxy.prototype.s2c_ask_guild_apply_info_ret = function (n) {
                    var msg = n.body;
                    this._model.apply_info = msg.apply_info || [];
                    this.sendNt("on_update_apply_list" /* ON_UPDATE_APPLY_LIST */);
                };
                /**申请列表操作回调 */
                UnionProxy.prototype.s2c_agree_or_refuse_guild_ret = function (n) {
                    var msg = n.body;
                    for (var i = 0; i < this._model.apply_record.length; i++) {
                        var item = this._model.apply_record[i];
                        if (item.eq(msg.info.role_id)) {
                            this._model.apply_record.splice(i, 1);
                        }
                    }
                    this.onDeleteMember(this._model.apply_info, msg.info);
                    this.onUpdateMember(this._model.member_list, msg.info);
                    this.onUpdateHintApply();
                    this.sendNt("on_update_apply_list" /* ON_UPDATE_APPLY_LIST */);
                    this.sendNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */);
                };
                /**申请条件限制 */
                UnionProxy.prototype.s2c_guild_open_status_ret = function (n) {
                    var msg = n.body;
                    if (msg.condition) {
                        this._model.info.condition = msg.condition;
                    }
                    this.sendNt("on_update_apply_limit" /* ON_UPDATE_APPLY_LIMIT */);
                };
                /**福利大厅 */
                UnionProxy.prototype.s2c_guild_charge_ui_ret = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        this._model.mvp = msg.info;
                    }
                    if (msg.count) {
                        this._model.mvp_count = msg.count;
                    }
                    this._model.charge_list = msg.list || [];
                    this.onUpdateHintWelfare();
                    this.sendNt("on_update_welfare_info" /* ON_UPDATE_WELFARE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_donate_ret = function (n) {
                    var msg = n.body;
                    this.onUpdateProto(msg);
                    this.sendNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */);
                };
                /**设置仙尊回调 */
                UnionProxy.prototype.s2c_set_guild_xianzong_ret = function (n) {
                    var msg = n.body;
                    this.onUpdateMember(this._model.member_list, msg.old_info);
                    this.onUpdateMember(this._model.member_list, msg.new_info);
                    this.sendNt("on_update_set_hero_list" /* ON_UPDATE_SET_HERO_LIST */);
                };
                /**仙尊秘宝 */
                UnionProxy.prototype.s2c_guild_mibao_ui_ret = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        this._model.hero_list = msg.list;
                    }
                    if (msg.info) {
                        this._model.hero = msg.info;
                    }
                    this.sendNt("on_update_hero_shop_info" /* ON_UPDATE_HERO_SHOP_INFO */);
                };
                //---------------------------天坛/圣坛------------------------------
                /**
                 * 天坛圣坛抽奖通用
                 * @param mod_type 1.天坛 2.圣坛
                 * @param type 1.单次 2.十连
                 * */
                UnionProxy.prototype.c2s_guild_draw = function (mod_type, type) {
                    var msg = new c2s_guild_draw();
                    msg.mod_type = mod_type;
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**重置天坛奖励 */
                UnionProxy.prototype.c2s_guild_draw_reset = function () {
                    var msg = new c2s_guild_draw_reset();
                    this.sendProto(msg);
                };
                /**打开天坛界面请求 */
                UnionProxy.prototype.c2s_guild_draw_open = function () {
                    var msg = new c2s_guild_draw_open();
                    this.sendProto(msg);
                };
                /**天坛数据 */
                UnionProxy.prototype.s2c_guild_draw_info = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        this._model.info_tian = msg.info;
                    }
                    /**有抽奖数据发送抽奖事件 */
                    if (msg.list && msg.list.length > 0) {
                        this.sendNt("on_tween_tian_lottery_start" /* ON_TWEEN_TIAN_LOTTERY_START */, msg.list);
                    }
                    else {
                        this.sendNt("on_update_tian_lottery_info" /* ON_UPDATE_TIAN_LOTTERY_INFO */);
                    }
                };
                /**打开圣坛界面请求 */
                UnionProxy.prototype.c2s_guild_shengtan_ui = function () {
                    var msg = new c2s_guild_shengtan_ui();
                    this.sendProto(msg);
                };
                /**积分领取奖励 */
                UnionProxy.prototype.c2s_guild_shengtan_score_reward = function (index) {
                    var msg = new c2s_guild_shengtan_score_reward();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**圣坛更新数据 */
                UnionProxy.prototype.s2c_guild_shengtan_info = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        this._model.shengtan_info = msg.info;
                    }
                    if (msg.list) {
                        this._model.list_sheng = msg.list;
                    }
                    this.sendNt("on_update_sheng_lottery_info" /* ON_UPDATE_SHENG_LOTTERY_INFO */);
                };
                /** */
                UnionProxy.prototype.s2c_guild_shengtan_ui_ret = function (n) {
                    var msg = n.body;
                    if (msg.draw_list) {
                        this._model.list_sheng_run = msg.draw_list;
                        this.sendNt("on_update_run_message_info" /* ON_UPDATE_RUN_MESSAGE_INFO */);
                    }
                    if (msg.item_list) {
                        this._model.list_sheng = msg.item_list;
                        this._model.list_len = msg.item_list.length;
                    }
                    if (msg.trigger_list) {
                        this._model.list_sheng_reward = msg.trigger_list;
                    }
                    this.sendNt("on_update_sheng_lottery_info" /* ON_UPDATE_SHENG_LOTTERY_INFO */);
                };
                //---------------------------天坛/圣坛------------------------------
                //--------------------二期-遗宝-斩妖-------------------
                UnionProxy.prototype.s2c_guild_yibao_base_info = function (n) {
                    var msg = n.body;
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
                    this.sendNt("on_update_treasure_info" /* ON_UPDATE_TREASURE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_yibao_help = function (n) {
                    var msg = n.body;
                    this._model.request_help_list = msg.request_help_list || [];
                    this.sendNt("on_update_treasure_help_info" /* ON_UPDATE_TREASURE_HELP_INFO */);
                };
                UnionProxy.prototype.s2c_guild_zhanyaotai_info = function (n) {
                    var msg = n.body;
                    this._model.my_boss_data = msg.my_boss_data || null;
                    this._model.boss_mvp = msg.mvp || null;
                    this._model.boss_list = msg.boss_list || [];
                    this._model.limit_list = msg.list || [];
                    this.onUpdateHintByKill();
                    this.sendNt("on_update_kill_info" /* ON_UPDATE_KILL_INFO */);
                };
                //--------------------二期-遗宝-斩妖-------------------
                //--------------------三期-仓库-书斋-仙兽-------------------
                UnionProxy.prototype.s2c_guild_ware_show = function (n) {
                    var msg = n.body;
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
                    this.sendNt("on_update_storage_info" /* ON_UPDATE_STORAGE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_ware_oper = function (n) {
                    var msg = n.body;
                    if (msg.guild_score) {
                        this._model.guild_score = msg.guild_score;
                    }
                };
                UnionProxy.prototype.s2c_guild_ware_exchange = function (n) {
                    var msg = n.body;
                    if (msg.item) {
                        var prop = game.PropData.create(msg.item.index);
                        if (prop.type != 290 /* Equip */ || !!msg.item.count) {
                            for (var i in this._model.item_list) {
                                var item = this._model.item_list[i];
                                if (item.prop_id.eq(msg.item.prop_id)) {
                                    this._model.item_list[i] = msg.item;
                                }
                            }
                        }
                        else {
                            this._model.item_list = this._model.item_list.filter(function (v) {
                                return !v.prop_id.eq(msg.item.prop_id);
                            });
                        }
                        this._model.list_len = this._model.item_list.filter(function (v) {
                            return !!v;
                        }).length;
                        this.setEquipList();
                    }
                    this.sendNt("on_update_storage_info" /* ON_UPDATE_STORAGE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_auction_show = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        this._model.auction_list = msg.list;
                    }
                    this.sendNt("on_update_auction_info" /* ON_UPDATE_AUCTION_INFO */);
                };
                UnionProxy.prototype.s2c_guild_auction_buy = function (n) {
                    var msg = n.body;
                    if (msg.id) {
                        this._model.auction_list = this._model.auction_list.filter(function (v) {
                            return v.id.toNumber() !== msg.id.toNumber();
                        });
                    }
                    this.sendNt("on_update_auction_info" /* ON_UPDATE_AUCTION_INFO */);
                };
                UnionProxy.prototype.s2c_guild_baoku_show = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        this._model.store_list = msg.list;
                    }
                    this.sendNt("on_update_store_info" /* ON_UPDATE_STORE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_exchange_item = function (n) {
                    var msg = n.body;
                    this._model.store_count = msg.count || 0;
                };
                UnionProxy.prototype.s2c_guild_baoku_buy = function (n) {
                    var msg = n.body;
                    for (var i in this._model.store_list) {
                        if (this._model.store_list[i].index == msg.data.index) {
                            this._model.store_list[i] = msg.data;
                            this.sendNt("on_update_store_info" /* ON_UPDATE_STORE_INFO */);
                            return;
                        }
                    }
                    this._model.store_list.push(msg.data);
                    this.sendNt("on_update_store_info" /* ON_UPDATE_STORE_INFO */);
                };
                UnionProxy.prototype.s2c_guild_study_show = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        this._model.book_list = msg.list;
                    }
                    this.onUpdateHintByBook();
                    this.sendNt("on_update_book_info" /* ON_UPDATE_BOOK_INFO */);
                };
                UnionProxy.prototype.s2c_guild_study_oper = function (n) {
                    var msg = n.body;
                    if (!msg.data) {
                        return;
                    }
                    var data = msg.data;
                    var index = this._model.book_list.findIndex(function (v) { return v.index == data.index; });
                    if (index > -1) {
                        var book = this._model.book_list[index];
                        if (book.stage != data.stage) {
                            var buff = this.getBuff(book.index);
                            var buff2 = this.getBuff(book.index, true);
                            mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "34" /* UnionBookUpTips2 */, { skillId: buff, lv: data.stage, skillId2: buff2 });
                        }
                        else if (book.level != data.level) {
                            mod.ViewMgr.getIns().showSuccessTips(2 /* Up */);
                        }
                        this._model.book_list[index] = data;
                    }
                    else {
                        this._model.book_list.push(data);
                        var buff = this.getBuff(data.index);
                        mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "33" /* UnionBookUpTips */, { skillId: buff, lv: data.stage });
                    }
                    this.onUpdateHintByBook();
                    this.sendNt("on_update_book_info" /* ON_UPDATE_BOOK_INFO */);
                };
                UnionProxy.prototype.s2c_guild_xianshou_show = function (n) {
                    var msg = n.body;
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
                    this.sendNt("on_update_beast_info" /* ON_UPDATE_BEAST_INFO */);
                };
                UnionProxy.prototype.s2c_guild_xianshou_update_exp = function (n) {
                    var msg = n.body;
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
                    this.sendNt("on_update_beast_info" /* ON_UPDATE_BEAST_INFO */);
                };
                UnionProxy.prototype.s2c_guild_xianshou_receive = function (n) {
                    var msg = n.body;
                    if (msg.week_rewards) {
                        this._model.week_rewards = msg.week_rewards;
                    }
                    this.onUpdateHintByBeastReward();
                    this.sendNt("on_update_beast_reward_info" /* ON_UPDATE_BEAST_REWARD_INFO */);
                };
                //--------------------三期-仓库-书斋-仙兽-------------------
                //--------------------通用-排行榜-------------------
                UnionProxy.prototype.c2s_guild_type_rank_rewards = function (rank_type) {
                    var msg = new c2s_guild_type_rank_rewards();
                    msg.rank_type = rank_type;
                    this.sendProto(msg);
                };
                UnionProxy.prototype.s2c_guild_type_rank_list = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.rank_type) {
                        return;
                    }
                    var isGuild = msg.button_type == 1 /* Guild */;
                    switch (msg.rank_type) {
                        case 1 /* Treasure */:
                            if (isGuild) {
                                this._model.guild_ranks = msg.all_ranks;
                                this._model.my_guild_rank = msg.my_rank;
                            }
                            else {
                                this._model.person_ranks = msg.all_ranks;
                                this._model.my_rank = msg.my_rank;
                            }
                            this.sendNt("on_update_treasure_rank_info" /* ON_UPDATE_TREASURE_RANK_INFO */);
                            this._model.last_rank_num = msg.last_rank_num || 0;
                            this._model.props = msg.props || [];
                            if (msg.last_rank_num && msg.props) {
                                mod.HintMgr.setHint(true, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */, "140" /* UnionRank */]);
                            }
                            else {
                                mod.HintMgr.setHint(false, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */, "140" /* UnionRank */]);
                            }
                            break;
                        case 2 /* Kill */:
                            if (isGuild) {
                                this._model.boss_guild_ranks = msg.all_ranks;
                                this._model.boss_my_guild_rank = msg.my_rank;
                            }
                            else {
                                this._model.boss_person_ranks = msg.all_ranks;
                                this._model.boss_my_rank = msg.my_rank;
                            }
                            this.sendNt("on_update_kill_rank_info" /* ON_UPDATE_KILL_RANK_INFO */);
                            this._model.boss_last_rank_num = msg.last_rank_num || 0;
                            this._model.boss_props = msg.props || [];
                            if (msg.last_rank_num && msg.props) {
                                mod.HintMgr.setHint(true, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */, "140" /* UnionRank */]);
                            }
                            else {
                                mod.HintMgr.setHint(false, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */, "140" /* UnionRank */]);
                            }
                            break;
                        case 3 /* Beast */:
                            if (isGuild) {
                                this._model.beast_guild_ranks = msg.all_ranks;
                                this._model.beast_my_guild_rank = msg.my_rank;
                            }
                            else {
                                this._model.beast_person_ranks = msg.all_ranks;
                                this._model.beast_my_rank = msg.my_rank;
                            }
                            this.sendNt("on_update_beast_rank_info" /* ON_UPDATE_BEAST_RANK_INFO */);
                            this._model.beast_last_rank_num = msg.last_rank_num || 0;
                            this._model.beast_props = msg.props || [];
                            if (msg.last_rank_num && msg.props) {
                                mod.HintMgr.setHint(true, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "140" /* UnionRank */]);
                            }
                            else {
                                mod.HintMgr.setHint(false, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "140" /* UnionRank */]);
                            }
                            break;
                    }
                };
                Object.defineProperty(UnionProxy.prototype, "open_fun", {
                    //--------------------通用-排行榜-------------------
                    /**--------------------协议end-------------------- */
                    get: function () {
                        return this._model.open_fun;
                    },
                    set: function (v) {
                        this._model.open_fun = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "union_level", {
                    /**宗門等級 */
                    get: function () {
                        return this._model.info && this._model.info.level || this._model.union_level;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**更新数据 */
                UnionProxy.prototype.onUpdateProto = function (s2c) {
                    for (var k in s2c) {
                        this._model[k] = s2c[k];
                        // if (this._model[k]) {
                        // }
                    }
                };
                UnionProxy.prototype.onDeleteMember = function (list, info) {
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item.role_id.eq(info.role_id)) {
                            list.splice(i, 1);
                        }
                    }
                };
                UnionProxy.prototype.getDonateReward = function (cfg, index) {
                    var reward1 = cfg.donate_reward.find(function (v) {
                        return v[2] == index;
                    });
                    var reward2 = cfg.donate_exp.find(function (v) {
                        return v[1] == index;
                    });
                    return [[reward1[0], reward1[1]], [1450000048, reward2[0]]];
                };
                UnionProxy.prototype.onUpdateMember = function (list, info) {
                    if (info.guild_job === 1 /* Leader */) {
                        this._model.header = info;
                    }
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item.role_id.eq(info.role_id)) {
                            list[i] = info;
                            return;
                        }
                    }
                    list.push(info);
                };
                /**获取单个成员数据 */
                UnionProxy.prototype.getMemberById = function (id) {
                    if (this._model.header.role_id.eq(id)) {
                        return this._model.header;
                    }
                    for (var _i = 0, _a = this._model.member_list; _i < _a.length; _i++) {
                        var member = _a[_i];
                        if (member.role_id.eq(id)) {
                            return member;
                        }
                    }
                    return null;
                };
                /**职位文本 */
                UnionProxy.prototype.getJobTextByJob = function (job) {
                    return game.UnionJobStr[job];
                };
                /**获取申请限制条件 */
                UnionProxy.prototype.getApplyLimit = function () {
                    return this._model.info.condition;
                };
                /**是否申请加入宗门 */
                UnionProxy.prototype.getApplyStatus = function (id) {
                    return this._model.apply_list.indexOf(id) > -1;
                };
                /**获取成员列表（排序） */
                UnionProxy.prototype.getMemberList = function () {
                    return this._model.member_list.sort(this.sortByMember);
                };
                /**宗门列表（排序） */
                UnionProxy.prototype.getUnionList = function () {
                    return this._model.guild_list.sort(this.sortByUnion);
                };
                /**福利列表 */
                UnionProxy.prototype.getWelfareList = function () {
                    return this._model.charge_list.sort(this.sortByWelfare);
                };
                /**圣坛更多大奖 */
                UnionProxy.prototype.getShengRewardList = function () {
                    return this._model.list_sheng_reward;
                };
                /**申请列表 */
                UnionProxy.prototype.getApplyList = function () {
                    return this._model.apply_info;
                };
                Object.defineProperty(UnionProxy.prototype, "isApply", {
                    /**是否有申请 */
                    get: function () {
                        var list = this._model.apply_record;
                        return list && list.length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "isInUnion", {
                    /**是否加入仙宗 */
                    get: function () {
                        return this._model.id && this._model.id != 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "guild_id", {
                    /**仙宗id */
                    get: function () {
                        return this._model.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "guild_name", {
                    /**仙宗名字 */
                    get: function () {
                        return this._model.info && this._model.info.guild_name || "";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "guild_job", {
                    get: function () {
                        return this._model.guild_job;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "isCreateVip", {
                    /**是否已经创建vip宗门 */
                    get: function () {
                        return this._model.is_create;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "isInCd", {
                    /**退出宗门cd中 */
                    get: function () {
                        return this._model.quit_cd > TimeMgr.time.serverTimeSecond;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**根据创建宗门页面状态获取创建类型 */
                UnionProxy.prototype.getCreateType = function (status) {
                    return this._model.getCreateTypeByStatus[status];
                };
                /**判断是否仙尊（用于设置仙尊） */
                UnionProxy.prototype.checkHero = function (role_id) {
                    if (this._model.hero) {
                        return this._model.hero.role_id.eq(role_id);
                    }
                    return false;
                };
                /**是否设置仙尊 */
                UnionProxy.prototype.checkIsSetHero = function () {
                    return this._model.hero && !!this._model.hero.role_id;
                };
                /**仙尊配置 */
                UnionProxy.prototype.getHeroList = function () {
                    var list = [];
                    for (var _i = 0, _a = this._model.hero_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var cfg = game.getConfigByNameId("guild_mibao.json" /* GuildMiBao */, item);
                        list.push(cfg);
                    }
                    return list;
                };
                /**宗门排序 */
                UnionProxy.prototype.sortByUnion = function (a, b) {
                    if (a.level != b.level) {
                        return b.level - a.level;
                    }
                    return +b.power - +a.power;
                };
                /**成员排序 */
                UnionProxy.prototype.sortByMember = function (a, b) {
                    if (a.is_online != b.is_online) {
                        return a.is_online ? -1 : 1;
                    }
                    if (a.guild_job != b.guild_job) {
                        return a.guild_job - b.guild_job;
                    }
                    return +b.power - +a.power;
                };
                /**福利大厅列表排序 */
                UnionProxy.prototype.sortByWelfare = function (a, b) {
                    var aCfg = game.getConfigByNameId("guild_charge.json" /* GuildCharge */, a.index);
                    var bCfg = game.getConfigByNameId("guild_charge.json" /* GuildCharge */, b.index);
                    if (a.state != b.state) {
                        if (a.state == 1) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    else if (a.state == b.state) {
                        return aCfg.charge_num - bCfg.charge_num;
                    }
                    return a.index - b.index;
                };
                UnionProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf(game.PropIndexToKey[this.tian_cost[0]]) > -1) {
                        this.onUpdateHintTian();
                    }
                    if (keys.indexOf(game.PropIndexToKey[this.sheng_cost[0]]) > -1) {
                        this.onUpdateHintSheng();
                    }
                };
                UnionProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var book_cost_indexs = this.book_cost_indexs;
                    for (var _i = 0, book_cost_indexs_1 = book_cost_indexs; _i < book_cost_indexs_1.length; _i++) {
                        var idxs = book_cost_indexs_1[_i];
                        if (indexs.indexOf(idxs) > -1) {
                            this.onUpdateHintByBook();
                        }
                    }
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, 1);
                    for (var _a = 0, _b = cfg.cost; _a < _b.length; _a++) {
                        var cost = _b[_a];
                        if (indexs.indexOf(cost[0]) > -1) {
                            this.onUpdateHintByDonate();
                        }
                    }
                    var yibao = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this.boss_index);
                    if (yibao && indexs.indexOf(yibao.boss_cost[0]) > -1) {
                        this.onUpdateHintByTreasure();
                    }
                    var kill_boss_cost_index = this.kill_boss_cost_index;
                    for (var _c = 0, kill_boss_cost_index_1 = kill_boss_cost_index; _c < kill_boss_cost_index_1.length; _c++) {
                        var idxs = kill_boss_cost_index_1[_c];
                        if (indexs.indexOf(idxs) > -1) {
                            this.onUpdateHintByKill();
                        }
                    }
                };
                UnionProxy.prototype.onBagUpdateByPropType = function (n) {
                    var types = n.body;
                    if (types.indexOf(5 /* Xianfa */) > -1) {
                        this.onUpdateHintByBook();
                    }
                };
                /**更新红点 */
                UnionProxy.prototype.onUpdateHint = function () {
                    if (!this.isInUnion) {
                        return;
                    }
                    this.onUpdateHintApply();
                    this.onUpdateHintWelfare();
                    this.onUpdateHintWage();
                    this.onUpdateHintTian();
                    this.onUpdateHintSheng();
                    this.onUpdateHintByDonate();
                };
                UnionProxy.prototype.onUpdateHintByDonate = function () {
                    var roots = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "139" /* UnionDonate */];
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, 1);
                    for (var _i = 0, _a = cfg.cost; _i < _a.length; _i++) {
                        var cost = _a[_i];
                        if (mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            mod.HintMgr.setHint(true, roots);
                            return;
                        }
                    }
                    mod.HintMgr.setHint(false, roots);
                };
                UnionProxy.prototype.onUpdateHintWage = function () {
                    mod.HintMgr.setHint(!this._model.is_get_reward, ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "129" /* UnionWage */]);
                };
                /**天坛红点 */
                UnionProxy.prototype.onUpdateHintTian = function () {
                    var bool = mod.BagUtil.checkPropCnt(this.tian_cost[0], this.tian_cost[1] * 9);
                    mod.HintMgr.setHint(bool, this._model.lottery_root.concat(["01" /* TabBtnType01 */]));
                };
                /**圣坛红点 */
                UnionProxy.prototype.onUpdateHintSheng = function () {
                    var info = this._model.shengtan_info;
                    if (info && info.list) {
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.state == 1) {
                                mod.HintMgr.setHint(true, this._model.lottery_root.concat(["02" /* TabBtnType02 */]));
                                return;
                            }
                        }
                    }
                    var bool = mod.BagUtil.checkPropCnt(this.sheng_cost[0], this.sheng_cost[1] * 9);
                    mod.HintMgr.setHint(bool, this._model.lottery_root.concat(["02" /* TabBtnType02 */]));
                };
                /**福利大厅红点 */
                UnionProxy.prototype.onUpdateHintWelfare = function () {
                    if (!this.isInUnion) {
                        mod.HintMgr.setHint(false, this._model.welfare_root);
                        return;
                    }
                    for (var _i = 0, _a = this._model.charge_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.state == 1) {
                            mod.HintMgr.setHint(true, this._model.welfare_root);
                            return;
                        }
                    }
                    mod.HintMgr.setHint(false, this._model.welfare_root);
                };
                /**有申请列表红点 */
                UnionProxy.prototype.onUpdateHintApply = function () {
                    var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._model.guild_job);
                    /**有操作权限 */
                    var isOper = cfg && cfg.agree_join == 1;
                    if (this.isInUnion && isOper) {
                        mod.HintMgr.setHint(this.isApply, ["55" /* Union */, "01" /* UnionIn */, "02" /* TabBtnType02 */]);
                    }
                    else {
                        mod.HintMgr.setHint(false, ["55" /* Union */, "01" /* UnionIn */, "02" /* TabBtnType02 */]);
                    }
                };
                Object.defineProperty(UnionProxy.prototype, "isReset", {
                    //------------------天坛/圣坛----------------------------
                    /**是否重置 */
                    get: function () {
                        var round = this._model.info_tian.stage;
                        var cfgMap = game.getConfigByNameId("guild_draw.json" /* GuildDraw */, round);
                        for (var k in cfgMap) {
                            var cfg = cfgMap[k];
                            var count = this.getTianCount(cfg.index);
                            if (cfg.num !== count) {
                                return false;
                            }
                        }
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 当前奖励已抽次数
                 * GuildDrawConfig配置
                 * */
                UnionProxy.prototype.getTianCount = function (index) {
                    if (!this._model.info_tian || !this._model.info_tian.list) {
                        return 0;
                    }
                    for (var _i = 0, _a = this._model.info_tian.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.index == index) {
                            return item.count;
                        }
                    }
                    return 0;
                };
                /**获取圣坛大奖数据 */
                UnionProxy.prototype.getShengInfo = function (index) {
                    return this._model.list_sheng[index] || null;
                };
                UnionProxy.prototype.getShengFixReward = function () {
                    var cfgArr = game.getConfigListByName("shengtan_item.json" /* ShengtanItem */);
                    return cfgArr.filter(function (v) {
                        return v.item_type == 1 && v.reward_type == 2;
                    });
                };
                /**圣坛抽奖次数 */
                UnionProxy.prototype.getShengCount = function () {
                    return this._model.shengtan_info && this._model.shengtan_info.count || 0;
                };
                /**圣坛积分礼包数据 */
                UnionProxy.prototype.getShengStatus = function (index) {
                    if (!this._model.shengtan_info || !this._model.shengtan_info.list) {
                        return null;
                    }
                    for (var _i = 0, _a = this._model.shengtan_info.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.index == index) {
                            return info;
                        }
                    }
                    return null;
                };
                Object.defineProperty(UnionProxy.prototype, "tian_cost", {
                    /**天坛单次消耗 */
                    get: function () {
                        if (!this._model.tian_cost) {
                            var cfg = game.getConfigByNameId("param.json" /* Param */, "guild_draw_cost");
                            this._model.tian_cost = cfg.value;
                        }
                        return this._model.tian_cost;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "sheng_cost", {
                    /**圣坛单次消耗 */
                    get: function () {
                        if (!this._model.sheng_cost) {
                            var cfg = game.getConfigByNameId("param.json" /* Param */, "guild_shengtan_cost");
                            this._model.sheng_cost = cfg.value;
                        }
                        return this._model.sheng_cost;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getTipsByType = function (type) {
                    return this._model.getTipsByType[type];
                };
                Object.defineProperty(UnionProxy.prototype, "guild_exchange_num", {
                    //------------------天坛/圣坛----------------------------
                    //--------------------二期-遗宝-斩妖-------------------
                    get: function () {
                        if (!this._model.guild_exchange_num) {
                            var param = game.GameConfig.getParamConfigById("guild_exchange_num");
                            this._model.guild_exchange_num = param.value;
                        }
                        return this._model.guild_exchange_num;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "box_list", {
                    get: function () {
                        if (!this._model.box_list || !this._model.box_list.length) {
                            return [];
                        }
                        var list = [];
                        for (var _i = 0, _a = this._model.box_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            list.push(info);
                        }
                        return list;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "boss_index", {
                    get: function () {
                        return this._model.boss_index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "boss_hp", {
                    get: function () {
                        return this._model.boss_hp || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getRankList = function (type, open_fun) {
                    if (open_fun === void 0) { open_fun = this.open_fun; }
                    var ranks = this.getRanks(type, open_fun);
                    var cfgArr = game.getConfigListByName("guild_yibao_rank.json" /* GuildYibaoRank */);
                    var list = [];
                    var isGuild = type == 1 /* Guild */;
                    var _loop_1 = function (cfg) {
                        var start = cfg.ranks[0];
                        var end = cfg.ranks[1];
                        if (start == end) {
                            var item = ranks && ranks[start - 1];
                            var name = this_1.getRankName(item, type, open_fun);
                            list.push({
                                rank: start,
                                name: name,
                                hurtStr: item && item.value.toString() || "",
                                reward: isGuild ? cfg.rewards : []
                            });
                        }
                        else {
                            var more = start > game.MAX_RANK_NUM;
                            var rank_1 = more ? start - 1 + "+" : start + "-" + end;
                            var lookHandler = Handler.alloc(this_1, function () {
                                mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "21" /* UnionRankTips */, { rank: rank_1, type: type });
                            });
                            list.push({
                                rank: rank_1,
                                name: "",
                                reward: isGuild ? cfg.rewards : [],
                                param: type,
                                lookHandler: !more && lookHandler
                            });
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        _loop_1(cfg);
                    }
                    return list;
                };
                UnionProxy.prototype.getRankStr = function (type) {
                    var info = this.getMyRank(type);
                    var isGuild = type == 1 /* Guild */;
                    if (!info || !info.rank_num) {
                        if (isGuild) {
                            var param = game.getConfigByNameId("param.json" /* Param */, "guild_yibao_paiming1");
                            return game.StringUtil.substitute(game.getLanById("guild_tips19" /* guild_tips19 */), [param.value]);
                        }
                        else {
                            var param = game.getConfigByNameId("param.json" /* Param */, "guild_yibao_paiming2");
                            return game.StringUtil.substitute(game.getLanById("guild_tips20" /* guild_tips20 */), [param.value]);
                        }
                    }
                    else {
                        var str = game.TextUtil.addColor("" + info.rank_num, 2330156 /* GREEN */);
                        var content = isGuild ? game.getLanById("xianzong_tips8" /* xianzong_tips8 */) : game.getLanById("compete_mars_4" /* compete_mars_4 */);
                        return game.StringUtil.substitute(content, [str]);
                    }
                };
                UnionProxy.prototype.getRankCountStr = function (type) {
                    var info = this.getMyRank(type);
                    var isGuild = type == 1 /* Guild */;
                    var content = isGuild ? game.getLanById("guild_tips21" /* guild_tips21 */) : game.getLanById("guild_tips22" /* guild_tips22 */);
                    var str = game.TextUtil.addColor("" + (info && info.value || 0), 2330156 /* GREEN */);
                    return game.StringUtil.substitute(content, [str]);
                };
                Object.defineProperty(UnionProxy.prototype, "help_list", {
                    get: function () {
                        return this._model.request_help_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getTask = function (index) {
                    if (!this._model.task_list || !this._model.task_list.length) {
                        return null;
                    }
                    for (var _i = 0, _a = this._model.task_list; _i < _a.length; _i++) {
                        var task = _a[_i];
                        if (task.task_index == index) {
                            return task;
                        }
                    }
                    return null;
                };
                UnionProxy.prototype.getTaskReward = function () {
                    if (this._model.task_rewards_status == 1) {
                        return false;
                    }
                    var cfgArr = game.getConfigListByName("guild_yibao_task.json" /* GuildYibaoTask */);
                    for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                        var cfg = cfgArr_2[_i];
                        var task = this.getTask(cfg.index);
                        if (!task || task.step < cfg.target_num) {
                            return false;
                        }
                    }
                    return true;
                };
                Object.defineProperty(UnionProxy.prototype, "vip_boss", {
                    get: function () {
                        var cfgArr = game.getConfigListByName("guild_zhanyaotai.json" /* GuildZhanyaotai */);
                        for (var _i = 0, cfgArr_3 = cfgArr; _i < cfgArr_3.length; _i++) {
                            var cfg = cfgArr_3[_i];
                            if (cfg.vip_limit) {
                                return cfg;
                            }
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "boss_mvp", {
                    get: function () {
                        return this._model.boss_mvp || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "boss_data", {
                    get: function () {
                        return this._model.my_boss_data || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "boss_list", {
                    get: function () {
                        return this._model.boss_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "recover_time", {
                    get: function () {
                        return this._model.recover_time || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getSummonCount = function (index) {
                    if (!this._model.limit_list || !this._model.limit_list.length) {
                        return 0;
                    }
                    for (var _i = 0, _a = this._model.limit_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.index == index) {
                            return info.count;
                        }
                    }
                    return 0;
                };
                UnionProxy.prototype.getBossRankList = function (type) {
                    var ranks = this.getRanks(type, "18" /* UnionKill */);
                    var cfgArr = game.getConfigListByName("guild_zhanyaotai_rank.json" /* GuildZhanyaotaiRank */);
                    var list = [];
                    var isGuild = type == 1 /* Guild */;
                    var _loop_2 = function (cfg) {
                        var start = cfg.ranks[0];
                        var end = cfg.ranks[1];
                        if (start == end) {
                            var item = ranks && ranks[start - 1];
                            var name = this_2.getRankName(item, type, this_2.open_fun);
                            list.push({
                                rank: start,
                                name: name,
                                hurtStr: item && item.value.toString() || "",
                                reward: isGuild ? cfg.rewards : []
                            });
                        }
                        else {
                            var more = start > game.MAX_RANK_NUM;
                            var rank_2 = more ? start - 1 + "+" : start + "-" + end;
                            var lookHandler = Handler.alloc(this_2, function () {
                                mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "21" /* UnionRankTips */, { rank: rank_2, type: type });
                            });
                            list.push({
                                rank: rank_2,
                                name: "",
                                reward: isGuild ? cfg.rewards : [],
                                param: type,
                                lookHandler: !more && lookHandler
                            });
                        }
                    };
                    var this_2 = this;
                    for (var _i = 0, cfgArr_4 = cfgArr; _i < cfgArr_4.length; _i++) {
                        var cfg = cfgArr_4[_i];
                        _loop_2(cfg);
                    }
                    return list;
                };
                UnionProxy.prototype.getBossRankStr = function (type) {
                    var info = this.getMyRank(type);
                    if (type == 1 /* Guild */) {
                        if (!info || !info.rank_num) {
                            var param = game.getConfigByNameId("param.json" /* Param */, "guild_zhanyao_paiming1");
                            return game.StringUtil.substitute(game.getLanById("guild_tips18" /* guild_tips18 */), [param.value]);
                        }
                        var str = game.TextUtil.addColor("" + info.rank_num, 2330156 /* GREEN */);
                        return game.StringUtil.substitute(game.getLanById("xianzong_tips8" /* xianzong_tips8 */), [str]);
                    }
                    else {
                        var str = game.TextUtil.addColor("" + (info && info.rank_num || game.getLanById("tishi_13" /* tishi_13 */)), 2330156 /* GREEN */);
                        return game.StringUtil.substitute(game.getLanById("compete_mars_4" /* compete_mars_4 */), [str]);
                    }
                };
                UnionProxy.prototype.getBossRankCountStr = function (type) {
                    var info = this.getMyRank(type);
                    var content = "";
                    if (type == 1 /* Guild */) {
                        content = game.getLanById("guild_tips16" /* guild_tips16 */);
                    }
                    else {
                        content = game.getLanById("guild_tips17" /* guild_tips17 */);
                    }
                    var str = game.TextUtil.addColor("" + (info && info.value || 0), 2330156 /* GREEN */);
                    return game.StringUtil.substitute(content, [str]);
                };
                Object.defineProperty(UnionProxy.prototype, "recycle_oper", {
                    get: function () {
                        var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._model.guild_job);
                        return cfg && !!cfg.recover_ware_item;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**遗宝红点 */
                UnionProxy.prototype.onUpdateHintByTreasure = function () {
                    var root = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */];
                    var cfg = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this.boss_index);
                    if (mod.BagUtil.checkPropCnt(cfg.boss_cost[0], cfg.boss_cost[1])) {
                        mod.HintMgr.setHint(true, root);
                        return;
                    }
                    if (this._model.box_list && this._model.box_list.length) {
                        for (var _i = 0, _a = this._model.box_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var bool_1 = this.getBoxHint(info);
                            if (bool_1) {
                                mod.HintMgr.setHint(true, root);
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
                    var bool = this.getTaskHint();
                    if (bool) {
                        mod.HintMgr.setHint(true, root);
                        return;
                    }
                    mod.HintMgr.setHint(false, root);
                };
                UnionProxy.prototype.getTaskHint = function () {
                    var cfgArr = game.getConfigListByName("guild_yibao_task.json" /* GuildYibaoTask */);
                    for (var _i = 0, cfgArr_5 = cfgArr; _i < cfgArr_5.length; _i++) {
                        var cfg = cfgArr_5[_i];
                        var task = this.getTask(cfg.index);
                        if (task.step < cfg.target_num) {
                            return false;
                        }
                    }
                    return !this._model.task_rewards_status;
                };
                UnionProxy.prototype.getBoxHint = function (info) {
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
                };
                UnionProxy.prototype.onUpdateHintByKill = function () {
                    var roots = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */];
                    var zhaohuan_hint = this.getZhaohuanHint();
                    if (zhaohuan_hint) {
                        mod.HintMgr.setHint(true, roots);
                        return;
                    }
                    var my_boss_hint = this.getMyBossHint();
                    if (my_boss_hint) {
                        mod.HintMgr.setHint(true, roots);
                        return;
                    }
                    var boss_list_hint = this.getBossListHint();
                    if (boss_list_hint) {
                        mod.HintMgr.setHint(true, roots);
                        return;
                    }
                    mod.HintMgr.setHint(false, roots);
                };
                UnionProxy.prototype.getMyBossHint = function () {
                    if (!this.boss_data) {
                        return false;
                    }
                    if (!this.boss_data.boss_hp) {
                        return true;
                    }
                    else {
                        var cfg = game.getConfigByNameId("guild_zhanyaotai.json" /* GuildZhanyaotai */, this.boss_data.index);
                        var cost = cfg.atk_cost[0];
                        return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    }
                };
                UnionProxy.prototype.getZhaohuanHint = function () {
                    var cfgArr = game.getConfigListByName("guild_zhanyaotai.json" /* GuildZhanyaotai */);
                    for (var _i = 0, cfgArr_6 = cfgArr; _i < cfgArr_6.length; _i++) {
                        var cfg = cfgArr_6[_i];
                        if (cfg.costs && cfg.costs[0][0] == 1450000002 /* Xianyu */) {
                            continue;
                        }
                        if (cfg.vip_limit > 0) {
                            if (cfg.count && this.getSummonCount(cfg.index) >= cfg.count) {
                                return true;
                            }
                        }
                        else {
                            if (mod.BagUtil.checkPropCnt(cfg.costs[0][0], cfg.costs[0][1])) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                UnionProxy.prototype.getBossListHint = function () {
                    var boss_list = this._model.boss_list;
                    if (!boss_list) {
                        return false;
                    }
                    for (var _i = 0, boss_list_1 = boss_list; _i < boss_list_1.length; _i++) {
                        var boss = boss_list_1[_i];
                        // if (!boss.boss_hp) {
                        //     return true;
                        // } else {
                        //     let cfg: GuildZhanyaotaiConfig = getConfigByNameId(ConfigName.GuildZhanyaotai, boss.index);
                        //     return BagUtil.checkPropCnt(cfg.atk_cost[0][0], cfg.atk_cost[0][1]);
                        // }
                        var bool = this.getBossHint(boss);
                        if (bool) {
                            return true;
                        }
                    }
                    return false;
                };
                UnionProxy.prototype.getBossHint = function (boss) {
                    if (!boss.boss_hp) {
                        return true;
                    }
                    else {
                        var cfg = game.getConfigByNameId("guild_zhanyaotai.json" /* GuildZhanyaotai */, boss.index);
                        if (mod.BagUtil.checkPropCnt(cfg.atk_cost[0][0], cfg.atk_cost[0][1])) {
                            return true;
                        }
                    }
                    return false;
                };
                Object.defineProperty(UnionProxy.prototype, "xianzong_yibao_jiasu_shangxian", {
                    get: function () {
                        if (!this._model.xianzong_yibao_jiasu_shangxian) {
                            var param = game.GameConfig.getParamConfigById("xianzong_yibao_jiasu_shangxian");
                            this._model.xianzong_yibao_jiasu_shangxian = param.value;
                        }
                        return this._model.xianzong_yibao_jiasu_shangxian;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "kill_boss_cost_index", {
                    get: function () {
                        if (!this._model.kill_boss_cost_index) {
                            this._model.kill_boss_cost_index = [];
                            var cfgArr = game.getConfigListByName("guild_zhanyaotai.json" /* GuildZhanyaotai */);
                            for (var _i = 0, cfgArr_7 = cfgArr; _i < cfgArr_7.length; _i++) {
                                var cfg = cfgArr_7[_i];
                                if (cfg.atk_cost) {
                                    for (var _a = 0, _b = cfg.atk_cost; _a < _b.length; _a++) {
                                        var cost = _b[_a];
                                        if (this._model.kill_boss_cost_index.indexOf(cost[0]) == -1) {
                                            this._model.kill_boss_cost_index.push(cost[0]);
                                        }
                                    }
                                }
                                if (cfg.costs) {
                                    for (var _c = 0, _d = cfg.costs; _c < _d.length; _c++) {
                                        var cost = _d[_c];
                                        if (this._model.kill_boss_cost_index.indexOf(cost[0]) == -1) {
                                            this._model.kill_boss_cost_index.push(cost[0]);
                                        }
                                    }
                                }
                            }
                        }
                        return this._model.kill_boss_cost_index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "max_boxs", {
                    //--------------------二期-遗宝-斩妖-------------------
                    //--------------------三期-仓库-书斋-仙兽-------------------
                    get: function () {
                        if (this._model.max_boxs) {
                            return this._model.max_boxs;
                        }
                        var cfg = game.GameConfig.getParamConfigById("guild_ware_num");
                        this._model.max_boxs = cfg.value;
                        return this._model.max_boxs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "residue_boxs", {
                    get: function () {
                        return this.max_boxs - this._model.list_len;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "guild_score", {
                    get: function () {
                        return this._model.guild_score;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getStoreData = function (index) {
                    if (!this._model.store_list) {
                        return 0;
                    }
                    for (var _i = 0, _a = this._model.store_list; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (data.index == index) {
                            return data.count;
                        }
                    }
                    return 0;
                };
                UnionProxy.prototype.getBookInfo = function (index) {
                    return this._model.book_list.find(function (v) {
                        return v.index == index;
                    });
                };
                UnionProxy.prototype.getBuff = function (index, before) {
                    if (before === void 0) { before = false; }
                    var info = this.getBookInfo(index);
                    var stage = info && info.stage || 0;
                    var buff_index = !stage ? 0 : stage - 1;
                    var cfg = game.getConfigByNameId("guild_study.json" /* GuildStudy */, index);
                    if (cfg && cfg.break_property) {
                        if (before) {
                            buff_index && buff_index--;
                        }
                        return cfg.break_property[buff_index];
                    }
                    return 0;
                };
                UnionProxy.prototype.getCost = function (index) {
                    var info = this.getBookInfo(index);
                    var stage = info && info.stage || 0;
                    var level = info && info.level || 0;
                    var cfg = game.getConfigByNameId("guild_study.json" /* GuildStudy */, index);
                    if (!info) {
                        return cfg.break_item[stage];
                    }
                    else {
                        if (level == 10) {
                            return cfg.break_item[stage];
                        }
                        else {
                            var cfgs = game.getConfigByNameId("guild_study_level.json" /* GuildStudyLevel */, index);
                            for (var i in cfgs) {
                                var cfgi = cfgs[i];
                                if (cfgi && cfgi.splevel == stage) {
                                    return cfgi.grade_item[level];
                                }
                            }
                        }
                    }
                    return [];
                };
                Object.defineProperty(UnionProxy.prototype, "beast_stage", {
                    get: function () {
                        return this._model.beast_stage || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "total_exp", {
                    get: function () {
                        return this._model.total_exp || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "beast_oper", {
                    /**仙兽操作权限 */
                    get: function () {
                        var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._model.guild_job);
                        return cfg && !!cfg.xiaoshou_up_level;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getExtraAttrJob = function () {
                    var jobs = "";
                    var cfgArr = game.getConfigListByName("guild_job_data.json" /* GuildJobData */);
                    for (var _i = 0, cfgArr_8 = cfgArr; _i < cfgArr_8.length; _i++) {
                        var cfg = cfgArr_8[_i];
                        if (!!cfg.xiaoshou_attr) {
                            jobs += "" + ((!!jobs.length ? "," : "") + game.UnionJobStr[cfg.index]);
                        }
                    }
                    return jobs;
                };
                Object.defineProperty(UnionProxy.prototype, "base_attrs", {
                    get: function () {
                        return this._model.base_attrs || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionProxy.prototype, "extra_attrs", {
                    get: function () {
                        return this._model.extra_attrs || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.getRewardStatus = function (index) {
                    return this._model.week_rewards.indexOf(index) > -1;
                };
                UnionProxy.prototype.getRewardState = function (index) {
                    var bool = this.getRewardStatus(index);
                    var cnt = mod.BagUtil.getPropCntByIdx(1450000038 /* GuildXianshouExp */);
                    var cfg = game.getConfigByNameId("guild_xianshou_target.json" /* GuildXianshouTarget */, index);
                    if (cfg.score > cnt) {
                        return 0 /* NotFinish */;
                    }
                    else if (bool) {
                        return 2 /* Draw */;
                    }
                    else {
                        return 1 /* Finish */;
                    }
                };
                UnionProxy.prototype.getBeastRankStr = function (type) {
                    var info = this.getMyRank(type);
                    if (!info || !info.rank_num) {
                        var param = game.getConfigByNameId("param.json" /* Param */, "guild_xianshou_rank");
                        if (type == 1 /* Guild */) {
                            return game.StringUtil.substitute(game.getLanById("guild_tips13" /* guild_tips13 */), [param.value[1]]);
                        }
                        else {
                            return game.StringUtil.substitute(game.getLanById("guild_tips14" /* guild_tips14 */), [param.value[0]]);
                        }
                    }
                    else {
                        var str = game.TextUtil.addColor("" + info.rank_num, 2330156 /* GREEN */);
                        var content = "";
                        if (type == 1 /* Guild */) {
                            content = game.getLanById("xianzong_tips8" /* xianzong_tips8 */);
                        }
                        else {
                            content = game.getLanById("compete_mars_4" /* compete_mars_4 */);
                        }
                        return game.StringUtil.substitute(content, [str]);
                    }
                };
                UnionProxy.prototype.getBeastRankCountStr = function (type) {
                    var info = this.getMyRank(type);
                    var str = game.TextUtil.addColor("" + (info && info.value || 0), 2330156 /* GREEN */);
                    return "\u4ED9\u517D\u7ECF\u9A8C\uFF1A" + str;
                };
                UnionProxy.prototype.getBeastTask = function (task_id) {
                    var cfgArr = game.getConfigListByName("guild_xianshou_task.json" /* GuildXianshouTask */);
                    var list = cfgArr.filter(function (v) {
                        return v.task_list.indexOf(task_id) > -1;
                    });
                    return list && list[0];
                };
                UnionProxy.prototype.setEquipList = function () {
                    this._model.equip_map.clear();
                    for (var _i = 0, _a = this._model.item_list; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (!data) {
                            return;
                        }
                        var prop = game.PropData.create(data.index);
                        prop.update(data);
                        if (prop.propType != 1 /* RoleEquip */ || prop.type != 290 /* Equip */) {
                            continue;
                        }
                        var cfg = prop.cfg;
                        var rebirth = mod.RoleUtil.getRebirthLv(cfg.rebirth_limit);
                        var stage = cfg.equip_lv || 0;
                        var key = rebirth + "-" + stage;
                        if (this._model.equip_map.has(key)) {
                            var list = this._model.equip_map.get(key);
                            list.push(prop);
                        }
                        else {
                            this._model.equip_map.set(key, [prop]);
                        }
                    }
                };
                UnionProxy.prototype.getEquipKeyValue1 = function () {
                    var list = [game.UnionSelectDefault];
                    var keys = Array.from(this._model.equip_map.keys());
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var key = keys_1[_i];
                        list.push({ key: key, value: this.getEquipString(key) });
                    }
                    return list;
                };
                UnionProxy.prototype.getEquipKeyValue2 = function (key) {
                    var list = [game.UnionSelectDefault];
                    var props = [];
                    if (key == "0") {
                        var values = Array.from(this._model.equip_map.values());
                        for (var i in values) {
                            var value = values[i];
                            props.push.apply(props, value);
                        }
                    }
                    else {
                        props = Array.from(this._model.equip_map.get(key));
                    }
                    var keys = [];
                    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                        var prop = props_1[_i];
                        if (keys.indexOf(prop.quality) == -1) {
                            keys.push(prop.quality);
                            list.push({ key: "" + prop.quality, value: game.ColorUtil.getColorChineseStrByQua2(prop.quality) });
                        }
                    }
                    return list;
                };
                UnionProxy.prototype.getEquipString = function (str) {
                    var s = str.split("-");
                    if (s.length > 1) {
                        if (+s[0] == 0) {
                            s[0] = "50级";
                        }
                        else {
                            s[0] = s[0] + "\u8F6C";
                        }
                        s[1] = s[1] + "\u9636";
                        str = s.join("-");
                    }
                    return str;
                };
                UnionProxy.prototype.getEquioList = function (key, quality) {
                    var props = [];
                    if (key == "0") {
                        var values = Array.from(this._model.equip_map.values());
                        for (var i in values) {
                            var value = values[i];
                            props.push.apply(props, value);
                        }
                    }
                    else {
                        props = Array.from(this._model.equip_map.get(key));
                    }
                    if (quality == "0") {
                        return props;
                    }
                    return props.filter(function (v) {
                        return v.quality == +quality;
                    });
                };
                UnionProxy.prototype.getBeastRankList = function (type) {
                    var ranks = this.getRanks(type, "26" /* UnionBeast */);
                    var cfgArr = game.getConfigListByName("guild_xianshou_rank.json" /* GuildXianshouRank */);
                    var list = [];
                    var isGuild = type == 1 /* Guild */;
                    var _loop_3 = function (cfg) {
                        var start = cfg.rank_no[0];
                        var end = cfg.rank_no[1];
                        if (start == end) {
                            var item = ranks && ranks[start - 1];
                            var name = this_3.getRankName(item, type);
                            list.push({
                                rank: start,
                                name: name,
                                hurtStr: item && item.value.toString() || "",
                                reward: isGuild ? cfg.reward : []
                            });
                        }
                        else {
                            var more = start > game.MAX_RANK_NUM;
                            var rank_3 = more ? start - 1 + "+" : start + "-" + end;
                            var lookHandler = Handler.alloc(this_3, function () {
                                mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "21" /* UnionRankTips */, { rank: rank_3, type: type });
                            });
                            list.push({
                                rank: rank_3,
                                name: "",
                                reward: isGuild ? cfg.reward : [],
                                param: type,
                                lookHandler: !more && lookHandler
                            });
                        }
                    };
                    var this_3 = this;
                    for (var _i = 0, cfgArr_9 = cfgArr; _i < cfgArr_9.length; _i++) {
                        var cfg = cfgArr_9[_i];
                        _loop_3(cfg);
                    }
                    return list;
                };
                UnionProxy.prototype.getBookRoots = function (index) {
                    var roots = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "25" /* UnionBook */, "01" /* TabBtnType01 */];
                    var type = "" + (index < 10 ? "0" : "") + index;
                    return roots.concat([type]);
                };
                UnionProxy.prototype.onUpdateHintByBook = function () {
                    var cfgArr = game.getConfigListByName("guild_study.json" /* GuildStudy */);
                    for (var _i = 0, cfgArr_10 = cfgArr; _i < cfgArr_10.length; _i++) {
                        var cfg = cfgArr_10[_i];
                        var root = this.getBookRoots(cfg.index);
                        if (cfg.activate_condition > this.union_level) {
                            mod.HintMgr.setHint(false, root);
                            break;
                        }
                        var cost = this.getCost(cfg.index);
                        if (!cost) {
                            mod.HintMgr.setHint(false, root);
                            continue;
                        }
                        var bool = mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                        mod.HintMgr.setHint(bool, root);
                    }
                };
                Object.defineProperty(UnionProxy.prototype, "book_cost_indexs", {
                    get: function () {
                        if (this._model.book_cost_idxs && this._model.book_cost_idxs.length) {
                            return this._model.book_cost_idxs;
                        }
                        var cfgArr = game.getConfigListByName("guild_study.json" /* GuildStudy */);
                        for (var _i = 0, cfgArr_11 = cfgArr; _i < cfgArr_11.length; _i++) {
                            var cfg = cfgArr_11[_i];
                            var cfgs = game.getConfigByNameId("guild_study_level.json" /* GuildStudyLevel */, cfg.index);
                            for (var i in cfgs) {
                                for (var key in cfgs[i].grade_item) {
                                    var idx = cfgs[i].grade_item[key][0];
                                    if (this._model.book_cost_idxs.indexOf(idx) == -1) {
                                        this._model.book_cost_idxs.push(idx);
                                    }
                                }
                            }
                            for (var i in cfg.break_item) {
                                var idx = cfg.break_item[i][0];
                                if (this._model.book_cost_idxs.indexOf(idx) == -1) {
                                    this._model.book_cost_idxs.push(idx);
                                }
                            }
                        }
                        return this._model.book_cost_idxs;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionProxy.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(47 /* UnionBeast */) > -1) {
                        this.onUpdateHintByBeast();
                    }
                };
                UnionProxy.prototype.onUpdateHintByBeast = function () {
                    this.onUpdateHintByBeastReward();
                    var roots = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "128" /* UnionBeastTask */];
                    var tasks = mod.TaskUtil.getTaskList(47 /* UnionBeast */);
                    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                        var task = tasks_1[_i];
                        var bool = mod.TaskUtil.canRewardDraw(task);
                        if (bool) {
                            mod.HintMgr.setHint(bool, roots);
                            return;
                        }
                    }
                    mod.HintMgr.setHint(false, roots);
                };
                UnionProxy.prototype.onUpdateHintByBeastReward = function () {
                    var roots = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */];
                    if (this.beast_oper) {
                        var cfg = game.getConfigByNameId("guild_xianshou.json" /* GuildXianshou */, this.beast_stage + 1);
                        var bool = cfg && this.total_exp >= cfg.score;
                        mod.HintMgr.setHint(bool, roots.concat(["130" /* UnionBeastUp */]));
                    }
                    var cfgArr = game.getConfigListByName("guild_xianshou_target.json" /* GuildXianshouTarget */);
                    for (var _i = 0, cfgArr_12 = cfgArr; _i < cfgArr_12.length; _i++) {
                        var cfg = cfgArr_12[_i];
                        if (this.getRewardState(cfg.index) == 1 /* Finish */) {
                            mod.HintMgr.setHint(true, roots.concat(["127" /* UnionBeastReward */]));
                            return;
                        }
                    }
                    mod.HintMgr.setHint(false, roots.concat(["127" /* UnionBeastReward */]));
                };
                //--------------------三期-仓库-书斋-仙兽-------------------
                //--------------------排行榜数据-------------------
                UnionProxy.prototype.getRanks = function (type, open_fun) {
                    if (open_fun === void 0) { open_fun = this.open_fun; }
                    var isGuild = type == 1 /* Guild */;
                    switch (open_fun) {
                        case "14" /* UnionTreasure */:
                            return isGuild ? this._model.guild_ranks : this._model.person_ranks;
                        case "18" /* UnionKill */:
                            return isGuild ? this._model.boss_guild_ranks : this._model.boss_person_ranks;
                        case "26" /* UnionBeast */:
                            return isGuild ? this._model.beast_guild_ranks : this._model.beast_person_ranks;
                        default:
                            return [];
                    }
                };
                UnionProxy.prototype.getMyRank = function (type, open_fun) {
                    if (open_fun === void 0) { open_fun = this.open_fun; }
                    var isGuild = type == 1 /* Guild */;
                    switch (open_fun) {
                        case "14" /* UnionTreasure */:
                            return isGuild ? this._model.my_guild_rank : this._model.my_rank;
                        case "18" /* UnionKill */:
                            return isGuild ? this._model.boss_my_guild_rank : this._model.boss_my_rank;
                        case "26" /* UnionBeast */:
                            return isGuild ? this._model.beast_my_guild_rank : this._model.beast_my_rank;
                        default:
                            return null;
                    }
                };
                UnionProxy.prototype.getRankName = function (item, type, open_fun) {
                    if (open_fun === void 0) { open_fun = this.open_fun; }
                    if (!item) {
                        return game.getLanById("tishi_2" /* tishi_2 */);
                    }
                    var isGuild = type == 1 /* Guild */;
                    return isGuild ? game.StringUtil.substitute(game.getLanById("guild_tips15" /* guild_tips15 */), [item.guild_name, item.name]) : item.name;
                };
                /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
                UnionProxy.prototype.getRankSection = function (rank, type, open_fun) {
                    if (open_fun === void 0) { open_fun = this.open_fun; }
                    var strArr = rank.split("-");
                    var start = +strArr[0];
                    var end = +strArr[1];
                    var ranks = this.getRanks(type, open_fun);
                    var list = [];
                    for (var i = start - 1; i < end; i++) {
                        var item = ranks && ranks[i];
                        var name = this.getRankName(item, type, open_fun);
                        if (item) {
                            list.push({ rank: item.rank_num, name: name, value: +item.value });
                        }
                        else {
                            list.push({ rank: i + 1, name: name, value: 0 });
                        }
                    }
                    return list;
                };
                UnionProxy.prototype.getLastRank = function (type) {
                    switch (type) {
                        case 1 /* Treasure */:
                            return this._model.last_rank_num;
                        case 2 /* Kill */:
                            return this._model.boss_last_rank_num;
                        case 3 /* Beast */:
                            return this._model.beast_last_rank_num;
                        case 4 /* Fengmo */:
                            var fengmo = game.getProxy("61" /* More */, 257 /* Fengmo */);
                            return fengmo["last_rank_num"];
                    }
                    return 0;
                };
                UnionProxy.prototype.getRankProps = function (type) {
                    switch (type) {
                        case 1 /* Treasure */:
                            return this._model.props;
                        case 2 /* Kill */:
                            return this._model.boss_props;
                        case 3 /* Beast */:
                            return this._model.beast_props;
                        case 4 /* Fengmo */:
                            var fengmo = game.getProxy("61" /* More */, 257 /* Fengmo */);
                            return fengmo["props"];
                    }
                    return [];
                };
                return UnionProxy;
            }(game.ProxyBase));
            union.UnionProxy = UnionProxy;
            __reflect(UnionProxy.prototype, "game.mod.union.UnionProxy", ["game.mod.IUnionProxy", "base.IProxy"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var UnionKillRankMdr = /** @class */ (function (_super) {
                __extends(UnionKillRankMdr, _super);
                function UnionKillRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._type = 1 /* Guild */;
                    _this._tips = false;
                    return _this;
                }
                UnionKillRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._view.btn_god.visible = false;
                    this._view.timeItem.visible = true;
                    this._view.img_type2.source = "zhanyaojifen";
                    this._view.img_type3.source = "paimingjiangli";
                };
                UnionKillRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_kill_rank_info" /* ON_UPDATE_KILL_RANK_INFO */, this.onUpdateView, this);
                };
                UnionKillRankMdr.prototype.onShow = function () {
                    this._view.updateImgTypeHorizontal(this._type == 1 /* Guild */);
                    this._proxy.c2s_guild_zhanyaotai_request(2, this._type);
                    _super.prototype.onShow.call(this);
                    this.onUpdateTime();
                };
                UnionKillRankMdr.prototype.onUpdateTips = function () {
                    if (this._tips) {
                        return;
                    }
                    if (this._type == 1 /* Guild */) {
                        var list = this._proxy.getRankProps(2 /* Kill */);
                        if (list && list.length) {
                            this._tips = true;
                            mod.ViewMgr.getIns().showUnionRankTips(2 /* Kill */);
                        }
                    }
                };
                UnionKillRankMdr.prototype.onUpdateTime = function () {
                    this._end_time = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.updateTime();
                };
                UnionKillRankMdr.prototype.onUpdateView = function () {
                    this._view.masterItem.visible = false;
                    var list = this._proxy.getRanks(this._type);
                    var topInfo = list && list[0];
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                        if (this._type == 1 /* Guild */) {
                            this._view.masterItem.visible = true;
                            this._view.masterItem.updateShow(topInfo.guild_name);
                        }
                    }
                    var infos = this._proxy.getBossRankList(this._type);
                    this._itemList.replaceAll(infos);
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getBossRankStr(this._type));
                    this._view.lab_num.textFlow = game.TextUtil.parseHtml(this._proxy.getBossRankCountStr(this._type));
                    this.onUpdateTips();
                };
                UnionKillRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                    this._tips = false;
                };
                UnionKillRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                UnionKillRankMdr.prototype.updateTime = function () {
                    var leftTime = this._end_time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._end_time = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                return UnionKillRankMdr;
            }(game.EffectMdrBase));
            union.UnionKillRankMdr = UnionKillRankMdr;
            __reflect(UnionKillRankMdr.prototype, "game.mod.union.UnionKillRankMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var UnionTreasureRankMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureRankMdr, _super);
                function UnionTreasureRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._type = 1 /* Guild */;
                    _this._tips = false;
                    return _this;
                }
                UnionTreasureRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._view.btn_god.visible = false;
                    this._view.timeItem.visible = true;
                    this._view.img_type2.source = "duobaocishu";
                    this._view.img_type3.source = "paimingjiangli";
                };
                UnionTreasureRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_treasure_rank_info" /* ON_UPDATE_TREASURE_RANK_INFO */, this.onUpdateView, this);
                };
                UnionTreasureRankMdr.prototype.onShow = function () {
                    this._view.updateImgTypeHorizontal(this._type == 1 /* Guild */);
                    this._proxy.c2s_guild_yibao_request(2, this._type);
                    _super.prototype.onShow.call(this);
                    this.onUpdateTime();
                };
                UnionTreasureRankMdr.prototype.onUpdateTips = function () {
                    if (this._tips) {
                        return;
                    }
                    if (this._type == 1 /* Guild */) {
                        var list = this._proxy.getRankProps(1 /* Treasure */);
                        if (list && list.length) {
                            this._tips = true;
                            mod.ViewMgr.getIns().showUnionRankTips(1 /* Treasure */);
                        }
                    }
                };
                UnionTreasureRankMdr.prototype.onUpdateTime = function () {
                    this._end_time = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.updateTime();
                };
                UnionTreasureRankMdr.prototype.onUpdateView = function () {
                    this._view.masterItem.visible = false;
                    var list = this._proxy.getRanks(this._type);
                    var topInfo = list && list[0];
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                        if (this._type == 1 /* Guild */) {
                            this._view.masterItem.visible = true;
                            this._view.masterItem.updateShow(topInfo.guild_name);
                        }
                    }
                    var infos = this._proxy.getRankList(this._type);
                    this._itemList.replaceAll(infos);
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getRankStr(this._type));
                    this._view.lab_num.textFlow = game.TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
                    this.onUpdateTips();
                };
                UnionTreasureRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                    this._tips = false;
                };
                UnionTreasureRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                UnionTreasureRankMdr.prototype.updateTime = function () {
                    var leftTime = this._end_time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._end_time = game.TimeUtil.getNextWeekTime();
                        this._proxy.c2s_guild_yibao_request(2, this._type);
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                return UnionTreasureRankMdr;
            }(game.EffectMdrBase));
            union.UnionTreasureRankMdr = UnionTreasureRankMdr;
            __reflect(UnionTreasureRankMdr.prototype, "game.mod.union.UnionTreasureRankMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var UnionBeastRankMdr = /** @class */ (function (_super) {
                __extends(UnionBeastRankMdr, _super);
                function UnionBeastRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._type = 1 /* Guild */;
                    _this._tips = false;
                    return _this;
                }
                UnionBeastRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._view.btn_god.visible = false;
                    this._view.timeItem.visible = true;
                    this._view.img_type2.source = "meishuzi_xianshoujingyan";
                    this._view.img_type3.source = "paimingjiangli";
                };
                UnionBeastRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_beast_rank_info" /* ON_UPDATE_BEAST_RANK_INFO */, this.onUpdateView, this);
                };
                UnionBeastRankMdr.prototype.onShow = function () {
                    this._view.updateImgTypeHorizontal(this._type == 1 /* Guild */);
                    this._proxy.c2s_guild_xianshou_rank_show(this._type);
                    _super.prototype.onShow.call(this);
                    this.onUpdateTime();
                };
                UnionBeastRankMdr.prototype.onUpdateTips = function () {
                    if (this._tips) {
                        return;
                    }
                    if (this._type == 1 /* Guild */) {
                        var list = this._proxy.getRankProps(3 /* Beast */);
                        if (list && list.length) {
                            this._tips = true;
                            mod.ViewMgr.getIns().showUnionRankTips(3 /* Beast */);
                        }
                    }
                };
                UnionBeastRankMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                UnionBeastRankMdr.prototype.onUpdateView = function () {
                    this._view.masterItem.visible = false;
                    var list = this._proxy.getRanks(this._type);
                    var topInfo = list && list[0];
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                        if (this._type == 1 /* Guild */) {
                            this._view.masterItem.visible = true;
                            this._view.masterItem.updateShow(topInfo.guild_name);
                        }
                    }
                    var infos = this._proxy.getBeastRankList(this._type);
                    this._itemList.replaceAll(infos);
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getBeastRankStr(this._type));
                    this._view.lab_num.textFlow = game.TextUtil.parseHtml(this._proxy.getBeastRankCountStr(this._type));
                    this.onUpdateTips();
                };
                UnionBeastRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                    this._tips = false;
                };
                UnionBeastRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                UnionBeastRankMdr.prototype.updateTime = function () {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                        this._proxy.c2s_guild_xianshou_rank_show(this._type);
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                return UnionBeastRankMdr;
            }(game.EffectMdrBase));
            union.UnionBeastRankMdr = UnionBeastRankMdr;
            __reflect(UnionBeastRankMdr.prototype, "game.mod.union.UnionBeastRankMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var UnionApplyItem = /** @class */ (function (_super) {
                __extends(UnionApplyItem, _super);
                function UnionApplyItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionApplyItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                    this.btn_agree.addEventListener(TouchEvent.TOUCH_TAP, this.onAgree, this);
                    this.btn_refuse.addEventListener(TouchEvent.TOUCH_TAP, this.onRefuse, this);
                };
                UnionApplyItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn_agree.removeEventListener(TouchEvent.TOUCH_TAP, this.onAgree, this);
                    this.btn_refuse.removeEventListener(TouchEvent.TOUCH_TAP, this.onRefuse, this);
                };
                UnionApplyItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = data.name;
                    this.lab_power.text = "\u6218\u529B:" + +data.power;
                    this.head.updateShow(data.head, data.head_frame, data.sex, data.vip);
                };
                UnionApplyItem.prototype.onAgree = function () {
                    this._proxy.c2s_agree_or_refuse_guild(this.data.role_id, 1 /* AGREE */);
                };
                UnionApplyItem.prototype.onRefuse = function () {
                    this._proxy.c2s_agree_or_refuse_guild(this.data.role_id, 2 /* REFUSE */);
                };
                return UnionApplyItem;
            }(mod.BaseRenderer));
            union.UnionApplyItem = UnionApplyItem;
            __reflect(UnionApplyItem.prototype, "game.mod.union.UnionApplyItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionWelfareView = /** @class */ (function (_super) {
                __extends(UnionWelfareView, _super);
                function UnionWelfareView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionWelfareSkin";
                    return _this;
                }
                return UnionWelfareView;
            }(eui.Component));
            union.UnionWelfareView = UnionWelfareView;
            __reflect(UnionWelfareView.prototype, "game.mod.union.UnionWelfareView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionHorseLampItem = /** @class */ (function (_super) {
                __extends(UnionHorseLampItem, _super);
                function UnionHorseLampItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionHorseLampItemSkin";
                    return _this;
                }
                UnionHorseLampItem.prototype.setData = function (str) {
                    this.lab.textFlow = game.TextUtil.parseHtml(str);
                };
                return UnionHorseLampItem;
            }(mod.BaseRenderer));
            union.UnionHorseLampItem = UnionHorseLampItem;
            __reflect(UnionHorseLampItem.prototype, "game.mod.union.UnionHorseLampItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionLotteryItem = /** @class */ (function (_super) {
                __extends(UnionLotteryItem, _super);
                function UnionLotteryItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.IconRewardSkin";
                    return _this;
                }
                UnionLotteryItem.prototype.dataChanged = function () {
                    if (this.data == null) {
                        this.icon.defaultIcon();
                        this.redPoint.visible = false;
                        return;
                    }
                    // if (this.data.showHint != undefined) {
                    //     this.redPoint.visible = this.data.showHint;
                    // }
                    var cfg = this.data.cfg;
                    if (cfg != undefined) {
                        this.icon.setData(cfg.reward);
                    }
                    this.gr_got.visible = this.data.count == cfg.num;
                    this.grp_count.visible = true;
                    this.lab_count.text = cfg.num - this.data.count + "/" + cfg.num;
                    this.lab_count.textColor = cfg.num > this.data.count ? 8585074 /* GREEN */ : 16731212 /* RED */;
                    this.img_reward2.visible = !!cfg.max_reward;
                };
                /**设置数据data，单个icon时候调用*/
                UnionLotteryItem.prototype.setData = function (data) {
                    this.data = data;
                };
                return UnionLotteryItem;
            }(mod.BaseRenderer));
            union.UnionLotteryItem = UnionLotteryItem;
            __reflect(UnionLotteryItem.prototype, "game.mod.union.UnionLotteryItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var UnionLotteryRewardItem = /** @class */ (function (_super) {
                __extends(UnionLotteryRewardItem, _super);
                function UnionLotteryRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionLotteryRewardItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                };
                UnionLotteryRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("shengtan_item.json" /* ShengtanItem */, this.data.index);
                    this.icon.setData(cfg.reward);
                    var prop = game.getConfigById(cfg.reward[0]);
                    var tips = game.getLanById(this._proxy.getTipsByType(this.data.type));
                    this.lab.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(tips, [
                        game.TextUtil.addColor(this.data.name, "0xb14725"),
                        game.TextUtil.addColor(prop.name, "0x238e2c")
                    ]));
                    this.lab_time.text = game.TimeUtil.formatTime(this.data.time);
                };
                return UnionLotteryRewardItem;
            }(mod.BaseRenderer));
            union.UnionLotteryRewardItem = UnionLotteryRewardItem;
            __reflect(UnionLotteryRewardItem.prototype, "game.mod.union.UnionLotteryRewardItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var UnionProgressItem = /** @class */ (function (_super) {
            __extends(UnionProgressItem, _super);
            function UnionProgressItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ComProgressItemSkin";
                return _this;
            }
            UnionProgressItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (!this.data.val) {
                    this.progress.show(0, this.data.target, false, 0, false, 2 /* NoValue */);
                }
                else {
                    var val = this.data.val - this.data.start;
                    val = val < 0 ? 0 : val;
                    var target = this.data.target - this.data.start;
                    this.progress.show(val, target, false, 0, false, 2 /* NoValue */);
                }
            };
            return UnionProgressItem;
        }(mod.BaseRenderer));
        mod.UnionProgressItem = UnionProgressItem;
        __reflect(UnionProgressItem.prototype, "game.mod.UnionProgressItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var facade = base.facade;
        var TouchEvent = egret.TouchEvent;
        var UnionProgressRewardItem = /** @class */ (function (_super) {
            __extends(UnionProgressRewardItem, _super);
            function UnionProgressRewardItem() {
                var _this = _super.call(this) || this;
                _this.skinName = "skins.common.ComProgressRewardItemSkin";
                return _this;
            }
            UnionProgressRewardItem.prototype.onAddToStage = function () {
                _super.prototype.onAddToStage.call(this);
                this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                this.btn_box.addEventListener(TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            };
            UnionProgressRewardItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                // this.currentState = `${this.itemIndex + 1}`;
                this.btn_box.icon = "box_close";
                var cfg = this.data;
                this.lab_value.text = "" + cfg.score;
                var info = this._proxy.getShengStatus(cfg.index);
                if (!info) {
                    this.img_got.visible = false;
                }
                else {
                    var count = this._proxy.getShengCount();
                    this.redPoint.visible = count >= cfg.score && info.state != 2 || info.state == 1;
                    this.img_got.visible = info.state == 2;
                    if (info.state == 2) {
                        this.btn_box.icon = "box_open";
                    }
                }
            };
            UnionProgressRewardItem.prototype.onClickBtn = function () {
                var info = this._proxy.getShengStatus(this.data.index);
                if (!info) {
                    var str = game.TextUtil.addColor("(" + this._proxy.getShengCount() + "/" + this.data.score + ")", 13895688 /* RED */);
                    var tips = game.StringUtil.substitute(game.getLanById("union_tips_2" /* union_tips_2 */), [this.data.score, str]);
                    mod.ViewMgr.getIns().showBoxReward(tips, this.data.reward);
                    return;
                }
                if (info && info.state == 2) {
                    return;
                }
                this._proxy.c2s_guild_shengtan_score_reward(this.data.index);
            };
            return UnionProgressRewardItem;
        }(mod.BaseRenderer));
        mod.UnionProgressRewardItem = UnionProgressRewardItem;
        __reflect(UnionProgressRewardItem.prototype, "game.mod.UnionProgressRewardItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var shengtai_data = msg.shengtai_data;
            var UnionShengLotteryItem = /** @class */ (function (_super) {
                __extends(UnionShengLotteryItem, _super);
                function UnionShengLotteryItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.IconRewardSkin";
                    return _this;
                }
                UnionShengLotteryItem.prototype.dataChanged = function () {
                    if (this.data == null) {
                        this.icon.defaultIcon();
                        this.redPoint.visible = false;
                        return;
                    }
                    if (this.data instanceof shengtai_data) {
                        this.grp_name.visible = true;
                        this.lab_name.text = this.data.name;
                        var cfg = game.getConfigByNameId("shengtan_item.json" /* ShengtanItem */, this.data.index);
                        this.img_reward2.visible = cfg.reward_type == 2;
                        if (cfg != undefined) {
                            this.icon.setData(cfg.reward);
                        }
                    }
                    else {
                        this.grp_name.visible = false;
                        var cfg = this.data;
                        this.img_reward2.visible = cfg.reward_type == 2;
                        if (cfg != undefined) {
                            this.icon.setData(cfg.reward);
                        }
                    }
                };
                /**设置数据data，单个icon时候调用*/
                UnionShengLotteryItem.prototype.setData = function (data) {
                    this.data = data;
                };
                return UnionShengLotteryItem;
            }(mod.BaseRenderer));
            union.UnionShengLotteryItem = UnionShengLotteryItem;
            __reflect(UnionShengLotteryItem.prototype, "game.mod.union.UnionShengLotteryItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var UnionWelfareItem = /** @class */ (function (_super) {
                __extends(UnionWelfareItem, _super);
                function UnionWelfareItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionWelfareItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("guild_charge.json" /* GuildCharge */, data.index);
                    this._listData.source = cfg.rewards;
                    var content = cfg.type == 1 ? game.getLanById("guild_charge_title" /* guild_charge_title */) : game.getLanById("guild_charge_title_vip" /* guild_charge_title_vip */);
                    var str = game.StringUtil.substitute(content, [data.name, cfg.charge_num]);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(str);
                    this.img_bought.visible = data.state == 2;
                    this.img_bought.source = "lvseyilingqu";
                    this.btn_buy.visible = !this.img_bought.visible;
                    if (this.btn_buy.visible) {
                        this.btn_buy.label = game.getLanById("lingqu" /* lingqu */);
                        this.btn_buy.setHint(data.state == 1);
                    }
                };
                UnionWelfareItem.prototype.onClick = function () {
                    var _proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                    _proxy.c2s_guild_get_charge_reward(this.data.role_id, this.data.index);
                };
                return UnionWelfareItem;
            }(mod.BaseGiftItemRender));
            union.UnionWelfareItem = UnionWelfareItem;
            __reflect(UnionWelfareItem.prototype, "game.mod.union.UnionWelfareItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionLotteryMainMdr = /** @class */ (function (_super) {
                __extends(UnionLotteryMainMdr, _super);
                function UnionLotteryMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianmentiantanbiaoqiantubiao",
                            mdr: union.UnionTianLotteryMdr,
                            bg: "bg_xianmentiantan",
                            title: "union_title_5" /* union_title_5 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "09" /* UnionLottery */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "xianmenshengtanbiaoqiantubiao",
                            mdr: union.UnionShengLotteryMdr,
                            title: "union_title_6" /* union_title_6 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "09" /* UnionLottery */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                return UnionLotteryMainMdr;
            }(mod.WndBaseMdr));
            union.UnionLotteryMainMdr = UnionLotteryMainMdr;
            __reflect(UnionLotteryMainMdr.prototype, "game.mod.union.UnionLotteryMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            /**圣坛更多大奖 */
            var UnionLotteryRewardMdr = /** @class */ (function (_super) {
                __extends(UnionLotteryRewardMdr, _super);
                function UnionLotteryRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionLotteryRewardView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionLotteryRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionLotteryRewardItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionLotteryRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                UnionLotteryRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this._view.secondPop.updateTitleStr(game.getLanById("union_title_10" /* union_title_10 */));
                };
                UnionLotteryRewardMdr.prototype.onUpdateView = function () {
                    this._listData.source = this._proxy.getShengRewardList();
                };
                UnionLotteryRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionLotteryRewardMdr;
            }(game.MdrBase));
            union.UnionLotteryRewardMdr = UnionLotteryRewardMdr;
            __reflect(UnionLotteryRewardMdr.prototype, "game.mod.union.UnionLotteryRewardMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var UnionShengLotteryMdr = /** @class */ (function (_super) {
                __extends(UnionShengLotteryMdr, _super);
                function UnionShengLotteryMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionShengLotteryView);
                    /**奖励数量 */
                    _this.count = 8;
                    return _this;
                }
                UnionShengLotteryMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.img_bg.source = game.ResUtil.getUiJpg("bg_xianmenshengtan");
                };
                UnionShengLotteryMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_one, TouchEvent.TOUCH_TAP, this.onOne, this);
                    addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onTen, this);
                    addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickTips, this);
                    addEventListener(this._view.cost_one, TouchEvent.TOUCH_TAP, this.onClickTips, this);
                    addEventListener(this._view.cost_ten, TouchEvent.TOUCH_TAP, this.onClickTips, this);
                    addEventListener(this._view.btn_look, TouchEvent.TOUCH_TAP, this.onMoreReward, this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onPreviewReward, this);
                    this.onNt("on_update_run_message_info" /* ON_UPDATE_RUN_MESSAGE_INFO */, this.onOpenTween, this);
                    this.onNt("on_update_sheng_lottery_info" /* ON_UPDATE_SHENG_LOTTERY_INFO */, this.onUpdateView, this);
                };
                UnionShengLotteryMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_shengtan_ui();
                    _super.prototype.onShow.call(this);
                };
                // private onInitView(): void {
                //     this._view.btn_ten.label = this._view.btn_one.label = "";
                //     this._view.btn_one.setImage("xuyuanyici");
                //     this._view.btn_ten.setImage("xuyuanshici");
                //     this._view.btn_ten.img_bg.source = "daanniu_lvse";
                //     this._view.btn_ten.img_bg.height = this._view.btn_ten.height;
                //     this._view.btn_ten.img_bg.width = this._view.btn_ten.width;
                // }
                UnionShengLotteryMdr.prototype.onUpdateView = function () {
                    var sheng_cost = this._proxy.sheng_cost;
                    var costIndex = sheng_cost[0];
                    var num = mod.BagUtil.getPropCntByIdx(costIndex);
                    this._view.cost_one.initIcon(costIndex, false);
                    this._view.cost_ten.initIcon(costIndex, false);
                    var cost = sheng_cost[1];
                    this._view.cost_one.lab_cost.text = num + "/" + cost;
                    this._view.cost_one.lab_cost.textColor = num >= cost ? 8585074 /* GREEN */ : 16731212 /* RED */;
                    this._view.btn_one.setHint(num >= cost);
                    var cost_ten = cost * 9;
                    this._view.cost_ten.lab_cost.text = num + "/" + cost_ten;
                    this._view.cost_ten.lab_cost.textColor = num >= cost_ten ? 8585074 /* GREEN */ : 16731212 /* RED */;
                    this._view.btn_ten.setHint(num >= cost_ten);
                    var cfgArr = this._proxy.getShengFixReward();
                    var index = 0;
                    for (var i = 0; i < this.count; i++) {
                        var pos = i + 1;
                        var icon = this._view["icon_" + pos];
                        var cfg = cfgArr[i];
                        if (cfg) {
                            icon.visible = true;
                            icon.setData(cfg);
                            continue;
                        }
                        var info = this._proxy.getShengInfo(index++);
                        if (info) {
                            icon.visible = true;
                            icon.setData(info);
                            continue;
                        }
                        icon.visible = false;
                    }
                    var param = game.getConfigByNameId("param.json" /* Param */, "guild_shengtan_max");
                    var val = this._proxy.model.shengtan_info && this._proxy.model.shengtan_info.value || 0;
                    this._view.progress.show(val, param.value);
                    var count = this._proxy.getShengCount();
                    this._view.reward.setData(count);
                    if (this._proxy.model.list_sheng_run) {
                        this.onTween(this._proxy.model.list_sheng_run);
                    }
                };
                /**走马灯 */
                UnionShengLotteryMdr.prototype.onOpenTween = function (n) {
                    var list = n.body;
                    this.onTween(list);
                };
                UnionShengLotteryMdr.prototype.onTween = function (list) {
                    if (!list || !list.length) {
                        return;
                    }
                    var info = list.shift();
                    var item = new union.UnionHorseLampItem();
                    var cfg = game.getConfigByNameId("shengtan_item.json" /* ShengtanItem */, info.index);
                    var prop = game.getConfigById(cfg.reward[0]);
                    var tips = game.getLanById("xianzong_tips6" /* xianzong_tips6 */);
                    var str = game.StringUtil.substitute(tips, [
                        game.TextUtil.addColor(info.name, "0xb14725"),
                        game.TextUtil.addColor(prop.name, "0x238e2c")
                    ]);
                    item.setData(str);
                    item.x = this._view.grp.width;
                    var y = Math.floor(Math.random() * this._view.grp.height - 40);
                    item.y = y < 0 ? 0 : y;
                    this._view.grp.addChild(item);
                    var delay = Math.floor(Math.random() * 1000 + 500);
                    var speed = Math.floor(Math.random() * 2000 + 3000);
                    Tween.get(item).delay(delay)
                        .exec(Handler.alloc(this, this.onTween, [list]))
                        .to({ x: -1 * item.width }, speed)
                        .exec(Handler.alloc(this, this.onClearItem, [item]));
                };
                UnionShengLotteryMdr.prototype.onClearItem = function (item) {
                    Tween.remove(item);
                    this._view.grp.removeChild(item);
                    item = null;
                };
                UnionShengLotteryMdr.prototype.onTen = function () {
                    if (!mod.BagUtil.checkPropCnt(this._proxy.sheng_cost[0], this._proxy.sheng_cost[1] * 9, 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_guild_draw(2 /* SHENG */, 2 /* TEN */);
                };
                UnionShengLotteryMdr.prototype.onOne = function () {
                    if (!mod.BagUtil.checkPropCnt(this._proxy.sheng_cost[0], this._proxy.sheng_cost[1], 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_guild_draw(2 /* SHENG */, 1 /* ONE */);
                };
                UnionShengLotteryMdr.prototype.onClickTips = function () {
                    mod.ViewMgr.getIns().showGainWaysTips(this._proxy.sheng_cost[0]);
                };
                /**提示说明 */
                UnionShengLotteryMdr.prototype.onExplain = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("zhanlizhuanpantips2" /* zhanlizhuanpantips2 */));
                };
                UnionShengLotteryMdr.prototype.onMoreReward = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "12" /* UnionLotteryReward */);
                };
                UnionShengLotteryMdr.prototype.onPreviewReward = function () {
                    // ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionPreview);
                    var cfgArr = game.getConfigListByName("guiid_random.json" /* GuiidRandom */);
                    var list = [];
                    for (var _i = 0, cfgArr_13 = cfgArr; _i < cfgArr_13.length; _i++) {
                        var cfg = cfgArr_13[_i];
                        list.push({
                            weight: cfg.weight,
                            award: cfg.award,
                            nameStr: "rolering_reward_type" + cfg.index
                        });
                    }
                    mod.ViewMgr.getIns().openPreviewReward(list);
                };
                UnionShengLotteryMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionShengLotteryMdr;
            }(game.MdrBase));
            union.UnionShengLotteryMdr = UnionShengLotteryMdr;
            __reflect(UnionShengLotteryMdr.prototype, "game.mod.union.UnionShengLotteryMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var ArrayCollection = eui.ArrayCollection;
            var UnionTianLotteryMdr = /** @class */ (function (_super) {
                __extends(UnionTianLotteryMdr, _super);
                function UnionTianLotteryMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionTianLotteryView);
                    _this._listData = new ArrayCollection();
                    /**光圈可跳icon坐标和id */
                    _this.posArr = [];
                    /**缓动延迟 */
                    _this._delay = 100;
                    /**动画圈数 */
                    _this.round = 1;
                    /**动画当前位置索引 */
                    _this.current = 0;
                    /**正在抽奖 */
                    _this.isTween = false;
                    return _this;
                }
                UnionTianLotteryMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = mod.Icon;
                    this._view.list.dataProvider = this._listData;
                };
                UnionTianLotteryMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_one, TouchEvent.TOUCH_TAP, this.onOne, this);
                    addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onTen, this);
                    addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
                    addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onNext, this);
                    addEventListener(this._view.btn_tips, TouchEvent.TOUCH_TAP, this.onClickTips, this);
                    //先播放动画再更新界面
                    this.onNt("on_tween_tian_lottery_start" /* ON_TWEEN_TIAN_LOTTERY_START */, this.onOpenTween, this);
                    this.onNt("on_update_tian_lottery_info" /* ON_UPDATE_TIAN_LOTTERY_INFO */, this.onUpdateView, this);
                };
                UnionTianLotteryMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_draw_open();
                    _super.prototype.onShow.call(this);
                    this.isTween = false;
                };
                UnionTianLotteryMdr.prototype.onInitView = function () {
                    this._view.btn_ten.label = this._view.btn_one.label = "";
                    this._view.btn_one.setImage("xuyuanyici");
                    this._view.btn_ten.setImage("xuyuanshici");
                    this._view.btn_ten.img_bg.source = "daanniu_lvse";
                    this._view.btn_ten.img_bg.height = this._view.btn_ten.height;
                    this._view.btn_ten.img_bg.width = this._view.btn_ten.width;
                };
                UnionTianLotteryMdr.prototype.onUpdateView = function () {
                    var tian_cost = this._proxy.tian_cost;
                    var num = mod.BagUtil.getPropCntByIdx(tian_cost[0]);
                    this._view.cost_one.initIcon(tian_cost[0]);
                    this._view.cost_ten.initIcon(tian_cost[0]);
                    var cost = tian_cost[1];
                    this._view.cost_one.lab_cost.text = num + "/" + cost;
                    this._view.cost_one.lab_cost.textColor = num >= cost ? 0x4dfd28 : 16731212 /* RED */;
                    this._view.cost_one.lab_cost.stroke = 1;
                    this._view.btn_one.setHint(num >= cost);
                    var cost_ten = cost * 9;
                    this._view.cost_ten.lab_cost.text = num + "/" + cost_ten;
                    this._view.cost_ten.lab_cost.textColor = num >= cost_ten ? 0x4dfd28 : 16731212 /* RED */;
                    this._view.cost_ten.lab_cost.stroke = 1;
                    this._view.btn_ten.setHint(num >= cost_ten);
                    if (this.posArr) {
                        this.posArr.length = 0;
                    }
                    var round = this._proxy.model.info_tian.stage;
                    var cfgMap = game.getConfigByNameId("guild_draw.json" /* GuildDraw */, round);
                    // let list: number[][] = [];
                    for (var k in cfgMap) {
                        var cfg = cfgMap[k];
                        // if (cfg.max_reward == 1) {
                        //     list.push(cfg.reward);
                        // }
                        var eff = this.idxs && this.idxs.indexOf(cfg.index) > -1;
                        var count = this._proxy.getTianCount(cfg.index);
                        var icon = this._view["icon_" + cfg.index];
                        icon.setData({ cfg: cfg, eff: eff, count: count });
                        if (cfg.num !== count) {
                            this.posArr.push({ index: cfg.index, x: icon.x, y: icon.y });
                        }
                    }
                    var param = game.GameConfig.getParamConfigById("guild_dajiang_show");
                    this._listData.source = param.value;
                    if (this.idxs) {
                        this.idxs.length = 0;
                    }
                    this._view.currentState = this._proxy.isReset ? "next" : "common";
                };
                UnionTianLotteryMdr.prototype.onOpenTween = function (n) {
                    var indexs = n.body;
                    this.indexs = indexs;
                    //选中跳过动画
                    if (this._view.checkbox.selected) {
                        this.onTweenOver();
                        return;
                    }
                    this.idxs = indexs.filter(function (item, index) { return indexs.indexOf(item) === index; });
                    this.last_index = indexs[indexs.length - 1];
                    this.current = 0;
                    this.onTween();
                };
                UnionTianLotteryMdr.prototype.onTween = function () {
                    var len = this.posArr.length;
                    var pos = this.posArr[this.current % len];
                    var img = this._view.img_sel;
                    if (!img.visible) {
                        img.visible = true;
                    }
                    img.x = pos.x - 8;
                    img.y = pos.y - 8;
                    if (this.current / len > this.round && pos.index == this.last_index) { //结束
                        this.onTweenOver();
                        return;
                    }
                    this.current++;
                    Tween.get(this).delay(this._delay).exec(Handler.alloc(this, this.onTween));
                };
                UnionTianLotteryMdr.prototype.onTweenOver = function () {
                    Tween.remove(this);
                    this.isTween = false;
                    this.onUpdateView();
                    //弹出奖励
                    this.onPopupReward();
                };
                UnionTianLotteryMdr.prototype.onPopupReward = function () {
                    var round = this._proxy.model.info_tian.stage;
                    var cfgMap = game.getConfigByNameId("guild_draw.json" /* GuildDraw */, round);
                    var map = {};
                    var list = [];
                    for (var _i = 0, _a = this.indexs; _i < _a.length; _i++) {
                        var index = _a[_i];
                        if (!map[index]) {
                            map[index] = cfgMap[index];
                        }
                        list.push(map[index].reward);
                    }
                    if (!list) {
                        console.error("检查协议或配置");
                        return;
                    }
                    var props = [];
                    for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                        var prop = list_1[_b];
                        props.push({ idx: Long.fromInt(prop[0]), cnt: prop[1], param1: null, param2: null, quality: null });
                    }
                    mod.PropTipsMgr.getIns().showBestPropCenter(props);
                    if (this.indexs) {
                        this.indexs.length = 0;
                    }
                };
                UnionTianLotteryMdr.prototype.onCheckTween = function () {
                    if (this.isTween) {
                        game.PromptBox.getIns().show(game.getLanById("zhengzaichoujiang" /* zhengzaichoujiang */));
                        return true;
                    }
                    else {
                        this.isTween = true;
                        return false;
                    }
                };
                UnionTianLotteryMdr.prototype.onNext = function () {
                    this._proxy.c2s_guild_draw_reset();
                };
                UnionTianLotteryMdr.prototype.onTen = function () {
                    if (!mod.BagUtil.checkPropCnt(this._proxy.tian_cost[0], this._proxy.tian_cost[1] * 9, 1 /* Dialog */)) {
                        return;
                    }
                    if (!this.onCheckTween()) {
                        this._proxy.c2s_guild_draw(1 /* TIAN */, 2 /* TEN */);
                    }
                };
                UnionTianLotteryMdr.prototype.onOne = function () {
                    if (!mod.BagUtil.checkPropCnt(this._proxy.tian_cost[0], this._proxy.tian_cost[1], 1 /* Dialog */)) {
                        return;
                    }
                    if (!this.onCheckTween()) {
                        this._proxy.c2s_guild_draw(1 /* TIAN */, 1 /* ONE */);
                    }
                };
                /**提示说明 */
                UnionTianLotteryMdr.prototype.onExplain = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("zhanlizhuanpantips1" /* zhanlizhuanpantips1 */));
                };
                UnionTianLotteryMdr.prototype.onClickTips = function () {
                    mod.ViewMgr.getIns().showGainWaysTips(this._proxy.tian_cost[0]);
                };
                UnionTianLotteryMdr.prototype.onHide = function () {
                    Tween.remove(this);
                    this.isTween = false;
                    _super.prototype.onHide.call(this);
                };
                return UnionTianLotteryMdr;
            }(game.MdrBase));
            union.UnionTianLotteryMdr = UnionTianLotteryMdr;
            __reflect(UnionTianLotteryMdr.prototype, "game.mod.union.UnionTianLotteryMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionWelfareMainMdr = /** @class */ (function (_super) {
                __extends(UnionWelfareMainMdr, _super);
                function UnionWelfareMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "fulidatingbiaoqiantubiao",
                            mdr: union.UnionWelfareMdr,
                            title: "union_title_9" /* union_title_9 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "07" /* UnionWelfare */]
                        }
                    ];
                    return _this;
                }
                return UnionWelfareMainMdr;
            }(mod.WndBaseMdr));
            union.UnionWelfareMainMdr = UnionWelfareMainMdr;
            __reflect(UnionWelfareMainMdr.prototype, "game.mod.union.UnionWelfareMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            /**福利大厅 */
            var UnionWelfareMdr = /** @class */ (function (_super) {
                __extends(UnionWelfareMdr, _super);
                function UnionWelfareMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionWelfareView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionWelfareMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionWelfareItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionWelfareMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_explain, egret.TouchEvent.TOUCH_TAP, this.onClickExplain);
                    this.onNt("on_update_welfare_info" /* ON_UPDATE_WELFARE_INFO */, this.onUpdateView, this);
                };
                UnionWelfareMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_charge_ui();
                    _super.prototype.onShow.call(this);
                };
                UnionWelfareMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    if (!model.mvp_count) {
                        this._view.lab_nobody.visible = true;
                        this._view.img_nobody.visible = true;
                        this._view.lab_count.visible = false;
                        this._view.lab_name.visible = false;
                        this._view.head.visible = false;
                        this.eft_id && this.removeEffect(this.eft_id);
                    }
                    else {
                        this._view.lab_nobody.visible = false;
                        this._view.img_nobody.visible = false;
                        this._view.lab_count.visible = true;
                        this._view.lab_name.visible = true;
                        this._view.head.visible = true;
                        var cfg = game.getConfigByNameId("param.json" /* Param */, "guiid_charge");
                        this.eft_id = this.addEftByParent(game.ResUtil.getTitleSrc(cfg.value[0], 0), this._view.gr_eft);
                        this._view.head.updateShow(model.mvp.head, model.mvp.head_frame, model.mvp.sex, model.mvp.vip);
                        this._view.lab_name.text = model.mvp.name;
                        this._view.lab_count.textFlow = game.TextUtil.parseHtml("\u4E3A\u5B97\u95E8\u53D1\u653E" + game.TextUtil.addColor("" + model.mvp_count, "0xeca240") + "\u6B21\u798F\u5229");
                    }
                    var list = this._proxy.getWelfareList();
                    this._listData.source = list;
                    this._view.img_ditu.visible = !list.length;
                };
                UnionWelfareMdr.prototype.onClickExplain = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("xianzong_tips16" /* xianzong_tips16 */));
                };
                UnionWelfareMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionWelfareMdr;
            }(game.EffectMdrBase));
            union.UnionWelfareMdr = UnionWelfareMdr;
            __reflect(UnionWelfareMdr.prototype, "game.mod.union.UnionWelfareMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var BitmapFillMode = egret.BitmapFillMode;
            var UnionBossHpItem = /** @class */ (function (_super) {
                __extends(UnionBossHpItem, _super);
                function UnionBossHpItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionBossHpItem.prototype.onAddToStage = function () {
                    // this.touchEnabled = false;
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    this.img_hp0.fillMode = this.img_mask.fillMode = this.img_bai.fillMode = BitmapFillMode.REPEAT;
                    this.touchEnabled = true;
                    this.btn_reward.visible = true;
                    // this.lab_hp.text = "";
                };
                UnionBossHpItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("monster1.json" /* Monster */, this.data.index);
                    this.lab_name.text = cfg.name;
                    this.img_icon.source = cfg.res_id;
                    var _per = this.data.hp / this.data.boss_hp;
                    var _cur = 1;
                    this.img_hp0.width = this.img_mask.width = this.img_bai.width = _per * 321;
                    this.img_bai.alpha = 1;
                    // self._lastNum = _cur;
                    this.lab_hp.text = Math.ceil(_per * 100) + "%";
                    var _line = _cur % 10; //Math.max(0, self._maxLine - _cur);
                    this.img_hp0.source = this.img_mask.source = "boss_hp" + (_line > 0 ? 10 - _line : 0);
                    _line = _line > 0 ? _line - 1 : 9;
                    this.img_hp1.source = _cur == 1 ? "" : "boss_hp" + (_line > 0 ? 10 - _line : 0);
                };
                UnionBossHpItem.prototype.setData = function (data) {
                    this.data = data;
                };
                return UnionBossHpItem;
            }(mod.BaseRenderer));
            union.UnionBossHpItem = UnionBossHpItem;
            __reflect(UnionBossHpItem.prototype, "game.mod.union.UnionBossHpItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionFightView = /** @class */ (function (_super) {
                __extends(UnionFightView, _super);
                function UnionFightView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionFightSkin";
                    return _this;
                }
                return UnionFightView;
            }(eui.Component));
            union.UnionFightView = UnionFightView;
            __reflect(UnionFightView.prototype, "game.mod.union.UnionFightView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var UnionKillItem = /** @class */ (function (_super) {
                __extends(UnionKillItem, _super);
                function UnionKillItem() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionKillItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    this.list.itemRenderer = mod.Icon;
                    this.list.dataProvider = this._listData;
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                UnionKillItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this._status = !this.data.boss_hp;
                    this._cfg = game.getConfigByNameId("guild_zhanyaotai.json" /* GuildZhanyaotai */, this.data.index);
                    if (this._status) {
                        this.progress.visible = false;
                        this.lab_master.visible = false;
                        this.timeItem.visible = false;
                        this.coinItem.visible = false;
                        this.lab_success.visible = true;
                        this.list.visible = true;
                        this._listData.replaceAll(this._cfg.rewards3);
                        this.btn.label = "一键领取";
                        this._endTime = 0;
                        TimeMgr.removeUpdateItem(this);
                    }
                    else {
                        this.list.visible = false;
                        this.lab_success.visible = false;
                        this.timeItem.visible = true;
                        this.progress.visible = true;
                        this.progress.show(this.data.boss_hp, this._cfg.boss_hp);
                        this.lab_master.visible = true;
                        this.lab_master.textFlow = game.TextUtil.parseHtml("召唤:" + game.TextUtil.addColor(this.data.name, 3496307 /* DEFAULT */));
                        this.coinItem.visible = true;
                        this.coinItem.setData(this._cfg.atk_cost[0][0]);
                        this.btn.label = "斩妖";
                        this._endTime = this.data.endtime.toNumber();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    // this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._cfg.name, ColorUtil.getColorByQuality1(this._cfg.quality)));
                    // this.head.updateBossHeadShow(this._cfg.BOSS, 0);
                    this.img_head.source = "touxiang_boss_" + this._cfg.index;
                    this.img_name.source = "union_kill_boss_" + this._cfg.index;
                    this.btn.setHint(this._proxy.getBossHint(this.data));
                };
                UnionKillItem.prototype.update = function (time) {
                    var serverTime = TimeMgr.time.serverTimeSecond;
                    var leftTime = this._endTime - serverTime;
                    this.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                UnionKillItem.prototype.onClick = function () {
                    if (this._status) {
                        this._proxy.c2s_guild_zhanyaotai_click(3, this.data.id);
                    }
                    else {
                        if (!mod.BagUtil.checkPropCnt(this._cfg.atk_cost[0][0], this._cfg.atk_cost[0][1], 1 /* Dialog */)) {
                            return;
                        }
                        this._proxy.c2s_guild_zhanyaotai_click(2, this.data.id);
                    }
                };
                return UnionKillItem;
            }(mod.BaseRenderer));
            union.UnionKillItem = UnionKillItem;
            __reflect(UnionKillItem.prototype, "game.mod.union.UnionKillItem", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionKillTipsView = /** @class */ (function (_super) {
                __extends(UnionKillTipsView, _super);
                function UnionKillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionKillTipsSkin";
                    return _this;
                }
                return UnionKillTipsView;
            }(eui.Component));
            union.UnionKillTipsView = UnionKillTipsView;
            __reflect(UnionKillTipsView.prototype, "game.mod.union.UnionKillTipsView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionKillView = /** @class */ (function (_super) {
                __extends(UnionKillView, _super);
                function UnionKillView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionKillSkin";
                    return _this;
                }
                return UnionKillView;
            }(eui.Component));
            union.UnionKillView = UnionKillView;
            __reflect(UnionKillView.prototype, "game.mod.union.UnionKillView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionRankTipsView = /** @class */ (function (_super) {
                __extends(UnionRankTipsView, _super);
                function UnionRankTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionRankTipsSkin";
                    return _this;
                }
                return UnionRankTipsView;
            }(eui.Component));
            union.UnionRankTipsView = UnionRankTipsView;
            __reflect(UnionRankTipsView.prototype, "game.mod.union.UnionRankTipsView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var UnionTreasureHelpItem = /** @class */ (function (_super) {
                __extends(UnionTreasureHelpItem, _super);
                function UnionTreasureHelpItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionTreasureHelpItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                UnionTreasureHelpItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var job_str = "[" + this._proxy.getJobTextByJob(this.data.guild_job) + "]";
                    var name_str = this.data.name;
                    var content = "邀请你协助开启";
                    var cfg = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this.data.boss_index);
                    var box_str = game.TextUtil.addColor(cfg.box_name, game.ColorUtil.getColorByQuality1(cfg.box_quality));
                    this.lab.textFlow = game.TextUtil.parseHtml(job_str + name_str + content + box_str);
                };
                UnionTreasureHelpItem.prototype.onClick = function () {
                    this._proxy.c2s_guild_yibao_click(6, null, this.data.u_id);
                };
                return UnionTreasureHelpItem;
            }(mod.BaseRenderer));
            union.UnionTreasureHelpItem = UnionTreasureHelpItem;
            __reflect(UnionTreasureHelpItem.prototype, "game.mod.union.UnionTreasureHelpItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureHelpView = /** @class */ (function (_super) {
                __extends(UnionTreasureHelpView, _super);
                function UnionTreasureHelpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionTreasureHelpSkin";
                    return _this;
                }
                return UnionTreasureHelpView;
            }(eui.Component));
            union.UnionTreasureHelpView = UnionTreasureHelpView;
            __reflect(UnionTreasureHelpView.prototype, "game.mod.union.UnionTreasureHelpView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var UnionTreasureItem = /** @class */ (function (_super) {
                __extends(UnionTreasureItem, _super);
                function UnionTreasureItem() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.status = 0;
                    return _this;
                }
                UnionTreasureItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.box, this.onClickBox, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClickBtn, this);
                };
                UnionTreasureItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        this.onNull();
                        return;
                    }
                    var cfg = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this.data.boss_index);
                    this.box.icon = "yibao_baoxiang_" + this.data.boss_index;
                    this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.box_name, game.ColorUtil.getColorByQuality1(cfg.box_quality)));
                    this.box.visible = true;
                    this.box.setHint(false);
                    this.btn.setHint(true);
                    this.endTime = this.data.time.toNumber();
                    // if (TimeMgr.time.serverTimeSecond < this.endTime || !this.endTime) {
                    //     this.onStart();
                    //     if (!this.endTime) {
                    //         this.timeItem.updateLeftTime(cfg.time, "", getLanById(LanDef.battle_cue29));
                    //         this.btn.label = "解锁宝箱";
                    //         this.status = 1;
                    //     } else {
                    //         this.update(TimeMgr.time);
                    //         this.btn.label = "邀请加速";
                    //         this.status = 2;
                    //         TimeMgr.addUpdateItem(this, 1000);
                    //     }
                    // } else {
                    //     this.onEnd();
                    // }
                    // this.btn.setHint(this.status == 3);
                    var xianzong_yibao_jiasu_shangxian = this._proxy.xianzong_yibao_jiasu_shangxian;
                    var count = this.data.count;
                    var timeEnd = this.endTime <= TimeMgr.time.serverTimeSecond;
                    var helpEnd = count && count >= xianzong_yibao_jiasu_shangxian;
                    if (this.endTime && (timeEnd || helpEnd)) {
                        this.onEnd();
                        return;
                    }
                    this.onStart();
                    if (!this.endTime) {
                        this.timeItem.updateLeftTime(cfg.time, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                        this.btn.label = "解锁宝箱";
                        this.status = 1;
                        return;
                    }
                    this.update(TimeMgr.time);
                    TimeMgr.addUpdateItem(this, 1000);
                    if (!this.data.hasOwnProperty("count")) {
                        this.btn.label = "邀请加速";
                        this.status = 2;
                        return;
                    }
                    this.onInvite();
                    this.bar.show(count, xianzong_yibao_jiasu_shangxian, false);
                };
                UnionTreasureItem.prototype.onNull = function () {
                    this.bar.visible = this.btn.visible = this.timeItem.visible = this.lab.visible = this.box.visible = false;
                    this.lab_name.text = "宝箱位";
                    this.status = 0;
                    TimeMgr.removeUpdateItem(this);
                };
                UnionTreasureItem.prototype.onStart = function () {
                    this.bar.visible = this.lab.visible = false;
                    this.btn.visible = this.timeItem.visible = true;
                };
                UnionTreasureItem.prototype.onEnd = function () {
                    this.bar.visible = this.timeItem.visible = this.btn.visible = false;
                    this.lab.visible = true;
                    this.box.setHint(true);
                    this.status = 3;
                    TimeMgr.removeUpdateItem(this);
                };
                UnionTreasureItem.prototype.onInvite = function () {
                    this.btn.visible = false;
                    this.bar.visible = true;
                };
                UnionTreasureItem.prototype.update = function (time) {
                    var leftTime = this.endTime - TimeMgr.time.serverTimeSecond;
                    this.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    if (leftTime <= 0) {
                        this.onEnd();
                        return;
                    }
                };
                UnionTreasureItem.prototype.onClickBox = function () {
                    if (this.status !== 3) {
                        var cfg = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this.data.boss_index);
                        mod.ViewMgr.getIns().showBoxReward("", cfg.rewards2);
                        return;
                    }
                    var pos = this.itemIndex + 1;
                    this._proxy.c2s_guild_yibao_click(4, pos);
                };
                UnionTreasureItem.prototype.onClickBtn = function () {
                    var pos = this.itemIndex + 1;
                    if (this.status == 1) {
                        this._proxy.c2s_guild_yibao_click(3, pos);
                    }
                    else if (this.status == 2) {
                        this._proxy.c2s_guild_yibao_click(5, pos);
                    }
                };
                return UnionTreasureItem;
            }(mod.BaseRenderer));
            union.UnionTreasureItem = UnionTreasureItem;
            __reflect(UnionTreasureItem.prototype, "game.mod.union.UnionTreasureItem", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var UnionTreasureRewardItem = /** @class */ (function (_super) {
                __extends(UnionTreasureRewardItem, _super);
                function UnionTreasureRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionTreasureRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                };
                UnionTreasureRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.lab.textFlow = game.TextUtil.parseHtml(this.data.str);
                    this.progress.show(this.data.value, this.data.target, false);
                };
                return UnionTreasureRewardItem;
            }(mod.BaseRenderer));
            union.UnionTreasureRewardItem = UnionTreasureRewardItem;
            __reflect(UnionTreasureRewardItem.prototype, "game.mod.union.UnionTreasureRewardItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureRewardView = /** @class */ (function (_super) {
                __extends(UnionTreasureRewardView, _super);
                function UnionTreasureRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionTreasureRewardSkin";
                    return _this;
                }
                return UnionTreasureRewardView;
            }(eui.Component));
            union.UnionTreasureRewardView = UnionTreasureRewardView;
            __reflect(UnionTreasureRewardView.prototype, "game.mod.union.UnionTreasureRewardView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureView = /** @class */ (function (_super) {
                __extends(UnionTreasureView, _super);
                function UnionTreasureView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionTreasureSkin";
                    return _this;
                }
                return UnionTreasureView;
            }(eui.Component));
            union.UnionTreasureView = UnionTreasureView;
            __reflect(UnionTreasureView.prototype, "game.mod.union.UnionTreasureView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TimeMgr = base.TimeMgr;
            var UnionFightMdr = /** @class */ (function (_super) {
                __extends(UnionFightMdr, _super);
                function UnionFightMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionFightView);
                    _this.HP_WIDTH = 350; //血条宽度
                    _this.ALL_HP = 10000;
                    _this.self = 10000;
                    _this.boss = 10000;
                    return _this;
                    // this.isEasyHide = true;
                }
                UnionFightMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                };
                UnionFightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                UnionFightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.boss_all = this._showArgs.boss_all;
                    this.boss_hp = this._showArgs.boss_hp;
                    this.boss_deduct = this._showArgs.boss_deduct;
                    this.boss_index = this._showArgs.boss_index;
                    this.id = this._showArgs.id;
                    this.boss_end_hp = this.boss_deduct > this.boss_hp ? 0 : (this.boss_hp - this.boss_deduct) / 100 * this.ALL_HP;
                    console.error(this.boss_end_hp);
                    this.onUpdateInfo();
                };
                UnionFightMdr.prototype.update = function (time) {
                    if (this.boss <= this.boss_end_hp) {
                        this.onOver();
                        return;
                    }
                    this.onUpdateRandomHP();
                };
                UnionFightMdr.prototype.onUpdateInfo = function () {
                    this.self = this.ALL_HP;
                    this.boss = this.ALL_HP * this.boss_hp / this.boss_all;
                    this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;
                    this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateMyHead();
                    var cfg = game.getConfigByNameId("monster1.json" /* Monster */, this.boss_index);
                    this._view.lab_name2.text = cfg.name;
                    // this._view.powerLabel2.setPowerValue();
                    this._view.powerLabel2.visible = false;
                    this._view.head2.updateBossHeadShow(this.boss_index, 0);
                    TimeMgr.addUpdateItem(this, 500);
                };
                UnionFightMdr.prototype.onUpdateRandomHP = function () {
                    this.self -= Math.random() * 500;
                    this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;
                    this.boss -= Math.random() * 500 + 500;
                    this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
                };
                UnionFightMdr.prototype.onOver = function () {
                    this._proxy.c2s_guild_zhanyaotai_click(2, this.id);
                    TimeMgr.removeUpdateItem(this);
                    this.hide();
                };
                return UnionFightMdr;
            }(game.MdrBase));
            union.UnionFightMdr = UnionFightMdr;
            __reflect(UnionFightMdr.prototype, "game.mod.union.UnionFightMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionKillMainMdr = /** @class */ (function (_super) {
                __extends(UnionKillMainMdr, _super);
                function UnionKillMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "zhanyaotai",
                            mdr: union.UnionKillMdr,
                            title: "union2_title_1" /* union2_title_1 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */]
                        }
                    ];
                    return _this;
                }
                return UnionKillMainMdr;
            }(mod.WndBaseMdr));
            union.UnionKillMainMdr = UnionKillMainMdr;
            __reflect(UnionKillMainMdr.prototype, "game.mod.union.UnionKillMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var UnionKillMdr = /** @class */ (function (_super) {
                __extends(UnionKillMdr, _super);
                function UnionKillMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionKillView);
                    /**0没召唤 1召唤中 2领取 */
                    _this._status = 0;
                    _this._listData = new ArrayCollection();
                    _this._rewardData = new ArrayCollection();
                    return _this;
                }
                UnionKillMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionKillItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardData;
                    this._view.lab_help.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("请求协助", 31431 /* BLUE */));
                    this._view.btn_summon.setImage("zhaohuanmeishuzi");
                };
                UnionKillMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
                    addEventListener(this._view.btn_summon, TouchEvent.TOUCH_TAP, this.onClickSummon);
                    addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
                    addEventListener(this._view.lab_help, TouchEvent.TOUCH_TAP, this.onClickHelp);
                    this.onNt("on_update_kill_info" /* ON_UPDATE_KILL_INFO */, this.onUpdateView, this);
                };
                UnionKillMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // this.onUpdateView();
                    this._proxy.c2s_guild_zhanyaotai_request(1);
                    this._proxy.open_fun = "18" /* UnionKill */;
                    this.onUpdateTime();
                };
                UnionKillMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                UnionKillMdr.prototype.onUpdateView = function () {
                    this._listData.replaceAll(this._proxy.boss_list);
                    this._view.grp_tips_private.visible = this._proxy.boss_list.length <= 0;
                    this._data = this._proxy.boss_data;
                    var data = this._data;
                    if (data) {
                        this._cfg = game.getConfigByNameId("guild_zhanyaotai.json" /* GuildZhanyaotai */, data.index);
                        this._endTime2 = data.boss_hp > 0 ? data.endtime.toNumber() : 0;
                        this.update(TimeMgr.time);
                        this._status = data.boss_hp == 0 ? 2 : 1;
                        this._view.progress.show(data.boss_hp, this._cfg.boss_hp);
                        this._view.lab_master.textFlow = game.TextUtil.parseHtml("召唤:" + game.TextUtil.addColor(game.RoleVo.ins.name, 3496307 /* DEFAULT */));
                    }
                    else {
                        this._cfg = this._proxy.vip_boss;
                        this._status = 0;
                        this._view.lab_master.text = "我的召唤";
                        this._view.progress.show(this._cfg.boss_hp, this._cfg.boss_hp);
                    }
                    // this._view.head2.updateBossHeadShow(this._cfg.BOSS, 0);
                    this._view.img_head.source = "touxiang_boss_" + this._cfg.index;
                    // this._view.lab_boss.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._cfg.name, ColorUtil.getColorByQuality1(this._cfg.quality)));
                    this._view.img_name.source = "union_kill_boss_" + this._cfg.index;
                    this.onUpdateStatus();
                    if (this._view.coinItem) {
                        this._cost = this._cfg.atk_cost[0];
                        this._view.coinItem.setData(this._cfg.atk_cost[0][0]);
                    }
                    if (this._view.list_reward.visible) {
                        this._rewardData.replaceAll(this._cfg.rewards3);
                    }
                    this._view.btn_fight.setHint(this._proxy.getMyBossHint());
                    this._view.btn_summon.setHint(this._proxy.getZhaohuanHint());
                    this._view.btn_rank.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */, "140" /* UnionRank */]));
                    this.onUpdateMvp();
                };
                UnionKillMdr.prototype.onUpdateStatus = function () {
                    switch (this._status) {
                        case 1:
                            this._view.lab_wait.visible = false;
                            this._view.btn_summon.visible = false;
                            this._view.list_reward.visible = false;
                            this._view.timeItem2.visible = true;
                            this._view.coinItem.visible = true;
                            this._view.lab_master.visible = true;
                            this._view.lab_help.visible = true;
                            this._view.progress.visible = true;
                            this._view.btn_preview.visible = true;
                            this._view.btn_fight.visible = true;
                            this._view.btn_fight.label = "斩妖";
                            break;
                        case 2:
                            this._view.btn_summon.visible = false;
                            this._view.btn_preview.visible = false;
                            this._view.lab_master.visible = false;
                            this._view.timeItem2.visible = false;
                            this._view.coinItem.visible = false;
                            this._view.lab_help.visible = false;
                            this._view.progress.visible = false;
                            this._view.list_reward.visible = true;
                            this._view.btn_fight.visible = true;
                            this._view.btn_fight.label = "一键领取";
                            this._view.lab_wait.visible = true;
                            this._view.lab_wait.text = "成功击杀";
                            break;
                        default:
                            this._view.list_reward.visible = false;
                            this._view.btn_fight.visible = false;
                            this._view.lab_help.visible = false;
                            this._view.timeItem2.visible = false;
                            this._view.coinItem.visible = false;
                            this._view.btn_summon.visible = true;
                            this._view.lab_master.visible = true;
                            this._view.btn_preview.visible = true;
                            this._view.progress.visible = true;
                            this._view.lab_wait.visible = true;
                            this._view.lab_wait.text = "等待召唤";
                            break;
                    }
                };
                UnionKillMdr.prototype.onUpdateMvp = function () {
                    var mvp = this._proxy.boss_mvp;
                    if (!mvp || !mvp.name) {
                        this._view.lab_nobody.visible = true;
                        // this._view.img_nobody.visible = true;
                        this._view.lab_count.visible = false;
                        this._view.lab_name.visible = false;
                        this._view.lab_power.visible = false;
                        this._view.img_zhanli.visible = false;
                        // this._view.head.visible = false;
                        this._view.head.defaultHeadShow();
                    }
                    else {
                        this._view.lab_nobody.visible = false;
                        // this._view.img_nobody.visible = false;
                        this._view.lab_count.visible = true;
                        this._view.lab_name.visible = true;
                        // this._view.head.visible = true;
                        this._view.lab_power.visible = true;
                        this._view.img_zhanli.visible = true;
                        this._view.head.updateShow(mvp.head, mvp.head_frame, mvp.sex, mvp.vip);
                        this._view.lab_name.text = mvp.name;
                        this._view.lab_count.textFlow = game.TextUtil.parseHtml("\u65A9\u5996\u79EF\u5206\uFF1A" + game.TextUtil.addColor("" + mvp.value, "0xeca240"));
                        this._view.lab_power.text = game.StringUtil.getPowerNumStr(mvp.showpower && mvp.showpower.toNumber() || 0);
                    }
                };
                UnionKillMdr.prototype.update = function (time) {
                    var serverTime = TimeMgr.time.serverTimeSecond;
                    var leftTime = this._endTime - serverTime;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    var leftTime2 = this._endTime2 - serverTime;
                    this._view.timeItem2.updateLeftTime(leftTime2, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    // if (leftTime2 <= 0) {
                    //     this._proxy.c2s_guild_zhanyaotai_request(1);
                    // }
                };
                UnionKillMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "19" /* UnionKillRank */);
                };
                UnionKillMdr.prototype.onClickPreview = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "20" /* UnionKillTips */, { showBtn: false });
                };
                UnionKillMdr.prototype.onClickSummon = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "20" /* UnionKillTips */, { showBtn: true });
                };
                UnionKillMdr.prototype.onClickFight = function () {
                    if (this._status == 1) {
                        if (!mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1], 1 /* Dialog */)) {
                            return;
                        }
                        mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "32" /* UnionFight */, {
                            boss_all: this._cfg.boss_hp,
                            boss_hp: this._data.boss_hp,
                            boss_deduct: this._cfg.atk_cost_hp,
                            boss_index: this._cfg.BOSS,
                            id: this._data.id
                        });
                        // this._proxy.c2s_guild_zhanyaotai_click(2, this._data.id);
                    }
                    else if (this._status == 2) {
                        this._proxy.c2s_guild_zhanyaotai_click(3, this._data.id);
                    }
                };
                UnionKillMdr.prototype.onClickHelp = function () {
                    this._proxy.c2s_guild_zhanyaotai_help_chat(this._data.id);
                };
                UnionKillMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                return UnionKillMdr;
            }(game.EffectMdrBase));
            union.UnionKillMdr = UnionKillMdr;
            __reflect(UnionKillMdr.prototype, "game.mod.union.UnionKillMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionKillRank2Mdr = /** @class */ (function (_super) {
                __extends(UnionKillRank2Mdr, _super);
                function UnionKillRank2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2 /* Person */;
                    return _this;
                }
                return UnionKillRank2Mdr;
            }(union.UnionKillRankMdr));
            union.UnionKillRank2Mdr = UnionKillRank2Mdr;
            __reflect(UnionKillRank2Mdr.prototype, "game.mod.union.UnionKillRank2Mdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionKillRankMainMdr = /** @class */ (function (_super) {
                __extends(UnionKillRankMainMdr, _super);
                function UnionKillRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongpaimingbiaoqiantubiao",
                            mdr: union.UnionKillRankMdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */, "19" /* UnionKillRank */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "personal_rank_",
                            mdr: union.UnionKillRank2Mdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */, "19" /* UnionKillRank */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                return UnionKillRankMainMdr;
            }(mod.WndBaseMdr));
            union.UnionKillRankMainMdr = UnionKillRankMainMdr;
            __reflect(UnionKillRankMainMdr.prototype, "game.mod.union.UnionKillRankMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionMod = /** @class */ (function (_super) {
                __extends(UnionMod, _super);
                function UnionMod() {
                    return _super.call(this, "55" /* Union */) || this;
                }
                UnionMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                UnionMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(217 /* Union */, union.UnionProxy);
                };
                UnionMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* UnionIn */, union.UnionInMainMdr);
                    this.regMdr("03" /* UnionApply */, union.UnionApplyListMdr); //申请列表弹窗
                    this.regMdr("04" /* UnionMember */, union.UnionMemberPopupMdr); //成员信息弹窗
                    this.regMdr("05" /* UnionDonate */, union.UnionDonateMdr); //宗门捐献弹窗
                    this.regMdr("06" /* UnionWage */, union.UnionWageMdr); //每日俸禄弹窗
                    this.regMdr("08" /* UnionRename */, union.UnionRenameMdr); //改名弹窗
                    this.regMdr("10" /* UnionHeroShop */, union.UnionShopMainMdr); //仙尊秘宝
                    this.regMdr("11" /* UnionHero */, union.UnionSetHeroMdr); //设置仙尊
                    this.regMdr("02" /* UnionWelcome */, union.UnionFirstMdr); //首次加入欢迎界面
                    this.regMdr("35" /* UnionRankReward */, union.UnionRankTipsMdr); //排行榜结算领取奖励
                    // --------------------建筑功能界面--------------------
                    this.regMdr("07" /* UnionWelfare */, union.UnionWelfareMainMdr); //福利大厅
                    this.regMdr("09" /* UnionLottery */, union.UnionLotteryMainMdr); //天坛/圣坛
                    this.regMdr("12" /* UnionLotteryReward */, union.UnionLotteryRewardMdr); //圣坛更多大奖
                    this.regMdr("14" /* UnionTreasure */, union.UnionTreasureMainMdr); //遗宝
                    this.regMdr("15" /* UnionTreasureRank */, union.UnionTreasureRankMainMdr); //遗宝
                    this.regMdr("16" /* UnionTreasureHelp */, union.UnionTreasureHelpMdr); //遗宝
                    this.regMdr("17" /* UnionTreasureReward */, union.UnionTreasureRewardMdr); //遗宝
                    this.regMdr("18" /* UnionKill */, union.UnionKillMainMdr); //斩妖台
                    this.regMdr("19" /* UnionKillRank */, union.UnionKillRankMainMdr); //斩妖台
                    this.regMdr("20" /* UnionKillTips */, union.UnionKillTipsMdr); //斩妖台
                    this.regMdr("21" /* UnionRankTips */, union.UnionRankSectionMdr); //区间排行
                    this.regMdr("32" /* UnionFight */, union.UnionFightMdr); //假战斗
                    this.regMdr("22" /* UnionStorage */, union.UnionStorageMainMdr); //仓库
                    this.regMdr("23" /* UnionDonateEquip */, union.UnionDonateEquipMdr); //仓库捐献
                    this.regMdr("24" /* UnionStoreTips */, union.UnionStoreTipsMdr); //宗门宝库仙玉兑换
                    this.regMdr("25" /* UnionBook */, union.UnionBookMainMdr); //书斋
                    this.regMdr("26" /* UnionBeast */, union.UnionBeastMainMdr); //仙兽
                    this.regMdr("27" /* UnionBeastReward */, union.UnionBeastRewardMdr); //仙兽周奖
                    this.regMdr("28" /* UnionBeastRank */, union.UnionBeastRankMainMdr); //仙兽排行
                    this.regMdr("29" /* UnionBeastRing */, union.UnionBeastBuffTipsMdr); //仙兽光环
                    this.regMdr("30" /* UnionRecycle */, union.UnionRecycleMdr); //仓库回收
                    this.regMdr("33" /* UnionBookUpTips */, union.UnionBookUpTipsMdr); //书斋升阶提示
                    this.regMdr("34" /* UnionBookUpTips2 */, union.UnionBookUpTipsMdr2); //书斋升阶提示
                };
                return UnionMod;
            }(game.ModBase));
            union.UnionMod = UnionMod;
            __reflect(UnionMod.prototype, "game.mod.union.UnionMod");
            gso.modCls.push(UnionMod);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var UnionKillTipsMdr = /** @class */ (function (_super) {
                __extends(UnionKillTipsMdr, _super);
                function UnionKillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionKillTipsView);
                    _this._listData = new ArrayCollection();
                    _this._summonData = new ArrayCollection();
                    _this._killData = new ArrayCollection();
                    _this._list = [
                        {
                            icon: "tubiao_boss_1",
                            showHint: false
                        },
                        {
                            icon: "tubiao_boss_2",
                            showHint: false
                        },
                        {
                            icon: "tubiao_boss_3",
                            showHint: false
                        }
                    ];
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionKillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = mod.TabSecondItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_summon.itemRenderer = mod.Icon;
                    this._view.list_summon.dataProvider = this._summonData;
                    this._view.list_kill.itemRenderer = mod.Icon;
                    this._view.list_kill.dataProvider = this._killData;
                };
                UnionKillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onTabChanged, this);
                };
                UnionKillTipsMdr.prototype.onShow = function () {
                    // todo skin标题
                    _super.prototype.onShow.call(this);
                    this.showBtn = this._showArgs.showBtn || false;
                    this.onUpdateType();
                    this.onUpdateView();
                };
                UnionKillTipsMdr.prototype.onUpdateType = function () {
                    var cfgArr = game.getConfigListByName("guild_zhanyaotai.json" /* GuildZhanyaotai */);
                    for (var i = 0; i < cfgArr.length; i++) {
                        this._list[i].param = cfgArr[i];
                    }
                    this._listData.source = this._list;
                    this._view.list.selectedIndex = 0;
                    this._cfg = this._listData.getItemAt(0).param;
                };
                UnionKillTipsMdr.prototype.onUpdateView = function () {
                    this._view.costIcon.visible = this.showBtn && !!this._cfg.costs;
                    this._view.btn.visible = this.showBtn;
                    if (this.eft_id) {
                        this.removeEffect(this.eft_id);
                    }
                    this.eft_id = this.addMonster(this._cfg.BOSS, this._view.grp_eff);
                    this._view.nameItem.updateShow(this._cfg.name, this._cfg.quality);
                    this._killData.replaceAll(this._cfg.rewards3);
                    this._summonData.replaceAll(this._cfg.rewards1);
                    if (this._view.costIcon.visible) {
                        // this._view.costIcon.setData(this._cfg.costs[0][0]);
                        this._view.costIcon.updateShow(this._cfg.costs[0]);
                    }
                    this._view.lab_limit.visible = !!this._cfg.vip_limit && this.showBtn;
                    if (this._view.lab_limit.visible) {
                        this._view.lab_limit.text = "VIP" + this._cfg.vip_limit + "\u6BCF\u5929\u53EF\u514D\u8D39\u53EC\u5524" + game.StringUtil.getCNBynumber(this._cfg.count) + "\u6B21";
                    }
                };
                UnionKillTipsMdr.prototype.onTabChanged = function (e) {
                    var data = this._listData.getItemAt(e.itemIndex);
                    this._cfg = data.param;
                    this.onUpdateView();
                };
                UnionKillTipsMdr.prototype.onClick = function () {
                    if (this._cfg.count && this._proxy.getSummonCount(this._cfg.index) >= this._cfg.count) {
                        game.PromptBox.getIns().show("今日召唤次数已用完");
                        return;
                    }
                    if (this._cfg.vip_limit) {
                        if (mod.VipUtil.getShowVipLv() < this._cfg.vip_limit) {
                            mod.ViewMgr.getIns().openCommonRechargeView();
                            this.hide();
                            return;
                        }
                    }
                    else {
                        if (!mod.BagUtil.checkPropCnt(this._cfg.costs[0][0], this._cfg.costs[0][1], 1 /* Dialog */)) {
                            return;
                        }
                    }
                    this._proxy.c2s_guild_zhanyaotai_click(1, null, this._cfg.index);
                    this.hide();
                };
                UnionKillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionKillTipsMdr;
            }(game.EffectMdrBase));
            union.UnionKillTipsMdr = UnionKillTipsMdr;
            __reflect(UnionKillTipsMdr.prototype, "game.mod.union.UnionKillTipsMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var UnionRankSectionMdr = /** @class */ (function (_super) {
                __extends(UnionRankSectionMdr, _super);
                function UnionRankSectionMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.RankSectionView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionRankSectionMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._itemList = new ArrayCollection();
                    this._view.list.itemRenderer = mod.RankSectionItem;
                    this._view.list.dataProvider = this._itemList;
                };
                UnionRankSectionMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                UnionRankSectionMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._section = this._showArgs.rank;
                    this._type = +this._showArgs.type;
                    this._view.secondPop.updateTitleStr(game.getLanById("pass_rank" /* pass_rank */));
                    this.onRankUpdate();
                };
                UnionRankSectionMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                UnionRankSectionMdr.prototype.onRankUpdate = function () {
                    if (this._section && this._type) {
                        this._itemList.source = this._proxy.getRankSection(this._section, this._type);
                    }
                    var open_fun = this._proxy.open_fun;
                    switch (open_fun) {
                        case "14" /* UnionTreasure */:
                            this._view.img_type2.source = "duobaocishu";
                            this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getRankStr(this._type));
                            this._view.lab_score.textFlow = game.TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
                            break;
                        case "18" /* UnionKill */:
                            this._view.img_type2.source = "zhanyaojifen";
                            this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getBossRankStr(this._type));
                            this._view.lab_score.textFlow = game.TextUtil.parseHtml(this._proxy.getBossRankCountStr(this._type));
                            break;
                        case "26" /* UnionBeast */:
                            this._view.img_type2.source = "meishuzi_xianshoujingyan";
                            this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getBeastRankStr(this._type));
                            this._view.lab_score.textFlow = game.TextUtil.parseHtml(this._proxy.getBeastRankCountStr(this._type));
                            break;
                    }
                };
                return UnionRankSectionMdr;
            }(game.EffectMdrBase));
            union.UnionRankSectionMdr = UnionRankSectionMdr;
            __reflect(UnionRankSectionMdr.prototype, "game.mod.union.UnionRankSectionMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionRankTipsMdr = /** @class */ (function (_super) {
                __extends(UnionRankTipsMdr, _super);
                function UnionRankTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionRankTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionRankTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                };
                UnionRankTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                UnionRankTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                UnionRankTipsMdr.prototype.onHide = function () {
                    this._proxy.c2s_guild_type_rank_rewards(this._showArgs);
                    _super.prototype.onHide.call(this);
                };
                UnionRankTipsMdr.prototype.updateView = function () {
                    var rank = this._proxy.getLastRank(this._showArgs);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("xianzong_tips20" /* xianzong_tips20 */), [game.TextUtil.addColor("" + rank, 2330156 /* GREEN */)]));
                    var list = this._proxy.getRankProps(this._showArgs);
                    this._listData.replaceAll(list);
                    this._view.btn_do.setHint(true);
                };
                UnionRankTipsMdr.prototype.onClick = function () {
                    this.hide();
                };
                return UnionRankTipsMdr;
            }(game.MdrBase));
            union.UnionRankTipsMdr = UnionRankTipsMdr;
            __reflect(UnionRankTipsMdr.prototype, "game.mod.union.UnionRankTipsMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var UnionTreasureHelpMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureHelpMdr, _super);
                function UnionTreasureHelpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionTreasureHelpView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionTreasureHelpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionTreasureHelpItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionTreasureHelpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
                    this.onNt("on_update_treasure_help_info" /* ON_UPDATE_TREASURE_HELP_INFO */, this.onUpdateView, this);
                };
                UnionTreasureHelpMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_yibao_request(3);
                    // todo skin标题
                    _super.prototype.onShow.call(this);
                    // this.onUpdateView();
                };
                UnionTreasureHelpMdr.prototype.onUpdateView = function () {
                    this._listData.replaceAll(this._proxy.help_list);
                };
                UnionTreasureHelpMdr.prototype.onClick = function () {
                    if (!this._listData || !this._listData.source || !this._listData.source.length) {
                        return;
                    }
                    this._proxy.c2s_guild_yibao_click(7);
                };
                UnionTreasureHelpMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionTreasureHelpMdr;
            }(game.MdrBase));
            union.UnionTreasureHelpMdr = UnionTreasureHelpMdr;
            __reflect(UnionTreasureHelpMdr.prototype, "game.mod.union.UnionTreasureHelpMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureMainMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureMainMdr, _super);
                function UnionTreasureMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongyibao",
                            mdr: union.UnionTreasureMdr,
                            bg: "xianzongyibaobeijingtu",
                            title: "union2_title_2" /* union2_title_2 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */]
                        }
                    ];
                    return _this;
                }
                return UnionTreasureMainMdr;
            }(mod.WndBaseMdr));
            union.UnionTreasureMainMdr = UnionTreasureMainMdr;
            __reflect(UnionTreasureMainMdr.prototype, "game.mod.union.UnionTreasureMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            /**遗宝 */
            var UnionTreasureMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureMdr, _super);
                function UnionTreasureMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionTreasureView);
                    _this._len = 4;
                    _this._beginTime = 0;
                    _this._isHasGuide = false;
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionTreasureMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_item.itemRenderer = union.UnionTreasureItem;
                    this._view.list_item.dataProvider = this._listData;
                };
                UnionTreasureMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.hpItem.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_help, TouchEvent.TOUCH_TAP, this.onClickHelp);
                    addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickOneKey);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClickOnce);
                    this.onNt("on_update_treasure_info" /* ON_UPDATE_TREASURE_INFO */, this.onUpdateView, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                    addEventListener(this._view, TouchEvent.TOUCH_TAP, this.onClickKey);
                };
                UnionTreasureMdr.prototype.onClickKey = function () {
                    this._beginTime = Date.now();
                };
                UnionTreasureMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_yibao_request(1);
                    _super.prototype.onShow.call(this);
                    // this.onUpdateView();
                    this._proxy.open_fun = "14" /* UnionTreasure */;
                    this._isHasGuide = false;
                    this._beginTime = Date.now();
                    this.onUpdateTime();
                };
                UnionTreasureMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                UnionTreasureMdr.prototype.onUpdateView = function () {
                    this._recoverTime = this._proxy.recover_time;
                    var list = this._proxy.box_list || [];
                    for (var i = 0; i < this._len; i++) {
                        if (!list || !list[i]) {
                            list.push(null);
                        }
                    }
                    this._listData.replaceAll(list);
                    this._cfg = game.getConfigByNameId("guild_yibao_box.json" /* GuildYibaoBox */, this._proxy.boss_index);
                    this._costIdx = this._cfg.boss_cost[0];
                    this.onUpdateProp();
                    if (this.eft_id) {
                        this.removeEffect(this.eft_id);
                    }
                    this.eft_id = this.addMonster(this._cfg.boss_model, this._view.grp_eff);
                    var hp = this._proxy.boss_hp;
                    var boss_hp = this._cfg.boss_hp;
                    var index = this._cfg.boss_model;
                    this._view.hpItem.setData({ index: index, hp: hp, boss_hp: boss_hp });
                    this._view.btn_reward.setHint(this._proxy.getTaskHint());
                    this._view.btn_rank.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */, "140" /* UnionRank */]));
                };
                UnionTreasureMdr.prototype.onUpdateProp = function () {
                    var count = mod.BagUtil.getPropCntByIdx(this._costIdx);
                    this._view.timeItem2.visible = !count;
                    if (this._view.timeItem2.visible) {
                        // this.update(TimeMgr.time);
                        var leftTime2 = this._recoverTime - TimeMgr.time.serverTimeSecond;
                        this._view.timeItem2.updateLeftTime(leftTime2, "后恢复10次");
                    }
                    this._view.btn_onekey.visible = !!count && mod.RoleUtil.hasPrivilege("zong_sweep" /* zong_sweep */);
                    this._view.coinItem.lab_cost.textColor = count <= 0 ? 16719376 /* RED */ : 0xffffff;
                    this._view.coinItem.setData(this._costIdx);
                    if (this._view.btn_onekey.visible) {
                        this._view.btn_onekey.setHint(mod.BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1]));
                    }
                };
                UnionTreasureMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(this._costIdx) > -1) {
                        this.onUpdateProp();
                    }
                };
                UnionTreasureMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    if (this._view.timeItem2.visible && this._recoverTime) {
                        var leftTime2 = this._recoverTime - TimeMgr.time.serverTimeSecond;
                        if (leftTime2 > 0) {
                            this._view.timeItem2.updateLeftTime(leftTime2, "后恢复10次");
                        }
                        else {
                            // this.onUpdateProp();
                            this._view.timeItem2.visible = false;
                            this._proxy.c2s_guild_yibao_request(1);
                        }
                    }
                    if (!this._isHasGuide && Date.now() - this._beginTime >= 2000) {
                        this._isHasGuide = true;
                        mod.GuideMgr.getIns().show(10002 /* GongNengTips */, this._view.grp_eff, Handler.alloc(this, this.onClickOnce), null, { x: 0, y: -80 });
                    }
                };
                UnionTreasureMdr.prototype.onClickPreview = function () {
                    mod.ViewMgr.getIns().showBoxReward("", this._cfg.rewards2);
                };
                UnionTreasureMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "15" /* UnionTreasureRank */);
                };
                UnionTreasureMdr.prototype.onClickHelp = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "16" /* UnionTreasureHelp */);
                };
                UnionTreasureMdr.prototype.onClickOneKey = function () {
                    var _this = this;
                    if (!mod.BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1], 1 /* Dialog */)) {
                        return;
                    }
                    if (this._proxy.box_list.length >= this._len) {
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("guild_oper_tips_3" /* guild_oper_tips_3 */), Handler.alloc(this, function () {
                            _this._proxy.c2s_guild_yibao_click(2);
                        }));
                        return;
                    }
                    this._proxy.c2s_guild_yibao_click(2);
                };
                UnionTreasureMdr.prototype.onClickOnce = function () {
                    mod.GuideMgr.getIns().clear(10002 /* GongNengTips */);
                    if (!mod.BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1], 1 /* Dialog */)) {
                        game.PromptBox.getIns().show("道具不足");
                        return;
                    }
                    this._proxy.c2s_guild_yibao_click(1);
                };
                UnionTreasureMdr.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "17" /* UnionTreasureReward */);
                };
                UnionTreasureMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    mod.GuideMgr.getIns().clear(10002 /* GongNengTips */);
                    _super.prototype.onHide.call(this);
                };
                return UnionTreasureMdr;
            }(game.EffectMdrBase));
            union.UnionTreasureMdr = UnionTreasureMdr;
            __reflect(UnionTreasureMdr.prototype, "game.mod.union.UnionTreasureMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureRank2Mdr = /** @class */ (function (_super) {
                __extends(UnionTreasureRank2Mdr, _super);
                function UnionTreasureRank2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2 /* Person */;
                    return _this;
                }
                return UnionTreasureRank2Mdr;
            }(union.UnionTreasureRankMdr));
            union.UnionTreasureRank2Mdr = UnionTreasureRank2Mdr;
            __reflect(UnionTreasureRank2Mdr.prototype, "game.mod.union.UnionTreasureRank2Mdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTreasureRankMainMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureRankMainMdr, _super);
                function UnionTreasureRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongpaimingbiaoqiantubiao",
                            mdr: union.UnionTreasureRankMdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */, "15" /* UnionTreasureRank */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "personal_rank_",
                            mdr: union.UnionTreasureRank2Mdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */, "15" /* UnionTreasureRank */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                return UnionTreasureRankMainMdr;
            }(mod.WndBaseMdr));
            union.UnionTreasureRankMainMdr = UnionTreasureRankMainMdr;
            __reflect(UnionTreasureRankMainMdr.prototype, "game.mod.union.UnionTreasureRankMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var UnionProgressReward = /** @class */ (function (_super) {
                __extends(UnionProgressReward, _super);
                function UnionProgressReward() {
                    var _this = _super.call(this) || this;
                    _this._listData = new ArrayCollection();
                    _this._listReward = new ArrayCollection();
                    _this.skinName = "skins.common.ComProgressRewardSkin";
                    return _this;
                }
                UnionProgressReward.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list_progress.itemRenderer = mod.UnionProgressItem;
                    this.list_progress.dataProvider = this._listData;
                    this.list_reward.itemRenderer = mod.UnionProgressRewardItem;
                    this.list_reward.dataProvider = this._listReward;
                    this.img_tips.source = "leijicishu";
                };
                UnionProgressReward.prototype.setData = function (val) {
                    this.lab_count.text = "" + val;
                    var cfgArr = game.getConfigListByName("shengtan_score.json" /* ShengtanScore */);
                    var list = [];
                    for (var i = 0; i < cfgArr.length; i++) {
                        var cfg = cfgArr[i];
                        var cfgBefore = cfgArr[i - 1];
                        var start = cfgBefore && cfgBefore.score || 0;
                        var target = cfg.score;
                        list.push({ val: val, start: start, target: target });
                    }
                    this._listData.source = list;
                    this._listReward.source = cfgArr;
                };
                return UnionProgressReward;
            }(mod.BaseRenderer));
            union.UnionProgressReward = UnionProgressReward;
            __reflect(UnionProgressReward.prototype, "game.mod.union.UnionProgressReward");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var UnionTreasureRewardMdr = /** @class */ (function (_super) {
                __extends(UnionTreasureRewardMdr, _super);
                function UnionTreasureRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionTreasureRewardView);
                    _this._status = false;
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionTreasureRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionTreasureRewardItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionTreasureRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_treasure_info" /* ON_UPDATE_TREASURE_INFO */, this.onUpdateView, this);
                };
                UnionTreasureRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.onUpdateTime();
                };
                UnionTreasureRewardMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                UnionTreasureRewardMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("guild_yibao_task.json" /* GuildYibaoTask */);
                    var list = [];
                    for (var _i = 0, cfgArr_14 = cfgArr; _i < cfgArr_14.length; _i++) {
                        var cfg = cfgArr_14[_i];
                        var task = this._proxy.getTask(cfg.index);
                        list.push({ str: cfg.task, value: task && task.step || 0, target: cfg.target_num });
                    }
                    this._listData.replaceAll(list);
                    this._status = this._proxy.getTaskReward();
                    var param = game.getConfigByNameId("param.json" /* Param */, "guild_yibao_task_rewards");
                    this._view.icon.setData(param.value[0], this._status ? 3 /* NotTips */ : 1 /* Reward */);
                    this._view.icon.setHint(this._status);
                };
                UnionTreasureRewardMdr.prototype.onClick = function () {
                    if (!this._status) {
                        return;
                    }
                    this._proxy.c2s_guild_yibao_click(8);
                };
                UnionTreasureRewardMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                UnionTreasureRewardMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                return UnionTreasureRewardMdr;
            }(game.MdrBase));
            union.UnionTreasureRewardMdr = UnionTreasureRewardMdr;
            __reflect(UnionTreasureRewardMdr.prototype, "game.mod.union.UnionTreasureRewardMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var UnionAuctionItem = /** @class */ (function (_super) {
                __extends(UnionAuctionItem, _super);
                function UnionAuctionItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionAuctionItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClickBtn, this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                };
                UnionAuctionItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                UnionAuctionItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.icon.setData(this.data.item_id);
                    var name = game.TextUtil.addColor(this.data.name, 15855403 /* YELLOW */);
                    this.lab_title.textFlow = game.TextUtil.parseHtml(name + "\u5728\u5996\u602A\u5165\u4FB5\u4E2D\u593A\u53D6\uFF1A");
                    var cfg = game.getConfigByNameId("guild_auction.json" /* GuildAuction */, this.data.item_id.toNumber());
                    this._cost = cfg.cost;
                    this.btn_buy.setCost(this._cost);
                    if (this.data.time) {
                        TimeMgr.addUpdateItem(this, 1000);
                        this.update(TimeMgr.time);
                    }
                };
                UnionAuctionItem.prototype.update = function (time) {
                    var leftTime = this.data.time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        facade.sendNt("on_update_auction_info" /* ON_UPDATE_AUCTION_INFO */);
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this.timeItem.updateLeftTime(leftTime);
                };
                UnionAuctionItem.prototype.onClickBtn = function () {
                    if (!mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1], 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_guild_auction_buy(this.data.id);
                };
                return UnionAuctionItem;
            }(mod.BaseRenderer));
            union.UnionAuctionItem = UnionAuctionItem;
            __reflect(UnionAuctionItem.prototype, "game.mod.union.UnionAuctionItem", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionAuctionView = /** @class */ (function (_super) {
                __extends(UnionAuctionView, _super);
                function UnionAuctionView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionAuctionSkin";
                    return _this;
                }
                return UnionAuctionView;
            }(eui.Component));
            union.UnionAuctionView = UnionAuctionView;
            __reflect(UnionAuctionView.prototype, "game.mod.union.UnionAuctionView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastRewardItem = /** @class */ (function (_super) {
                __extends(UnionBeastRewardItem, _super);
                function UnionBeastRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionBeastRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                };
                UnionBeastRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    var cnt = mod.BagUtil.getPropCntByIdx(1450000038 /* GuildXianshouExp */);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml("\u672C\u5468\u8D21\u732E" + game.TextUtil.addEnoughColor(cnt, cfg.score, false) + "\u4ED9\u517D\u7ECF\u9A8C\uFF0C\u53EF\u9886\u53D6\uFF1A");
                    this._listData.replaceAll(cfg.reward);
                    // let bool: boolean = this._proxy.getRewardStatus(this.data.index);
                    // if (this.data.score > cnt) {
                    //     this._status = RewardStatus.NotFinish;
                    // } else if (bool) {
                    //     this._status = RewardStatus.Draw;
                    // } else {
                    //     this._status = RewardStatus.Finish;
                    // }
                    // this._status = this._proxy.getRewardState(this.data.index);
                    this._status = this.data.state;
                    this.btn_buy.visible = this._status == 1 /* Finish */;
                    this.img_bought.visible = !this.btn_buy.visible;
                    if (this.btn_buy.visible) {
                        this.btn_buy.label = game.getLanById("tishi_29" /* tishi_29 */);
                        this.btn_buy.setHint(true);
                    }
                    if (this._status == 0 /* NotFinish */) {
                        this.img_bought.source = 'hongseweiwancheng';
                    }
                    else if (this._status == 2 /* Draw */) {
                        this.img_bought.source = 'lvseyilingqu';
                    }
                };
                UnionBeastRewardItem.prototype.onClick = function () {
                    if (this._status == 1 /* Finish */) {
                        this._proxy.c2s_guild_xianshou_receive(this.data.cfg.index);
                    }
                };
                return UnionBeastRewardItem;
            }(mod.BaseGiftItemRender));
            union.UnionBeastRewardItem = UnionBeastRewardItem;
            __reflect(UnionBeastRewardItem.prototype, "game.mod.union.UnionBeastRewardItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastRewardView = /** @class */ (function (_super) {
                __extends(UnionBeastRewardView, _super);
                function UnionBeastRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionBeastRewardSkin";
                    return _this;
                }
                return UnionBeastRewardView;
            }(eui.Component));
            union.UnionBeastRewardView = UnionBeastRewardView;
            __reflect(UnionBeastRewardView.prototype, "game.mod.union.UnionBeastRewardView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastTaskItem = /** @class */ (function (_super) {
                __extends(UnionBeastTaskItem, _super);
                function UnionBeastTaskItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionBeastTaskItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    var proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    var cfg = proxy.getBeastTask(this.data.task_id);
                    var cnt = cfg && cfg.exp || 0;
                    this.lab_num.text = game.StringUtil.getHurtNumStr(cnt);
                    var task = mod.TaskUtil.getCfg(this.data.task_id);
                    this.coinItem.setData(task.rewards[0][0]);
                    this.coinItem.lab_cost.text = "" + task.rewards[0][1];
                    var prop = game.GameConfig.getPropConfigById(1450000038 /* GuildXianshouExp */);
                    this.img_icon.source = prop.icon;
                };
                return UnionBeastTaskItem;
            }(mod.TaskRender));
            union.UnionBeastTaskItem = UnionBeastTaskItem;
            __reflect(UnionBeastTaskItem.prototype, "game.mod.union.UnionBeastTaskItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastView = /** @class */ (function (_super) {
                __extends(UnionBeastView, _super);
                function UnionBeastView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionBeastSkin";
                    return _this;
                }
                return UnionBeastView;
            }(eui.Component));
            union.UnionBeastView = UnionBeastView;
            __reflect(UnionBeastView.prototype, "game.mod.union.UnionBeastView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookItem = /** @class */ (function (_super) {
                __extends(UnionBookItem, _super);
                function UnionBookItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionBookItem.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                };
                UnionBookItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var info = this._proxy.getBookInfo(cfg.index);
                    // let level: number = info && info.level || 0;
                    var stage = info && info.stage || 0;
                    this.img_lock.visible = stage == 0;
                    this.lab_level.text = "" + stage;
                    this.lab_name.text = "" + cfg.name;
                    this.img_icon.source = "book_" + cfg.index;
                    this.img_quality.source = "xf_quality_rect_" + cfg.quality;
                    var root = this._proxy.getBookRoots(cfg.index);
                    this.redPoint.visible = mod.HintMgr.getHint(root);
                    if (cfg.activate_condition > this._proxy.union_level) {
                        this.grp_open.visible = true;
                        this.lab_open.text = "\u4ED9\u5B97" + cfg.activate_condition + "\u7EA7";
                    }
                    else {
                        this.grp_open.visible = false;
                    }
                };
                return UnionBookItem;
            }(mod.BaseRenderer));
            union.UnionBookItem = UnionBookItem;
            __reflect(UnionBookItem.prototype, "game.mod.union.UnionBookItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookSkillView = /** @class */ (function (_super) {
                __extends(UnionBookSkillView, _super);
                function UnionBookSkillView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionBookSkillView.prototype.setData = function (index, stage) {
                    this.lab_cnt.text = stage + "\u9636";
                    var buff = game.getConfigByNameId("buff.json" /* Buff */, index);
                    if (buff) {
                        this.lab_name.text = buff.name;
                        this.lab_desc.text = buff.des;
                        this.img_icon.source = buff.icon;
                    }
                };
                return UnionBookSkillView;
            }(eui.Component));
            union.UnionBookSkillView = UnionBookSkillView;
            __reflect(UnionBookSkillView.prototype, "game.mod.union.UnionBookSkillView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookUpTipsView = /** @class */ (function (_super) {
                __extends(UnionBookUpTipsView, _super);
                function UnionBookUpTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceUpTipsSkin";
                    return _this;
                }
                return UnionBookUpTipsView;
            }(eui.Component));
            union.UnionBookUpTipsView = UnionBookUpTipsView;
            __reflect(UnionBookUpTipsView.prototype, "game.mod.union.UnionBookUpTipsView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookUpTipsView2 = /** @class */ (function (_super) {
                __extends(UnionBookUpTipsView2, _super);
                function UnionBookUpTipsView2() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceUpTipsSkin2";
                    return _this;
                }
                return UnionBookUpTipsView2;
            }(eui.Component));
            union.UnionBookUpTipsView2 = UnionBookUpTipsView2;
            __reflect(UnionBookUpTipsView2.prototype, "game.mod.union.UnionBookUpTipsView2");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookView = /** @class */ (function (_super) {
                __extends(UnionBookView, _super);
                function UnionBookView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionBookSkin";
                    return _this;
                }
                return UnionBookView;
            }(eui.Component));
            union.UnionBookView = UnionBookView;
            __reflect(UnionBookView.prototype, "game.mod.union.UnionBookView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionDonateEquipItem = /** @class */ (function (_super) {
                __extends(UnionDonateEquipItem, _super);
                function UnionDonateEquipItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionDonateEquipItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.icon.setData(this.data, 3 /* NotTips */);
                };
                return UnionDonateEquipItem;
            }(mod.IconSel));
            union.UnionDonateEquipItem = UnionDonateEquipItem;
            __reflect(UnionDonateEquipItem.prototype, "game.mod.union.UnionDonateEquipItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionDonateEquipView = /** @class */ (function (_super) {
                __extends(UnionDonateEquipView, _super);
                function UnionDonateEquipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionDonateEquipSkin";
                    return _this;
                }
                return UnionDonateEquipView;
            }(eui.Component));
            union.UnionDonateEquipView = UnionDonateEquipView;
            __reflect(UnionDonateEquipView.prototype, "game.mod.union.UnionDonateEquipView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionLotteryRewardView = /** @class */ (function (_super) {
                __extends(UnionLotteryRewardView, _super);
                function UnionLotteryRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionLotteryRewardSkin";
                    return _this;
                }
                return UnionLotteryRewardView;
            }(eui.Component));
            union.UnionLotteryRewardView = UnionLotteryRewardView;
            __reflect(UnionLotteryRewardView.prototype, "game.mod.union.UnionLotteryRewardView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var UnionSelectComponent = /** @class */ (function (_super) {
                __extends(UnionSelectComponent, _super);
                function UnionSelectComponent() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._listData = new ArrayCollection();
                    _this._show = false;
                    _this._keys = [];
                    _this._type = 1;
                    return _this;
                }
                UnionSelectComponent.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list.itemRenderer = union.UnionSelectItem;
                    this.list.dataProvider = this._listData;
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    // this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.gr_box, this.onClickBox, this);
                    // this.addEventListenerEx(ItemTapEvent.ITEM_TAP, this.list, this.onClickSelect, this);
                };
                UnionSelectComponent.prototype.setData = function (keys) {
                    if (keys === void 0) { keys = [game.UnionSelectDefault]; }
                    this._keys = keys;
                    this._listData.replaceAll(this._keys);
                    this.list.selectedIndex = 0;
                    this.lab_select.text = this._keys[this.getIndex].value;
                };
                // public setData2(keys: UnionSelectData[] = [UnionSelectDefault]): void {
                //     this._type = 2;
                //     this.setData(keys);
                // }
                UnionSelectComponent.prototype.onUpdateStatus = function () {
                    this.gr_list.visible = this._show;
                    this.img_status.rotation = this._show ? 180 : 0;
                    this.lab_select.text = this._keys[this.getIndex].value;
                };
                // private onClickBox(): void {
                //     if (this._type == 2) {
                //         let qualitys: UnionSelectData[] = this._proxy.getEquipKeyValue2();
                //         this.setData2(qualitys);
                //     }
                //     this.setStatus();
                // }
                // private onClickSelect(): void {
                //     this._show = !this._show;
                //     this.onUpdateStatus();
                // }
                UnionSelectComponent.prototype.setStatus = function () {
                    this._show = !this._show;
                    this.onUpdateStatus();
                };
                Object.defineProperty(UnionSelectComponent.prototype, "getIndex", {
                    get: function () {
                        return this.list.selectedIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnionSelectComponent.prototype, "getKey", {
                    get: function () {
                        return this._keys[this.getIndex].key;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UnionSelectComponent;
            }(mod.BaseRenderer));
            union.UnionSelectComponent = UnionSelectComponent;
            __reflect(UnionSelectComponent.prototype, "game.mod.union.UnionSelectComponent");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionSelectItem = /** @class */ (function (_super) {
                __extends(UnionSelectItem, _super);
                function UnionSelectItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionSelectItem.prototype.dataChanged = function () {
                    // let proxy: UnionProxy = getProxy(ModName.Union, ProxyType.Union);
                    // this.lab_select.text = proxy.getEquipString(this.data);
                    this.lab_select.text = this.data.value;
                };
                return UnionSelectItem;
            }(mod.BaseRenderer));
            union.UnionSelectItem = UnionSelectItem;
            __reflect(UnionSelectItem.prototype, "game.mod.union.UnionSelectItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionStorageItem = /** @class */ (function (_super) {
                __extends(UnionStorageItem, _super);
                function UnionStorageItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionStorageItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.iconShowType = 6 /* UnionExchange */;
                    if (this.propData) {
                        this.updateCnt("" + this.propData.count);
                    }
                };
                return UnionStorageItem;
            }(mod.Icon));
            union.UnionStorageItem = UnionStorageItem;
            __reflect(UnionStorageItem.prototype, "game.mod.union.UnionStorageItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var UnionStorageMsgItem = /** @class */ (function (_super) {
                __extends(UnionStorageMsgItem, _super);
                function UnionStorageMsgItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionStorageMsgItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    // TextUtil.addLinkHtmlTxt()
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_equip, this.onClickProp, this);
                };
                UnionStorageMsgItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var time = game.TimeUtil.formatTimeSecond(this.data.time);
                    var name = game.TextUtil.addColor(this.data.name, 31431 /* BLUE */);
                    this.lab_content.textFlow = game.TextUtil.parseHtml("[" + time + "]" + name + "\u6350\u732E", true);
                    var prop = game.PropData.create(this.data.item_id);
                    this.lab_equip.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(prop.getPropNameStr(true)), true);
                };
                UnionStorageMsgItem.prototype.onClickProp = function () {
                    var prop = game.PropData.create(this.data.item_id);
                    mod.ViewMgr.getIns().showPropTips(prop);
                };
                return UnionStorageMsgItem;
            }(mod.BaseRenderer));
            union.UnionStorageMsgItem = UnionStorageMsgItem;
            __reflect(UnionStorageMsgItem.prototype, "game.mod.union.UnionStorageMsgItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionStorageView = /** @class */ (function (_super) {
                __extends(UnionStorageView, _super);
                function UnionStorageView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionStorageSkin";
                    return _this;
                }
                return UnionStorageView;
            }(eui.Component));
            union.UnionStorageView = UnionStorageView;
            __reflect(UnionStorageView.prototype, "game.mod.union.UnionStorageView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var Handler = base.Handler;
            var UnionStoreItem = /** @class */ (function (_super) {
                __extends(UnionStoreItem, _super);
                function UnionStoreItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionStoreItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                UnionStoreItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var prop = game.PropData.create(this.data.reward[0], 1);
                    this.icon.setData(prop);
                    this.btn.setCost(this.data.cost);
                    this.lab_name.textFlow = this.icon.getPropName(true, true);
                    this.lmt_cnt = this.data.count;
                    this.left_cnt = this.lmt_cnt - this._proxy.getStoreData(this.data.index);
                    var str = game.TextUtil.addColor(this.left_cnt + "/" + this.lmt_cnt, !this.left_cnt ? 16719376 /* RED */ : 2330156 /* GREEN */);
                    this.lab_limit.textFlow = game.TextUtil.parseHtml("\u6BCF\u5468\u9650\u8D2D\uFF1A" + str);
                    this.img_bought.visible = this.left_cnt <= 0;
                    this.lab_limit.visible = this.btn.visible = this.left_cnt > 0;
                };
                UnionStoreItem.prototype.onClick = function () {
                    if (mod.BagUtil.checkPropCnt(this.data.cost[0], this.data.cost[1])) {
                        if (this._proxy.model.store_count >= this._proxy.guild_exchange_num) {
                            // PromptBox.getIns().show("本周兑换次数剩余0次");
                            mod.BagUtil.checkPropCnt(this.data.cost[0], this.data.cost[1], 1 /* Dialog */);
                            return;
                        }
                        mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "24" /* UnionStoreTips */);
                        return;
                    }
                    mod.ViewMgr.getIns().openBuyBulkTips({
                        prop: this.data.reward,
                        cost: this.data.cost.slice(),
                        lmt_type: 3,
                        lmt_cnt: this.lmt_cnt,
                        left_cnt: this.left_cnt,
                        handler: Handler.alloc(this._proxy, this._proxy.c2s_guild_baoku_buy, [this.data.index])
                    });
                };
                return UnionStoreItem;
            }(mod.BaseRenderer));
            union.UnionStoreItem = UnionStoreItem;
            __reflect(UnionStoreItem.prototype, "game.mod.union.UnionStoreItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionStoreTipsView = /** @class */ (function (_super) {
                __extends(UnionStoreTipsView, _super);
                function UnionStoreTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionStoreTipsSkin";
                    return _this;
                }
                return UnionStoreTipsView;
            }(eui.Component));
            union.UnionStoreTipsView = UnionStoreTipsView;
            __reflect(UnionStoreTipsView.prototype, "game.mod.union.UnionStoreTipsView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            /**拍卖 */
            var UnionAuctionMdr = /** @class */ (function (_super) {
                __extends(UnionAuctionMdr, _super);
                function UnionAuctionMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionAuctionView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionAuctionMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionAuctionItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.lab_explain.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this._view.lab_explain.text, 0x309539));
                    this._view.lab_jump.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this._view.lab_jump.text, 0x309539));
                };
                UnionAuctionMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.lab_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
                    addEventListener(this._view.lab_jump, TouchEvent.TOUCH_TAP, this.onClickJump);
                    this.onNt("on_update_auction_info" /* ON_UPDATE_AUCTION_INFO */, this.onUpdateView, this);
                };
                UnionAuctionMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_auction_show();
                    _super.prototype.onShow.call(this);
                };
                UnionAuctionMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    var second = TimeMgr.time.serverTimeSecond;
                    var list = model.auction_list && model.auction_list.filter(function (v) {
                        return v.time > second;
                    }) || [];
                    var len = list.length;
                    this._view.grp_tips.visible = !len;
                    this._listData.replaceAll(list);
                };
                UnionAuctionMdr.prototype.onClickExplain = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("guild_tips11" /* guild_tips11 */));
                };
                UnionAuctionMdr.prototype.onClickJump = function () {
                    mod.ViewMgr.getIns().showViewByID(49 /* Yijie */);
                };
                UnionAuctionMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionAuctionMdr;
            }(game.MdrBase));
            union.UnionAuctionMdr = UnionAuctionMdr;
            __reflect(UnionAuctionMdr.prototype, "game.mod.union.UnionAuctionMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var UnionBeastBuffTipsMdr = /** @class */ (function (_super) {
                __extends(UnionBeastBuffTipsMdr, _super);
                function UnionBeastBuffTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillNormalTipsView);
                    _this._listData = new ArrayCollection();
                    _this._list = [];
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionBeastBuffTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = mod.BaseDescItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionBeastBuffTipsMdr.prototype.addListeners = function () {
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateView, this);
                };
                UnionBeastBuffTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.currentState = "power";
                    this.updateView();
                };
                UnionBeastBuffTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                UnionBeastBuffTipsMdr.prototype.updateView = function () {
                    this._list = [];
                    var lineSpacing = 10;
                    var base_attrs = this._proxy.base_attrs;
                    var desc_title = "全员获得：\n";
                    var desc_attr = game.TextUtil.getAttrText(base_attrs, 2330156 /* GREEN */, "\n", "+") + "\n";
                    var extra_attrs = this._proxy.extra_attrs;
                    var extra_desc = game.TextUtil.addColor(this._proxy.getExtraAttrJob() + "\u53EF\u989D\u5916\u83B7\u5F97\uFF1A\n", 0xfff053);
                    var extra_attr = game.TextUtil.addColor(game.TextUtil.getAttrText(extra_attrs, 0xea9e3b, "\n", "+"), 0xea9e3b);
                    var desc = desc_title + desc_attr;
                    if (extra_attrs) {
                        desc += extra_desc + extra_attr;
                    }
                    if (base_attrs || extra_attrs) {
                        this._list.push({ desc: desc, title: game.getLanById("general9" /* general9 */), lineSpacing: lineSpacing });
                    }
                    this._view.power.setPowerValue(base_attrs && base_attrs.showpower || 0);
                    this._view.lab_name.text = "\u4ED9\u517D\u5149\u73AF " + this._proxy.beast_stage + "\u9636";
                    this._view.skill.img_icon.source = "xianshouzhufutubiao";
                    this._view.img_type.visible = false;
                    this._view.baseDescItem.visible = false;
                    this._view.list.visible = true;
                    var stage = this._proxy.beast_stage;
                    var cfg = game.getConfigByNameId("guild_xianshou.json" /* GuildXianshou */, stage + 1);
                    if (cfg) {
                        var next_base_attrs = mod.RoleUtil.getAttr(cfg.attr_id);
                        var next_extra_attrs = mod.RoleUtil.getAttr(cfg.extra_attr_id);
                        var next_desc_title = "全员获得：\n";
                        var next_desc_attr = game.TextUtil.getAttrText(next_base_attrs, 8618626 /* GRAY */, "\n", "+") + "\n";
                        var next_extra_desc = game.TextUtil.addColor(this._proxy.getExtraAttrJob() + "\u53EF\u989D\u5916\u83B7\u5F97\uFF1A\n", 8618626 /* GRAY */);
                        var next_extra_attr = game.TextUtil.addColor(game.TextUtil.getAttrText(next_extra_attrs, 8618626 /* GRAY */, "\n", "+"), 8618626 /* GRAY */);
                        var next_desc = next_desc_title + next_desc_attr + next_extra_desc + next_extra_attr;
                        next_desc = game.TextUtil.addColor(next_desc, 8618626 /* GRAY */);
                        this._list.push({ desc: next_desc, title: game.getLanById("general10" /* general10 */), lineSpacing: lineSpacing });
                    }
                    this._listData.replaceAll(this._list);
                };
                return UnionBeastBuffTipsMdr;
            }(game.MdrBase));
            union.UnionBeastBuffTipsMdr = UnionBeastBuffTipsMdr;
            __reflect(UnionBeastBuffTipsMdr.prototype, "game.mod.union.UnionBeastBuffTipsMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastMainMdr = /** @class */ (function (_super) {
                __extends(UnionBeastMainMdr, _super);
                function UnionBeastMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianshouzhufubiaoqiantubiao",
                            mdr: union.UnionBeastMdr,
                            bg: "xianshoubeijingtu",
                            title: "guild_tips3" /* guild_tips3 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */]
                        },
                    ];
                    return _this;
                }
                return UnionBeastMainMdr;
            }(mod.WndBaseMdr));
            union.UnionBeastMainMdr = UnionBeastMainMdr;
            __reflect(UnionBeastMainMdr.prototype, "game.mod.union.UnionBeastMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            /**仙兽 */
            var UnionBeastMdr = /** @class */ (function (_super) {
                __extends(UnionBeastMdr, _super);
                function UnionBeastMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionBeastView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionBeastMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_task.itemRenderer = union.UnionBeastTaskItem;
                    this._view.list_task.dataProvider = this._listData;
                };
                UnionBeastMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_ring, TouchEvent.TOUCH_TAP, this.onClickRing);
                    this.onNt("on_update_beast_info" /* ON_UPDATE_BEAST_INFO */, this.onUpdateView, this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                };
                UnionBeastMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_xianshou_show();
                    _super.prototype.onShow.call(this);
                };
                UnionBeastMdr.prototype.onUpdateView = function () {
                    var cfg = game.getConfigByNameId("guild_xianshou.json" /* GuildXianshou */, this._proxy.beast_stage + 1);
                    var total_exp = this._proxy.total_exp;
                    if (!cfg) {
                        this._view.btn_up.updateMaxStar();
                    }
                    else {
                        this._view.btn_up.updateCost([1450000038 /* GuildXianshouExp */, cfg.score], false, "", false, total_exp);
                        this._view.btn_up.img_cost.visible = false;
                        var bool = total_exp >= cfg.score;
                        if (bool) {
                            this._view.btn_up.updateLab(game.getLanById("rank_up" /* rank_up */));
                        }
                        this._view.btn_up.setHint(bool);
                    }
                    this._view.nameItem.updateShow(game.StringUtil.getCNBynumber(this._proxy.beast_stage) + "\u9636");
                    // this.addBmpFont(`${this._proxy.beast_stage||1}j`, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv, false, 1, true);
                    var attr = this._proxy.base_attrs;
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                    this._view.coinItem.setData(1450000038 /* GuildXianshouExp */);
                    // this._view.coinItem.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addEnoughColor(this._proxy.total_exp, cfg.score, false));
                    var color = 0xffffff;
                    if (total_exp > cfg.score) {
                        color = 8585074 /* GREEN */;
                    }
                    this._view.coinItem.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(total_exp + "/" + cfg.score, color));
                    this.removeAllEffects();
                    var param = game.GameConfig.getParamConfigById("guild_xianshou_model");
                    this.addAnimate(param.value, this._view.grp_eft);
                    var hint = mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "127" /* UnionBeastReward */]);
                    this._view.btn_reward.setHint(hint);
                    this._view.btn_rank.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "140" /* UnionRank */]));
                    this.onUpdateTask();
                };
                UnionBeastMdr.prototype.onClickUp = function () {
                    var cfg = game.getConfigByNameId("guild_xianshou.json" /* GuildXianshou */, this._proxy.beast_stage || 1);
                    if (this._proxy.total_exp < cfg.score) {
                        mod.ViewMgr.getIns().showGainWaysTips(1450000038 /* GuildXianshouExp */);
                        return;
                    }
                    if (!this._proxy.beast_oper) {
                        game.PromptBox.getIns().show("宗主和副宗主才有权限升阶");
                        return;
                    }
                    this._proxy.c2s_guild_xianshou_up_level();
                };
                UnionBeastMdr.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "27" /* UnionBeastReward */);
                };
                UnionBeastMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "28" /* UnionBeastRank */);
                };
                UnionBeastMdr.prototype.onClickRing = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "29" /* UnionBeastRing */);
                };
                UnionBeastMdr.prototype.onUpdateTask = function () {
                    var tasks = mod.TaskUtil.getTaskList(47 /* UnionBeast */);
                    // let cfgArr: GuildXianshouTaskConfig[] = getConfigListByName(ConfigName.GuildXianshouTask);
                    // let list: task_data[] = [];
                    // for (let task of tasks) {
                    //     for (let cfg of cfgArr) {
                    //         if (cfg.task_list.indexOf(task.task_id) > -1) {
                    //             list[cfg.index] = task;
                    //         }
                    //     }
                    // }
                    // this._listData.replaceAll(list.filter(v => {
                    //     return !!v;
                    // }));
                    this._listData.replaceAll(tasks);
                };
                UnionBeastMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(47 /* UnionBeast */) > -1) {
                        this.onUpdateTask();
                    }
                };
                UnionBeastMdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    if (data.node.indexOf(mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */])) > -1) {
                        this.onUpdateView();
                    }
                };
                UnionBeastMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionBeastMdr;
            }(game.EffectMdrBase));
            union.UnionBeastMdr = UnionBeastMdr;
            __reflect(UnionBeastMdr.prototype, "game.mod.union.UnionBeastMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastRank2Mdr = /** @class */ (function (_super) {
                __extends(UnionBeastRank2Mdr, _super);
                function UnionBeastRank2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2 /* Person */;
                    return _this;
                }
                return UnionBeastRank2Mdr;
            }(union.UnionBeastRankMdr));
            union.UnionBeastRank2Mdr = UnionBeastRank2Mdr;
            __reflect(UnionBeastRank2Mdr.prototype, "game.mod.union.UnionBeastRank2Mdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBeastRankMainMdr = /** @class */ (function (_super) {
                __extends(UnionBeastRankMainMdr, _super);
                function UnionBeastRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongpaimingbiaoqiantubiao",
                            mdr: union.UnionBeastRankMdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "28" /* UnionBeastRank */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "personal_rank_",
                            mdr: union.UnionBeastRank2Mdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */, "28" /* UnionBeastRank */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                UnionBeastRankMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                };
                UnionBeastRankMainMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.open_fun = "26" /* UnionBeast */;
                };
                return UnionBeastRankMainMdr;
            }(mod.WndBaseMdr));
            union.UnionBeastRankMainMdr = UnionBeastRankMainMdr;
            __reflect(UnionBeastRankMainMdr.prototype, "game.mod.union.UnionBeastRankMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionShengLotteryView = /** @class */ (function (_super) {
                __extends(UnionShengLotteryView, _super);
                function UnionShengLotteryView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionShengLotterySkin";
                    return _this;
                }
                return UnionShengLotteryView;
            }(eui.Component));
            union.UnionShengLotteryView = UnionShengLotteryView;
            __reflect(UnionShengLotteryView.prototype, "game.mod.union.UnionShengLotteryView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var UnionBeastRewardMdr = /** @class */ (function (_super) {
                __extends(UnionBeastRewardMdr, _super);
                function UnionBeastRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionBeastRewardView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionBeastRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionBeastRewardItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionBeastRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_beast_reward_info" /* ON_UPDATE_BEAST_REWARD_INFO */, this.onUpdateView, this);
                };
                UnionBeastRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionBeastRewardMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("guild_xianshou_target.json" /* GuildXianshouTarget */);
                    var list = [];
                    for (var _i = 0, cfgArr_15 = cfgArr; _i < cfgArr_15.length; _i++) {
                        var cfg = cfgArr_15[_i];
                        var state = this._proxy.getRewardState(cfg.index);
                        console.error(state);
                        list.push({ cfg: cfg, state: state });
                    }
                    list.sort(function (a, b) {
                        if (a.state == 2 /* Draw */ || b.state == 2 /* Draw */) {
                            if (a.state != b.state) {
                                if (a.state == 2 /* Draw */) {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            }
                        }
                        return a.cfg.index - b.cfg.index;
                    });
                    this._listData.replaceAll(list);
                };
                UnionBeastRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionBeastRewardMdr;
            }(game.MdrBase));
            union.UnionBeastRewardMdr = UnionBeastRewardMdr;
            __reflect(UnionBeastRewardMdr.prototype, "game.mod.union.UnionBeastRewardMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionBookMainMdr = /** @class */ (function (_super) {
                __extends(UnionBookMainMdr, _super);
                function UnionBookMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "diyicengbiaoqiantubiao",
                            mdr: union.UnionBookMdr,
                            bg: "shuzhaibeijingtu",
                            title: "guild_tips8" /* guild_tips8 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "25" /* UnionBook */, "01" /* TabBtnType01 */]
                        },
                    ];
                    return _this;
                }
                return UnionBookMainMdr;
            }(mod.WndBaseMdr));
            union.UnionBookMainMdr = UnionBookMainMdr;
            __reflect(UnionBookMainMdr.prototype, "game.mod.union.UnionBookMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            /**书斋 */
            var UnionBookMdr = /** @class */ (function (_super) {
                __extends(UnionBookMdr, _super);
                function UnionBookMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionBookView);
                    _this._listData = new ArrayCollection();
                    _this.nodes = 10;
                    return _this;
                }
                UnionBookMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionBookItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionBookMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.bookItem, TouchEvent.TOUCH_TAP, this.onClickTips);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickBtn);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    this.onNt("on_update_book_info" /* ON_UPDATE_BOOK_INFO */, this.onUpdateView, this);
                };
                UnionBookMdr.prototype.onShow = function () {
                    // this._proxy.c2s_guild_study_show();
                    _super.prototype.onShow.call(this);
                    this._init = false;
                    this.onUpdateView();
                };
                UnionBookMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("guild_study.json" /* GuildStudy */);
                    this._listData.replaceAll(cfgArr);
                    if (!this._init) {
                        this._view.list.selectedIndex = 0;
                        this._init = true;
                    }
                    this.onUpdateStatus();
                };
                UnionBookMdr.prototype.onUpdateStatus = function () {
                    var cfg = this.getData;
                    var index = cfg.index;
                    var buff = this._proxy.getBuff(index);
                    var info = this._proxy.getBookInfo(index);
                    var stage = info && info.stage || 0;
                    var level = info && info.level || 0;
                    var show_stage = info && info.stage || 1;
                    this._view.bookItem.setData(buff, show_stage);
                    this._view.nameItem.visible = !!stage;
                    this._view.nameItem.updateShow("\u7B2C" + game.StringUtil.getCNBynumber(stage) + "\u91CD");
                    var power = info && info.attrs && info.attrs.showpower;
                    this._view.power.setPowerValue(power);
                    for (var i = 1; i <= this.nodes; i++) {
                        var node = this._view["node_" + i];
                        var line = this._view["line_" + i];
                        var bool = this.is_max || level >= i;
                        if (node) {
                            node.source = bool ? "lanseyuan" : "huiseyuan";
                        }
                        if (line) {
                            line.source = bool ? "lansexian" : "huisexian";
                        }
                    }
                    if (cfg.activate_condition > this._proxy.union_level) {
                        this._view.img_max.visible = this._view.icon.visible = this._view.btn_up.visible = false;
                        this._view.lab_limit.visible = true;
                        this._view.lab_limit.text = "\u4ED9\u5B97" + cfg.activate_condition + "\u7EA7\u53EF\u4FEE\u70BC";
                        return;
                    }
                    this._view.lab_limit.visible = false;
                    this._view.icon.visible = this._view.btn_up.visible = !this.is_max;
                    this._view.img_max.visible = this.is_max;
                    if (this.is_max) {
                        this._view.btn_up.setHint(false);
                        return;
                    }
                    this._view.icon.setData(this._cost);
                    this._view.icon.updateCostLab(this._cost);
                    if (!stage) {
                        this._view.btn_up.label = game.getLanById("active" /* active */);
                    }
                    else if (level == 10) {
                        this._view.btn_up.label = game.getLanById("weapon_tips34" /* weapon_tips34 */);
                    }
                    else {
                        this._view.btn_up.label = game.getLanById("uplv" /* uplv */);
                    }
                    var root = this._proxy.getBookRoots(index);
                    this._view.btn_up.setHint(mod.HintMgr.getHint(root));
                };
                UnionBookMdr.prototype.onClickTips = function () {
                };
                UnionBookMdr.prototype.onClickBtn = function () {
                    if (!mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1], 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_guild_study_oper(this.getData.index);
                };
                UnionBookMdr.prototype.onClickSelect = function (e) {
                    this.onUpdateIndex(e.itemIndex);
                };
                UnionBookMdr.prototype.onClickAttr = function () {
                    if (!this.getData) {
                        return;
                    }
                    var info = this._proxy.getBookInfo(this.getData.index);
                    var attr = info && info.attrs;
                    mod.ViewMgr.getIns().showAttrTipsWithoutGod('属性', attr);
                };
                UnionBookMdr.prototype.onUpdateIndex = function (index) {
                    this._view.list.selectedIndex = index;
                    this.onUpdateStatus();
                };
                Object.defineProperty(UnionBookMdr.prototype, "getData", {
                    get: function () {
                        return this._listData.source[this._view.list.selectedIndex];
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionBookMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                Object.defineProperty(UnionBookMdr.prototype, "is_max", {
                    get: function () {
                        this._cost = this._proxy.getCost(this.getData.index);
                        return !this._cost || !this._cost.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UnionBookMdr;
            }(game.MdrBase));
            union.UnionBookMdr = UnionBookMdr;
            __reflect(UnionBookMdr.prototype, "game.mod.union.UnionBookMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var UnionBookUpTipsMdr = /** @class */ (function (_super) {
                __extends(UnionBookUpTipsMdr, _super);
                function UnionBookUpTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionBookUpTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionBookUpTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                UnionBookUpTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                UnionBookUpTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.showTitleTween();
                    this.showBgTween();
                    this.showGrpTween();
                    this.showDescTween();
                    this.showSkillTween();
                    this.showTipsTween();
                    this.showEffect();
                };
                UnionBookUpTipsMdr.prototype.onHide = function () {
                    this.removeTitleTween();
                    this.removeBgTween();
                    this.removeGrpTween();
                    this.removeDescTween();
                    this.removeSkillTween();
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                UnionBookUpTipsMdr.prototype.updateShow = function () {
                    var skillId = this._showArgs.skillId;
                    var lv = this._showArgs.lv;
                    var lvDesc = this._showArgs.lvDesc;
                    var lastLv = lv - 1;
                    var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                    this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                    this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                    // let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, skillId);
                    this._view.lab_name.text = cfg.name;
                    this._view.skill.setIcon(cfg.icon);
                    // let desc = TextUtil.getSkillDesc(cfg, lv, false, lvDesc);
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.des);
                };
                UnionBookUpTipsMdr.prototype.showTitleTween = function () {
                    this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                    Tween.get(this._view.img_title)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                UnionBookUpTipsMdr.prototype.removeTitleTween = function () {
                    Tween.remove(this._view.img_title);
                };
                UnionBookUpTipsMdr.prototype.showBgTween = function () {
                    var _this = this;
                    this._view.img_bg.visible = false;
                    this._view.img_bg.height = 0;
                    Tween.get(this._view.img_bg)
                        .delay(200)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_bg.visible = true;
                    }))
                        .to({ height: 400 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                UnionBookUpTipsMdr.prototype.showGrpTween = function () {
                    var _this = this;
                    this._view.grp_show.visible = false;
                    this._view.grp_show.x = 0;
                    Tween.get(this._view.grp_show)
                        .delay(400)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_show.visible = true;
                    }))
                        .to({ x: 175 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr.prototype.removeGrpTween = function () {
                    Tween.remove(this._view.grp_show);
                };
                UnionBookUpTipsMdr.prototype.showDescTween = function () {
                    var _this = this;
                    this._view.grp_desc.visible = false;
                    this._view.grp_desc.x = 0;
                    Tween.get(this._view.grp_desc)
                        .delay(600)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_desc.visible = true;
                    }))
                        .to({ x: 244 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr.prototype.removeDescTween = function () {
                    Tween.remove(this._view.grp_desc);
                };
                UnionBookUpTipsMdr.prototype.showSkillTween = function () {
                    var _this = this;
                    this._view.skill.visible = false;
                    this._view.skill.scaleX = this._view.skill.scaleY = 3;
                    Tween.get(this._view.skill)
                        .delay(800)
                        .exec(Handler.alloc(this, function () {
                        _this._view.skill.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr.prototype.removeSkillTween = function () {
                    Tween.remove(this._view.skill);
                };
                UnionBookUpTipsMdr.prototype.showTipsTween = function () {
                    var _this = this;
                    this._view.closeTips.visible = false;
                    Tween.get(this._view.closeTips)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.closeTips.visible = true;
                    }));
                };
                UnionBookUpTipsMdr.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.closeTips);
                };
                UnionBookUpTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                return UnionBookUpTipsMdr;
            }(game.EffectMdrBase));
            union.UnionBookUpTipsMdr = UnionBookUpTipsMdr;
            __reflect(UnionBookUpTipsMdr.prototype, "game.mod.union.UnionBookUpTipsMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var UnionBookUpTipsMdr2 = /** @class */ (function (_super) {
                __extends(UnionBookUpTipsMdr2, _super);
                // public _showArgs: BattleSkillItemRenderData;/**技能数据*/
                function UnionBookUpTipsMdr2() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionBookUpTipsView2);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionBookUpTipsMdr2.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                UnionBookUpTipsMdr2.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                UnionBookUpTipsMdr2.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.showTitleTween();
                    this.showBgTween();
                    this.showGrpTween();
                    this.showDescTween(this._view.grp_desc1, 116);
                    this.showDescTween(this._view.grp_desc2, 398);
                    this.showSkillTween(this._view.skill1);
                    this.showSkillTween(this._view.skill2);
                    this.showTipsTween();
                    this.showEffect();
                };
                UnionBookUpTipsMdr2.prototype.onHide = function () {
                    this.removeTitleTween();
                    this.removeBgTween();
                    this.removeGrpTween();
                    this.removeDescTween();
                    this.removeSkillTween();
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                UnionBookUpTipsMdr2.prototype.updateShow = function () {
                    var skillId = this._showArgs.skillId;
                    var skillId2 = this._showArgs.skillId2;
                    var lv = this._showArgs.lv;
                    var lvDesc = this._showArgs.lvDesc;
                    var lastLv = lv - 1;
                    var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                    this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                    this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                    this._view.lab_lv1.text = lastLv + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.lab_lv2.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                    // this._view.skill1.setData(skillId);
                    // this._view.skill2.setData(skillId);
                    // let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, skillId);
                    this._view.lab_name1.text = this._view.lab_name2.text = cfg.name;
                    this._view.skill2.setIcon(cfg.icon);
                    this._view.lab_desc2.textFlow = game.TextUtil.parseHtml(cfg.des);
                    var cfgBefore = game.getConfigByNameId("buff.json" /* Buff */, skillId2);
                    this._view.lab_desc1.textFlow = game.TextUtil.parseHtml(cfgBefore.des);
                    this._view.skill1.setIcon(cfgBefore.icon);
                };
                UnionBookUpTipsMdr2.prototype.showTitleTween = function () {
                    this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                    Tween.get(this._view.img_title)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                UnionBookUpTipsMdr2.prototype.removeTitleTween = function () {
                    Tween.remove(this._view.img_title);
                };
                UnionBookUpTipsMdr2.prototype.showBgTween = function () {
                    var _this = this;
                    this._view.img_bg.visible = false;
                    this._view.img_bg.height = 0;
                    Tween.get(this._view.img_bg)
                        .delay(200)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_bg.visible = true;
                    }))
                        .to({ height: 500 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr2.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                UnionBookUpTipsMdr2.prototype.showGrpTween = function () {
                    var _this = this;
                    this._view.grp_show.visible = false;
                    this._view.grp_show.x = 0;
                    Tween.get(this._view.grp_show)
                        .delay(400)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_show.visible = true;
                    }))
                        .to({ x: 175 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr2.prototype.removeGrpTween = function () {
                    Tween.remove(this._view.grp_show);
                };
                UnionBookUpTipsMdr2.prototype.showDescTween = function (grp, posX) {
                    grp.visible = false;
                    grp.x = 0;
                    Tween.get(grp)
                        .delay(600)
                        .exec(Handler.alloc(this, function () {
                        grp.visible = true;
                    }))
                        .to({ x: posX }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr2.prototype.removeDescTween = function () {
                    Tween.remove(this._view.grp_desc1);
                    Tween.remove(this._view.grp_desc2);
                };
                UnionBookUpTipsMdr2.prototype.showSkillTween = function (skill) {
                    skill.visible = false;
                    skill.scaleX = skill.scaleY = 3;
                    Tween.get(skill)
                        .delay(800)
                        .exec(Handler.alloc(this, function () {
                        skill.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
                };
                UnionBookUpTipsMdr2.prototype.removeSkillTween = function () {
                    Tween.remove(this._view.skill1);
                    Tween.remove(this._view.skill2);
                };
                UnionBookUpTipsMdr2.prototype.showTipsTween = function () {
                    var _this = this;
                    this._view.closeTips.visible = false;
                    Tween.get(this._view.closeTips)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.closeTips.visible = true;
                    }));
                };
                UnionBookUpTipsMdr2.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.closeTips);
                };
                UnionBookUpTipsMdr2.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                return UnionBookUpTipsMdr2;
            }(game.EffectMdrBase));
            union.UnionBookUpTipsMdr2 = UnionBookUpTipsMdr2;
            __reflect(UnionBookUpTipsMdr2.prototype, "game.mod.union.UnionBookUpTipsMdr2");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var UnionDonateEquipMdr = /** @class */ (function (_super) {
                __extends(UnionDonateEquipMdr, _super);
                function UnionDonateEquipMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionDonateEquipView);
                    // private _equip: IEquipProxy;
                    _this._idxs = [];
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionDonateEquipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    // this._equip = getProxy(ModName.Equip, ProxyType.Equip);
                    this._view.list_item.itemRenderer = union.UnionDonateEquipItem;
                    this._view.list_item.dataProvider = this._listData;
                    this._view.list_item.allowMultipleSelection = true;
                    this._view.coinItem.initIcon(1450000037 /* GuildScore */);
                    this._view.coinItem.lab_cost.textColor = 8585074 /* GREEN */;
                    this._view.lab_explain.textFlow = game.TextUtil.parseHtml(game.getLanById("guild_tips12" /* guild_tips12 */));
                };
                UnionDonateEquipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onClickDonate);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onSelect);
                };
                UnionDonateEquipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.scr.viewport.scrollV = 0;
                    this.onUpdateView();
                };
                UnionDonateEquipMdr.prototype.onUpdateView = function () {
                    var propData = mod.BagUtil.getBagsByType(3 /* RoleEquip */) || [];
                    var list = [];
                    var selects = [];
                    var index = 0;
                    for (var i in propData) {
                        var prop = propData[i];
                        if (prop.propType == 1 /* RoleEquip */) {
                            if (!prop.cfg.guild_donate) {
                                continue;
                            }
                            // if (prop.quality < 5) {
                            //     selects.push(index++);
                            // }
                            list.push(prop);
                        }
                    }
                    this._listData.replaceAll(list);
                    this._view.list_item.selectedIndices = selects;
                    this.onUpdateScore();
                };
                UnionDonateEquipMdr.prototype.onUpdateScore = function () {
                    var count = 0;
                    this._idxs = [];
                    for (var _i = 0, _a = this._view.list_item.selectedIndices; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var prop = this._listData.source[i];
                        if (prop) {
                            this._idxs.push(prop.prop_id);
                            count += prop.cfg.guild_donate[1];
                        }
                    }
                    this._view.coinItem.lab_cost.text = "" + count;
                    var str = game.TextUtil.addColor("" + this._view.list_item.selectedIndices.length, 2330156 /* GREEN */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml("\u5171\u9009\u62E9" + str + "\u4EF6\u88C5\u5907\uFF0C\u6350\u732E\u83B7\u5F97");
                };
                UnionDonateEquipMdr.prototype.onClickDonate = function () {
                    if (this._idxs.length > this._proxy.residue_boxs) {
                        game.PromptBox.getIns().show("仓库已满，无法捐献。");
                        return;
                    }
                    this._proxy.c2s_guild_ware_oper(1, this._idxs);
                    this.hide();
                };
                UnionDonateEquipMdr.prototype.onSelect = function () {
                    this.onUpdateScore();
                };
                UnionDonateEquipMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionDonateEquipMdr;
            }(game.MdrBase));
            union.UnionDonateEquipMdr = UnionDonateEquipMdr;
            __reflect(UnionDonateEquipMdr.prototype, "game.mod.union.UnionDonateEquipMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            /**回收 */
            var UnionRecycleMdr = /** @class */ (function (_super) {
                __extends(UnionRecycleMdr, _super);
                function UnionRecycleMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionRecycleView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionRecycleMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_item.itemRenderer = union.UnionDonateEquipItem;
                    this._view.list_item.dataProvider = this._listData;
                    this._view.list_item.allowMultipleSelection = true;
                    this._view.lab.text = game.getLanById("xianzong_tips19" /* xianzong_tips19 */);
                };
                UnionRecycleMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.selectItem1.list, TouchEvent.TOUCH_TAP, this.onClickSelect1);
                    addEventListener(this._view.selectItem1.gr_box, TouchEvent.TOUCH_TAP, this.onClickBox1);
                    addEventListener(this._view.selectItem2.list, TouchEvent.TOUCH_TAP, this.onClickSelect2);
                    addEventListener(this._view.selectItem2.gr_box, TouchEvent.TOUCH_TAP, this.onClickBox2);
                    addEventListener(this._view.btn_recycle, TouchEvent.TOUCH_TAP, this.onClickRecycle);
                    addEventListener(this._view.btn_select, TouchEvent.TOUCH_TAP, this.onClickOneSelect);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickSelectBox);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                };
                UnionRecycleMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionRecycleMdr.prototype.onUpdateView = function () {
                    var strs = this._proxy.getEquipKeyValue1();
                    this._view.selectItem1.setData(strs);
                    this._view.selectItem2.setData([game.UnionSelectDefault]);
                    var cfg = game.GameConfig.getParamConfigById("guild_jifen");
                    var value = cfg.value[0];
                    this._view.progress.show(this._proxy.guild_score, value);
                    this._view.btn_recycle.visible = this._view.btn_select.visible = this._proxy.recycle_oper;
                    this._view.lab.visible = !this._proxy.recycle_oper;
                    this.onUpdateBox();
                };
                UnionRecycleMdr.prototype.onUpdateBox = function () {
                    var key = this._view.selectItem1.getKey;
                    var quality = this._view.selectItem2.getKey;
                    var list = this._proxy.getEquioList(key, quality);
                    this._listData.replaceAll(list);
                    this._view.list_item.selectedIndices = [];
                    if (!+key || !+quality) {
                        var nums = list.map(function (v, i) {
                            return i;
                        });
                        this._view.list_item.selectedIndices = nums;
                    }
                    this._view.scr.viewport.scrollV = 0;
                    this.onUpdateScore();
                };
                UnionRecycleMdr.prototype.onUpdateScore = function () {
                    var count = 0;
                    this._idxs = [];
                    for (var _i = 0, _a = this._view.list_item.selectedIndices; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var prop = this._listData.source[i];
                        if (prop) {
                            this._idxs.push(prop.prop_id);
                            count += prop.cfg.guild_donate[1];
                        }
                    }
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml("\u672C\u6B21\u56DE\u6536\u5B9D\u7BB1\u79EF\u5206+" + game.TextUtil.addColor("" + count, 0x309539));
                    // let cfg: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
                    // let value: number = cfg.value[0];
                    // this._view.progress.show(this._proxy.guild_score + count, value);
                    this._view.progress.showPreview(this._proxy.guild_score + count);
                };
                UnionRecycleMdr.prototype.onClickSelect1 = function () {
                    this._view.selectItem1.setStatus();
                    this._view.selectItem2.setData([game.UnionSelectDefault]);
                    this.onUpdateBox();
                };
                UnionRecycleMdr.prototype.onClickBox1 = function () {
                    this._view.selectItem1.setStatus();
                };
                UnionRecycleMdr.prototype.onClickSelect2 = function () {
                    this._view.selectItem2.setStatus();
                    this.onUpdateBox();
                };
                UnionRecycleMdr.prototype.onClickBox2 = function () {
                    var qualitys = this._proxy.getEquipKeyValue2(this._view.selectItem1.getKey);
                    this._view.selectItem2.setData(qualitys);
                    this._view.selectItem2.setStatus();
                };
                UnionRecycleMdr.prototype.onClickRecycle = function () {
                    if (!this._proxy.recycle_oper) {
                        game.PromptBox.getIns().show("只有宗主和副宗主才能回收");
                        return;
                    }
                    if (this._idxs && this._idxs.length) {
                        this._proxy.c2s_guild_ware_oper(2, this._idxs);
                        this.hide();
                    }
                };
                UnionRecycleMdr.prototype.onClickOneSelect = function () {
                    var selects = [];
                    for (var i in this._listData.source) {
                        selects.push(+i);
                    }
                    this._view.list_item.selectedIndices = selects;
                    this.onUpdateScore();
                };
                UnionRecycleMdr.prototype.onClickSelectBox = function () {
                    this.onUpdateScore();
                };
                UnionRecycleMdr.prototype.onClickReward = function () {
                    var param = game.GameConfig.getParamConfigById("guild_jifen");
                    var index = param.value[1];
                    var prop = game.GameConfig.getPropConfigById(index);
                    mod.ViewMgr.getIns().showBoxReward("", prop.show_reward);
                };
                UnionRecycleMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionRecycleMdr;
            }(game.MdrBase));
            union.UnionRecycleMdr = UnionRecycleMdr;
            __reflect(UnionRecycleMdr.prototype, "game.mod.union.UnionRecycleMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionStorageMainMdr = /** @class */ (function (_super) {
                __extends(UnionStorageMainMdr, _super);
                function UnionStorageMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongcangkubiaoqiantubiao",
                            mdr: union.UnionStorageMdr,
                            bg: "",
                            title: "guild_tips6" /* guild_tips6 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "22" /* UnionStorage */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "xianzongpaimaibiaoqiantubiao",
                            mdr: union.UnionAuctionMdr,
                            bg: "",
                            title: "guild_tips7" /* guild_tips7 */,
                            openIdx: 1041670255 /* UnionAuction */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "22" /* UnionStorage */, "02" /* TabBtnType02 */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "xianzongbaokubiaoqiantubiao",
                            mdr: union.UnionStoreMdr,
                            bg: "beijingtu_duihuan",
                            title: "guild_tips5" /* guild_tips5 */,
                            openIdx: 1041670256 /* UnionStore */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "22" /* UnionStorage */, "03" /* TabBtnType03 */]
                        }
                    ];
                    return _this;
                }
                return UnionStorageMainMdr;
            }(mod.WndBaseMdr));
            union.UnionStorageMainMdr = UnionStorageMainMdr;
            __reflect(UnionStorageMainMdr.prototype, "game.mod.union.UnionStorageMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            /**仓库 */
            var UnionStorageMdr = /** @class */ (function (_super) {
                __extends(UnionStorageMdr, _super);
                function UnionStorageMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionStorageView);
                    _this._listData = new ArrayCollection();
                    _this._msgData = new ArrayCollection();
                    return _this;
                }
                UnionStorageMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_msg.itemRenderer = union.UnionStorageMsgItem;
                    this._view.list_msg.dataProvider = this._msgData;
                    this._view.list_item.itemRenderer = union.UnionStorageItem;
                    this._view.list_item.dataProvider = this._listData;
                };
                UnionStorageMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_recycle, TouchEvent.TOUCH_TAP, this.onClickRecycle);
                    addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onClickDonate);
                    addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckbox);
                    this.onNt("on_update_storage_info" /* ON_UPDATE_STORAGE_INFO */, this.onUpdateView, this);
                    // this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateIndex, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this); //属性刷新，有货币
                };
                UnionStorageMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_ware_show();
                    _super.prototype.onShow.call(this);
                    this._view.scr.viewport.scrollV = 0;
                };
                UnionStorageMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    var max_boxs = this._proxy.max_boxs;
                    if (model.item_list.length < max_boxs) {
                        model.item_list.length = max_boxs;
                    }
                    var list = [];
                    var cfgs = [];
                    var equips = [];
                    var nulls = [];
                    var param = game.GameConfig.getParamConfigById("guild_jifen");
                    var len = game.getConfigListByName("guild_ware.json" /* GuildWare */).length;
                    for (var _i = 0, _a = model.item_list; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (!data) {
                            nulls.push(data);
                            continue;
                        }
                        var prop = game.PropData.create(data.index, data.count);
                        // prop.prop_id = data.prop_id;
                        prop.update(data);
                        var cfg = game.getConfigByNameId("guild_ware.json" /* GuildWare */, prop.index);
                        if (cfg) {
                            // cfgs.push(prop);
                            cfgs[cfg.sort] = prop;
                            continue;
                        }
                        if (prop.index == param.value[1]) {
                            // cfgs.push(prop);
                            cfgs[len] = prop;
                            continue;
                        }
                        if (prop.type == 290 /* Equip */) {
                            if (this._view.checkbox.selected) {
                                if (mod.RoleUtil.getRebirthLv(prop.cfg.rebirth_limit) == mod.RoleUtil.getRebirthLv()) {
                                    equips.push(prop);
                                }
                            }
                            else {
                                equips.push(prop);
                            }
                            continue;
                        }
                        equips.push(prop);
                    }
                    // cfgs.sort((a, b) => { return a.index - b.index });
                    cfgs = cfgs.filter(function (v) { return !!v; });
                    equips.sort(function (a, b) { return b.quality - a.quality; });
                    list = cfgs.concat(equips, nulls);
                    this._listData.replaceAll(list);
                    this._msgData.replaceAll(model.donate_logs);
                    this.onUpdateCount();
                };
                UnionStorageMdr.prototype.onUpdateCount = function () {
                    this._view.coinItem.updateShow([1450000037 /* GuildScore */, 0]);
                    var cnt = mod.BagUtil.getPropCntByIdx(1450000037 /* GuildScore */);
                    this._view.coinItem.setLabCost("" + cnt, 0xffffff);
                };
                UnionStorageMdr.prototype.onClickRecycle = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "30" /* UnionRecycle */);
                };
                UnionStorageMdr.prototype.onClickDonate = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "23" /* UnionDonateEquip */);
                };
                UnionStorageMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys && keys.indexOf(game.PropIndexToKey[1450000037 /* GuildScore */]) >= 0) {
                        this.onUpdateCount();
                    }
                };
                UnionStorageMdr.prototype.onClickCheckbox = function () {
                    this.onUpdateView();
                };
                UnionStorageMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionStorageMdr;
            }(game.MdrBase));
            union.UnionStorageMdr = UnionStorageMdr;
            __reflect(UnionStorageMdr.prototype, "game.mod.union.UnionStorageMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            /**宗门宝库 */
            var UnionStoreMdr = /** @class */ (function (_super) {
                __extends(UnionStoreMdr, _super);
                function UnionStoreMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.ExchangeView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionStoreMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionStoreItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.img_banner.source = game.ResUtil.getUiJpg("xianzongbaokuguanggaotu");
                    /**个人数据 不用每次打开请求 */
                    this._proxy.c2s_guild_baoku_show();
                };
                UnionStoreMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_store_info" /* ON_UPDATE_STORE_INFO */, this.onUpdateView, this);
                };
                UnionStoreMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.onUpdateTime();
                };
                UnionStoreMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                UnionStoreMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("guild_bao_ku.json" /* GuildBaoKu */);
                    this._listData.replaceAll(cfgArr);
                    this._view.iconBigReward.setData(cfgArr[0].reward);
                };
                UnionStoreMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                        leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    }
                    this._view.timeItem.updateLeftTime(leftTime, '', game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                UnionStoreMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                return UnionStoreMdr;
            }(game.MdrBase));
            union.UnionStoreMdr = UnionStoreMdr;
            __reflect(UnionStoreMdr.prototype, "game.mod.union.UnionStoreMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionStoreTipsMdr = /** @class */ (function (_super) {
                __extends(UnionStoreTipsMdr, _super);
                function UnionStoreTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionStoreTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionStoreTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                };
                UnionStoreTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.btn_confirm, egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
                    addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
                    addEventListener(this._view.btn_addTen, egret.TouchEvent.TOUCH_TAP, this.onAddTen, this);
                    addEventListener(this._view.btn_subtract, egret.TouchEvent.TOUCH_TAP, this.onSubtract, this);
                    addEventListener(this._view.btn_subtractTen, egret.TouchEvent.TOUCH_TAP, this.onSubtractTen, this);
                };
                UnionStoreTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.setCnt(1); //重置次数
                };
                UnionStoreTipsMdr.prototype.onUpdateView = function () {
                    var param1 = game.GameConfig.getParamConfigById("guild_exchange_item");
                    this.index = param1.value;
                    var param2 = game.GameConfig.getParamConfigById("guild_duihuan");
                    this.count = param2.value;
                    var param3 = game.GameConfig.getParamConfigById("guild_exchange_num");
                    this.num = param3.value;
                    var str1 = game.TextUtil.addColor(this.count + "\u4ED9\u7389", 2330156 /* GREEN */);
                    var prop = game.PropData.create(this.index);
                    var str2 = game.TextUtil.addColor("" + this.count + prop.cfg.name, 2330156 /* GREEN */);
                    this._view.lab_1.textFlow = game.TextUtil.parseHtml("\u662F\u5426\u82B1\u8D39" + str1 + "\u8D2D\u4E70" + str2);
                    this._leftCnt = this._proxy.model.store_count || 0;
                    var str3 = game.TextUtil.addColor(this._leftCnt + "/" + this.num, this._leftCnt >= this.num ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this._view.lab_2.textFlow = game.TextUtil.parseHtml("\u672C\u5468\u5269\u4F59\u8D2D\u4E70\u6B21\u6570" + str3);
                    this.onUpdateCost();
                };
                UnionStoreTipsMdr.prototype.onUpdateCost = function () {
                    this._view.coinItem.lab_cost.text = "" + this.getCnt * this.count;
                };
                UnionStoreTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                UnionStoreTipsMdr.prototype.onConfirm = function () {
                    this._proxy.c2s_guild_exchange_item(this.getCnt);
                    this.hide();
                };
                UnionStoreTipsMdr.prototype.setCnt = function (cnt) {
                    this._view.lb_cnt.text = "" + cnt;
                    this.onUpdateCost();
                };
                UnionStoreTipsMdr.prototype.onAdd = function () {
                    var cnt = this.getCnt;
                    if (cnt >= this._leftCnt) {
                        return;
                    }
                    this.setCnt(++cnt);
                };
                UnionStoreTipsMdr.prototype.onAddTen = function () {
                    var cnt = this.getCnt;
                    if (cnt >= this._leftCnt) {
                        return;
                    }
                    this.setCnt(Math.min(cnt + 10, this._leftCnt));
                };
                UnionStoreTipsMdr.prototype.onSubtract = function () {
                    var cnt = this.getCnt;
                    if (cnt <= 1) {
                        return;
                    }
                    this.setCnt(--cnt);
                };
                UnionStoreTipsMdr.prototype.onSubtractTen = function () {
                    var cnt = this.getCnt;
                    if (cnt <= 1) {
                        return;
                    }
                    this.setCnt(Math.max(cnt - 10, 1));
                };
                Object.defineProperty(UnionStoreTipsMdr.prototype, "getCnt", {
                    get: function () {
                        return Number(this._view.lb_cnt.text) || 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UnionStoreTipsMdr;
            }(game.MdrBase));
            union.UnionStoreTipsMdr = UnionStoreTipsMdr;
            __reflect(UnionStoreTipsMdr.prototype, "game.mod.union.UnionStoreTipsMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionApplyListView = /** @class */ (function (_super) {
                __extends(UnionApplyListView, _super);
                function UnionApplyListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionApplyListSkin";
                    return _this;
                }
                return UnionApplyListView;
            }(eui.Component));
            union.UnionApplyListView = UnionApplyListView;
            __reflect(UnionApplyListView.prototype, "game.mod.union.UnionApplyListView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionCreateView = /** @class */ (function (_super) {
                __extends(UnionCreateView, _super);
                function UnionCreateView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionCreateSkin";
                    return _this;
                }
                return UnionCreateView;
            }(eui.Component));
            union.UnionCreateView = UnionCreateView;
            __reflect(UnionCreateView.prototype, "game.mod.union.UnionCreateView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionDonateView = /** @class */ (function (_super) {
                __extends(UnionDonateView, _super);
                function UnionDonateView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionDonateSkin";
                    return _this;
                }
                return UnionDonateView;
            }(eui.Component));
            union.UnionDonateView = UnionDonateView;
            __reflect(UnionDonateView.prototype, "game.mod.union.UnionDonateView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionFirstView = /** @class */ (function (_super) {
                __extends(UnionFirstView, _super);
                function UnionFirstView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionFirstSkin";
                    return _this;
                }
                return UnionFirstView;
            }(eui.Component));
            union.UnionFirstView = UnionFirstView;
            __reflect(UnionFirstView.prototype, "game.mod.union.UnionFirstView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionInView = /** @class */ (function (_super) {
                __extends(UnionInView, _super);
                function UnionInView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionInSkin";
                    return _this;
                }
                return UnionInView;
            }(eui.Component));
            union.UnionInView = UnionInView;
            __reflect(UnionInView.prototype, "game.mod.union.UnionInView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionListView = /** @class */ (function (_super) {
                __extends(UnionListView, _super);
                function UnionListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionListSkin";
                    return _this;
                }
                return UnionListView;
            }(eui.Component));
            union.UnionListView = UnionListView;
            __reflect(UnionListView.prototype, "game.mod.union.UnionListView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionMemberPopupView = /** @class */ (function (_super) {
                __extends(UnionMemberPopupView, _super);
                function UnionMemberPopupView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionMemberPopupSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return UnionMemberPopupView;
            }(eui.Component));
            union.UnionMemberPopupView = UnionMemberPopupView;
            __reflect(UnionMemberPopupView.prototype, "game.mod.union.UnionMemberPopupView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionMemberView = /** @class */ (function (_super) {
                __extends(UnionMemberView, _super);
                function UnionMemberView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionMemberSkin";
                    return _this;
                }
                return UnionMemberView;
            }(eui.Component));
            union.UnionMemberView = UnionMemberView;
            __reflect(UnionMemberView.prototype, "game.mod.union.UnionMemberView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionRenameView = /** @class */ (function (_super) {
                __extends(UnionRenameView, _super);
                function UnionRenameView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionRenameSkin";
                    return _this;
                }
                return UnionRenameView;
            }(eui.Component));
            union.UnionRenameView = UnionRenameView;
            __reflect(UnionRenameView.prototype, "game.mod.union.UnionRenameView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionSetHeroView = /** @class */ (function (_super) {
                __extends(UnionSetHeroView, _super);
                function UnionSetHeroView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionSetHeroSkin";
                    return _this;
                }
                return UnionSetHeroView;
            }(eui.Component));
            union.UnionSetHeroView = UnionSetHeroView;
            __reflect(UnionSetHeroView.prototype, "game.mod.union.UnionSetHeroView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionWageView = /** @class */ (function (_super) {
                __extends(UnionWageView, _super);
                function UnionWageView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionWageSkin";
                    return _this;
                }
                return UnionWageView;
            }(eui.Component));
            union.UnionWageView = UnionWageView;
            __reflect(UnionWageView.prototype, "game.mod.union.UnionWageView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionXianZunShopView = /** @class */ (function (_super) {
                __extends(UnionXianZunShopView, _super);
                function UnionXianZunShopView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionXianZunShopSkin";
                    return _this;
                }
                return UnionXianZunShopView;
            }(eui.Component));
            union.UnionXianZunShopView = UnionXianZunShopView;
            __reflect(UnionXianZunShopView.prototype, "game.mod.union.UnionXianZunShopView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionTianLotteryView = /** @class */ (function (_super) {
                __extends(UnionTianLotteryView, _super);
                function UnionTianLotteryView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionTianLotterySkin";
                    return _this;
                }
                return UnionTianLotteryView;
            }(eui.Component));
            union.UnionTianLotteryView = UnionTianLotteryView;
            __reflect(UnionTianLotteryView.prototype, "game.mod.union.UnionTianLotteryView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionDonateItem = /** @class */ (function (_super) {
                __extends(UnionDonateItem, _super);
                function UnionDonateItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.CoinItemCenterSkin";
                    return _this;
                }
                UnionDonateItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.setLabCost(this.data[1], 16777215 /* WHITE */);
                };
                return UnionDonateItem;
            }(mod.CostIcon));
            union.UnionDonateItem = UnionDonateItem;
            __reflect(UnionDonateItem.prototype, "game.mod.union.UnionDonateItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            /**仙门列表item */
            var UnionListItem = /** @class */ (function (_super) {
                __extends(UnionListItem, _super);
                function UnionListItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionListItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                    this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                UnionListItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                UnionListItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = data.guild_name;
                    this.lab_leader.text = data.header_name;
                    this.lab_level.text = "" + data.level;
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, data.level);
                    if (!cfg) {
                        console.error("\u4ED9\u5B97\u6350\u732E\u8868\u6CA1\u6709" + data.level + "\u7EA7\u914D\u7F6E");
                        var cfgArr = game.getConfigListByName("guild_donate.json" /* GuildDonate */);
                        cfg = cfgArr[cfgArr.length - 1];
                    }
                    this.lab_count.text = "\u4EBA\u6570\uFF1A" + data.num + "/" + cfg.num;
                    if (!this._proxy.isInUnion) {
                        var apply = this._proxy.getApplyStatus(data.id);
                        var enough = data.num >= cfg.num;
                        this.btn.visible = !apply && !enough;
                        this.img_apply.visible = apply;
                    }
                    else {
                        this.btn.visible = false;
                        this.img_apply.visible = false;
                    }
                    if (!data.condition) {
                        this.lab_limit.text = "无限制";
                        return;
                    }
                    var val = data.condition.value;
                    if (!data.condition.is_set) {
                        this.lab_limit.text = val > 0 ? game.StringUtil.getHurtNumStr(val * 10000) + "\u6218\u529B" : "无限制";
                    }
                    else {
                        this.lab_limit.text = val > 0 ? game.StringUtil.getHurtNumStr(val * 10000) + "\u6218\u529B" : "需要审核";
                    }
                };
                UnionListItem.prototype.onClick = function () {
                    if (this._proxy.isInCd) {
                        game.PromptBox.getIns().show("退出仙宗后2小时方可加入");
                        return;
                    }
                    var val = this.data.condition.value;
                    if (val > 0 && +game.RoleVo.ins.showpower < val * 10000) {
                        game.PromptBox.getIns().show("\u7533\u8BF7\u9700\u8981" + val + "\u4E07\u6218\u529B");
                        return;
                    }
                    this._proxy.c2s_choice_apply_guild(this.data.id);
                };
                return UnionListItem;
            }(mod.BaseRenderer));
            union.UnionListItem = UnionListItem;
            __reflect(UnionListItem.prototype, "game.mod.union.UnionListItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var UnionMemberItem = /** @class */ (function (_super) {
                __extends(UnionMemberItem, _super);
                function UnionMemberItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionMemberItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                UnionMemberItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                UnionMemberItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = data.name;
                    this.lab_name.textColor = data.role_id.eq(game.RoleVo.ins.role_id) ? 31431 /* BLUE */ : 16777215 /* WHITE */;
                    this.lab_power.text = "\u6218\u529B\uFF1A" + data.power.toNumber();
                    this.head.updateShow(data.head, data.head_frame, data.sex, data.vip);
                    this.lab_online.text = data.is_online ? game.getLanById("guild_online" /* guild_online */) : game.TimeUtil.getLeaveTime(data.last_time);
                    this.img_job.visible = data.guild_job != 4 /* General */ && data.guild_job != 0 /* Leave */;
                    if (this.img_job.visible) {
                        this.img_job.source = "biaoqian_job" + data.guild_job;
                    }
                    if (data.is_xianzong) {
                        this.img_hero.visible = true;
                        if (data.guild_job == 4 /* General */) {
                            this.img_hero.x = this.img_job.x;
                        }
                        else {
                            this.img_hero.x = 547;
                        }
                    }
                    else {
                        this.img_hero.visible = false;
                    }
                };
                UnionMemberItem.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "04" /* UnionMember */, this.data.role_id);
                };
                return UnionMemberItem;
            }(mod.BaseRenderer));
            union.UnionMemberItem = UnionMemberItem;
            __reflect(UnionMemberItem.prototype, "game.mod.union.UnionMemberItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var UnionSetHeroItem = /** @class */ (function (_super) {
                __extends(UnionSetHeroItem, _super);
                function UnionSetHeroItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionSetHeroItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClickSet, this);
                };
                UnionSetHeroItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickSet, this);
                };
                UnionSetHeroItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.btn.visible = !this._proxy.checkHero(this.data.role_id);
                    this.btn_agree.visible = this.btn_refuse.visible = false;
                };
                UnionSetHeroItem.prototype.onClickSet = function () {
                    this._proxy.c2s_set_guild_xianzong(this.data.role_id);
                };
                return UnionSetHeroItem;
            }(union.UnionApplyItem));
            union.UnionSetHeroItem = UnionSetHeroItem;
            __reflect(UnionSetHeroItem.prototype, "game.mod.union.UnionSetHeroItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var Handler = base.Handler;
            var UnionShopItem = /** @class */ (function (_super) {
                __extends(UnionShopItem, _super);
                function UnionShopItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UnionShopItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("55" /* Union */, 217 /* Union */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                UnionShopItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                UnionShopItem.prototype.dataChanged = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    this.img_bg.source = "common_shop_bg";
                    // this.img_bought.source = "yishouqing";
                    this.img_bought.visible = false;
                    this.icon.data = [cfg.give_item, cfg.give_count];
                    var propCfg = game.GameConfig.getPropConfigById(cfg.give_item);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(propCfg.name, game.ColorUtil.getColorByQuality1(propCfg.quality)));
                    this.lab_limit.visible = false;
                    // this.img_tag.visible = !!cfg.tag;
                    // if (cfg.tag) {
                    //     this.img_tag.source = cfg.tag;
                    // }
                    this.btn.setCost([cfg.cost_item, cfg.cost_count]);
                };
                UnionShopItem.prototype.onClick = function () {
                    var cfg = this.data;
                    mod.ViewMgr.getIns().openBuyBulkTips({
                        prop: [cfg.give_item, cfg.give_count],
                        cost: [cfg.cost_item, cfg.cost_count],
                        handler: Handler.alloc(this._proxy, this._proxy.c2s_guild_mibao_swap, [cfg.index])
                    });
                };
                return UnionShopItem;
            }(mod.BaseRenderer));
            union.UnionShopItem = UnionShopItem;
            __reflect(UnionShopItem.prototype, "game.mod.union.UnionShopItem");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            /**申请列表界面 */
            var UnionApplyListMdr = /** @class */ (function (_super) {
                __extends(UnionApplyListMdr, _super);
                function UnionApplyListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionApplyListView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionApplyListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionApplyItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.editable_value.inputType = egret.TextFieldInputType.TEL;
                };
                UnionApplyListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.checkbox1, TouchEvent.TOUCH_TAP, this.onCheckSelect, this);
                    addEventListener(this._view.checkbox2, TouchEvent.TOUCH_TAP, this.onCheckSelect, this);
                    addEventListener(this._view.editable_value, Event.CHANGE, this.onChangeValue, this);
                    this.onNt("on_update_apply_list" /* ON_UPDATE_APPLY_LIST */, this.onUpdateView, this);
                    this.onNt("on_update_apply_limit" /* ON_UPDATE_APPLY_LIMIT */, this.onUpdateLimit, this);
                };
                UnionApplyListMdr.prototype.onShow = function () {
                    if (this._proxy.isApply) {
                        this._proxy.c2s_ask_guild_apply_info();
                    }
                    _super.prototype.onShow.call(this);
                    this.onUpdateLimit();
                    this.onUpdateView();
                    this._view.secondPop.updateTitleStr(game.getLanById("guild_meun7" /* guild_meun7 */));
                };
                UnionApplyListMdr.prototype.onUpdateView = function () {
                    this._listData.source = this._proxy.getApplyList();
                };
                UnionApplyListMdr.prototype.onUpdateLimit = function () {
                    this._limit = this._proxy.getApplyLimit();
                    this._view.checkbox1.selected = this._limit.is_set;
                    this._view.checkbox2.selected = this._limit.value > 0;
                    this._view.editable_value.text = "" + this._limit.value;
                };
                UnionApplyListMdr.prototype.onChangeValue = function () {
                    this._view.editable_value.text = "" + +this._view.editable_value.text;
                };
                UnionApplyListMdr.prototype.onCheckSelect = function () {
                    var val = +this._view.editable_value.text;
                    var sel2 = this._view.checkbox2.selected;
                    if (!sel2) {
                        val = 0;
                        this._view.editable_value.text = "" + val;
                    }
                    if (sel2 && !val) {
                        this._view.checkbox2.selected = val > 0;
                        game.PromptBox.getIns().show("设置战力限制才可勾选");
                        return;
                    }
                    this._proxy.c2s_guild_open_status(this._view.checkbox1.selected, val);
                };
                UnionApplyListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionApplyListMdr;
            }(game.MdrBase));
            union.UnionApplyListMdr = UnionApplyListMdr;
            __reflect(UnionApplyListMdr.prototype, "game.mod.union.UnionApplyListMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            /**创建宗门 */
            var UnionCreateMdr = /** @class */ (function (_super) {
                __extends(UnionCreateMdr, _super);
                function UnionCreateMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionCreateView);
                    return _this;
                }
                UnionCreateMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    game.TextUtil.addLinkHtmlTxt2(this._view.lab_jump, "前往提升vip", 15577620 /* YELLOW */);
                    this._view.img_common.source = game.ResUtil.getUiPng("create_union_common_1");
                    this._view.img_common_sel.source = game.ResUtil.getUiPng("create_union_common_2");
                    this._view.img_vip.source = game.ResUtil.getUiPng("create_union_vip_1");
                    this._view.img_vip_sel.source = game.ResUtil.getUiPng("create_union_vip_2");
                };
                UnionCreateMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.lab_jump, TouchEvent.TOUCH_TAP, this.onJumpVip, this);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.btn_random, TouchEvent.TOUCH_TAP, this.onRandom, this);
                    addEventListener(this._view.img_common, TouchEvent.TOUCH_TAP, this.onSelectCommon, this);
                    addEventListener(this._view.img_vip, TouchEvent.TOUCH_TAP, this.onSelectVip, this);
                    this.onNt("on_update_union_name" /* ON_UPDATE_UNION_NAME */, this.onUpdateName, this);
                };
                UnionCreateMdr.prototype.onShow = function () {
                    var random_name = this._proxy.model.random_name;
                    if (!random_name || random_name == "") {
                        this._proxy.c2s_random_guild_name();
                    }
                    _super.prototype.onShow.call(this);
                    this.onSelectCommon();
                    this.onUpdateName();
                };
                UnionCreateMdr.prototype.onUpdateName = function () {
                    this._view.editable_value.text = this._proxy.model.random_name || "";
                };
                UnionCreateMdr.prototype.onSelectCommon = function () {
                    this._view.currentState = "common" /* COMMON */;
                    var type = this._proxy.getCreateType(this._view.currentState);
                    var cfg = game.getConfigByNameId("guild_create_data.json" /* GuildCreateData */, type);
                    this._view.btn.label = "";
                    this._view.btn.setCost(cfg.cost);
                };
                UnionCreateMdr.prototype.onSelectVip = function () {
                    this._view.currentState = "vip" /* VIP */;
                    var type = this._proxy.getCreateType(this._view.currentState);
                    var cfg = game.getConfigByNameId("guild_create_data.json" /* GuildCreateData */, type);
                    this._view.lab_tips.text = "VIP" + cfg.vip_lv + "\u53EF\u521B\u5EFA";
                    this._view.btn.label = "创建";
                    this._view.btn.resetCost();
                };
                UnionCreateMdr.prototype.onClick = function () {
                    if (this._proxy.isInCd) {
                        game.PromptBox.getIns().show("退出仙宗后2小时方可加入");
                        return;
                    }
                    if (this._view.currentState == "common" /* COMMON */) {
                        var cfg = game.getConfigByNameId("guild_create_data.json" /* GuildCreateData */, 1 /* COMMON */);
                        if (!mod.BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1], 2 /* Text */)) {
                            return;
                        }
                    }
                    else {
                        var cfg = game.getConfigByNameId("guild_create_data.json" /* GuildCreateData */, 2 /* VIP */);
                        if (mod.VipUtil.getShowVipLv() < cfg.vip_lv) {
                            game.PromptBox.getIns().show("VIP" + cfg.vip_lv + "\u53EF\u521B\u5EFA");
                            return;
                        }
                        if (this._proxy.isCreateVip) {
                            game.PromptBox.getIns().show("您已创建过，无法再创建");
                            return;
                        }
                    }
                    var name = this._view.editable_value.text;
                    var type = this._proxy.getCreateType(this._view.currentState);
                    this._proxy.c2s_create_guild(type, name);
                };
                UnionCreateMdr.prototype.onJumpVip = function () {
                    mod.ViewMgr.getIns().openCommonRechargeView();
                };
                UnionCreateMdr.prototype.onRandom = function () {
                    this._proxy.c2s_random_guild_name();
                };
                UnionCreateMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionCreateMdr;
            }(game.MdrBase));
            union.UnionCreateMdr = UnionCreateMdr;
            __reflect(UnionCreateMdr.prototype, "game.mod.union.UnionCreateMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            /**宗门捐赠 */
            var UnionDonateMdr = /** @class */ (function (_super) {
                __extends(UnionDonateMdr, _super);
                function UnionDonateMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionDonateView);
                    _this._listData1 = new ArrayCollection();
                    _this._listData2 = new ArrayCollection();
                    _this._listData3 = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionDonateMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list_1.itemRenderer = this._view.list_2.itemRenderer = this._view.list_3.itemRenderer = union.UnionDonateItem;
                    this._view.list_1.dataProvider = this._listData1;
                    this._view.list_2.dataProvider = this._listData2;
                    this._view.list_3.dataProvider = this._listData3;
                };
                UnionDonateMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onDonate, this);
                    this.onNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */, this.onUpdateView, this);
                };
                UnionDonateMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onInitView();
                    this.onUpdateView();
                    this._view.secondPop.updateTitleStr(game.getLanById("union_title_3" /* union_title_3 */));
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg("bg_xianzongjuanxian"));
                    this.addEftByParentScale(this._view.btn.group_eft);
                };
                UnionDonateMdr.prototype.onInitView = function () {
                    this._view.btn.label = "";
                    this._view.btn.setImage("yijianjuanxian");
                };
                UnionDonateMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    var level = model.info.level;
                    this._cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, level);
                    this._view.coin_1.updateShow(this._cfg.cost[0]);
                    this._view.coin_2.updateShow(this._cfg.cost[1]);
                    this._view.coin_3.updateShow(this._cfg.cost[2]);
                    // this._listData1.removeAll();
                    // this._listData2.removeAll();
                    // this._listData3.removeAll();
                    // for (let reward of this._cfg.donate_reward) {
                    //     if (reward[2] == 1) {
                    //         this._listData1.source.push(reward);
                    //     } else if (reward[2] == 2) {
                    //         this._listData2.source.push(reward);
                    //     } else if (reward[2] == 3) {
                    //         this._listData3.source.push(reward);
                    //     }
                    // }
                    this._listData1.replaceAll(this._proxy.getDonateReward(this._cfg, 1));
                    this._listData2.replaceAll(this._proxy.getDonateReward(this._cfg, 2));
                    this._listData3.replaceAll(this._proxy.getDonateReward(this._cfg, 3));
                    this._view.btn.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "139" /* UnionDonate */]));
                    this._view.lab_level.text = level + "\u7EA7";
                    this._view.lab_member.textFlow = game.TextUtil.parseHtml("\u6210\u5458\u4E0A\u9650\uFF1A" + game.TextUtil.addColor("" + this._cfg.num, "0x309539"));
                    this._view.lab_wage.textFlow = game.TextUtil.parseHtml("\u6BCF\u65E5\u4FF8\u7984\uFF1A" + game.TextUtil.addColor(level + "\u9636", "0x309539"));
                    var next = level + 1;
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, next);
                    if (!cfg) {
                        this._view.currentState = "max";
                        return;
                    }
                    this._view.lab_level2.text = next + "\u7EA7";
                    this._view.lab_member2.textFlow = game.TextUtil.parseHtml("\u6210\u5458\u4E0A\u9650\uFF1A" + game.TextUtil.addColor("" + cfg.num, "0x309539"));
                    this._view.lab_wage2.textFlow = game.TextUtil.parseHtml("\u6BCF\u65E5\u4FF8\u7984\uFF1A" + game.TextUtil.addColor(next + "\u9636", "0x309539"));
                    this._view.progress.currentState = "2";
                    this._view.progress.show(model.info.exp, cfg.exp);
                };
                UnionDonateMdr.prototype.onDonate = function () {
                    for (var _i = 0, _a = this._cfg.cost; _i < _a.length; _i++) {
                        var prop = _a[_i];
                        if (mod.BagUtil.checkPropCnt(prop[0], prop[1])) {
                            this._proxy.c2s_guild_donate();
                            return;
                        }
                    }
                    mod.BagUtil.checkPropCntUp(this._cfg.cost[0][0], this._cfg.cost[0][1]);
                    //PromptBox.getIns().show("无道具可捐献");
                };
                UnionDonateMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionDonateMdr;
            }(game.EffectMdrBase));
            union.UnionDonateMdr = UnionDonateMdr;
            __reflect(UnionDonateMdr.prototype, "game.mod.union.UnionDonateMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            /**首次欢迎界面 */
            var UnionFirstMdr = /** @class */ (function (_super) {
                __extends(UnionFirstMdr, _super);
                function UnionFirstMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionFirstView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionFirstMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.img_bg.source = game.ResUtil.getUiPng("yuanhua_1");
                };
                UnionFirstMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                UnionFirstMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionFirstMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    model.show_welcome = false;
                    this._view.head.updateHeadShow(model.hero.head, model.hero.head_frame, model.hero.sex);
                    this._view.lab_name.text = model.hero.name;
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("union_tips_1" /* union_tips_1 */), [
                        game.TextUtil.addColor(game.RoleVo.ins.name, "0x238e2c"),
                        game.TextUtil.addColor(this._proxy.model.name, "0x238e2c")
                    ]));
                };
                UnionFirstMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionFirstMdr;
            }(game.MdrBase));
            union.UnionFirstMdr = UnionFirstMdr;
            __reflect(UnionFirstMdr.prototype, "game.mod.union.UnionFirstMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var facade = base.facade;
            var UnionInMainMdr = /** @class */ (function (_super) {
                __extends(UnionInMainMdr, _super);
                function UnionInMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [];
                    return _this;
                }
                UnionInMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                };
                UnionInMainMdr.prototype.onShow = function () {
                    this.onUpdateData();
                    _super.prototype.onShow.call(this);
                };
                UnionInMainMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_in_union" /* ON_UPDATE_IN_UNION */, this.onUpdateInUnion, this);
                };
                UnionInMainMdr.prototype.onUpdateData = function () {
                    if (this._proxy.isInUnion) {
                        this._btnData = [
                            {
                                btnType: "01" /* TabBtnType01 */,
                                icon: "xianzongbiaoqiantubiao",
                                mdr: union.UnionInMdr,
                                title: "union_title_2" /* union_title_2 */,
                                hintTypes: ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */]
                            },
                            {
                                btnType: "02" /* TabBtnType02 */,
                                icon: "chengyuanbiaoqiantubiao",
                                mdr: union.UnionMemberMdr,
                                title: "union_title_4" /* union_title_4 */,
                                hintTypes: ["55" /* Union */, "01" /* UnionIn */, "02" /* TabBtnType02 */]
                            },
                            {
                                btnType: "03" /* TabBtnType03 */,
                                icon: "paimingbiaoqiantubiao",
                                mdr: union.UnionListMdr,
                                title: "union_title_2" /* union_title_2 */,
                                hintTypes: ["55" /* Union */, "01" /* UnionIn */, "03" /* TabBtnType03 */]
                            }
                        ];
                    }
                    else {
                        this._btnData = [
                            {
                                btnType: "04" /* TabBtnType04 */,
                                icon: "xianzongliebiaobiaoqiantubiao",
                                mdr: union.UnionListMdr,
                                title: "union_title_2" /* union_title_2 */,
                                hintTypes: ["55" /* Union */, "01" /* UnionIn */, "04" /* TabBtnType04 */]
                            },
                            {
                                btnType: "05" /* TabBtnType05 */,
                                icon: "chuangjianxianzongbiaoqiantubiao",
                                mdr: union.UnionCreateMdr,
                                title: "union_title_7" /* union_title_7 */,
                                hintTypes: ["55" /* Union */, "01" /* UnionIn */, "05" /* TabBtnType05 */]
                            }
                        ];
                    }
                };
                UnionInMainMdr.prototype.onUpdateInUnion = function () {
                    if (this._tab) {
                        this._tab.hide();
                    }
                    this.onUpdateData();
                    this.updateBtnList();
                    this.updateViewShow();
                };
                return UnionInMainMdr;
            }(mod.WndBaseMdr));
            union.UnionInMainMdr = UnionInMainMdr;
            __reflect(UnionInMainMdr.prototype, "game.mod.union.UnionInMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var UnionInMdr = /** @class */ (function (_super) {
                __extends(UnionInMdr, _super);
                function UnionInMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionInView);
                    return _this;
                }
                UnionInMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.btn_beast.group.y = 66;
                };
                UnionInMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onDonate, this);
                    addEventListener(this._view.btn_wage, TouchEvent.TOUCH_TAP, this.onClickWage, this);
                    addEventListener(this._view.btn_hero, TouchEvent.TOUCH_TAP, this.onClickHero, this);
                    addEventListener(this._view.head, TouchEvent.TOUCH_TAP, this.onClickHead, this);
                    addEventListener(this._view.btn_welfare, TouchEvent.TOUCH_TAP, this.onWelfare, this);
                    addEventListener(this._view.btn_lottery, TouchEvent.TOUCH_TAP, this.onLottery, this);
                    addEventListener(this._view.btn_treasure, TouchEvent.TOUCH_TAP, this.onTreasure, this);
                    addEventListener(this._view.btn_kill, TouchEvent.TOUCH_TAP, this.onKill, this);
                    addEventListener(this._view.btn_storage, TouchEvent.TOUCH_TAP, this.onStorage, this);
                    addEventListener(this._view.btn_book, TouchEvent.TOUCH_TAP, this.onBook, this);
                    addEventListener(this._view.btn_beast, TouchEvent.TOUCH_TAP, this.onBeast, this);
                    this.onNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */, this.onUpdateView, this);
                    this.onNt("on_update_wage_btn_info" /* ON_UPDATE_WAGE_BTN_INFO */, this.onUpdateWage, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                };
                UnionInMdr.prototype.onShow = function () {
                    this._proxy.c2s_ask_guild_info();
                    _super.prototype.onShow.call(this);
                    this._proxy.open_fun = "";
                    this._view.btn_beast.img_bg.source = game.ResUtil.getUiPng("jianzhu_xianshou"); //仙兽
                    this._view.btn_welfare.img_bg.source = game.ResUtil.getUiPng("jianzhu_fulidating"); //福利大厅
                    this._view.btn_book.img_bg.source = game.ResUtil.getUiPng("jianzhu_shuzai"); //书斋
                    this._view.btn_lottery.img_bg.source = game.ResUtil.getUiPng("jianzhu_tiantan"); //天坛
                    this._view.btn_storage.img_bg.source = game.ResUtil.getUiPng("jianzhu_cangku"); //仓库
                    this._view.btn_kill.img_bg.source = game.ResUtil.getUiPng("jianzhu_zhanyaotai"); //斩妖台
                    this._view.btn_treasure.img_bg.source = game.ResUtil.getUiPng("jianzhu_xianzongyibao"); //仙宗遗宝
                };
                UnionInMdr.prototype.onUpdateView = function () {
                    var model = this._proxy.model;
                    this._view.head.updateHeadShow(model.header.head, model.header.head_frame, model.header.sex);
                    this._view.lab_header.text = model.header.name;
                    this._view.lab_name.text = model.info.guild_name;
                    this._view.btn_donate.label = model.info.level + "\u7EA7";
                    this._view.lab_notice.text = game.getLanById("xianzong_tips1" /* xianzong_tips1 */);
                    this._view.btn_welfare.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "07" /* UnionWelfare */]));
                    this._view.btn_lottery.setHint(mod.HintMgr.getHint(this._proxy.model.lottery_root));
                    this._view.btn_book.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "25" /* UnionBook */]));
                    this._view.btn_beast.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */]));
                    this._view.btn_kill.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */]));
                    this._view.btn_treasure.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "14" /* UnionTreasure */]));
                    this._view.btn_donate.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "139" /* UnionDonate */]));
                    this.onUpdateWage();
                    if (this._proxy.model.show_welcome) {
                        mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "02" /* UnionWelcome */);
                    }
                };
                UnionInMdr.prototype.onUpdateWage = function () {
                    this._view.btn_wage.setHint(!this._proxy.model.is_get_reward);
                    this._view.btn_wage.visible = !this._proxy.model.is_get_reward;
                };
                UnionInMdr.prototype.onDonate = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "05" /* UnionDonate */);
                };
                UnionInMdr.prototype.onWelfare = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "07" /* UnionWelfare */);
                };
                UnionInMdr.prototype.onLottery = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "09" /* UnionLottery */);
                };
                UnionInMdr.prototype.onTreasure = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "14" /* UnionTreasure */);
                };
                UnionInMdr.prototype.onKill = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "18" /* UnionKill */);
                };
                UnionInMdr.prototype.onStorage = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "22" /* UnionStorage */);
                };
                UnionInMdr.prototype.onBook = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "25" /* UnionBook */);
                };
                UnionInMdr.prototype.onBeast = function () {
                    mod.ViewMgr.getIns().showView("55" /* Union */, "26" /* UnionBeast */);
                };
                UnionInMdr.prototype.onClickHead = function () {
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "04" /* UnionMember */, this._proxy.model.header.role_id);
                };
                UnionInMdr.prototype.onClickWage = function () {
                    var bool = this._proxy.model.is_get_reward;
                    if (bool) {
                        game.PromptBox.getIns().show("今日奖励已领取");
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "06" /* UnionWage */);
                };
                /**仙尊秘宝 */
                UnionInMdr.prototype.onClickHero = function () {
                    if (this._proxy.checkIsSetHero()) {
                        mod.ViewMgr.getIns().showView("55" /* Union */, "10" /* UnionHeroShop */);
                    }
                    else {
                        mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "11" /* UnionHero */);
                    }
                };
                UnionInMdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "07" /* UnionWelfare */])) {
                        this._view.btn_welfare.setHint(data.value);
                    }
                    if (data.node == mod.HintMgr.getType(this._proxy.model.lottery_root)) {
                        this._view.btn_lottery.setHint(data.value);
                    }
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */])) {
                        this._view.btn_wage.setHint(!this._proxy.model.is_get_reward);
                        this._view.btn_wage.visible = !this._proxy.model.is_get_reward;
                    }
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "25" /* UnionBook */])) {
                        this._view.btn_book.setHint(data.value);
                    }
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "26" /* UnionBeast */])) {
                        this._view.btn_beast.setHint(data.value);
                    }
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "18" /* UnionKill */])) {
                        this._view.btn_kill.setHint(data.value);
                    }
                };
                UnionInMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionInMdr;
            }(game.MdrBase));
            union.UnionInMdr = UnionInMdr;
            __reflect(UnionInMdr.prototype, "game.mod.union.UnionInMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            /**宗门列表界面 */
            var UnionListMdr = /** @class */ (function (_super) {
                __extends(UnionListMdr, _super);
                function UnionListMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionListView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionListItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_union_list" /* ON_UPDATE_UNION_LIST */, this.onUpdateView, this);
                };
                UnionListMdr.prototype.onShow = function () {
                    this._proxy.c2s_ask_guild_list();
                    _super.prototype.onShow.call(this);
                };
                UnionListMdr.prototype.onUpdateView = function () {
                    this._listData.source = this._proxy.getUnionList();
                };
                UnionListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionListMdr;
            }(game.MdrBase));
            union.UnionListMdr = UnionListMdr;
            __reflect(UnionListMdr.prototype, "game.mod.union.UnionListMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Handler = base.Handler;
            /**成员列表 */
            var UnionMemberMdr = /** @class */ (function (_super) {
                __extends(UnionMemberMdr, _super);
                function UnionMemberMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionMemberView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionMemberMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionMemberItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionMemberMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rename, TouchEvent.TOUCH_TAP, this.onRename, this);
                    addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit, this);
                    addEventListener(this._view.btn_check, TouchEvent.TOUCH_TAP, this.onClickCheck, this);
                    addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
                    addEventListener(this._view.btn_recruit, TouchEvent.TOUCH_TAP, this.onClickRecruit, this);
                    this.onNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */, this.onUpdateList, this);
                    this.onNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */, this.onUpdateHeader, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                };
                UnionMemberMdr.prototype.onShow = function () {
                    this._proxy.c2s_ask_guild_member();
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionMemberMdr.prototype.onUpdateView = function () {
                    this._view.lab_level.text = this._proxy.model.info.level + "\u7EA7";
                    this._view.btn_check.setHint(mod.HintMgr.getHint(["55" /* Union */, "01" /* UnionIn */, "02" /* TabBtnType02 */]));
                    this.onUpdateHeader();
                    this.onUpdateUnionName();
                    this.onUpdateUninonCount();
                };
                UnionMemberMdr.prototype.onUpdateHeader = function () {
                    this._view.lab_leader.text = "\u5B97\u4E3B\uFF1A" + this._proxy.model.header.name;
                };
                UnionMemberMdr.prototype.onUpdateUnionName = function () {
                    this._view.lab_name.text = this._proxy.model.name;
                };
                UnionMemberMdr.prototype.onUpdateUninonCount = function () {
                    var info = this._proxy.model.info;
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, info.level);
                    this._view.lab_count.text = "\u4EBA\u6570\uFF1A" + info.num + "/" + cfg.num;
                };
                UnionMemberMdr.prototype.onUpdateList = function () {
                    this._listData.source = this._proxy.getMemberList();
                };
                /** */
                UnionMemberMdr.prototype.onRename = function () {
                    var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._proxy.model.guild_job);
                    if (!cfg || !cfg.change_name) {
                        game.PromptBox.getIns().show("暂无权限");
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "08" /* UnionRename */);
                };
                /**问号 规则 */
                UnionMemberMdr.prototype.onExplain = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("xianzong_tips17" /* xianzong_tips17 */));
                };
                UnionMemberMdr.prototype.onClickCheck = function () {
                    var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._proxy.model.guild_job);
                    if (!cfg || !cfg.agree_join) {
                        game.PromptBox.getIns().show("暂无权限");
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("55" /* Union */, "03" /* UnionApply */);
                };
                UnionMemberMdr.prototype.onClickExit = function () {
                    if (this._proxy.model.guild_job == 1 /* Leader */) {
                        game.PromptBox.getIns().show("宗主不可退出宗门");
                        return;
                    }
                    var str = game.getLanById("guild_exit_tips" /* guild_exit_tips */);
                    mod.ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onExit));
                };
                UnionMemberMdr.prototype.onExit = function () {
                    this._proxy.c2s_quit_guild();
                };
                UnionMemberMdr.prototype.onClickRecruit = function () {
                    var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, this._proxy.model.guild_job);
                    if (!cfg || !cfg.change_invita) {
                        game.PromptBox.getIns().show("暂无权限");
                        return;
                    }
                    mod.ViewMgr.getIns().showConfirm("你需要向本服聊天中发送招募成员信息", Handler.alloc(this, this.onRecruit));
                };
                UnionMemberMdr.prototype.onRecruit = function () {
                    this._proxy.c2s_guild_invita();
                };
                UnionMemberMdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(["55" /* Union */, "01" /* UnionIn */, "02" /* TabBtnType02 */])) {
                        this._view.btn_check.setHint(data.value);
                    }
                };
                UnionMemberMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionMemberMdr;
            }(game.MdrBase));
            union.UnionMemberMdr = UnionMemberMdr;
            __reflect(UnionMemberMdr.prototype, "game.mod.union.UnionMemberMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            /**成员信息二级弹窗界面 */
            var UnionMemberPopupMdr = /** @class */ (function (_super) {
                __extends(UnionMemberPopupMdr, _super);
                function UnionMemberPopupMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionMemberPopupView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionMemberPopupMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.img_di.source = game.ResUtil.getUiPng("p1_tongyongbaisedi");
                };
                UnionMemberPopupMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_down, TouchEvent.TOUCH_TAP, this.onClickDown, this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    this.onNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */, this.onUpdateView, this);
                };
                UnionMemberPopupMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this._view.secondPop.updateTitleStr(game.getLanById("fairy_magic_player_info" /* fairy_magic_player_info */));
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg("bg_xinxi"));
                };
                UnionMemberPopupMdr.prototype.onUpdateView = function () {
                    this._info = this._proxy.getMemberById(this._showArgs);
                    var info = __assign({}, this._info);
                    this.updateRankUIRole(this._view.grp_eff, info);
                    this._view.power.setPowerValue(this._info.power);
                    this._view.head.updateShow(this._info.head, this._info.head_frame, this._info.sex, this._info.vip);
                    this._view.lab_name.text = this._info.name;
                    this._view.lab_power.text = "\u6218\u529B\uFF1A" + +this._info.power;
                    this._view.img_job.source = this._info.guild_job < 4 /* General */ ? "biaoqian_job" + this._info.guild_job : "";
                    this._view.img_job.visible = this._info.guild_job < 4 /* General */;
                    var job = this._proxy.model.guild_job;
                    /**!cfg=没权限 */
                    var cfg = game.getConfigByNameId("guild_job_data.json" /* GuildJobData */, job);
                    /**选中角色是否自己 */
                    var self = this._info.role_id == game.RoleVo.ins.role_id;
                    /**当前选中角色职位是否比自己小 数值越大职位越低 */
                    var enough = this._info.guild_job > job;
                    /**已经离开宗门 */
                    var level = this._info.guild_job == 0 /* Leave */;
                    if (!cfg || self || !enough || level) {
                        this._view.btn_down.visible = false;
                        this._view.btn_up.visible = false;
                        return;
                    }
                    if (job == 1 /* Leader */) {
                        this._view.btn_up.visible = cfg.change_job == 1;
                        this._view.btn_down.visible = cfg.del_member == 1;
                    }
                    else {
                        this._view.btn_up.visible = cfg.change_job == 1 && this._info.guild_job - 1 > job;
                        // if (this._info.guild_job == UnionJob.General) {
                        //     this._view.btn_down.visible = cfg.del_member == 1 && enough && cfg.del_member == 1;
                        // } else {
                        //     this._view.btn_down.visible = cfg.del_member == 1 && enough;
                        // }
                        this._view.btn_down.visible = cfg.del_member == 1 && enough;
                    }
                    if (this._view.btn_down.visible) {
                        this._view.btn_down.label = this._info.guild_job == 4 /* General */ ? "踢出" : "降职";
                        this._view.btn_down.setBlue();
                    }
                    if (this._view.btn_up.visible) {
                        this._view.btn_up.label = this._info.guild_job == 2 /* Deputy */ ? "禅让" : "升职";
                        this._view.btn_up.setYellow();
                    }
                };
                UnionMemberPopupMdr.prototype.onClickDown = function () {
                    var name = game.TextUtil.addColor("" + this._info.name, 8585074 /* GREEN */);
                    if (this._info.guild_job == 4 /* General */) {
                        var content = game.StringUtil.substitute(game.getLanById("guild_oper_tips_0" /* guild_oper_tips_0 */), [name]);
                        mod.ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onFired));
                    }
                    else {
                        var jobText = this._proxy.getJobTextByJob(this._info.guild_job + 1);
                        var job = game.TextUtil.addColor("" + jobText, 8585074 /* GREEN */);
                        var content = game.StringUtil.substitute(game.getLanById("guild_oper_tips_2" /* guild_oper_tips_2 */), [name, job]);
                        mod.ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onDown));
                    }
                };
                UnionMemberPopupMdr.prototype.onFired = function () {
                    this._proxy.c2s_guild_kick_member(this._info.role_id);
                    this.hide();
                };
                UnionMemberPopupMdr.prototype.onDown = function () {
                    this._proxy.c2s_set_guild_member_job(this._info.role_id, 2 /* DOWN */);
                };
                UnionMemberPopupMdr.prototype.onClickUp = function () {
                    var name = game.TextUtil.addColor("" + this._info.name, 8585074 /* GREEN */);
                    var jobText = this._proxy.getJobTextByJob(this._info.guild_job - 1);
                    var job = game.TextUtil.addColor("" + jobText, 8585074 /* GREEN */);
                    var content = game.StringUtil.substitute(game.getLanById("guild_oper_tips_1" /* guild_oper_tips_1 */), [name, job]);
                    mod.ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.onUpgrade));
                };
                UnionMemberPopupMdr.prototype.onUpgrade = function () {
                    this._proxy.c2s_set_guild_member_job(this._info.role_id, 1 /* UP */);
                };
                UnionMemberPopupMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionMemberPopupMdr;
            }(game.EffectMdrBase));
            union.UnionMemberPopupMdr = UnionMemberPopupMdr;
            __reflect(UnionMemberPopupMdr.prototype, "game.mod.union.UnionMemberPopupMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var TouchEvent = egret.TouchEvent;
            /**改名弹窗 */
            var UnionRenameMdr = /** @class */ (function (_super) {
                __extends(UnionRenameMdr, _super);
                function UnionRenameMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionRenameView);
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionRenameMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                };
                UnionRenameMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onRename, this);
                };
                UnionRenameMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionRenameMdr.prototype.onUpdateView = function () {
                    this._view.editable_value.text = "";
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "guild_name_cost");
                    if (cfg) {
                        this._view.btn.setCost(cfg.value);
                        this._view.btn.label = "";
                    }
                    else {
                        this._view.btn.resetCost();
                        this._view.btn.label = "修改";
                    }
                };
                UnionRenameMdr.prototype.onRename = function () {
                    var name = this._view.editable_value.text;
                    if (name == "" || name.length == 0) {
                        game.PromptBox.getIns().show("修改名字不可为空");
                        return;
                    }
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "guild_name_cost");
                    if (!cfg) {
                        cfg.value;
                    }
                    this._proxy.c2s_change_guild_name(name);
                };
                UnionRenameMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionRenameMdr;
            }(game.MdrBase));
            union.UnionRenameMdr = UnionRenameMdr;
            __reflect(UnionRenameMdr.prototype, "game.mod.union.UnionRenameMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            /**设置仙尊 */
            var UnionSetHeroMdr = /** @class */ (function (_super) {
                __extends(UnionSetHeroMdr, _super);
                function UnionSetHeroMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionSetHeroView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionSetHeroMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionSetHeroItem;
                    this._view.list.dataProvider = this._listData;
                };
                UnionSetHeroMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    this.onNt("on_update_set_hero_list" /* ON_UPDATE_SET_HERO_LIST */, this.onUpdateView, this);
                    this.onNt("on_update_member_list" /* ON_UPDATE_MEMBER_LIST */, this.onUpdateView, this);
                };
                UnionSetHeroMdr.prototype.onShow = function () {
                    if (!this._proxy.model.member_list || !this._proxy.model.member_list.length) {
                        this._proxy.c2s_ask_guild_member();
                    }
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                UnionSetHeroMdr.prototype.onUpdateView = function () {
                    this._listData.source = this._proxy.getMemberList();
                };
                UnionSetHeroMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionSetHeroMdr;
            }(game.MdrBase));
            union.UnionSetHeroMdr = UnionSetHeroMdr;
            __reflect(UnionSetHeroMdr.prototype, "game.mod.union.UnionSetHeroMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionShopMainMdr = /** @class */ (function (_super) {
                __extends(UnionShopMainMdr, _super);
                function UnionShopMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzinmibaobiaoqiantubiao",
                            bg: "beijingtu_duihuan",
                            mdr: union.UnionXianZunShopMdr,
                            title: "union_title_1" /* union_title_1 */,
                            hintTypes: ["55" /* Union */, "01" /* UnionIn */, "10" /* UnionHeroShop */],
                        },
                    ];
                    return _this;
                }
                return UnionShopMainMdr;
            }(mod.WndBaseMdr));
            union.UnionShopMainMdr = UnionShopMainMdr;
            __reflect(UnionShopMainMdr.prototype, "game.mod.union.UnionShopMainMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            /**每日俸禄 */
            var UnionWageMdr = /** @class */ (function (_super) {
                __extends(UnionWageMdr, _super);
                function UnionWageMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", union.UnionWageView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                UnionWageMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = mod.Icon;
                    this._view.list.dataProvider = this._listData;
                };
                UnionWageMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_wage_btn_info" /* ON_UPDATE_WAGE_BTN_INFO */, this.onUpdateBtn, this);
                    this.onNt("on_update_union_info" /* ON_UPDATE_UNION_INFO */, this.onUpdateView, this);
                };
                UnionWageMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._proxy.model.info) {
                        this._proxy.c2s_ask_guild_info();
                    }
                    else {
                        this.onUpdateView();
                    }
                };
                UnionWageMdr.prototype.onUpdateView = function () {
                    var level = this._proxy.model.info.level;
                    var cfg = game.getConfigByNameId("guild_donate.json" /* GuildDonate */, level);
                    this._listData.source = cfg.daily_reward;
                    this.onUpdateBtn();
                };
                UnionWageMdr.prototype.onUpdateBtn = function () {
                    this._view.btn.visible = !this._proxy.model.is_get_reward;
                    this._view.img_get.visible = !this._view.btn.visible;
                };
                UnionWageMdr.prototype.onClick = function () {
                    this._proxy.c2s_guild_daily_reward();
                };
                UnionWageMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return UnionWageMdr;
            }(game.MdrBase));
            union.UnionWageMdr = UnionWageMdr;
            __reflect(UnionWageMdr.prototype, "game.mod.union.UnionWageMdr");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var UnionXianZunShopMdr = /** @class */ (function (_super) {
                __extends(UnionXianZunShopMdr, _super);
                function UnionXianZunShopMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", union.UnionXianZunShopView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                UnionXianZunShopMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(217 /* Union */);
                    this._view.list.itemRenderer = union.UnionShopItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.img_banner.source = game.ResUtil.getUiJpg("guanggaotu_xianzunmibao");
                };
                UnionXianZunShopMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onExplain, this);
                    this.onNt("on_update_hero_shop_info" /* ON_UPDATE_HERO_SHOP_INFO */, this.onUpdateList, this);
                };
                UnionXianZunShopMdr.prototype.onShow = function () {
                    this._proxy.c2s_guild_mibao_ui();
                    _super.prototype.onShow.call(this);
                    this.onUpdateHero();
                    this.onUpdateTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                UnionXianZunShopMdr.prototype.onUpdateHero = function () {
                    var hero = this._proxy.model.hero;
                    this._view.head.updateHeadShow(hero.head, hero.head_frame, hero.sex);
                    this._view.lab_name.text = "" + hero.name;
                };
                UnionXianZunShopMdr.prototype.onUpdateList = function () {
                    var list = this._proxy.getHeroList();
                    this._listData.source = list;
                };
                UnionXianZunShopMdr.prototype.onExplain = function () {
                    //todo id要改
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("zhanlizhuanpantips1" /* zhanlizhuanpantips1 */));
                };
                UnionXianZunShopMdr.prototype.update = function (time) {
                    this.onUpdateTime();
                };
                UnionXianZunShopMdr.prototype.onUpdateTime = function () {
                    var endTime = game.TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    var timeStr = game.TimeUtil.formatSecond(leftTime, "d天H时", true);
                    this._view.lb_time.text = timeStr;
                };
                UnionXianZunShopMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                return UnionXianZunShopMdr;
            }(game.MdrBase));
            union.UnionXianZunShopMdr = UnionXianZunShopMdr;
            __reflect(UnionXianZunShopMdr.prototype, "game.mod.union.UnionXianZunShopMdr", ["base.UpdateItem"]);
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionModel = /** @class */ (function () {
                function UnionModel() {
                    var _a, _b;
                    /**展示欢迎弹窗 */
                    this.show_welcome = false;
                    /**当前宗门id */
                    this.id = 0;
                    /**当前宗门名称 */
                    this.name = "";
                    /**当前宗门职位id: 1.宗主2.副宗主3.精英4.成员 0退出*/
                    this.guild_job = 0;
                    /**退出宗门冷却时间 */
                    this.quit_cd = 0;
                    /**创建宗门冷却时间 */
                    this.create_cd = 0;
                    /**是否创建vip宗门 */
                    this.is_create = false;
                    /**我申请的宗门 */
                    this.apply_list = [];
                    /**当前可操作申请列表(用于判断红点 列表调协议获取) */
                    this.apply_record = [];
                    /**是否领取每日奖励 */
                    this.is_get_reward = false;
                    /**创建宗门名字 有值则不自动发请求获取随机名字 */
                    this.random_name = "";
                    /**宗门数据 */
                    this.info = null;
                    /**宗主数据 */
                    this.header = null;
                    /**宗门列表 */
                    this.guild_list = [];
                    /**成员列表 */
                    this.member_list = [];
                    /**申请列表 */
                    this.apply_info = [];
                    /**创建宗门页面状态获取创建类型 */
                    this.getCreateTypeByStatus = (_a = {},
                        _a["common" /* COMMON */] = 1 /* COMMON */,
                        _a["vip" /* VIP */] = 2 /* VIP */,
                        _a);
                    /**仙宗功能模块 */
                    this.open_fun = "";
                    //----------------仙尊--------------------
                    /**仙尊数据 */
                    this.hero = null;
                    /**仙尊秘宝列表id */
                    this.hero_list = [];
                    //----------------仙尊--------------------
                    //-----------福利大厅-----------------
                    /**福利大厅发奖励最多 */
                    this.mvp = null;
                    /**福利大厅奖励 */
                    this.charge_list = [];
                    /**mvp发奖励次数 */
                    this.mvp_count = 0;
                    /**福利大厅红点路径 */
                    this.welfare_root = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "07" /* UnionWelfare */];
                    /**天坛抽奖数据 列表次数为已抽 */
                    this.info_tian = null;
                    // /**天坛抽奖抽中的idx */
                    // public list_tian: number[] = [];
                    /**圣坛数据 */
                    this.shengtan_info = null;
                    /**圣坛大奖 */
                    this.list_sheng = [];
                    /**圣坛走马灯信息 */
                    this.list_sheng_run = [];
                    /**圣坛更多大奖列表 */
                    this.list_sheng_reward = [];
                    /**天坛圣坛红点路径 */
                    this.lottery_root = ["55" /* Union */, "01" /* UnionIn */, "01" /* TabBtnType01 */, "09" /* UnionLottery */];
                    this.getTipsByType = (_b = {},
                        _b[1 /* Type1 */] = "xianzong_tips2" /* xianzong_tips2 */,
                        _b[2 /* Type2 */] = "xianzong_tips3" /* xianzong_tips3 */,
                        _b[3 /* Type3 */] = "xianzong_tips4" /* xianzong_tips4 */,
                        _b[4 /* Type4 */] = "xianzong_tips5" /* xianzong_tips5 */,
                        _b);
                    this.equip_map = new Map();
                    this.item_list = [];
                    this.list_len = 0;
                    /**仓库宝箱积分 */
                    this.guild_score = 0;
                    this.auction_list = [];
                    this.store_list = [];
                    this.store_count = 0;
                    this.book_list = [];
                    this.book_cost_idxs = [];
                    this.beast_stage = 0;
                    this.total_exp = 0;
                    this.week_rewards = [];
                    //--------------------三期-仓库-书斋-仙兽-------------------
                }
                return UnionModel;
            }());
            union.UnionModel = UnionModel;
            __reflect(UnionModel.prototype, "game.mod.union.UnionModel");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var union;
        (function (union) {
            var UnionRecycleView = /** @class */ (function (_super) {
                __extends(UnionRecycleView, _super);
                function UnionRecycleView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.union.UnionRecycleSkin";
                    return _this;
                }
                return UnionRecycleView;
            }(eui.Component));
            union.UnionRecycleView = UnionRecycleView;
            __reflect(UnionRecycleView.prototype, "game.mod.union.UnionRecycleView");
        })(union = mod.union || (mod.union = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=union.js.map