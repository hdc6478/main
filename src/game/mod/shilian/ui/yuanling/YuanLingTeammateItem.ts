namespace game.mod.shilian {

    import yuanling_team_info = msg.yuanling_team_info;
    import Handler = base.Handler;

    export class YuanLingTeammateItem extends BaseListenerRenderer {
        public img_captain: eui.Image;
        public head: game.mod.Head;
        public lb_name: eui.Label;
        public lb_power: eui.Label;
        public img_add: eui.Image;
        public btn_del: game.mod.Btn;
        public lb_add: eui.Label;

        data: yuanling_team_info;
        private _proxy: YuanLingProxy;

        constructor() {
            super();
            this.skinName = `skins.shilian.YuanLingTeammateItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shilian, ProxyType.YuanlingFuben);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_add, this.onClickAdd, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_del, this.onDel, this);
            this.lb_add.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this.lb_add.text, WhiteColor.DEFAULT2));
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.currentState = 'add';
                return;
            }
            this.currentState = 'head';

            this.img_captain.visible = !!data.leader;
            if (data.leader) {
                this.img_captain.visible = true;
                this.btn_del.visible = false;
            } else if (this._proxy.isMineLeader()) {
                this.img_captain.visible = false;
                this.btn_del.visible = true;
            } else {
                this.btn_del.visible = this.img_captain.visible = false;
            }

            let info = data.info ? data.info[0] : null;
            if (!info) {
                return;
            }
            this.lb_name.text = info.name;
            this.lb_power.text = info.showpower.toString();
            this.head.updateHeadShow(info.head.toNumber(), info.head_frame.toNumber(), info.sex);
        }

        // 组队邀请界面
        private onClickAdd(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shilian, ShilianViewType.YuanLingInvite);
        }

        // 踢人，队长才有权限
        private onDel(): void {
            console.log(`队长踢人，队员roleid : ${this.data.info[0].role_id}`);
            ViewMgr.getIns().showConfirm('确定将此队友请离队伍吗，被请离的队友在一分钟以内无法再进入队伍。',
                Handler.alloc(this, this.onConfirm, [this.data.info[0].role_id]));
        }

        private onConfirm(roleId: Long): void {
            console.log(`队长踢人，队员roleid : c2s_yuanling_out_time ${roleId}`);
            this._proxy.c2s_yuanling_out_time(roleId);
        }
    }
}