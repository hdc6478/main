namespace game.mod.chat {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class ChatPrivateRender extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public head: HeadVip;
        public img_online: eui.Image;
        public lab_name: eui.Label;
        public btn_close: game.mod.Btn;
        public redPoint: eui.Image;

        public data: ChatPrivateData;
        private _proxy: ChatProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_close, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this.head.updateShow(info.head, info.headFrame, info.sex, info.vipIndex);
            this.img_online.source = info.isOnline ? "friend_lv" : "friend_hui";
            let nameStr = "";
            if(info.name){
                let indexPos = info.name.indexOf(".");
                nameStr = info.name.substr(indexPos + 1, info.name.length);
            }
            this.lab_name.text = nameStr;//todo，剪切掉服务器

            let banlvInfo = RoleUtil.getBanlvInfo();
            let isBanlv = banlvInfo && banlvInfo.role_id && banlvInfo.role_id.eq(info.roleId);//仙侣
            this.btn_close.visible = !isBanlv;
            this.img_bg.source = isBanlv ? "siliaodiban2" : "siliaodiban1";

            this.redPoint.visible = this._proxy.isNotReadPrivate(info.roleId);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            this._proxy.deletePrivateInfo(this.data.roleId);
        }
    }
}