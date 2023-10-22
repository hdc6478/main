namespace game.mod {


    import Handler = base.Handler;
    import Tween = base.Tween;

    export class ProgressBarComp extends BaseRenderer {
        public thumb_preview: eui.Image;
        public thumb: eui.Image;
        public labelDisplay: eui.Label;
        public gr_eft: eui.Group;
        private progressBar: ProgressBarMdr;
        private effIdx: number;
        private _max: number;

        public isFirst: boolean = true;//首次进入
        private _onceCallback: Handler = null;//一次完成的回调

        constructor() {
            super();
            this.touchChildren = false;
            this.touchEnabled = false;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.initBar();
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            let self = this;
            if (self.progressBar) {
                self.progressBar.hide();
                this.progressBar = null;
            }
            this.isFirst = true;
            this.checkRemoveEff();
        }

        private initBar(): void {
            let self = this;
            if (!self.progressBar) {
                self.thumb.width = self.width;
                if (self.thumb_preview) {
                    self.thumb_preview.width = 0;
                }
                self.progressBar = new ProgressBarMdr(self.thumb, self.labelDisplay, ProgressBarType.Value, self.gr_eft);
                self.progressBar.finallyCallBack = Handler.alloc(self, self.finallyCallBack);
                self.progressBar.onceCallBack = Handler.alloc(self, self.onceCallBack);
            }
        }

        private checkRemoveEff(): void {
            let self = this;
            if (self.effIdx) {
                self.removeEffect(self.effIdx);
                self.effIdx = null;
            }
        }

        private finallyCallBack() {
            let self = this;
            self.thumb.width = 0;
            if (self.thumb_preview) {
                self.thumb_preview.width = 0;
            }
            //self.gr_eft && (this.gr_eft.x = -30);
        }

        private onceCallBack(): void {
            if (this._onceCallback) {
                this._onceCallback.exec();
            }
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.show(this.data.value, this.data.max);
        }

        /**显示进度
         * type:文本类型，具体数值或者百分比
         * tweenTime: Tween时间
         * */
        public show(value: number, max: number, tween: boolean = !this.isFirst, lv: number = 0, isEff: boolean = true,
                    type: ProgressBarType = ProgressBarType.Value, onceCallback?: Handler, tweenTime?: number) {
            /**显示特效*/
            this.initBar();
            if (onceCallback) {
                this._onceCallback = onceCallback;
            }
            if (!this.effIdx && isEff) {
                this.effIdx = this.addEftByParent(UIEftSrc.ProgressEft, this.gr_eft);
            }
            if (!tween) {
                this.progressBar.hide();
            }
            if (type != undefined) {
                this.progressBar.type = type;
            }
            this.progressBar.show(value, max, tween, lv, tweenTime);
            this._max = max;
            this.isFirst = false;
        }

        /**显示进度预览*/
        public showPreview(value: number): void {
            let self = this;
            let tweenWidth = Math.min(value / this._max * self.width, self.width);
            Tween.remove(this.thumb_preview);
            Tween.get(this.thumb_preview)
                .to({width: tweenWidth}, 300);
            self.labelDisplay.text = value + "/" + this._max;
        }

        /**显示已满级*/
        public showMax(): void {
            this.progressBar.showMax();
            this.checkRemoveEff();
        }

        public showLabel(str: string): void {
            this.labelDisplay.textFlow = TextUtil.parseHtml(str);
        }
    }

}