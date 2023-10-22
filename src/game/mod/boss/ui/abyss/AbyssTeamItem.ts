namespace game.mod.boss {

    import zhuimo_army_data = msg.zhuimo_army_data;
    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;

    export class AbyssTeamItem extends BaseListenerRenderer {

        private btn: Btn;
        private head: HeadVip;
        private lab_name: eui.Label;
        private lab_count: eui.Label;
        private img_leader: eui.Image;

        private _proxy: BossProxy;
        public data: zhuimo_army_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Boss, ProxyType.Boss);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
            this.img_leader.visible = false;
            this.btn.label = "加入";
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info: teammate = this.data.lead;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            let str: string = TextUtil.addColor("(的队伍)", WhiteColor.GREEN);
            this.lab_name.textFlow = TextUtil.parseHtml(info.name + str);
            let count: string = TextUtil.addColor(`${this.data.total}/3`, WhiteColor.DEFAULT);
            this.lab_count.textFlow = TextUtil.parseHtml("人数：" + count);
        }

        private onClick(): void {
            this._proxy.c2s_zhuimo_army_oper(2, null, this.data.army_id);
        }
    }
}
