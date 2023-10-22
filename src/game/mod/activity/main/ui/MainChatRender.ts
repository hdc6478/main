namespace game.mod.activity {

    import facade = base.facade;
    import TextEvent = egret.TextEvent;

    export class MainChatRender extends BaseRenderer {
        public img_type: eui.Image;
        public grp_vip: eui.Group;
        public lab_txt: eui.Label;

        public data: ChatInfoListData;
        private _proxy: IChatProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            this.addEventListenerEx(TextEvent.LINK, this.lab_txt, this.onTapLink, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let data = this.data;
            let info = data.senderInfo;
            let chatChannel = data.chatChannel;
            this.img_type.source = "chat_type" + chatChannel;

            let startStr = "";
            let vipWidth = 0;
            let vipLv = info.vip ? VipUtil.getShowVipLv(info.vip) : 0;
            if(vipLv){
                //存在VIP时
                let vipStr = VipUtil.getVipFont(info.vip);
                this.addBmpFont(vipStr, BmpTextCfg[BmpTextType.VipChatFont], this.grp_vip);
                vipWidth = vipStr.length * 20;//文本宽度20+间隔10
                let num = Math.ceil(vipWidth / 6);//6是空格宽度，不同平台可能不一样
                while (num){
                    startStr += " ";
                    num--;
                }
            }
            else {
                this.clearFont(this.grp_vip);
            }

            let txtStr = "";
            if(info && info.name){
                txtStr += info.name + "：";
            }
            txtStr += data.type == ChatType.Face && data.imgSource ? "/表情" : (data.content || "");
            let finalStr = startStr + txtStr;
            this.lab_txt.textFlow = TextUtil.parseHtml(finalStr);
            if(!this._proxy.openChat && this.lab_txt.numLines > 1){
                let endPos = vipWidth ? 28 - Math.floor(vipWidth / this.lab_txt.size) : 28;//文本剪切到28
                let str = txtStr.slice(0,endPos);
                txtStr = str + "...";
                finalStr = startStr + txtStr;
                this.lab_txt.textFlow = TextUtil.parseHtml(finalStr);
            }
        }

        private onTapLink(e: egret.TextEvent) {
            if(!this.data){
                return;
            }
            this._proxy.onClickChatLink(this.data, e.text);
        }
    }
}