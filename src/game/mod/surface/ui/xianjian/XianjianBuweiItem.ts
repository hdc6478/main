namespace game.mod.surface {


    export class XianjianBuweiItem extends eui.ItemRenderer {

        private img_icon: eui.Image;
        private img_lock: eui.Image;
        private lab_level: eui.Label;
        private lab_act: eui.Label;
        public redPoint: eui.Image;

        protected propData: PropData;//子类可调用
        public data: { prop: number, lv: number };

        protected dataChanged(): void {
            if (this.data.prop) {
                this.propData = PropData.create(this.data.prop);
                this.img_icon.source = ResUtil.getUiProp(this.propData.cfg.icon);
            }
            if (this.data.lv) {
                this.lab_level.text = `${this.data.lv}`;
                this.currentState = "default";
            } else {
                this.currentState = "lock";
            }
        }

        public setData(prop: number, lv: number): void {
            this.data = { prop, lv };
        }
    }
}