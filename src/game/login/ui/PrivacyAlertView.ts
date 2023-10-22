namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import ScrollEnabledComponent = uilib.ScrollEnabledComponent;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Button = uilib.Button;
    export class PrivacyAlertView extends UIComponent {
        public btnClose: Button;
        public btnConfirm: Button;
        public btnCancel: Button;

        public labelContainer: DisplayObjectContainer;
        public labAgree: TextFieldBase;

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

            let lab: TextFieldBase = Pool.alloc(TextFieldBase);
            lab.text = "用户协议和隐私";
            lab.x = 239;
            lab.y = 48;
            lab.size = 20;
            lab.stroke = 1;
            lab.strokeColor = 0x426e7b;
            lab.textColor = 0xffffff;
            self.addChild(lab);

            lab = Pool.alloc(TextFieldBase);
            lab.text = "用户协议和隐私政策";
            lab.x = 13;
            lab.y = 15;
            lab.size = 24;
            lab.stroke = 1;
            lab.strokeColor = 0x426e7b;
            lab.textColor = 0xffffff;
            lab.bold = true;
            container.addChild(lab);

            lab = this.labAgree = Pool.alloc(TextFieldBase);
            lab.touchEnabled = true;
            lab.x = 13;
            lab.y = 49;
            lab.lineSpacing = 6;
            lab.width = 550;
            lab.size = 20;
            lab.stroke = 1;
            lab.strokeColor = 0x426e7b;
            lab.textColor = 0xffffff;
            lab.bold = true;
            let title = "请认真阅读" + TextUtil.addLinkHtmlTxt("用户协议", WhiteColor.GREEN, "yhxy") + "和"
                + TextUtil.addLinkHtmlTxt("隐私政策", WhiteColor.GREEN, "yszc")
                + "点击“同意”即表示您已阅读并同意全部条款。\n若您不同意本条款相关内容，很遗憾我们将无法为您继续提供服务";
            lab.textFlow =
                TextUtil.parseHtml(title);
            container.addChild(lab);

            let btn = self.btnClose = Pool.alloc(Button);
            btn.source = GetLoginUrl("guanbi2");
            btn.x = 561;
            btn.y = 27;
            self.addChild(btn);

            btn = self.btnConfirm = Pool.alloc(Button);
            btn.label = '确认';
            btn.$setWidth(187);
            btn.$setHeight(68);
            btn.source = GetLoginUrl("xuanzhekuang");
            btn.x = 70;
            btn.y = 820;
            self.addChild(btn);

            btn = self.btnCancel = Pool.alloc(Button);
            btn.label = '取消';
            btn.$setWidth(187);
            btn.$setHeight(68);
            btn.source = GetLoginUrl("xuanzhekuang");
            btn.x = 350;
            btn.y = 820;
            self.addChild(btn);
        }
    }

}