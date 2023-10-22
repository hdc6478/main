/** @internal */namespace game.login {
    import TouchEvent = egret.TouchEvent;
    import ItemRender = uilib.ItemRender;
    import Pool = base.Pool;
    import TextFieldBase = uilib.TextFieldBase;

    export class ServerTypeRender extends ItemRender {
        /** @internal */ private labName: TextFieldBase;
        public data: ServerType;
        /** @internal */ private imgBg: BitmapBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 187;
            this.height = 68;

            let img: BitmapBase = this.imgBg = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("weizhekuang2");
            img.width = 187;
            img.height = 68;
            this.addChild(img);

            let lab: TextFieldBase = this.labName = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.width = 187;
            lab.height = 70;
            lab.size = 24;
            lab.bold = true;
            lab.verticalAlign = "middle";
            lab.textAlign = "center";
            lab.textColor = 0x426e7b;
            this.addChild(lab);
        }

        protected _render(): void {
            this.labName.text = this.data.name;
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        protected onSelected(): void {
            this.imgBg.source = GetLoginUrl(this._selected ? "xuanzhekuang" : "weizhekuang2");
            this.labName.textColor = this._selected ? 0x8a5000 : 0x426e7b;
        }

        /** @internal */ private onTap(e: TouchEvent) {
            this.parent.dispatchEventWith(LoginEvent.TAP_SERVER_TYPE, false, this.data);
        }

    }
}
