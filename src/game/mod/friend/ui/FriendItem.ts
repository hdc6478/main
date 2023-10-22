namespace game.mod.friend {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import friend_info = msg.friend_info;
    import Point = egret.Point;

    export class FriendItem extends BaseListenerRenderer {
        public head: HeadVip;
        public img_state: eui.Image;
        public lab_name: eui.Label;
        public lab_team: eui.Label;
        public power: PowerLabel;
        public lab_value: eui.Label;
        public img_online: eui.Image;
        public lab_online: eui.Label;
        public btn_gift: game.mod.Btn;

        private _proxy: FriendProxy;
        public data: friend_info;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_gift, this.onClick, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
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
            this.lab_value.text = StringUtil.getHurtNumStr(info.friendship);

            this.img_online.source = info.is_online ? "friend_lv" : "friend_hui";
            let onlineStr = "";
            if(info.is_online){
                onlineStr = TextUtil.addColor(getLanById(LanDef.guild_online), WhiteColor.GREEN);
            }
            else {
                onlineStr = TextUtil.addColor(TimeUtil.getLeaveTime(info.time), WhiteColor.GRAY);
            }
            this.lab_online.textFlow = TextUtil.parseHtml(onlineStr);

            this.btn_gift.redPoint.visible = this._proxy.getGiftHint();
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Friend, FriendViewType.FriendGift, this.data);
        }

        private onClickHead(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            let headStagePt: Point = this.head.localToGlobal();//转过去的是全局坐标
            let point: Point = new Point(headStagePt.x + this.head.width / 2, headStagePt.y + this.head.height / 2);
            egret.callLater(() => {
                facade.showView(ModName.Friend, FriendViewType.FriendCheck, {info, point});
            }, this);

        }
    }
}