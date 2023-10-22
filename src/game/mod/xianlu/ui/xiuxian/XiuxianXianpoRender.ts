namespace game.mod.xianlu {
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class XiuxianXianpoRender extends BaseListenerRenderer {
        public btn_xianpo: game.mod.Btn;
        public lab_lv: eui.Label;

        public data: number;//等级

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_xianpo, this.onClick, this);
        }

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let lv = this.data;
            this.lab_lv.text = lv + getLanById(LanDef.tishi_43);
        }

        private onClick(): void {
            let lv = this.data;
            facade.showView(ModName.Xianlu, XianluViewType.XiuxianTips, lv);
        }

        public setData(lv: number): void {
            this.data = lv;
        }
    }
}