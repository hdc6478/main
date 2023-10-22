/** @internal */


namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import Button = uilib.Button;
    import Pool = base.Pool;
    import CheckBox = eui.CheckBox;
    import VerticalAlign = egret.VerticalAlign;
    import HorizontalAlign = egret.HorizontalAlign;
    import Rectangle = egret.Rectangle;

    export class AlertView extends UIComponent {
        public labelContent: TextFieldBase;
        public btnConfirm: Button;
        public btnCancel: Button;
        public btnClose: Button;
        public check: CheckBox;
        public labelCheck: TextFieldBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 720;
            this.height = 404;

            let img: BitmapBase;
            img = Pool.alloc(BitmapBase);
            img.source = "assets/ui_png/sanjidikuangtop.png";
            img.width = 631;
            img.height = 30;
            img.x = 45;
            img.y = 18;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "assets/ui_png/sanjidikuang.png";
            img.width = 618;
            img.height = 360;
            img.x = 51;
            img.y = 44;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "biaotikuang";
            img.width = 279;
            img.height = 45;
            img.x = 221;
            img.y = 8;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "dibantoumingkuang";
            img.width = 557;
            img.height = 192;
            img.x = 82;
            img.y = 72;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(16, 17, 9, 13);
            this.addChild(img);

            let lab: TextFieldBase;
            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 332;
            lab.y = 20;
            lab.size = 28;
            lab.textColor = 0x2C526D;
            lab.text = LoginLan.Tips;
            this.addChild(lab);

            lab = this.labelContent = Pool.alloc(TextFieldBase);
            lab.x = 95;
            lab.y = 82;
            lab.size = 26;
            lab.width = 530;
            lab.height = 171;
            lab.textColor = 0x355973;
            lab.lineSpacing = 12;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            this.addChild(lab);

            let btn: Button = this.btnConfirm = Pool.alloc(Button);
            btn.x = 392;
            btn.y = 300;
            btn.width = 168;
            btn.height = 66;
            btn.label = LoginLan.Confirm;
            btn.source = "yijianniuhuang";
            this.addChild(btn);

            btn = this.btnCancel = Pool.alloc(Button);
            btn.x = 160;
            btn.y = 300;
            btn.width = 168;
            btn.height = 66;
            btn.label = LoginLan.Cancel;
            btn.textColor = 0x465977;
            btn.source = "yijianniulan";
            btn.visible = false;
            this.addChild(btn);

            btn = this.btnClose = Pool.alloc(Button);
            btn.x = 586;
            btn.y = 0;
            btn.width = 80;
            btn.height = 61;
            btn.label = "";
            btn.source = "guanbitubiao";
            this.addChild(btn);

            let check: eui.CheckBox = this.check = Pool.alloc(eui.CheckBox);
            check.skinName = "skins.common.CheckSkin1";
            check.x = 255;
            check.y = 350;
            check.visible = false;
            this.addChild(check);

            lab = this.labelCheck = Pool.alloc(TextFieldBase);
            lab.x = 293;
            lab.y = 357;
            lab.size = 22;
            lab.textColor = 0x355973;
            lab.text = "本次登录不再提示";
            lab.visible = false;
            this.addChild(lab);
        }

        public set showCheck(value: boolean) {
            this.btnConfirm.y = this.btnCancel.y = value ? 280 : 300;
            this.check.visible = this.labelCheck.visible = value;
        }

        public get isChecked() : boolean {
            return this.check.visible && this.check.selected;
        }

    }
}
