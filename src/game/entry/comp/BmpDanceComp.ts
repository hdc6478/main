namespace game {

    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;
    import Tween = base.Tween;

    /**
     * 字体跳动
     */
    export class BmpDanceComp extends eui.Component {
        private _container: egret.DisplayObjectContainer;
        private _delayCall: number;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

            this.name = 'bmp_dance';
            this.createContainer();
            if (!this._hub) {
                this._hub = new UIEftHub(this);
            }
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

            let numChild = this._container.numChildren;
            for (let i = 0; i < numChild; i++) {
                let child = this._container.getChildAt(i);
                if (child) {
                    Tween.remove(child);
                }
            }
            this.clearDelayCall();
            DisplayUtils.UnParent(this);//从父级移除
            this._hub.removeAllEffects();
        }

        private createContainer(): void {
            if (!this._container) {
                this._container = new egret.DisplayObjectContainer();
            }
            this.addChild(this._container);
        }

        /**
         * 字体跳动，从头到尾不断循环
         * @param txt
         */
        public updateDance(txt: string): void {
            if (!txt) {
                return;
            }

            if (!this._container) {
                this.createContainer();
            }
            this._hub.addBmpFont(txt, BmpTextCfg[BmpTextType.BmpDance], this._container, true, 2, false, -3);
            this._delayCall = delayCall(Handler.alloc(this, this.danceFunc), 500);
        }

        private clearDelayCall(): void {
            if (this._delayCall) {
                clearDelay(this._delayCall);
                this._delayCall = null;
            }
        }

        private danceFunc(): void {
            this.clearDelayCall();

            if (this._container && this._container.numChildren) {
                this.childDance(0);
            }
        }

        //字体跳动
        private childDance(childIdx: number): void {
            if (!this._container || !this._container.numChildren) {
                return;
            }

            let delayTime = 100;
            if (childIdx >= this._container.numChildren) {
                childIdx = 0;
                delayTime = 1000;//下一轮间隔1秒
            }
            let child = this._container.getChildAt(childIdx) as BitmapBase;
            if (!child) {
                return;
            }
            Tween.remove(child);
            Tween.get(child)
                .delay(delayTime)
                .to({y: -10}, 300)
                .delay(100)
                .to({y: 0}, 300)
                .exec(Handler.alloc(this, this.childDance, [childIdx + 1]));
        }
    }

}