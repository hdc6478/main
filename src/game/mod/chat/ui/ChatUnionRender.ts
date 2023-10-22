namespace game.mod.chat {

    import facade = base.facade;
    import TextEvent = egret.TextEvent;

    export class ChatUnionRender extends BaseListenerRenderer {
        public lab_txt: eui.Label;

        public data: ChatInfoListData;
        private _proxy: ChatProxy;

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

            //文本显示
            this.lab_txt.textFlow = TextUtil.parseHtml(data.content || "", false);
        }

        private onTapLink(e: egret.TextEvent) {
            if(!this.data){
                return;
            }
            this._proxy.onClickChatLink(this.data, e.text);
        }
    }
}