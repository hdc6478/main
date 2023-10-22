namespace game.mod.more {

    export class XianmaiCoolTimeItem extends BaseListenerRenderer {
        public lb_cooltime: eui.Label;
        public btn_lengque: game.mod.Btn;

        private _proxy: XianmaiProxy;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiCoolTimeItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianmai);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_lengque, this.onClick, this);
        }

        /**
         * 大于2小时，才会出现冷却加速按钮
         */
        updateShow(): void {
            if (!this._proxy) {
                this._proxy = getProxy(ModName.More, ProxyType.Xianmai);
            }
            let leftCoolTime = this._proxy.getLeftCoolTime();
            this.visible = leftCoolTime > 0;
            this.btn_lengque.visible = this._proxy.isCoolTimeLarge();
            this.lb_cooltime.textFlow = TextUtil.parseHtml(this._proxy.getCoolTimeStr());
        }

        private onClick(): void {
            this._proxy.dealCoolTime();
        }
    }
}