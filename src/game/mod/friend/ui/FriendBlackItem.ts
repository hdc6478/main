namespace game.mod.friend {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;

    export class FriendBlackItem extends BaseListenerRenderer {
        public head: HeadVip;
        public lab_name: eui.Label;
        public lab_team: eui.Label;
        public power: PowerLabel;
        public btn_black: game.mod.Btn;

        private _chatProxy: IChatProxy;
        public data: teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._chatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_black, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this.lab_name.text = info.name;
            this.power.setPowerValue(info.showpower, WhiteColor.DEFAULT2, 24);
            let guildName = info.guild_name || getLanById(LanDef.bag_cue20);
            this.lab_team.text = getLanById(LanDef.union_title_2) + "：" + guildName;
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this._chatProxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
        }
    }
}