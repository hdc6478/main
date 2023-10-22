/** @internal */
namespace game.login {
    import UIComponent = uilib.UIComponent;
    import TextFieldBase = uilib.TextFieldBase;
    import Button = uilib.Button;
    import Pool = base.Pool;
    import VerticalAlign = egret.VerticalAlign;
    import HorizontalAlign = egret.HorizontalAlign;
    import Rectangle = egret.Rectangle;
    import TextFieldType = egret.TextFieldType;

    export class AdultIdView extends UIComponent {
        public btnConfirm: Button;
        public btnCancel: Button;
        public btnClose: Button;

        public labAccount: TextFieldBase;
        public labIdentity: TextFieldBase;
        public labName: TextFieldBase;
        public labTip: TextFieldBase;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.width = 580;
            this.height = 393;

            let img: BitmapBase;
            img = Pool.alloc(BitmapBase);
            img.source = "assets/ui_png/common_bg3.png";
            img.width = 619;
            img.height = 370;
            img.y = 23;
            img.x = -19;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(360, 35, 1, 1);
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "assets/ui_png/common_top3.png";
            img.width = 636;
            img.height = 32;
            img.x = -28;
            img.y = 0;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "common_titleBg2";
            img.width = 266;
            img.height = 44;
            img.x = 157;
            img.y = 38;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(126, 19, 2, 1);
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "common_txt_sfrzm";
            img.height = 30;
            img.width = 104;
            img.x = 238;
            img.y = 44;
            this.addChild(img);
            //内容背景
            img = Pool.alloc(BitmapBase);
            img.source = "common_di1";
            img.width = 530;
            img.height = 205;
            img.x = 25;
            img.y = 110;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
            this.addChild(img);
            //输入框背景
            img = Pool.alloc(BitmapBase);
            img.source = "common_di1";
            img.width = 288;
            img.height = 38;
            img.x = 207;
            img.y = 133;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "common_di1";
            img.height = 38;
            img.width = 288;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
            img.x = 207;
            img.y = 194;
            this.addChild(img);

            img = Pool.alloc(BitmapBase);
            img.source = "common_di1";
            img.height = 38;
            img.width = 288;
            img.x = 207;
            img.y = 254;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
            this.addChild(img);
            let lab: TextFieldBase = this.labTip = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 180;
            lab.y = 98;
            lab.size = 22;
            lab.stroke = 1;
            lab.strokeColor = 0x000000;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 360;
            lab.height = 24;
            lab.anchorOffsetX = 90;
            this.addChild(lab);

            // 账号
            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 87;
            lab.y = 132;
            lab.size = 22;
            lab.textColor = 0x5f7365;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 120;
            lab.bold = true;
            lab.height = 52;
            lab.text = "登录账号：";
            this.addChild(lab);

            lab = this.labAccount = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 214;
            lab.y = 143;
            lab.size = 22;
            lab.textColor = 0xFFFFFF;
            lab.stroke = 1;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 275;
            lab.height = 24;
            this.addChild(lab);
            // 姓名
            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 87;
            lab.y = 191;
            lab.size = 22;
            lab.textColor = 0x5f7365;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 120;
            lab.height = 52;
            lab.bold = true;
            lab.text = "真实姓名：";
            this.addChild(lab);

            lab = this.labName = Pool.alloc(TextFieldBase);
            lab.touchEnabled = true;
            lab.type = TextFieldType.INPUT;
            lab.x = 214;
            lab.y = 201;
            lab.size = 22;
            lab.promptColor = 0xFFFFFF;
            lab.stroke = 1;
            // lab.strokeColor = 0x000000;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 275;
            lab.height = 24;
            this.addChild(lab);
            // 身份证号
            lab = Pool.alloc(TextFieldBase);
            lab.touchEnabled = false;
            lab.x = 87;
            lab.y = 250;
            lab.size = 22;
            lab.textColor = 0x5f7365;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 120;
            lab.height = 52;
            lab.text = "身份证号：";
            lab.bold = true;
            this.addChild(lab);

            lab = this.labIdentity = Pool.alloc(TextFieldBase);
            lab.touchEnabled = true;
            lab.type = TextFieldType.INPUT;
            lab.x = 216;
            lab.y = 261;
            lab.size = 22;
            lab.promptColor = 0xFFFFFF;
            lab.stroke = 1;
            // lab.strokeColor = 0x000000;
            lab.textAlign = HorizontalAlign.LEFT;
            lab.verticalAlign = VerticalAlign.MIDDLE;
            lab.width = 275;
            lab.height = 24;
            this.addChild(lab);

            let btn: Button = this.btnConfirm = Pool.alloc(Button);
            btn.x = 341;
            btn.y = 319;
            btn.width = 135;
            btn.height = 52;
            btn.label = "提交认证";
            btn.source = "btn_com_green";
            this.addChild(btn);

            btn = this.btnCancel = Pool.alloc(Button);
            btn.x = 97;
            btn.y = 323;
            btn.width = 135;
            btn.height = 52;
            btn.label = LoginLan.Cancel;
            btn.source = "btn_com";
            btn.visible = false;
            this.addChild(btn);

            btn = this.btnClose = Pool.alloc(Button);
            btn.x = 542;
            btn.y = 14;
            btn.label = "";
            btn.source = "btn_close_new";
            this.addChild(btn);
        }

    }
}
