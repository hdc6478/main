/** @internal */namespace game.login {
    import TouchEvent = egret.TouchEvent;
    import ItemRender = uilib.ItemRender;
    import Pool = base.Pool;
    import TextFieldBase = uilib.TextFieldBase;

    export class ServerItemRender extends ItemRender {
        public labName: TextFieldBase;
        public labTag: TextFieldBase;
        public imgTag: BitmapBase;
        public labLv: TextFieldBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.height = 96;
            this.width = 428;
            let img: BitmapBase = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("di2");
            img.width = 341;
            img.height = 96;
            this.addChild(img);

            //this.addEventListener(TouchEvent.TOUCH_TAP, this.onTap, img);

            let lab: TextFieldBase = this.labName = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 13;
            lab.y = 37;
            lab.size = 28;
            lab.width = 250;
            lab.bold = true;
            lab.textColor = 0x426e7b;
            this.addChild(lab);

            lab = this.labLv = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 142;
            lab.y = 45;
            lab.size = 20;
            lab.textColor = 0x007665;
            this.addChild(lab);

            lab = this.labTag = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 278;
            lab.y = 40;
            lab.size = 22;
            lab.strokeColor = 0x003c29;
            lab.stroke = 1;
            lab.textColor = 0xffffff;
            this.addChild(lab);

            img = this.imgTag = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("hong");
            img.x = 232;
            img.y = 30;
            this.addChild(img);
        }

        protected _render(): void {
            let self = this;
            let server: ServerHost = self.data;
            if (!server) {
                self.labName.text = "";
                self.labTag.text = "";
                return;
            }
            self.labName.text = server.name;
            // self.labLv.x = self.labName.textWidth + 15;
            self.imgTag.source = GetLoginUrl(ServerStatusImg[server.status]);
            self.labTag.textColor = ServerStatusColor[server.status];
            self.labTag.text = ServerStatusName[server.status];
            //self.addEventListener(TouchEvent.TOUCH_TAP, self.onTap, self);
            // self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin,self);
            // self.addEventListener(TouchEvent.TOUCH_END, self.onTouchEnd,self);
        }

        // private onTouchBegin(e: TouchEvent) {
        //
        // }
        //
        // private onTouchEnd(e: TouchEvent) {
        //
        // }

        // /** @internal */ private onTap(e: TouchEvent) {
        //     //let data = e.currentTarget.data;
        //     this.parent.dispatchEventWith(LoginEvent.TAP_SELECT_SERVER, false, this.data);
        // }

    }
}
