namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import HuanjingzhihaiTypeConfig = game.config.HuanjingzhihaiTypeConfig;

    export class SeaFubenItem extends BaseListenerRenderer {
        public lab_name: eui.Label;
        public btn_item: game.mod.Btn;
        public img_lock0: eui.Image;
        public img_lock: eui.Image;
        public icon: Icon;

        private _isOpen: boolean;
        private _isFinish: boolean;
        public data: HuanjingzhihaiTypeConfig;

        protected onAddToStage(): void {
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_item, this.onClick, this);
            super.onAddToStage();
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let type = data["index"];
            let bigGate = data.big_gate;
            let proxy: SeaProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Sea);
            let maxSmallGate = proxy.getMaxSmallGate(bigGate);
            this._isOpen = proxy.isOpen(type, bigGate);
            this._isFinish = proxy.isFinish(type, bigGate);
            this.img_lock0.visible = this.img_lock.visible = !this._isOpen;

            let maxSmallGateCfg = proxy.getSmallGateCfg(bigGate, maxSmallGate);
            this.icon.setData(maxSmallGateCfg.show_reward[0]);

            let nameStr = data.name;
            if(this._isFinish){
                nameStr += TextUtil.addColor("（" + getLanById(LanDef.pass) + "）", BlackColor.GREEN)
            }
            else if(this._isOpen){
                let smallGate = proxy.getSmallGate(type, bigGate);

                nameStr += TextUtil.addColor("（" + smallGate + "/" + maxSmallGate + "）", BlackColor.RED)
            }
            this.lab_name.textFlow = TextUtil.parseHtml(nameStr);

            this.btn_item.icon = "sea_event" + (data.big_gate % 10);
            this.btn_item.redPoint.visible = proxy.checkBigGateHint(type, bigGate);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(!this._isOpen){
                PromptBox.getIns().show(getLanById(LanDef.sea_tips8));
                return;
            }
            if(this._isFinish){
                PromptBox.getIns().show(getLanById(LanDef.pass));
                return;
            }
            let bigGate = data.big_gate;
            let proxy: SeaProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Sea);
            proxy.bigGate = bigGate;
            ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaFubenMain);
        }

    }
}