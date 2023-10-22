namespace game.mod.more {

    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class XiandiTitleItem extends BaseRenderer {

        private img_title: eui.Image;
        private lab_name: eui.Label;
        private lab_power: eui.Label;

        public data: { title: string, name: string, power?: string };

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.currentState = !!this.data.power ? "1" : "2";
            if (this.data.power) {
                this.lab_power.text = this.data.power;
            }
            this.img_title.source = this.data.title;
            this.lab_name.text = this.data.name;
        }

        public setData(data: { title: string, name: string, power?: string }): void {
            this.data = data;
        }

    }
}
