namespace game.scene {

    import Pool = base.Pool;
    import Event = egret.Event;

    export class TopDuelFlag extends BaseDraw {
        constructor() {
            super();
        }

        protected _titleBmp: BitmapBase;
        private _width: number;
        private _height: number;

        public type: number = 1;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
        }

        protected initDsp(): void {
            super.initDsp();
            this._titleBmp = <BitmapBase>this.dsp.addChild(Pool.alloc(BitmapBase));
            this._height = 27;
        }

        public setTitle(src: string) {
            this._titleBmp.addEventListener(Event.COMPLETE, this.onGetTitle, this);
            this._titleBmp.source = src;
        }

        protected onGetTitle() {
            this._titleBmp.removeEventListener(Event.COMPLETE, this.onGetTitle, this);
            this._width = this._titleBmp.texture.textureWidth;
            this._height = this._titleBmp.texture.textureHeight;
            this.x = -this._width * 0.5;
            if (this.parent) {
                (<HeadMgr>this.parent).sort = true;
            }
        }

        public onRelease(): void {
            this._titleBmp.source = null;
            super.onRelease();
        }
    }

}