/** @internal */


namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import ScrollEnabledComponent = uilib.ScrollEnabledComponent;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import HorizontalAlign = egret.HorizontalAlign;
    import Button = uilib.Button;
    import Group = eui.Group;

    export class NoticePanel extends UIComponent {
        public btnClose: Button;
        public labelContainer: DisplayObjectContainer;
        // public labelContainer: Group;
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
            scroll.setScrollRect(0, 0, self.width, self.height - 160);
            scroll.x = 20;
            scroll.y = 90;
            let container: DisplayObjectContainer = self.labelContainer = new DisplayObjectContainer();
            // let container: Group = = self.labelContainer = Pool.alloc(Group);
            scroll.addChild(container);
            self.addChild(scroll);

            let lab = self.lab_tips = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 10;
            lab.y = self.height;
            lab.width = self.width;
            lab.size = 28;
            lab.strokeColor = 0x0;
            lab.stroke = 1.5;
            lab.textColor = 0xffffff;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.text = LoginLan.CloseTips;
            self.addChild(lab);

            let btn = self.btnClose = Pool.alloc(Button);
            btn.source = GetLoginUrl("guanbi2");
            btn.x = 561;
            btn.y = 27;
            self.addChild(btn);

            let img_title = Pool.alloc(BitmapBase);
            img_title.source = GetLoginUrl("youxigonggao2");
            img_title.x = 257;
            img_title.y = 42;
            self.addChild(img_title);
        }
    }
}
