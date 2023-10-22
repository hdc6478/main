namespace game.mod.more {

    export class FengmoProgressItem extends BaseRenderer {
        public progress: ProgressBarComp;
        public data: VProgressData;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            if (!this.data.val) {
                this.progress.show(0, this.data.target, false, 0, false, ProgressBarType.NoValue);
            } else {
                let val: number = this.data.val - this.data.start;
                val = val < 0 ? 0 : val;
                let target: number = this.data.target - this.data.start;
                this.progress.show(val, target, false, 0, false, ProgressBarType.NoValue);
            }
        }
    }
}