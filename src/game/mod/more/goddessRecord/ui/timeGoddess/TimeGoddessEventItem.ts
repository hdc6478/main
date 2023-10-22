namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class TimeGoddessEventItem extends BaseListenerRenderer {
        public lab_name: eui.Label;
        public btn_item: game.mod.Btn;

        private _proxy: GoddessRecordProxy;
        private _isOpen: boolean;
        private _isFinish: boolean;
        public data: NvshenShijianTypeConfig;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_item, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let index = data.index;
            this._isOpen = this._proxy.isEventOpen(index);
            this._isFinish = this._proxy.isEventFinish(index);
            let nameStr = data.name;
            if(this._isFinish){
                nameStr += TextUtil.addColor("（" + getLanById(LanDef.task7) + "）", BlackColor.GREEN)
            }
            else if(this._isOpen){
                let stage = this._proxy.getEventStage(index);
                let maxStage = this._proxy.getEventMaxStage(index);
                nameStr += TextUtil.addColor("（" + stage + "/" + maxStage + "）", BlackColor.RED)
            }
            this.lab_name.textFlow = TextUtil.parseHtml(nameStr);
            this.btn_item.icon = "timegoddess_event" + index;
            this.updateHint();
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(!this._isOpen){
                PromptBox.getIns().show(getLanById(LanDef.huanggu_nvshen_tips15));
                return;
            }
            if(this._isFinish){
                PromptBox.getIns().show(getLanById(LanDef.huanggu_nvshen_tips14));
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.TimeGoddessEventChallenge, data);
        }

        public updateHint(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let index = data.index;
            this.btn_item.redPoint.visible = this._proxy.checkEventPerHint(index);
        }
    }
}