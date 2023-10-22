namespace game.mod.chat {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TitleConfig = game.config.TitleConfig;
    import TextEvent = egret.TextEvent;
    import Point = egret.Point;
    import ParamConfig = game.config.ParamConfig;

    export class ChatRender extends BaseListenerRenderer {
        public lab_name: eui.Label;
        public grp_content: eui.Group;
        public img_di: eui.Image;
        public img_chatFrame: eui.Image;
        public img_emo: eui.Image;
        public lab_txt: eui.Label;
        public head: HeadVip;

        public data: ChatInfoListData;
        private _proxy: ChatProxy;
        private _isSelf: boolean;//是否自己聊天信息
        private _isSystem: boolean;//是否系统公告

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            this.addEventListenerEx(TextEvent.LINK, this.lab_txt, this.onTapLink, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let data = this.data;
            let info = data.senderInfo;
            let isSelf = info && info.role_id && info.role_id.eq(RoleVo.ins.role_id);
            this._isSelf = isSelf;
            this.currentState = isSelf ? "right" : "left";

            let chatChannel = data.chatChannel;
            this._isSystem = chatChannel == ChatChannel.System;//系统公告
            if(this._isSystem){
                //系统公告显示仙界信使头像，不显示VIP和名字
                let pCfg: ParamConfig = GameConfig.getParamConfigById("liaotianzhuangban_xitong");
                let systemInfo: number[] = pCfg && pCfg.value;//头像ID、相框ID、性别1男2女
                this.head.updateName(systemInfo[0], systemInfo[1], systemInfo[2], "chat_system_name");
                this.lab_name.text = "";
            }
            else {
                this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                let reincarnate = info.reincarnate ? info.reincarnate.toNumber() : 0;
                let nameStr = "[" + RoleUtil.getRebirthName(reincarnate) + "]" + info.name;
                let titleIndex = info.title_index ? info.title_index.toNumber() : 0;
                if(titleIndex){
                    let titleCfg: TitleConfig = getConfigByNameId(ConfigName.Title, titleIndex);
                    nameStr += TextUtil.addColor("[" + titleCfg.name + "]", ColorUtil.getColorByQuality1(titleCfg.quality));
                }
                this.lab_name.textFlow = TextUtil.parseHtml(nameStr);
            }

            //聊天框，系统公告不用聊天框
            let chatFrame = info && info.chat_frame ? info.chat_frame.toNumber() : 0;
            this.img_chatFrame.visible = !!chatFrame;
            this.img_di.visible = !chatFrame;
            if(this.img_chatFrame.visible){
                this.img_chatFrame.source = ResUtil.getDressUpIcon(chatFrame, info.sex);
            }

            //文本显示
            this.lab_txt.textFlow = TextUtil.parseHtml(data.content || "");

            //表情
            this.img_emo.source = data.imgSource && data.imgSource.trim() != "" ? data.imgSource : "";
        }

        private onClickHead(): void {
            if(!this.data){
                return;
            }
            if(this._isSystem){
                return;//系统公告不给点击头像
            }
            let data = this.data;
            let info = data.senderInfo;
            if(this._isSelf){
                //玩家自己，直接弹窗人物信息
                ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
                return;
            }
            let headStagePt: Point = this.head.localToGlobal();//转过去的是全局坐标
            let point: Point = new Point(headStagePt.x + this.head.width / 2, headStagePt.y + this.head.height / 2);
            egret.callLater(() => {
                facade.showView(ModName.Chat, ChatViewType.ChatCheck, {info, point});
            }, this);

        }

        private onTapLink(e: egret.TextEvent) {
            if(!this.data){
                return;
            }
            this._proxy.onClickChatLink(this.data, e.text);
        }
    }
}