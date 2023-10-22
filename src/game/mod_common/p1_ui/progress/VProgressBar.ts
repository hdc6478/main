namespace game.mod {


    /**
     * 此组件含有scroller，若其祖先节点中也有scroller，则其祖先节点的scroller需要设置 ["$hasScissor"] = true;
     */
    export class VProgressBar extends BaseRenderer {

        public data: VProgressData;

        private _height: number = 49;
        private thumb: eui.Image;
        private scr: eui.Scroller;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._height = (this.height - 40) * 0.5;//除去中间圆40再平分
        }

        protected dataChanged(): void {
            super.dataChanged();
            let data = this.data;
            if (!data) {
                return;
            }
            if (data.val <= data.start) {
                this.scr.height = 0;
                this.thumb.height = 0;
                return;
            }
            let p = (data.val - data.start) / (data.target - data.start);
            if (p > 1) {
                p = 1;
            } else if (p < 0) {
                p = 0;
            }
            this.scr.height = this.height * p;

            let p2 = (data.val - data.target) / (data.next - data.target);
            if (p2 > 1) {
                p2 = 1;
            } else if (p2 < 0) {
                p2 = 0;
            } else if (data.val <= data.target) {
                p2 = 0;//未到下半进度
            }
            this.thumb.height = this._height * p2;
        }

        public setData(data: VProgressData): void {
            this.data = data;
        }
    }

}