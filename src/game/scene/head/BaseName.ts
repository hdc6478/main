namespace game.scene {

    import TextField = egret.TextField;
    import VerticalAlign = egret.VerticalAlign;

    export class BaseName extends BaseDraw {
        protected _textField: TextField;
        protected _actor: BaseActor;//_headMdr父容器 实体类
        protected _headMdr: HeadMgr;//name父容器 头部Mdr

        protected _width: number;

        public get width(): number {
            return this._width;
        }

        protected onAdded(): void {
            super.onAdded();
            let self = this;
            self._headMdr = self.parent as HeadMgr;
            self._actor = self._headMdr.parent as BaseActor;
        }

        public set width(value: number) {
            this._width = value;
            // let s: ISceneProxy
        }

        public set text(value: string) {
            this._textField.text = value;
            this.width = this._textField.textWidth;
        }

        protected _height: number;

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this._textField.height = value;
        }

        protected initDsp(): void {
            super.initDsp();
            this._textField = new TextField();
            this._textField.verticalAlign = VerticalAlign.MIDDLE;
            // this._textField.stroke = 1;
            this._textField.size = 20;
            this._textField.textColor = 0xffffff;
            this.height = 22;
            this.dsp.addChild(this._textField);
        }

        public set color(color: number) {
            this._textField.textColor = color;
        }

        public onRelease(): void {
            this._actor = this._headMdr = null;
            this._textField.text = undefined;
            this._textField.textColor = 0xffffff;
            super.onRelease();
        }
    }
}
