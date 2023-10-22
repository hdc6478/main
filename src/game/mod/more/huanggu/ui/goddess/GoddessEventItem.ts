namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import HuangguShijianTypeConfig = game.config.HuangguShijianTypeConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class GoddessEventItem extends BaseListenerRenderer {
        public lab_name: eui.Label;
        public btn_item: game.mod.Btn;
        public img_lock: eui.Rect;

        private _proxy: HuangguProxy;
        private _isOpen: boolean;
        private _isFinish: boolean;
        public data: HuangguShijianTypeConfig;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.Huanggu);
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
            this.btn_item.icon = "goddess_event" + index;
            this.img_lock.visible = !this._isOpen && this._proxy.chatLv >= data.condition;
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
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.GoddessEventChallenge, data);
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