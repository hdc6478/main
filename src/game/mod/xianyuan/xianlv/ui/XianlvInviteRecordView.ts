namespace game.mod.xianyuan {

    import teammate = msg.teammate;

    export class XianlvInviteRecordView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvInviteRecordSkin";
        }
    }

    export class XianlvInviteRecordItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public headVip: game.mod.HeadVip;
        public btn_cancel: game.mod.Btn;
        public btn_confirm: game.mod.Btn;

        private _proxy: XianlvProxy;
        data: teammate;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.XianlvInviteRecordItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Xianlv);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_cancel, this.onClickCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_confirm, this.onClickConfirm, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_name.text = data.name;
            this.powerLabel.setPowerValue(data.showpower);
            this.headVip.updateShow(data.head, data.head_frame, data.sex, data.vip, data.role_id);
        }

        private onClickCancel(): void {
            this._proxy.c2s_xianlv_seeking(this.data.role_id, 2);
        }

        private onClickConfirm(): void {
            this._proxy.c2s_xianlv_seeking(this.data.role_id, 1);
        }
    }
}