namespace game.mod.more {

    export class ZhanduiInviteItem extends BaseListenerRenderer {
        private lab_name: eui.Label;
        private lab_power: eui.Label;
        private head: HeadVip;
        public btn_agree: Btn;
        public btn_refuse: Btn;

        data: msg.teammate;
        private _proxy: ZhanduiProxy;

        constructor() {
            super();
            this.skinName = `skins.union.UnionApplyItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Zhandui);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_agree, this.onClickAgree, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_refuse, this.onClickRefuse, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab_name.text = data.name;
            this.lab_power.text = StringUtil.getPowerNumStr(data.showpower.toNumber());
            this.head.updateShow(data.head, data.head_frame, data.sex, data.vip);
        }

        private onClickAgree(): void {
            this._proxy.sendButtonClickIspass(this.data.role_id, 1)
        }

        private onClickRefuse(): void {
            this._proxy.sendButtonClickIspass(this.data.role_id, 0)
        }
    }
}