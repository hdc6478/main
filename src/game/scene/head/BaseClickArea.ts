namespace game.scene {
    import Pool = base.Pool;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class BaseClickArea extends BaseDraw {
        private _bmp: BitmapBase;
        private _width: number;
        private _height: number;

        protected initDsp() {
            super.initDsp();
            let self = this;
            self._bmp = Pool.alloc(BitmapBase);
            self.dsp.addChild(self._bmp);
            self.width = 100;
            self.height = 100;
            self._bmp.name = "ClickArea";
            self._bmp.addEventListener(TouchEvent.TOUCH_TAP, self.onClickSelf, self);
        }

        private onClickSelf(e: TouchEvent) {
            //facade.sendNt(SceneEvent.ON_SCENE_CLICK, this.parent);
        }

        public set clickEnabled(value: boolean) {
            this._bmp.touchEnabled = value;
        }

        public get clickEnabled() {
            return this._bmp.touchEnabled;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            let self = this;
            self._width = value;
            self._bmp.width = value;
            self.x = -self._width * 0.5;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            let self = this;
            self._height = value;
            self._bmp.height = value;
        }

        onRelease() {
            super.onRelease();
            this.clickEnabled = false;
        }
    }
}