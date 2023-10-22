namespace game {
    import Image = eui.Image;
    import Label = eui.Label;
    import Tween = base.Tween;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import Group = eui.Group;
    import LanDef = game.localization.LanDef;

    export const enum ProgressBarType {
        /**
         * 百分比
         */
        Percent = 0,
        /**
         * 数值型 xx/xx
         * @type {number}
         */
        Value,
        /**
         * 无 labal
         */
        NoValue,
    }

    export class ProgressBarMdr {
        private _img: Image;
        private _width: number;
        private _lab: Label;
        private _type: ProgressBarType;
        private _value: number;
        private _max: number;
        private _level: number;
        private _queue: number[][] = [];
        private _state: boolean = false;
        public onceCallBack: Handler;//一次完成的回调
        public finallyCallBack: Handler;//满一次的回调
        public gr_eff: Group;
        private _tweenTime: number;//Tween时间

        /**
         *进度条管理
         * @param {eui.Image} img img 默认最大长度
         * @param {eui.Label} lab
         * @param {game.ProgressBarType} type
         * @param gr_eff 是否显示特效
         */
        constructor(img: Image, lab: Label, type: ProgressBarType = ProgressBarType.Percent, gr_eff: Group = null) {
            this._img = img;
            this.gr_eff = gr_eff;
            this._width = img.width;
            this._lab = lab;
            this._type = type;
        }

        //* tweenTime: Tween时间
        public show(value: number, max: number, tween: boolean = true, lv: number = 0, tweenTime?: number): void {
            this._tweenTime = tweenTime ? tweenTime : 200;
            if (tween) {
                this._queue.push([value, max, lv]);
                if (this._state) {
                    return;
                }
                this.showTween();
            } else {
                let num: number = value > 0 ? value / max : 0;
                if (num > 1) num = 1;
                this._value = value;
                this._max = max;
                this._level = lv;
                this._img.width = this._width * num;
                if (this.gr_eff) {
                    this.gr_eff.x = this._width * num;// - 30;
                    this.gr_eff.visible = num != 0;
                }
                this.updateLab(value, max);
            }
        }

        public hide() {
            this._queue.length = 0;
            this._state = false;
            this._img.width = this._width;
            Tween.remove(this._img);
            if (this.gr_eff) {
                Tween.remove(this.gr_eff);
            }
        }

        private showTween() {
            let value: number[] = this._queue[0];
            let num: number = value[0] > 0 ? value[0] / value[1] : 0;
            if (num > 1) num = 1;
            this._state = true;
            let width: number = this._width * num;
            if (this._max == value[1] && this._level == value[2] && this._value <= value[0] && this._img.width <= width) {
                Tween.get(this._img).to({width: width}, this._tweenTime, null, Sine.easeIn).exec(Handler.alloc(this, this.tweenNext));
                this.showEff(width);
            } else {
                Tween.get(this._img).to({width: this._width}, this._tweenTime, null, Sine.easeIn).exec(Handler.alloc(this, this.tweenCallBack));
                this.showEff(this._width)
            }
        }

        private showEff(width: number) {
            if (this.gr_eff) {
                this.gr_eff.visible = 0 != width;
                Tween.get(this.gr_eff).to({x: width}, 200, null, Sine.easeIn)
            }
        }

        private tweenNext() {
            let value: number[] = this._queue.shift();
            this.updateLab(value[0], value[1]);
            if (this._queue.length) {
                this.showTween();
            } else {
                this._state = false;
            }
            if (this.onceCallBack) {
                this.onceCallBack.exec();
            }
        }

        private tweenCallBack() {
            let value: number[] = this._queue[0];
            if (this.finallyCallBack) {
                this.finallyCallBack.exec();
            }
            this.updateLab(this._max, this._max);
            if (value[1] != value[0]) {
                this._max = value[1];
                this._level = value[2];
                this._value = 0;
                this._img.width = 0;
                if (this.gr_eff) {
                    this.gr_eff.visible = false;
                }

                this.updateLab(this._value, this._max);
                this.showTween();
            } else {
                this._state = false;
            }
        }

        private updateLab(value: number, max: number) {
            let self = this;
            if (!self._lab) return;
            if (self._type == ProgressBarType.Percent) {
                self._lab.text = Math.floor(value * 100 / max) + "%";
            } else if (self._type == ProgressBarType.Value) {
                self._lab.text = value + " / " + max;
            } else {
                self._lab.text = ""
            }
        }

        public set type(val: ProgressBarType) {
            this._type = val
        }

        /**显示满级*/
        public showMax(): void {
            this.hide();
            this._lab.text = getLanById(LanDef.maxlv);
        }
    }
}