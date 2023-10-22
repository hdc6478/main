namespace game.mod.union {

    import member_data = msg.member_data;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class UnionApplyItem extends BaseRenderer {

        private lab_name: eui.Label;
        private lab_power: eui.Label;
        private head: HeadVip;
        public btn_agree: Btn;
        public btn_refuse: Btn;

        protected _proxy: UnionProxy;

        public data: member_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            this.btn_agree.addEventListener(TouchEvent.TOUCH_TAP, this.onAgree, this);
            this.btn_refuse.addEventListener(TouchEvent.TOUCH_TAP, this.onRefuse, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn_agree.removeEventListener(TouchEvent.TOUCH_TAP, this.onAgree, this);
            this.btn_refuse.removeEventListener(TouchEvent.TOUCH_TAP, this.onRefuse, this);
        }

        protected dataChanged(): void {
            let data: member_data = this.data;
            if (!data) {
                return;
            }
            this.lab_name.text = data.name;
            this.lab_power.text = `战力:${+data.power}`;
            this.head.updateShow(data.head, data.head_frame, data.sex, data.vip);
        }

        private onAgree(): void {
            this._proxy.c2s_agree_or_refuse_guild(this.data.role_id, UnionApplyOper.AGREE);
        }

        private onRefuse(): void {
            this._proxy.c2s_agree_or_refuse_guild(this.data.role_id, UnionApplyOper.REFUSE);
        }
    }
}