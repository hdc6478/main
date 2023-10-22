namespace game.mod.main {

    import Event = egret.Event;
    import TouchEvent = egret.TouchEvent;

    export class VipIcon extends eui.Button {

        public group_content: eui.Group;
        public img_bg: eui.Image;
        public group_eft: eui.Group;
        public gr_vipLv: eui.Group;
        public redPoint: eui.Image;
        private _effHub: UIEftHub;
        private _eftId: number;

        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onVipView, this);
            this._effHub = new UIEftHub(this);
        }

        // vip等级确定
        setText(vipId: number): void {
            if (vipId == undefined) {
                vipId = 0;
            }
            this._effHub.addBmpFont(VipUtil.getShowVipLv(vipId).toString(), BmpTextCfg[BmpTextType.MainVip], this.gr_vipLv,
                true, 1.1, true);
            this.img_bg.source = VipUtil.getShowVipMainBg(vipId);
            if (!this._eftId) {
                this._eftId = this._effHub.add(UIEftSrc.Vip, 0, 0, null, 0, this.group_eft, -1);
            }
        }

        setRedPoint(isShow: boolean) {
            this.redPoint.visible = isShow;
        }

        onVipView() {
            // console.log("打开Vip界面")
        }

        protected onAddToStage() {
            let self = this;
            self.addEventListener(Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self);
        }

        protected onTouchBegin(event: egret.TouchEvent): void {
            super.onTouchBegin(event);
            this.group_content.scaleX = this.group_content.scaleY = 0.9;
            this.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        }

        protected buttonReleased(): void {
            super.buttonReleased();
            this.removeEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
            this.group_content.scaleX = this.group_content.scaleY = 1;
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onVipView, this);
            this.onHide();
        }

        private onHide(): void {
            this._effHub.clearAllFont();
            if (this._eftId) {
                this._effHub.removeEffect(this._eftId);
            }
        }
    }
}