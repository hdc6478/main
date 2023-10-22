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
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsBattleRender = /** @class */ (function (_super) {
                __extends(RoleTipsBattleRender, _super);
                function RoleTipsBattleRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RoleTipsBattleRender.prototype.dataChanged = function () {
                    if (!this.data || !this.data.cur_ride) {
                        this.icon.defaultIcon();
                        this.icon.setImgLock();
                        this.lab_desc.text = "";
                        this.grp_star.visible = false;
                        return;
                    }
                    var index = this.data.cur_ride;
                    this.icon.setData(index, 3 /* NotTips */);
                    this.icon.setImgGray("");
                    var headType = this.data.head_type;
                    var descStr = game.getLanById(game.ConfigHeadToName[headType]);
                    var stage = mod.SurfaceUtil.calcSurfaceStage(this.data.level, headType);
                    if (stage) {
                        descStr += " " + stage + game.getLanById("tishi_43" /* tishi_43 */);
                    }
                    this.lab_desc.text = descStr;
                    this.grp_star.visible = true;
                    var star = 0;
                    for (var _i = 0, _a = this.data.ride_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.index == index) {
                            star = info.star;
                            break;
                        }
                    }
                    this.lab_star.text = star + "";
                };
                return RoleTipsBattleRender;
            }(eui.ItemRenderer));
            chat.RoleTipsBattleRender = RoleTipsBattleRender;
            __reflect(RoleTipsBattleRender.prototype, "game.mod.chat.RoleTipsBattleRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatMod = /** @class */ (function (_super) {
                __extends(ChatMod, _super);
                function ChatMod() {
                    return _super.call(this, "25" /* Chat */) || this;
                }
                ChatMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                ChatMod.prototype.initModel = function () {
                    this.regProxy(35 /* Chat */, chat.ChatProxy);
                };
                ChatMod.prototype.initView = function () {
                    this.regMdr("01" /* ChatMain */, chat.ChatMainMdr);
                    this.regMdr("02" /* Emoticon */, chat.EmoticonMdr);
                    this.regMdr("03" /* ChatSetting */, chat.ChatSettingMdr);
                    this.regMdr("04" /* ChatCheck */, chat.ChatCheckMdr);
                    this.regMdr("05" /* ChatCompete */, chat.ChatCompeteMdr);
                    this.regMdr("06" /* RoleTipsMain */, chat.RoleTipsMainMdr);
                    this.regMdr("07" /* RoleSurfaceTips */, chat.RoleSurfaceTipsMdr);
                };
                return ChatMod;
            }(game.ModBase));
            chat.ChatMod = ChatMod;
            __reflect(ChatMod.prototype, "game.mod.chat.ChatMod");
            gso.modCls.push(ChatMod);
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var c2s_chat = msg.c2s_chat;
            var s2c_chat = msg.s2c_chat;
            var TimeMgr = base.TimeMgr;
            var c2s_chat_open_setting = msg.c2s_chat_open_setting;
            var c2s_chat_setting = msg.c2s_chat_setting;
            var c2s_chat_add_blackuser = msg.c2s_chat_add_blackuser;
            var s2c_chat_open_setting = msg.s2c_chat_open_setting;
            var s2c_click_hyperlink = msg.s2c_click_hyperlink;
            var c2s_click_hyperlink = msg.c2s_click_hyperlink;
            var c2s_chat_del_blackuser = msg.c2s_chat_del_blackuser;
            var s2c_chat_open_blacklist = msg.s2c_chat_open_blacklist;
            var c2s_chat_look_user = msg.c2s_chat_look_user;
            var s2c_chat_showpower_check_info = msg.s2c_chat_showpower_check_info;
            var s2c_chat_look_user = msg.s2c_chat_look_user;
            var Handler = base.Handler;
            var teammate = msg.teammate;
            var c2s_chat_open_blacklist = msg.c2s_chat_open_blacklist;
            var c2s_private_chat = msg.c2s_private_chat;
            var c2s_get_private_chat = msg.c2s_get_private_chat;
            var s2c_private_chat = msg.s2c_private_chat;
            var c2s_read_private_chat = msg.c2s_read_private_chat;
            var s2c_private_chat_update = msg.s2c_private_chat_update;
            var c2s_private_chat_role_online_status = msg.c2s_private_chat_role_online_status;
            var s2c_private_chat_role_online_status = msg.s2c_private_chat_role_online_status;
            var facade = base.facade;
            var c2s_guild_chat_tips_text = msg.c2s_guild_chat_tips_text;
            var s2c_guild_chat_tips_text = msg.s2c_guild_chat_tips_text;
            var ChatProxy = /** @class */ (function (_super) {
                __extends(ChatProxy, _super);
                function ChatProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatProxy.prototype.initialize = function () {
                    this._model = new chat.ChatModel();
                    this.onProto(s2c_chat, this.s2c_chat, this);
                    this.onProto(s2c_click_hyperlink, this.s2c_click_hyperlink, this);
                    this.onProto(s2c_chat_open_setting, this.s2c_chat_open_setting, this);
                    this.onProto(s2c_chat_open_blacklist, this.s2c_chat_open_blacklist, this);
                    this.onProto(s2c_chat_showpower_check_info, this.s2c_chat_showpower_check_info, this);
                    this.onProto(s2c_chat_look_user, this.s2c_chat_look_user, this);
                    this.onProto(s2c_private_chat, this.s2c_private_chat, this);
                    this.onProto(s2c_private_chat_update, this.s2c_private_chat_update, this);
                    this.onProto(s2c_private_chat_role_online_status, this.s2c_private_chat_role_online_status, this);
                    this.onProto(s2c_guild_chat_tips_text, this.s2c_guild_chat_tips_text, this);
                };
                ChatProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._model.clearData();
                };
                ChatProxy.prototype.c2s_chat = function (chatChannel, content, idx) {
                    var msg = new c2s_chat();
                    msg.channel_type = chatChannel;
                    msg.content = content;
                    msg.quick_speak_idx = idx;
                    this.sendProto(msg);
                };
                ChatProxy.prototype.s2c_chat = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.info) {
                        return;
                    }
                    var isInit = !this._model.chatMap; //初始化
                    for (var _i = 0, _a = msg.info; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (!i.content) {
                            continue;
                        }
                        this.onFormat(i, isInit);
                    }
                    // if(isInit){
                    //     this.sendNt(ChatEvent.ON_CHAT_INIT);
                    // }
                    this.sendNt("on_chat_update" /* ON_CHAT_UPDATE */);
                };
                /**
                 * 处理返回的聊天信息
                 */
                ChatProxy.prototype.onFormat = function (tNum, isInit) {
                    var temp = {};
                    if (!tNum || !tNum.channel_type) {
                        return;
                    }
                    var senderInfo = tNum.sender;
                    temp.senderInfo = senderInfo;
                    temp.chatChannel = tNum.channel_type;
                    var isFace = this.checkIsFace(tNum.content);
                    if (!isInit) {
                        //更新下发
                        //记录发送CD
                        if (senderInfo && senderInfo.role_id && senderInfo.role_id.eq(game.RoleVo.ins.role_id)) {
                            if (isFace) {
                                this._model.chatEmojiCD[tNum.channel_type] = TimeMgr.time.serverTimeSecond;
                            }
                            else {
                                this._model.chatCD[tNum.channel_type] = TimeMgr.time.serverTimeSecond;
                            }
                            this.sendNt("on_send_success" /* ON_SEND_SUCCESS */);
                        }
                    }
                    this.setChatContent(temp, isFace, tNum.content);
                    //聊天界面数据
                    this.setChatInfoData(temp);
                    if (temp.chatChannel == 6 /* System */) {
                        //系统聊天另外走系统公告
                        this._model.systemList.push(temp.contentSystem);
                        if (this._model.systemList.length > game.CHAT_LIMIT) {
                            this._model.systemList.shift();
                        }
                    }
                    else {
                        //if(!isInit){
                        //主界面聊天信息
                        this.setMainChatList(temp);
                        //}
                    }
                };
                //判断是否是表情
                ChatProxy.prototype.checkIsFace = function (content) {
                    return content.indexOf("#f(") > -1;
                };
                //判断是否存在表情
                ChatProxy.prototype.checkFaceUrl = function (str) {
                    if (str.indexOf("1_") != -1) {
                        if (Number(str.replace("1_", "")) <= game.FACE_NUM) {
                            return true;
                        }
                    }
                    else {
                        if (Number(str.replace("2_", "")) <= game.VIP_FACE_NUM) {
                            return true;
                        }
                    }
                    return false;
                };
                ChatProxy.prototype.getPropName = function (idx, event) {
                    var propCfg = game.getConfigById(idx);
                    if (!propCfg) {
                        return "";
                    }
                    var name = propCfg.name;
                    if (!event) {
                        //不添加超链接事件
                        return game.TextUtil.addColor(name, game.ColorUtil.getColorByQuality2(propCfg.quality));
                    }
                    return game.TextUtil.addLinkHtmlTxt(name, game.ColorUtil.getColorByQuality1(propCfg.quality), event);
                };
                //数据转化
                ChatProxy.prototype.setChatContent = function (temp, isFace, content) {
                    if (isFace) {
                        //表情
                        var _imgUrl = content.replace("#f(", "").replace(")", "");
                        if (this.checkFaceUrl(_imgUrl)) {
                            temp.imgSource = game.ResUtil.getUiFace(_imgUrl);
                            temp.type = 1 /* Face */;
                        }
                        else {
                            temp.content = game.StringUtil.replaceColorCode(content, true);
                            temp.type = 3 /* Normal */;
                        }
                        return; //直接返回
                    }
                    var chatChannel = temp.chatChannel;
                    if (chatChannel == 3 /* Private */) {
                        //私聊不转换超链接
                        temp.content = content;
                        return; //直接返回
                    }
                    var isSystem = chatChannel == 6 /* System */; //是否系统公告
                    this.decodeContent(temp, content, isSystem);
                };
                //解析聊天文本
                ChatProxy.prototype.decodeContent = function (temp, content, isSystem) {
                    var eventIdx = 1;
                    var eventData = {};
                    var mainTxt = content; //聊天信息文本
                    var contentSystem = content; //主界面系统公共文本，不做超链接点击
                    //超链接
                    var linkArr = mainTxt.match(/#s\(.*?\)/g);
                    if (linkArr) {
                        for (var i = 0, l = linkArr.length; i < l; ++i) {
                            var event = eventIdx.toString();
                            var arr = linkArr[i].replace("#s(", "")
                                .replace(")", "").split(",");
                            eventData[event] = [arr, 2 /* Link */];
                            mainTxt = mainTxt.replace(linkArr[i], game.TextUtil.addLinkHtmlTxt(arr[3], null, event));
                            if (isSystem) {
                                contentSystem = contentSystem.replace(linkArr[i], arr[3]); //不做超链接点击
                            }
                            eventIdx++;
                        }
                    }
                    //道具展示链接
                    linkArr = mainTxt.match(/#prop\(.*?\)/g);
                    if (linkArr) {
                        for (var i = 0, l = linkArr.length; i < l; ++i) {
                            var event = eventIdx.toString();
                            var arr = linkArr[i].replace("#prop(", "")
                                .replace(")", "").split(",");
                            eventData[event] = [[arr[0]], 4 /* Show */]; //存道具ID就行了
                            mainTxt = mainTxt.replace(linkArr[i], this.getPropName(Number(arr[0]), event));
                            if (isSystem) {
                                contentSystem = contentSystem.replace(linkArr[i], this.getPropName(Number(arr[0]))); //不做超链接点击
                            }
                            eventIdx++;
                        }
                    }
                    //跳转链接
                    linkArr = mainTxt.match(/#jump\(.*?\)/g);
                    if (linkArr) {
                        for (var i = 0, l = linkArr.length; i < l; ++i) {
                            var event = eventIdx.toString();
                            var arr = linkArr[i].replace("#jump(", "")
                                .replace(")", "").split(",");
                            eventData[event] = [[arr[0]], 5 /* Jump */]; //存跳转ID就行了
                            mainTxt = mainTxt.replace(linkArr[i], game.TextUtil.addLinkHtmlTxt(arr[1], null, event));
                            if (isSystem) {
                                contentSystem = contentSystem.replace(linkArr[i], arr[1]); //不做超链接点击
                            }
                            eventIdx++;
                        }
                    }
                    temp.eventData = eventData;
                    temp.content = mainTxt;
                    if (isSystem) {
                        temp.contentSystem = contentSystem;
                    }
                };
                //保存聊天信息
                ChatProxy.prototype.setChatInfoData = function (info) {
                    if (!info) {
                        return;
                    }
                    if (!this._model.chatMap) {
                        this._model.chatMap = {};
                    }
                    if (!this._model.chatMap[info.chatChannel]) {
                        this._model.chatMap[info.chatChannel] = [];
                    }
                    this._model.chatMap[info.chatChannel].push(info);
                    if (this._model.chatMap[info.chatChannel].length > game.CHAT_LIMIT) {
                        this._model.chatMap[info.chatChannel].shift();
                    }
                };
                Object.defineProperty(ChatProxy.prototype, "openChat", {
                    get: function () {
                        return this._model.openChat;
                    },
                    //打开聊天按钮
                    set: function (open) {
                        this._model.openChat = open;
                    },
                    enumerable: true,
                    configurable: true
                });
                //保存信息到主界面显示
                ChatProxy.prototype.setMainChatList = function (info) {
                    this._model.mainChatList.push(info);
                    if (this._model.mainChatList.length > game.MAIN_CHAT_LIMIT) {
                        this._model.mainChatList.shift();
                    }
                };
                Object.defineProperty(ChatProxy.prototype, "mainChatList", {
                    //主界面聊天信息显示
                    get: function () {
                        return this._model.mainChatList;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChatProxy.prototype, "systemList", {
                    //主界面公告显示，外部表现后会删除对应的数据
                    get: function () {
                        return this._model.systemList;
                    },
                    enumerable: true,
                    configurable: true
                });
                ChatProxy.prototype.getChatInfoByChannel = function (chatChannel) {
                    if (!this._model.chatMap) {
                        return [];
                    }
                    if (!this._model.chatMap[chatChannel]) {
                        this._model.chatMap[chatChannel] = [];
                    }
                    var datas = this._model.chatMap[chatChannel];
                    if (chatChannel == 6 /* System */) {
                        return datas; //系统公吿不用过滤信息
                    }
                    var tmps = [];
                    var isHideLevel = this.isSettingSelected(1 /* Lv */);
                    var isHideVIP = this.isSettingSelected(2 /* Vip */);
                    var isHideStranger = this.isSettingSelected(3 /* Stranger */);
                    var roleVo = game.RoleVo.ins;
                    var guildId = mod.RoleUtil.getGuildId();
                    var teamId = mod.RoleUtil.getTeamId();
                    var friendProxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        var info = datas_1[_i];
                        var senderRoleId = info.senderInfo.role_id;
                        var isSelf = senderRoleId && senderRoleId.eq(roleVo.role_id); //自己信息不用过滤
                        if (!isSelf) {
                            if (isHideLevel) {
                                //屏蔽200级以下发言
                                if (!info.senderInfo.level || info.senderInfo.level < game.CHAT_LIMIT_LEVEL) {
                                    continue;
                                }
                            }
                            if (isHideVIP) {
                                //屏蔽VIP2以下发言
                                if (!info.senderInfo.vip || info.senderInfo.vip < game.CHAT_LIMIT_VIP) {
                                    continue;
                                }
                            }
                            if (isHideStranger) {
                                //屏蔽陌生人发言，陌生人规则：非玩家自身好友，非宗门，非战队的玩家
                                var senderGuildId = info.senderInfo.guild_id;
                                var senderTeamId = info.senderInfo.team_id;
                                if (!friendProxy.isFriend(senderRoleId)
                                    && !(senderGuildId && senderGuildId == guildId)
                                    && !(senderTeamId && !senderTeamId.isZero() && teamId && teamId.eq(senderTeamId))) {
                                    continue;
                                }
                            }
                            if (this.isBlackUser(info.senderInfo.role_id)) {
                                //屏蔽黑名单发言
                                continue;
                            }
                        }
                        tmps.push(info);
                    }
                    return tmps;
                };
                ChatProxy.prototype.getChatCD = function (chatChannel, roleId) {
                    if (roleId) {
                        var roleKey = roleId.toString();
                        return this._model.chatPrivateCD[roleKey] || 0;
                    }
                    return this._model.chatCD[chatChannel] || 0;
                };
                //配置上的cd时间（从ChatMdr复制过来）
                ChatProxy.prototype.getCfgCD = function (chatChannel, roleId) {
                    var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, chatChannel);
                    var cfgCd = 0;
                    var lv = game.RoleVo.ins.level;
                    if (cfg && cfg.CD) {
                        var i = 0;
                        for (var len = cfg.CD.length; i < len; i++) {
                            if (lv < cfg.CD[i][0]) {
                                break;
                            }
                        }
                        cfgCd = cfg.CD[(i > 0 ? i - 1 : 0)][1]; //取配置的CD
                    }
                    return cfgCd;
                };
                ChatProxy.prototype.getChatEmojiCD = function (chatChannel, roleId) {
                    if (roleId) {
                        var roleKey = roleId.toString();
                        return this._model.chatPrivateEmojiCD[roleKey] || 0;
                    }
                    return this._model.chatEmojiCD[chatChannel] || 0;
                };
                Object.defineProperty(ChatProxy.prototype, "chatChannel", {
                    get: function () {
                        return this._model.chatChannel;
                    },
                    set: function (type) {
                        this._model.chatChannel = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 点击链接触发
                 * @param {game.mod.chat.ChatInfoListData} info 聊天数据
                 * @param {string} event 链接绑定的事件
                 */
                ChatProxy.prototype.onClickChatLink = function (info, event) {
                    var data = info.eventData[event];
                    switch (data[1]) {
                        case 5 /* Jump */:
                            var jumpId = Number(data[0][0]);
                            mod.ViewMgr.getIns().showViewByID(jumpId);
                            break;
                        case 4 /* Show */:
                            var index = Number(data[0][0]);
                            mod.ViewMgr.getIns().showPropTips(index);
                            break;
                        case 2 /* Link */:
                            var arr = data[0];
                            var idx = Number(arr[0]); //超链接index
                            var linkId = Long.fromString(arr[1]); //超链接id
                            var channelId = Number(arr[2]); // 聊天频道
                            var str = arr[4]; // 字符串参数,后端使用  例如："1-2-3"  分隔符 "-"
                            var serverId = info.senderInfo && info.senderInfo.server_id; //可能不存在
                            this.click_link_c2s(idx, channelId, linkId, str, serverId, null);
                            break;
                    }
                };
                ChatProxy.prototype.click_link_c2s = function (linkIdx, channelID, linkID, str, severID, propIdx) {
                    var msg = new c2s_click_hyperlink();
                    msg.link_index = linkIdx;
                    msg.str_agrs = str;
                    msg.channel = channelID;
                    msg.link_id = linkID;
                    msg.prop_index = propIdx;
                    msg.server_id = severID;
                    this.sendProto(msg);
                };
                /** 点击超链接返回的跳转 */
                ChatProxy.prototype.s2c_click_hyperlink = function (n) {
                    var msg = n.body;
                    if (msg.jump_id) {
                        mod.ViewMgr.getIns().showViewByID(msg.jump_id);
                    }
                };
                /**------------------------聊天设置-----------------------------*/
                ChatProxy.prototype.c2s_chat_open_setting = function () {
                    if (this._model.infos && this._model.infos.length) {
                        return; //不重复请求
                    }
                    var msg = new c2s_chat_open_setting();
                    this.sendProto(msg);
                };
                ChatProxy.prototype.c2s_chat_setting = function (type) {
                    var msg = new c2s_chat_setting();
                    msg.set_type = type;
                    this.sendProto(msg);
                };
                ChatProxy.prototype.s2c_chat_open_setting = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.settings) {
                        return;
                    }
                    if (!this._model.infos || !this._model.infos.length) {
                        this._model.infos = msg.settings;
                    }
                    else {
                        for (var _i = 0, _a = msg.settings; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (msg.type == 2 /* Update */) {
                                var str = info.val ? "chat_cue2" /* chat_cue2 */ : "chat_cue1" /* chat_cue1 */;
                                game.PromptBox.getIns().show(game.getLanById(str));
                            }
                            var pos = this.getInfoPos(info.set_type);
                            if (pos >= 0) {
                                this._model.infos[pos] = info;
                            }
                            else {
                                this._model.infos.push(info);
                            }
                        }
                    }
                    this.sendNt("on_chat_setting_update" /* ON_CHAT_SETTING_UPDATE */);
                };
                ChatProxy.prototype.getInfoPos = function (type) {
                    if (!this._model.infos || !this._model.infos.length) {
                        return -1;
                    }
                    var len = this._model.infos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.infos[i];
                        if (info.set_type == type) {
                            return i;
                        }
                    }
                    return -1;
                };
                ChatProxy.prototype.isSettingSelected = function (type) {
                    var pos = this.getInfoPos(type);
                    if (pos < 0) {
                        return false;
                    }
                    var info = this._model.infos[pos];
                    return info && !!info.val;
                };
                Object.defineProperty(ChatProxy.prototype, "settingTime", {
                    get: function () {
                        return this._model.settingTime;
                    },
                    set: function (time) {
                        this._model.settingTime = time;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**------------------------黑名单-----------------------------*/
                ChatProxy.prototype.c2s_chat_add_blackuser = function (serverId, roleId, isRobot) {
                    var msg = new c2s_chat_add_blackuser();
                    msg.server_id = serverId;
                    msg.role_id = roleId;
                    msg.is_robot = isRobot;
                    this.sendProto(msg);
                };
                ChatProxy.prototype.c2s_chat_del_blackuser = function (roleId) {
                    var msg = new c2s_chat_del_blackuser();
                    msg.role_id = roleId;
                    this.sendProto(msg);
                };
                ChatProxy.prototype.c2s_chat_open_blacklist = function () {
                    if (this._model.blackFlag) {
                        return;
                    }
                    this._model.blackFlag = true;
                    var msg = new c2s_chat_open_blacklist();
                    this.sendProto(msg);
                };
                ChatProxy.prototype.s2c_chat_open_blacklist = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.blackusers) {
                        return;
                    }
                    if (msg.type == 1 /* Open */) {
                        //打开界面
                        this._model.blackInfos = msg.blackusers;
                    }
                    else {
                        for (var _i = 0, _a = msg.blackusers; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (msg.type == 3 /* Delete */) {
                                //删除黑名单
                                var pos = this.getBlackInfoPos(info.role_id);
                                if (pos >= 0) {
                                    this._model.blackInfos.splice(pos, 1); //删除
                                }
                            }
                            else {
                                //添加黑名单
                                this.deletePrivateInfo(info.role_id, 2 /* Black */); //添加黑名单时，清除私聊列表
                                this._model.blackInfos.push(info);
                            }
                        }
                    }
                    this.sendNt("on_chat_black_update" /* ON_CHAT_BLACK_UPDATE */);
                };
                Object.defineProperty(ChatProxy.prototype, "blackInfos", {
                    get: function () {
                        return this._model.blackInfos || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                ChatProxy.prototype.getBlackInfoPos = function (roleId) {
                    if (!this._model.blackInfos || !this._model.blackInfos.length) {
                        return -1;
                    }
                    var len = this._model.blackInfos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.blackInfos[i];
                        if (info.role_id.eq(roleId)) {
                            return i;
                        }
                    }
                    return -1;
                };
                ChatProxy.prototype.isBlackUser = function (roleId) {
                    var pos = this.getBlackInfoPos(roleId);
                    return pos >= 0;
                };
                ChatProxy.prototype.onClickBlack = function (serverId, roleId, isRobot) {
                    var _this = this;
                    if (this.isBlackUser(roleId)) {
                        //黑名单玩家，取消拉黑
                        this.c2s_chat_del_blackuser(roleId);
                    }
                    else {
                        //拉黑
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("chat_tips2" /* chat_tips2 */), Handler.alloc(this, function () {
                            _this.c2s_chat_add_blackuser(serverId, roleId, isRobot);
                        }));
                    }
                };
                /**------------------------战力比拼，查看玩家信息-----------------------------*/
                ChatProxy.prototype.c2s_chat_look_user = function (serverId, roleId, isRobot, type) {
                    var msg = new c2s_chat_look_user();
                    msg.role_id = roleId;
                    msg.server_id = serverId;
                    msg.is_robot = isRobot;
                    msg.request_type = type;
                    this.sendProto(msg);
                };
                ChatProxy.prototype.s2c_chat_showpower_check_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.info) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("25" /* Chat */, "05" /* ChatCompete */, msg);
                };
                ChatProxy.prototype.s2c_chat_look_user = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.is_success) {
                        return;
                    }
                    this._model.lockInfo = msg;
                    mod.ViewMgr.getIns().showSecondPop("25" /* Chat */, "06" /* RoleTipsMain */);
                };
                Object.defineProperty(ChatProxy.prototype, "lookInfo", {
                    get: function () {
                        return this._model.lockInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**------------------------私聊-----------------------------*/
                ChatProxy.prototype.c2s_private_chat = function (serverId, roleId, content) {
                    var msg = new c2s_private_chat();
                    msg.server_id = serverId;
                    msg.target_role_id = roleId;
                    msg.content = content;
                    this.sendProto(msg);
                };
                // 请求对方聊天信息，不能根据是否存在聊天信息去请求，应该由服务端返回的role_ids判断
                ChatProxy.prototype.c2s_get_private_chat = function (serverId, roleId) {
                    if (this.hasReqPrivate(roleId)) {
                        //只请求一次
                        return;
                    }
                    var msg = new c2s_get_private_chat();
                    msg.server_id = serverId;
                    msg.target_role_id = roleId;
                    this.sendProto(msg);
                };
                // 已读对方聊天信息
                ChatProxy.prototype.c2s_read_private_chat = function (serverId, roleId) {
                    if (!this.isNotReadPrivate(roleId)) {
                        //不在未读列表则不请求
                        return;
                    }
                    var msg = new c2s_read_private_chat();
                    msg.server_id = serverId;
                    msg.target_role_id = roleId;
                    this.sendProto(msg);
                    this.setNotReadPrivate(roleId, true);
                };
                ChatProxy.prototype.s2c_private_chat = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.target_role_id) {
                        // 自身请求过的玩家私聊
                        var roleId = msg.target_role_id;
                        this.clearChatPrivateInfoData(roleId); //返回聊天记录时候，清除聊天缓存
                        if (!this.hasReqPrivate(roleId)) {
                            var roleKey = roleId.toString();
                            this._model.reqPrivateList.push(roleKey);
                        }
                    }
                    if (msg.infos) {
                        //私聊记录处理
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (!i.content) {
                                continue;
                            }
                            this.onFormatPrivate(msg.target_role_id, i, true);
                        }
                        this.sendNt("on_chat_private_update" /* ON_CHAT_PRIVATE_UPDATE */);
                    }
                };
                ChatProxy.prototype.s2c_private_chat_update = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.all_infos) {
                        return;
                    }
                    for (var _i = 0, _a = msg.all_infos; _i < _a.length; _i++) {
                        var updateInfo = _a[_i];
                        //updateInfo对应一个私聊玩家
                        //如果该玩家不在私聊列表里面，则加进私聊列表
                        var info = updateInfo.target_role;
                        var privateInfo = {
                            head: info.head,
                            headFrame: info.head_frame,
                            isOnline: info.is_online,
                            name: info.name,
                            roleId: info.role_id,
                            serverId: info.server_id,
                            sex: info.sex,
                            vipIndex: info.vip
                        };
                        this.updatePrivateInfo(privateInfo);
                        if (!updateInfo.infos) {
                            continue;
                        }
                        var isNotRead = false; //是否未读
                        //服务端更新下发私聊信息，统一做数据更新
                        for (var _b = 0, _c = updateInfo.infos; _b < _c.length; _b++) {
                            var i = _c[_b];
                            if (!i.content) {
                                continue;
                            }
                            this.onFormatPrivate(info.role_id, i, false);
                            //私聊消息提示
                            //收到对方的私聊信息，将对方设置为未读对象
                            if (!isNotRead && info.role_id.neq(game.RoleVo.ins.role_id)) {
                                isNotRead = true;
                                this.setNotReadPrivate(info.role_id);
                            }
                        }
                    }
                    this.sendNt("on_chat_private_update" /* ON_CHAT_PRIVATE_UPDATE */);
                };
                /**
                 * 处理返回的私聊信息
                 */
                ChatProxy.prototype.onFormatPrivate = function (roleId, info, isInit) {
                    var temp = {};
                    var senderInfo = info.sender;
                    temp.senderInfo = senderInfo;
                    temp.chatChannel = 3 /* Private */;
                    var isFace = this.checkIsFace(info.content);
                    if (!isInit) {
                        //更新下发
                        //记录发送CD
                        if (senderInfo && senderInfo.role_id && senderInfo.role_id.eq(game.RoleVo.ins.role_id)) {
                            var roleKey = roleId.toString();
                            if (isFace) {
                                this._model.chatPrivateEmojiCD[roleKey] = TimeMgr.time.serverTimeSecond;
                            }
                            else {
                                this._model.chatPrivateCD[roleKey] = TimeMgr.time.serverTimeSecond;
                            }
                            this.sendNt("on_send_success" /* ON_SEND_SUCCESS */);
                        }
                    }
                    this.setChatContent(temp, isFace, info.content);
                    //聊天界面数据
                    this.setChatPrivateInfoData(roleId, temp);
                    if (!isInit) {
                        this.setMainChatList(temp); //主界面聊天信息
                    }
                };
                ChatProxy.prototype.setChatPrivateInfoData = function (roleId, info) {
                    if (!this._model.chatPrivateMap) {
                        this._model.chatPrivateMap = {};
                    }
                    var roleKey = roleId.toString();
                    if (!this._model.chatPrivateMap[roleKey]) {
                        this._model.chatPrivateMap[roleKey] = [];
                    }
                    this._model.chatPrivateMap[roleKey].push(info);
                    if (this._model.chatPrivateMap[roleKey].length > game.CHAT_PRIVATE_LIMIT) {
                        this._model.chatPrivateMap[roleKey].shift();
                    }
                };
                //清除玩家私聊信息缓存，返回聊天记录时候调用
                ChatProxy.prototype.clearChatPrivateInfoData = function (roleId) {
                    var infos = this.getChatPrivateInfos(roleId);
                    if (infos && infos.length) {
                        var roleKey = roleId.toString();
                        this._model.chatPrivateMap[roleKey] = [];
                    }
                };
                //是否已经请求过私聊信息
                ChatProxy.prototype.hasReqPrivate = function (roleId) {
                    var roleKey = roleId.toString();
                    return this._model.reqPrivateList.indexOf(roleKey) > -1;
                };
                //私聊信息
                ChatProxy.prototype.getChatPrivateInfos = function (roleId) {
                    if (!roleId || !this._model.chatPrivateMap) {
                        return [];
                    }
                    var roleKey = roleId.toString();
                    if (!this._model.chatPrivateMap[roleKey]) {
                        this._model.chatPrivateMap[roleKey] = [];
                    }
                    return this._model.chatPrivateMap[roleKey];
                };
                //私聊好友列表
                ChatProxy.prototype.getPrivateList = function () {
                    var info = mod.RoleUtil.getBanlvInfo();
                    if (info && info.role_id) {
                        //固定第一个是仙侣
                        var pos = this.getPrivatePos(info.role_id);
                        if (pos < 0) {
                            this.setPrivateInfo(info, 0);
                        }
                    }
                    return this._model.privateList;
                };
                //别人私聊你的时候，更新私聊列表
                ChatProxy.prototype.updatePrivateInfo = function (info, startPos) {
                    var pos = this.getPrivatePos(info.roleId);
                    if (pos < 0) {
                        if (startPos == undefined) {
                            this._model.privateList.push(info);
                        }
                        else {
                            this._model.privateList.splice(startPos, 0, info);
                        }
                        this.sendNt("on_chat_private_list_update" /* ON_CHAT_PRIVATE_LIST_UPDATE */); //添加时候刷新
                    }
                    else {
                        // let oldIsOnline = this._model.privateList[pos].isOnline;
                        this._model.privateList[pos] = info;
                        // if(oldIsOnline != info.isOnline){
                        //     this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_UPDATE);//在线状态变更刷新
                        // }
                        //在线状态变更时候不走这里，由客户端去请求对应的私聊列表玩家在线状态
                    }
                };
                ChatProxy.prototype.setPrivateInfo = function (info, startPos) {
                    if (info instanceof Long) {
                        var friendProxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                        info = friendProxy.getFriendInfo(info);
                    }
                    if (!info) {
                        return;
                    }
                    var vip = (info instanceof msg.teammate) ? info.vip : info.vip_lv;
                    var privateInfo = {
                        head: info.head,
                        headFrame: info.head_frame,
                        isOnline: info.is_online,
                        name: info.name,
                        roleId: info.role_id,
                        serverId: info.server_id,
                        sex: info.sex,
                        vipIndex: vip
                    };
                    if (startPos == undefined) {
                        var info_1 = mod.RoleUtil.getBanlvInfo();
                        startPos = info_1 && info_1.role_id ? 1 : 0; //有仙侣时，存储在第二位
                    }
                    this.updatePrivateInfo(privateInfo, startPos);
                    this.curPrivateInfo = privateInfo;
                };
                Object.defineProperty(ChatProxy.prototype, "curPrivateInfo", {
                    get: function () {
                        return this._model.curPrivateInfo;
                    },
                    set: function (info) {
                        this._model.curPrivateInfo = info;
                    },
                    enumerable: true,
                    configurable: true
                });
                //清除私聊列表
                //1、玩家手动关闭，仙侣不能手动关闭
                //2、添加黑名单，是仙侣的话不清除
                //3、删除好友，是仙侣的话不清除
                //4、解除仙侣时候
                ChatProxy.prototype.deletePrivateInfo = function (roleId, type) {
                    var pos = this.getPrivatePos(roleId);
                    if (pos < 0) {
                        return;
                    }
                    if (type == 2 /* Black */ || type == 3 /* DelFriend */) {
                        var info = mod.RoleUtil.getBanlvInfo();
                        if (info && info.role_id.eq(roleId)) {
                            return;
                        }
                    }
                    this._model.privateList.splice(pos, 1);
                    if (this.curPrivateInfo && this.curPrivateInfo.roleId.eq(roleId)) {
                        this.curPrivateInfo = null; //清除当前聊天玩家
                    }
                    this.sendNt("on_chat_private_list_update" /* ON_CHAT_PRIVATE_LIST_UPDATE */);
                };
                ChatProxy.prototype.getPrivatePos = function (roleId) {
                    for (var i = 0; i < this._model.privateList.length; ++i) {
                        var privateInfo = this._model.privateList[i];
                        if (privateInfo.roleId.eq(roleId)) {
                            return i;
                        }
                    }
                    return -1;
                };
                //将对方设置为已读或者未读对象，isDel：从未读列表中删除
                ChatProxy.prototype.setNotReadPrivate = function (roleId, isDel) {
                    var roleKey = roleId.toString();
                    var pos = this._model.notReadPrivateList.indexOf(roleKey);
                    if (pos < 0 && !isDel) {
                        this._model.notReadPrivateList.push(roleKey);
                        this.sendNt("on_chat_private_list_hint" /* ON_CHAT_PRIVATE_LIST_HINT */);
                    }
                    if (pos >= 0 && isDel) {
                        this._model.notReadPrivateList.splice(pos, 1);
                        this.sendNt("on_chat_private_list_hint" /* ON_CHAT_PRIVATE_LIST_HINT */);
                    }
                    //私聊提示
                    this.updatePrivateHint();
                };
                //是否未读私聊信息
                ChatProxy.prototype.isNotReadPrivate = function (roleId) {
                    var roleKey = roleId.toString();
                    return this._model.notReadPrivateList.indexOf(roleKey) > -1;
                };
                /**更新红点*/
                ChatProxy.prototype.updatePrivateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670231 /* ChatPrivate */)) {
                        return;
                    }
                    var hint = this._model.notReadPrivateList && !!this._model.notReadPrivateList.length; //存在未读消息时，提示红点
                    var hintType = ["25" /* Chat */, "01" /* ChatMain */ + "03" /* Private */];
                    mod.HintMgr.setHint(hint, hintType);
                };
                // 请求对方聊天信息，更新在线状态用
                ChatProxy.prototype.c2s_private_chat_role_online_status = function () {
                    var privateList = this.getPrivateList();
                    if (!privateList || !privateList.length) {
                        return;
                    }
                    var infos = [];
                    for (var _i = 0, privateList_1 = privateList; _i < privateList_1.length; _i++) {
                        var i = privateList_1[_i];
                        var info = new teammate();
                        info.role_id = i.roleId;
                        info.server_id = i.serverId;
                        infos.push(info);
                    }
                    var msg = new c2s_private_chat_role_online_status();
                    msg.infos = infos;
                    this.sendProto(msg);
                };
                // 请求对方聊天信息返回
                ChatProxy.prototype.s2c_private_chat_role_online_status = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.infos) {
                        return;
                    }
                    var privateList = this.getPrivateList();
                    var hasUpdate = false;
                    for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                        var i = _a[_i];
                        for (var _b = 0, privateList_2 = privateList; _b < privateList_2.length; _b++) {
                            var oldInfo = privateList_2[_b];
                            if (i.role_id.eq(oldInfo.roleId)) {
                                //更新当前玩家信息
                                if (i.is_online != oldInfo.isOnline) {
                                    oldInfo.isOnline = i.is_online;
                                    hasUpdate = true;
                                }
                                break;
                            }
                        }
                    }
                    if (hasUpdate) {
                        this.sendNt("on_chat_private_list_info" /* ON_CHAT_PRIVATE_LIST_INFO */);
                    }
                };
                /**------------------------私聊-----------------------------*/
                /**------------------------仙宗纪行-----------------------------*/
                ChatProxy.prototype.c2s_guild_chat_tips_text = function () {
                    if (this._model.reqUnion) {
                        return;
                    }
                    var msg = new c2s_guild_chat_tips_text();
                    this.sendProto(msg);
                    this._model.reqUnion = true;
                };
                ChatProxy.prototype.s2c_guild_chat_tips_text = function (n) {
                    var msg = n.body;
                    if (msg.oper == 1) {
                        //直接清空数据
                        this._model.unionList = [];
                    }
                    if (msg.list) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this.onFormatUnion(info);
                        }
                    }
                    this.sendNt("on_chat_union_update" /* ON_CHAT_UNION_UPDATE */);
                };
                /**
                 * 处理返回的仙宗行纪信息
                */
                ChatProxy.prototype.onFormatUnion = function (content) {
                    var temp = {};
                    this.decodeContent(temp, content);
                    this._model.unionList.push(temp);
                    if (this._model.unionList.length > game.CHAT_UNION_LIMIT) {
                        this._model.unionList.shift();
                    }
                };
                Object.defineProperty(ChatProxy.prototype, "unionList", {
                    get: function () {
                        return this._model.unionList;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChatProxy;
            }(game.ProxyBase));
            chat.ChatProxy = ChatProxy;
            __reflect(ChatProxy.prototype, "game.mod.chat.ChatProxy", ["game.mod.IChatProxy", "base.IProxy"]);
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatCheckView = /** @class */ (function (_super) {
                __extends(ChatCheckView, _super);
                function ChatCheckView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.ChatCheckSkin";
                    return _this;
                }
                return ChatCheckView;
            }(eui.Component));
            chat.ChatCheckView = ChatCheckView;
            __reflect(ChatCheckView.prototype, "game.mod.chat.ChatCheckView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatCompeteRender = /** @class */ (function (_super) {
                __extends(ChatCompeteRender, _super);
                function ChatCompeteRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatCompeteRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var headType = this.data.head_type;
                    var selfPower = this.data.self_showpower;
                    var rolePower = this.data.role_showpower;
                    this.lab_val1.text = game.StringUtil.getHurtNumStr(selfPower.toNumber());
                    this.lab_val2.text = game.StringUtil.getHurtNumStr(rolePower.toNumber());
                    var isWin = selfPower.gte(rolePower);
                    this.img_val1.source = isWin ? "jindutiaolvse" : "jindutiaohongse";
                    this.img_val2.source = !isWin ? "jindutiaolvse" : "jindutiaohongse";
                    this.img_val1.visible = selfPower.gt(Long.fromValue(0));
                    this.img_val2.visible = rolePower.gt(Long.fromValue(0));
                    this.lab_desc.text = game.getLanById(game.ConfigHeadToName[headType]);
                };
                return ChatCompeteRender;
            }(eui.ItemRenderer));
            chat.ChatCompeteRender = ChatCompeteRender;
            __reflect(ChatCompeteRender.prototype, "game.mod.chat.ChatCompeteRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatCompeteView = /** @class */ (function (_super) {
                __extends(ChatCompeteView, _super);
                function ChatCompeteView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.ChatCompeteSkin";
                    return _this;
                }
                return ChatCompeteView;
            }(eui.Component));
            chat.ChatCompeteView = ChatCompeteView;
            __reflect(ChatCompeteView.prototype, "game.mod.chat.ChatCompeteView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatDefaultTxtRender = /** @class */ (function (_super) {
                __extends(ChatDefaultTxtRender, _super);
                function ChatDefaultTxtRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatDefaultTxtRender.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.img_bg.visible = this.itemIndex % 2 == 0;
                    if (!this.data) {
                        this.lab_content.text = "";
                        return;
                    }
                    var rStr = game.getLanById("chat_phrase" + this.data);
                    if (rStr) {
                        this.lab_content.text = rStr;
                    }
                };
                return ChatDefaultTxtRender;
            }(eui.ItemRenderer));
            chat.ChatDefaultTxtRender = ChatDefaultTxtRender;
            __reflect(ChatDefaultTxtRender.prototype, "game.mod.chat.ChatDefaultTxtRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatMoreBtn = /** @class */ (function (_super) {
                __extends(ChatMoreBtn, _super);
                function ChatMoreBtn() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatMoreBtn.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.iconDisplay.source = this.data;
                };
                return ChatMoreBtn;
            }(eui.ItemRenderer));
            chat.ChatMoreBtn = ChatMoreBtn;
            __reflect(ChatMoreBtn.prototype, "game.mod.chat.ChatMoreBtn");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ChatPrivateRender = /** @class */ (function (_super) {
                __extends(ChatPrivateRender, _super);
                function ChatPrivateRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatPrivateRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_close, this.onClick, this);
                };
                ChatPrivateRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.headFrame, info.sex, info.vipIndex);
                    this.img_online.source = info.isOnline ? "friend_lv" : "friend_hui";
                    var nameStr = "";
                    if (info.name) {
                        var indexPos = info.name.indexOf(".");
                        nameStr = info.name.substr(indexPos + 1, info.name.length);
                    }
                    this.lab_name.text = nameStr; //todo，剪切掉服务器
                    var banlvInfo = mod.RoleUtil.getBanlvInfo();
                    var isBanlv = banlvInfo && banlvInfo.role_id && banlvInfo.role_id.eq(info.roleId); //仙侣
                    this.btn_close.visible = !isBanlv;
                    this.img_bg.source = isBanlv ? "siliaodiban2" : "siliaodiban1";
                    this.redPoint.visible = this._proxy.isNotReadPrivate(info.roleId);
                };
                ChatPrivateRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    this._proxy.deletePrivateInfo(this.data.roleId);
                };
                return ChatPrivateRender;
            }(mod.BaseListenerRenderer));
            chat.ChatPrivateRender = ChatPrivateRender;
            __reflect(ChatPrivateRender.prototype, "game.mod.chat.ChatPrivateRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var TextEvent = egret.TextEvent;
            var Point = egret.Point;
            var ChatRender = /** @class */ (function (_super) {
                __extends(ChatRender, _super);
                function ChatRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                    this.addEventListenerEx(TextEvent.LINK, this.lab_txt, this.onTapLink, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
                };
                ChatRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var data = this.data;
                    var info = data.senderInfo;
                    var isSelf = info && info.role_id && info.role_id.eq(game.RoleVo.ins.role_id);
                    this._isSelf = isSelf;
                    this.currentState = isSelf ? "right" : "left";
                    var chatChannel = data.chatChannel;
                    this._isSystem = chatChannel == 6 /* System */; //系统公告
                    if (this._isSystem) {
                        //系统公告显示仙界信使头像，不显示VIP和名字
                        var pCfg = game.GameConfig.getParamConfigById("liaotianzhuangban_xitong");
                        var systemInfo = pCfg && pCfg.value; //头像ID、相框ID、性别1男2女
                        this.head.updateName(systemInfo[0], systemInfo[1], systemInfo[2], "chat_system_name");
                        this.lab_name.text = "";
                    }
                    else {
                        this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                        var reincarnate = info.reincarnate ? info.reincarnate.toNumber() : 0;
                        var nameStr = "[" + mod.RoleUtil.getRebirthName(reincarnate) + "]" + info.name;
                        var titleIndex = info.title_index ? info.title_index.toNumber() : 0;
                        if (titleIndex) {
                            var titleCfg = game.getConfigByNameId("title.json" /* Title */, titleIndex);
                            nameStr += game.TextUtil.addColor("[" + titleCfg.name + "]", game.ColorUtil.getColorByQuality1(titleCfg.quality));
                        }
                        this.lab_name.textFlow = game.TextUtil.parseHtml(nameStr);
                    }
                    //聊天框，系统公告不用聊天框
                    var chatFrame = info && info.chat_frame ? info.chat_frame.toNumber() : 0;
                    this.img_chatFrame.visible = !!chatFrame;
                    this.img_di.visible = !chatFrame;
                    if (this.img_chatFrame.visible) {
                        this.img_chatFrame.source = game.ResUtil.getDressUpIcon(chatFrame, info.sex);
                    }
                    //文本显示
                    this.lab_txt.textFlow = game.TextUtil.parseHtml(data.content || "");
                    //表情
                    this.img_emo.source = data.imgSource && data.imgSource.trim() != "" ? data.imgSource : "";
                };
                ChatRender.prototype.onClickHead = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this._isSystem) {
                        return; //系统公告不给点击头像
                    }
                    var data = this.data;
                    var info = data.senderInfo;
                    if (this._isSelf) {
                        //玩家自己，直接弹窗人物信息
                        mod.ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
                        return;
                    }
                    var headStagePt = this.head.localToGlobal(); //转过去的是全局坐标
                    var point = new Point(headStagePt.x + this.head.width / 2, headStagePt.y + this.head.height / 2);
                    egret.callLater(function () {
                        facade.showView("25" /* Chat */, "04" /* ChatCheck */, { info: info, point: point });
                    }, this);
                };
                ChatRender.prototype.onTapLink = function (e) {
                    if (!this.data) {
                        return;
                    }
                    this._proxy.onClickChatLink(this.data, e.text);
                };
                return ChatRender;
            }(mod.BaseListenerRenderer));
            chat.ChatRender = ChatRender;
            __reflect(ChatRender.prototype, "game.mod.chat.ChatRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatSettingView = /** @class */ (function (_super) {
                __extends(ChatSettingView, _super);
                function ChatSettingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.ChatSettingSkin";
                    return _this;
                }
                return ChatSettingView;
            }(eui.Component));
            chat.ChatSettingView = ChatSettingView;
            __reflect(ChatSettingView.prototype, "game.mod.chat.ChatSettingView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var facade = base.facade;
            var TextEvent = egret.TextEvent;
            var ChatUnionRender = /** @class */ (function (_super) {
                __extends(ChatUnionRender, _super);
                function ChatUnionRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatUnionRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                    this.addEventListenerEx(TextEvent.LINK, this.lab_txt, this.onTapLink, this);
                };
                ChatUnionRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var data = this.data;
                    //文本显示
                    this.lab_txt.textFlow = game.TextUtil.parseHtml(data.content || "", false);
                };
                ChatUnionRender.prototype.onTapLink = function (e) {
                    if (!this.data) {
                        return;
                    }
                    this._proxy.onClickChatLink(this.data, e.text);
                };
                return ChatUnionRender;
            }(mod.BaseListenerRenderer));
            chat.ChatUnionRender = ChatUnionRender;
            __reflect(ChatUnionRender.prototype, "game.mod.chat.ChatUnionRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatView = /** @class */ (function (_super) {
                __extends(ChatView, _super);
                function ChatView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.ChatSkin";
                    return _this;
                }
                return ChatView;
            }(eui.Component));
            chat.ChatView = ChatView;
            __reflect(ChatView.prototype, "game.mod.chat.ChatView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var Event = egret.Event;
            var EmoticonRender = /** @class */ (function (_super) {
                __extends(EmoticonRender, _super);
                function EmoticonRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EmoticonRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.img_item.addEventListener(Event.COMPLETE, this.changeImgSize, this);
                };
                EmoticonRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.img_item.removeEventListener(Event.COMPLETE, this.changeImgSize, this);
                };
                EmoticonRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var type = this.data.type;
                    var idx = this.data.idx;
                    this._isVip = type == 2 /* Vip */;
                    this.img_bg.visible = this._isVip;
                    this.width = this.img_bg.width = (this._isVip ? game.ChatEmoW[1] : game.ChatEmoW[0]);
                    var faceName = type + "_" + idx;
                    this.img_item.source = game.ResUtil.getUiFace(faceName);
                };
                EmoticonRender.prototype.changeImgSize = function (e) {
                    var _rate = 1;
                    if (this._isVip) {
                        _rate = Math.min(game.ChatEmoW[0] / this.img_item.texture.textureHeight, game.ChatEmoW[1] / this.img_item.texture.textureWidth);
                    }
                    this.img_item.scaleX = this.img_item.scaleY = _rate;
                };
                return EmoticonRender;
            }(mod.BaseRenderer));
            chat.EmoticonRender = EmoticonRender;
            __reflect(EmoticonRender.prototype, "game.mod.chat.EmoticonRender");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var EmoticonView = /** @class */ (function (_super) {
                __extends(EmoticonView, _super);
                function EmoticonView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.EmoticonSkin";
                    return _this;
                }
                return EmoticonView;
            }(eui.Component));
            chat.EmoticonView = EmoticonView;
            __reflect(EmoticonView.prototype, "game.mod.chat.EmoticonView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleSurfaceTipsView = /** @class */ (function (_super) {
                __extends(RoleSurfaceTipsView, _super);
                function RoleSurfaceTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleSurfaceTipsSkin";
                    return _this;
                }
                return RoleSurfaceTipsView;
            }(eui.Component));
            chat.RoleSurfaceTipsView = RoleSurfaceTipsView;
            __reflect(RoleSurfaceTipsView.prototype, "game.mod.chat.RoleSurfaceTipsView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ChatModel = /** @class */ (function () {
                function ChatModel() {
                    this.chatCD = {};
                    this.chatEmojiCD = {};
                    this.blackInfos = [];
                    this.chatChannel = 1 /* Cross */;
                    this.chatPrivateCD = {}; //私聊CD，角色ID转string
                    this.chatPrivateEmojiCD = {}; //私聊表情CD，角色ID转string
                    this.privateList = []; //私聊列表
                    this.reqPrivateList = []; //已请求信息的私聊列表，角色ID转string
                    this.notReadPrivateList = []; //未读消息的私聊列表，角色ID转string
                    this.mainChatList = []; //主界面显示的聊天信息
                    this.openChat = false; //打开聊天按钮
                    this.systemList = []; //系统公告
                    this.reqUnion = false; //是否请求仙宗纪行消息
                    this.unionList = []; //仙宗纪行消息
                }
                ChatModel.prototype.clearData = function () {
                    this.chatMap = null;
                    this.chatCD = {};
                    this.chatEmojiCD = {};
                    this.infos = null;
                    this.blackInfos = [];
                    this.blackFlag = false;
                    this.chatPrivateMap = {};
                    this.chatPrivateCD = {};
                    this.chatPrivateEmojiCD = {};
                    this.privateList = [];
                    this.curPrivateInfo = null;
                    this.reqPrivateList = [];
                    this.notReadPrivateList = [];
                    this.mainChatList = [];
                    this.openChat = false;
                    this.systemList = [];
                    this.settingTime = 0;
                    this.reqUnion = false;
                    this.unionList = [];
                };
                return ChatModel;
            }());
            chat.ChatModel = ChatModel;
            __reflect(ChatModel.prototype, "game.mod.chat.ChatModel");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsBattleView = /** @class */ (function (_super) {
                __extends(RoleTipsBattleView, _super);
                function RoleTipsBattleView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsBattleSkin";
                    return _this;
                }
                return RoleTipsBattleView;
            }(eui.Component));
            chat.RoleTipsBattleView = RoleTipsBattleView;
            __reflect(RoleTipsBattleView.prototype, "game.mod.chat.RoleTipsBattleView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsEquipView = /** @class */ (function (_super) {
                __extends(RoleTipsEquipView, _super);
                function RoleTipsEquipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsEquipSkin";
                    return _this;
                }
                return RoleTipsEquipView;
            }(eui.Component));
            chat.RoleTipsEquipView = RoleTipsEquipView;
            __reflect(RoleTipsEquipView.prototype, "game.mod.chat.RoleTipsEquipView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsOtherSkillView = /** @class */ (function (_super) {
                __extends(RoleTipsOtherSkillView, _super);
                function RoleTipsOtherSkillView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsOtherSkillSkin";
                    return _this;
                }
                return RoleTipsOtherSkillView;
            }(eui.Component));
            chat.RoleTipsOtherSkillView = RoleTipsOtherSkillView;
            __reflect(RoleTipsOtherSkillView.prototype, "game.mod.chat.RoleTipsOtherSkillView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsShenlingView = /** @class */ (function (_super) {
                __extends(RoleTipsShenlingView, _super);
                function RoleTipsShenlingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsShenlingSkin";
                    return _this;
                }
                return RoleTipsShenlingView;
            }(eui.Component));
            chat.RoleTipsShenlingView = RoleTipsShenlingView;
            __reflect(RoleTipsShenlingView.prototype, "game.mod.chat.RoleTipsShenlingView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsSkillView = /** @class */ (function (_super) {
                __extends(RoleTipsSkillView, _super);
                function RoleTipsSkillView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsSkillSkin";
                    return _this;
                }
                return RoleTipsSkillView;
            }(eui.Component));
            chat.RoleTipsSkillView = RoleTipsSkillView;
            __reflect(RoleTipsSkillView.prototype, "game.mod.chat.RoleTipsSkillView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsView = /** @class */ (function (_super) {
                __extends(RoleTipsView, _super);
                function RoleTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.chat.RoleTipsSkin";
                    return _this;
                }
                return RoleTipsView;
            }(eui.Component));
            chat.RoleTipsView = RoleTipsView;
            __reflect(RoleTipsView.prototype, "game.mod.chat.RoleTipsView");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            var facade = base.facade;
            var friend_add_data = msg.friend_add_data;
            var ChatCheckMdr = /** @class */ (function (_super) {
                __extends(ChatCheckMdr, _super);
                function ChatCheckMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", chat.ChatCheckView);
                    return _this;
                }
                ChatCheckMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    //按钮列表
                    this._btnList = new ArrayCollection();
                    this._view.list_btn.dataProvider = this._btnList;
                    this._view.list_btn.itemRenderer = mod.BtnTabItem;
                    this._proxy = this.retProxy(35 /* Chat */);
                    this._friendProxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                };
                ChatCheckMdr.prototype.addListeners = function () {
                    var _this = this;
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_btn, Event.CHANGING, this.onClickBtn);
                    egret.callLater(function () {
                        addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, _this.onClickOther);
                    }, this);
                };
                ChatCheckMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initView();
                    this.initTypeList();
                };
                ChatCheckMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ChatCheckMdr.prototype.onClickBtn = function (e) {
                    var type = this._view.list_btn.selectedIndex + 1;
                    switch (type) {
                        case 1 /* Check */:
                            this.onClickCheck();
                            break;
                        case 2 /* Add */:
                            this.onClickAdd();
                            break;
                        case 3 /* Compete */:
                            this.onClickCompete();
                            break;
                        case 4 /* Black */:
                            this.onClickBlack();
                            break;
                    }
                    this.hide();
                };
                //判断是否超出界面
                ChatCheckMdr.prototype.onClickOther = function (e) {
                    var viewStagePt = this._view.localToGlobal();
                    if (e.stageX < viewStagePt.x || e.stageX > viewStagePt.x + this._view.width || e.stageY < viewStagePt.y ||
                        e.stageY > viewStagePt.y + this._view.height) {
                        this.hide();
                    }
                };
                ChatCheckMdr.prototype.initView = function () {
                    var point = this._showArgs.point; //全局坐标
                    this._view.x = point.x - game.Layer.tip.x; //减去对应层级的坐标
                    this._view.y = point.y - game.Layer.tip.y;
                };
                ChatCheckMdr.prototype.initTypeList = function () {
                    var datas = [];
                    var name = game.getLanById("chat_cue20" /* chat_cue20 */);
                    datas.push({ name: name });
                    var info = this._showArgs.info;
                    this._isFriend = this._friendProxy.isFriend(info.role_id);
                    name = this._isFriend ? game.getLanById("chat_cue22" /* chat_cue22 */) : game.getLanById("chat_cue21" /* chat_cue21 */); //私聊或添加
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue23" /* chat_cue23 */);
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue24" /* chat_cue24 */);
                    datas.push({ name: name });
                    this._btnList.source = datas;
                    this._view.list_btn.selectedIndex = -1;
                };
                ChatCheckMdr.prototype.onClickCheck = function () {
                    //查看
                    var info = this._showArgs.info;
                    mod.ViewMgr.getIns().showRoleTips(info.role_id, info.server_id, info.is_robot);
                };
                ChatCheckMdr.prototype.onClickAdd = function () {
                    var info = this._showArgs.info;
                    if (this._isFriend) {
                        //私聊
                        mod.ViewMgr.getIns().chat(info.role_id);
                    }
                    else {
                        //添加
                        var friendInfo = new friend_add_data();
                        friendInfo.role_id = info.role_id;
                        friendInfo.server_id = info.server_id;
                        this._friendProxy.c2s_friend_apply([friendInfo]);
                    }
                };
                ChatCheckMdr.prototype.onClickCompete = function () {
                    //战力比拼
                    var info = this._showArgs.info;
                    this._proxy.c2s_chat_look_user(info.server_id, info.role_id, info.is_robot, 1 /* Compete */);
                };
                ChatCheckMdr.prototype.onClickBlack = function () {
                    //拉黑
                    var info = this._showArgs.info;
                    this._proxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
                };
                return ChatCheckMdr;
            }(game.MdrBase));
            chat.ChatCheckMdr = ChatCheckMdr;
            __reflect(ChatCheckMdr.prototype, "game.mod.chat.ChatCheckMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ArrayCollection = eui.ArrayCollection;
            var ChatCompeteMdr = /** @class */ (function (_super) {
                __extends(ChatCompeteMdr, _super);
                function ChatCompeteMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", chat.ChatCompeteView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ChatCompeteMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(35 /* Chat */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = chat.ChatCompeteRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                ChatCompeteMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                ChatCompeteMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateSelf();
                    this.updateEnemy();
                    this.updateItemList();
                };
                ChatCompeteMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ChatCompeteMdr.prototype.updateSelf = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
                };
                ChatCompeteMdr.prototype.updateEnemy = function () {
                    var info = this._showArgs.check_role;
                    this._view.lab_name2.text = info.name;
                    this._view.powerLabel2.setPowerValue(info.showpower);
                    this._view.head2.updateShow(info.head, info.head_frame, info.sex, info.vip);
                };
                ChatCompeteMdr.prototype.updateItemList = function () {
                    var info = this._showArgs.info;
                    this._itemList.source = info;
                };
                return ChatCompeteMdr;
            }(game.MdrBase));
            chat.ChatCompeteMdr = ChatCompeteMdr;
            __reflect(ChatCompeteMdr.prototype, "game.mod.chat.ChatCompeteMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var facade = base.facade;
            var ChatMainMdr = /** @class */ (function (_super) {
                __extends(ChatMainMdr, _super);
                function ChatMainMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChatMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(35 /* Chat */);
                    this.initBtnData();
                };
                ChatMainMdr.prototype.initBtnData = function () {
                    this._btnData = [
                        {
                            btnType: "01" /* Cross */,
                            icon: "chat_tab1_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            param: 1 /* Cross */
                        },
                        {
                            btnType: "02" /* Local */,
                            icon: "chat_tab2_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            param: 2 /* Local */
                        },
                        {
                            btnType: "03" /* Private */,
                            icon: "chat_tab3_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            hintTypes: ["25" /* Chat */, "01" /* ChatMain */ + "03" /* Private */],
                            param: 3 /* Private */
                        },
                        {
                            btnType: "04" /* Union */,
                            icon: "chat_tab4_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            param: 4 /* Union */
                        },
                        {
                            btnType: "05" /* Zhandui */,
                            icon: "chat_tab5_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            param: 5 /* Zhandui */,
                        },
                        {
                            btnType: "06" /* System */,
                            icon: "chat_tab6_",
                            mdr: chat.ChatMdr,
                            title: "chat_tips1" /* chat_tips1 */,
                            param: 6 /* System */
                        }
                    ];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var btnData = _a[_i];
                        var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, btnData.param);
                        btnData.openIdx = cfg.open_id;
                    }
                };
                ChatMainMdr.prototype.onTabCheck = function (index) {
                    var data = this._btnList.source[index];
                    var chatChannel = data.param; //聊天频道
                    if (chatChannel == 4 /* Union */) {
                        //加入仙宗后开启
                        var unionProxy = facade.retMod("55" /* Union */).retProxy(217 /* Union */);
                        if (!unionProxy.isInUnion) {
                            game.PromptBox.getIns().show(game.getLanById("chat_open_tips1" /* chat_open_tips1 */));
                            return false;
                        }
                    }
                    else if (chatChannel == 5 /* Zhandui */) {
                        //加入战队后开启
                        var zhanduiProxy = facade.retMod("61" /* More */).retProxy(251 /* Zhandui */);
                        if (!zhanduiProxy.haveTeam()) {
                            game.PromptBox.getIns().show(game.getLanById("chat_open_tips2" /* chat_open_tips2 */));
                            return false;
                        }
                    }
                    var isOpen = !data.openIdx || mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true);
                    if (isOpen) {
                        this._proxy.chatChannel = chatChannel;
                    }
                    return isOpen;
                };
                ChatMainMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return ChatMainMdr;
            }(mod.WndBaseMdr));
            chat.ChatMainMdr = ChatMainMdr;
            __reflect(ChatMainMdr.prototype, "game.mod.chat.ChatMainMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Tween = base.Tween;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var TextEvent = egret.TextEvent;
            var ChatMdr = /** @class */ (function (_super) {
                __extends(ChatMdr, _super);
                function ChatMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", chat.ChatView);
                    _this._chatChannel = 1 /* Cross */;
                    _this._isSendSuccess = false; //是否发送成功
                    _this.ITEM_H = 160; //item高度
                    _this.ITEM_N = 5; //item显示的数量
                    _this.ITEM_N_OTHER = 4; //item显示的数量，私聊和仙宗
                    _this.ITEM_H_UNION = 28; //item高度，仙宗纪行，实际上用不到，防止计算不到contentHeight用
                    _this._isOpen = false; //开启聊天
                    _this._isOpenTxt = false; //打开快捷语
                    _this._isOpenMore = false; //打开更多
                    _this._selIndex = 0; //私聊玩家下标
                    _this._isPrivate = false; //当前是否私聊
                    _this._time = 0; //定时请求私聊玩家在线状态
                    _this.TIME_TICK = 3; //定时请求私聊玩家在线状态
                    _this._isUnion = false; //当前是否仙宗
                    return _this;
                }
                ChatMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(35 /* Chat */);
                    this._itemList = new ArrayCollection();
                    this._view.list.itemRenderer = chat.ChatRender;
                    this._view.list.dataProvider = this._itemList;
                    this._txtList = new ArrayCollection();
                    this._view.list_txt.itemRenderer = chat.ChatDefaultTxtRender;
                    this._view.list_txt.dataProvider = this._txtList;
                    this._moreList = new ArrayCollection();
                    this._view.list_more.itemRenderer = chat.ChatMoreBtn;
                    this._view.list_more.dataProvider = this._moreList;
                    this._privateList = new ArrayCollection();
                    this._view.list_private.itemRenderer = chat.ChatPrivateRender;
                    this._view.list_private.dataProvider = this._privateList;
                    this._unionList = new ArrayCollection();
                    this._view.list_union.itemRenderer = chat.ChatUnionRender;
                    this._view.list_union.dataProvider = this._unionList;
                };
                ChatMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_more, TouchEvent.TOUCH_TAP, this.onClickMore);
                    addEventListener(this._view.btn_face, TouchEvent.TOUCH_TAP, this.onClickFace);
                    addEventListener(this._view.btn_send, TouchEvent.TOUCH_TAP, this.onClickSend);
                    addEventListener(this._view.btn_txt, TouchEvent.TOUCH_TAP, this.onClickTxt);
                    addEventListener(this._view.list_txt, ItemTapEvent.ITEM_TAP, this.onClickListTxt);
                    addEventListener(this._view.list_more, ItemTapEvent.ITEM_TAP, this.onClickListMore);
                    addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
                    addEventListener(this._view.list_private, ItemTapEvent.ITEM_TAP, this.onClickPrivate);
                    this.onNt("on_send_success" /* ON_SEND_SUCCESS */, this.onSendSuccess, this);
                    this.onNt("on_chat_update" /* ON_CHAT_UPDATE */, this.onChatUpdate, this);
                    this.onNt("on_chat_setting_update" /* ON_CHAT_SETTING_UPDATE */, this.onChatHide, this);
                    this.onNt("on_chat_black_update" /* ON_CHAT_BLACK_UPDATE */, this.onChatHide, this);
                    this.onNt("on_chat_private_list_update" /* ON_CHAT_PRIVATE_LIST_UPDATE */, this.updatePrivateList, this);
                    this.onNt("on_chat_private_list_hint" /* ON_CHAT_PRIVATE_LIST_HINT */, this.updatePrivateHint, this);
                    this.onNt("on_chat_private_list_info" /* ON_CHAT_PRIVATE_LIST_INFO */, this.updatePrivateInfo, this);
                    this.onNt("on_chat_private_update" /* ON_CHAT_PRIVATE_UPDATE */, this.onChatPrivateUpdate, this);
                    this.onNt("on_chat_union_update" /* ON_CHAT_UNION_UPDATE */, this.onChatUnionUpdate, this);
                };
                ChatMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.setOpenTxt(false);
                    this.updateDefaultTxt();
                    this.setOpenMore(false);
                    this.updateMoreList();
                    this._proxy.c2s_chat_open_blacklist(); //主动请求黑名单信息
                };
                ChatMdr.prototype.onHide = function () {
                    Tween.remove(this._view.scr.viewport);
                    this._isSendSuccess = false;
                    this._sendTime = 0;
                    this._isOpen = false;
                    this._defaultTxtIdx = 0;
                    this._selIndex = 0;
                    this._selInfo = null;
                    this._itemList.removeAll(); //关闭时候移除下数据，防止缓存影响滚动刷新
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                ChatMdr.prototype.initShow = function () {
                    this._chatChannel = this._proxy.chatChannel;
                    this._isPrivate = this._chatChannel == 3 /* Private */;
                    this._isUnion = this._chatChannel == 4 /* Union */;
                    //默认或者私聊
                    this._view.currentState = this._isPrivate ? "private" : (this._isUnion ? "union" : "default");
                    if (this._isPrivate) {
                        this.updatePrivateList();
                    }
                    else {
                        this.updateDefaultList();
                    }
                    if (this._isUnion) {
                        //请求仙宗纪行消息
                        this._proxy.c2s_guild_chat_tips_text();
                        this.updateUnionList();
                    }
                };
                ChatMdr.prototype.onClickFace = function () {
                    var _this = this;
                    egret.callLater(function () {
                        facade.showView("25" /* Chat */, "02" /* Emoticon */, _this._chatChannel);
                    }, this);
                };
                ChatMdr.prototype.onClickSend = function () {
                    var content = this._view.input.text;
                    if (content.indexOf("$") == 0 && DEBUG) {
                        if (content.indexOf("client_jump") >= 0) {
                            //测试跳转
                            var jumpIdx = parseInt(content.slice(13, content.length));
                            mod.ViewMgr.getIns().showViewByID(jumpIdx);
                            return;
                        }
                        //发送gm命令
                        var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                        miscProxy.sendGM(content);
                        return;
                    }
                    if (!this.canChat()) {
                        return;
                    }
                    if (!this.checkContentCanSend(content)) {
                        //文本不符合规范
                        return;
                    }
                    this._isSendSuccess = false;
                    this._sendTime = TimeMgr.time.serverTimeSecond;
                    if (this._isPrivate) {
                        this._proxy.c2s_private_chat(this._selInfo.serverId, this._selInfo.roleId, content.trim());
                    }
                    else {
                        this._proxy.c2s_chat(this._chatChannel, content.trim());
                    }
                };
                //是否可以聊天
                ChatMdr.prototype.canChat = function () {
                    //todo,频道限制
                    if (this._chatChannel == 6 /* System */) {
                        //系统频道无法发言
                        game.PromptBox.getIns().show(game.getLanById("chat_cue8" /* chat_cue8 */));
                        return false;
                    }
                    //私聊限制
                    if (this._isPrivate && !this._selInfo) {
                        game.PromptBox.getIns().show(game.getLanById("chat_cue27" /* chat_cue27 */));
                        return false;
                    }
                    //CD限制
                    var roleId = this._isPrivate && this._selInfo ? this._selInfo.roleId : null;
                    var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                    var cdTime = this._proxy.getChatCD(this._chatChannel, roleId);
                    var cfgCd = 0;
                    var lv = game.RoleVo.ins.level;
                    if (cfg && cfg.CD) {
                        var i = 0;
                        for (var len = cfg.CD.length; i < len; i++) {
                            if (lv < cfg.CD[i][0]) {
                                break;
                            }
                        }
                        cfgCd = cfg.CD[(i > 0 ? i - 1 : 0)][1]; //取配置的CD
                    }
                    if (cdTime && TimeMgr.time.serverTimeSecond - cdTime < cfgCd) {
                        game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("chat_cue7" /* chat_cue7 */), [cfgCd]));
                        return false;
                    }
                    //客户端额外CD限制，防止点击过快
                    if (!this._isSendSuccess) {
                        if (this._sendTime && TimeMgr.time.serverTimeSecond - this._sendTime < cfgCd + 1) {
                            game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("chat_cue7" /* chat_cue7 */), [cfgCd]));
                            return false;
                        }
                    }
                    //默认发言
                    if (this._defaultTxtIdx) {
                        return true;
                    }
                    if (!this._isOpen) {
                        var cfg_1 = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                        var limitLv = cfg_1.limits && cfg_1.limits[0] || 0;
                        game.PromptBox.getIns().show(limitLv + "级才可以发言");
                    }
                    return this._isOpen;
                };
                //是否开启聊天
                ChatMdr.prototype.openChat = function () {
                    //等级限制
                    var lv = game.RoleVo.ins.level;
                    var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                    var limitLv = cfg.limits && cfg.limits[0] || 0;
                    if (lv >= limitLv) {
                        return true;
                    }
                    //VIP限制
                    var vip = game.RoleVo.ins.vip_lv;
                    var limitVip = cfg.limits[1];
                    if (vip >= limitVip) {
                        return true;
                    }
                    //充值金额限制
                    if (cfg.chargeMoney) {
                        var chargeRmb = game.RoleVo.ins.charge_rmb;
                        if (chargeRmb >= cfg.chargeMoney) {
                            return true;
                        }
                    }
                    return false;
                };
                //文本是否符合规范
                ChatMdr.prototype.checkContentCanSend = function (_str) {
                    if (_str.trim() == "") {
                        game.PromptBox.getIns().show("不能发送空消息!");
                        return false;
                    }
                    if (_str.indexOf("<") != -1) {
                        game.PromptBox.getIns().show("含有非法字符，无法发送!");
                        return false;
                    }
                    return true;
                };
                ChatMdr.prototype.onSendSuccess = function () {
                    this._isSendSuccess = true;
                    this._view.input.text = "";
                    this._defaultTxtIdx = 0;
                };
                ChatMdr.prototype.onChatUpdate = function () {
                    //更新新消息
                    if (!this._isPrivate) {
                        this.updateDefaultList(true);
                    }
                };
                ChatMdr.prototype.onChatHide = function () {
                    //屏蔽后刷新消息显示
                    if (!this._isPrivate) {
                        this.updateDefaultList();
                    }
                };
                ChatMdr.prototype.updateDefaultList = function (isUpdate) {
                    var infos = this._proxy.getChatInfoByChannel(this._chatChannel).concat();
                    this._view.grp_tips.visible = !infos.length;
                    this.updateItemList(infos, isUpdate);
                };
                ChatMdr.prototype.updateItemList = function (infos, isUpdate) {
                    var _this = this;
                    this._view.scr.stopAnimation();
                    this._view.scr.visible = !!infos.length;
                    if (!this._view.scr.visible) {
                        return; //不显示的时候没必要滚动计算
                    }
                    var oldInfos = this._itemList.source.concat();
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(infos);
                    }
                    else {
                        this._itemList.source = infos;
                    }
                    if (isUpdate) {
                        var viewport = this._view.scr.viewport;
                        var gap = viewport.layout.gap;
                        var lastPos = oldInfos.length - 1;
                        var lastScrollV = lastPos * this.ITEM_H + (lastPos - 1) * gap - viewport.height;
                        if (viewport.scrollV < lastScrollV) {
                            //旧消息长度有可能小于当前信息
                            return; //查看聊天记录时不滚动到最新
                        }
                    }
                    var pos = infos.length - 1;
                    var num = this._isPrivate || this._isUnion ? this.ITEM_N_OTHER : this.ITEM_N;
                    if (pos >= num) {
                        //是否滚动到对应位置
                        egret.callLater(function () {
                            mod.ScrollUtil.moveVToAssign(_this._view.scr, pos, _this.ITEM_H, 10, 0, true);
                        }, this);
                    }
                    else {
                        this._view.scr.viewport.scrollV = 0; //默认初始位置
                    }
                };
                /**------------------------快捷发言-----------------------------*/
                ChatMdr.prototype.onClickTxt = function () {
                    this.setOpenTxt(!this._isOpenTxt);
                };
                ChatMdr.prototype.onClickListTxt = function (e) {
                    var data = this._view.list_txt.selectedItem;
                    if (!data) {
                        return;
                    }
                    this.setDefaultIdx(data);
                    this.setOpenTxt(false);
                };
                ChatMdr.prototype.setOpenTxt = function (isOpen) {
                    this._isOpenTxt = isOpen;
                    this._view.grp_txt.visible = this._isOpenTxt;
                };
                ChatMdr.prototype.updateDefaultTxt = function () {
                    this._isOpen = this.openChat();
                    this._view.btn_txt.visible = !this._isOpen && !this._isPrivate;
                    if (this._view.btn_txt.visible) {
                        //未开启时，且不是私聊
                        var infos = this.getDefaultTxtList();
                        this._txtList.source = infos;
                        var idx = Math.floor(Math.random() * 6) || 1;
                        this.setDefaultIdx(idx);
                        var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                        var limitLv = cfg.limits[0];
                        var limitVip = cfg.limits[1];
                        var vipStr = mod.VipUtil.getVipStr(limitVip);
                        this._view.lab_tip.text = game.StringUtil.substitute(game.getLanById("chat_cue11" /* chat_cue11 */), [limitLv, vipStr]);
                    }
                };
                ChatMdr.prototype.getDefaultTxtList = function () {
                    var infos = [];
                    for (var i = 1; i <= game.CHAT_DEFAULT_NUM; ++i) {
                        infos.push(i);
                    }
                    return infos;
                };
                ChatMdr.prototype.setDefaultIdx = function (idx) {
                    this._defaultTxtIdx = idx;
                    this._view.input.text = game.getLanById("chat_phrase" + idx);
                };
                /**------------------------更多-----------------------------*/
                ChatMdr.prototype.onClickMore = function () {
                    this.setOpenMore(!this._isOpenMore);
                };
                ChatMdr.prototype.onClickListMore = function (e) {
                    var data = this._view.list_more.selectedItem;
                    if (!data) {
                        return;
                    }
                    switch (data) {
                        case "shezhianniu" /* Setting */:
                            this.onClickSetting();
                            break;
                        case "heimingdan" /* Black */:
                            this.onClickBlack();
                            break;
                        default:
                            game.PromptBox.getIns().show("敬请期待");
                    }
                    this.setOpenMore(false);
                };
                ChatMdr.prototype.setOpenMore = function (isOpen) {
                    this._isOpenMore = isOpen;
                    this._view.grp_more.visible = this._isOpenMore;
                };
                ChatMdr.prototype.updateMoreList = function () {
                    var infos = ["shezhianniu" /* Setting */, "heimingdan" /* Black */, "hongbaotubiao" /* RedPacket */];
                    this._moreList.source = infos;
                };
                ChatMdr.prototype.onClickSetting = function () {
                    mod.ViewMgr.getIns().showSecondPop("25" /* Chat */, "03" /* ChatSetting */);
                };
                ChatMdr.prototype.onClickBlack = function () {
                    mod.ViewMgr.getIns().showView("59" /* Friend */, "01" /* FriendMain */, "04" /* Black */);
                };
                /**------------------------私聊-----------------------------*/
                //跳转仙友
                ChatMdr.prototype.onClickGoto = function () {
                    mod.ViewMgr.getIns().showViewByID(39 /* Friend */);
                };
                ChatMdr.prototype.onClickPrivate = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this.updateSelIndex(index);
                };
                ChatMdr.prototype.updatePrivateList = function () {
                    var infos = this._proxy.getPrivateList().concat();
                    this._view.grp_tips_private.visible = !infos.length;
                    if (this._view.grp_tips_private.visible) {
                        var gotoStr = this._view.lab_goto.text;
                        this._view.lab_goto.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(gotoStr, 2330156 /* GREEN */, ""));
                    }
                    this._view.scr_private.visible = !!infos.length;
                    if (!this._view.scr_private.visible) {
                        //没有私聊列表时候，聊天列表也要隐藏
                        this._view.scr.visible = false;
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    if (!TimeMgr.hasUpdateItem(this)) {
                        //添加定时器，请求对方私聊信息
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    if (this._privateList.source.length) {
                        this._privateList.replaceAll(infos);
                    }
                    else {
                        this._privateList.source = infos;
                    }
                    if (this._proxy.curPrivateInfo) {
                        //私聊跳转界面时候，选中私聊玩家
                        for (var i = 0; i < infos.length; ++i) {
                            var info = infos[i];
                            if (info.roleId.eq(this._proxy.curPrivateInfo.roleId)) {
                                //选中
                                this.updateSelIndex(i);
                                break;
                            }
                        }
                    }
                    else if (this._selIndex >= infos.length) {
                        //防止删除私聊时候，下标超出
                        var index = Math.min(this._selIndex, infos.length - 1);
                        this.updateSelIndex(index);
                    }
                    else {
                        this.updateSelIndex(this._selIndex);
                    }
                    this._view.list_private.selectedIndex = this._selIndex;
                };
                //红点刷新
                ChatMdr.prototype.updatePrivateHint = function () {
                    if (!this._view.scr_private.visible) {
                        return;
                    }
                    var infos = this._privateList.source;
                    this._privateList.replaceAll(infos);
                };
                //在线状态刷新
                ChatMdr.prototype.updatePrivateInfo = function () {
                    if (!this._view.scr_private.visible) {
                        return;
                    }
                    var infos = this._proxy.getPrivateList().concat();
                    ;
                    this._privateList.replaceAll(infos);
                };
                ChatMdr.prototype.updateSelIndex = function (index) {
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                ChatMdr.prototype.indexUpdateInfo = function (isUpdate) {
                    var infos = this._proxy.getPrivateList().concat();
                    this._selInfo = infos.length ? infos[this._selIndex] : null;
                    this._proxy.curPrivateInfo = this._selInfo;
                    var roleId = this._selInfo && this._selInfo.roleId;
                    var chatInfos = this._proxy.getChatPrivateInfos(roleId).concat();
                    // if(!chatInfos.length && this._selInfo){
                    //没有私聊信息时候，请求历史私聊信息
                    if (this._selInfo && !isUpdate) {
                        //请求历史私聊信息，非更新消息时候请求
                        this._proxy.c2s_get_private_chat(this._selInfo.serverId, this._selInfo.roleId);
                    }
                    if (this._selInfo) {
                        //已读私聊信息
                        this._proxy.c2s_read_private_chat(this._selInfo.serverId, this._selInfo.roleId);
                    }
                    this.updateItemList(chatInfos, isUpdate);
                };
                ChatMdr.prototype.onChatPrivateUpdate = function () {
                    //更新新消息
                    if (this._isPrivate) {
                        this.indexUpdateInfo(true);
                    }
                };
                ChatMdr.prototype.update = function (time) {
                    this._time--;
                    if (this._time <= 0) {
                        this._proxy.c2s_private_chat_role_online_status(); //定时请求对方私聊信息
                        this._time = this.TIME_TICK;
                    }
                };
                /**------------------------仙宗纪行-----------------------------*/
                ChatMdr.prototype.onChatUnionUpdate = function () {
                    //更新新消息
                    if (this._isUnion) {
                        this.updateUnionList();
                    }
                };
                ChatMdr.prototype.updateUnionList = function () {
                    var _this = this;
                    var infos = this._proxy.unionList.concat();
                    if (this._unionList.source.length) {
                        this._unionList.replaceAll(infos);
                    }
                    else {
                        this._unionList.source = infos;
                    }
                    var pos = infos.length - 1;
                    egret.callLater(function () {
                        mod.ScrollUtil.moveVToAssign(_this._view.scr_union, pos, _this.ITEM_H_UNION, 10, 0, true);
                    }, this);
                };
                return ChatMdr;
            }(game.EffectMdrBase));
            chat.ChatMdr = ChatMdr;
            __reflect(ChatMdr.prototype, "game.mod.chat.ChatMdr", ["base.UpdateItem"]);
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var ChatSettingMdr = /** @class */ (function (_super) {
                __extends(ChatSettingMdr, _super);
                function ChatSettingMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", chat.ChatSettingView);
                    _this.CHAT_SETTING_TIME = 15; //屏蔽间隔之间需要15秒
                    _this.isEasyHide = true;
                    return _this;
                }
                ChatSettingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(35 /* Chat */);
                };
                ChatSettingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
                    this.onNt("on_chat_setting_update" /* ON_CHAT_SETTING_UPDATE */, this.updateView, this);
                };
                ChatSettingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initView();
                    this.updateView();
                    this._proxy.c2s_chat_open_setting();
                };
                ChatSettingMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ChatSettingMdr.prototype.onClickCheck = function (e) {
                    var clickCheckbox = e.target;
                    for (var i = 0; i < this._list.length; ++i) {
                        var checkbox = this._list[i];
                        if (clickCheckbox == checkbox) {
                            var type = i + 1;
                            var settingTime = this._proxy.settingTime;
                            var curTime = TimeMgr.time.serverTimeSecond;
                            if (settingTime && settingTime + this.CHAT_SETTING_TIME > curTime) {
                                this.updateSelected(type, checkbox); //恢复选中状态
                                var tips = game.StringUtil.substitute(game.getLanById("chat_setting_tips" /* chat_setting_tips */), [this.CHAT_SETTING_TIME]);
                                game.PromptBox.getIns().show(tips); //屏蔽间隔之间需要15秒
                                return;
                            }
                            this._proxy.settingTime = curTime;
                            this._proxy.c2s_chat_setting(type);
                            break;
                        }
                    }
                };
                ChatSettingMdr.prototype.initView = function () {
                    this._list = [
                        this._view.checkbox1,
                        this._view.checkbox2,
                        this._view.checkbox3
                    ];
                    var addEventListener = this.onEgret.bind(this);
                    for (var i = 0; i < this._list.length; ++i) {
                        var checkbox = this._list[i];
                        addEventListener(checkbox, TouchEvent.TOUCH_TAP, this.onClickCheck);
                        var type = i + 1;
                        var str = "chat_setting" + type;
                        checkbox.labelDisplay.text = game.getLanById(str);
                    }
                };
                ChatSettingMdr.prototype.updateView = function () {
                    for (var i = 0; i < this._list.length; ++i) {
                        var checkbox = this._list[i];
                        var type = i + 1;
                        this.updateSelected(type, checkbox);
                    }
                };
                ChatSettingMdr.prototype.updateSelected = function (type, checkbox) {
                    var isSelected = this._proxy.isSettingSelected(type);
                    checkbox.selected = isSelected;
                };
                return ChatSettingMdr;
            }(game.MdrBase));
            chat.ChatSettingMdr = ChatSettingMdr;
            __reflect(ChatSettingMdr.prototype, "game.mod.chat.ChatSettingMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var Event = egret.Event;
            var EmoticonMdr = /** @class */ (function (_super) {
                __extends(EmoticonMdr, _super);
                function EmoticonMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", chat.EmoticonView);
                    _this._selType = 1 /* Normal */; //当前选中的按钮类型
                    _this._chatChannel = 1 /* Cross */;
                    _this._isPrivate = false; //当前是否私聊
                    return _this;
                }
                EmoticonMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.bottom = 224;
                    //表情列表
                    this._itemList = new ArrayCollection();
                    this._view.list_emoticon.dataProvider = this._itemList;
                    this._view.list_emoticon.itemRenderer = chat.EmoticonRender;
                    //按钮列表
                    this._btnList = new ArrayCollection();
                    this._view.list_btn.dataProvider = this._btnList;
                    this._view.list_btn.itemRenderer = mod.BtnTabItem;
                    this._proxy = this.retProxy(35 /* Chat */);
                };
                EmoticonMdr.prototype.addListeners = function () {
                    var _this = this;
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_btn, Event.CHANGING, this.onClickBtn);
                    addEventListener(this._view.list_emoticon, ItemTapEvent.ITEM_TAP, this.onClickEmoticon);
                    egret.callLater(function () {
                        addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, _this.onClickOther);
                    }, this);
                };
                EmoticonMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._chatChannel = this._showArgs;
                    this._isPrivate = this._chatChannel == 3 /* Private */;
                    this.initTypeList();
                    this.typeUpdateInfo();
                };
                EmoticonMdr.prototype.onHide = function () {
                    this._selType = 1 /* Normal */;
                    _super.prototype.onHide.call(this);
                };
                EmoticonMdr.prototype.onClickBtn = function (e) {
                    var type = this._view.list_btn.selectedIndex + 1;
                    if (type == this._selType) {
                        return;
                    }
                    if (type == 2 /* Vip */ && !this.isOpenVip()) {
                        mod.VipUtil.showTips();
                        e.preventDefault();
                        this.hide();
                        return;
                    }
                    this._selType = type;
                    this.typeUpdateInfo();
                };
                EmoticonMdr.prototype.onClickEmoticon = function (e) {
                    //todo,频道限制
                    if (this._chatChannel == 6 /* System */) {
                        //系统频道无法发言
                        game.PromptBox.getIns().show(game.getLanById("chat_cue8" /* chat_cue8 */));
                        return;
                    }
                    //私聊限制
                    if (this._isPrivate && !this._proxy.curPrivateInfo) {
                        game.PromptBox.getIns().show(game.getLanById("chat_cue27" /* chat_cue27 */));
                        return;
                    }
                    //CD限制
                    var roleId = this._isPrivate && this._proxy.curPrivateInfo ? this._proxy.curPrivateInfo.roleId : null;
                    var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                    var cdTime = this._proxy.getChatEmojiCD(this._chatChannel, roleId);
                    if (cfg && cdTime && TimeMgr.time.serverTimeSecond - cdTime < cfg.emoji_cd) {
                        game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("chat_cue18" /* chat_cue18 */), [cfg.emoji_cd]));
                        return;
                    }
                    var type = this._view.list_emoticon.selectedItem.type; //类型
                    var idx = this._view.list_emoticon.selectedItem.idx; //id
                    var faceName = type + "_" + idx;
                    var content = "#f(" + faceName + ")";
                    if (this._isPrivate) {
                        this._proxy.c2s_private_chat(this._proxy.curPrivateInfo.serverId, this._proxy.curPrivateInfo.roleId, content.trim());
                    }
                    else {
                        this._proxy.c2s_chat(this._chatChannel, content.trim());
                    }
                    this.hide();
                };
                //判断是否超出表情选择框
                EmoticonMdr.prototype.onClickOther = function (e) {
                    var viewStagePt = this._view.localToGlobal();
                    if (e.stageX < viewStagePt.x || e.stageX > viewStagePt.x + this._view.width || e.stageY < viewStagePt.y ||
                        e.stageY > viewStagePt.y + this._view.height) {
                        this.hide();
                    }
                };
                EmoticonMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 1 /* Normal */; i <= 2 /* Vip */; ++i) {
                        var name = game.getLanById("chat_emoticon" + i);
                        datas.push({ name: name });
                    }
                    this._btnList.source = datas;
                    this._selType = 1 /* Normal */;
                    this._view.list_btn.selectedIndex = this._selType - 1;
                };
                EmoticonMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                };
                EmoticonMdr.prototype.updateItemList = function () {
                    this._view.scr.stopAnimation();
                    this._view.scr.viewport.scrollV = 0;
                    var items = [];
                    var cnt = this._selType == 1 /* Normal */ ? game.FACE_NUM : game.VIP_FACE_NUM;
                    for (var i = 1; i <= cnt; i++) {
                        var item = {
                            type: this._selType,
                            idx: i,
                        };
                        items.push(item);
                    }
                    this._itemList.source = items;
                    var layout = new eui.TileLayout();
                    layout.verticalGap = 7;
                    layout.horizontalGap = this._selType == 1 /* Normal */ ? 1.5 : 10;
                    this._view.list_emoticon.layout = layout;
                };
                EmoticonMdr.prototype.isOpenVip = function () {
                    var cfg = game.getConfigByNameId("chat_limit.json" /* Chat */, this._chatChannel);
                    return game.RoleVo.ins.vip_lv >= cfg.vip_index;
                };
                return EmoticonMdr;
            }(game.MdrBase));
            chat.EmoticonMdr = EmoticonMdr;
            __reflect(EmoticonMdr.prototype, "game.mod.chat.EmoticonMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var RoleSurfaceTipsMdr = /** @class */ (function (_super) {
                __extends(RoleSurfaceTipsMdr, _super);
                function RoleSurfaceTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", chat.RoleSurfaceTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RoleSurfaceTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.list_skill.itemRenderer = mod.ShenLingSkillIconTap;
                    this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
                };
                RoleSurfaceTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_skill, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);
                };
                RoleSurfaceTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateShenling();
                };
                RoleSurfaceTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RoleSurfaceTipsMdr.prototype.onClickSkill = function (e) {
                    var sData = e.currentTarget.data;
                    var data = {
                        index: this._index,
                        skill_index: sData.skill_index,
                        skill_type: 3 /* PuGong */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                RoleSurfaceTipsMdr.prototype.onClickTalent = function (e) {
                    var sData = e.item;
                    var data = {
                        index: this._cfg.index,
                        skill_index: sData.skill_index,
                        skill_type: 4 /* Talent */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                RoleSurfaceTipsMdr.prototype.updateShow = function () {
                    var index = this._showArgs.index;
                    var info = this._showArgs.info;
                    var roleInfo = info.check_role;
                    this._index = index;
                    var headType = game.PropData.getPropParse(index, 1 /* Type */);
                    this._headType = headType;
                    var propData = game.PropData.create(index);
                    this._view.baseQualityTips.updateShow(propData.quality);
                    this._view.head.updateShow(roleInfo.head, roleInfo.head_frame, roleInfo.sex, roleInfo.vip);
                    this._view.lab_name.text = roleInfo.name;
                    var totalPower = 0; //该类型外显总战力
                    var cnt = 0; //该类型外显总数量
                    var totalPowerStr = "";
                    var cntStr = "";
                    var power; //玩家该外显的战力
                    var god; //玩家该外显的仙力
                    if (headType == 400 /* Shenling */) {
                        var cfg = propData.cfg;
                        var type = cfg.type;
                        var shenlingInfo = this.getShenlingTypeInfo(type);
                        for (var _i = 0, _a = shenlingInfo.list; _i < _a.length; _i++) {
                            var perInfo = _a[_i];
                            var perPower = perInfo.attrs.showpower && perInfo.attrs.showpower.toNumber() || 0;
                            totalPower += perPower;
                        }
                        var typename = game.getLanById(game.ShenlingTypeName[type]);
                        totalPowerStr = typename + game.getLanById("shenling_power" /* shenling_power */) + "：" + game.StringUtil.getHurtNumStr(totalPower);
                        cnt = shenlingInfo.list && shenlingInfo.list.length || 0;
                        cntStr = typename + game.getLanById("shenling_count" /* shenling_count */) + "：" + cnt;
                        var curShenlingInfo = this.getCurShenlingInfo(shenlingInfo);
                        power = curShenlingInfo && curShenlingInfo.attrs && curShenlingInfo.attrs.showpower ? curShenlingInfo.attrs.showpower : 0;
                        god = curShenlingInfo && curShenlingInfo.attrs && curShenlingInfo.attrs.god ? curShenlingInfo.attrs.god : 0;
                    }
                    else {
                        //通用外显
                        var typeInfo = this.getTypeInfo(headType);
                        for (var _b = 0, _c = typeInfo.ride_list; _b < _c.length; _b++) {
                            var perInfo = _c[_b];
                            var perPower = perInfo.attr.showpower && perInfo.attr.showpower.toNumber() || 0;
                            totalPower += perPower;
                        }
                        totalPowerStr = game.getLanById(game.ConfigHeadToName[headType]) + game.getLanById("total_power" /* total_power */) + "：" + game.StringUtil.getHurtNumStr(totalPower);
                        cnt = typeInfo.ride_list && typeInfo.ride_list.length || 0;
                        cntStr = game.getLanById(game.ConfigHeadToName[headType]) + game.getLanById("count" /* count */) + "：" + cnt;
                        var curInfo = this.getCurInfo(typeInfo);
                        power = curInfo && curInfo.attr && curInfo.attr.showpower ? curInfo.attr.showpower : 0;
                        god = curInfo && curInfo.attr && curInfo.attr.god ? curInfo.attr.god : 0;
                    }
                    this._view.lab_power.text = totalPowerStr; //该类型外显总战力
                    this._view.lab_cnt.text = cntStr; //该类型外显总数量
                    this._view.power.setPowerValue(power); //玩家该外显的战力
                    this._view.baseSurfaceItem.updateShow(index, god, false, false); //玩家该外显的仙力
                };
                RoleSurfaceTipsMdr.prototype.getTypeInfo = function (headType) {
                    var info = this._showArgs.info;
                    var infos = info.sp_skill_info || [];
                    for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                        var perInfo = infos_1[_i];
                        if (perInfo.head_type == headType) {
                            return perInfo;
                        }
                    }
                    return null;
                };
                RoleSurfaceTipsMdr.prototype.getCurInfo = function (perInfo) {
                    for (var _i = 0, _a = perInfo.ride_list; _i < _a.length; _i++) {
                        var curInfo = _a[_i];
                        if (curInfo.index == this._index) {
                            return curInfo;
                        }
                    }
                    return null;
                };
                RoleSurfaceTipsMdr.prototype.getCurShenlingInfo = function (perInfo) {
                    for (var _i = 0, _a = perInfo.list; _i < _a.length; _i++) {
                        var curInfo = _a[_i];
                        if (curInfo.index.toNumber() == this._index) {
                            return curInfo;
                        }
                    }
                    return null;
                };
                RoleSurfaceTipsMdr.prototype.getShenlingTypeInfo = function (type) {
                    var info = this._showArgs.info;
                    var infos = info.shenling_list || [];
                    for (var _i = 0, infos_2 = infos; _i < infos_2.length; _i++) {
                        var perInfo = infos_2[_i];
                        if (perInfo.postype == type) {
                            return perInfo;
                        }
                    }
                    return null;
                };
                RoleSurfaceTipsMdr.prototype.updateShenling = function () {
                    if (this._headType != 400 /* Shenling */) {
                        this._view.currentState = "default";
                        return;
                    }
                    this._view.currentState = "shenling";
                    var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var cfg = _proxy.getShenLingCfg(this._index);
                    this._cfg = cfg;
                    this._view.img_type.source = "shuxingtubiao_" + cfg.type;
                    this._view.btn_skill.data = {
                        skill_index: cfg.common,
                        is_act: true,
                        skill_type: 3 /* PuGong */
                    };
                    var list = [];
                    for (var _i = 0, _a = cfg.talent1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        list.push({
                            skill_index: item[1],
                            is_act: true
                        });
                    }
                    this._listSkill.replaceAll(list);
                };
                return RoleSurfaceTipsMdr;
            }(game.EffectMdrBase));
            chat.RoleSurfaceTipsMdr = RoleSurfaceTipsMdr;
            __reflect(RoleSurfaceTipsMdr.prototype, "game.mod.chat.RoleSurfaceTipsMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var RoleTipsBattleMdr = /** @class */ (function (_super) {
                __extends(RoleTipsBattleMdr, _super);
                function RoleTipsBattleMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", chat.RoleTipsBattleView);
                    return _this;
                }
                RoleTipsBattleMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(35 /* Chat */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = chat.RoleTipsBattleRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                RoleTipsBattleMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                };
                RoleTipsBattleMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateModel();
                    this.updateItemList();
                };
                RoleTipsBattleMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RoleTipsBattleMdr.prototype.onClickItem = function (e) {
                    var data = e.item;
                    if (!data) {
                        return;
                    }
                    var index = data.cur_ride;
                    if (!index) {
                        return;
                    }
                    facade.showView("25" /* Chat */, "07" /* RoleSurfaceTips */, { index: index, info: this._proxy.lookInfo });
                };
                /**------------------------模型-----------------------------*/
                RoleTipsBattleMdr.prototype.updateModel = function () {
                    var info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
                    if (!info) {
                        return;
                    }
                    this.updateRankUIRole(this._view.gr_eft, info);
                    var index = info.title_index && info.title_index.toNumber() || 0;
                    if (index) {
                        this.addEftByParent(game.ResUtil.getTitleSrc(index), this._view.gr_eft, 0, -480);
                    }
                };
                /**------------------------外显-----------------------------*/
                RoleTipsBattleMdr.prototype.updateItemList = function () {
                    var datas = [];
                    var infos = this._proxy.lookInfo && this._proxy.lookInfo.sp_skill_info || [];
                    for (var _i = 0, infos_3 = infos; _i < infos_3.length; _i++) {
                        var info = infos_3[_i];
                        var headType = info.head_type;
                        if (headType == 640 /* Tianshen */ || headType == 409 /* Huashen */) {
                            continue; //过滤元灵，元灵没有幻化，化神也不显示
                        }
                        datas.push(info);
                    }
                    // datas.push(null);//格子需要预留至少两个
                    // datas.push(null);
                    this._itemList.source = datas;
                };
                return RoleTipsBattleMdr;
            }(game.EffectMdrBase));
            chat.RoleTipsBattleMdr = RoleTipsBattleMdr;
            __reflect(RoleTipsBattleMdr.prototype, "game.mod.chat.RoleTipsBattleMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var RoleTipsMainMdr = /** @class */ (function (_super) {
                __extends(RoleTipsMainMdr, _super);
                function RoleTipsMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "chat_role_1",
                            mdr: chat.RoleTipsMdr,
                            title: "chat_role_tips_tab1" /* chat_role_tips_tab1 */,
                            bg: "",
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "chat_role_2",
                            mdr: chat.RoleTipsBattleMdr,
                            title: "chat_role_tips_tab1" /* chat_role_tips_tab1 */,
                            bg: "chat_bg2",
                        }
                    ];
                    return _this;
                }
                return RoleTipsMainMdr;
            }(mod.WndSecondMainMdr));
            chat.RoleTipsMainMdr = RoleTipsMainMdr;
            __reflect(RoleTipsMainMdr.prototype, "game.mod.chat.RoleTipsMainMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var chat;
        (function (chat) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var Tween = base.Tween;
            var friend_add_data = msg.friend_add_data;
            var RoleTipsMdr = /** @class */ (function (_super) {
                __extends(RoleTipsMdr, _super);
                function RoleTipsMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", chat.RoleTipsView);
                    return _this;
                }
                RoleTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(35 /* Chat */);
                    this._friendProxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    this._itemList = new ArrayCollection();
                    this._view.shenling.list_item.itemRenderer = mod.AvatarItem;
                    this._view.shenling.list_item.dataProvider = this._itemList;
                    this._equipList = new ArrayCollection();
                    this._view.equip.list_equip.itemRenderer = mod.IconEquip;
                    this._view.equip.list_equip.dataProvider = this._equipList;
                    this._skillList = new ArrayCollection();
                    this._view.skill.list_skill.itemRenderer = mod.SkillItemRender;
                    this._view.skill.list_skill.dataProvider = this._skillList;
                    this._otherSkillList = new ArrayCollection();
                    this._view.otherSkill.list_skill.itemRenderer = mod.BattleSkillItemRender;
                    this._view.otherSkill.list_skill.dataProvider = this._otherSkillList;
                };
                RoleTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_black, TouchEvent.TOUCH_TAP, this.onClickBlack);
                    addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onClickNext);
                    addEventListener(this._view.shenling.list_item, ItemTapEvent.ITEM_TAP, this.onClickShenling);
                    addEventListener(this._view.equip.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickEquip);
                    addEventListener(this._view.skill.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
                    this.onNt("on_chat_black_update" /* ON_CHAT_BLACK_UPDATE */, this.updateBtn, this);
                };
                RoleTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateRoleInfo();
                    this.updateBtn();
                    this.updateShenling();
                    this.updateEquip();
                    this.updateSkill();
                    this.updateOtherSkill();
                };
                RoleTipsMdr.prototype.onHide = function () {
                    Tween.remove(this._view.scr.viewport);
                    _super.prototype.onHide.call(this);
                };
                RoleTipsMdr.prototype.onClickAdd = function () {
                    var info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
                    if (!info) {
                        return;
                    }
                    if (this._isFriend) {
                        //私聊
                        mod.ViewMgr.getIns().chat(info.role_id);
                    }
                    else {
                        //添加
                        var friendInfo = new friend_add_data();
                        friendInfo.role_id = info.role_id;
                        friendInfo.server_id = info.server_id;
                        this._friendProxy.c2s_friend_apply([friendInfo]);
                    }
                };
                RoleTipsMdr.prototype.onClickBlack = function () {
                    var info = this._proxy.lookInfo.check_role;
                    this._proxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
                };
                RoleTipsMdr.prototype.onClickNext = function () {
                    mod.ScrollUtil.moveV(this._view.scr, 2);
                };
                /**------------------------基础信息-----------------------------*/
                RoleTipsMdr.prototype.updateRoleInfo = function () {
                    var info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
                    if (!info) {
                        return;
                    }
                    this._view.btn_god.updateGod(info.god.toNumber(), false);
                    this._view.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    this._view.power.setPowerValue(info.showpower);
                    this._view.lab_name.text = info.name;
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this._view.lab_guild.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                    this._view.lab_rebirth.text = mod.RoleUtil.getRebirthName(info.reincarnate.toNumber());
                    var teamName = info.team_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this._view.lab_team.text = game.getLanById("zhandui_tips1" /* zhandui_tips1 */) + "：" + teamName;
                };
                RoleTipsMdr.prototype.updateBtn = function () {
                    var info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
                    if (!info) {
                        return;
                    }
                    var isSelf = info && info.role_id && info.role_id.eq(game.RoleVo.ins.role_id);
                    if (isSelf) {
                        //玩家自己
                        this._view.btn_add.visible = this._view.btn_black.visible = false;
                    }
                    else {
                        this._view.btn_add.visible = true;
                        this._isFriend = this._friendProxy.isFriend(info.role_id);
                        this._view.btn_add.icon = this._isFriend ? "siliaotubiao" : "tianjiahaoyoutubiao"; //好友或私聊
                        this._view.btn_black.visible = !this._proxy.isBlackUser(info.role_id);
                    }
                };
                /**------------------------神灵-----------------------------*/
                RoleTipsMdr.prototype.updateShenling = function () {
                    var infos = this._proxy.lookInfo && this._proxy.lookInfo.shenling_list || [];
                    var datas = [];
                    for (var _i = 0, infos_4 = infos; _i < infos_4.length; _i++) {
                        var info = infos_4[_i];
                        var idx = info.upindex;
                        var cfg = game.getConfigById(idx.toString());
                        var star = 0;
                        var evolution = 0; //进化神灵的进化次数或修仙女仆幻化等级
                        for (var _a = 0, _b = info.list; _a < _b.length; _a++) {
                            var starInfo = _b[_a];
                            if (starInfo.index.eq(idx)) {
                                star = starInfo.star;
                                evolution = starInfo.evolutions;
                                break;
                            }
                        }
                        datas.push({ cfg: cfg, star: star, isBattle: false, showHint: false, evolution: evolution });
                    }
                    this._itemList.source = datas;
                };
                RoleTipsMdr.prototype.onClickShenling = function (e) {
                    var data = e.item;
                    facade.showView("25" /* Chat */, "07" /* RoleSurfaceTips */, { index: data.cfg.index, info: this._proxy.lookInfo });
                };
                /**------------------------装备-----------------------------*/
                RoleTipsMdr.prototype.updateEquip = function () {
                    var datas = [];
                    for (var i = 0; i < game.EquipPosAry.length; ++i) {
                        var pos = game.EquipPosAry[i];
                        var equip = this.getEquipByPos(pos);
                        var prop = equip ? equip : pos;
                        var data = this._equipList.source && this._equipList.source.length ? this._equipList.source[i] : {};
                        data.prop = prop;
                        datas.push(data);
                    }
                    this._equipList.source = datas;
                };
                RoleTipsMdr.prototype.getEquipByPos = function (pos) {
                    var infos = this._proxy.lookInfo && this._proxy.lookInfo.equips || [];
                    for (var _i = 0, infos_5 = infos; _i < infos_5.length; _i++) {
                        var info = infos_5[_i];
                        var prop = game.PropData.fromData(info);
                        if (prop.equipPos == pos) {
                            return prop;
                        }
                    }
                    return null;
                };
                RoleTipsMdr.prototype.onClickEquip = function (e) {
                    var data = e.item;
                    if (!data || typeof data.prop === 'number') {
                        return;
                    }
                    mod.ViewMgr.getIns().showRoleEquipTips(data.prop);
                };
                /**------------------------仙法-----------------------------*/
                RoleTipsMdr.prototype.updateSkill = function () {
                    var datas = [];
                    var skills = this._proxy.lookInfo && this._proxy.lookInfo.godallskill || [];
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var info = skills_1[_i];
                        var skillId = info.index;
                        var isAct = skillId > 0;
                        var skillData = {
                            skillId: skillId,
                            isAct: isAct,
                            lockStr: "suotou2",
                            bgStr: "common_skill_bg",
                            level: info.lv
                        };
                        datas.push(skillData);
                    }
                    this._skillList.source = datas;
                };
                RoleTipsMdr.prototype.onClickSkill = function (e) {
                    var data = e.item;
                    var skillId = data.skillId;
                    if (!skillId) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSkillNormalTips(skillId, data.level, true);
                };
                /**------------------------其他技能-----------------------------*/
                RoleTipsMdr.prototype.updateOtherSkill = function () {
                    var datas = [];
                    var skills = this._proxy.lookInfo && this._proxy.lookInfo.sp_skill_info || [];
                    for (var _i = 0, skills_2 = skills; _i < skills_2.length; _i++) {
                        var info = skills_2[_i];
                        var headType = info.head_type;
                        if (headType == 405 /* Body */ || headType == 409 /* Huashen */) {
                            continue; //过滤时装，时装没有技能，化神也不显示
                        }
                        var skillId = mod.SurfaceUtil.getSurfaceSkillId(headType); //技能id取配置
                        var lv = info.level;
                        var stage = mod.SurfaceUtil.calcSurfaceStage(lv, headType);
                        var skillData = {
                            skillId: skillId,
                            lv: stage,
                            hideTips: true,
                            imgTag: "tag_" + headType
                        };
                        datas.push(skillData);
                    }
                    this._otherSkillList.source = datas;
                };
                return RoleTipsMdr;
            }(game.MdrBase));
            chat.RoleTipsMdr = RoleTipsMdr;
            __reflect(RoleTipsMdr.prototype, "game.mod.chat.RoleTipsMdr");
        })(chat = mod.chat || (mod.chat = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=chat.js.map