namespace game.mod {

    import Handler = base.Handler;
    import Tween = base.Tween;
    import BitmapFillMode = egret.BitmapFillMode;
    import Group = eui.Group;

    export class CommonProgressBar extends BaseRenderer {

        public img_bg: eui.Image;
        public thumb: eui.Image;
        public labelDisplay: eui.Label;
        public gr_eff: Group;

        public fullHandler: Handler;
        public overHandler: Handler;
        public maxTimes: number;
        public maxRate: number;
        public tweenTime: number = 200;
        public maxTip: string = "";

        protected _lastValue: number = 0;
        protected _lastMax: number = 0;
        protected _record: number[][];
        protected _isTweening: boolean;
        protected _lastLv: number = 0;

        private _thumbSrc: string;
        private _thumbSrcType: number;

        protected childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            if (!self.maxRate) {
                self.maxRate = self.width;
            }
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            let self = this;
            self.setThumbSrc();
            self.setThumbSrcType();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.clearProData();
        }

        //进度条UI
        public get thumbSrc(): string {
            return this._thumbSrc;
        }

        public set thumbSrc(v: string) {
            let self = this;
            self._thumbSrc = v;
            self.setThumbSrc();
        }

        private setThumbSrc() {
            let self = this;
            if (self.thumb && self._thumbSrc) {
                self.thumb.source = self._thumbSrc;
            }
        }

        //填充模式
        public get thumbSrcType(): number {
            return this._thumbSrcType;
        }

        public set thumbSrcType(v: number) {
            let self = this;
            self._thumbSrcType = v;
            self.setThumbSrcType();
        }

        private setThumbSrcType() {
            let self = this;
            if (self.thumb && self._thumbSrcType == 1) {
                self.thumb.fillMode = BitmapFillMode.REPEAT;
            }
        }

        /**
         * 绑定回调
         * @param {base.Handler} full 每次满回调
         * @param {base.Handler} over 结束回调
         */
        public setProHandler(full: Handler, over: Handler): void {
            let self = this;
            self.fullHandler = full;
            self.overHandler = over;
        }

        /**
         * 赋值
         * @param {number} val
         * @param {number} max
         * @param {boolean} isTween
         * @param {number} lv，当前等级，当上下级的最大进度一致时需要用等级区分上下级
         */
        public setProValue(val: number, max?: number, isTween: boolean = true, lv: number = 0): void {
            let self = this;
            if (!self._lastMax || !isTween) {
                self.setOverShow(val, max || self._lastValue, lv);
            } else {
                if (!self._record) {
                    self._record = [[val, max || self._lastMax, lv]];
                } else {
                    self._record.push([val, max || self._lastMax, lv]);
                    if (self.maxTimes && self._record.length > self.maxTimes) {
                        self._record.shift();
                    }
                }
                if (!self._isTweening) {
                    self._isTweening = true;
                    self.showRecordInfo();
                }
            }
        }

        /**
         * 清除数据
         */
        public clearProData(): void {
            let self = this;
            self._isTweening = false;
            self._lastValue = self._lastMax = self._lastLv = 0;
            self.fullHandler = self.overHandler = self._record = null;
            Tween.remove(self.thumb);
        }

        //进度条动画
        protected showProTween(val: number, max: number, isNext: boolean, lv: number) {
            let self = this;
            let _w: number = self.maxRate * (max > 0 ? Math.min(1, val / max) : 1);

            Tween.get(self.thumb)
                .to({width: isNext ? self.maxRate : _w}, self.tweenTime)
                .exec(Handler.alloc(self, isNext ? self.fullToShowNext : self.checkToShowNext, [val, max, lv]));
        }

        protected fullToShowNext(val: number, max: number, lv: number) {
            let self = this;
            self.setOverShow(0, max, lv);
            self.showProTween(val, max, false, lv);
            // facade.sendNt(MainEvent.ON_COMMON_PROGRESS_BAR_FULL_TIPS);
        }

        protected checkToShowNext(val: number, max: number, lv: number) {
            let self = this;
            self.setOverShow(val, max, lv);

            if (!self._record.length) {
                self._isTweening = false;
                if (self.overHandler) {
                    self.overHandler.exec();
                }
                return;
            }
            self.showRecordInfo();
        }

        protected showRecordInfo() {
            let self = this;
            let _show: number[] = self._record.shift();
            let _isNext: boolean = _show[1] != self._lastMax || _show[0] < self._lastValue || _show[2] != self._lastLv;
            self.showProTween(_show[0], _show[1], _isNext, _show[2]);
        }

        protected setOverShow(val: number, max: number, lv: number) {
            let self = this;
            self._lastMax = max;
            self._lastValue = val;
            self._lastLv = lv;
            self.labelDisplay.text = max > 0 ? val + "/" + max : self.maxTip;
            self.thumb.width = self.maxRate * (max > 0 ? Math.min(1, val / max) : 1);

            if (val == max && self.fullHandler) {
                self.fullHandler.exec();
            }
        }
    }
}