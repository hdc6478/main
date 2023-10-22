namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import ScrollEnabledComponent = uilib.ScrollEnabledComponent;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Button = uilib.Button;
    export class PrivacyView extends UIComponent {
        public btnClose: Button;
        public btnConfirm: Button;
        public btnCancel: Button;

        public labelContainer: DisplayObjectContainer;
        public lab_tips: TextFieldBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            let self = this;
            self.width = 590;
            self.height = 923;

            let img: BitmapBase;
            img = Pool.alloc(BitmapBase);
            img.source = GetLoginUrl("bg_select2");
            img.x = -10;
            img.y = 0;
            self.addChild(img);

            let scroll: ScrollEnabledComponent = Pool.alloc(ScrollEnabledComponent);
            scroll.setScrollRect(0, 0, self.width, self.height - 200);
            scroll.x = 20;
            scroll.y = 90;
            let container: DisplayObjectContainer = self.labelContainer = new DisplayObjectContainer();
            scroll.addChild(container);
            self.addChild(scroll);

            let img_title = Pool.alloc(BitmapBase);
            img_title.source = GetLoginUrl("youxigonggao2");
            img_title.x = 257;
            img_title.y = 42;
            self.addChild(img_title);

            let btn = self.btnClose = Pool.alloc(Button);
            btn.source = GetLoginUrl("guanbi2");
            btn.x = 561;
            btn.y = 27;
            self.addChild(btn);

            btn = self.btnConfirm = Pool.alloc(Button);
            btn.label = '同意';
            btn.$setWidth(187);
            btn.$setHeight(68);
            btn.source = GetLoginUrl("xuanzhekuang");
            btn.x = 70;
            btn.y = 820;
            self.addChild(btn);

            btn = self.btnCancel = Pool.alloc(Button);
            btn.label = '拒绝';
            btn.$setWidth(187);
            btn.$setHeight(68);
            btn.source = GetLoginUrl("xuanzhekuang");
            btn.x = 350;
            btn.y = 820;
            self.addChild(btn);
        }
    }

}