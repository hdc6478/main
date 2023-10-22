namespace game.mod.friend {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import friend_info = msg.friend_info;
    import friend_add_data = msg.friend_add_data;

    export class FriendItem2 extends BaseListenerRenderer {
        public head: HeadVip;
        public img_state: eui.Image;
        public lab_name: eui.Label;
        public lab_team: eui.Label;
        public power: PowerLabel;
        public img_online: eui.Image;
        public lab_online: eui.Label;
        public btn_add: game.mod.Btn;

        private _proxy: FriendProxy;
        public data: friend_info;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClick, this);
            // this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip_lv);
            this.img_state.source = info.is_friend ? "friend_state2" : "friend_state1";
            this.lab_name.text = info.name;
            this.power.setPowerValue(info.showpower, WhiteColor.DEFAULT2, 24);
            let guildName = info.guild_name || getLanById(LanDef.bag_cue20);
            this.lab_team.text = getLanById(LanDef.union_title_2) + "：" + guildName;

            this.img_online.source = info.is_online ? "friend_lv" : "friend_hui";
            let onlineStr = "";
            if(info.is_online){
                onlineStr = TextUtil.addColor(getLanById(LanDef.guild_online), WhiteColor.GREEN);
            }
            else {
                onlineStr = TextUtil.addColor(TimeUtil.getLeaveTime(info.time), WhiteColor.GRAY);
            }
            this.lab_online.textFlow = TextUtil.parseHtml(onlineStr);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            let friendInfo: friend_add_data = new friend_add_data();
            friendInfo.role_id = info.role_id;
            friendInfo.server_id = info.server_id;
            this._proxy.onClickAdd([friendInfo]);
        }

        // private onClickHead(): void {
        //     if(!this.data){
        //         return;
        //     }
        //     let info = this.data;
        //     //todo，没有机器人
        //     ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
        // }
    }
}