namespace game.mod.chat {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;

    import Point = egret.Point;
    import ChatLimitConfig = game.config.ChatLimitConfig;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import Event = egret.Event;

    export class EmoticonMdr extends MdrBase {

        private _view: EmoticonView = this.mark("_view", EmoticonView);
        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _proxy: ChatProxy;
        protected _showArgs: number;//聊天频道
        private _selType: number = ChatEmoticonType.Normal;//当前选中的按钮类型
        private _chatChannel: ChatChannel = ChatChannel.Cross;
        private _isPrivate: boolean = false;//当前是否私聊

        constructor() {
            super(Layer.tip);
        }

        protected onInit() {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.bottom = 224;

            //表情列表
            this._itemList = new ArrayCollection();
            this._view.list_emoticon.dataProvider = this._itemList;
            this._view.list_emoticon.itemRenderer = EmoticonRender;

            //按钮列表
            this._btnList = new ArrayCollection();
            this._view.list_btn.dataProvider = this._btnList;
            this._view.list_btn.itemRenderer = BtnTabItem;

            this._proxy = this.retProxy(ProxyType.Chat);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, Event.CHANGING, this.onClickBtn);
            addEventListener(this._view.list_emoticon, ItemTapEvent.ITEM_TAP, this.onClickEmoticon);
            egret.callLater(() => {
                addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onClickOther);
            }, this);
        }

        protected onShow(): void {
            super.onShow();

            this._chatChannel = this._showArgs;
            this._isPrivate = this._chatChannel == ChatChannel.Private;
            this.initTypeList();
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            this._selType = ChatEmoticonType.Normal;
            super.onHide();
        }

        private onClickBtn(e: Event): void {
            let type = this._view.list_btn.selectedIndex + 1;
            if(type == this._selType){
                return;
            }
            if (type == ChatEmoticonType.Vip && !this.isOpenVip()) {
                VipUtil.showTips();
                e.preventDefault();
                this.hide();
                return;
            }
            this._selType = type;
            this.typeUpdateInfo();
        }

        private onClickEmoticon(e: ItemTapEvent): void {
            //todo,频道限制
            if(this._chatChannel == ChatChannel.System){
                //系统频道无法发言
                PromptBox.getIns().show(getLanById(LanDef.chat_cue8));
                return;
            }
            //私聊限制
            if(this._isPrivate && !this._proxy.curPrivateInfo){
                PromptBox.getIns().show(getLanById(LanDef.chat_cue27));
                return;
            }

            //CD限制
            let roleId = this._isPrivate && this._proxy.curPrivateInfo ? this._proxy.curPrivateInfo.roleId : null;
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
            let cdTime: number = this._proxy.getChatEmojiCD(this._chatChannel, roleId);
            if (cfg && cdTime && TimeMgr.time.serverTimeSecond - cdTime < cfg.emoji_cd) {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.chat_cue18), [cfg.emoji_cd]));
                return;
            }
            let type = this._view.list_emoticon.selectedItem.type;//类型
            let idx = this._view.list_emoticon.selectedItem.idx;//id
            let faceName = type + "_" + idx;
            let content = "#f(" + faceName + ")";

            if(this._isPrivate){
                this._proxy.c2s_private_chat(this._proxy.curPrivateInfo.serverId, this._proxy.curPrivateInfo.roleId, content.trim());
            }
            else {
                this._proxy.c2s_chat(this._chatChannel, content.trim());
            }
            this.hide();
        }

        //判断是否超出表情选择框
        private onClickOther(e: egret.TouchEvent) {
            let viewStagePt: Point = this._view.localToGlobal();
            if (e.stageX < viewStagePt.x || e.stageX > viewStagePt.x + this._view.width || e.stageY < viewStagePt.y ||
                e.stageY > viewStagePt.y + this._view.height) {
                this.hide();
            }
        }

        private initTypeList(): void {
            let datas: BtnTabItemData[] = [];
            for(let i = ChatEmoticonType.Normal; i <= ChatEmoticonType.Vip; ++i){
                let name = getLanById("chat_emoticon" + i);
                datas.push({name: name});
            }
            this._btnList.source = datas;

            this._selType = ChatEmoticonType.Normal;
            this._view.list_btn.selectedIndex = this._selType - 1;
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
        }

        private updateItemList(): void {
            this._view.scr.stopAnimation();
            this._view.scr.viewport.scrollV = 0;
            let items: {type: number, idx: number}[] = [];
            let cnt = this._selType == ChatEmoticonType.Normal ? FACE_NUM : VIP_FACE_NUM;
            for (let i = 1; i <= cnt; i++) {
                let item = {
                    type: this._selType,
                    idx: i,
                };
                items.push(item);
            }
            this._itemList.source = items;
            let layout = new eui.TileLayout();
            layout.verticalGap = 7;
            layout.horizontalGap = this._selType == ChatEmoticonType.Normal ? 1.5 : 10;
            this._view.list_emoticon.layout = layout;
        }

        private isOpenVip(): boolean {
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
            return RoleVo.ins.vip_lv >= cfg.vip_index;
        }
    }
}
