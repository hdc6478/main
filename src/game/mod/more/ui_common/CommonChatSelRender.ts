namespace game.mod.more {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class CommonChatSelRender extends BaseListenerRenderer {
        public lab_txt: eui.Label;
        public btn_sel: game.mod.Btn;

        public data: GoddessChatSelData;

        protected onAddToStage(): void {
            super.onAddToStage();

            //this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_sel, this.onClick, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let desc = data.desc;
            this.lab_txt.textFlow = TextUtil.parseHtml(desc);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            facade.sendNt(HuangguEvent.ON_GODDESS_CHAT_SEL, data);
        }
    }
}