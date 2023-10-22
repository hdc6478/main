namespace game.mod.chat {

    import LanDef = game.localization.LanDef;
    import ChatLimitConfig = game.config.ChatLimitConfig;
    import facade = base.facade;

    export class ChatMainMdr extends WndBaseMdr {
        private _proxy: ChatProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Chat);
            this.initBtnData();
        }

        private initBtnData(): void {
            this._btnData = [
                {
                    btnType: ChatMainBtnType.Cross,
                    icon: "chat_tab1_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    param: ChatChannel.Cross
                },
                {
                    btnType: ChatMainBtnType.Local,
                    icon: "chat_tab2_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    param: ChatChannel.Local
                },
                {
                    btnType: ChatMainBtnType.Private,
                    icon: "chat_tab3_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    hintTypes: [ModName.Chat, ChatViewType.ChatMain + ChatMainBtnType.Private],
                    param: ChatChannel.Private
                },
                {
                    btnType: ChatMainBtnType.Union,
                    icon: "chat_tab4_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    param: ChatChannel.Union
                },
                {
                    btnType: ChatMainBtnType.Zhandui,
                    icon: "chat_tab5_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    param: ChatChannel.Zhandui,
                },
                {
                    btnType: ChatMainBtnType.System,
                    icon: "chat_tab6_",
                    mdr: ChatMdr,
                    title: LanDef.chat_tips1,
                    param: ChatChannel.System
                }
            ];
            for(let btnData of this._btnData){
                let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, btnData.param);
                btnData.openIdx = cfg.open_id;
            }
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            let chatChannel = data.param;//聊天频道
            if(chatChannel == ChatChannel.Union){
                //加入仙宗后开启
                let unionProxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
                if(!unionProxy.isInUnion){
                    PromptBox.getIns().show(getLanById(LanDef.chat_open_tips1));
                    return false;
                }
            }
            else if(chatChannel == ChatChannel.Zhandui){
                //加入战队后开启
                let zhanduiProxy: IZhanduiProxy = facade.retMod(ModName.More).retProxy(ProxyType.Zhandui);
                if(!zhanduiProxy.haveTeam()){
                    PromptBox.getIns().show(getLanById(LanDef.chat_open_tips2));
                    return false;
                }
            }
            let isOpen = !data.openIdx || ViewMgr.getIns().checkViewOpen(data.openIdx,true);
            if(isOpen){
                this._proxy.chatChannel = chatChannel;
            }
            return isOpen;
        }

        protected onHide() {
            super.onHide();
        }

    }
}