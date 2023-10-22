namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import Event = egret.Event;
    import callLater = egret.callLater;

    export class ZeroBuyMainMdr extends MdrBase {
        private _view: ZeroBuyMainView = this.mark("_view", ZeroBuyMainView);
        private _proxy: ZeroBuyProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        private readonly _width: number = 720;
        private _showIdx: number = 0;
        private _delay: number = 0;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ZeroBuy);

            this._view.list.itemRenderer = ZeroBuyRender;
            this._view.list.dataProvider = this._listData;

            this._view.scr.bounces = false;
            this._view.scr.throwSpeed = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.img_next, TouchEvent.TOUCH_TAP, this.onClickNext, this);
            addEventListener(this._view.img_before, TouchEvent.TOUCH_TAP, this.onClickBefore, this);
            addEventListener(this._view.scr, Event.CHANGE, this.onChange, this);

            this.onNt(ActivityEvent.ON_UPDATE_ZERO_BUY_INFO, this.onUpdateItem, this);
            this.onNt(ViewEvent.ON_COMMON_BACK, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
        }

        private onUpdateView(): void {
            let list = this._proxy.getList();
            this._listData.source = list;

            // this._showIdx = 0;
            // this._view.scr.viewport.scrollH = 0;
            // callLater(this.onUpdateIndex, this, [this._proxy.model.index]);
            // Tween.get(this).delay(200).exec(Handler.alloc(this, this.onUpdateIndex, [this._proxy.model.index]));
            let index: number = this._proxy.model.index;
            index = index < 0 ? 0 : index;
            this.onUpdateIndex(index);

            this.onUpdateBtn();
        }

        private onUpdateIndex(index: number): void {
            // this._showIdx = index;
            // this._view.scr.viewport.scrollH = this._showIdx * this._width;
            //
            // this.onUpdateBtn();
            this._showIdx = index;
            this.onTween();
        }

        private onUpdateItem(): void {
            this._listData.itemUpdated(this._listData.source[this._showIdx]);
        }

        private onChange(): void {
            // ThrottleUtil.throttle(this.onUpdateChange, this);
            if (this._delay) {
                base.clearDelay(this._delay);
                this._delay = 0;
            }
            this._delay = base.delayCall(Handler.alloc(this, this.onUpdateChange), 100);
        }

        private onUpdateChange(): void {
            let num = this._view.scr.viewport.scrollH / this._width;
            if (num > this._showIdx) {
                this._showIdx = Math.ceil(num);
            } else {
                this._showIdx = Math.floor(num);
            }
            this.onTween();
        }

        private onUpdateBtn(): void {
            this._view.img_before.visible = false;
            this._view.img_next.visible = false;

            if (this._showIdx < this._listData.length - 1) {
                this._view.img_next.visible = true;
            }
            if (this._showIdx > 0) {
                this._view.img_before.visible = true;
            }
        }

        private onClickNext(): void {
            if (this._showIdx >= this._listData.length - 1) {
                return;
            }
            this._showIdx++;
            this.onTween();
        }

        private onClickBefore(): void {
            if (!this._showIdx) {
                return;
            }
            this._showIdx--;
            this.onTween();
        }

        /**滑动容器缓动 */
        private onTween(): void {
            // let w: number = this._view.scr.viewport.scrollH;
            let scrollH: number = this._showIdx * this._width;
            // let duration: number = Math.abs(w - scrollH) / this._width * 200;
            Tween.get(this._view.scr.viewport)
                .to({ scrollH }, 300)
                .exec(Handler.alloc(this, this.onUpdateBtn));
        }

        protected onHide(): void {
            if (this._delay) {
                base.clearDelay(this._delay);
                this._delay = 0;
            }
            Tween.remove(this);
            this._view.scr.viewport.scrollH = 0;
            this._showIdx = 0;
            super.onHide();
        }
    }
}