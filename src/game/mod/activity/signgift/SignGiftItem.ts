namespace game.mod.activity {

    import DailySignConfig = game.config.DailySignConfig;

    export class SignGiftItem extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public img_done: eui.Image;
        public gr_num: eui.Group;
        public lb_num: eui.Label;
        public img_gray: eui.Image;

        private _proxy: SignGiftProxy;
        data: ISignGiftItemData;

        constructor() {
            super();
            this.skinName = `skins.signgift.SignGiftItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.SignGift);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.cfg) {
                return;
            }
            let prop = PropData.create(data.cfg.reward[0]);
            this.icon.setData(prop, IconShowType.NotTips);
            this.lb_num.text = data.cfg.reward[1] + '';
            this.gr_num.visible = data.cfg.reward[1] > 1;
            let signed = data.state == 2;
            this.img_done.visible = signed;
            this.img_gray.visible = signed;
            this.icon.setHint(data.state == 1);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if (data.state == 1) {
                this._proxy.c2s_sign(data.cfg.index);
            } else {
                ViewMgr.getIns().showPropTips(data.cfg.reward[0]);
            }
        }

        public updateData(ary: number[]): void {
            if (!ary || !ary.length) {
                return;
            }
            this.icon.data = ary[0];
            this.img_gray.visible = this.img_done.visible = false;
            this.gr_num.visible = ary[1] > 1;
            this.lb_num.text = ary[1] + '';
        }
    }

    export interface ISignGiftItemData {
        cfg: DailySignConfig;
        state: number;//0不可领取，1可领取，2已领取
    }
}