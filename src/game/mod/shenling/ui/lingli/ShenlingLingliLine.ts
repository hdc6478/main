namespace game.mod.shenling {

    export class ShenlingLingliLine extends eui.Component {
        public img_light: eui.Image;

        private _maxVal = 1;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingliLineSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.img_light.height = 0;
        }

        public setMax(max: number = 1): void {
            this._maxVal = max;
        }

        public updateLine(val: number): void {
            let height = this.height;
            this.img_light.height = height * (val / this._maxVal || 0);
        }
    }
}