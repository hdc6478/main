namespace game.mod.more {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;
    import PropConfig = game.config.PropConfig;

    export class MiningSlaveItem extends BaseRenderer {

        private head_slave: Head;
        private lab_slave: eui.Label;
        private grp_count: eui.Group;
        private img_icon: eui.Image;
        private lab_count: eui.Label;
        private btn_add: Btn;
        private img_lock: eui.Image;
        private redPoint: eui.Image;

        public data: teammate;
        private is_self: boolean = false;
        private _proxy: MiningProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onFight, this);
            this._proxy = getProxy(ModName.More, ProxyType.Mining);
        }

        protected dataChanged(): void {
            // if (!this.data) {
            //     return;
            // }

            let info = this.data;
            if (!info) {
                this.img_lock.visible = this.lab_slave.visible = this.grp_count.visible = this.head_slave.visible = false;
                this.btn_add.visible = this.is_self;
                return;
            }
            this.btn_add.visible = false;
            this.img_lock.visible = this.lab_slave.visible = this.grp_count.visible = this.head_slave.visible = true;

            this.head_slave.updateHeadShow(info.head, info.head_frame, info.sex, info.role_id);
            this.lab_slave.text = info.name;
            this.lab_count.text = `${info.rank_num}/小时`;

            let prop: PropConfig = GameConfig.getPropConfigById(this._proxy.team_kuanmai_item);
            this.img_icon.source = prop.icon;
        }

        public setData(data: teammate, self: boolean = false): void {
            this.is_self = self;
            this.data = data;
        }

        private onFight(): void {
            if (!ViewMgr.getIns().checkZhenrongGod(1)) {
                PromptBox.getIns().show("请先上阵军团阵容");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningFight);
        }

        public setHint(bool: boolean): void {
            this.redPoint.visible = bool;
        }
    }
}