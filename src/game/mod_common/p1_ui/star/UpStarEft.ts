namespace game.mod {


    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;

    /**升星觉醒按钮*/
    export class UpStarEft extends Btn {
        public group_eft1: eui.Group;
        public group_eft2: eui.Group;
        public group_eft3: eui.Group;
        public img_mark: eui.Image;

        public labelDisplay: eui.Label;
        public redPoint: eui.Image;

        private _effHub: UIEftHub;
        private _eftIdx1: number;
        private _eftIdx2: number;
        private _eftIdx3: number;

        protected childrenCreated(): void {
            super.childrenCreated();
            this._effHub = new UIEftHub(this);
        }

        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent(src: string, parent: DisplayObjectContainer, x: number = 0, y: number = 0,
                                 idx: number = -1, cb: Handler = null, times: number = 0, scale: number = 1, autoRemove: boolean = true, speed: number = 1): number {
            return this._effHub.add(src, x, y, cb, times, parent, idx, scale, autoRemove, speed);
        }

        private addEft1() {
            if (!this._eftIdx1) {
                this._eftIdx1 = this.addEftByParent(UIEftSrc.UpStar1, this.group_eft1);
            }
        }

        private addEft2() {
            if (!this._eftIdx2) {
                this._eftIdx2 = this.addEftByParent(UIEftSrc.UpStar2, this.group_eft2);
            }
        }

        private addEft3(scale: number) {
            this.clearEft3();
            this._eftIdx3 = this.addEftByParent(UIEftSrc.UpStar3, this.group_eft3, 0, 0, -1, null, 0, scale);
        }

        private clearEft1() {
            if (this._eftIdx1) {
                this._effHub.removeEffect(this._eftIdx1);
                this._eftIdx1 = null;
            }
        }

        private clearEft2() {
            if (this._eftIdx2) {
                this._effHub.removeEffect(this._eftIdx2);
                this._eftIdx2 = null;
            }
        }

        private clearEft3() {
            if (this._eftIdx3) {
                this._effHub.removeEffect(this._eftIdx3);
                this._eftIdx3 = null;
            }
        }

        private clearAllEft() {
            this.clearEft1();
            this.clearEft2();
            this.clearEft3();
        }

        /**
         * @param curCnt: 当前数量
         * @param costCnt: 最大数量
         * @param showRate: 显示百分比
         * @param fullTips: 满级后显示文本
         */
        public updateCost(curCnt: number, costCnt: number, showRate?: boolean, fullTips?: string): void {
            let imgHeight = 102;//mask最大高度
            let markHeight = 0;//mask高度
            let rate = costCnt > 0 ? (curCnt / costCnt) : 0;//40/100

            if(showRate){
                let barVal = Math.round(rate * 100);
                barVal = barVal == 0 && curCnt > 0 ? 1 : barVal;//0%有进度时客户端特殊处理下：1%
                let barValStr = barVal >= 100 && fullTips ? fullTips : barVal + "%";
                this.labelDisplay.text = barValStr;
            }

            if (rate <= 0) {
                //没碎片的时候不显示特效
                this.clearAllEft();
                markHeight = imgHeight;
            } else {
                //有碎片的时候显示球特效
                this.addEft2();
                if (rate >= 1) {
                    //可升星时候显示火特效
                    this.addEft1();
                    this.clearEft3();
                } else {
                    this.clearEft1();
                    //不可升星时候显示水特效
                    let scale = 0.5 + (0.4 - Math.abs(rate - 0.5)) / 0.4 * 0.5;//rate等于0.5时，scale取最大值1，rate小于0.1时，scale取最小值0.5
                    this.addEft3(scale);

                    let minY = 12;//限制位置
                    let maxY = imgHeight - minY;//限制位置
                    let posY = Math.max(imgHeight - rate * imgHeight, minY);//限制在12
                    posY = Math.min(posY, maxY);//限制在90
                    this.group_eft3.y = posY;
                    markHeight = (1 - rate) * imgHeight;
                }
            }
            this.img_mark.height = markHeight;
        }

        /**满星状态*/
        public updateMaxStar(): void {
            this.setHint(false);
            this.setFullEft();
        }

        /**满特效，球*/
        public setFullEft(): void {
            this.img_mark.height = 0;
            //满星时候只显示球特效
            this.clearEft1();
            this.clearEft3();
            this.addEft2();
        }

        /**设置红点*/
        public setHint(hint: boolean = false): void {
            this.redPoint && (this.redPoint.visible = hint);
        }
    }

}