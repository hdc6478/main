namespace game.mod.god {

    export class GodProgressItem extends BaseRenderer {
        public bar: ProgressBarComp;

        public data: VProgressData;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressBar3Skin";
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (!this.data.val) {
                this.bar.show(0, this.data.target, false, 0, false, ProgressBarType.NoValue);
            } else {
                let val: number = this.data.val - this.data.start;
                val = val < 0 ? 0 : val;
                let target: number = this.data.target - this.data.start;
                this.bar.show(val, target, false, 0, false, ProgressBarType.NoValue);
            }
        }
    }
}