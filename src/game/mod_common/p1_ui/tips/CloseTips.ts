namespace game.mod {
    import Event = egret.Event;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;

    export class CloseTips extends eui.Component implements UpdateItem {
        private lab_tips: eui.Label;
        private _time: number;
        private _closeHandler: Handler;

        public male: eui.CheckBox;

        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.updateTips();
        }

        private onRemove() {
            this._closeHandler = null;
            TimeMgr.removeUpdateItem(this);
        }

        private updateTips(tips?: string) {
            if (!tips) {
                tips = getLanById(LanDef.click_tips);
            }
            this.lab_tips.text = tips;
        }

        update(time: base.Time) {
            this.updateTime();
        }

        private updateTime() {
            this._time--;
            if (this._time < 0 && this._closeHandler) {
                TimeMgr.removeUpdateItem(this);
                if (this._closeHandler) {
                    this._closeHandler.exec();
                }
            }
            let tips = getLanById(LanDef.click_tips) + "(" + this._time + ")";
            this.updateTips(tips);
        }

        /**设置提示
         * @param time 倒计时
         * @param closeHandler 倒计时结束的回调
         */
        public updateShow(time: number, closeHandler?: Handler) {
            this._time = time;
            this.updateTime();
            TimeMgr.addUpdateItem(this, 1000);
            if (closeHandler) {
                this._closeHandler = closeHandler;
            }
        }

        public updateTxt(str: string): void {
            this.lab_tips.textFlow = TextUtil.parseHtml(str);
        }
    }
}