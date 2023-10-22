namespace game.mod.chat {

    import GameNT = base.GameNT;
    import c2s_chat = msg.c2s_chat;
    import s2c_chat = msg.s2c_chat;
    import chat_info = msg.chat_info;
    import TimeMgr = base.TimeMgr;
    import c2s_chat_open_setting = msg.c2s_chat_open_setting;
    import c2s_chat_setting = msg.c2s_chat_setting;
    import c2s_chat_add_blackuser = msg.c2s_chat_add_blackuser;
    import s2c_chat_open_setting = msg.s2c_chat_open_setting;
    import s2c_click_hyperlink = msg.s2c_click_hyperlink;
    import c2s_click_hyperlink = msg.c2s_click_hyperlink;
    import LanDef = game.localization.LanDef;
    import c2s_chat_del_blackuser = msg.c2s_chat_del_blackuser;
    import s2c_chat_open_blacklist = msg.s2c_chat_open_blacklist;
    import c2s_chat_look_user = msg.c2s_chat_look_user;
    import s2c_chat_showpower_check_info = msg.s2c_chat_showpower_check_info;
    import s2c_chat_look_user = msg.s2c_chat_look_user;
    import Handler = base.Handler;
    import teammate = msg.teammate;
    import c2s_chat_open_blacklist = msg.c2s_chat_open_blacklist;
    import c2s_private_chat = msg.c2s_private_chat;
    import c2s_get_private_chat = msg.c2s_get_private_chat;
    import s2c_private_chat = msg.s2c_private_chat;
    import private_chat_struct = msg.private_chat_struct;
    import c2s_read_private_chat = msg.c2s_read_private_chat;
    import s2c_private_chat_update = msg.s2c_private_chat_update;
    import c2s_private_chat_role_online_status = msg.c2s_private_chat_role_online_status;
    import s2c_private_chat_role_online_status = msg.s2c_private_chat_role_online_status;
    import facade = base.facade;
    import c2s_guild_chat_tips_text = msg.c2s_guild_chat_tips_text;
    import s2c_guild_chat_tips_text = msg.s2c_guild_chat_tips_text;
    import ChatLimitConfig = game.config.ChatLimitConfig;

    export class ChatProxy extends ProxyBase implements IChatProxy {
        private _model: ChatModel;

        public initialize() {
            this._model = new ChatModel();

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
        }

        public onStartReconnect(): void {
            super.onStartReconnect();

            this._model.clearData();
        }

        public c2s_chat(chatChannel: number, content: string, idx?: number) {
            let msg = new c2s_chat();
            msg.channel_type = chatChannel;
            msg.content = content;
            msg.quick_speak_idx = idx;
            this.sendProto(msg);
        }

        private s2c_chat(n: GameNT): void {
            let msg: s2c_chat = n.body;
            if (!msg || !msg.info) {
                return;
            }
            let isInit = !this._model.chatMap;//初始化
            for (let i of msg.info) {
                if (!i.content) {
                    continue;
                }
                this.onFormat(i, isInit);
            }
            // if(isInit){
            //     this.sendNt(ChatEvent.ON_CHAT_INIT);
            // }
            this.sendNt(ChatEvent.ON_CHAT_UPDATE);
        }

        /**
         * 处理返回的聊天信息
         */
        private onFormat(tNum: chat_info, isInit: boolean): void {
            let temp: ChatInfoListData = {};
            if (!tNum || !tNum.channel_type) {
                return;
            }

            let senderInfo: teammate = tNum.sender;
            temp.senderInfo = senderInfo;
            temp.chatChannel = tNum.channel_type;

            let isFace: boolean = this.checkIsFace(tNum.content);
            if (!isInit) {
                //更新下发
                //记录发送CD
                if (senderInfo && senderInfo.role_id && senderInfo.role_id.eq(RoleVo.ins.role_id)) {
                    if (isFace) {
                        this._model.chatEmojiCD[tNum.channel_type] = TimeMgr.time.serverTimeSecond;
                    } else {
                        this._model.chatCD[tNum.channel_type] = TimeMgr.time.serverTimeSecond;
                    }
                    this.sendNt(ChatEvent.ON_SEND_SUCCESS);
                }
            }
            this.setChatContent(temp, isFace, tNum.content);
            //聊天界面数据
            this.setChatInfoData(temp);

            if(temp.chatChannel == ChatChannel.System){
                //系统聊天另外走系统公告
                this._model.systemList.push(temp.contentSystem);
                if (this._model.systemList.length > CHAT_LIMIT) {
                    this._model.systemList.shift();
                }
            }
            else {
                //if(!isInit){
                    //主界面聊天信息
                    this.setMainChatList(temp);
                //}
            }
        }

        //判断是否是表情
        private checkIsFace(content: string): boolean {
            return content.indexOf("#f(") > -1;
        }

        //判断是否存在表情
        private checkFaceUrl(str: string): boolean {
            if (str.indexOf("1_") != -1) {
                if (Number(str.replace("1_", "")) <= FACE_NUM) {
                    return true;
                }
            } else {
                if (Number(str.replace("2_", "")) <= VIP_FACE_NUM) {
                    return true;
                }
            }
            return false;
        }

        private getPropName(idx: number, event?: string) {
            let propCfg = getConfigById(idx);
            if (!propCfg) {
                return "";
            }
            let name: string = propCfg.name;
            if(!event){
                //不添加超链接事件
                return TextUtil.addColor(name, ColorUtil.getColorByQuality2(propCfg.quality));
            }
            return TextUtil.addLinkHtmlTxt(name, ColorUtil.getColorByQuality1(propCfg.quality), event);
        }

        //数据转化
        private setChatContent(temp: ChatInfoListData, isFace: boolean, content: string): void {
            if (isFace) {
                //表情
                let _imgUrl = content.replace("#f(", "").replace(")", "");
                if (this.checkFaceUrl(_imgUrl)) {
                    temp.imgSource = ResUtil.getUiFace(_imgUrl);
                    temp.type = ChatType.Face;
                } else {
                    temp.content = StringUtil.replaceColorCode(content, true);
                    temp.type = ChatType.Normal;
                }
                return;//直接返回
            }
            let chatChannel = temp.chatChannel;
            if (chatChannel == ChatChannel.Private) {
                //私聊不转换超链接
                temp.content = content;
                return;//直接返回
            }
            let isSystem = chatChannel == ChatChannel.System;//是否系统公告
            this.decodeContent(temp, content, isSystem);
        }

        //解析聊天文本
        private decodeContent(temp: ChatInfoListData, content: string, isSystem?: boolean): void {
            let eventIdx: number = 1;
            let eventData: { [event: string]: [string[], ChatType] } = {};
            let mainTxt = content;//聊天信息文本
            let contentSystem = content;//主界面系统公共文本，不做超链接点击

            //超链接
            let linkArr: string[] = mainTxt.match(/#s\(.*?\)/g);
            if (linkArr) {
                for (let i: number = 0, l = linkArr.length; i < l; ++i) {
                    let event: string = eventIdx.toString();
                    let arr: string[] = linkArr[i].replace("#s(", "")
                        .replace(")", "").split(",");
                    eventData[event] = [arr, ChatType.Link];
                    mainTxt = mainTxt.replace(linkArr[i], TextUtil.addLinkHtmlTxt(arr[3], null, event));
                    if(isSystem){
                        contentSystem = contentSystem.replace(linkArr[i], arr[3]);//不做超链接点击
                    }
                    eventIdx++;
                }
            }

            //道具展示链接
            linkArr = mainTxt.match(/#prop\(.*?\)/g);
            if (linkArr) {
                for (let i: number = 0, l = linkArr.length; i < l; ++i) {
                    let event: string = eventIdx.toString();
                    let arr: string[] = linkArr[i].replace("#prop(", "")
                        .replace(")", "").split(",");
                    eventData[event] = [[arr[0]], ChatType.Show];//存道具ID就行了
                    mainTxt = mainTxt.replace(linkArr[i], this.getPropName(Number(arr[0]), event));
                    if(isSystem) {
                        contentSystem = contentSystem.replace(linkArr[i], this.getPropName(Number(arr[0])));//不做超链接点击
                    }
                    eventIdx++;
                }
            }

            //跳转链接
            linkArr = mainTxt.match(/#jump\(.*?\)/g);
            if (linkArr) {
                for (let i: number = 0, l = linkArr.length; i < l; ++i) {
                    let event: string = eventIdx.toString();
                    let arr: string[] = linkArr[i].replace("#jump(", "")
                        .replace(")", "").split(",");
                    eventData[event] = [[arr[0]], ChatType.Jump];//存跳转ID就行了
                    mainTxt = mainTxt.replace(linkArr[i], TextUtil.addLinkHtmlTxt(arr[1], null, event));
                    if(isSystem) {
                        contentSystem = contentSystem.replace(linkArr[i], arr[1]);//不做超链接点击
                    }
                    eventIdx++;
                }
            }
            temp.eventData = eventData;
            temp.content = mainTxt;
            if(isSystem){
                temp.contentSystem = contentSystem;
            }
        }

        //保存聊天信息
        private setChatInfoData(info: ChatInfoListData) {
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

            if (this._model.chatMap[info.chatChannel].length > CHAT_LIMIT) {
                this._model.chatMap[info.chatChannel].shift();
            }
        }

        //打开聊天按钮
        public set openChat(open: boolean){
            this._model.openChat = open;
        }
        public get openChat(): boolean{
            return this._model.openChat;
        }
        //保存信息到主界面显示
        private setMainChatList(info: ChatInfoListData): void {
            this._model.mainChatList.push(info);

            if(this._model.mainChatList.length > MAIN_CHAT_LIMIT){
                this._model.mainChatList.shift();
            }
        }
        //主界面聊天信息显示
        public get mainChatList(): ChatInfoListData[] {
            return this._model.mainChatList;
        }
        //主界面公告显示，外部表现后会删除对应的数据
        public get systemList(): string[] {
            return this._model.systemList;
        }

        public getChatInfoByChannel(chatChannel: ChatChannel): ChatInfoListData[] {
            if (!this._model.chatMap) {
                return [];
            }
            if (!this._model.chatMap[chatChannel]) {
                this._model.chatMap[chatChannel] = [];
            }
            let datas = this._model.chatMap[chatChannel];
            if(chatChannel == ChatChannel.System){
                return datas;//系统公吿不用过滤信息
            }
            let tmps: ChatInfoListData[] = [];
            let isHideLevel = this.isSettingSelected(ChatSettingType.Lv);
            let isHideVIP = this.isSettingSelected(ChatSettingType.Vip);
            let isHideStranger = this.isSettingSelected(ChatSettingType.Stranger);

            let roleVo = RoleVo.ins;
            let guildId = RoleUtil.getGuildId();
            let teamId = RoleUtil.getTeamId();
            let friendProxy: IFriendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);

            for (let info of datas) {
                let senderRoleId = info.senderInfo.role_id;
                let isSelf = senderRoleId && senderRoleId.eq(roleVo.role_id);//自己信息不用过滤
                if(!isSelf){
                    if (isHideLevel) {
                        //屏蔽200级以下发言
                        if (!info.senderInfo.level || info.senderInfo.level < CHAT_LIMIT_LEVEL) {
                            continue;
                        }
                    }
                    if (isHideVIP) {
                        //屏蔽VIP2以下发言
                        if (!info.senderInfo.vip || info.senderInfo.vip < CHAT_LIMIT_VIP) {
                            continue;
                        }
                    }
                    if (isHideStranger) {
                        //屏蔽陌生人发言，陌生人规则：非玩家自身好友，非宗门，非战队的玩家
                        let senderGuildId = info.senderInfo.guild_id;
                        let senderTeamId = info.senderInfo.team_id;
                        if(!friendProxy.isFriend(senderRoleId)
                            && !(senderGuildId && senderGuildId == guildId)
                            && !(senderTeamId && !senderTeamId.isZero() && teamId && teamId.eq(senderTeamId))){
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
        }

        public getChatCD(chatChannel: ChatChannel, roleId?: Long): number {
            if(roleId){
                let roleKey = roleId.toString();
                return this._model.chatPrivateCD[roleKey] || 0;
            }
            return this._model.chatCD[chatChannel] || 0;
        }

        //配置上的cd时间（从ChatMdr复制过来）
        public getCfgCD(chatChannel: ChatChannel, roleId?: Long): number {
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, chatChannel);
            let cfgCd = 0;
            let lv = RoleVo.ins.level;
            if (cfg && cfg.CD) {
                let i = 0;
                for (let len = cfg.CD.length; i < len; i++) {
                    if (lv < cfg.CD[i][0]) {
                        break;
                    }
                }
                cfgCd = cfg.CD[(i > 0 ? i - 1 : 0)][1];//取配置的CD
            }
            return cfgCd;
        }

        public getChatEmojiCD(chatChannel: ChatChannel, roleId?: Long): number {
            if(roleId){
                let roleKey = roleId.toString();
                return this._model.chatPrivateEmojiCD[roleKey] || 0;
            }
            return this._model.chatEmojiCD[chatChannel] || 0;
        }

        public get chatChannel(): number {
            return this._model.chatChannel;
        }

        public set chatChannel(type: number) {
            this._model.chatChannel = type;
        }

        /**
         * 点击链接触发
         * @param {game.mod.chat.ChatInfoListData} info 聊天数据
         * @param {string} event 链接绑定的事件
         */
        public onClickChatLink(info: ChatInfoListData, event: string) {
            let data: [string[], ChatType] = info.eventData[event];
            switch (data[1]) {
                case ChatType.Jump:
                    let jumpId = Number(data[0][0]);
                    ViewMgr.getIns().showViewByID(jumpId);
                    break;
                case ChatType.Show:
                    let index: number = Number(data[0][0]);
                    ViewMgr.getIns().showPropTips(index);
                    break;
                case ChatType.Link:
                    let arr: string[] = data[0];
                    let idx: number = Number(arr[0]);          //超链接index
                    let linkId: Long = Long.fromString(arr[1]);//超链接id
                    let channelId: number = Number(arr[2]);    // 聊天频道
                    let str: string = arr[4];                  // 字符串参数,后端使用  例如："1-2-3"  分隔符 "-"
                    let serverId = info.senderInfo && info.senderInfo.server_id;//可能不存在
                    this.click_link_c2s(idx, channelId, linkId, str, serverId, null);
                    break;
            }
        }

        private click_link_c2s(linkIdx: number, channelID: number, linkID: Long, str: string, severID: number, propIdx: number) {
            let msg: c2s_click_hyperlink = new c2s_click_hyperlink();
            msg.link_index = linkIdx;
            msg.str_agrs = str;
            msg.channel = channelID;
            msg.link_id = linkID;
            msg.prop_index = propIdx;
            msg.server_id = severID;
            this.sendProto(msg);
        }

        /** 点击超链接返回的跳转 */
        private s2c_click_hyperlink(n: GameNT) {
            let msg: s2c_click_hyperlink = n.body;
            if (msg.jump_id) {
                ViewMgr.getIns().showViewByID(msg.jump_id);
            }
        }

        /**------------------------聊天设置-----------------------------*/
        public c2s_chat_open_setting() {
            if (this._model.infos && this._model.infos.length) {
                return;//不重复请求
            }
            let msg = new c2s_chat_open_setting();
            this.sendProto(msg);
        }

        public c2s_chat_setting(type: number) {
            let msg = new c2s_chat_setting();
            msg.set_type = type;
            this.sendProto(msg);
        }

        private s2c_chat_open_setting(n: GameNT): void {
            let msg: s2c_chat_open_setting = n.body;
            if (!msg || !msg.settings) {
                return;
            }
            if (!this._model.infos || !this._model.infos.length) {
                this._model.infos = msg.settings;
            } else {
                for (let info of msg.settings) {
                    if (msg.type == ChatSettingRebackType.Update) {
                        let str = info.val ? LanDef.chat_cue2 : LanDef.chat_cue1;
                        PromptBox.getIns().show(getLanById(str));
                    }

                    let pos = this.getInfoPos(info.set_type);
                    if (pos >= 0) {
                        this._model.infos[pos] = info;
                    } else {
                        this._model.infos.push(info);
                    }
                }
            }

            this.sendNt(ChatEvent.ON_CHAT_SETTING_UPDATE);
        }

        private getInfoPos(type: number): number {
            if (!this._model.infos || !this._model.infos.length) {
                return -1;
            }
            let len = this._model.infos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.infos[i];
                if (info.set_type == type) {
                    return i;
                }
            }
            return -1;
        }

        public isSettingSelected(type: number): boolean {
            let pos = this.getInfoPos(type);
            if (pos < 0) {
                return false;
            }
            let info = this._model.infos[pos];
            return info && !!info.val;
        }

        public get settingTime(): number {
            return this._model.settingTime;
        }
        public set settingTime(time: number) {
            this._model.settingTime = time;
        }

        /**------------------------黑名单-----------------------------*/
        public c2s_chat_add_blackuser(serverId: number, roleId: Long, isRobot: number) {
            let msg = new c2s_chat_add_blackuser();
            msg.server_id = serverId;
            msg.role_id = roleId;
            msg.is_robot = isRobot;
            this.sendProto(msg);
        }

        public c2s_chat_del_blackuser(roleId: Long) {
            let msg = new c2s_chat_del_blackuser();
            msg.role_id = roleId;
            this.sendProto(msg);
        }

        public c2s_chat_open_blacklist() {
            if (this._model.blackFlag) {
                return;
            }
            this._model.blackFlag = true;
            let msg = new c2s_chat_open_blacklist();
            this.sendProto(msg);
        }

        private s2c_chat_open_blacklist(n: GameNT): void {
            let msg: s2c_chat_open_blacklist = n.body;
            if (!msg || !msg.blackusers) {
                return;
            }
            if (msg.type == ChatBlackType.Open) {
                //打开界面
                this._model.blackInfos = msg.blackusers;
            } else {
                for (let info of msg.blackusers) {
                    if (msg.type == ChatBlackType.Delete) {
                        //删除黑名单
                        let pos = this.getBlackInfoPos(info.role_id);
                        if (pos >= 0) {
                            this._model.blackInfos.splice(pos, 1);//删除
                        }
                    }
                    else {
                        //添加黑名单
                        this.deletePrivateInfo(info.role_id, ChatPrivateDelType.Black);//添加黑名单时，清除私聊列表
                        this._model.blackInfos.push(info);
                    }
                }
            }

            this.sendNt(ChatEvent.ON_CHAT_BLACK_UPDATE);
        }

        public get blackInfos(): teammate[] {
            return this._model.blackInfos || [];
        }

        private getBlackInfoPos(roleId: Long): number {
            if (!this._model.blackInfos || !this._model.blackInfos.length) {
                return -1;
            }
            let len = this._model.blackInfos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.blackInfos[i];
                if (info.role_id.eq(roleId)) {
                    return i;
                }
            }
            return -1;
        }

        public isBlackUser(roleId: Long): boolean {
            let pos = this.getBlackInfoPos(roleId);
            return pos >= 0;
        }

        public onClickBlack(serverId: number, roleId: Long, isRobot: number): void {
            if (this.isBlackUser(roleId)) {
                //黑名单玩家，取消拉黑
                this.c2s_chat_del_blackuser(roleId);
            } else {
                //拉黑
                ViewMgr.getIns().showConfirm(getLanById(LanDef.chat_tips2), Handler.alloc(this, () => {
                    this.c2s_chat_add_blackuser(serverId, roleId, isRobot);
                }));
            }
        }

        /**------------------------战力比拼，查看玩家信息-----------------------------*/
        public c2s_chat_look_user(serverId: number, roleId: Long, isRobot: number, type: number) {
            let msg = new c2s_chat_look_user();
            msg.role_id = roleId;
            msg.server_id = serverId;
            msg.is_robot = isRobot;
            msg.request_type = type;
            this.sendProto(msg);
        }

        private s2c_chat_showpower_check_info(n: GameNT): void {
            let msg: s2c_chat_showpower_check_info = n.body;
            if (!msg || !msg.info) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Chat, ChatViewType.ChatCompete, msg);
        }

        private s2c_chat_look_user(n: GameNT): void {
            let msg: s2c_chat_look_user = n.body;
            if (!msg || !msg.is_success) {
                return;
            }
            this._model.lockInfo = msg;
            ViewMgr.getIns().showSecondPop(ModName.Chat, ChatViewType.RoleTipsMain);
        }

        public get lookInfo(): s2c_chat_look_user {
            return this._model.lockInfo;
        }

        /**------------------------私聊-----------------------------*/
        public c2s_private_chat(serverId: number, roleId: Long, content: string) {
            let msg = new c2s_private_chat();
            msg.server_id = serverId;
            msg.target_role_id = roleId;
            msg.content = content;
            this.sendProto(msg);
        }

        // 请求对方聊天信息，不能根据是否存在聊天信息去请求，应该由服务端返回的role_ids判断
        public c2s_get_private_chat(serverId: number, roleId: Long) {
            if(this.hasReqPrivate(roleId)){
                //只请求一次
                return;
            }
            let msg = new c2s_get_private_chat();
            msg.server_id = serverId;
            msg.target_role_id = roleId;
            this.sendProto(msg);
        }

        // 已读对方聊天信息
        public c2s_read_private_chat(serverId: number, roleId: Long) {
            if(!this.isNotReadPrivate(roleId)){
                //不在未读列表则不请求
                return;
            }
            let msg = new c2s_read_private_chat();
            msg.server_id = serverId;
            msg.target_role_id = roleId;
            this.sendProto(msg);
            this.setNotReadPrivate(roleId, true);
        }

        private s2c_private_chat(n: GameNT): void {
            let msg: s2c_private_chat = n.body;
            if (!msg) {
                return;
            }
            if(msg.target_role_id){
                // 自身请求过的玩家私聊
                let roleId = msg.target_role_id;
                this.clearChatPrivateInfoData(roleId);//返回聊天记录时候，清除聊天缓存
                if(!this.hasReqPrivate(roleId)){
                    let roleKey = roleId.toString();
                    this._model.reqPrivateList.push(roleKey);
                }
            }
            if (msg.infos) {
                //私聊记录处理
                for (let i of msg.infos) {
                    if (!i.content) {
                        continue;
                    }
                    this.onFormatPrivate(msg.target_role_id, i, true);
                }
                this.sendNt(ChatEvent.ON_CHAT_PRIVATE_UPDATE);
            }
        }

        private s2c_private_chat_update(n: GameNT): void {
            let msg: s2c_private_chat_update = n.body;
            if (!msg || !msg.all_infos) {
                return;
            }
            for (let updateInfo of msg.all_infos) {
                //updateInfo对应一个私聊玩家
                //如果该玩家不在私聊列表里面，则加进私聊列表
                let info = updateInfo.target_role;
                let privateInfo: ChatPrivateData = {
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

                if(!updateInfo.infos){
                    continue;
                }
                let isNotRead: boolean = false;//是否未读
                //服务端更新下发私聊信息，统一做数据更新
                for (let i of updateInfo.infos) {
                    if (!i.content) {
                        continue;
                    }
                    this.onFormatPrivate(info.role_id, i, false);

                    //私聊消息提示
                    //收到对方的私聊信息，将对方设置为未读对象
                    if(!isNotRead && info.role_id.neq(RoleVo.ins.role_id)){
                        isNotRead = true;
                        this.setNotReadPrivate(info.role_id);
                    }
                }
            }
            this.sendNt(ChatEvent.ON_CHAT_PRIVATE_UPDATE);
        }

        /**
         * 处理返回的私聊信息
         */
        private onFormatPrivate(roleId: Long, info: private_chat_struct, isInit: boolean): void {
            let temp: ChatInfoListData = {};

            let senderInfo: teammate = info.sender;
            temp.senderInfo = senderInfo;
            temp.chatChannel = ChatChannel.Private;

            let isFace: boolean = this.checkIsFace(info.content);
            if (!isInit) {
                //更新下发
                //记录发送CD
                if (senderInfo && senderInfo.role_id && senderInfo.role_id.eq(RoleVo.ins.role_id)) {
                    let roleKey = roleId.toString();
                    if (isFace) {
                        this._model.chatPrivateEmojiCD[roleKey] = TimeMgr.time.serverTimeSecond;
                    } else {
                        this._model.chatPrivateCD[roleKey] = TimeMgr.time.serverTimeSecond;
                    }
                    this.sendNt(ChatEvent.ON_SEND_SUCCESS);
                }
            }
            this.setChatContent(temp, isFace, info.content);
            //聊天界面数据
            this.setChatPrivateInfoData(roleId, temp);
            if(!isInit){
                this.setMainChatList(temp);//主界面聊天信息
            }
        }

        private setChatPrivateInfoData(roleId: Long, info: ChatInfoListData) {
            if (!this._model.chatPrivateMap) {
                this._model.chatPrivateMap = {};
            }
            let roleKey = roleId.toString();
            if (!this._model.chatPrivateMap[roleKey]) {
                this._model.chatPrivateMap[roleKey] = [];
            }
            this._model.chatPrivateMap[roleKey].push(info);

            if (this._model.chatPrivateMap[roleKey].length > CHAT_PRIVATE_LIMIT) {
                this._model.chatPrivateMap[roleKey].shift();
            }
        }

        //清除玩家私聊信息缓存，返回聊天记录时候调用
        private clearChatPrivateInfoData(roleId: Long) {
            let infos = this.getChatPrivateInfos(roleId);
            if (infos && infos.length) {
                let roleKey = roleId.toString();
                this._model.chatPrivateMap[roleKey] = [];
            }
        }

        //是否已经请求过私聊信息
        private hasReqPrivate(roleId: Long): boolean {
            let roleKey = roleId.toString();
            return this._model.reqPrivateList.indexOf(roleKey) > -1;
        }

        //私聊信息
        public getChatPrivateInfos(roleId: Long): ChatInfoListData[] {
            if (!roleId || !this._model.chatPrivateMap) {
                return [];
            }
            let roleKey = roleId.toString();
            if (!this._model.chatPrivateMap[roleKey]) {
                this._model.chatPrivateMap[roleKey] = [];
            }
            return this._model.chatPrivateMap[roleKey];
        }

        //私聊好友列表
        public getPrivateList(): ChatPrivateData[] {
            let info = RoleUtil.getBanlvInfo();
            if(info && info.role_id){
                //固定第一个是仙侣
                let pos = this.getPrivatePos(info.role_id);
                if(pos < 0){
                    this.setPrivateInfo(info, 0);
                }
            }
            return this._model.privateList;
        }

        //别人私聊你的时候，更新私聊列表
        private updatePrivateInfo(info: ChatPrivateData, startPos?: number): void {
            let pos = this.getPrivatePos(info.roleId);
            if(pos < 0){
                if(startPos == undefined){
                    this._model.privateList.push(info);
                }
                else {
                    this._model.privateList.splice(startPos,0, info);
                }
                this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_UPDATE);//添加时候刷新
            }
            else {
                // let oldIsOnline = this._model.privateList[pos].isOnline;
                this._model.privateList[pos] = info;
                // if(oldIsOnline != info.isOnline){
                //     this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_UPDATE);//在线状态变更刷新
                // }
                //在线状态变更时候不走这里，由客户端去请求对应的私聊列表玩家在线状态
            }
        }

        public setPrivateInfo(info: msg.friend_info | Long | msg.teammate, startPos?: number): void {
            if (info instanceof Long) {
                let friendProxy: IFriendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
                info = friendProxy.getFriendInfo(info);
            }
            if(!info){
                return;
            }
            let vip = (info instanceof msg.teammate) ? info.vip : info.vip_lv;
            let privateInfo: ChatPrivateData = {
                head: info.head,
                headFrame: info.head_frame,
                isOnline: info.is_online,
                name: info.name,
                roleId: info.role_id,
                serverId: info.server_id,
                sex: info.sex,
                vipIndex: vip
            };
            if(startPos == undefined){
                let info = RoleUtil.getBanlvInfo();
                startPos = info && info.role_id ? 1 : 0;//有仙侣时，存储在第二位
            }
            this.updatePrivateInfo(privateInfo, startPos);
            this.curPrivateInfo = privateInfo;
        }

        public set curPrivateInfo(info: ChatPrivateData) {
            this._model.curPrivateInfo = info;
        }
        public get curPrivateInfo(): ChatPrivateData {
            return this._model.curPrivateInfo;
        }

        //清除私聊列表
        //1、玩家手动关闭，仙侣不能手动关闭
        //2、添加黑名单，是仙侣的话不清除
        //3、删除好友，是仙侣的话不清除
        //4、解除仙侣时候
        public deletePrivateInfo(roleId: Long, type?: number): void {
            let pos = this.getPrivatePos(roleId);
            if(pos < 0){
                return;
            }
            if(type == ChatPrivateDelType.Black || type == ChatPrivateDelType.DelFriend){
                let info = RoleUtil.getBanlvInfo();
                if(info && info.role_id.eq(roleId)){
                    return;
                }
            }
            this._model.privateList.splice(pos, 1);
            if(this.curPrivateInfo && this.curPrivateInfo.roleId.eq(roleId)){
                this.curPrivateInfo = null;//清除当前聊天玩家
            }
            this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_UPDATE);
        }

        private getPrivatePos(roleId: Long): number {
            for (let i = 0; i < this._model.privateList.length; ++i){
                let privateInfo = this._model.privateList[i];
                if(privateInfo.roleId.eq(roleId)){
                    return i;
                }
            }
            return -1;
        }

        //将对方设置为已读或者未读对象，isDel：从未读列表中删除
        private setNotReadPrivate(roleId: Long, isDel?: boolean): void {
            let roleKey = roleId.toString();
            let pos = this._model.notReadPrivateList.indexOf(roleKey);
            if(pos < 0 && !isDel){
                this._model.notReadPrivateList.push(roleKey);
                this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_HINT);
            }
            if(pos >= 0 && isDel){
                this._model.notReadPrivateList.splice(pos, 1);
                this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_HINT);
            }
            //私聊提示
            this.updatePrivateHint();
        }

        //是否未读私聊信息
        public isNotReadPrivate(roleId: Long): boolean {
            let roleKey = roleId.toString();
            return this._model.notReadPrivateList.indexOf(roleKey) > -1;
        }

        /**更新红点*/
        private updatePrivateHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.ChatPrivate)){
                return;
            }
            let hint = this._model.notReadPrivateList && !!this._model.notReadPrivateList.length;//存在未读消息时，提示红点
            let hintType = [ModName.Chat, ChatViewType.ChatMain + ChatMainBtnType.Private];
            HintMgr.setHint(hint, hintType);
        }

        // 请求对方聊天信息，更新在线状态用
        public c2s_private_chat_role_online_status() {
            let privateList = this.getPrivateList();
            if(!privateList || !privateList.length){
                return;
            }
            let infos: teammate[] = [];
            for(let i of privateList){
                let info: teammate = new teammate();
                info.role_id = i.roleId;
                info.server_id = i.serverId;
                infos.push(info);
            }
            let msg = new c2s_private_chat_role_online_status();
            msg.infos = infos;
            this.sendProto(msg);
        }
        // 请求对方聊天信息返回
        private s2c_private_chat_role_online_status(n: GameNT): void {
            let msg: s2c_private_chat_role_online_status = n.body;
            if (!msg || !msg.infos) {
                return;
            }
            let privateList = this.getPrivateList();
            let hasUpdate = false;
            for(let i of msg.infos){
                for(let oldInfo of privateList){
                    if(i.role_id.eq(oldInfo.roleId)){
                        //更新当前玩家信息
                        if(i.is_online != oldInfo.isOnline){
                            oldInfo.isOnline = i.is_online;
                            hasUpdate = true;
                        }
                        break;
                    }
                }
            }
            if(hasUpdate){
                this.sendNt(ChatEvent.ON_CHAT_PRIVATE_LIST_INFO);
            }
        }

        /**------------------------私聊-----------------------------*/

        /**------------------------仙宗纪行-----------------------------*/
        public c2s_guild_chat_tips_text() {
            if(this._model.reqUnion){
                return;
            }
            let msg = new c2s_guild_chat_tips_text();
            this.sendProto(msg);
            this._model.reqUnion = true;
        }


        private s2c_guild_chat_tips_text(n: GameNT): void {
            let msg: s2c_guild_chat_tips_text = n.body;
            if(msg.oper == 1){
                //直接清空数据
                this._model.unionList = [];
            }
            if(msg.list){
                for(let info of msg.list){
                    this.onFormatUnion(info);
                }
            }
            this.sendNt(ChatEvent.ON_CHAT_UNION_UPDATE);
        }

        /**
         * 处理返回的仙宗行纪信息
        */
        private onFormatUnion(content: string): void {
            let temp: ChatInfoListData = {};
            this.decodeContent(temp, content);
            this._model.unionList.push(temp);
            if (this._model.unionList.length > CHAT_UNION_LIMIT) {
                this._model.unionList.shift();
            }
        }

        public get unionList(): ChatInfoListData[] {
            return this._model.unionList;
        }
        /**------------------------仙宗纪行-----------------------------*/
    }
}
