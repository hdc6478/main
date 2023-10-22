namespace game.mod.boss {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;

    export class AbyssInviteItem extends BaseListenerRenderer {

        private btn: Btn;
        private head: HeadVip;
        private lab_name: eui.Label;
        private lab_count: eui.Label;
        private img_leader: eui.Image;

        private _proxy: BossProxy;
        public data: teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Boss, ProxyType.Boss);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
            this.img_leader.visible = false;
            this.btn.label = "邀请";
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info: teammate = this.data;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this.lab_name.textFlow = TextUtil.parseHtml(info.name);
            let count: string = TextUtil.addColor(`${info.showpower && info.showpower.toNumber() || 0}`, WhiteColor.DEFAULT);
            this.lab_count.textFlow = TextUtil.parseHtml("战力：" + count);
        }

        private onClick(): void {
            this._proxy.c2s_zhuimo_army_oper(1, this.data.role_id, null);
        }
    }
}
