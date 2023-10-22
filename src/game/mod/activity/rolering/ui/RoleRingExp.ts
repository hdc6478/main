namespace game.mod.activity {

    export class RoleRingExp extends BaseRenderer {
        public img_mark: eui.Image;
        public group_eft1: eui.Group;
        public group_eft2: eui.Group;
        public labelDisplay: eui.Label;

        private _eftIdx1: number;
        private _eftIdx2: number;

        protected onRemoveFromStage() {
            this.clearAllEft();
            super.onRemoveFromStage();
        }


        private clearAllEft() {
            this.clearEft1();
            this.clearEft2();
        }

        private clearEft1() {
            if (this._eftIdx1) {
                this.removeEffect(this._eftIdx1);
                this._eftIdx1 = null;
            }
        }

        private clearEft2() {
            if (this._eftIdx2) {
                this.removeEffect(this._eftIdx2);
                this._eftIdx2 = null;
            }
        }

        private addEft1() {
            if (!this._eftIdx1) {
                this._eftIdx1 = this.addEftByParent(UIEftSrc.RoleRingBall, this.group_eft1);
            }
        }

        private addEft2(scale: number) {
            this.clearEft2();
            this._eftIdx2 = this.addEftByParent(UIEftSrc.RoleRingWater, this.group_eft2, 0,0,-1,null,0,scale);
        }

        public updateShow(val: number, max: number): void {
            let rate: number = max > 0 ? (val / max) : 0;//40/100
            let imgHeight = 116;//mask最大高度
            let markHeight = 0;//mask高度
            if(rate <= 0){
                //没经验的时候不显示特效
                this.clearAllEft();
                markHeight = imgHeight;
            }
            else {
                //有经验的时候显示球特效
                this.addEft1();
                if(rate >= 1){
                    //清除水面特效
                    this.clearEft2();
                }
                else {
                    //显示水特效
                    let scale = 0.6 + (0.4 - Math.abs(rate - 0.5)) / 0.4 * 0.4;//rate等于0.5时，scale取最大值1，rate小于0.1时，scale取最小值0.5
                    this.addEft2(scale);

                    let minY = 2;//限制位置
                    let maxY = imgHeight - minY;//限制位置
                    let posY = Math.max(imgHeight - rate * imgHeight, minY);//限制在12
                    posY = Math.min(posY, maxY);//限制在90
                    this.group_eft2.y = posY;
                    markHeight = (1 - rate) * imgHeight;
                }
            }
            this.img_mark.height = markHeight;
        }

    }
}