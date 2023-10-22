namespace game.mod.boss {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;

    export class AbyssMyTeamItem extends BaseListenerRenderer {

        private btn: Btn;
        private head: HeadVip;
        private lab_name: eui.Label;
        private lab_count: eui.Label;
        private img_leader: eui.Image;
        private btn_add: Btn;

        private _proxy: BossProxy;
        public data: teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Boss, ProxyType.Boss);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.btn.label = "离开队伍";
        }

        protected dataChanged(): void {
            if (!this.data) {
                this.currentState = "2";
                this.btn_add.setImage("jiahao2");
                return;
            }
            this.currentState = "1";
            let info: teammate = this.data;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this.lab_name.textFlow = TextUtil.parseHtml(info.name);
            this.lab_count.textFlow = TextUtil.parseHtml(`战力：${info.showpower && info.showpower.toNumber() || 0}`);

            this.btn.visible = info.role_id.eq(RoleVo.ins.role_id);
            this.img_leader.visible = info.role_id.eq(this._proxy.leader.role_id);
        }

        private onClick(): void {
            this._proxy.c2s_zhuimo_army_oper(3);
        }

        private onClickAdd(): void {
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssInvite);
        }
    }
}
