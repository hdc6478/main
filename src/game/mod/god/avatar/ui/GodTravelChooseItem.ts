namespace game.mod.god {


    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TiandiShifangConfig = game.config.TiandiShifangConfig;

    export class GodTravelChooseItem extends BaseRenderer {

        private _proxy: GodProxy;
        private btn: Btn;
        private lab_name: eui.Label;
        private img_icon: eui.Image;
        public data: TiandiShifangConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.lab_name.text = this.data.name;
            this.img_icon.source = `god_icon_head_${this.data.itype}`;
            this.btn.setHint(false);
        }

        private onClick(): void {
            this._proxy.saveChoose({map_type: this._proxy.model.map_type, index: this.data.itype});
        }

    }
}