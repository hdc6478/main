namespace game.mod.chat {

    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import Tween = base.Tween;
    import List = eui.List;
    import LinearLayoutBase = eui.LinearLayoutBase;
    import facade = base.facade;
    import ChatLimitConfig = game.config.ChatLimitConfig;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import TextEvent = egret.TextEvent;
    import UpdateItem = base.UpdateItem;

    export class ChatMdr extends EffectMdrBase implements UpdateItem{
        private _view: ChatView = this.mark("_view", ChatView);
        private _proxy: ChatProxy;
        private _chatChannel: ChatChannel = ChatChannel.Cross;
        private _itemList: ArrayCollection;
        private _txtList: ArrayCollection;
        private _moreList: ArrayCollection;
        private _privateList: ArrayCollection;
        private _unionList: ArrayCollection;
        private _isSendSuccess: boolean = false;//是否发送成功
        private readonly ITEM_H: number = 160;//item高度
        private readonly ITEM_N: number = 5;//item显示的数量
        private readonly ITEM_N_OTHER: number = 4;//item显示的数量，私聊和仙宗
        private readonly ITEM_H_UNION: number = 28;//item高度，仙宗纪行，实际上用不到，防止计算不到contentHeight用
        private _defaultTxtIdx: number;//快捷发言
        private _sendTime: number;//发送时间
        private _isOpen: boolean = false;//开启聊天
        private _isOpenTxt: boolean = false;//打开快捷语
        private _isOpenMore: boolean = false;//打开更多
        private _selIndex: number = 0;//私聊玩家下标
        private _selInfo: ChatPrivateData;//私聊玩家信息
        private _isPrivate: boolean = false;//当前是否私聊
        private _time: number = 0;//定时请求私聊玩家在线状态
        private readonly TIME_TICK: number = 3;//定时请求私聊玩家在线状态

        private _isUnion: boolean = false;//当前是否仙宗

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Chat);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = ChatRender;
            this._view.list.dataProvider = this._itemList;

            this._txtList= new ArrayCollection();
            this._view.list_txt.itemRenderer = ChatDefaultTxtRender;
            this._view.list_txt.dataProvider = this._txtList;

            this._moreList= new ArrayCollection();
            this._view.list_more.itemRenderer = ChatMoreBtn;
            this._view.list_more.dataProvider = this._moreList;

            this._privateList = new ArrayCollection();
            this._view.list_private.itemRenderer = ChatPrivateRender;
            this._view.list_private.dataProvider = this._privateList;

            this._unionList = new ArrayCollection();
            this._view.list_union.itemRenderer = ChatUnionRender;
            this._view.list_union.dataProvider = this._unionList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_more, TouchEvent.TOUCH_TAP, this.onClickMore);
            addEventListener(this._view.btn_face, TouchEvent.TOUCH_TAP, this.onClickFace);
            addEventListener(this._view.btn_send, TouchEvent.TOUCH_TAP, this.onClickSend);
            addEventListener(this._view.btn_txt, TouchEvent.TOUCH_TAP, this.onClickTxt);
            addEventListener(this._view.list_txt, ItemTapEvent.ITEM_TAP, this.onClickListTxt);
            addEventListener(this._view.list_more, ItemTapEvent.ITEM_TAP, this.onClickListMore);
            addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
            addEventListener(this._view.list_private, ItemTapEvent.ITEM_TAP, this.onClickPrivate);
            this.onNt(ChatEvent.ON_SEND_SUCCESS, this.onSendSuccess, this);
            this.onNt(ChatEvent.ON_CHAT_UPDATE, this.onChatUpdate, this);
            this.onNt(ChatEvent.ON_CHAT_SETTING_UPDATE, this.onChatHide, this);
            this.onNt(ChatEvent.ON_CHAT_BLACK_UPDATE, this.onChatHide, this);
            this.onNt(ChatEvent.ON_CHAT_PRIVATE_LIST_UPDATE, this.updatePrivateList, this);
            this.onNt(ChatEvent.ON_CHAT_PRIVATE_LIST_HINT, this.updatePrivateHint, this);
            this.onNt(ChatEvent.ON_CHAT_PRIVATE_LIST_INFO, this.updatePrivateInfo, this);
            this.onNt(ChatEvent.ON_CHAT_PRIVATE_UPDATE, this.onChatPrivateUpdate, this);
            this.onNt(ChatEvent.ON_CHAT_UNION_UPDATE, this.onChatUnionUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.setOpenTxt(false);
            this.updateDefaultTxt();
            this.setOpenMore(false);
            this.updateMoreList();

            this._proxy.c2s_chat_open_blacklist();//主动请求黑名单信息
        }

        protected onHide(): void {
            Tween.remove(this._view.scr.viewport);
            this._isSendSuccess = false;
            this._sendTime = 0;
            this._isOpen = false;
            this._defaultTxtIdx = 0;
            this._selIndex = 0;
            this._selInfo = null;
            this._itemList.removeAll();//关闭时候移除下数据，防止缓存影响滚动刷新
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private initShow(): void {
            this._chatChannel = this._proxy.chatChannel;
            this._isPrivate = this._chatChannel == ChatChannel.Private;
            this._isUnion = this._chatChannel == ChatChannel.Union;
            //默认或者私聊
            this._view.currentState = this._isPrivate ? "private" : (this._isUnion ? "union" : "default");
            if(this._isPrivate){
                this.updatePrivateList();
            }
            else {
                this.updateDefaultList();
            }

            if(this._isUnion){
                //请求仙宗纪行消息
                this._proxy.c2s_guild_chat_tips_text();
                this.updateUnionList();
            }
        }

        private onClickFace(): void {
            egret.callLater(() => {
                facade.showView(ModName.Chat, ChatViewType.Emoticon, this._chatChannel);
            }, this);
        }

        private onClickSend(): void {
            let content: string = this._view.input.text;

            if (content.indexOf("$") == 0 && DEBUG) {
                if(content.indexOf("client_jump") >= 0){
                    //测试跳转
                    let jumpIdx = parseInt(content.slice(13, content.length));
                    ViewMgr.getIns().showViewByID(jumpIdx);
                    return;
                }
                //发送gm命令
                let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                miscProxy.sendGM(content);
                return;
            }

            if(!this.canChat()){
                return;
            }
            if (!this.checkContentCanSend(content)) {
                //文本不符合规范
                return;
            }

            this._isSendSuccess = false;
            this._sendTime = TimeMgr.time.serverTimeSecond;

            if(this._isPrivate){
                this._proxy.c2s_private_chat(this._selInfo.serverId, this._selInfo.roleId, content.trim());
            }
            else {
                this._proxy.c2s_chat(this._chatChannel, content.trim());
            }
        }

        //是否可以聊天
        private canChat(): boolean {
            //todo,频道限制
            if(this._chatChannel == ChatChannel.System){
                //系统频道无法发言
                PromptBox.getIns().show(getLanById(LanDef.chat_cue8));
                return false;
            }

            //私聊限制
            if(this._isPrivate && !this._selInfo){
                PromptBox.getIns().show(getLanById(LanDef.chat_cue27));
                return false;
            }

            //CD限制
            let roleId = this._isPrivate && this._selInfo ? this._selInfo.roleId : null;
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
            let cdTime = this._proxy.getChatCD(this._chatChannel, roleId);
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
            if (cdTime && TimeMgr.time.serverTimeSecond - cdTime < cfgCd) {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.chat_cue7), [cfgCd]));
                return false;
            }

            //客户端额外CD限制，防止点击过快
            if (!this._isSendSuccess) {
                if (this._sendTime && TimeMgr.time.serverTimeSecond - this._sendTime < cfgCd + 1) {
                    PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.chat_cue7), [cfgCd]));
                    return false;
                }
            }

            //默认发言
            if(this._defaultTxtIdx){
                return true;
            }

            if(!this._isOpen){
                let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
                let limitLv = cfg.limits && cfg.limits[0] || 0;
                PromptBox.getIns().show(limitLv + "级才可以发言");
            }
            return this._isOpen;
        }
        //是否开启聊天
        private openChat(): boolean {
            //等级限制
            let lv = RoleVo.ins.level;
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
            let limitLv = cfg.limits && cfg.limits[0] || 0;
            if(lv >= limitLv){
                return true;
            }
            //VIP限制
            let vip = RoleVo.ins.vip_lv;
            let limitVip = cfg.limits[1];
            if(vip >= limitVip){
                return true;
            }
            //充值金额限制
            if(cfg.chargeMoney){
                let chargeRmb = RoleVo.ins.charge_rmb;
                if(chargeRmb >= cfg.chargeMoney){
                    return true;
                }
            }
            return false;
        }
        //文本是否符合规范
        private checkContentCanSend(_str: string): boolean {
            if (_str.trim() == "") {
                PromptBox.getIns().show("不能发送空消息!");
                return false;
            }
            if (_str.indexOf("<") != -1) {
                PromptBox.getIns().show("含有非法字符，无法发送!");
                return false;
            }
            return true;
        }

        private onSendSuccess() {
            this._isSendSuccess = true;
            this._view.input.text = "";
            this._defaultTxtIdx = 0;
        }

        private onChatUpdate() {
            //更新新消息
            if(!this._isPrivate){
                this.updateDefaultList(true);
            }
        }

        private onChatHide() {
            //屏蔽后刷新消息显示
            if(!this._isPrivate){
                this.updateDefaultList();
            }
        }

        private updateDefaultList(isUpdate?: boolean): void {
            let infos = this._proxy.getChatInfoByChannel(this._chatChannel).concat();
            this._view.grp_tips.visible = !infos.length;
            this.updateItemList(infos, isUpdate);
        }

        private updateItemList(infos: ChatInfoListData[], isUpdate?: boolean): void {
            this._view.scr.stopAnimation();
            this._view.scr.visible = !!infos.length;
            if(!this._view.scr.visible){
                return;//不显示的时候没必要滚动计算
            }

            let oldInfos = this._itemList.source.concat();
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }

            if(isUpdate){
                let viewport = this._view.scr.viewport as List;
                let gap: number = (viewport.layout as LinearLayoutBase).gap;
                let lastPos = oldInfos.length - 1;
                let lastScrollV = lastPos * this.ITEM_H + (lastPos - 1) * gap - viewport.height;
                if(viewport.scrollV < lastScrollV){
                    //旧消息长度有可能小于当前信息
                    return;//查看聊天记录时不滚动到最新
                }
            }
            let pos = infos.length - 1;
            let num = this._isPrivate || this._isUnion ? this.ITEM_N_OTHER : this.ITEM_N;
            if(pos >= num){
                //是否滚动到对应位置
                egret.callLater(() => {
                    ScrollUtil.moveVToAssign(this._view.scr, pos, this.ITEM_H, 10, 0, true);
                }, this)
            }
            else {
                this._view.scr.viewport.scrollV = 0;//默认初始位置
            }
        }
        /**------------------------快捷发言-----------------------------*/
        private onClickTxt(): void {
            this.setOpenTxt(!this._isOpenTxt);
        }

        private onClickListTxt(e: eui.ItemTapEvent) {
            let data = this._view.list_txt.selectedItem;
            if (!data){
                return;
            }
            this.setDefaultIdx(data);
            this.setOpenTxt(false);
        }

        private setOpenTxt(isOpen: boolean): void {
            this._isOpenTxt = isOpen;
            this._view.grp_txt.visible = this._isOpenTxt;
        }

        private updateDefaultTxt(): void {
            this._isOpen = this.openChat();
            this._view.btn_txt.visible = !this._isOpen && !this._isPrivate;
            if(this._view.btn_txt.visible){
                //未开启时，且不是私聊
                let infos = this.getDefaultTxtList();
                this._txtList.source = infos;
                let idx = Math.floor(Math.random() * 6) || 1;
                this.setDefaultIdx(idx);

                let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
                let limitLv = cfg.limits[0];
                let limitVip = cfg.limits[1];
                let vipStr = VipUtil.getVipStr(limitVip);
                this._view.lab_tip.text = StringUtil.substitute(getLanById(LanDef.chat_cue11), [limitLv, vipStr]);
            }
        }

        private getDefaultTxtList(): number[] {
            let infos: number[] = [];
            for(let i = 1; i <= CHAT_DEFAULT_NUM; ++i){
                infos.push(i);
            }
            return infos;
        }

        private setDefaultIdx(idx: number){
            this._defaultTxtIdx = idx;
            this._view.input.text = getLanById("chat_phrase" + idx);
        }

        /**------------------------更多-----------------------------*/
        private onClickMore(): void {
            this.setOpenMore(!this._isOpenMore);
        }

        private onClickListMore(e: eui.ItemTapEvent) {
            let data: string = this._view.list_more.selectedItem;
            if (!data){
                return;
            }
            switch (data) {
                case ChatMoreBtnType.Setting:
                    this.onClickSetting();
                    break;
                case ChatMoreBtnType.Black:
                    this.onClickBlack();
                    break;
                default:
                    PromptBox.getIns().show("敬请期待");
            }
            this.setOpenMore(false);
        }

        private setOpenMore(isOpen: boolean): void {
            this._isOpenMore = isOpen;
            this._view.grp_more.visible = this._isOpenMore;
        }

        private updateMoreList(): void {
            let infos: string[] = [ChatMoreBtnType.Setting, ChatMoreBtnType.Black, ChatMoreBtnType.RedPacket];
            this._moreList.source = infos;
        }

        private onClickSetting(): void {
            ViewMgr.getIns().showSecondPop(ModName.Chat, ChatViewType.ChatSetting);
        }

        private onClickBlack(): void {
            ViewMgr.getIns().showView(ModName.Friend, FriendViewType.FriendMain, FriendMainBtnType.Black);
        }

        /**------------------------私聊-----------------------------*/
        //跳转仙友
        private onClickGoto(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Friend);
        }

        private onClickPrivate(e: ItemTapEvent): void {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }
            this.updateSelIndex(index);
        }

        private updatePrivateList(): void {
            let infos = this._proxy.getPrivateList().concat();
            this._view.grp_tips_private.visible = !infos.length;
            if(this._view.grp_tips_private.visible){
                let gotoStr = this._view.lab_goto.text;
                this._view.lab_goto.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(gotoStr, WhiteColor.GREEN, ""));
            }

            this._view.scr_private.visible = !!infos.length;
            if(!this._view.scr_private.visible){
                //没有私聊列表时候，聊天列表也要隐藏
                this._view.scr.visible = false;
                TimeMgr.removeUpdateItem(this);
                return;
            }
            if(!TimeMgr.hasUpdateItem(this)){
                //添加定时器，请求对方私聊信息
                TimeMgr.addUpdateItem(this, 1000);
            }
            if(this._privateList.source.length){
                this._privateList.replaceAll(infos);
            }
            else {
                this._privateList.source = infos;
            }

            if(this._proxy.curPrivateInfo){
                //私聊跳转界面时候，选中私聊玩家
                for(let i = 0; i < infos.length; ++i){
                    let info = infos[i];
                    if(info.roleId.eq(this._proxy.curPrivateInfo.roleId)){
                        //选中
                        this.updateSelIndex(i);
                        break;
                    }
                }
            }
            else if(this._selIndex >= infos.length){
                //防止删除私聊时候，下标超出
                let index = Math.min(this._selIndex, infos.length - 1);
                this.updateSelIndex(index);
            }
            else {
                this.updateSelIndex(this._selIndex);
            }

            this._view.list_private.selectedIndex = this._selIndex;
        }

        //红点刷新
        private updatePrivateHint(): void {
            if(!this._view.scr_private.visible){
                return;
            }
            let infos = this._privateList.source;
            this._privateList.replaceAll(infos);
        }
        //在线状态刷新
        private updatePrivateInfo(): void {
            if(!this._view.scr_private.visible){
                return;
            }
            let infos = this._proxy.getPrivateList().concat();;
            this._privateList.replaceAll(infos);
        }

        private updateSelIndex(index: number): void {
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        private indexUpdateInfo(isUpdate?: boolean): void {
            let infos = this._proxy.getPrivateList().concat();
            this._selInfo = infos.length ? infos[this._selIndex] : null;
            this._proxy.curPrivateInfo = this._selInfo;
            let roleId = this._selInfo && this._selInfo.roleId;
            let chatInfos = this._proxy.getChatPrivateInfos(roleId).concat();
            // if(!chatInfos.length && this._selInfo){
            //没有私聊信息时候，请求历史私聊信息
            if(this._selInfo && !isUpdate){
                //请求历史私聊信息，非更新消息时候请求
                this._proxy.c2s_get_private_chat(this._selInfo.serverId, this._selInfo.roleId);
            }
            if(this._selInfo){
                //已读私聊信息
                this._proxy.c2s_read_private_chat(this._selInfo.serverId, this._selInfo.roleId);
            }
            this.updateItemList(chatInfos, isUpdate);
        }

        private onChatPrivateUpdate() {
            //更新新消息
            if(this._isPrivate){
                this.indexUpdateInfo(true);
            }
        }

        update(time: base.Time): void {
            this._time--;
            if (this._time <= 0) {
                this._proxy.c2s_private_chat_role_online_status();//定时请求对方私聊信息
                this._time = this.TIME_TICK;
            }
        }

        /**------------------------仙宗纪行-----------------------------*/
        private onChatUnionUpdate() {
            //更新新消息
            if(this._isUnion){
                this.updateUnionList();
            }
        }

        private updateUnionList(): void {
            let infos = this._proxy.unionList.concat();
            if(this._unionList.source.length){
                this._unionList.replaceAll(infos);
            }
            else {
                this._unionList.source = infos;
            }
            let pos = infos.length - 1;
            egret.callLater(() => {
                ScrollUtil.moveVToAssign(this._view.scr_union, pos, this.ITEM_H_UNION, 10, 0, true);
            }, this)

        }

    }
}