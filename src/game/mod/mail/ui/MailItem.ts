namespace game.mod.mail {

    import mail_data = msg.mail_data;
    import TouchEvent = egret.TouchEvent;

    export class MailItem extends BaseRenderer {

        private icon: Icon;
        private lab_title: eui.Label;
        private lab_time: eui.Label;
        private img: eui.Image;
        private redPoint: eui.Image;

        public data: mail_data;

        protected onAddToStage(): void {
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (this.data.attachments) {
                let p = this.data.attachments[0];
                let prop: PropData = PropData.create(p.idx, p.cnt);
                this.icon.setData(prop);
                this.icon.visible = true;
            } else {
                this.icon.visible = false;
            }

            this.lab_title.textFlow = TextUtil.parseHtml(this.data.title);
            this.lab_time.text = TimeUtil.formatTimeSecond(this.data.send_time);
            this.img.visible = this.data.is_taken == 1;
            //是否有道具
            let isHasItem = this.data.attachments && this.data.attachments.length > 0;
            this.redPoint.visible = this.data.is_taken == 0 && (this.data.is_readed !== 1 || isHasItem);
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Mail, MailViewType.MailDesc, this.data);
        }
    }
}